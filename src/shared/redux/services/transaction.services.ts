import axios from "axios";
import authHeader from "./headers";

const API_URL = (import.meta as any).env.VITE_REACT_APP_API_URL;

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

const GetWalletCard = async () => {
  const url = `${API_URL}/wallet/cards`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const FundWallet = async (body: any) => {
  const url = `${API_URL}/wallet/fund-wallet`;
  try {
    const token = sessionStorage.getItem("userData");
    if (!token) {
      throw new Error("Authorization token not found.");
    }
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const VerifyFundWallet = async (body: any) => {
  const url = `${API_URL}/wallet/verify-payment`;
  try {
    const token = sessionStorage.getItem("userData");
    if (!token) {
      throw new Error("Authorization token not found.");
    }
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
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

const WithdrawalFromWallet = async (body: any) => {
  const url = `${API_URL}/withdrawal/request-withdrawal`;

  try {
    const response = await axios.post(url, body, {
      headers: authHeader(),
    });
    return response?.data;
  } catch (error: any) {
    if (error.response.data) {
      throw error.response.data;
    } else {
      throw new Error("Network Error: Please check your internet connection.");
    }
  }
};

const CreateContributionPlan = async (body: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/contribution/contribute`,
      body,
      {
        headers: authHeader(),
      },
    );
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

const GetUsersContributionHistory = async (
  page: number,
  limit: number,
  sort: string = "desc",
  search: string = "",
  filter: string = "",
) => {
  const searchParam = search
    ? `&search=${encodeURIComponent(search.trim())}`
    : "";
  const filterParam = filter ? `&filter=${encodeURIComponent(filter)}` : "";
  const url = `${API_URL}/contribution/contribute?page=${page}&limit=${limit}&sort=${sort}${searchParam}${filterParam}`;

  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const PayContribution = async (body: any) => {
  const url = `${API_URL}/contribution/pay-contribution`;
  try {
    const response = await axios.post(url, body, {
      headers: authHeader(),
    });
    return response?.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const PayContributionPaystack = async (body: any) => {
  const url = `${API_URL}/contribution/pay`;
  try {
    const response = await axios.post(url, body, {
      headers: authHeader(),
    });
    return response?.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const GetContributionDetailsById = async (
  contributionId: any,
  page?: number,
  limit?: number,
) => {
  const url = `${API_URL}/contribution/history?contributionId=${contributionId}${
    page ? `&page=${page}` : ""
  }${limit ? `&limit=${limit}` : ""}`;

  try {
    const response = await axios({
      url,
      headers: authHeader(),
      method: "get",
    });
    const token = response?.data?.data?.tokens?.accessToken;
    if (token) {
      sessionStorage.setItem("userData", token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const WithdrawalFromContribution = async (body: any) => {
  const url = `${API_URL}/contribution/withdraw`;
  try {
    const response = await axios.post(url, body, {
      headers: authHeader(),
    });
    return response?.data;
  } catch (error: any) {
    if (error.response.data) {
      throw error.response.data;
    } else {
      throw new Error("Network Error: Please check your internet connection.");
    }
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

const GetAllBanks = async () => {
  const url = `${API_URL}/withdrawal/all-banks`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const GetAccountName = async (body: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/withdrawal/verify-bank-account`,
      body,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const GeneratePinOTP = async () => {
  const url = `${API_URL}/wallet/generate-pin-otp`;
  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: authHeader(),
      },
    );
    return response?.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error("Network Error: Please check your internet connection.");
    }
  }
};

const CreateTransactionPin = async (body: any) => {
  const url = `${API_URL}/wallet/change-pin`;

  try {
    const response = await axios.post(url, body, {
      headers: authHeader(),
    });
    return response?.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error("Network Error: Please check your internet connection.");
    }
  }
};
const PayUnPaidContribution = async (body: any) => {
  const url = `${API_URL}/contribution/charge-unpaid`;
  try {
    const response = await axios.post(url, body, {
      headers: authHeader(),
    });
    return response?.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error("Network Error: Please check your internet connection.");
    }
  }
};

const deleteCard = async (body: { cardId: string }) => {
  const url = `${API_URL}/wallet/cards`;

  try {
    const response = await axios({
      url,
      method: "DELETE",
      headers: authHeader(),
      data: { cardId: body.cardId },
    });

    const token = response?.data?.data?.tokens?.accessToken;
    if (token) {
      sessionStorage.setItem("userData", token);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

const GetUnPaidBalance = async (contributionId: any) => {
  const url = `${API_URL}/contribution/unpaid?contributionId=${contributionId}`;
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
  GetAllProject,
  CreateContributionPlan,
  FundWallet,
  VerifyFundWallet,
  GetAllBanks,
  GetAccountName,
  CreateTransactionPin,
  WithdrawalFromWallet,
  GetUsersContributionHistory,
  GetContributionDetailsById,
  PayContribution,
  WithdrawalFromContribution,
  PayUnPaidContribution,
  deleteCard,
  GetUnPaidBalance,
  GeneratePinOTP,
  GetWalletCard,
  PayContributionPaystack,
};

export default TransactionServices;
