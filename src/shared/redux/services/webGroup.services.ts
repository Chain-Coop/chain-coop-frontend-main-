import axios from "axios";
import authHeader from "./headers";

const API_URL = (import.meta as any).env.VITE_REACT_APP_API_URL;

const handleApiError = (error: any) => {
  if (!error.response) {
    throw new Error("Network Error: Please check your internet connection.");
  } else {
    throw error.response.data;
  }
};

const CreateGroupContribution = async (body: any) => {
  try {
    const response = await axios.post(`${API_URL}/savingcircle/create`, body, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const webGroupServices = {
  CreateGroupContribution,
};

export default webGroupServices;
