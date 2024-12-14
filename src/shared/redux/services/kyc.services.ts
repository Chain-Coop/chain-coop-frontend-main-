import axios from "axios";
import authHeader from "./headers";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const kycPhoneOtp = async () => {
  const url = `${API_URL}/kyc/send-otp`;
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

export const VerifykycPhoneOtp = async (codeData: {
  code: string;
  reference: string;
}) => {
  const url = `${API_URL}/kyc/verify-otp`;
  try {
    const response = await axios.post(
      url,
      {
        code: codeData.code,
        reference: codeData.reference,
      },
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("Network Error: Please check your internet connection.");
    }
  }
};

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

export const VerifykycWhatsAppOtp = async (codeData: {
  code: string;
  reference: string;
}) => {
  const url = `${API_URL}/kyc/verifywaotp`;
  try {
    const response = await axios.post(
      url,
      {
        code: codeData.code,
        reference: codeData.reference,
      },
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("Network Error: Please check your internet connection.");
    }
  }
};

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

const GetCryptoWalletBalance = async () => {
  const url = `${API_URL}/web3/balance/token/3`;
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

const KycServices = {
  kycWhatsAppOtp,
  VerifykycWhatsAppOtp,
  kycPhoneOtp,
  VerifykycPhoneOtp,
  ActivateCryptoWallet,
  GetCryptoWalletBalance,
  GetCryptoWalletDetails,
  CreatePool,
};

export default KycServices;
