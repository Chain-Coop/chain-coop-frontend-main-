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

const GetTotalCryptoWalletBalance = async () => {
  const url = `${API_URL}/web3/balance/total`;
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
        error.response.data.msg || // Check if it's really .msg
        error.response.data.message || // Or maybe .message
        error.response.data?.error?.message || // Or nested?
        "An error occurred";
      throw new Error(backendMessage);
    } else {
      console.error("Network error:", error.message);
      throw new Error("Network Error: Please check your internet connection.");
    }
  }
};

const GetAllUserTokens = async () => {
  const url = `${API_URL}/web3/balance/tokens`;
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

const web3Services = {
  ActivateCryptoWallet,
  GetTotalCryptoWalletBalance,
  GetCryptoWalletDetails,
  CreatePool,
  CreatePeriodicPool,
  GetAllUserPools,
  UpdateUserPool,
  WithdrawUserPool,
  GetAllUserTokens,
  UpdateAutoPool,
};

export default web3Services;
