import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetUsersTransaction,
  GetWalletBalance,
} from "../redux/slices/transaction.slices";
import { formatAmount } from "../utils/format";
import { AppDispatch } from "../redux/store";

export const useBalance = () => {
  const dispatch: AppDispatch = useDispatch();
  const balance = useSelector(
    (state: any) => state?.transaction?.getWalletBalance,
  );
  const [isWalletVisible, setIsWalletVisible] = useState(() => {
    const storedVisibility = sessionStorage.getItem("walletBalanceVisible");
    return storedVisibility !== null ? storedVisibility === "true" : true;
  });

  useEffect(() => {
    const userToken = sessionStorage.getItem("userData");
    if (userToken) {
      dispatch(GetWalletBalance())
        .unwrap()
        .catch((error: any) => {
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
  const dispatch: AppDispatch = useDispatch();
  const getTransaction = useSelector(
    (state: any) => state?.transaction?.getUsersTransaction,
  );

  useEffect(() => {
    const userToken = sessionStorage.getItem("userData");
    if (userToken) {
      dispatch(GetUsersTransaction())
        .unwrap()
        .then(() => {})
        .catch((err: any) => {
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
