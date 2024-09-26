import axios from "axios";
import authHeader from "./headers";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const API_URL_FUND_WALLET =
  import.meta.env.VITE_REACT_APP_API_URL + "/wallet/fund-wallet";

const API_URL_VERIFY_FUND_WALLET =
  import.meta.env.VITE_REACT_APP_API_URL + "/wallet/verify-payment";

  const handleApiError = (error: any) => {
    if (!error.response) {
      throw new Error("Network Error: Please check your internet connection.");
    } else {
      throw error.response.data;
    }
  };

const GetWalletBalance = async () => {
  const url = `${API_URL}/wallet/balance`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const GetContributionBalance = async () => {
  const url = `${API_URL}/contribution/balance`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const GetUsersTransaction = async () => {
  const url = `${API_URL}/wallet/history`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const SendProposal = async (formData: FormData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        ...authHeader(),
      },
    };
    const response = await axios.post(`${API_URL}/proposals`, formData, config);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const GetProposal = async () => {
  const url = `${API_URL}/proposals`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};


const GetAllProject = async () => {
  const url = `${API_URL}/project/all-projects`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const CreateContributionPlan = async (body: any) => {
  try {
    const response = await axios.post(`${API_URL}/contribution/contribute`, body, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const UploadPaymentReceipt = async (formData: FormData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        ...authHeader(),
      },
    };
    const response = await axios.post(`${API_URL}/wallet/upload-receipt`, formData, config);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const FundWallet = async (body: any) => {
  try {
    const token = sessionStorage.getItem("userData");
    if (!token) {
      throw new Error("Authorization token not found.");
    }
    const response = await axios.post(
      API_URL_FUND_WALLET, 
      body, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

const VerifyFundWallet = async (body: any) => {
  try {
    const token = sessionStorage.getItem("userData");
    if (!token) {
      throw new Error("Authorization token not found.");
    }
    const response = await axios.post(
      API_URL_VERIFY_FUND_WALLET, 
      body, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

const FundProject = async (body: any, projectId: string) => {
  try {
    const response = await axios.post(`${API_URL}/project/${projectId}/fund`, body, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const GetProjectById = async (projectId: string) => {
  const url = `${API_URL}/project/${projectId}`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};


const TransactionServices = {
  GetWalletBalance,
  GetContributionBalance,
  GetUsersTransaction,
  SendProposal,
  GetProposal,
  GetAllProject,
  CreateContributionPlan,
  UploadPaymentReceipt,
  FundWallet,
  VerifyFundWallet,
  FundProject,
  GetProjectById,
};

export default TransactionServices;
