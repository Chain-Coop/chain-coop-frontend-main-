import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "../../shared/redux/store";
import { Button } from "@material-tailwind/react";
import { useAllBlogCategories } from "../../shared/Hooks/useAdminData";
import { createBlogPost } from "../../shared/redux/slices/adminSlices/adminSlices";
import FormSelect from "../../components/common/formSelect";
import { CreateCategoryModal } from "../../components/admin/newsLetter/modal/createCategoryModal";
import { DeleteCategoryModal } from "../../components/admin/newsLetter/modal/deleteCategoryModal";
import { Link } from "react-router-dom";

interface SelectOption {
  value: string;
  label: string;
}

const NewsLetter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogCategories } = useAllBlogCategories();
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategoryLabel, setSelectedCategoryLabel] =
    useState<string>("");
  const [selectedStatusLabel, setSelectedStatusLabel] = useState<string>("");
  const [isNewCategoryOpen, setIsNewCategoryOpen] = useState(false);
  const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] = useState(false);
  const editorRef = useRef<any | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const resetForm = () => {
    setTitle("");
    setSummary("");
    setContent("");
    setSelectedCategoryLabel("");
    setSelectedStatusLabel("");
    setFile(null);
    if (editorRef.current) {
      editorRef.current.setData("");
    }
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const selectedCategoryOption = categoryOptions.find(
      (option) => option.label === selectedCategoryLabel,
    );
    const selectedStatusOption = statusOptions.find(
      (option) => option.label === selectedStatusLabel,
    );

    const categoryId = selectedCategoryOption?.value || "";
    const statusId = selectedStatusOption?.value || "";

    if (!title || !summary || !content || !file || !categoryId || !statusId) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("category", categoryId);
    formData.append("status", statusId);
    formData.append("blogCoverImage", file);

    try {
      const result = await dispatch(createBlogPost(formData as any)).unwrap();
      toast.success("Blog post created successfully!");
      resetForm();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : "Failed to create blog post. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions: SelectOption[] = React.useMemo(() => {
    if (blogCategories && Array.isArray(blogCategories)) {
      return blogCategories.map((category) => ({
        value: category._id,
        label: category.name,
      }));
    }
    return [];
  }, [blogCategories]);

  const statusOptions: SelectOption[] = [
    { value: "publish", label: "Publish" },
    { value: "draft", label: "Draft" },
  ];

  const categoryStringOptions = categoryOptions.map((option) => option.label);
  const statusStringOptions = statusOptions.map((option) => option.label);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCategoryLabel(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatusLabel(event.target.value);
  };

  return (
    <main>
      <header className="text-center">
        <h1 className="text-2xl font-bold">Create Blog Post</h1>
      </header>
      <div className="w-[75%] py-[4em]">
        <section className="mb-8 flex justify-end gap-4">
          <Button
            onClick={() => setIsNewCategoryOpen(true)}
            variant="filled"
            className="bg-text2 text-text5"
          >
            Create New Category
          </Button>
          <Button
            onClick={() => setIsDeleteCategoryOpen(true)}
            variant="outlined"
            className="border-text2 text-text2"
          >
            Manage Categories
          </Button>
          <Link to="/admin/news_letter/all">
            <Button variant="outlined" className="border-text2 text-text2">
              View All Blogs
            </Button>
          </Link>
        </section>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="projectTitle" className="mb-3 flex font-medium">
              Title
            </label>
            <input
              type="text"
              id="projectTitle"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="input mb-5 h-[4em] w-full rounded-md border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>
          <div>
            <label htmlFor="summary" className="mb-3 flex font-medium">
              Summary
            </label>
            <input
              type="text"
              id="summary"
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Enter blog summary"
              className="input mb-5 h-[4em] w-full rounded-md border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>
          <div className="mt-[2em]">
            <label htmlFor="message" className="text-lg font-medium">
              Content
            </label>
            <div className="custom-ckeditor mt-[1.4em] flex w-full rounded-md border-[1px] bg-white shadow-md focus:border-text2 focus:outline-none focus:ring-text2">
              <CKEditor
                editor={ClassicEditor}
                data={content}
                onReady={(editor) => {
                  console.log("CKEditor is ready to use!", editor);
                  editorRef.current = editor;
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContent(data);
                }}
                config={{
                  placeholder: "Write your blog content here...",
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "link",
                    "bulletedList",
                    "numberedList",
                    "|",
                    "outdent",
                    "indent",
                    "|",
                    "blockQuote",
                    "insertTable",
                    "mediaEmbed",
                    "|",
                    "undo",
                    "redo",
                  ],
                  heading: {
                    options: [
                      {
                        model: "paragraph",
                        title: "Paragraph",
                        class: "ck-heading_paragraph",
                      },
                      {
                        model: "heading1",
                        view: "h1",
                        title: "Heading 1",
                        class: "ck-heading_heading1",
                      },
                      {
                        model: "heading2",
                        view: "h2",
                        title: "Heading 2",
                        class: "ck-heading_heading2",
                      },
                      {
                        model: "heading3",
                        view: "h3",
                        title: "Heading 3",
                        class: "ck-heading_heading3",
                      },
                    ],
                  },
                }}
              />
            </div>
            <div className="mt-10 flex items-center justify-between">
              <div>
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("fileInput")?.click()}
                  className="rounded-lg bg-text2 px-4 py-2 text-white transition-colors"
                >
                  Choose Cover Image
                </button>
                <span className="ml-4 text-gray-500">
                  {file ? file.name : "No file chosen"}
                </span>
              </div>
              <div className="w-[11em]">
                <FormSelect
                  options={statusStringOptions}
                  label="Status"
                  required
                  placeholder="Select Status"
                  value={selectedStatusLabel}
                  onSelect={handleStatusChange}
                />
              </div>
              <div className="w-[11em]">
                <FormSelect
                  options={categoryStringOptions}
                  label="Category"
                  required
                  placeholder="Select Category"
                  value={selectedCategoryLabel}
                  onSelect={handleCategoryChange}
                />
              </div>
            </div>
            <Button
              type="submit"
              variant="filled"
              className="text-md relative mt-[5em] flex w-full justify-center rounded-full bg-text2 p-[15px] font-medium normal-case text-text5"
              loading={loading}
              disabled={loading}
            >
              Create Blog Post
            </Button>
          </div>
        </form>
      </div>
      <CreateCategoryModal
        isOpen={isNewCategoryOpen}
        onClose={() => setIsNewCategoryOpen(false)}
      />
      <DeleteCategoryModal
        isOpen={isDeleteCategoryOpen}
        onClose={() => setIsDeleteCategoryOpen(false)}
      />
    </main>
  );
};

export default NewsLetter;
