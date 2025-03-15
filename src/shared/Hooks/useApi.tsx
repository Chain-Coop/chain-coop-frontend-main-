import { useState, useEffect } from "react";
import customAxios from "../utils/axios";

interface ApiResponse<T = any> {
  data: T | null;
  loading: boolean;
  error: any;
  execute: (customData?: any) => Promise<{ data: T }>; // Fix: Return a promise with a `data` property
}

function useApi<T = any>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  initialData: any = null,
  immediate: boolean = true,
  headers: any = {},
): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<any>(null);

  const execute = async (customData?: any): Promise<{ data: T }> => {
    try {
      setLoading(true);
      setError(null);

      let response;
      const requestData = customData || initialData;

      switch (method) {
        case "GET":
          response = await customAxios.get<T>(url, { headers });
          break;
        case "POST":
          response = await customAxios.post<T>(url, requestData, { headers });
          break;
        case "PUT":
          response = await customAxios.put<T>(url, requestData, { headers });
          break;
        case "DELETE":
          response = await customAxios.delete<T>(url, {
            data: requestData,
            headers,
          });
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }

      setData(response.data);
      return { data: response.data };
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [url, method]);

  return { data, loading, error, execute };
}

export default useApi;
