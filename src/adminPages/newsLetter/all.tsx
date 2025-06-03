import React, { useState, useMemo } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
  Alert,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import {
  PencilIcon,
  TrashIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Eye } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  useAllBlogs,
  useAllBlogCategories,
} from "../../shared/Hooks/useAdminData";
import { BlogPost } from "../../shared/types";
import { format } from "date-fns";
import FormInput from "../../components/common/FormInput";
import FormSelect from "../../components/common/formSelect";
import logo from "../../Assets/png/home/chain-title-logo.png";
import { deleteBlogPost } from "../../shared/redux/slices/adminSlices/adminSlices";
import { AppDispatch } from "../../shared/redux/store";
import Pagination from "../../components/common/pagination";

const ITEMS_PER_PAGE = 10;

interface SelectOption {
  value: string;
  label: string;
}

const AllBlogs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { blogs, loading, error } = useAllBlogs();
  const { blogCategories } = useAllBlogCategories();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof BlogPost | "createdAt";
    direction: "asc" | "desc";
  }>({ key: "createdAt", direction: "desc" });
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const categoryOptions: SelectOption[] = useMemo(() => {
    const options = [
      { value: "", label: "All Categories" },
      { value: "uncategorized", label: "Uncategorized" },
    ];
    if (blogCategories && Array.isArray(blogCategories)) {
      options.push(
        ...blogCategories.map((category) => ({
          value: category._id,
          label: category.name,
        })),
      );
    }
    return options;
  }, [blogCategories]);

  const statusOptions: SelectOption[] = [
    { value: "publish", label: "Published" },
  ];

  const categoryStringOptions = categoryOptions.map((option) => option.label);
  const statusStringOptions = statusOptions.map((option) => option.label);

  const getCategoryName = (category: BlogPost["category"]) => {
    if (!category) return "Uncategorized";
    return category.name || "Uncategorized";
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedLabel = event.target.value;
    const selectedOption = categoryOptions.find(
      (option) => option.label === selectedLabel,
    );
    setCategoryFilter(selectedOption ? selectedOption.value : "");
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLabel = event.target.value;
    const selectedOption = statusOptions.find(
      (option) => option.label === selectedLabel,
    );
    setStatusFilter(selectedOption ? selectedOption.value : "");
  };

  const selectedCategoryLabel =
    categoryOptions.find((option) => option.value === categoryFilter)?.label ||
    "All Categories";
  const selectedStatusLabel =
    statusOptions.find((option) => option.value === statusFilter)?.label ||
    "All Statuses";

  const handleSort = (key: keyof BlogPost | "createdAt") => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedBlogs = useMemo(() => {
    const sorted = [...blogs];
    sorted.sort((a, b) => {
      if (sortConfig.key === "createdAt") {
        const aValue = a.createdAt || "";
        const bValue = b.createdAt || "";
        return sortConfig.direction === "asc"
          ? new Date(aValue).getTime() - new Date(bValue).getTime()
          : new Date(bValue).getTime() - new Date(aValue).getTime();
      }

      const aValue = a[sortConfig.key] || "";
      const bValue = b[sortConfig.key] || "";
      return sortConfig.direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
    return sorted;
  }, [blogs, sortConfig]);

  const filteredBlogs = useMemo(() => {
    return sortedBlogs.filter((blog) => {
      const title = blog.title || "";
      const summary = blog.summary || "";
      const matchesSearch =
        title.toLowerCase().includes(search.toLowerCase()) ||
        summary.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        !categoryFilter ||
        blog.category?._id === categoryFilter ||
        (!blog.category && categoryFilter === "uncategorized");
      const matchesStatus = !statusFilter || blog.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [sortedBlogs, search, categoryFilter, statusFilter]);

  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBlogs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);

  const handleViewDetails = (blog: BlogPost) => {
    navigate(`/admin/news_letter/${blog._id}`);
  };

  const handleEdit = (blog: BlogPost) => {
    toast.info(`Edit blog: ${blog._id} (Coming soon)`);
  };

  const handleDelete = async (blogId: string) => {
    if (deleteConfirmId === blogId) {
      try {
        await dispatch(deleteBlogPost(blogId)).unwrap();
        toast.success("Blog post deleted successfully!");
        setDeleteConfirmId(null);
      } catch (err) {
        toast.error("Failed to delete blog post");
      }
    } else {
      setDeleteConfirmId(blogId);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmId(null);
  };

  return (
    <main className="p-4 sm:p-6">
      <Card className="rounded-lg shadow-xl">
        <CardHeader floated={false} shadow={false} className="m-0 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Typography variant="h4" className="font-bold text-text2">
              All Blog Posts
            </Typography>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-2">
              <div className="w-full sm:w-64">
                <FormInput
                  type="text"
                  label="Search Blogs"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search blogs by title or summary"
                  className="rounded-full"
                  paddingY="3"
                />
              </div>
              <div className="w-full sm:w-40">
                <FormSelect
                  label="Category"
                  value={selectedCategoryLabel}
                  onSelect={handleCategoryChange}
                  options={categoryStringOptions}
                  className="rounded-full"
                  placeholder={selectedCategoryLabel}
                />
              </div>
              <div className="w-full sm:w-40">
                <FormSelect
                  label="Status"
                  value={selectedStatusLabel}
                  onSelect={handleStatusChange}
                  options={statusStringOptions}
                  className="rounded-full"
                  placeholder={selectedStatusLabel}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0 pb-4 pt-0">
          {error && (
            <Alert color="red" className="mx-4 mb-4 rounded-md">
              {error}
            </Alert>
          )}
          {loading ? (
            <div className="flex justify-center p-6">
              <Spinner
                color="blue"
                className="h-8 w-8"
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              />
            </div>
          ) : filteredBlogs.length === 0 ? (
            <Typography className="p-6 text-center text-gray-500">
              No blog posts found.
            </Typography>
          ) : (
            <>
              <div className="hidden overflow-x-auto sm:block">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      <th className="border-b border-gray-200 p-4">
                        <Typography
                          variant="small"
                          className="font-bold text-text2"
                        >
                          Image
                        </Typography>
                      </th>
                      <th
                        className="cursor-pointer border-b border-gray-200 p-4 hover:bg-gray-50"
                        onClick={() => handleSort("title")}
                      >
                        <div className="flex items-center gap-1">
                          <Typography
                            variant="small"
                            className="font-bold text-text2"
                          >
                            Title
                          </Typography>
                          <ChevronUpDownIcon className="h-4 w-4" />
                        </div>
                      </th>
                      <th className="border-b border-gray-200 p-4">
                        <Typography
                          variant="small"
                          className="font-bold text-text2"
                        >
                          Category
                        </Typography>
                      </th>
                      <th
                        className="cursor-pointer border-b border-gray-200 p-4 hover:bg-gray-50"
                        onClick={() => handleSort("status")}
                      >
                        <div className="flex items-center gap-1">
                          <Typography
                            variant="small"
                            className="font-bold text-text2"
                          >
                            Status
                          </Typography>
                          <ChevronUpDownIcon className="h-4 w-4" />
                        </div>
                      </th>
                      <th className="border-b border-gray-200 p-4">
                        <Typography
                          variant="small"
                          className="font-bold text-text2"
                        >
                          Created By
                        </Typography>
                      </th>
                      <th
                        className="cursor-pointer border-b border-gray-200 p-4 hover:bg-gray-50"
                        onClick={() => handleSort("createdAt")}
                      >
                        <div className="flex items-center gap-1">
                          <Typography
                            variant="small"
                            className="font-bold text-text2"
                          >
                            Created At
                          </Typography>
                          <ChevronUpDownIcon className="h-4 w-4" />
                        </div>
                      </th>
                      <th className="border-b border-gray-200 p-4">
                        <Typography
                          variant="small"
                          className="font-bold text-text2"
                        >
                          Actions
                        </Typography>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedBlogs.map((blog) => (
                      <tr
                        key={blog._id}
                        className="even:bg-gray-50/50 hover:bg-gray-100"
                      >
                        <td className="p-4">
                          <img
                            src={blog.coverImage?.url || logo}
                            alt={blog.title || "Blog Image"}
                            className="h-10 w-10 rounded object-cover"
                          />
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            className="font-medium text-gray-800"
                          >
                            {blog.title || "Untitled"}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {getCategoryName(blog.category)}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            className={`font-normal ${
                              blog.status === "publish"
                                ? "text-green-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {blog.status || "Unknown"}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {blog.createdBy?.username || "Unknown"}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {blog.createdAt
                              ? format(
                                  new Date(blog.createdAt),
                                  "MMM dd, yyyy HH:mm",
                                )
                              : "N/A"}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <IconButton
                              variant="text"
                              className="text-gray-500 hover:text-[#1A2A44]"
                              onClick={() => handleViewDetails(blog)}
                              aria-label={`View details for ${blog.title || "blog"}`}
                              placeholder=""
                              onPointerEnterCapture={() => {}}
                              onPointerLeaveCapture={() => {}}
                            >
                              <Eye className="h-4 w-4" />
                            </IconButton>
                            <IconButton
                              variant="text"
                              className="text-gray-500 hover:text-[#1A2A44]"
                              onClick={() => handleEdit(blog)}
                              aria-label={`Edit ${blog.title || "blog"}`}
                              placeholder=""
                              onPointerEnterCapture={() => {}}
                              onPointerLeaveCapture={() => {}}
                            >
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                            <IconButton
                              variant="text"
                              className={`${
                                deleteConfirmId === blog._id
                                  ? "text-red-500"
                                  : "text-gray-500 hover:text-[#1A2A44]"
                              }`}
                              onClick={() => handleDelete(blog._id)}
                              aria-label={
                                deleteConfirmId === blog._id
                                  ? `Confirm delete ${blog.title || "blog"}`
                                  : `Delete ${blog.title || "blog"}`
                              }
                              placeholder=""
                              onPointerEnterCapture={() => {}}
                              onPointerLeaveCapture={() => {}}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </IconButton>
                            {deleteConfirmId === blog._id && (
                              <IconButton
                                variant="text"
                                className="text-gray-500 hover:text-[#1A2A44]"
                                onClick={handleCancelDelete}
                                aria-label="Cancel delete"
                                placeholder=""
                                onPointerEnterCapture={() => {}}
                                onPointerLeaveCapture={() => {}}
                              >
                                <XMarkIcon className="h-4 w-4" />
                              </IconButton>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid gap-4 p-4 sm:hidden">
                {paginatedBlogs.map((blog) => (
                  <Card key={blog._id} className="shadow-md">
                    <CardBody className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={blog?.coverImage?.url || logo}
                          alt={blog.title || "Blog Image"}
                          className="h-12 w-12 rounded object-cover"
                        />
                        <div>
                          <Typography
                            variant="small"
                            className="font-medium text-text2"
                          >
                            {blog.title || "Untitled"}
                          </Typography>
                          <Typography variant="small" className="text-gray-600">
                            {getCategoryName(blog.category)}
                          </Typography>
                        </div>
                      </div>
                      <div className="mt-2 space-y-1">
                        <Typography variant="small" className="text-gray-600">
                          <span className="font-bold">Status:</span>{" "}
                          {blog.status || "Unknown"}
                        </Typography>
                        <Typography variant="small" className="text-gray-600">
                          <span className="font-bold">Created By:</span>{" "}
                          {blog.createdBy?.username || "Unknown"}
                        </Typography>
                        <Typography variant="small" className="text-gray-600">
                          <span className="font-bold">Created At:</span>{" "}
                          {blog.createdAt
                            ? format(
                                new Date(blog.createdAt),
                                "MMM dd, yyyy HH:mm",
                              )
                            : "N/A"}
                        </Typography>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button
                          variant="text"
                          size="sm"
                          className="text-gray-500 hover:text-[#1A2A44]"
                          onClick={() => handleViewDetails(blog)}
                          aria-label={`View details for ${blog.title || "blog"}`}
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="text"
                          size="sm"
                          className="text-gray-500 hover:text-[#1A2A44]"
                          onClick={() => handleEdit(blog)}
                          aria-label={`Edit ${blog.title || "blog"}`}
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="text"
                          size="sm"
                          className={`${
                            deleteConfirmId === blog._id
                              ? "text-red-500"
                              : "text-gray-500 hover:text-[#1A2A44]"
                          }`}
                          onClick={() => handleDelete(blog._id)}
                          aria-label={
                            deleteConfirmId === blog._id
                              ? `Confirm delete ${blog.title || "blog"}`
                              : `Delete ${blog.title || "blog"}`
                          }
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                        {deleteConfirmId === blog._id && (
                          <Button
                            variant="text"
                            size="sm"
                            className="text-gray-500 hover:text-[#1A2A44]"
                            onClick={handleCancelDelete}
                            aria-label="Cancel delete"
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={() => {}}
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center p-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    color="blue"
                    className="flex gap-1"
                  />
                </div>
              )}
            </>
          )}
        </CardBody>
      </Card>
    </main>
  );
};

export default AllBlogs;
