import axios from "axios";
import authHeader from "./headers";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const API_URL_VERIFY_CONTRIBUTION =
  import.meta.env.VITE_REACT_APP_API_URL + `/contribution/verify-contribution`;

const API_URL_VERIFY_UNPAID_CONTRIBUTION =
  import.meta.env.VITE_REACT_APP_API_URL + `/contribution/verify-unpaid`;

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

const GetUsersContributionHistory = async (page: number, limit: number) => {
  const url = `${API_URL}/contribution/contribute?page=${page}&limit=${limit}`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const PayContribution = async (body: any) => {
  const url = `${API_URL}/contribution/pay`;
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

const GetContributionDetailsById = async (
  contributionId: any,
  page: number,
  limit: number,
) => {
  const url = `${API_URL}/contribution/history?contributionId=${contributionId}&page=${page}&limit=${limit}`;
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

const VerifyFundContribution = async (params: any) => {
  try {
    const token = sessionStorage.getItem("userData");
    if (!token) {
      throw new Error("Authorization token not found.");
    }
    const queryString = `reference=${params.reference}${params.addCard ? "&addCard=true" : ""}`;
    const response = await axios.get(
      `${API_URL_VERIFY_CONTRIBUTION}?${queryString}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response?.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const VerifyUnpaidFundContribution = async (params: any) => {
  try {
    const token = sessionStorage.getItem("userData");
    if (!token) {
      throw new Error("Authorization token not found.");
    }
    const queryString = `reference=${params.reference}${params.addCard ? "&addCard=true" : ""}`;
    const response = await axios.get(
      `${API_URL_VERIFY_UNPAID_CONTRIBUTION}?${queryString}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response?.data;
  } catch (error: any) {
    handleApiError(error);
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

const GetAllUserFundedProject = async () => {
  const url = `${API_URL}/project/funded`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const FundProject = async (body: any, projectId: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/project/${projectId}/fund`,
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

const GetProjectById = async (projectId: string) => {
  const url = `${API_URL}/project/${projectId}`;
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
    console.error("Delete card error:", error);
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
  SendProposal,
  GetProposal,
  GetAllProject,
  CreateContributionPlan,
  FundWallet,
  VerifyFundWallet,
  FundProject,
  GetProjectById,
  GetAllBanks,
  GetAccountName,
  CreateTransactionPin,
  WithdrawalFromWallet,
  GetAllUserFundedProject,
  GetUsersContributionHistory,
  VerifyFundContribution,
  GetContributionDetailsById,
  PayContribution,
  WithdrawalFromContribution,
  PayUnPaidContribution,
  deleteCard,
  GetUnPaidBalance,
  GeneratePinOTP,
  VerifyUnpaidFundContribution,
};

export default TransactionServices;
