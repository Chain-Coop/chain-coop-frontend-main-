import axios from "axios";
import authHeader from "./headers";

const API_URL = (import.meta as any).env.VITE_REACT_APP_API_URL;

const ActivateCryptoWallet = async () => {
  const url = `${API_URL}/web3/account/activate`;
  try {
    const response = await axios.post(url, null, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("Network Error: Please check your internet connection.");
    }
  }
};

const GetTotalCryptoWalletBalance = async (network: string = "ETHERLINK") => {
  const url = `${API_URL}/web3/balance/tokens/${network}`;
  try {
    const response = await axios({
      url,
      headers: authHeader(),
      method: "get",
    });

    if (response?.data?.message === "No Wallet found") {
      return { data: { balance: 0, message: "No Wallet found" } };
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

const GetCryptoWalletDetails = async () => {
  const url = `${API_URL}/web3/account/details`;
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

const CreatePool = async (body: any) => {
  const url = `${API_URL}/web3/v2/saving/openPool`;
  try {
    const response = await axios.post(url, body, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      //console.error("Backend error response:", error.response.data);
      const backendMessage =
        error.response.data.message ||
        error.response.data.msg ||
        "An error occurred";
      throw new Error(backendMessage);
    } else {
      //console.error("Network error:", error.message);
      throw new Error("Network Error: Please check your internet connection.");
    }
  }
};

const CreatePeriodicPool = async (body: any) => {
  const url = `${API_URL}/web3/v2/periodicSaving/openPeriodicPool`;
  try {
    const response = await axios.post(url, body, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      //console.error("Backend error response:", error.response.data);
      const backendMessage =
        error.response.data.message ||
        error.response.data.msg ||
        "An error occurred";
      throw new Error(backendMessage);
    } else {
      //console.error("Network error:", error.message);
      throw new Error("Network Error: Please check your internet connection.");
    }
  }
};

const GetAllUserPools = async () => {
  const oneTimePoolsUrl = `${API_URL}/web3/v2/saving/getManualSavingByUser`;
  const periodicPoolsUrl = `${API_URL}/web3/v2/periodicSaving/getPeriodicPool`;

  try {
    const oneTimePoolsPromise = axios.get(oneTimePoolsUrl, {
      headers: authHeader(),
    });
    const periodicPoolsPromise = axios.get(periodicPoolsUrl, {
      headers: authHeader(),
    });

    const [oneTimeResponse, periodicResponse] = await Promise.all([
      oneTimePoolsPromise,
      periodicPoolsPromise,
    ]);

    const oneTimePools = oneTimeResponse?.data?.data || [];
    const periodicPools = periodicResponse?.data?.data || [];

    const combinedPools = [
      ...oneTimePools.map((pool: any) => ({ ...pool, poolType: "oneTime" })),
      ...periodicPools.map((pool: any) => ({ ...pool, poolType: "periodic" })),
    ];

    const token =
      oneTimeResponse?.data?.data?.tokens?.accessToken ||
      periodicResponse?.data?.data?.tokens?.accessToken;
    if (token) {
      sessionStorage.setItem("userData", token);
    }

    return {
      data: combinedPools,
      message: "Successfully fetched all pools",
    };
  } catch (error: any) {
    console.error("Error fetching all user pools:", error);
    if (axios.isAxiosError(error) && error.response) {
      const backendMessage =
        error.response.data?.message || "An error occurred fetching pools";
      throw new Error(backendMessage);
    } else if (axios.isCancel(error)) {
      throw new Error("Request canceled.");
    } else {
      throw new Error("Network Error: Could not fetch all user pools.");
    }
  }
};

const UpdateUserPool = async (body: any) => {
  const url = `${API_URL}/web3/v2/saving/updatePool`;
  try {
    const response = await axios.post(url, body, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Backend error response:", error.response.data);
      const backendMessage = error.response.data.message || "An error occurred";
      throw new Error(backendMessage);
    } else {
      console.error("Network error:", error.message);
      throw new Error("Network Error: Please check your internet connection.");
    }
  }
};

const UpdateAutoPool = async (payload: {
  id: string;
  body: { amount: string };
}) => {
  const url = `${API_URL}/web3/v2/periodicSaving/periodicPool/${payload.id}/amount`;

  const headers = {
    ...authHeader(),
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.put(url, payload.body, { headers });

    const token = response?.data?.data?.tokens?.accessToken;
    if (token) {
      sessionStorage.setItem("userData", token);
    }

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      const backendMessage =
        error.response.data?.message || "An error occurred updating the pool";
      throw new Error(backendMessage);
    } else if (axios.isCancel(error)) {
      throw new Error("Request canceled.");
    } else {
      throw new Error("Network Error: Could not update the pool.");
    }
  }
};

const WithdrawUserPool = async (body: any) => {
  const url = `${API_URL}/web3/v2/saving/withdraw`;
  try {
    const response = await axios.post(url, body, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Backend error response:", error.response.data);
      const backendMessage =
        error.response.data.msg ||
        error.response.data.message ||
        error.response.data?.error?.message ||
        "An error occurred";
      throw new Error(backendMessage);
    } else {
      console.error("Network error:", error.message);
      throw new Error("Network Error: Please check your internet connection.");
    }
  }
};

const WithdrawAutoUserPool = async (body: any) => {
  const url = `${API_URL}/web3/v2/periodicSaving/withdraw`;
  try {
    const response = await axios.post(url, body, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Backend error response:", error.response.data);
      const backendMessage =
        error.response.data.msg ||
        error.response.data.message ||
        error.response.data?.error?.message ||
        "An error occurred";
      throw new Error(backendMessage);
    } else {
      console.error("Network error:", error.message);
      throw new Error("Network Error: Please check your internet connection.");
    }
  }
};

const GetAllUserTokens = async (network: string = "ETHERLINK") => {
  const url = `${API_URL}/web3/balance/tokens/${network}`;
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

const StopPeriodicPool = async (id: string) => {
  const url = `${API_URL}/web3/v2/periodicSaving/periodicPool/${id}/stop`;
  try {
    const response = await axios.post(url, null, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      const backendMessage =
        error.response.data?.msg ||
        error.response.data?.message ||
        "An error occurred stopping the pool";
      throw new Error(backendMessage);
    } else if (axios.isCancel(error)) {
      throw new Error("Request canceled.");
    } else {
      throw new Error("Network Error: Could not stop the pool.");
    }
  }
};

const ResumePeriodicPool = async (id: string) => {
  const url = `${API_URL}/web3/v2/periodicSaving/periodicPool/${id}/resume`;
  try {
    const response = await axios.post(url, null, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      const backendMessage =
        error.response.data?.msg ||
        error.response.data?.message ||
        "An error occurred resuming the pool";
      throw new Error(backendMessage);
    } else if (axios.isCancel(error)) {
      throw new Error("Request canceled.");
    } else {
      throw new Error("Network Error: Could not resume the pool.");
    }
  }
};

const getCryptoHistory = async () => {
  const url = `${API_URL}/web3/transaction/history`;
  try {
    const response = await axios.get(url, {
      headers: authHeader(),
    });
    return response.data.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      const backendMessage =
        error.response.data?.msg ||
        error.response.data?.message ||
        "An error occurred fetching crypto history";
      throw new Error(backendMessage);
    } else if (axios.isCancel(error)) {
      throw new Error("Request canceled.");
    } else {
      throw new Error("Network Error: Could not fetch crypto history.");
    }
  }
};

const SearchOneTimePoolsByReason = async (reason: string) => {
  const url = `${API_URL}/web3/v2/saving/getPoolByReason`;
  const body = { reason: reason };
  try {
    const response = await axios.post(url, body, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    console.error("Error searching one-time pools by reason:", error);
    if (axios.isAxiosError(error) && error.response) {
      const backendMessage =
        error.response.data?.message || "An error occurred searching pools";
      throw new Error(backendMessage);
    } else {
      throw new Error("Network Error: Could not search one-time pools.");
    }
  }
};

const SearchPeriodicPoolsByReason = async (reason: string) => {
  const url = `${API_URL}/web3/v2/periodicSaving/getPoolByReason`;
  const body = { reason: reason };
  try {
    const response = await axios.post(url, body, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    console.error("Error searching periodic pools by reason:", error);
    if (axios.isAxiosError(error) && error.response) {
      const backendMessage =
        error.response.data?.message || "An error occurred searching pools";
      throw new Error(backendMessage);
    } else {
      throw new Error("Network Error: Could not search periodic pools.");
    }
  }
};

const GetTotalOneTimeSavings = async () => {
  const url = `${API_URL}/web3/v2/saving/getTotalAmountSaved`;
  try {
    const response = await axios.get(url, {
      headers: authHeader(),
    });
    return response.data?.data || 0;
  } catch (error: any) {
    console.error("Error fetching total one-time savings:", error);
    if (axios.isAxiosError(error) && error.response) {
      const backendMessage =
        error.response.data?.message ||
        "An error occurred fetching total savings";
      throw new Error(backendMessage);
    } else {
      throw new Error("Network Error: Could not fetch total one-time savings.");
    }
  }
};

const GetTotalPeriodicSavings = async () => {
  const url = `${API_URL}/web3/v2/periodicSaving/totalAmountSaved`;
  try {
    const response = await axios.get(url, {
      headers: authHeader(),
    });
    return response.data?.data || 0;
  } catch (error: any) {
    console.error("Error fetching total periodic savings:", error);
    if (axios.isAxiosError(error) && error.response) {
      const backendMessage =
        error.response.data?.message ||
        "An error occurred fetching total savings";
      throw new Error(backendMessage);
    } else {
      throw new Error("Network Error: Could not fetch total periodic savings.");
    }
  }
};

const CashwyreFund = async (body: any) => {
  const url = `${API_URL}/web3/cashwyre/onramp/quote`;
  try {
    const response = await axios.post(url, body, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Backend error response:", error.response.data);
      const backendMessage =
        error.response.data.message ||
        error.response.data.msg ||
        "An error occurred";
      throw new Error(backendMessage);
    } else {
      console.error("Network error:", error.message);
      throw new Error("Network Error: Please check your internet connection.");
    }
  }
};

const CashwyreOnrampConfirm = async (body: any) => {
  const url = `${API_URL}/web3/cashwyre/onramp/confirm`;
  try {
    const response = await axios.post(url, body, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Backend error response:", error.response.data);
      const backendMessage =
        error.response.data.message ||
        error.response.data.msg ||
        "An error occurred";
      throw new Error(backendMessage);
    } else {
      console.error("Network error:", error.message);
      throw new Error("Network Error: Please check your internet connection.");
    }
  }
};

const CashwyreOfframpQuote = async (body: any) => {
  const url = `${API_URL}/web3/cashwyre/offramp/quote`;
  try {
    const response = await axios.post(url, body, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Backend error response:", error.response.data);
      const backendMessage =
        error.response.data.message ||
        error.response.data.msg ||
        "An error occurred";
      throw new Error(backendMessage);
    } else {
      console.error("Network error:", error.message);
      throw new Error("Network Error: Please check your internet connection.");
    }
  }
};

const CashwyreOfframpConfirm = async (body: any) => {
  const url = `${API_URL}/web3/cashwyre/offramp/confirm`;
  try {
    const response = await axios.post(url, body, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Backend error response:", error.response.data);
      const backendMessage =
        error.response.data.message ||
        error.response.data.msg ||
        "An error occurred";
      throw new Error(backendMessage);
    } else {
      console.error("Network error:", error.message);
      throw new Error("Network Error: Please check your internet connection.");
    }
  }
};

const getCashwyreHistory = async () => {
  const url = `${API_URL}/web3/cashwyre/transactions`;
  //console.log("Fetching cashwyre history from:", url);

  try {
    const response = await axios.get(url, {
      headers: authHeader(),
    });
    //console.log("Raw API response:", response);
    //console.log("Cashwyre history data:", response.data);

    return {
      data: response.data.data || [],
      message:
        response.data.message || "Successfully fetched cashwyre transactions",
      success: response.data.success !== false,
    };
  } catch (error: any) {
    //console.error("Error in getCashwyreHistory:", error);
    if (axios.isAxiosError(error) && error.response) {
      const backendMessage =
        error.response.data?.msg ||
        error.response.data?.message ||
        "An error occurred fetching crypto history";
      throw new Error(backendMessage);
    } else if (axios.isCancel(error)) {
      throw new Error("Request canceled.");
    } else {
      throw new Error("Network Error: Could not fetch crypto history.");
    }
  }
};

const GetTotalBalance = async (network: string = "ETHERLINK") => {
  const url = `${API_URL}/web3/balance/total/${network}`;
  try {
    const response = await axios({
      url,
      headers: authHeader(),
      method: "get",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const ActivateBitcoinAccount = async () => {
  const url = `${API_URL}/web3/account/activateBitcoin`;
  try {
    const response = await axios.post(url, null, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("Network Error: Could not activate Bitcoin account.");
    }
  }
};

const GetBitcoinBalance = async () => {
  const url = `${API_URL}/web3/balance/bitcoin/balance`;
  try {
    const response = await axios.get(url, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("Network Error: Could not fetch Bitcoin balance.");
    }
  }
};

const web3Services = {
  ActivateCryptoWallet,
  GetTotalCryptoWalletBalance,
  GetCryptoWalletDetails,
  CreatePool,
  CreatePeriodicPool,
  GetAllUserPools,
  UpdateUserPool,
  WithdrawUserPool,
  WithdrawAutoUserPool,
  GetAllUserTokens,
  UpdateAutoPool,
  StopPeriodicPool,
  ResumePeriodicPool,
  SearchOneTimePoolsByReason,
  SearchPeriodicPoolsByReason,
  GetTotalOneTimeSavings,
  GetTotalPeriodicSavings,
  getCryptoHistory,
  CashwyreFund,
  CashwyreOnrampConfirm,
  CashwyreOfframpQuote,
  CashwyreOfframpConfirm,
  getCashwyreHistory,
  GetTotalBalance,
  ActivateBitcoinAccount,
  GetBitcoinBalance,
};

export default web3Services;
