import axios from "axios";
import authHeader from "./headers";
import React from "react";

const API_URL_REGISTER_USER =
  import.meta.env.VITE_REACT_APP_API_URL + "/auth/register";

const API_URL_LOGIN_USER =
  import.meta.env.VITE_REACT_APP_API_URL + "/auth/login";

const API_URL_VERIFY_USER =
  import.meta.env.VITE_REACT_APP_API_URL + "/auth/verify_otp";

const API_URL_PUBLIC_CONTACT =
  import.meta.env.VITE_REACT_APP_API_URL + "/contact-us";

const RegisterUser = async (body: any) => {
  try {
    const response = await axios.post(API_URL_REGISTER_USER, body, {});
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const LoginUser = async (body: any) => {
  try {
    const response = await axios.post(API_URL_LOGIN_USER, body, {});
    const token = response.data.token;
    if (token) {
      sessionStorage.setItem("userData", token);
      return response?.data;
    }
  } catch (error: any) {
    throw error.response.data;
  }
};

const VerifyUserAuth = async (body: any) => {
  try {
    const response = await axios.post(API_URL_VERIFY_USER, body, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export async function FORGOT_PASSWORD(endpoint: string, data: any) {
  const url = import.meta.env.VITE_REACT_APP_API_URL + endpoint;
  try {
    return await axios.post(url, data);
  } catch (error: any) {
    return error.response;
  }
}

export async function RESEND_LOGIN_OTP(endpoint: string, data: any) {
  const url = import.meta.env.VITE_REACT_APP_API_URL + endpoint;
  try {
    return await axios.post(url, data);
  } catch (error: any) {
    return error.response.data;
  }
}

export async function RESET_PASSWORD(endpoint: string, data: any) {
  const url = import.meta.env.VITE_REACT_APP_API_URL + endpoint;
  try {
    return await axios.post(url, data);
  } catch (error: any) {
    return error.response;
  }
}
const PublicContact = async (body: any) => {
  try {
    const response = await axios.post(API_URL_PUBLIC_CONTACT, body, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const GetUserProfile = async () => {
  const url = import.meta.env.VITE_REACT_APP_API_URL + "/auth/user";

  try {
    const response = await axios({
      url,
      headers: authHeader(),
      method: "get",
    });
    const token = response.data.token;
    if (token) {
      sessionStorage.setItem("userData", token);
    }
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw new Error("Network Error: Please check your internet connection.");
    } else {
      throw error.response.data;
    }
  }
};

const LandingServices = {
  RegisterUser,
  LoginUser,
  VerifyUserAuth,
  PublicContact,
  GetUserProfile,
};

export default LandingServices;
