import axios from "axios";
import authHeader from "./headers";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const phoneNumberOtp = async (body: any) => {
  const url = `${API_URL}/kyc/send-otp`;
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

const KycServices = {
  phoneNumberOtp,
};

export default KycServices;
