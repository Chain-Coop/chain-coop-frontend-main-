import axios from "axios";
import authHeader from "./headers";

<<<<<<< HEAD
const API_URL_SUBMIT_PROPOSAL =
  import.meta.env.VITE_REACT_APP_API_URL + "/proposals";

=======
>>>>>>> 10cf39ba59df1c53433ab269595f99f4750d01bf
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

<<<<<<< HEAD
const SendProposal = async (body) => {
  try {
    const userToken = sessionStorage.getItem("userData");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(userToken && { Authorization: `Bearer ${userToken}` }),
      },
    };
    const response = await axios.post(API_URL_SUBMIT_PROPOSAL, body, config);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw new Error("Network Error: Please check your internet connection.");
    } else {
      throw error.response.data;
    }
  }
};

const GetProposal = async () => {
  const url = import.meta.env.VITE_REACT_APP_API_URL + "/proposals";
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
  SendProposal,
  GetProposal,
=======
const TransactionServices = {
  GetWalletBalance,
  GetUsersTransaction,
>>>>>>> 10cf39ba59df1c53433ab269595f99f4750d01bf
};

export default TransactionServices;
