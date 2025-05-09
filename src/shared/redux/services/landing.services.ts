import axios from "axios";
import authHeader from "./headers";

const API_URL = (import.meta as any).env.VITE_REACT_APP_API_URL;

const RegisterUser = async (body: any) => {
  const url = `${API_URL}/auth/register`;

  try {
    const response = await axios.post(url, body, {});
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const LoginUser = async (body: any) => {
  const url = `${API_URL}/auth/login`;

  try {
    const response = await axios.post(url, body, {});
    const token = response.data.token;
    if (token) {
      sessionStorage.setItem("userData", token);
      return response?.data;
    }
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error("Network Error: Please check your internet connection.");
    }
  }
};

const JoinNewsLetter = async (body: any) => {
  const url = `${API_URL}/news-letter/join`;

  try {
    const response = await axios.post(url, body, {});
    return response;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error("Network Error: Please check your internet connection.");
    }
  }
};

const VerifyUserAuth = async (body: any) => {
  const url = `${API_URL}/auth/verify_otp`;

  try {
    const response = await axios.post(url, body, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const VerifyUserPhoneNumber = async (body: any) => {
  const url = `${API_URL}/auth/verify_whatsapp_otp`;

  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export async function FORGOT_PASSWORD(endpoint: string, data: any) {
  const url = API_URL + endpoint;
  try {
    return await axios.post(url, data);
  } catch (error: any) {
    return error.response;
  }
}

const ResetPassword = async (body: any) => {
  const url = `${API_URL}/auth/forget_password`;

  try {
    const response = await axios.post(url, body, {});
    return response;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error("Network Error: Please check your internet connection.");
    }
  }
};

export async function RESEND_LOGIN_OTP(endpoint: string, data: any) {
  const url = API_URL + endpoint;
  try {
    return await axios.post(url, data);
  } catch (error: any) {
    return error.response.data;
  }
}

export async function RESEND_VERIFY_OTP(endpoint: string, data: any) {
  const url = API_URL + endpoint;
  try {
    return await axios.post(url, data);
  } catch (error: any) {
    return error.response.data;
  }
}

export async function UPDATE_PHONE_NUMBER(endpoint: string, data: any) {
  const url = API_URL + endpoint;
  try {
    return await axios.put(url, data);
  } catch (error: any) {
    return error.response.data;
  }
}

export async function RESET_PASSWORD(endpoint: string, data: any) {
  const url = API_URL + endpoint;
  try {
    return await axios.post(url, data);
  } catch (error: any) {
    return error.response;
  }
}

const PublicContact = async (body: any) => {
  const url = `${API_URL}/contact-us`;

  try {
    const response = await axios.post(url, body, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const GetUserProfile = async () => {
  const url = API_URL + "/auth/user";

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

const UploadAvatar = async (body: any) => {
  const url = `${API_URL}/profile/upload_profile_picture`;

  try {
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userData")}`,
      },
    });
    if (response?.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response structure");
    }
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
  UploadAvatar,
  JoinNewsLetter,
  ResetPassword,
  VerifyUserPhoneNumber,
  UPDATE_PHONE_NUMBER,
};

export default LandingServices;
