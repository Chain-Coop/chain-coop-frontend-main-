import React, { useEffect, useState, useMemo } from "react";
import { Typography, Card, CardBody, Button } from "@material-tailwind/react";
import axios from "axios";
import { API_ENDPOINTS } from "../../shared/utils/apiEndpoints";
import { format } from "date-fns";
import NavBar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";
import logo from "../../Assets/png/home/chain-title-logo.png";
import shaking from "../../Assets/png/home/shaking.png";
import { HiOutlineUser } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface BlogPost {
  _id: string;
  title?: string;
  summary?: string;
  content?: string;
  status?: string;
  createdBy?: {
    _id: string;
    username: string;
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
  isPopular?: boolean;
}

const categoryOptions = [
  "All",
  "Block Chain",
  "Saving Chain",
  "Group Saving",
  "Naira Saving",
  "Crypto Saving",
];

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.BLOG.GET_ALL_BLOGS);
        //console.log("Blog API response:", response.data);
        setBlogs(response.data.blogs);
      } catch (err) {
        setError("Failed to fetch blog posts");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const blogsByCategory = useMemo(() => {
    const grouped: { [category: string]: BlogPost[] } = {};
    blogs.forEach((blog) => {
      const cat = blog.category?.name || "Uncategorized";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(blog);
    });
    return grouped;
  }, [blogs]);

  const recentPost = blogs.length > 0 ? blogs[0] : null;

  const filteredBlogsByCategory = useMemo(() => {
    if (selectedCategory === "All") return blogsByCategory;
    const filtered: { [category: string]: BlogPost[] } = {};
    Object.entries(blogsByCategory).forEach(([cat, posts]) => {
      if (cat.toLowerCase() === selectedCategory.toLowerCase()) {
        filtered[cat] = posts;
      }
    });
    return filtered;
  }, [selectedCategory, blogsByCategory]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-lg text-gray-700">Loading...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-lg text-red-500">{error}</span>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      {/* Hero Section */}
      <section className="relative flex h-[50vh] flex-col justify-end overflow-visible bg-text2">
        <div className="mx-auto max-w-3xl px-4 pb-44 text-center">
          <Typography
            variant="h2"
            className="mb-8 text-2xl font-bold text-white md:text-3xl"
          >
            Discover exclusives articles of investments
            <br />
            chain blocks
          </Typography>
        </div>
        <div className="absolute bottom-[-180px] left-1/2 z-50 w-full max-w-2xl -translate-x-1/2">
          <div className="relative mx-auto rounded-2xl shadow-lg">
            <img
              src={shaking}
              alt="Shaking hands"
              className="h-[320px] w-full rounded-2xl object-cover"
              style={{ objectPosition: "center" }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
              <span className="mb-4 rounded border border-white bg-white/20 px-6 py-2 text-lg font-semibold text-white backdrop-blur-sm">
                Blogs
              </span>
              <Typography
                className="text-center text-base font-medium text-white md:text-xl"
                style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
              >
                Meet Chain Coop, our business-oriented community, designed into
                a cooperative with open membership, through Chain Wallet.
                Simple, safe and transparent way.
              </Typography>
            </div>
          </div>
        </div>
      </section>
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pt-[280px] md:flex-row md:items-stretch md:justify-evenly md:gap-4">
        <div className="flex h-full w-full max-w-md flex-col md:w-auto">
          <Typography variant="h4" className="mb-4 font-bold text-text1">
            Recent Post
          </Typography>
          {recentPost && (
            <Card className="flex h-full min-h-[350px] flex-col rounded-xl border border-gray-200 bg-white shadow-sm">
              <img
                src={recentPost.coverImage?.url || logo}
                alt={recentPost.title || "Blog cover"}
                className="h-48 w-full rounded-t-xl object-cover"
              />
              <CardBody className="flex flex-1 flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <Typography
                    variant="h6"
                    className="cursor-pointer font-bold text-text2 hover:underline"
                    onClick={() => navigate(`/blog/${recentPost._id}`)}
                  >
                    {recentPost.title || "Untitled"}
                  </Typography>
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 overflow-hidden rounded-full bg-gray-200">
                      <HiOutlineUser className="h-full w-full text-gray-500" />
                    </div>
                    <Typography
                      variant="small"
                      className="font-bold text-gray-700"
                    >
                      {recentPost.createdBy?.username || "John Smith"}
                    </Typography>
                  </div>
                </div>
                <Typography variant="small" className="mb-2 text-text1">
                  {recentPost.summary || "No summary available."}
                </Typography>
                <div className="mt-auto flex items-center justify-between">
                  <Typography variant="small" className="text-[#939090]">
                    Posted:{" "}
                    <span className="text-text1">
                      {recentPost.createdAt
                        ? format(new Date(recentPost.createdAt), "MMM dd,yyyy")
                        : "N/A"}
                    </span>
                  </Typography>
                  <Button
                    variant="text"
                    className="min-w-0 p-0 text-[#FF7A00]"
                    size="sm"
                    onClick={() => navigate(`/blog/${recentPost._id}`)}
                  >
                    Read more...
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
        <div className="flex h-full w-full max-w-md justify-center md:mt-14 md:w-auto">
          <div className="flex h-full min-h-[350px] w-full flex-col justify-between rounded-[30px] border border-gray-200 bg-white p-6 shadow-sm">
            <div>
              <Typography
                variant="h5"
                className="mb-4 text-center font-bold text-text2"
              >
                Categories
              </Typography>
              <Typography
                variant="small"
                className="mb-2 block text-left text-lg text-gray-500"
              >
                Select blog
              </Typography>
              <div className="flex flex-wrap justify-between gap-3 gap-y-14">
                {categoryOptions.map((cat) => (
                  <button
                    key={cat}
                    className={`w-32 rounded-xl border px-5 py-2 text-sm font-semibold transition-all duration-150 ${
                      selectedCategory === cat
                        ? "border-text2 bg-text2 text-white"
                        : "border-[#E5E0FA] bg-[#F5F3FF] text-text2 hover:bg-text2 hover:text-white"
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* All Blogs Section */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8">
        <Typography
          variant="h1"
          className="mb-6 text-3xl font-bold text-gray-900"
        >
          All Blogs
        </Typography>
        {Object.entries(filteredBlogsByCategory).map(([category, posts]) => (
          <div key={category} className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Typography
                  variant="h3"
                  className="text-2xl font-bold text-text2"
                >
                  {category}
                </Typography>
                <FaUsers className="text-text2" />
              </div>
              <Button
                className="rounded-lg border border-text2 bg-transparent px-4 py-2 text-text2"
                size="sm"
              >
                View All
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, 3).map((blog) => (
                <Card
                  key={blog._id}
                  className="overflow-hidden bg-white text-gray-900 shadow-md"
                >
                  <div className="relative">
                    <img
                      src={blog.coverImage?.url || logo}
                      alt={blog.title || "Blog cover"}
                      className="h-48 w-full object-cover"
                    />
                    {blog.isPopular && (
                      <span className="absolute right-2 top-2 rounded bg-[#7B2FF2] px-3 py-1 text-xs font-bold text-white">
                        Popular
                      </span>
                    )}
                  </div>
                  <CardBody>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <Typography variant="h5" className="font-bold text-text2">
                        {blog.title || "Untitled"}
                      </Typography>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                          <HiOutlineUser className="h-full w-full text-gray-500" />
                        </div>
                        <Typography
                          variant="small"
                          className="hidden font-bold text-gray-700"
                        >
                          {blog.createdBy?.username || "John Smith"}
                        </Typography>
                      </div>
                    </div>
                    <Typography variant="small" className="mb-4 text-text1">
                      {blog.summary || "No summary available."}
                    </Typography>
                    <div className="flex items-center justify-between">
                      <Typography variant="small" className="text-[#939090]">
                        Posted:{" "}
                        <span className="text-text1">
                          {blog.createdAt
                            ? format(new Date(blog.createdAt), "MMM dd,yyyy")
                            : "N/A"}
                        </span>
                      </Typography>
                      <Button
                        variant="text"
                        className="min-w-0 p-0 text-[#FF7A00]"
                        size="sm"
                        onClick={() => navigate(`/blog/${blog._id}`)}
                      >
                        Read more...
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center pb-8">
        <Button className="rounded-lg bg-text2 px-8 py-2 text-white">
          View All
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
