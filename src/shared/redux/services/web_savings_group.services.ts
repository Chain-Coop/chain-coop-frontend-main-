// store/thunks/createSavingsCircle.ts
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

const CreateSavingsCircle = async (formData: any) => {
  try {
    //console.log("Sending payload to backend:", formData);
    const response = await axios.post(
      `${API_URL}/savingcircle/create`,
      formData,
      {
        headers: {
          ...authHeader(),
        },
      },
    );
    //console.log("Backend response:", response);
    //console.log("Backend response data:", response.data);

    return response.data;
  } catch (error: any) {
    //console.error("Error in CreateSavingsCircle:", error);
    if (axios.isAxiosError(error) && error.response) {
      const backendMessage =
        error.response.data?.message ||
        error.response.data?.msg ||
        "An error occurred creating savings circle";
      throw new Error(backendMessage);
    } else if (axios.isCancel(error)) {
      throw new Error("Request canceled.");
    } else {
      throw new Error("Network Error: Could not create savings circle.");
    }
  }
};

const GetAllSavingCircles = async () => {
  const url = `${API_URL}/savingcircle/circles`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const GetSavingCircleByUser = async (userID: string) => {
  const url = `${API_URL}/savingcircle/user/${userID}`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const GetSavingCircleByID = async (circleID: string) => {
  const url = `${API_URL}/savingcircle/${circleID}`;
  try {
    const response = await axios.get(url, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const WebGroupSavings = {
  CreateSavingsCircle,
  GetAllSavingCircles,
  GetSavingCircleByUser,
  GetSavingCircleByID,
};

export default WebGroupSavings;
