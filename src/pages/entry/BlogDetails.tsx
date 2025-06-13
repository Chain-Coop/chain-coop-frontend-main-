import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../../shared/utils/apiEndpoints";
import NavBar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";
import shaking from "../../Assets/png/home/shaking.png";
import { Typography, Button, Card, CardBody } from "@material-tailwind/react";
import { format } from "date-fns";
import { HiOutlineUser } from "react-icons/hi2";
import {
  FiMessageCircle,
  FiThumbsDown,
  FiThumbsUp,
  FiChevronDown,
  FiArrowLeft,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { createBlogComment } from "../../shared/redux/slices/adminSlices/adminSlices";
import type { AppDispatch } from "../../shared/redux/store";
import { motion } from "framer-motion";

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

const pageDetailVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", when: "beforeChildren" },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
};

const contentBlockVariants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.1, duration: 0.5, ease: "easeOut" },
  },
};

const relatedSectionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const relatedCardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  const [signup, setSignup] = useState({ name: "", email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);

  const [commentForm, setCommentForm] = useState({ name: "", comment: "" });
  const [commentSuccess, setCommentSuccess] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading: commentIsLoading, error: commentReduxError } = useSelector(
    (state: any) => state.admin,
  );

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.BLOG.GET_BLOG_BY_ID(id!));
        setBlog(res.data.blog);
        const all = await axios.get(API_ENDPOINTS.BLOG.GET_ALL_BLOGS);
        const relatedBlogs = all.data.blogs.filter(
          (b: BlogPost) =>
            b._id !== id && b.category?.name === res.data.blog.category?.name,
        );
        setRelated(relatedBlogs.slice(0, 3));
        setInitialDataLoaded(true);
      } catch (err) {
        setError("Failed to fetch blog post");
        setInitialDataLoaded(true);
      }
    };
    if (id) {
      fetchBlog();
    } else {
      setError("Blog ID is missing.");
      setInitialDataLoaded(true);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCommentForm({ ...commentForm, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCommentSuccess(false);
    dispatch(
      createBlogComment({
        blogId: id,
        name: commentForm.name,
        comment: commentForm.comment,
      }),
    )
      .unwrap()
      .then(() => {
        setCommentSuccess(true);
        setCommentForm({ name: "", comment: "" });
      })
      .catch(() => {
        setCommentSuccess(false);
      });
  };

  if (error && initialDataLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-lg text-red-500">
          {error || "Blog not found"}
        </span>
      </div>
    );
  }

  if (!initialDataLoaded || !blog) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F8F8FF]">
        <NavBar />
        <div className="min-h-[calc(100vh-200px)]"></div>
        <Footer />
      </div>
    );
  }

  const keyPoints = [
    blog.summary || "Key point 1...",
    "Our Ai-Driven Learning Platform will change how members learn and grow.",
    "Chain Wallet is simple, safe and transparent.",
    "Open membership for all business-oriented people.",
  ];

  return (
    <motion.div
      variants={pageDetailVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex min-h-screen flex-col bg-[#F8F8FF]"
    >
      <NavBar />
      <motion.div
        variants={contentBlockVariants}
        className="mx-auto w-full max-w-2xl px-4 py-8"
      >
        <div className="mb-4 flex flex-col items-center">
          <Typography variant="small" className="mb-2 hidden text-gray-700">
            Author: {blog.createdBy?.username || "John Smith"}
          </Typography>
          <Typography
            variant="h2"
            className="mb-4 text-center text-2xl font-bold text-text2"
          >
            {blog.title || "Articles of investments chain blocks"}
          </Typography>
        </div>
        <motion.div
          variants={contentBlockVariants}
          className="mb-4 text-base text-gray-800"
          dangerouslySetInnerHTML={{
            __html: blog.content || blog.summary || "No content available.",
          }}
        />
        <motion.div
          variants={contentBlockVariants}
          className="mb-4 flex justify-center"
        >
          <img
            src={blog.coverImage?.url || shaking}
            alt="Blog visual"
            className="h-[200px] w-[340px] rounded-lg object-cover"
          />
        </motion.div>
        <motion.p
          variants={contentBlockVariants}
          className="mb-4 text-base text-gray-800"
        >
          {blog.summary || "No summary available."}
        </motion.p>
        <div className="mb-6 hidden">
          <Typography variant="h5" className="mb-2 font-bold text-text2">
            Key Points
          </Typography>
          <ul className="list-disc space-y-2 pl-6">
            {keyPoints.map((point, idx) => (
              <li key={idx} className="text-text2">
                <span className="text-gray-800">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <motion.div
          variants={contentBlockVariants}
          className="mb-4 flex flex-wrap items-start justify-between gap-2 border-b border-gray-200 pb-4"
        >
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">
              Published:{" "}
              {blog.createdAt
                ? format(new Date(blog.createdAt), "MMM dd,yyyy")
                : "N/A"}
            </span>
            <div className="mt-1 flex items-center gap-4 text-sm text-text2">
              <span className="flex items-center gap-1">
                <FiMessageCircle className="inline" /> 10 Comments
              </span>
              <span className="flex items-center gap-1">
                <FiThumbsDown className="inline" /> 3
              </span>
              <span className="flex items-center gap-1">
                <FiThumbsUp className="inline" /> 115
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <button className="flex items-center gap-1 rounded border border-dashed border-text2 px-3 py-1 text-xs font-medium text-text2">
              Share Post <FiChevronDown className="inline" />
            </button>
            <button
              className="flex items-center gap-1 text-base font-bold text-text2 hover:underline"
              onClick={() => navigate(-1)}
            >
              <FiArrowLeft className="inline" /> Return back
            </button>
          </div>
        </motion.div>

        {/* Comment Section */}
        <motion.div variants={contentBlockVariants} className="mb-8">
          <Typography variant="h6" className="mb-4 text-center text-text2">
            Leave a Comment
          </Typography>
          <form className="space-y-4" onSubmit={handleCommentSubmit}>
            <div>
              <label className="mb-1 block text-sm text-text2">Name</label>
              <input
                type="text"
                name="name"
                value={commentForm.name}
                onChange={handleCommentChange}
                className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-text2"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-text2">Comment</label>
              <textarea
                name="comment"
                value={commentForm.comment}
                onChange={handleCommentChange}
                className="min-h-[80px] w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-text2"
                placeholder="Write your comment..."
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full rounded bg-text2 py-2 font-semibold text-white disabled:opacity-60"
              disabled={commentIsLoading}
            >
              {commentIsLoading ? "Commenting..." : "Comment"}
            </button>
          </form>
          {commentSuccess && (
            <Typography className="mt-4 text-center text-sm text-green-600">
              Comment posted successfully!
            </Typography>
          )}
          {commentReduxError && (
            <Typography className="mt-4 text-center text-sm text-red-600">
              {commentReduxError}
            </Typography>
          )}
        </motion.div>

        {/* Related Articles */}
        <motion.div
          variants={relatedSectionVariants}
          initial="initial"
          animate="animate"
          className="mt-8"
        >
          <Typography variant="h5" className="mb-4 font-bold text-text2">
            Related Articles
          </Typography>
          <div className="grid gap-4 md:grid-cols-2">
            {related.length === 0 && (
              <Typography className="text-gray-500">
                No related articles found.
              </Typography>
            )}
            {related.map((rel) => (
              <motion.div key={rel._id} variants={relatedCardVariants}>
                <Card
                  className="cursor-pointer overflow-hidden bg-white text-gray-900 shadow-md"
                  onClick={() => navigate(`/blog/${rel._id}`)}
                >
                  <div className="relative">
                    <img
                      src={rel.coverImage?.url || shaking}
                      alt={rel.title || "Blog cover"}
                      className="h-32 w-full object-cover"
                    />
                  </div>
                  <CardBody>
                    <Typography variant="h6" className="font-bold text-text2">
                      {rel.title || "Untitled"}
                    </Typography>
                    <Typography variant="small" className="text-gray-600">
                      {rel.summary || "No summary available."}
                    </Typography>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </motion.div>
  );
};

export default BlogDetails;
