import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setMessage } from "./message.slices";
import TransactionServices from "../services/transaction.services";

interface ContributionHistory {
  _id: string;
  contribution: string;
  currency: string;
  user: string;
  amount: number;
  Date: string;
  type: string;
  balance: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ContributionDetails {
  startDate: string;
  nextContributionDate: string;
  withdrawalDate: string;
  amount: number;
  status: string;
  contributionPlan: string;
  savingsCategory: string;
  balance: number;
  history: ContributionHistory[];
  currency: string;
}

export const GetWalletBalance = createAsyncThunk(
  "transaction/getWalletBalance",
  async (_, thunkAPI) => {
    try {
      const data = await TransactionServices.GetWalletBalance();
      return { transaction: data };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

export const GetWalletCard = createAsyncThunk(
  "transaction/getWalletCard",
  async (_, thunkAPI) => {
    try {
      const data = await TransactionServices.GetWalletCard();
      return { transaction: data };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

export const GetContributionBalance = createAsyncThunk(
  "transaction/getContributionBalance",
  async (_, thunkAPI) => {
    try {
      const data = await TransactionServices.GetContributionBalance();
      return { transaction: data };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

export const GetUsersTransaction = createAsyncThunk(
  "transaction/getUsersTransaction",
  async (_, thunkAPI) => {
    try {
      const data = await TransactionServices.GetUsersTransaction();
      return { transaction: data };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

export const GetAllProject = createAsyncThunk(
  "transaction/getAllProject",
  async (_, thunkAPI) => {
    try {
      const data = await TransactionServices.GetAllProject();
      return { transaction: data };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

export const CreateContributionPlan = createAsyncThunk(
  "transaction/createContributionPlan",
  async (body: any, thunkAPI) => {
    try {
      const data = await TransactionServices.CreateContributionPlan(body);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error || error);
    }
  },
);

const handleAsyncError = (error: any, thunkAPI: any) => {
  let message = error.error || "An error occurred. Please try again.";

  if (!error.response) {
    message = "Network error. Please check your internet connection.";
  }
  thunkAPI.dispatch(setMessage(message));
  return thunkAPI.rejectWithValue(message);
};

export const FundWallet = createAsyncThunk(
  "transaction/fundWallet",
  async (body: any, thunkAPI) => {
    try {
      const data = await TransactionServices.FundWallet(body);
      return { transaction: data };
    } catch (error: any) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const VerifyFundWallet = createAsyncThunk(
  "transaction/verifyFundWallet",
  async (body: any, thunkAPI) => {
    try {
      const data = await TransactionServices.VerifyFundWallet(body);
      return { transaction: data };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

export const GetAllBanks = createAsyncThunk(
  "transaction/getAllBanks",
  async (_, thunkAPI) => {
    try {
      const data = await TransactionServices.GetAllBanks();
      return { transaction: data };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

export const GetAccountName = createAsyncThunk(
  "transaction/getAccountName",
  async (body: any, thunkAPI) => {
    try {
      const data = await TransactionServices.GetAccountName(body);
      return { transaction: data };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.error || "An unexpected error occurred",
      );
    }
  },
);

export const GeneratePinOTP = createAsyncThunk(
  "transaction/generatePinOTP",
  async (_, thunkAPI) => {
    try {
      const data = await TransactionServices.GeneratePinOTP();
      return { landing: data };
    } catch (error: any) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const CreateTransactionPin = createAsyncThunk(
  "transaction/createTransaction",
  async (body: { otp: number; newpin: string }, thunkAPI) => {
    try {
      const response = await TransactionServices.CreateTransactionPin(body);
      return response;
    } catch (error: any) {
      if (error?.msg) {
        return thunkAPI.rejectWithValue(error.msg);
      }
      return thunkAPI.rejectWithValue("Failed to create PIN");
    }
  },
);

export const WithdrawalFromWallet = createAsyncThunk(
  "transaction/withdrawalFromWallet",
  async (body: any, thunkAPI) => {
    try {
      const data = await TransactionServices.WithdrawalFromWallet(body);
      return { landing: data };
    } catch (error: any) {
      const message = error;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const WithdrawalFromContribution = createAsyncThunk(
  "transaction/withdrawalFromContribution",
  async (body: any, thunkAPI) => {
    try {
      const data = await TransactionServices.WithdrawalFromContribution(body);
      return { landing: data };
    } catch (error: any) {
      const message = error;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const GetUsersContributionHistory = createAsyncThunk(
  "transaction/getUsersContributionHistory",
  async ({ page, limit }: { page: number; limit: number }, thunkAPI) => {
    try {
      const data = await TransactionServices.GetUsersContributionHistory(
        page,
        limit,
      );
      return { transaction: data };
      console.log("data", data);
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

export const GetContributionDetailsById = createAsyncThunk(
  "transaction/getContributionDetailsById",
  async ({
    contributionId,
    page,
    limit,
  }: {
    contributionId: any;
    page?: number;
    limit?: number;
  }) => {
    const response = await TransactionServices.GetContributionDetailsById(
      contributionId,
      page,
      limit,
    );
    return response;
  },
);

export const PayContribution = createAsyncThunk(
  "transaction/payContribution",
  async (body: any, thunkAPI) => {
    try {
      const data = await TransactionServices.PayContribution(body);
      return { landing: data };
    } catch (error: any) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const PayUnPaidContribution = createAsyncThunk(
  "transaction/payUnPaidContribution",
  async (body: any, thunkAPI) => {
    try {
      const data = await TransactionServices.PayUnPaidContribution(body);
      return { landing: data };
    } catch (error: any) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const deleteCard = createAsyncThunk(
  "transaction/deleteCard",
  async (body: any, thunkAPI) => {
    try {
      const response = await TransactionServices.deleteCard(body);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const GetUnPaidBalance = createAsyncThunk(
  "transaction/getUnPaidBalance",
  async (contributionId: string, thunkAPI) => {
    try {
      const data = await TransactionServices.GetUnPaidBalance(contributionId);
      return { transaction: data };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

interface TransactionState {
  getWalletBalance: any | null;
  getWalletCard: any | null;
  getUnPaidContributionBalance: any | null;
  getContributionBalance: any | null;
  getUsersTransaction: any | null;
  getUsersContribution: any | null;
  fundWalletStatus: "idle" | "loading" | "success" | "failed";
  allProjects: any;
  allBanks: any;
  contributionPlan: any;
  fundUserWallet: any | null;
  veryfyFundUserWallet: any | null;
  getUserAccountName: null;
  currentProject: any | null;
  createPin: any | null;
  getPinOtp: any | null;
  removeCard: null;
  fundContribution: any | null;
  fundUnPaidContribution: any | null;
  requestWithdrawalWallet: any | null;
  requestWithdrawalContribution: any | null;
  contributionDetails: ContributionDetails | null;
  loading: boolean;
  error: string | null | Record<string, unknown>;
}

const initialState: TransactionState = {
  getWalletBalance: null,
  getWalletCard: null,
  getUnPaidContributionBalance: null,
  getContributionBalance: null,
  getUsersTransaction: null,
  getUsersContribution: null,
  fundWalletStatus: "idle",
  allProjects: null,
  allBanks: null,
  contributionPlan: null,
  fundUserWallet: null,
  getUserAccountName: null,
  veryfyFundUserWallet: null,
  currentProject: null,
  createPin: null,
  getPinOtp: null,
  fundContribution: null,
  fundUnPaidContribution: null,
  requestWithdrawalWallet: null,
  requestWithdrawalContribution: null,
  removeCard: null,
  contributionDetails: null,
  loading: false,
  error: null,
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    resetFundWalletStatus: (state) => {
      state.fundWalletStatus = "idle";
    },
    clearContributionDetails: (state) => {
      state.contributionDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        GetWalletBalance.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.getWalletBalance = action.payload.transaction;
        },
      )
      .addCase(GetWalletBalance.rejected, (state) => {
        state.getWalletBalance = null;
      })

      .addCase(
        GetWalletCard.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.getWalletCard = action.payload.transaction;
        },
      )
      .addCase(GetWalletCard.rejected, (state) => {
        state.getWalletCard = null;
      })

      .addCase(GetContributionBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        GetContributionBalance.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.loading = false;
          state.getContributionBalance = action.payload.transaction;
        },
      )
      .addCase(GetContributionBalance.rejected, (state, action) => {
        state.loading = false;
        state.getContributionBalance = null;
        state.error = action.payload as string;
      })

      .addCase(
        GetUsersTransaction.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.getUsersTransaction = action.payload.transaction;
        },
      )
      .addCase(GetUsersTransaction.rejected, (state) => {
        state.getUsersTransaction = null;
      })

      .addCase(GetAllProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        GetAllProject.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.loading = false;
          state.allProjects = action.payload.transaction;
        },
      )
      .addCase(GetAllProject.rejected, (state, action) => {
        state.loading = false;
        state.allProjects = null;
        state.error = action.payload as string;
      })

      .addCase(
        CreateContributionPlan.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.contributionPlan = action.payload.contribution;
          state.error = null;
        },
      )

      .addCase(CreateContributionPlan.rejected, (state, action) => {
        state.contributionPlan = null;
        state.error =
          (action as string | Record<string, unknown>) ||
          "An unknown error occurred";
      })

      .addCase(
        VerifyFundWallet.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.veryfyFundUserWallet = action.payload.transaction;
        },
      )
      .addCase(VerifyFundWallet.rejected, (state) => {
        state.veryfyFundUserWallet = null;
      })

      .addCase(GetAllBanks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        GetAllBanks.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.allBanks = action.payload.transaction;
        },
      )
      .addCase(GetAllBanks.rejected, (state, action) => {
        state.loading = false;
        state.allBanks = null;
        state.error = action.payload as string;
      })

      .addCase(GetAccountName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        GetAccountName.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getUserAccountName = action.payload;
        },
      )
      .addCase(GetAccountName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(CreateTransactionPin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateTransactionPin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.createPin = action.payload;
      })
      .addCase(CreateTransactionPin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.createPin = null;
      })

      .addCase(GeneratePinOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
    builder.addCase(GeneratePinOTP.fulfilled, (state, action) => {
      state.getPinOtp = action.payload.landing;
    });
    builder
      .addCase(GeneratePinOTP.rejected, (state) => {
        state.getPinOtp = null;
      })

      .addCase(WithdrawalFromWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
    builder.addCase(WithdrawalFromWallet.fulfilled, (state, action) => {
      state.loading = false;
      state.requestWithdrawalWallet = action.payload.landing;
    });
    builder
      .addCase(WithdrawalFromWallet.rejected, (state) => {
        state.loading = false;
        state.requestWithdrawalWallet = null;
      })

      .addCase(WithdrawalFromContribution.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
    builder.addCase(WithdrawalFromContribution.fulfilled, (state, action) => {
      state.loading = false;
      state.requestWithdrawalContribution = action.payload.landing;
    });
    builder
      .addCase(WithdrawalFromContribution.rejected, (state) => {
        state.loading = false;
        state.requestWithdrawalContribution = null;
      })

      .addCase(GetUsersContributionHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        GetUsersContributionHistory.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.loading = false;
          state.getUsersContribution = action.payload.transaction;
        },
      )
      .addCase(GetUsersContributionHistory.rejected, (state, action) => {
        state.loading = false;
        state.getUsersContribution = null;
        state.error = action.payload as string;
      })

      .addCase(GetContributionDetailsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetContributionDetailsById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.contributionDetails = {
          currency: action.payload.currency,
          startDate: action.payload.startDate,
          nextContributionDate: action.payload.nextContributionDate,
          withdrawalDate: action.payload.withdrawalDate,
          amount: action.payload.history[0]?.amount || 0,
          status: action.payload.history[0]?.status || "",
          contributionPlan: action.payload.contributionPlan || "",
          savingsCategory: action.payload.savingsCategory || "",
          balance: action.payload.balance || 0,
          history: action.payload.history || [],
        };
      })

      .addCase(GetContributionDetailsById.rejected, (state, action) => {
        state.loading = false;
        state.contributionDetails = null;
      })

      .addCase(PayContribution.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
    builder.addCase(PayContribution.fulfilled, (state, action) => {
      state.fundContribution = action.payload.landing;
    });
    builder
      .addCase(PayContribution.rejected, (state) => {
        state.fundContribution = null;
      })

      .addCase(PayUnPaidContribution.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PayUnPaidContribution.fulfilled, (state, action) => {
        state.fundUnPaidContribution = action.payload.landing;
      })
      .addCase(PayUnPaidContribution.rejected, (state) => {
        state.fundUnPaidContribution = null;
      })

      .addCase(deleteCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCard.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.removeCard = action.payload;
      })

      .addCase(deleteCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete card";
      })

      .addCase(
        GetUnPaidBalance.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.getUnPaidContributionBalance = action.payload.transaction;
        },
      )
      .addCase(GetUnPaidBalance.rejected, (state) => {
        state.getUnPaidContributionBalance = null;
      });
  },
});

export const { resetFundWalletStatus, clearContributionDetails } =
  transactionSlice.actions;

export default transactionSlice.reducer;
