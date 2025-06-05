import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ApiError,
  BlogPost,
  BlogCategory,
  WithdrawalRequest,
  Project,
} from "../../../types";
import { setMessage } from "../message.slices";
import AdminServices from "../../services/adminServices";

interface AdminState {
  isLoading: boolean;
  error: string | null;
  blogPosts: BlogPost[];
  categories: BlogCategory[];
  withdrawals: WithdrawalRequest[];
  selectedBlog: BlogPost | null;
  isApproving: boolean;
  isCreatingNotification: boolean;
}

const initialState: AdminState = {
  isLoading: false,
  error: null,
  blogPosts: [],
  categories: [],
  withdrawals: [],
  selectedBlog: null,
  isApproving: false,
  isCreatingNotification: false,
};

export const createBlogPost = createAsyncThunk(
  "blog/createBlogPost",
  async (body: FormData, thunkAPI) => {
    try {
      const data: BlogPost = await AdminServices.Blogs.CreateBlogPost(body);
      return data;
    } catch (error: unknown) {
      console.error("CreateBlogPost error:", error);
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to create blog post";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const fetchAllBlogsCategories = createAsyncThunk(
  "blog/fetchAllBlogsCategories",
  async (_, thunkAPI) => {
    try {
      const data: any = await AdminServices.Blogs.GetAllCategories();
      return data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to fetch blog categories";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const fetchAllBlogs = createAsyncThunk(
  "blog/fetchAllBlogs",
  async (_, thunkAPI) => {
    try {
      const data: { count: number; blogs: BlogPost[] } =
        await AdminServices.Blogs.GetAllBlogs();
      return data.blogs;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to fetch blogs";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const createProject = createAsyncThunk(
  "project/createProject",
  async (formData: FormData, thunkAPI) => {
    try {
      const data: Project = await AdminServices.Project.CreateProject(formData);
      return data;
    } catch (error: unknown) {
      console.log("error", error);
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to create project";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const createBlogCategory = createAsyncThunk(
  "blog/createBlogCategory",
  async (body: { name: string }, thunkAPI) => {
    try {
      const data: BlogCategory =
        await AdminServices.Blogs.CreateBlogCategory(body);
      return data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to create blog category";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const deleteBlogCategory = createAsyncThunk(
  "blog/deleteBlogCategory",
  async (categoryId: string, thunkAPI) => {
    try {
      const data = await AdminServices.Blogs.DeleteBlogCategory(categoryId);
      return { categoryId, data };
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to delete blog category";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const deleteBlogPost = createAsyncThunk(
  "blog/deleteBlogPost",
  async (blogId: string, thunkAPI) => {
    try {
      await AdminServices.Blogs.DeleteBlogPost(blogId);
      return blogId;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to delete blog post";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const fetchBlogById = createAsyncThunk(
  "blog/fetchBlogById",
  async (blogId: string, thunkAPI) => {
    try {
      const data: BlogPost = await AdminServices.Blogs.GetBlogById(blogId);
      return data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to fetch blog";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const fetchAllWithdrawals = createAsyncThunk(
  "admin/fetchAllWithdrawals",
  async (_, thunkAPI) => {
    try {
      const data: { count: number; withdrawals: WithdrawalRequest[] } =
        await AdminServices.Withdrawal.GetAllWithdrawals();
      return data.withdrawals;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to fetch withdrawals";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const approveWithdrawal = createAsyncThunk(
  "admin/approveWithdrawal",
  async (
    {
      withdrawalId,
      status,
      reason,
    }: { withdrawalId: string; status: string; reason?: string },
    thunkAPI,
  ) => {
    try {
      const data = await AdminServices.Withdrawal.ApproveWithdrawal(
        withdrawalId,
        {
          status,
          reason,
        },
      );
      return { withdrawalId, status, data };
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to update withdrawal status";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const createNotification = createAsyncThunk(
  "admin/createNotification",
  async (body: Notification, thunkAPI) => {
    try {
      const data = await AdminServices.Notification.CreateNotification(body);
      return data;
    } catch (error: unknown) {
      console.error("CreateNotification error:", error);
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to create notification";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateBlogPost = createAsyncThunk(
  "blog/updateBlogPost",
  async ({ blogId, body }: { blogId: string; body: FormData }, thunkAPI) => {
    try {
      const data: BlogPost = await AdminServices.Blogs.UpdateBlogPost(
        blogId,
        body,
      );
      return data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to update blog post";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const createBlogComment = createAsyncThunk(
  "blog/createBlogComment",
  async (
    {
      blogId,
      name,
      comment,
    }: { blogId: string; name: string; comment: string },
    thunkAPI,
  ) => {
    try {
      const data = await AdminServices.Blogs.CreateBlogComment(blogId, {
        name,
        comment,
      });
      return data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to post comment";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateBlogPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBlogPost.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedBlog = action.payload;
        state.blogPosts = state.blogPosts.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog,
        );
        if (state.selectedBlog?._id === updatedBlog._id) {
          state.selectedBlog = updatedBlog;
        }
      })
      .addCase(updateBlogPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createNotification.pending, (state) => {
        state.isCreatingNotification = true;
        state.error = null;
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.isCreatingNotification = false;
      })
      .addCase(createNotification.rejected, (state, action) => {
        state.isCreatingNotification = false;
        state.error = action.payload as string;
      })
      // createBlogPost
      .addCase(createBlogPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBlogPost.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload && typeof action.payload === "object") {
          if (!state.blogPosts) {
            state.blogPosts = [];
          }
          state.blogPosts.push(action.payload);
        }
      })
      .addCase(createBlogPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // fetchAllBlogsCategories
      .addCase(fetchAllBlogsCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllBlogsCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        if (
          action.payload &&
          action.payload.categories &&
          Array.isArray(action.payload.categories)
        ) {
          state.categories = action.payload.categories;
        } else if (Array.isArray(action.payload)) {
          state.categories = action.payload;
        } else {
          state.categories = [];
        }
      })
      .addCase(fetchAllBlogsCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // fetchAllBlogs
      .addCase(fetchAllBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogPosts = action.payload;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // createProject
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // createBlogCategory
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories.push(action.payload);
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // deleteBlogCategory
      .addCase(deleteBlogCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const { categoryId } = action.payload;
        state.categories = state.categories.filter(
          (category) => category._id !== categoryId,
        );
      })
      .addCase(deleteBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // deleteBlogPost
      .addCase(deleteBlogPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBlogPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogPosts = state.blogPosts.filter(
          (blog) => blog._id !== action.payload,
        );
      })
      .addCase(deleteBlogPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchBlogById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchAllWithdrawals.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllWithdrawals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.withdrawals = action.payload;
      })
      .addCase(fetchAllWithdrawals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // approveWithdrawal
      .addCase(approveWithdrawal.pending, (state) => {
        state.isApproving = true;
        state.error = null;
      })
      .addCase(approveWithdrawal.fulfilled, (state, action) => {
        state.isApproving = false;
        const { withdrawalId, status } = action.payload;
        const withdrawal = state.withdrawals.find(
          (w) => w._id === withdrawalId,
        );
        if (withdrawal) {
          withdrawal.status = status;
        }
        state.withdrawals = [...state.withdrawals];
      })
      .addCase(approveWithdrawal.rejected, (state, action) => {
        state.isApproving = false;
        state.error = action.payload as string;
      })
      .addCase(createBlogComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBlogComment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createBlogComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

const { reducer } = adminSlice;

export default reducer;
