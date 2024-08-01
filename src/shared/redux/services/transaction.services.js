import axios from "axios";
import authHeader from "./headers";

const GetWalletBalance = async () => {
  const url = import.meta.env.VITE_REACT_APP_API_URL + "/wallet/balance";
  try {
    const response = await axios({
      url,
      headers: authHeader(),
      method: "get",
    });

    return response.data;
  } catch (error) {
    if (!error.response) {
      throw new Error("Network Error: Please check your internet connection.");
    } else {
      throw error.response.data;
    }
  }
};

const GetUsersTransaction = async () => {
  const url = import.meta.env.VITE_REACT_APP_API_URL + "/wallet/history";
  try {
    const response = await axios({
      url,
      headers: authHeader(),
      method: "get",
    });

    return response.data;
  } catch (error) {
    if (!error.response) {
      throw new Error("Network Error: Please check your internet connection.");
    } else {
      throw error.response.data;
    }
  }
};

const TransactionServices = {
  GetWalletBalance,
  GetUsersTransaction,
};

export default TransactionServices;
