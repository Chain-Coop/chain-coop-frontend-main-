import axios from "axios";

const user = sessionStorage.getItem("userData");
const customAxios = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user}`,
  },
});

export default customAxios;
