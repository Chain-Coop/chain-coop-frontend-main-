import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import _isEqual from "lodash/isEqual";
import { setMessage } from "./message.slices";
import web3Services from "../services/web3.services";
import {
  WithdrawUserPoolPayload,
  WithdrawAutoUserPoolPayload,
  CryptoTransaction,
  Pool,
  TokenInfo,
} from "../../types/types";

const SUPPORTED_NETWORKS_FOR_ALL_TOKENS = [
  "ETHERLINK",
  "BSC",
  "POLYGON",
  "LISK",
];

export const ActivateCryptoWallet = createAsyncThunk(
  "web3/activateCryptoWallet",
  async (_, thunkAPI) => {
    try {
      const data = await web3Services.ActivateCryptoWallet();
      return data;
    } catch (error: any) {
      const message = error.message || "An error occurred";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const GetTotalCryptoWalletBalance = createAsyncThunk(
  "web3/getCryptoWalletBalance",
  async (_, thunkAPI) => {
    try {
      const data = await web3Services.GetTotalCryptoWalletBalance();
      return data;
    } catch (error: any) {
      const message = error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const GetCryptoWalletDetails = createAsyncThunk(
  "web3/getCryptoWalletDetails",
  async (_, thunkAPI) => {
    try {
      const data = await web3Services.GetCryptoWalletDetails();
      return data;
    } catch (error: any) {
      const message = error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const CreatePool = createAsyncThunk(
  "web3/createPool",
  async (body: any, thunkAPI) => {
    try {
      const data = await web3Services.CreatePool(body);
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.data?.message ||
        error?.message ||
        "An unknown error occurred while creating the pool";
      return thunkAPI.rejectWithValue({ message });
    }
  },
);

export const CreatePeriodicPool = createAsyncThunk(
  "web3/createPeriodicPool",
  async (body: any, thunkAPI) => {
    try {
      const data = await web3Services.CreatePeriodicPool(body);
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.data?.message ||
        error?.message ||
        "An unknown error occurred while creating the pool";
      return thunkAPI.rejectWithValue({ message });
    }
  },
);

export const GetAllUserPools = createAsyncThunk<
  { data: Pool[]; message: string },
  void,
  { rejectValue: { message: string } }
>("web3/getAllUserPools", async (_, { rejectWithValue }) => {
  try {
    const response = await web3Services.GetAllUserPools();
    const pools = response?.data || [];
    pools.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
    return { ...response, data: pools };
  } catch (error: any) {
    const message = error?.message || "Failed to fetch user pools.";
    return rejectWithValue({ message });
  }
});

export const SearchUserPools = createAsyncThunk<
  { data: Pool[]; message: string },
  string,
  { rejectValue: { message: string } }
>("web3/searchUserPools", async (reason, { rejectWithValue }) => {
  if (!reason || reason.trim() === "") {
    return { data: [], message: "Search term is empty." };
  }
  try {
    const oneTimePromise = web3Services.SearchOneTimePoolsByReason(reason);
    const periodicPromise = web3Services.SearchPeriodicPoolsByReason(reason);

    const [oneTimeResponse, periodicResponse] = await Promise.all([
      oneTimePromise,
      periodicPromise,
    ]);

    const oneTimePools = oneTimeResponse?.data || [];
    const periodicPools = periodicResponse?.data || [];

    const combinedPools = [
      ...oneTimePools.map((pool: any) => ({
        ...pool,
        poolType: "oneTime" as const,
      })),
      ...periodicPools.map((pool: any) => ({
        ...pool,
        poolType: "periodic" as const,
      })),
    ];

    combinedPools.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });

    return { data: combinedPools, message: "Successfully searched pools" };
  } catch (error: any) {
    const message = error?.message || "Failed to search user pools.";
    return rejectWithValue({ message });
  }
});

export const UpdateUserPool = createAsyncThunk(
  "web3/updatePool",
  async (body: any, thunkAPI) => {
    try {
      const data = await web3Services.UpdateUserPool(body);
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.data?.message ||
        error?.message ||
        "An unknown error occurred while funding the pool";
      return thunkAPI.rejectWithValue({ message });
    }
  },
);

interface UpdateAutoPoolPayload {
  id?: string;
  body: { amount: string };
}

export const UpdateAutoPool = createAsyncThunk<
  any,
  UpdateAutoPoolPayload,
  { rejectValue: { message: string } }
>("web3/updateAutoPool", async ({ id, body }, { rejectWithValue }) => {
  if (!id) {
    return rejectWithValue({ message: "Pool ID is missing." });
  }
  try {
    const data = await web3Services.UpdateAutoPool({ id, body });
    return data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.data?.message ||
      error?.message ||
      "An unknown error occurred while updating the pool";
    return rejectWithValue({ message });
  }
});

export const WithdrawUserPool = createAsyncThunk<
  any,
  WithdrawUserPoolPayload,
  { rejectValue: { message: string } }
>("web3/withdrawUserPool", async (payload, { rejectWithValue }) => {
  try {
    const response = await web3Services.WithdrawUserPool(payload);
    return response;
  } catch (error: any) {
    const message =
      error?.message || "An unknown error occurred during withdrawal.";

    return rejectWithValue({ message });
  }
});

export const WithdrawAutoUserPool = createAsyncThunk<
  any,
  WithdrawAutoUserPoolPayload,
  { rejectValue: { message: string } }
>("web3/withdrawAutoUserPool", async (payload, { rejectWithValue }) => {
  try {
    const response = await web3Services.WithdrawAutoUserPool(payload);
    return response;
  } catch (error: any) {
    const message =
      error?.message || "An unknown error occurred during withdrawal.";

    return rejectWithValue({ message });
  }
});

export const GetAllUserTokens = createAsyncThunk(
  "web3/getAllUserTokens",
  async (network: string = "ETHERLINK", thunkAPI) => {
    try {
      const data = await web3Services.GetAllUserTokens(network);
      return { tokens: data.data || [], network };
    } catch (error: any) {
      const message = error.message || `Failed to fetch tokens for ${network}`;
      return thunkAPI.rejectWithValue({ message, network });
    }
  },
);

export const FetchAllTokensFromSupportedNetworks = createAsyncThunk<
  TokenInfo[],
  void,
  { rejectValue: { message: string } }
>("web3/fetchAllTokensFromSupportedNetworks", async (_, thunkAPI) => {
  try {
    const allTokensPromises = SUPPORTED_NETWORKS_FOR_ALL_TOKENS.map(
      async (network) => {
        try {
          const response = await web3Services.GetAllUserTokens(network);
          const tokensFromNetwork: TokenInfo[] = response.data || [];
          return tokensFromNetwork.map((token) => ({ ...token, network }));
        } catch (networkError: any) {
          console.error(
            `Failed to fetch tokens for network ${network}:`,
            networkError.message || networkError,
          );
          return [];
        }
      },
    );

    const results = await Promise.all(allTokensPromises);
    const combinedTokens = results.flat();
    return combinedTokens;
  } catch (error: any) {
    const message =
      error.message || "An error occurred while fetching all user tokens.";
    return thunkAPI.rejectWithValue({ message });
  }
});

export const StopPeriodicPool = createAsyncThunk<
  any,
  string,
  { rejectValue: { message: string } }
>("web3/stopPeriodicPool", async (poolId, { rejectWithValue }) => {
  try {
    const response = await web3Services.StopPeriodicPool(poolId);
    return response;
  } catch (error: any) {
    const message =
      error?.message || "An unknown error occurred stopping the pool.";
    return rejectWithValue({ message });
  }
});

export const ResumePeriodicPool = createAsyncThunk<
  any,
  string,
  { rejectValue: { message: string } }
>("web3/resumePeriodicPool", async (poolId, { rejectWithValue }) => {
  try {
    const response = await web3Services.ResumePeriodicPool(poolId);
    return response;
  } catch (error: any) {
    const message =
      error?.message || "An unknown error occurred resuming the pool.";
    return rejectWithValue({ message });
  }
});

export const GetCryptoTransactionHistory = createAsyncThunk(
  "web3/getCryptoTransactionHistory",
  async (_, thunkAPI) => {
    try {
      const data = await web3Services.getCryptoHistory();
      return data;
    } catch (error: any) {
      const message =
        error.message || "Failed to fetch crypto transaction history";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const GetTotalContributionBalanceCrypto = createAsyncThunk<
  number,
  void,
  { rejectValue: { message: string } }
>("web3/getTotalContributionBalanceCrypto", async (_, { rejectWithValue }) => {
  try {
    const oneTimePromise = web3Services.GetTotalOneTimeSavings();
    const periodicPromise = web3Services.GetTotalPeriodicSavings();

    const [oneTimeAmount, periodicAmount] = await Promise.all([
      oneTimePromise,
      periodicPromise,
    ]);

    const totalAmount =
      (Number(oneTimeAmount) || 0) + (Number(periodicAmount) || 0);
    return totalAmount;
  } catch (error: any) {
    const message =
      error?.message || "Failed to fetch total contribution balance.";
    return rejectWithValue({ message });
  }
});

interface CashwyreFundPayload {
  body: {
    amount: number;
    network: string;
    [key: string]: any;
  };
}

interface CashwyreFundResponse {
  data: {
    success: boolean;
    message: string;
    [key: string]: any;
  };
}

export const CashwyreFund = createAsyncThunk<
  CashwyreFundResponse,
  CashwyreFundPayload,
  { rejectValue: { message: string } }
>("web3/cashwyreFund", async (payload, { rejectWithValue }) => {
  try {
    const data = await web3Services.CashwyreFund(payload.body);
    return data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.data?.message ||
      error?.message ||
      "An unknown error occurred while funding the wallet";
    return rejectWithValue({ message });
  }
});

interface CashwyreOnrampConfirmPayload {
  body: {
    amount: number;
    crypto: string;
    network: string;
    reference: string;
    transactionReference: string;
    [key: string]: any;
  };
}

interface CashwyreOnrampConfirmResponse {
  data: {
    success: boolean;
    message: string;
    [key: string]: any;
  };
}

export const CashwyreOnrampConfirm = createAsyncThunk<
  CashwyreOnrampConfirmResponse,
  CashwyreOnrampConfirmPayload,
  { rejectValue: { message: string } }
>("web3/cashwyreOnrampConfirm", async (payload, { rejectWithValue }) => {
  try {
    const data = await web3Services.CashwyreOnrampConfirm(payload.body);
    return data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.data?.message ||
      error?.message ||
      "An unknown error occurred while confirming the onramp transaction";
    return rejectWithValue({ message });
  }
});

interface CashwyreOfframpQuotePayload {
  body: {
    amount: number;
    crypto: string;
    network: string;
    [key: string]: any;
  };
}

interface CashwyreOfframpQuoteResponse {
  data: {
    success: boolean;
    message: string;
    [key: string]: any;
  };
}

export const CashwyreOfframpQuote = createAsyncThunk<
  CashwyreOfframpQuoteResponse,
  CashwyreOfframpQuotePayload,
  { rejectValue: { message: string } }
>("web3/cashwyreOfframpQuote", async (payload, { rejectWithValue }) => {
  try {
    const data = await web3Services.CashwyreOfframpQuote(payload.body);
    return data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.data?.message ||
      error?.message ||
      "An unknown error occurred while getting withdrawal quote";
    return rejectWithValue({ message });
  }
});

interface CashwyreOfframpConfirmPayload {
  body: {
    amount: number;
    crypto: string;
    network: string;
    reference: string;
    transactionReference: string;
    [key: string]: any;
  };
}

interface CashwyreOfframpConfirmResponse {
  data: {
    success: boolean;
    message: string;
    [key: string]: any;
  };
}

export const CashwyreOfframpConfirm = createAsyncThunk<
  CashwyreOfframpConfirmResponse,
  CashwyreOfframpConfirmPayload,
  { rejectValue: { message: string } }
>("web3/cashwyreOfframpConfirm", async (payload, { rejectWithValue }) => {
  try {
    const data = await web3Services.CashwyreOfframpConfirm(payload.body);
    return data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.data?.message ||
      error?.message ||
      "An unknown error occurred while confirming the offramp transaction";
    return rejectWithValue({ message });
  }
});

export const GetCashwyreHistory = createAsyncThunk<
  CashwyreHistoryResponse,
  void,
  { rejectValue: string }
>("web3/getCashwyreHistory", async (_, thunkAPI) => {
  try {
    const data = await web3Services.getCashwyreHistory();
    const formattedData: CashwyreHistoryResponse = {
      data: data.data || [],
      message: data.message || "Successfully fetched cashwyre transactions",
      success: data.success !== false,
    };

    return formattedData;
  } catch (error: any) {
    const message =
      error.message || "Failed to fetch cashwyre transaction history";
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

interface CashwyreHistoryResponse {
  data: CryptoTransaction[];
  message: string;
  success: boolean;
}

export const FetchGrandTotalBalanceFromAllNetworks = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>("web3/getTotalBalance", async (_, thunkAPI) => {
  try {
    let grandTotal = 0;
    for (const network of SUPPORTED_NETWORKS_FOR_ALL_TOKENS) {
      try {
        const response = await web3Services.GetTotalBalance(network);
        if (response && typeof response.data === "number") {
          grandTotal += response.data;
        } else {
          console.warn(
            `No valid balance data found for network ${network} in grand total calculation. Response:`,
            response,
          );
        }
      } catch (networkError: any) {
        console.error(
          `Failed to fetch total balance for network ${network} during grand total calculation:`,
          networkError.message || networkError,
        );
      }
    }
    return grandTotal;
  } catch (error: any) {
    const message =
      error.message ||
      "An error occurred while fetching the grand total balance.";
    return thunkAPI.rejectWithValue(message);
  }
});

export const ActivateBitcoin = createAsyncThunk(
  "web3/activateBitcoin",
  async (_, thunkAPI) => {
    try {
      const response = await web3Services.ActivateBitcoinAccount();
      return response;
    } catch (error: any) {
      const message = error.message || "Failed to activate Bitcoin account";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue({ message });
    }
  },
);

export const FetchBitcoinBalance = createAsyncThunk(
  "web3/fetchBitcoinBalance",
  async (_, thunkAPI) => {
    try {
      const response = await web3Services.GetBitcoinBalance();
      return response.data;
    } catch (error: any) {
      const message = error.message || "Failed to fetch Bitcoin balance";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue({ message });
    }
  },
);

interface WithdrawCryptoTokenPayload {
  amount: string;
  network: string;
  token: string;
  address: string;
  tokenId: string;
  pin: string;
  [key: string]: any;
}

export const WithdrawCryptoToken = createAsyncThunk<
  any,
  WithdrawCryptoTokenPayload,
  { rejectValue: { message: string } }
>("web3/withdrawCryptoToken", async (payload, { rejectWithValue }) => {
  try {
    const response = await web3Services.WithdrawCryptoToken(payload);
    return response;
  } catch (error: any) {
    const message =
      error?.message || "An unknown error occurred during withdrawal.";

    return rejectWithValue({ message });
  }
});

interface WithdrawBitcoinPayload {
  amount: string;
  address: string;
  pin: string;
  [key: string]: any;
}

export const WithdrawBitcoin = createAsyncThunk<
  any,
  WithdrawBitcoinPayload,
  { rejectValue: { message: string } }
>("web3/withdrawBitcoin", async (payload, { rejectWithValue }) => {
  try {
    const response = await web3Services.WithdrawBitcoin(payload);
    return response;
  } catch (error: any) {
    const message =
      error?.message || "An unknown error occurred during Bitcoin withdrawal.";

    return rejectWithValue({ message });
  }
});

interface CryptoState {
  actvateCryptWallet: Record<string, any> | null;
  cryptoBalance: number;
  totalBalance: number;
  cryptoWalletDetails: Record<string, any> | null;
  registerUserPool: { [key: string]: any } | null;
  updateRegisteredUserPool: null;
  userPools: Pool[] | null;
  userTokens: TokenInfo[] | null;
  allNetworkTokens: TokenInfo[] | null;
  allNetworkTokensLoading: boolean;
  allNetworkTokensError: string | null;
  cryptoHistory: CryptoTransaction[] | null;
  cashwyreHistory: CryptoTransaction[] | null;
  loading: boolean;
  userPoolsLoading: boolean;
  cryptoHistoryLoading: boolean;
  cashwyreHistoryLoading: boolean;
  error: string | null;
  userPoolsError: string | null;
  cryptoHistoryError: string | null;
  cashwyreHistoryError: string | null;
  walletMessage: string | null;
  totalContributionBalanceCrypto: number | null;
  totalContributionBalanceLoading: boolean;
  totalContributionBalanceError: string | null;
  onrampConfirmLoading?: boolean;
  onrampConfirmError?: string | null;
  onrampConfirmResult?: any;
  offrampQuoteLoading?: boolean;
  offrampQuoteError?: string | null;
  offrampQuoteResult?: any;
  offrampConfirmLoading?: boolean;
  offrampConfirmError?: string | null;
  offrampConfirmResult?: any;

  isBitcoinAccountActivated?: boolean;
  bitcoinAccountStatusMessage?: string | null;
  bitcoinActivationLoading?: boolean;
  bitcoinActivationError?: string | null;
  bitcoinBalance?: number;
  bitcoinAddress?: string | null;
  bitcoinBalanceLoading?: boolean;
  bitcoinBalanceError?: string | null;
}

const initialState: CryptoState = {
  actvateCryptWallet: null,
  cryptoWalletDetails: null,
  cryptoBalance: 0,
  totalBalance: 0,
  registerUserPool: null,
  updateRegisteredUserPool: null,
  userPools: null,
  userTokens: null,
  allNetworkTokens: null,
  allNetworkTokensLoading: false,
  allNetworkTokensError: null,
  cryptoHistory: null,
  cashwyreHistory: null,
  loading: false,
  userPoolsLoading: false,
  cryptoHistoryLoading: false,
  cashwyreHistoryLoading: false,
  error: null,
  userPoolsError: null,
  cryptoHistoryError: null,
  cashwyreHistoryError: null,
  walletMessage: null,
  totalContributionBalanceCrypto: null,
  totalContributionBalanceLoading: false,
  totalContributionBalanceError: null,
  onrampConfirmLoading: false,
  onrampConfirmError: null,
  onrampConfirmResult: null,
  offrampQuoteLoading: false,
  offrampQuoteError: null,
  offrampQuoteResult: null,
  offrampConfirmLoading: false,
  offrampConfirmError: null,
  offrampConfirmResult: null,

  isBitcoinAccountActivated: undefined,
  bitcoinAccountStatusMessage: null,
  bitcoinActivationLoading: false,
  bitcoinActivationError: null,
  bitcoinBalance: 0,
  bitcoinAddress: null,
  bitcoinBalanceLoading: false,
  bitcoinBalanceError: null,
};

export const Web3Slices = createSlice({
  name: "web3",
  initialState,
  reducers: {
    reset: (state) => {
      state.cryptoHistory = null;
      state.cryptoHistoryLoading = false;
      state.cryptoHistoryError = null;
      state.cashwyreHistory = null;
      state.cashwyreHistoryLoading = false;
      state.cashwyreHistoryError = null;
    },
    resetBitcoinState: (state) => {
      state.isBitcoinAccountActivated = undefined;
      state.bitcoinAccountStatusMessage = null;
      state.bitcoinActivationLoading = false;
      state.bitcoinActivationError = null;
      state.bitcoinBalance = 0;
      state.bitcoinAddress = null;
      state.bitcoinBalanceLoading = false;
      state.bitcoinBalanceError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(ActivateCryptoWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ActivateCryptoWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.actvateCryptWallet = action.payload.landing;
        state.error = null;
      })
      .addCase(ActivateCryptoWallet.rejected, (state, action) => {
        state.loading = false;
        state.actvateCryptWallet = null;
        state.error =
          (action.payload as string) || "Failed to activate crypto wallet";
      })
      .addCase(GetTotalCryptoWalletBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetTotalCryptoWalletBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.cryptoBalance = action.payload.data || 0;
        state.walletMessage = action.payload.data.message || null;
        state.error = null;
      })
      .addCase(GetTotalCryptoWalletBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch balance";
        state.cryptoBalance = 0;
        state.walletMessage = null;
      })

      .addCase(GetCryptoWalletDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetCryptoWalletDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.cryptoWalletDetails = action.payload.data;
        state.error = null;
      })
      .addCase(GetCryptoWalletDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(CreatePool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreatePool.fulfilled, (state, action) => {
        state.loading = false;
        state.registerUserPool = action.payload.data;
        state.error = null;
      })
      .addCase(CreatePool.rejected, (state, action) => {
        state.loading = false;
        state.registerUserPool = null;
        state.error =
          (action.payload as string) || "Failed to  register user Pool";
      })

      .addCase(CreatePeriodicPool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreatePeriodicPool.fulfilled, (state, action) => {
        state.loading = false;
        state.registerUserPool = action.payload.data;
        state.error = null;
      })
      .addCase(CreatePeriodicPool.rejected, (state, action) => {
        state.loading = false;
        state.registerUserPool = null;
        state.error =
          (action.payload as string) || "Failed to  register user Pool";
      })

      .addCase(GetAllUserPools.pending, (state) => {
        state.userPoolsLoading = true;
        state.userPoolsError = null;
      })
      .addCase(GetAllUserPools.fulfilled, (state, action) => {
        const incomingData = action.payload?.data || [];
        if (!_isEqual(state.userPools, incomingData)) {
          console.log("GetAllUserPools: Data changed, updating state.");
          state.userPools = incomingData;
        } else {
          console.log(
            "GetAllUserPools: Data is the same, skipping state update.",
          );
        }
        state.userPoolsLoading = false;
        state.userPoolsError = null;
      })
      .addCase(GetAllUserPools.rejected, (state, action) => {
        state.userPoolsLoading = false;
        state.userPoolsError =
          action.payload?.message || "Failed to fetch pools";
        state.userPools = null;
      })

      .addCase(SearchUserPools.pending, (state) => {
        state.userPoolsLoading = true;
        state.userPoolsError = null;
      })
      .addCase(SearchUserPools.fulfilled, (state, action) => {
        state.userPools = action.payload?.data || [];
        state.userPoolsLoading = false;
        state.userPoolsError = null;
      })
      .addCase(SearchUserPools.rejected, (state, action) => {
        state.userPoolsLoading = false;
        state.userPoolsError =
          action.payload?.message || "Failed to search pools";
        state.userPools = null;
      })

      .addCase(UpdateUserPool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateUserPool.fulfilled, (state, action) => {
        state.loading = false;
        state.updateRegisteredUserPool = action.payload.data;
        state.error = null;
      })
      .addCase(UpdateUserPool.rejected, (state, action) => {
        state.loading = false;
        state.updateRegisteredUserPool = null;
        state.error = (action.payload as string) || "Failed to update Pool";
      })

      .addCase(UpdateAutoPool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateAutoPool.fulfilled, (state, action) => {
        state.loading = false;
        state.updateRegisteredUserPool = action.payload.data;
        state.error = null;
      })
      .addCase(UpdateAutoPool.rejected, (state, action) => {
        state.loading = false;
        state.updateRegisteredUserPool = null;
        state.error = action.payload?.message || "Failed to update Pool";
      })

      .addCase(WithdrawUserPool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(WithdrawUserPool.fulfilled, (state, action) => {
        state.loading = false;
        state.updateRegisteredUserPool = action.payload.data;
        state.error = null;
      })
      .addCase(WithdrawUserPool.rejected, (state, action) => {
        state.loading = false;
        state.updateRegisteredUserPool = null;
        state.error = action.payload?.message || "Failed to withdraw Pool";
      })

      .addCase(WithdrawAutoUserPool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(WithdrawAutoUserPool.fulfilled, (state, action) => {
        state.loading = false;
        state.updateRegisteredUserPool = action.payload.data;
        state.error = null;
      })
      .addCase(WithdrawAutoUserPool.rejected, (state, action) => {
        state.loading = false;
        state.updateRegisteredUserPool = null;
        state.error = action.payload?.message || "Failed to withdraw Pool";
      })

      .addCase(GetAllUserTokens.pending, (state) => {
        state.error = null;
      })
      .addCase(GetAllUserTokens.fulfilled, (state, action) => {
        state.userTokens = action.payload.tokens;
        state.error = null;
      })
      .addCase(GetAllUserTokens.rejected, (state, action) => {
        state.error =
          (action.payload as any)?.message ||
          `Failed to fetch tokens for network: ${(action.payload as any)?.network}`;
      })

      .addCase(FetchAllTokensFromSupportedNetworks.pending, (state) => {
        state.allNetworkTokensLoading = true;
        state.allNetworkTokensError = null;
      })
      .addCase(
        FetchAllTokensFromSupportedNetworks.fulfilled,
        (state, action: PayloadAction<TokenInfo[]>) => {
          state.allNetworkTokensLoading = false;
          state.allNetworkTokens = action.payload;
          state.allNetworkTokensError = null;
        },
      )
      .addCase(
        FetchAllTokensFromSupportedNetworks.rejected,
        (state, action) => {
          state.allNetworkTokensLoading = false;
          state.allNetworkTokensError =
            (action.payload as any)?.message || "Failed to fetch all tokens";
          state.allNetworkTokens = null;
        },
      )

      .addCase(StopPeriodicPool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(StopPeriodicPool.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(StopPeriodicPool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to stop pool";
      })

      .addCase(ResumePeriodicPool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ResumePeriodicPool.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(ResumePeriodicPool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to resume pool";
      })

      .addCase(GetCryptoTransactionHistory.pending, (state) => {
        state.cryptoHistoryLoading = true;
        state.cryptoHistoryError = null;
      })
      .addCase(GetCryptoTransactionHistory.fulfilled, (state, action) => {
        state.cryptoHistoryLoading = false;
        state.cryptoHistory = action.payload as CryptoTransaction[];
      })
      .addCase(GetCryptoTransactionHistory.rejected, (state, action) => {
        state.cryptoHistoryLoading = false;
        state.cryptoHistoryError = action.payload as string;
        state.cryptoHistory = null;
      })

      .addCase(GetTotalContributionBalanceCrypto.pending, (state) => {
        state.totalContributionBalanceLoading = true;
        state.totalContributionBalanceError = null;
      })
      .addCase(GetTotalContributionBalanceCrypto.fulfilled, (state, action) => {
        state.totalContributionBalanceLoading = false;
        state.totalContributionBalanceCrypto = action.payload;
        state.totalContributionBalanceError = null;
      })
      .addCase(GetTotalContributionBalanceCrypto.rejected, (state, action) => {
        state.totalContributionBalanceLoading = false;
        state.totalContributionBalanceError =
          action.payload?.message || "Failed to fetch total balance";
        state.totalContributionBalanceCrypto = null;
      })
      .addCase(CashwyreFund.pending, (state: CryptoState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        CashwyreFund.fulfilled,
        (state: CryptoState, action: PayloadAction<CashwyreFundResponse>) => {
          state.loading = false;
          state.registerUserPool = action.payload.data;
          state.error = null;
        },
      )
      .addCase(
        CashwyreFund.rejected,
        (
          state: CryptoState,
          action: PayloadAction<{ message: string } | undefined>,
        ) => {
          state.loading = false;
          state.registerUserPool = null;
          state.error = action.payload?.message || "Failed to Fund Wallet";
        },
      )
      .addCase(CashwyreOnrampConfirm.pending, (state) => {
        state.onrampConfirmLoading = true;
        state.onrampConfirmError = null;
        state.onrampConfirmResult = null;
      })
      .addCase(CashwyreOnrampConfirm.fulfilled, (state, action) => {
        state.onrampConfirmLoading = false;
        state.onrampConfirmResult = action.payload.data;
        state.onrampConfirmError = null;
      })
      .addCase(CashwyreOnrampConfirm.rejected, (state, action) => {
        state.onrampConfirmLoading = false;
        state.onrampConfirmResult = null;
        state.onrampConfirmError =
          action.payload?.message || "Failed to confirm onramp transaction";
      })
      .addCase(CashwyreOfframpQuote.pending, (state) => {
        state.offrampQuoteLoading = true;
        state.offrampQuoteError = null;
        state.offrampQuoteResult = null;
      })
      .addCase(CashwyreOfframpQuote.fulfilled, (state, action) => {
        state.offrampQuoteLoading = false;
        state.offrampQuoteResult = action.payload.data;
        state.offrampQuoteError = null;
      })
      .addCase(CashwyreOfframpQuote.rejected, (state, action) => {
        state.offrampQuoteLoading = false;
        state.offrampQuoteResult = null;
        state.offrampQuoteError =
          action.payload?.message || "Failed to get withdrawal quote";
      })
      .addCase(CashwyreOfframpConfirm.pending, (state) => {
        state.offrampConfirmLoading = true;
        state.offrampConfirmError = null;
        state.offrampConfirmResult = null;
      })
      .addCase(CashwyreOfframpConfirm.fulfilled, (state, action) => {
        state.offrampConfirmLoading = false;
        state.offrampConfirmResult = action.payload.data;
        state.offrampConfirmError = null;
      })
      .addCase(CashwyreOfframpConfirm.rejected, (state, action) => {
        state.offrampConfirmLoading = false;
        state.offrampConfirmResult = null;
        state.offrampConfirmError =
          action.payload?.message || "Failed to confirm offramp transaction";
      })
      .addCase(GetCashwyreHistory.pending, (state) => {
        state.cashwyreHistoryLoading = true;
        state.cashwyreHistoryError = null;
      })
      .addCase(GetCashwyreHistory.fulfilled, (state, action) => {
        state.cashwyreHistoryLoading = false;
        state.cashwyreHistory = action.payload.data;
        state.cashwyreHistoryError = null;
      })
      .addCase(GetCashwyreHistory.rejected, (state, action) => {
        state.cashwyreHistoryLoading = false;
        state.cashwyreHistory = null;
        state.cashwyreHistoryError = action.payload as string;
      })
      .addCase(FetchGrandTotalBalanceFromAllNetworks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        FetchGrandTotalBalanceFromAllNetworks.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.totalBalance = action.payload;
          state.error = null;
        },
      )
      .addCase(
        FetchGrandTotalBalanceFromAllNetworks.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          state.totalBalance = 0;
        },
      )

      .addCase(ActivateBitcoin.pending, (state) => {
        state.bitcoinActivationLoading = true;
        state.bitcoinActivationError = null;
        state.bitcoinAccountStatusMessage = null;
      })
      .addCase(ActivateBitcoin.fulfilled, (state, action) => {
        state.bitcoinActivationLoading = false;
        state.isBitcoinAccountActivated = true;
        state.bitcoinAccountStatusMessage =
          action.payload.message || "Bitcoin account activated successfully.";
      })
      .addCase(ActivateBitcoin.rejected, (state, action) => {
        state.bitcoinActivationLoading = false;
        state.bitcoinActivationError =
          (action.payload as any)?.message || "Bitcoin activation failed.";
        state.isBitcoinAccountActivated = false;
      })

      .addCase(FetchBitcoinBalance.pending, (state) => {
        state.bitcoinBalanceLoading = true;
        state.bitcoinBalanceError = null;
      })
      .addCase(FetchBitcoinBalance.fulfilled, (state, action) => {
        state.bitcoinBalanceLoading = false;
        state.bitcoinBalance = action.payload?.balance || 0;
        state.bitcoinAddress = action.payload?.address || null;
        state.isBitcoinAccountActivated = true;
        state.bitcoinAccountStatusMessage =
          (action.meta.arg as any)?.message || "Bitcoin balance fetched.";
      })
      .addCase(FetchBitcoinBalance.rejected, (state, action) => {
        state.bitcoinBalanceLoading = false;
        state.bitcoinBalanceError =
          (action.payload as any)?.message ||
          "Failed to fetch Bitcoin balance.";
        if (
          (action.payload as any)?.message
            ?.toLowerCase()
            .includes("not found") ||
          (action.payload as any)?.message?.toLowerCase().includes("not active")
        ) {
          state.isBitcoinAccountActivated = false;
        }
        state.bitcoinBalance = 0;
        state.bitcoinAddress = null;
      })

      .addCase(WithdrawCryptoToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(WithdrawCryptoToken.fulfilled, (state, action) => {
        state.loading = false;
        state.updateRegisteredUserPool = action.payload.data;
        state.error = null;
      })
      .addCase(WithdrawCryptoToken.rejected, (state, action) => {
        state.loading = false;
        state.updateRegisteredUserPool = null;
        state.error =
          action.payload?.message || "Failed to withdraw crypto token";
      })

      .addCase(WithdrawBitcoin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(WithdrawBitcoin.fulfilled, (state, action) => {
        state.loading = false;
        state.updateRegisteredUserPool = action.payload.data;
        state.error = null;
      })
      .addCase(WithdrawBitcoin.rejected, (state, action) => {
        state.loading = false;
        state.updateRegisteredUserPool = null;
        state.error = action.payload?.message || "Failed to withdraw Bitcoin";
      });
  },
});

export const { reset, resetBitcoinState } = Web3Slices.actions;
export default Web3Slices.reducer;
