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
  const url = `${API_URL}/web3/saving/openPool`;
  try {
    const response = await axios.post(url, body, {
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

const GetAllUserPools = async () => {
  const url = `${API_URL}/web3/saving/userPools`;
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

const UpdateUserPool = async (body: any) => {
  const url = `${API_URL}/web3/saving/updatePool`;
  try {
    const response = await axios.post(url, body, {
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
  GetAllUserPools,
  UpdateUserPool,
  GetAllUserTokens,
};

export default web3Services;
