import axios from "axios";
import authHeader from "./headers";

const API_URL_REGISTER_USER =
  import.meta.env.VITE_REACT_APP_API_URL + "/auth/register";

const API_URL_LOGIN_USER =
  import.meta.env.VITE_REACT_APP_API_URL + "/auth/login";

const API_URL_VERIFY_USER =
  import.meta.env.VITE_REACT_APP_API_URL + "/auth/verify_otp";

const RegisterUser = async (body) => {
  return await axios.post(API_URL_REGISTER_USER, body, {}).then((response) => {
    return response.data;
  });
};

const LoginUser = async (body) => {
  try {
    const response = await axios.post(API_URL_LOGIN_USER, body, {});
    const token = response.data.token;
    if (token) {
      sessionStorage.setItem("userData", token);
      return response.data;
    } else {
      throw new Error("Token not found in response");
    }
  } catch (error) {
    throw new Error("Failed to login: " + error.message);
  }
};

export async function FORGOT_PASSWORD(endpoint, data) {
  const url = import.meta.env.VITE_REACT_APP_API_URL + endpoint;
  try {
    return await axios.post(url, data);
  } catch (error) {
    return error.response;
  }
}

export async function RESEND_LOGIN_OTP(endpoint, data) {
  const url = import.meta.env.VITE_REACT_APP_API_URL + endpoint;
  try {
    return await axios.post(url, data);
  } catch (error) {
    return error.response;
  }
}

const VerifyUserAuth = async (body) => {
  return await axios
    .post(API_URL_VERIFY_USER, body, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

export async function RESET_PASSWORD(endpoint, data) {
  const url = import.meta.env.VITE_REACT_APP_API_URL + endpoint;
  try {
    return await axios.post(url, data);
  } catch (error) {
    return error.response;
  }
}

const LandingServices = {
  RegisterUser,
  LoginUser,
  VerifyUserAuth,
};

export default LandingServices;
