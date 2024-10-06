import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setMessage } from "./message.slices";
import TransactionServices from "../services/transaction.services";

interface FundProjectBody {
 amount: number,
}

interface FundProjectPayload {
  body: FundProjectBody;
  projectId: string;
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

export const sendProposal = createAsyncThunk(
  "transaction/sendProposal",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await TransactionServices.SendProposal(formData);
      return { transaction: response };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

export const GetProposal = createAsyncThunk(
  "transaction/getProposal",
  async (_, thunkAPI) => {
    try {
      const data = await TransactionServices.GetProposal();
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
  async (body:any, thunkAPI) => {
    try {
      const data = await TransactionServices.CreateContributionPlan(body);
      return { transaction: data };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

const handleAsyncError = (error: any, thunkAPI: any) => {
  const message = error.error || "An error occurred. Please try again.";
  thunkAPI.dispatch(setMessage(message));
  return thunkAPI.rejectWithValue(message);
};

export const UploadPaymentReceipt = createAsyncThunk(
  "transaction/uploadPaymentReceipt",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await TransactionServices.UploadPaymentReceipt(formData);
      return { transaction: response };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

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

export const PayStackMembershipSubscription = createAsyncThunk(
  "transaction/payStackMembershipSubscription",
  async (body: any, thunkAPI) => {
    try {
      const data = await TransactionServices.PayStackMembershipSubscription(body);
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

export const FundProject = createAsyncThunk(
  "transaction/fundProject",
  async ({body, projectId}: FundProjectPayload, thunkAPI) => {
    try {
      const data = await TransactionServices.FundProject(body,projectId);
      return { transaction: data };
    } catch (error: any) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const GetProjectById = createAsyncThunk(
  "transaction/getProjectById",
  async ({ projectId }: { projectId: string }, thunkAPI) => {
    try {
      const data = await TransactionServices.GetProjectById(projectId);
      return data;
    } catch (error: any) {
      const message = error.msg || "Failed to fetch project";
      return thunkAPI.rejectWithValue(message);
    }
  }
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
  async (body:any , thunkAPI) => {
    try {
      const data = await TransactionServices.GetAccountName(body);
      return { transaction: data };
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI);
    }
  },
);

export const CreateTransactionPin = createAsyncThunk(
  "transaction/createTransaction",
  async (body: any, thunkAPI) => {
    try {
      const data = await TransactionServices.CreateTransactionPin(body);
      return { landing: data };
    } catch (error: any) {
      const message = error.msg;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

interface TransactionState {
  getWalletBalance: any | null;
  getContributionBalance: any | null;
  getUsersTransaction: any | null;
  createProposal: any | null;
  userProposal: any | null;
  fundWalletStatus: "idle" | "loading" | "success" | "failed";
  allProjects:any,
  allBanks:any,
  contributionPlan:any,
  uploadReceipt: any | null;
  fundUserWallet: any | null;
  fundMembershipSubscription: any | null;
  veryfyFundUserWallet: any | null;
  fundUserProject: null,
  getUserAccountName: null,
  currentProject: any | null;
  createPin: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  getWalletBalance: null,
  getContributionBalance: null,
  getUsersTransaction: null,
  createProposal: null,
  userProposal: null,
  fundWalletStatus: "idle",
  allProjects:null,
  allBanks:null,
  contributionPlan:null,
  uploadReceipt:null,
  fundUserWallet: null,
  fundMembershipSubscription: null,
  getUserAccountName: null,
  veryfyFundUserWallet:null,
  fundUserProject: null,
  currentProject: null,
  createPin: null,
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
        GetContributionBalance.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.getContributionBalance = action.payload.transaction;
        },
      )
      .addCase(GetContributionBalance.rejected, (state) => {
        state.getContributionBalance = null;
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

      .addCase(
        sendProposal.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.createProposal = action.payload.transaction;
        },
      )
      .addCase(sendProposal.rejected, (state) => {
        state.createProposal = null;
      })

      .addCase(
        GetProposal.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.userProposal = action.payload.transaction;
        },
      )
      .addCase(GetProposal.rejected, (state) => {
        state.userProposal = null;
      })

      .addCase(GetAllProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        GetAllProject.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
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
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.contributionPlan = action.payload.transaction;
        },
      )
      .addCase(CreateContributionPlan.rejected, (state) => {
        state.contributionPlan = null;
      })

      .addCase(
        UploadPaymentReceipt.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.uploadReceipt = action.payload.transaction;
        },
      )
      .addCase(UploadPaymentReceipt.rejected, (state) => {
        state.uploadReceipt = null;
      })

      .addCase(
        VerifyFundWallet.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state. veryfyFundUserWallet = action.payload.transaction;
        },
      )
      .addCase(VerifyFundWallet.rejected, (state) => {
        state. veryfyFundUserWallet = null;
      })

      .addCase(
        FundProject.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.fundUserProject = action.payload;
        },
      )
      .addCase(FundProject.rejected, (state, action) => {
        state.fundUserProject = null;
      })

      .addCase(GetProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
      })
      .addCase(GetProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
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
        state.getUserAccountName = null;
      })
      
      .addCase(CreateTransactionPin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      builder.addCase(CreateTransactionPin.fulfilled, (state, action) => {
        state.createPin = action.payload.landing;
      });
      builder.addCase(CreateTransactionPin.rejected, (state) => {
        state.createPin = null;
      })

      .addCase(
        PayStackMembershipSubscription.fulfilled,
        (state, action: PayloadAction<{ transaction: any }>) => {
          state.fundMembershipSubscription = action.payload.transaction;
        },
      )
      .addCase(PayStackMembershipSubscription.rejected, (state) => {
        state.fundMembershipSubscription = null;
      })

  },
});

export const { resetFundWalletStatus } = transactionSlice.actions;

export default transactionSlice.reducer;
