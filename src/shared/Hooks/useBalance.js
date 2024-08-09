import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetUsersTransaction,
  GetWalletBalance,
} from "../redux/slices/transaction.slices";
import { formatAmount } from "../utils/format";

export const useBalance = () => {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state?.transaction?.getWalletBalance);
  const [isWalletVisible, setIsWalletVisible] = useState(() => {
    const storedVisibility = sessionStorage.getItem("walletBalanceVisible");
    return storedVisibility !== null ? storedVisibility === "true" : true;
  });

  useEffect(() => {
    const userToken = sessionStorage.getItem("userData");
    if (userToken) {
      dispatch(GetWalletBalance())
        .unwrap()
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dispatch]);

  const formattedBalance = balance?.balance
    ? formatAmount(balance.balance)
    : "₦ 0.00";

  return {
    isWalletVisible,
    setIsWalletVisible,
    formattedBalance,
  };
};

export const useUserTransaction = () => {
  const dispatch = useDispatch();

  const getTransaction = useSelector(
    (state) => state?.transaction?.getUsersTransaction,
  );

  useEffect(() => {
    const userToken = sessionStorage.getItem("userData");
    if (userToken) {
      dispatch(GetUsersTransaction())
        .unwrap()
        .then(() => {})
        .catch((err) => {
          const errorMessage = err.message;
          console.log(errorMessage);
        });
    }
  }, [dispatch]);
  return {
    getTransaction,
  };
};

export default useBalance;
