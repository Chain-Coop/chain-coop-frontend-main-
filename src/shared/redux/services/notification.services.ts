import authHeader from "./headers";
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const getAllNotification = async (page: number, limit: number) => {
  const url = `${API_URL}/notification?page=${page}&limit=${limit}`;
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

const updateNotificationStatus = async (notificationId: string) => {
  const url = `${API_URL}/notification/read/${notificationId}`;
  try {
    const response = await axios({
      url,
      headers: authHeader(),
      method: "post",
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

const notificationServices = {
  getAllNotification,
  updateNotificationStatus,
};

export default notificationServices;
