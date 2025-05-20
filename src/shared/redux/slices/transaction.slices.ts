import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TransactionServices from "../services/transaction.services";
import {
  ApiError,
  GetWalletBalanceResponse,
  GetWalletCardResponse,
  FundWalletRequest,
  FundWalletResponse,
  VerifyFundWalletRequest,
  VerifyFundWalletResponse,
  GetUsersTransactionResponse,
  GetAllProjectResponse,
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
  GetAllBanksResponse,
  GetAccountNameRequest,
  GetAccountNameResponse,
  GeneratePinOTPResponse,
  CreateTransactionPinRequest,
  CreateTransactionPinResponse,
  DeleteCardRequest,
  DeleteCardResponse,
  WithdrawalFromWalletRequest,
  WithdrawalFromWalletResponse,
  Teir2KycResponse,
} from "../../types";
import { setMessage } from "./message.slices";

interface TransactionState {
  walletBalance: GetWalletBalanceResponse | null;
  walletCard: GetWalletCardResponse | null;
  contributionBalance: GetContributionBalanceResponse | null;
  usersTransaction: GetUsersTransactionResponse | null;
  allProjects: GetAllProjectResponse | null;
  contributionPlan: CreateContributionPlanResponse | null;
  fundWallet: FundWalletResponse | null;
  verifyFundWallet: VerifyFundWalletResponse | null;
  allBanks: GetAllBanksResponse | null;
  accountName: GetAccountNameResponse | null;
  pinOtp: GeneratePinOTPResponse | null;
  transactionPin: CreateTransactionPinResponse | null;
  withdrawalWallet: WithdrawalFromWalletResponse | null;
  withdrawalContribution: WithdrawalFromContributionResponse | null;
  usersContributionHistory: GetUsersContributionHistoryResponse | null;
  contributionDetails: GetContributionDetailsByIdResponse | null;
  payContribution: PayContributionResponse | null;
  payContributionPaystack: PayContributionPaystackResponse | null;
  payUnPaidContribution: PayUnPaidContributionResponse | null;
  unpaidBalance: GetUnPaidBalanceResponse | null;
  deleteCard: DeleteCardResponse | null;
  kycTier2: Teir2KycResponse | null;
  kycTier2Success: boolean;
  isLoading: boolean;
  error: string | null;
  fundWalletSuccess: boolean;
  verifyFundWalletSuccess: boolean;
  createContributionPlanSuccess: boolean;
  payContributionSuccess: boolean;
  payContributionPaystackSuccess: boolean;
  payUnPaidContributionSuccess: boolean;
  withdrawalWalletSuccess: boolean;
  withdrawalContributionSuccess: boolean;
  createTransactionPinSuccess: boolean;
  deleteCardSuccess: boolean;
}

const initialState: TransactionState = {
  walletBalance: null,
  walletCard: null,
  contributionBalance: null,
  usersTransaction: null,
  allProjects: null,
  contributionPlan: null,
  fundWallet: null,
  verifyFundWallet: null,
  allBanks: null,
  accountName: null,
  pinOtp: null,
  transactionPin: null,
  withdrawalWallet: null,
  withdrawalContribution: null,
  usersContributionHistory: null,
  contributionDetails: null,
  payContribution: null,
  payContributionPaystack: null,
  payUnPaidContribution: null,
  unpaidBalance: null,
  deleteCard: null,
  isLoading: false,
  error: null,
  fundWalletSuccess: false,
  verifyFundWalletSuccess: false,
  createContributionPlanSuccess: false,
  payContributionSuccess: false,
  payContributionPaystackSuccess: false,
  payUnPaidContributionSuccess: false,
  withdrawalWalletSuccess: false,
  withdrawalContributionSuccess: false,
  createTransactionPinSuccess: false,
  deleteCardSuccess: false,
  kycTier2: null,
  kycTier2Success: false,
};

export const GetWalletBalance = createAsyncThunk<
  GetWalletBalanceResponse,
  void,
  { rejectValue: string }
>("transaction/getWalletBalance", async (_, { dispatch, rejectWithValue }) => {
  try {
    const data = await TransactionServices.wallet.GetWalletBalance();
    return data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    const message = apiError.msg || "Failed to fetch wallet balance";
    dispatch(setMessage(message));
    return rejectWithValue(message);
  }
});

export const GetWalletCard = createAsyncThunk<
  GetWalletCardResponse,
  void,
  { rejectValue: string }
>("transaction/getWalletCard", async (_, { dispatch, rejectWithValue }) => {
  try {
    const data = await TransactionServices.wallet.GetWalletCard();
    return data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    const message = apiError.msg || "Failed to fetch wallet cards";
    dispatch(setMessage(message));
    return rejectWithValue(message);
  }
});

export const GetContributionBalance = createAsyncThunk<
  GetContributionBalanceResponse,
  void,
  { rejectValue: string }
>(
  "transaction/getContributionBalance",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const data =
        await TransactionServices.contribution.GetContributionBalance();
      return data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to fetch contribution balance";
      dispatch(setMessage(message));
      return rejectWithValue(message);
    }
  },
);

export const GetUsersTransaction = createAsyncThunk<
  GetUsersTransactionResponse,
  void,
  { rejectValue: string }
>(
  "transaction/getUsersTransaction",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const data = await TransactionServices.wallet.GetUsersTransaction();
      return data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to fetch transaction history";
      dispatch(setMessage(message));
      return rejectWithValue(message);
    }
  },
);

export const GetAllProject = createAsyncThunk<
  GetAllProjectResponse,
  void,
  { rejectValue: string }
>("transaction/getAllProject", async (_, { dispatch, rejectWithValue }) => {
  try {
    const data = await TransactionServices.project.GetAllProject();
    return data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    const message = apiError.msg || "Failed to fetch projects";
    dispatch(setMessage(message));
    return rejectWithValue(message);
  }
});

export const CreateContributionPlan = createAsyncThunk<
  CreateContributionPlanResponse,
  CreateContributionPlanRequest,
  { rejectValue: string }
>(
  "transaction/createContributionPlan",
  async (body, { dispatch, rejectWithValue }) => {
    try {
      const data =
        await TransactionServices.contribution.CreateContributionPlan(body);
      return data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to create contribution plan";
      dispatch(setMessage(message));
      return rejectWithValue(message);
    }
  },
);

export const FundWallet = createAsyncThunk<
  FundWalletResponse,
  FundWalletRequest,
  { rejectValue: string }
>("transaction/fundWallet", async (body, { dispatch, rejectWithValue }) => {
  try {
    const data = await TransactionServices.wallet.FundWallet(body);
    return data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    const message = apiError.msg || "Failed to fund wallet";
    dispatch(setMessage(message));
    return rejectWithValue(message);
  }
});

export const VerifyFundWallet = createAsyncThunk<
  VerifyFundWalletResponse,
  VerifyFundWalletRequest,
  { rejectValue: string }
>(
  "transaction/verifyFundWallet",
  async (body, { dispatch, rejectWithValue }) => {
    try {
      const data = await TransactionServices.wallet.VerifyFundWallet(body);
      return data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to verify wallet funding";
      dispatch(setMessage(message));
      return rejectWithValue(message);
    }
  },
);

export const GetAllBanks = createAsyncThunk<
  GetAllBanksResponse,
  void,
  { rejectValue: string }
>("transaction/getAllBanks", async (_, { dispatch, rejectWithValue }) => {
  try {
    const data = await TransactionServices.wallet.GetAllBanks();
    return data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    const message = apiError.msg || "Failed to fetch banks";
    dispatch(setMessage(message));
    return rejectWithValue(message);
  }
});

export const GetAccountName = createAsyncThunk<
  GetAccountNameResponse,
  GetAccountNameRequest,
  { rejectValue: string }
>("transaction/getAccountName", async (body, { dispatch, rejectWithValue }) => {
  try {
    const data = await TransactionServices.wallet.GetAccountName(body);
    return data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    const message = apiError.msg || "Failed to fetch account name";
    dispatch(setMessage(message));
    return rejectWithValue(message);
  }
});

export const GeneratePinOTP = createAsyncThunk<
  GeneratePinOTPResponse,
  void,
  { rejectValue: string }
>("transaction/generatePinOTP", async (_, { dispatch, rejectWithValue }) => {
  try {
    const data = await TransactionServices.wallet.GeneratePinOTP();
    return data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    const message = apiError.msg || "Failed to generate PIN OTP";
    dispatch(setMessage(message));
    return rejectWithValue(message);
  }
});

export const CreateTransactionPin = createAsyncThunk<
  CreateTransactionPinResponse,
  CreateTransactionPinRequest,
  { rejectValue: string }
>(
  "transaction/createTransactionPin",
  async (body, { dispatch, rejectWithValue }) => {
    try {
      const data = await TransactionServices.wallet.CreateTransactionPin(body);
      return data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to create transaction PIN";
      dispatch(setMessage(message));
      return rejectWithValue(message);
    }
  },
);

export const WithdrawalFromWallet = createAsyncThunk<
  WithdrawalFromWalletResponse,
  WithdrawalFromWalletRequest,
  { rejectValue: string }
>(
  "transaction/withdrawalFromWallet",
  async (body, { dispatch, rejectWithValue }) => {
    try {
      const data = await TransactionServices.wallet.WithdrawalFromWallet(body);
      return data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to withdraw from wallet";
      dispatch(setMessage(message));
      return rejectWithValue(message);
    }
  },
);

export const WithdrawalFromContribution = createAsyncThunk<
  WithdrawalFromContributionResponse,
  WithdrawalFromContributionRequest,
  { rejectValue: string }
>(
  "transaction/withdrawalFromContribution",
  async (body, { dispatch, rejectWithValue }) => {
    try {
      const data =
        await TransactionServices.contribution.WithdrawalFromContribution(body);
      return data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to withdraw from contribution";
      dispatch(setMessage(message));
      return rejectWithValue(message);
    }
  },
);

export const GetUsersContributionHistory = createAsyncThunk<
  GetUsersContributionHistoryResponse,
  { search?: string; filter?: string },
  { rejectValue: string }
>(
  "transaction/getUsersContributionHistory",
  async ({ search = "", filter = "" }, { dispatch, rejectWithValue }) => {
    try {
      const data =
        await TransactionServices.contribution.GetUsersContributionHistory(
          search,
          filter,
        );
      return data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to fetch contribution history";
      dispatch(setMessage(message));
      return rejectWithValue(message);
    }
  },
);

export const GetContributionDetailsById = createAsyncThunk<
  GetContributionDetailsByIdResponse,
  { contributionId: string; page?: number; limit?: number },
  { rejectValue: string }
>(
  "transaction/getContributionDetailsById",
  async ({ contributionId, page, limit }, { dispatch, rejectWithValue }) => {
    try {
      const data =
        await TransactionServices.contribution.GetContributionDetailsById(
          contributionId,
          page,
          limit,
        );
      return data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to fetch contribution details";
      dispatch(setMessage(message));
      return rejectWithValue(message);
    }
  },
);

export const PayContribution = createAsyncThunk<
  PayContributionResponse,
  PayContributionRequest,
  { rejectValue: string }
>(
  "transaction/payContribution",
  async (body, { dispatch, rejectWithValue }) => {
    try {
      const data = await TransactionServices.contribution.PayContribution(body);
      return data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to pay contribution";
      dispatch(setMessage(message));
      return rejectWithValue(message);
    }
  },
);

export const PayContributionPaystack = createAsyncThunk<
  PayContributionPaystackResponse,
  PayContributionPaystackRequest,
  { rejectValue: string }
>(
  "transaction/payContributionPaystack",
  async (body, { dispatch, rejectWithValue }) => {
    try {
      const data =
        await TransactionServices.contribution.PayContributionPaystack(body);
      return data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to pay contribution via Paystack";
      dispatch(setMessage(message));
      return rejectWithValue(message);
    }
  },
);

export const PayUnPaidContribution = createAsyncThunk<
  PayUnPaidContributionResponse,
  PayUnPaidContributionRequest,
  { rejectValue: string }
>(
  "transaction/payUnPaidContribution",
  async (body, { dispatch, rejectWithValue }) => {
    try {
      const data =
        await TransactionServices.contribution.PayUnPaidContribution(body);
      return data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to pay unpaid contribution";
      dispatch(setMessage(message));
      return rejectWithValue(message);
    }
  },
);

export const DeleteCard = createAsyncThunk<
  DeleteCardResponse,
  DeleteCardRequest,
  { rejectValue: string }
>("transaction/deleteCard", async (body, { dispatch, rejectWithValue }) => {
  try {
    const data = await TransactionServices.wallet.DeleteCard(body);
    return data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    const message = apiError.msg || "Failed to delete card";
    dispatch(setMessage(message));
    return rejectWithValue(message);
  }
});

export const GetUnPaidBalance = createAsyncThunk<
  GetUnPaidBalanceResponse,
  string,
  { rejectValue: string }
>(
  "transaction/getUnPaidBalance",
  async (contributionId, { dispatch, rejectWithValue }) => {
    try {
      const data =
        await TransactionServices.contribution.GetUnPaidBalance(contributionId);
      return data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to fetch unpaid balance";
      dispatch(setMessage(message));
      return rejectWithValue(message);
    }
  },
);

export const SubmitKycTier2 = createAsyncThunk<
  Teir2KycResponse,
  string,
  { rejectValue: string }
>(
  "transaction/submitKycTier2",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const data = await TransactionServices.kyc.SubmitKycTier2(userId);
      return data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.msg || "Failed to submit KYC Tier 2";
      dispatch(setMessage(message));
      return rejectWithValue(message);
    }
  },
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    resetFundWalletStatus: (state) => {
      state.fundWalletSuccess = false;
      state.fundWallet = null;
    },
    clearContributionDetails: (state) => {
      state.contributionDetails = null;
    },
    clearTransactionError: (state) => {
      state.error = null;
    },
    clearTransactionState(state) {
      state.payContributionSuccess = false;
      state.createContributionPlanSuccess = false;
      state.payContributionPaystackSuccess = false;
      state.error = null;
      state.contributionPlan = null;
      state.payContributionPaystack = null;
    },
  },
  extraReducers: (builder) => {
    // GetWalletBalance
    builder.addCase(GetWalletBalance.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(GetWalletBalance.fulfilled, (state, action) => {
      state.isLoading = false;
      state.walletBalance = action.payload;
    });
    builder.addCase(GetWalletBalance.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to fetch wallet balance";
      state.walletBalance = null;
    });

    // GetWalletCard
    builder.addCase(GetWalletCard.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(GetWalletCard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.walletCard = action.payload;
    });
    builder.addCase(GetWalletCard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to fetch wallet cards";
      state.walletCard = null;
    });

    // GetContributionBalance
    builder.addCase(GetContributionBalance.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(GetContributionBalance.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contributionBalance = action.payload;
    });
    builder.addCase(GetContributionBalance.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to fetch contribution balance";
      state.contributionBalance = null;
    });

    // GetUsersTransaction
    builder.addCase(GetUsersTransaction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(GetUsersTransaction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.usersTransaction = action.payload;
    });
    builder.addCase(GetUsersTransaction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to fetch transaction history";
      state.usersTransaction = null;
    });

    // GetAllProject
    builder.addCase(GetAllProject.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(GetAllProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allProjects = action.payload;
    });
    builder.addCase(GetAllProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to fetch projects";
      state.allProjects = null;
    });

    // CreateContributionPlan
    builder.addCase(CreateContributionPlan.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.createContributionPlanSuccess = false;
    });
    builder.addCase(CreateContributionPlan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contributionPlan = action.payload;
      state.createContributionPlanSuccess = true;
    });
    builder.addCase(CreateContributionPlan.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to create contribution plan";
      state.contributionPlan = null;
      state.createContributionPlanSuccess = false;
    });

    // FundWallet
    builder.addCase(FundWallet.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.fundWalletSuccess = false;
    });
    builder.addCase(FundWallet.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fundWallet = action.payload;
      state.fundWalletSuccess = true;
    });
    builder.addCase(FundWallet.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to fund wallet";
      state.fundWallet = null;
      state.fundWalletSuccess = false;
    });

    // VerifyFundWallet
    builder.addCase(VerifyFundWallet.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.verifyFundWalletSuccess = false;
    });
    builder.addCase(VerifyFundWallet.fulfilled, (state, action) => {
      state.isLoading = false;
      state.verifyFundWallet = action.payload;
      state.verifyFundWalletSuccess = true;
    });
    builder.addCase(VerifyFundWallet.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to verify wallet funding";
      state.verifyFundWallet = null;
      state.verifyFundWalletSuccess = false;
    });

    // GetAllBanks
    builder.addCase(GetAllBanks.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(GetAllBanks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allBanks = action.payload;
    });
    builder.addCase(GetAllBanks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to fetch banks";
      state.allBanks = null;
    });

    // GetAccountName
    builder.addCase(GetAccountName.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(GetAccountName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.accountName = action.payload;
    });
    builder.addCase(GetAccountName.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to fetch account name";
      state.accountName = null;
    });

    // GeneratePinOTP
    builder.addCase(GeneratePinOTP.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(GeneratePinOTP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pinOtp = action.payload;
    });
    builder.addCase(GeneratePinOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to generate PIN OTP";
      state.pinOtp = null;
    });

    // CreateTransactionPin
    builder.addCase(CreateTransactionPin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.createTransactionPinSuccess = false;
    });
    builder.addCase(CreateTransactionPin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.transactionPin = action.payload;
      state.createTransactionPinSuccess = true;
    });
    builder.addCase(CreateTransactionPin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to create transaction PIN";
      state.transactionPin = null;
      state.createTransactionPinSuccess = false;
    });

    // WithdrawalFromWallet
    builder.addCase(WithdrawalFromWallet.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.withdrawalWalletSuccess = false;
    });
    builder.addCase(WithdrawalFromWallet.fulfilled, (state, action) => {
      state.isLoading = false;
      state.withdrawalWallet = action.payload;
      state.withdrawalWalletSuccess = true;
    });
    builder.addCase(WithdrawalFromWallet.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to withdraw from wallet";
      state.withdrawalWallet = null;
      state.withdrawalWalletSuccess = false;
    });

    // WithdrawalFromContribution
    builder.addCase(WithdrawalFromContribution.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.withdrawalContributionSuccess = false;
    });
    // In WithdrawalFromContribution.fulfilled
    builder.addCase(WithdrawalFromContribution.fulfilled, (state, action) => {
      state.isLoading = false;
      state.withdrawalContribution = action.payload;
      state.withdrawalContributionSuccess = true;
    });
    builder.addCase(WithdrawalFromContribution.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to withdraw from contribution";
      state.withdrawalContribution = null;
      state.withdrawalContributionSuccess = false;
    });

    // GetUsersContributionHistory
    builder.addCase(GetUsersContributionHistory.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(GetUsersContributionHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.usersContributionHistory = action.payload;
    });
    builder.addCase(GetUsersContributionHistory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to fetch contribution history";
      state.usersContributionHistory = null;
    });

    // GetContributionDetailsById
    builder.addCase(GetContributionDetailsById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(GetContributionDetailsById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contributionDetails = action.payload;
    });
    builder.addCase(GetContributionDetailsById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to fetch contribution details";
      state.contributionDetails = null;
    });

    // PayContribution
    builder.addCase(PayContribution.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.payContributionSuccess = false;
    });
    builder.addCase(PayContribution.fulfilled, (state, action) => {
      state.isLoading = false;
      state.payContribution = action.payload;
      state.payContributionSuccess = true;
    });
    builder.addCase(PayContribution.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to pay contribution";
      state.payContribution = null;
      state.payContributionSuccess = false;
    });

    // PayContributionPaystack
    builder.addCase(PayContributionPaystack.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.payContributionPaystackSuccess = false;
    });
    builder.addCase(PayContributionPaystack.fulfilled, (state, action) => {
      state.isLoading = false;
      state.payContributionPaystack = action.payload;
      state.payContributionPaystackSuccess = true;
    });
    builder.addCase(PayContributionPaystack.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to pay contribution via Paystack";
      state.payContributionPaystack = null;
      state.payContributionPaystackSuccess = false;
    });

    // PayUnPaidContribution
    builder.addCase(PayUnPaidContribution.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.payUnPaidContributionSuccess = false;
    });
    builder.addCase(PayUnPaidContribution.fulfilled, (state, action) => {
      state.isLoading = false;
      state.payUnPaidContribution = action.payload;
      state.payUnPaidContributionSuccess = true;
    });
    builder.addCase(PayUnPaidContribution.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to pay unpaid contribution";
      state.payUnPaidContribution = null;
      state.payUnPaidContributionSuccess = false;
    });

    // DeleteCard
    builder.addCase(DeleteCard.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.deleteCardSuccess = false;
    });
    builder.addCase(DeleteCard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.deleteCard = action.payload;
      state.deleteCardSuccess = true;
    });
    builder.addCase(DeleteCard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to delete card";
      state.deleteCard = null;
      state.deleteCardSuccess = false;
    });

    // GetUnPaidBalance
    builder.addCase(GetUnPaidBalance.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(GetUnPaidBalance.fulfilled, (state, action) => {
      state.isLoading = false;
      state.unpaidBalance = action.payload;
    });
    builder
      .addCase(GetUnPaidBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch unpaid balance";
        state.unpaidBalance = null;
      })

      .addCase(SubmitKycTier2.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.kycTier2Success = false;
      })
      .addCase(SubmitKycTier2.fulfilled, (state, action) => {
        state.isLoading = false;
        state.kycTier2 = action.payload;
        state.kycTier2Success = true;
      })
      .addCase(SubmitKycTier2.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to submit KYC Tier 2";
        state.kycTier2 = null;
        state.kycTier2Success = false;
      });
  },
});

export const { clearTransactionError, clearTransactionState } =
  transactionSlice.actions;
export const { resetFundWalletStatus, clearContributionDetails } =
  transactionSlice.actions;

export default transactionSlice.reducer;
