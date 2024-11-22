import axios from "axios";
import authHeader from "./headers";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const API_URL_PAY_CONTRIBUTION =
  import.meta.env.VITE_REACT_APP_API_URL + "/contribution/pay";

const API_URL_PAY_UNPAID_CONTRIBUTION =
  import.meta.env.VITE_REACT_APP_API_URL + "/contribution/charge-unpaid";

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

//WALLET

//Get wallet balance
const GetWalletBalance = async () => {
  const url = `${API_URL}/wallet/balance`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

//Fund wallet
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

//Verify fund wallet
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

//Get user transaction history
const GetUsersTransaction = async () => {
  const url = `${API_URL}/wallet/history`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

// withdraw from wallet
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

//CONTRIBUTION

//Create contribution
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

//Get contribution balance
const GetContributionBalance = async () => {
  const url = `${API_URL}/contribution/balance`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

//Get contribution history
const GetUsersContributionHistory = async (page: number, limit: number) => {
  const url = `${API_URL}/contribution/contribute?page=${page}&limit=${limit}`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

//Pay contribution
const PayContribution = async (body: any) => {
  try {
    const response = await axios.post(API_URL_PAY_CONTRIBUTION, body, {
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

//Get contribution track by id
const GetContributionDetailsById = async (contributionId: any) => {
  const url = `${API_URL}/contribution/history?contributionId=${contributionId}`;
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

// Verify fund contribution
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

// Withdraw from contribution
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

//PROPOSAL

//Send Proposal
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

//Get all user Proposal
const GetProposal = async () => {
  const url = `${API_URL}/proposals`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

// PROJECTS

//Get all projects
const GetAllProject = async () => {
  const url = `${API_URL}/project/all-projects`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

//Get all user funded projects
const GetAllUserFundedProject = async () => {
  const url = `${API_URL}/project/funded`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    console.log("rr", response);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

// Fund a project
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

//Get project details by id
const GetProjectById = async (projectId: string) => {
  const url = `${API_URL}/project/${projectId}`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

// BANK ACCOUNT

// Get all Banks
const GetAllBanks = async () => {
  const url = `${API_URL}/withdrawal/all-banks`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

// Get user account name
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

// WALLET PIN

// Generate OTP for wallet Pin
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

//Create pin
const CreateTransactionPin = async (body: any) => {
  const url = `${API_URL}/wallet/create-pin`;

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
  try {
    const response = await axios.post(API_URL_PAY_UNPAID_CONTRIBUTION, body, {
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
