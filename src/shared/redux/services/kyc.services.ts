import axios from "axios";
import authHeader from "./headers";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const kycWhatsAppOtp = async () => {
  const url = `${API_URL}/kyc/sendwaotp`;
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

export const VerifykycWhatsAppOtp = async (codeData: { code: string }) => {
  const url = `${API_URL}/kyc/verifywaotp`;
  try {
    const response = await axios.post(
      url,
      { code: codeData.code },
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log("Err", error);
      throw error.response.data;
    } else {
      throw new Error("Network Error: Please check your internet connection.");
    }
  }
};

const KycServices = {
  kycWhatsAppOtp,
  VerifykycWhatsAppOtp,
};

export default KycServices;
