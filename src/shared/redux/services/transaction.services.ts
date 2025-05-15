import axios, { AxiosError } from "axios";
import authHeader from "./headers";
import {
  ApiError,
  GetWalletBalanceResponse,
  GetWalletCardResponse,
  FundWalletRequest,
  FundWalletResponse,
  VerifyFundWalletRequest,
  VerifyFundWalletResponse,
  GetUsersTransactionResponse,
  WithdrawalFromWalletRequest,
  WithdrawalFromWalletResponse,
  GetAllBanksResponse,
  GetAccountNameRequest,
  GetAccountNameResponse,
  GeneratePinOTPResponse,
  CreateTransactionPinRequest,
  CreateTransactionPinResponse,
  DeleteCardRequest,
  DeleteCardResponse,
  CreateContributionPlanRequest,
  CreateContributionPlanResponse,
  GetContributionBalanceResponse,
  GetUsersContributionHistoryResponse,
  PayContributionRequest,
  PayContributionResponse,
  PayContributionPaystackRequest,
  PayContributionPaystackResponse,
  GetContributionDetailsByIdResponse,
  WithdrawalFromContributionRequest,
  WithdrawalFromContributionResponse,
  PayUnPaidContributionRequest,
  PayUnPaidContributionResponse,
  GetUnPaidBalanceResponse,
  GetAllProjectResponse,
  BackendError,
  Teir2KycResponse,
} from "../../types";
import { API_ENDPOINTS } from "../../utils/apiEndpoints";

const API_URL = (import.meta as any).env.VITE_REACT_APP_API_URL;

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
export async function GetWalletBalance(): Promise<GetWalletBalanceResponse> {
  const url = `${API_URL}${API_ENDPOINTS.WALLET.GET_BALANCE}`;
  try {
    const response = await axios.get<GetWalletBalanceResponse>(url, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function GetWalletCard(): Promise<GetWalletCardResponse> {
  const url = `${API_URL}${API_ENDPOINTS.WALLET.GET_CARDS}`;
  const headers = authHeader();
  try {
    const response = await axios.get<GetWalletCardResponse>(url, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function FundWallet(
  data: FundWalletRequest,
): Promise<FundWalletResponse> {
  const url = `${API_URL}${API_ENDPOINTS.WALLET.FUND_WALLET}`;
  try {
    const response = await axios.post<FundWalletResponse>(url, data, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function VerifyFundWallet(
  data: VerifyFundWalletRequest,
): Promise<VerifyFundWalletResponse> {
  const url = `${API_URL}${API_ENDPOINTS.WALLET.VERIFY_PAYMENT}`;
  try {
    const response = await axios.post<VerifyFundWalletResponse>(url, data, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function GetUsersTransaction(): Promise<GetUsersTransactionResponse> {
  const url = `${API_URL}${API_ENDPOINTS.WALLET.GET_HISTORY}`;
  try {
    const response = await axios.get<GetUsersTransactionResponse>(url, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}
export async function WithdrawalFromWallet(
  data: WithdrawalFromWalletRequest,
): Promise<WithdrawalFromWalletResponse> {
  const url = `${API_URL}${API_ENDPOINTS.WALLET.WITHDRAWAL}`;
  const headers = authHeader();

  try {
    const response = await axios.post<WithdrawalFromWalletResponse>(url, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log("err", error);
    throw handleAxiosError(error);
  }
}

export async function CreateContributionPlan(
  data: CreateContributionPlanRequest,
): Promise<CreateContributionPlanResponse> {
  const url = `${API_URL}${API_ENDPOINTS.CONTRIBUTION.CREATE_PLAN}`;
  try {
    const response = await axios.post<CreateContributionPlanResponse>(
      url,
      data,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function GetContributionBalance(): Promise<GetContributionBalanceResponse> {
  const url = `${API_URL}${API_ENDPOINTS.CONTRIBUTION.GET_BALANCE}`;
  try {
    const response = await axios.get<GetContributionBalanceResponse>(url, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function GetUsersContributionHistory(
  page: number,
  limit: number,
  search: string = "",
  filter: string = "",
): Promise<GetUsersContributionHistoryResponse> {
  let url = `${API_URL}${API_ENDPOINTS.CONTRIBUTION.GET_HISTORY}?page=${page}&limit=${limit}`;
  if (search && search.trim()) {
    url += `&search=${encodeURIComponent(search.trim())}`;
  }
  if (filter) {
    url += `&filter=${encodeURIComponent(filter)}`;
  }
  try {
    const response = await axios.get<GetUsersContributionHistoryResponse>(url, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function PayContribution(
  data: PayContributionRequest,
): Promise<PayContributionResponse> {
  const url = `${API_URL}${API_ENDPOINTS.CONTRIBUTION.PAY_CONTRIBUTION}`;
  try {
    const response = await axios.post<PayContributionResponse>(url, data, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function PayContributionPaystack(
  data: PayContributionPaystackRequest,
): Promise<PayContributionPaystackResponse> {
  const url = `${API_URL}${API_ENDPOINTS.CONTRIBUTION.PAY_WITH_PAYSTACK}`;
  try {
    const response = await axios.post<PayContributionPaystackResponse>(
      url,
      data,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function GetContributionDetailsById(
  contributionId: string,
  page?: number,
  limit?: number,
): Promise<GetContributionDetailsByIdResponse> {
  let url = `${API_URL}${API_ENDPOINTS.CONTRIBUTION.GET_DETAILS_BY_ID}?contributionId=${contributionId}`;
  if (page) url += `&page=${page}`;
  if (limit) url += `&limit=${limit}`;
  try {
    const response = await axios.get<GetContributionDetailsByIdResponse>(url, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function WithdrawalFromContribution(
  data: WithdrawalFromContributionRequest,
): Promise<WithdrawalFromContributionResponse> {
  const url = `${API_URL}${API_ENDPOINTS.CONTRIBUTION.WITHDRAW}`;
  try {
    const response = await axios.post<WithdrawalFromContributionResponse>(
      url,
      data,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function PayUnPaidContribution(
  data: PayUnPaidContributionRequest,
): Promise<PayUnPaidContributionResponse> {
  const url = `${API_URL}${API_ENDPOINTS.CONTRIBUTION.PAY_UNPAID}`;
  try {
    const response = await axios.post<PayUnPaidContributionResponse>(
      url,
      data,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function GetUnPaidBalance(
  contributionId: string,
): Promise<GetUnPaidBalanceResponse> {
  const url = `${API_URL}${API_ENDPOINTS.CONTRIBUTION.GET_UNPAID_BALANCE}?contributionId=${contributionId}`;
  try {
    const response = await axios.get<GetUnPaidBalanceResponse>(url, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function GetAllProject(): Promise<GetAllProjectResponse> {
  const url = `${API_URL}${API_ENDPOINTS.PROJECT.GET_ALL}`;
  try {
    const response = await axios.get<GetAllProjectResponse>(url, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function GetAllBanks(): Promise<GetAllBanksResponse> {
  const url = `${API_URL}${API_ENDPOINTS.WALLET.GET_BANKS}`;
  try {
    const response = await axios.get<GetAllBanksResponse>(url, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function GetAccountName(
  data: GetAccountNameRequest,
): Promise<GetAccountNameResponse> {
  const url = `${API_URL}${API_ENDPOINTS.WALLET.VERIFY_BANK_ACCOUNT}`;
  try {
    const response = await axios.post<GetAccountNameResponse>(url, data, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function GeneratePinOTP(): Promise<GeneratePinOTPResponse> {
  const url = `${API_URL}${API_ENDPOINTS.WALLET.GENERATE_PIN_OTP}`;
  try {
    const response = await axios.post<GeneratePinOTPResponse>(
      url,
      {},
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function CreateTransactionPin(
  data: CreateTransactionPinRequest,
): Promise<CreateTransactionPinResponse> {
  const url = `${API_URL}${API_ENDPOINTS.WALLET.CHANGE_PIN}`;
  try {
    const response = await axios.post<CreateTransactionPinResponse>(url, data, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function DeleteCard(
  data: DeleteCardRequest,
): Promise<DeleteCardResponse> {
  const url = `${API_URL}${API_ENDPOINTS.WALLET.DELETE_CARD}`;
  try {
    const response = await axios.delete<DeleteCardResponse>(url, {
      headers: authHeader(),
      data: { cardId: data.cardId },
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function SubmitKycTier2(
  userId: string,
): Promise<Teir2KycResponse> {
  const url = `${API_URL}${API_ENDPOINTS.KYC.TIER2.replace(":userId", userId)}`;
  try {
    const response = await axios.post<Teir2KycResponse>(
      url,
      {},
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

const TransactionServices = {
  wallet: {
    GetWalletBalance,
    GetWalletCard,
    FundWallet,
    VerifyFundWallet,
    GetUsersTransaction,
    WithdrawalFromWallet,
    GetAllBanks,
    GetAccountName,
    GeneratePinOTP,
    CreateTransactionPin,
    DeleteCard,
  },
  contribution: {
    CreateContributionPlan,
    GetContributionBalance,
    GetUsersContributionHistory,
    PayContribution,
    PayContributionPaystack,
    GetContributionDetailsById,
    WithdrawalFromContribution,
    PayUnPaidContribution,
    GetUnPaidBalance,
  },
  project: {
    GetAllProject,
  },
  kyc: {
    SubmitKycTier2,
  },
};

export default TransactionServices;
