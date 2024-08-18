import axios from "axios";
import authHeader from "./headers";
import React from "react";

const API_URL_SUBMIT_PROPOSAL =
  import.meta.env.VITE_REACT_APP_API_URL + "/proposals";

const API_URL_SEND_PROPOSAL =
  import.meta.env.VITE_REACT_APP_API_URL + "/proposals";

const GetWalletBalance = async () => {
  const url = import.meta.env.VITE_REACT_APP_API_URL + "/wallet/balance";
  try {
    const response = await axios({
      url,
      headers: authHeader(),
      method: "get",
    });

    return response.data;
  } catch (error: any) {
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
  } catch (error: any) {
    if (!error.response) {
      throw new Error("Network Error: Please check your internet connection.");
    } else {
      throw error.response.data;
    }
  }
};

export const SendProposal = async (formData: FormData) => {
  try {
    const userToken = sessionStorage.getItem("userData");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(userToken && { Authorization: `Bearer ${userToken}` }),
      },
    };
    const response = await axios.post(
      API_URL_SUBMIT_PROPOSAL,
      formData,
      config,
    );
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw new Error("Network Error: Please check your internet connection.");
    } else {
      throw new Error(
        error.response.data.message || "An error occurred. Please try again.",
      );
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
  } catch (error: any) {
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
};

export default TransactionServices;
