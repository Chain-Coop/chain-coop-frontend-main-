import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetContributionBalance,
  GetUsersTransaction,
  GetWalletBalance,
} from "../redux/slices/transaction.slices";
import { AppDispatch } from "../redux/store";
import { formatBalance } from "../utils/format";
import { setMessage } from "../redux/slices/message.slices";

export const useWalletBalance = () => {
  const dispatch: AppDispatch = useDispatch();
  
  const balance = useSelector((state: any) => state?.transaction?.getWalletBalance);
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

  const balanceInNaira = balance?.balance || 0;

  const formattedBalance = formatBalance(balanceInNaira);

  return {
    isWalletVisible,
    setIsWalletVisible,
    formattedBalance,
    balanceInNaira,    
  };
};


export const useContributionBalance = () => {
  const dispatch: AppDispatch = useDispatch();  
  const balance = useSelector(
    (state: any) => state?.transaction?.getContributionBalance
  );
  const loading = useSelector(
    (state: any) => state?.transaction?.loading
  );
  const error = useSelector(
    (state: any) => state?.transaction?.error
  );
  const [isContributionVisible, setIsContributionVisible] = useState(() => {
    const storedVisibility = sessionStorage.getItem("contributionBalanceVisible");
    return storedVisibility !== null ? storedVisibility === "true" : true;
  });

  useEffect(() => {
    const userToken = sessionStorage.getItem("userData");
    if (userToken) {
      dispatch(GetContributionBalance())
        .unwrap()
        .catch((err: any) => {
          dispatch(setMessage(err.message || 'Failed to fetch balance'));
        });
    } else {
      dispatch(setMessage('User token not found'));
    }
  }, [dispatch]);

  const balanceInNaira = balance?.totalBalance || 0;
  const formattedBalance = formatBalance(balanceInNaira);

  return {
    isContributionVisible,
    setIsContributionVisible,
    formattedBalance,
    isLoading: loading,
    error
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
        });
    }
  }, [dispatch]);
  return {
    getTransaction,
  };
};


export default useWalletBalance;


