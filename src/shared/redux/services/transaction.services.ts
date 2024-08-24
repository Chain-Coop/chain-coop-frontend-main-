import axios from "axios";
import authHeader from "./headers";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const GetWalletBalance = async () => {
  const url = `${API_URL}/wallet/balance`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
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

const handleApiError = (error: any) => {
  if (!error.response) {
    throw new Error("Network Error: Please check your internet connection.");
  } else {
    throw error.response.data;
  }
};

const TransactionServices = {
  GetWalletBalance,
  GetUsersTransaction,
  SendProposal,
  GetProposal,
};

export default TransactionServices;
