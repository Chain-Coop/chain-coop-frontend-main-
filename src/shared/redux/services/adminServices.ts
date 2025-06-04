import axios, { AxiosError } from "axios";
import authHeader from "./headers";
import { API_ENDPOINTS } from "../../utils/apiEndpoints";
import { ApiError, BackendError } from "../../types";

const handleAxiosError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<BackendError>;
    const response = axiosError.response;
    const status = response?.status;
    const data = response?.data;

    const errorMessage =
      data?.error ||
      data?.msg ||
      data?.message ||
      "An unexpected error occurred";

    if (status === 400) {
      return { msg: errorMessage || "Invalid request data.", status };
    } else if (status === 401) {
      return { msg: errorMessage || "Unauthorized. Please log in.", status };
    } else if (status === 429) {
      return {
        msg: errorMessage || "Too many requests. Try again later.",
        status,
      };
    } else if (status === 500) {
      return {
        msg: errorMessage || "Server error. Please try again later.",
        status,
      };
    }

    return { msg: errorMessage || "Network Error: Please try again.", status };
  }
  return { msg: "An unexpected error occurred." };
};

const CreateNotification = async (body: Notification) => {
  try {
    const response = await axios.post(API_ENDPOINTS.NOTIFICATION.CREATE, body, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const CreateBlogPost = async (body: any) => {
  try {
    const response = await axios.post(API_ENDPOINTS.BLOG.CREATE, body, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const GetAllCategories = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.BLOG.GET_ALL_CATEGORIES, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const GetAllBlogs = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.BLOG.GET_ALL_BLOGS, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const CreateProject = async (formData: FormData) => {
  try {
    const response = await axios.post(API_ENDPOINTS.PROJECT.CREATE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const CreateBlogCategory = async (body: { name: string }) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.BLOG.CREATE_BLOG_CATEGORY,
      body,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const DeleteBlogCategory = async (categoryId: string) => {
  try {
    const response = await axios.delete(
      API_ENDPOINTS.BLOG.DELETE_BLOG_CATEGORY(categoryId),
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const DeleteBlogPost = async (blogId: string) => {
  try {
    const response = await axios.delete(
      API_ENDPOINTS.BLOG.DELETE_BLOG(blogId),
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const GetBlogById = async (blogId: string) => {
  try {
    const response = await axios.get(
      API_ENDPOINTS.BLOG.GET_BLOG_BY_ID(blogId),
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const GetAllWithdrawals = async () => {
  try {
    const response = await axios.get(
      API_ENDPOINTS.WITHDRAWAL.GET_ALL_REQUESTS,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const ApproveWithdrawal = async (
  withdrawalId: string,
  body: { status: string; reason?: string },
) => {
  try {
    const response = await axios.patch(
      API_ENDPOINTS.WITHDRAWAL.APPROVE_WITHDRAWAL(withdrawalId),
      body,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const UpdateBlogPost = async (blogId: string, body: FormData) => {
  try {
    const response = await axios.patch(
      API_ENDPOINTS.BLOG.UPDATE_BLOG(blogId),
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...authHeader(),
        },
      },
    );
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const AdminServices = {
  Notification: {
    CreateNotification,
  },
  Blogs: {
    CreateBlogPost,
    GetAllCategories,
    GetAllBlogs,
    CreateBlogCategory,
    DeleteBlogCategory,
    DeleteBlogPost,
    GetBlogById,
    UpdateBlogPost,
  },

  Project: {
    CreateProject,
  },
  Withdrawal: {
    GetAllWithdrawals,
    ApproveWithdrawal,
  },
};

export default AdminServices;
