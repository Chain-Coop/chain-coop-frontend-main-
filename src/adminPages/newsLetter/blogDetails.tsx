import React, { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Alert,
  Spinner,
  Collapse,
  Input,
} from "@material-tailwind/react";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { RootState } from "../../shared/redux/rootReducer";
import {
  fetchBlogById,
  updateBlogPost,
} from "../../shared/redux/slices/adminSlices/adminSlices";
import { AppDispatch } from "../../shared/redux/store";
import { toast } from "react-toastify";
import logo from "../../Assets/png/home/chain-title-logo.png";
import FormSelect from "../../components/common/formSelect";
import { useAllBlogCategories } from "../../shared/Hooks/useAdminData";
import FormInput from "../../components/common/FormInput";

interface BlogResponse {
  blog: {
    _id: string;
    title?: string;
    summary?: string;
    content?: string;
    status?: string;
    createdBy?: {
      _id: string;
      username: string;
      lastName?: string;
      firstName?: string;
      id?: string;
    } | null;
    category?: {
      _id: string;
      name: string;
    } | null;
    coverImage?: {
      url: string;
      imageId: string;
    } | null;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  };
  comments: any[];
}

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedBlog, isLoading, error } = useSelector(
    (state: RootState) => state.admin,
  );
  const { blogCategories } = useAllBlogCategories();
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const editorRef = useRef<any | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id)).catch(() => {
        toast.error("Failed to load blog details");
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedBlog) {
      const blog = (selectedBlog as unknown as BlogResponse).blog;
      setTitle(blog?.title || "");
      setSummary(blog?.summary || "");
      setContent(blog?.content || "");
      setCategory(blog?.category?._id || "");
      setStatus(blog?.status || "publish");
    }
  }, [selectedBlog]);

  const categoryOptions = useMemo(() => {
    const options = [{ value: "", label: "Uncategorized" }];
    if (blogCategories && Array.isArray(blogCategories)) {
      options.push(
        ...blogCategories.map((cat) => ({
          value: cat._id,
          label: cat.name,
        })),
      );
    }
    return options.map((opt) => opt.label);
  }, [blogCategories]);

  const statusOptions = ["Published"];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCoverImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || !summary || !content) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsUpdating(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("status", status);
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    try {
      await dispatch(updateBlogPost({ blogId: id!, body: formData })).unwrap();
      toast.success("Blog post updated successfully!");
      setEditMode(false);

      dispatch(fetchBlogById(id!));
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update blog post.";
      toast.error(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  const getCategoryName = (category: BlogResponse["blog"]["category"]) => {
    return category?.name || "Uncategorized";
  };

  const toggleComments = () => {
    setCommentsOpen(!commentsOpen);
  };

  const getCategoryDisplayValue = () => {
    if (!category) return "Uncategorized";
    const selectedCategory = blogCategories?.find(
      (cat) => cat._id === category,
    );
    return selectedCategory?.name || "Uncategorized";
  };

  const getStatusDisplayValue = () => {
    return status === "publish" ? "Published" : "Published";
  };

  if (isLoading && !isUpdating) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4 sm:p-6">
        <Spinner
          color="blue"
          className="h-12 w-12"
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />
      </main>
    );
  }

  if (error || !selectedBlog) {
    return (
      <main className="p-4 sm:p-6">
        <Card className="rounded-lg shadow-xl">
          <CardBody className="p-6">
            <Alert color="red" className="mb-4 rounded-md">
              {error || "Blog post not found."}
            </Alert>
            <Button
              variant="text"
              className="flex items-center gap-2 text-[#1A2A44] hover:bg-[#1A2A44]/10"
              onClick={() => navigate("/admin/blogs")}
              aria-label="Back to blog list"
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <ArrowLeftIcon className="h-4 w-4" /> Back to Blogs
            </Button>
          </CardBody>
        </Card>
      </main>
    );
  }

  const blog = (selectedBlog as unknown as BlogResponse).blog;
  const comments = (selectedBlog as unknown as BlogResponse).comments || [];

  return (
    <main className="p-4 sm:p-6">
      <Card className="overflow-hidden rounded-lg shadow-xl">
        <CardHeader
          floated={false}
          shadow={false}
          className="m-0 flex items-center justify-between bg-[#1A2A44] p-6 text-white"
        >
          <Typography variant="h4" className="font-bold">
            {editMode ? "Edit Blog Post" : blog?.title || "Untitled"}
          </Typography>
          <div className="flex gap-2">
            {!editMode && (
              <Button
                variant="text"
                className="flex items-center gap-2 text-white hover:bg-white/20"
                onClick={() => setEditMode(true)}
                aria-label="Edit blog post"
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <PencilIcon className="h-4 w-4" /> Edit
              </Button>
            )}
            <Button
              variant="text"
              className="flex items-center gap-2 text-white hover:bg-white/20"
              onClick={() => navigate("/admin/news_letter/all")}
              aria-label="Back to blog list"
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <ArrowLeftIcon className="h-4 w-4" /> Back
            </Button>
          </div>
        </CardHeader>
        <CardBody className="p-6">
          {editMode ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Typography
                  variant="small"
                  className="mb-2 font-bold text-text2"
                >
                  Title
                </Typography>
                <FormInput
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter blog title"
                  className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                />
              </div>
              <div>
                <Typography
                  variant="small"
                  className="mb-2 font-bold text-text2"
                >
                  Summary
                </Typography>
                <FormInput
                  type="text"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Enter blog summary"
                  className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                />
              </div>
              <div>
                <Typography
                  variant="small"
                  className="mb-2 font-bold text-text2"
                >
                  Content
                </Typography>
                <div className="custom-ckeditor flex w-full rounded-md border-[1px] bg-white shadow-md focus:border-text2 focus:outline-none focus:ring-text2">
                  <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={(_event: any, editor: any) => {
                      const data = editor.getData();
                      setContent(data);
                    }}
                    config={{
                      toolbar: [
                        "bold",
                        "italic",
                        "|",
                        "numberedList",
                        "bulletedList",
                        "|",
                        "outdent",
                        "indent",
                      ],
                      placeholder: "Write blog content...",
                      removePlugins: [
                        "CKFinderUploadAdapter",
                        "CKFinder",
                        "EasyImage",
                        "Image",
                        "ImageCaption",
                        "ImageStyle",
                        "ImageToolbar",
                        "ImageUpload",
                        "MediaEmbed",
                      ],
                    }}
                  />
                </div>
              </div>
              <div>
                <Typography
                  variant="small"
                  className="mb-2 font-bold text-text2"
                >
                  Category
                </Typography>
                <FormSelect
                  label="Category"
                  value={getCategoryDisplayValue()}
                  onSelect={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    const value = event.target.value;
                    const selectedCategory = blogCategories?.find(
                      (cat) => cat?.name === value,
                    );
                    setCategory(selectedCategory?._id || "");
                  }}
                  options={categoryOptions}
                  placeholder="Select Category"
                />
              </div>
              <div>
                <Typography
                  variant="small"
                  className="mb-2 font-bold text-text2"
                >
                  Status
                </Typography>
                <FormSelect
                  label="Status"
                  value={getStatusDisplayValue()}
                  onSelect={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    const value = event.target.value;
                    setStatus(value === "Published" ? "publish" : "publish");
                  }}
                  options={statusOptions}
                  placeholder="Select Status"
                />
              </div>
              <div>
                <Typography
                  variant="small"
                  className="mb-2 font-bold text-text2"
                >
                  Cover Image
                </Typography>
                <input
                  type="file"
                  id="coverImage"
                  onChange={handleFileChange}
                  className="mb-2"
                />
                {blog?.coverImage?.url && !coverImage && (
                  <img
                    src={blog.coverImage.url}
                    alt="Current cover"
                    className="h-20 w-20 rounded object-cover"
                  />
                )}
              </div>
              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="flex min-w-[120px] items-center gap-2 bg-text2"
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  {isUpdating && (
                    <Spinner
                      className="h-4 w-4"
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    />
                  )}
                  {isUpdating ? "Updating..." : "Update Blog"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setEditMode(false)}
                  disabled={isUpdating}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col gap-6 sm:flex-row">
                <img
                  src={blog?.coverImage?.url || logo}
                  alt={blog?.title || "Blog Image"}
                  className="h-auto w-full rounded-lg object-cover sm:w-1/3"
                />
                <div className="flex-1 space-y-4">
                  <div>
                    <Typography
                      variant="small"
                      className="font-bold text-text2"
                    >
                      Summary
                    </Typography>
                    <Typography variant="paragraph" className="text-gray-700">
                      {blog?.summary || "No summary provided"}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      className="font-bold text-text2"
                    >
                      Category
                    </Typography>
                    <Typography variant="paragraph" className="text-gray-700">
                      {getCategoryName(blog?.category)}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      className="font-bold text-text2"
                    >
                      Status
                    </Typography>
                    <Typography
                      variant="paragraph"
                      className={`text-${blog?.status === "publish" ? "green-600" : "yellow-600"}`}
                    >
                      {blog?.status || "Unknown"}
                    </Typography>
                  </div>
                </div>
              </div>
              <div>
                <Typography variant="small" className="font-bold text-text2">
                  Content
                </Typography>
                <div
                  className="prose prose-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: blog?.content || "<p>No content</p>",
                  }}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Typography variant="small" className="font-bold text-text2">
                    Created By
                  </Typography>
                  <Typography variant="paragraph" className="text-gray-700">
                    {blog?.createdBy?.username || "Unknown"}
                  </Typography>
                </div>
                <div>
                  <Typography variant="small" className="font-bold text-text2">
                    Created At
                  </Typography>
                  <Typography variant="paragraph" className="text-gray-700">
                    {blog?.createdAt
                      ? format(new Date(blog.createdAt), "MMM dd, yyyy HH:mm")
                      : "N/A"}
                  </Typography>
                </div>
              </div>
              <div>
                <Button
                  variant="text"
                  className="flex items-center gap-2 text-[#1A2A44] hover:bg-[#1A2A44]/10"
                  onClick={toggleComments}
                  aria-label={commentsOpen ? "Hide comments" : "Show comments"}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${commentsOpen ? "rotate-180" : ""}`}
                  />
                  Comments ({comments.length})
                </Button>
                <Collapse open={commentsOpen}>
                  <Card className="mt-4 shadow-md">
                    <CardBody className="p-4">
                      {comments.length === 0 ? (
                        <Typography className="text-center text-gray-500">
                          No comments yet.
                        </Typography>
                      ) : (
                        comments.map((comment, index) => (
                          <div
                            key={index}
                            className="border-b border-gray-200 py-2"
                          >
                            <Typography
                              variant="small"
                              className="text-gray-700"
                            >
                              Comment {index + 1}: Placeholder
                            </Typography>
                          </div>
                        ))
                      )}
                    </CardBody>
                  </Card>
                </Collapse>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </main>
  );
};

export default BlogDetails;
