import { useState } from "react";
import customAxios from "../utils/axios";

const useApi = async (url:any, method = "GET", requestData = null) => {
  const [data, setData] = useState(null);

  try {
    let response;

    switch (method) {
      case "GET":
        response = await customAxios.get(url);
        break;
      case "POST":
        response = await customAxios.post(url, requestData);
        break;
      case "PUT":
        response = await customAxios.put(url, requestData);
        break;
      case "DELETE":
        response = await customAxios.delete(url);
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }

    setData(response.data);
  } catch (error) {
    console.log(error);
  }

  return { data };
};

export default useApi;
