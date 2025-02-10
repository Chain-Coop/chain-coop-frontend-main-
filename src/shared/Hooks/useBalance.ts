import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetContributionBalance,
  GetUnPaidBalance,
  GetUsersTransaction,
  GetWalletBalance,
} from "../redux/slices/transaction.slices";
import { AppDispatch } from "../redux/store";
import { formatBalance } from "../utils/format";
import { setMessage } from "../redux/slices/message.slices";
import { useLocation } from "react-router";
import {
  GetAllUserPools,
  GetAllUserTokens,
  GetTotalCryptoWalletBalance,
  GetCryptoWalletDetails,
} from "../redux/slices/kyc.slices";
import useUserProfile from "./useUserProfile";

export const useWalletBalance = () => {
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

  const balanceInNaira = balance?.balance || 0;
  const cards = balance?.allCards || [];

  const formattedBalance = formatBalance(balanceInNaira);

  return {
    isWalletVisible,
    setIsWalletVisible,
    formattedBalance,
    balanceInNaira,
    cards,
  };
};

export const useContributionBalance = () => {
  const dispatch: AppDispatch = useDispatch();
  const balance = useSelector(
    (state: any) => state?.transaction?.getContributionBalance,
  );
  const loading = useSelector((state: any) => state?.transaction?.loading);
  const error = useSelector((state: any) => state?.transaction?.error);
  const [isContributionVisible, setIsContributionVisible] = useState(() => {
    const storedVisibility = sessionStorage.getItem(
      "contributionBalanceVisible",
    );
    return storedVisibility !== null ? storedVisibility === "true" : true;
  });

  useEffect(() => {
    const userToken = sessionStorage.getItem("userData");
    if (userToken) {
      dispatch(GetContributionBalance())
        .unwrap()
        .catch((err: any) => {
          dispatch(setMessage(err.message || "Failed to fetch balance"));
        });
    } else {
      dispatch(setMessage("User token not found"));
    }
  }, [dispatch]);

  const balanceInNaira = balance?.totalBalance || 0;
  const formattedBalance = formatBalance(balanceInNaira);

  return {
    isContributionVisible,
    setIsContributionVisible,
    formattedBalance,
    isLoading: loading,
    error,
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

export const useUnPaidContribution = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();

  const contributionId = location?.state?.contributionId?.toString();

  const balance = useSelector(
    (state: any) => state?.transaction?.getUnPaidContributionBalance,
  );

  const [isUnPaidVisible, setIsUnPaidVisible] = useState(() => {
    const storedVisibility = sessionStorage.getItem("walletBalanceVisible");
    return storedVisibility !== null ? storedVisibility === "true" : true;
  });

  useEffect(() => {
    const userToken = sessionStorage.getItem("userData");
    if (userToken && contributionId) {
      dispatch(GetUnPaidBalance(contributionId))
        .unwrap()
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [dispatch, contributionId]);

  const balanceInNaira = balance?.balance || 0;
  const formattedBalance = formatBalance(balanceInNaira);

  return {
    isUnPaidVisible,
    setIsUnPaidVisible,
    formattedBalance,
    balanceInNaira,
  };
};
export const useCryptoWallet = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isWalletVisible, setIsWalletVisible] = useState(() => {
    sessionStorage.removeItem("walletBalanceVisible");
    return true;
  });

  const { cryptoBalance, loading, error, walletMessage } = useSelector(
    (state: any) => state.kyc,
  );
  const Balance = walletMessage === "No Wallet found" ? 0 : cryptoBalance || 0;

  const fetchWalletBalance = useCallback(() => {
    dispatch(GetTotalCryptoWalletBalance());
  }, [dispatch]);

  useEffect(() => {
    fetchWalletBalance();

    const refreshInterval = setInterval(fetchWalletBalance, 30000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [fetchWalletBalance]);

  return {
    isWalletVisible,
    setIsWalletVisible,
    loading,
    error,
    Balance,
    walletMessage,
    isWalletActivated: !walletMessage,
    fetchWalletBalance,
  };
};

export const useCryptoWalletDetails = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { cryptoWalletDetails, loading, error } = useSelector(
    (state: any) => state.kyc,
  );
  const fetchWalletBalance = () => {
    dispatch(GetCryptoWalletDetails());
  };

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  return {
    loading,
    error,
    cryptoWalletDetails,
  };
};

export const useAllUserPools = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { userPools, loading, error } = useSelector((state: any) => state.kyc);

  const fetchWalletBalance = () => {
    dispatch(GetAllUserPools());
  };

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  return {
    loading,
    error,
    userPools,
  };
};

export const useAllUserTokens = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { userTokens, loading, error } = useSelector((state: any) => state.kyc);

  const fetchUserTokens = () => {
    dispatch(GetAllUserTokens());
  };

  useEffect(() => {
    fetchUserTokens();
  }, []);

  return {
    loading,
    error,
    userTokens,
  };
};

export default useWalletBalance;
