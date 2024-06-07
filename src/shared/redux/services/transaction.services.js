import axios from "axios";
import authHeader from "./headers";

const GetWalletBalance = async () => {
  const url = import.meta.env.VITE_REACT_APP_API_URL + "/wallet/balance";
  return await axios({
    url,
    headers: authHeader(),
    method: "get",
  }).then((response) => {
    return response.data;
  });
};

const TransactionServices = {
  GetWalletBalance,
};

export default TransactionServices;

