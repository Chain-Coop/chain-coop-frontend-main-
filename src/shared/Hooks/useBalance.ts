import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useLocation } from "react-router";
import { formatBalance } from "../utils/format";
import { setMessage } from "../redux/slices/message.slices";
import * as transactionSlices from "../redux/slices/transaction.slices";
import * as Web3Slices from "../redux/slices/web3.slices";

const useVisibilityState = (storageKey: string, defaultValue = true) => {
  const [isVisible, setIsVisible] = useState(() => {
    const stored = sessionStorage.getItem(storageKey);
    return stored !== null ? stored === "true" : defaultValue;
  });

  return { isVisible, setIsVisible };
};

const useBalanceFetcher = <T extends unknown>(
  selector: (state: any) => any,
  fetchAction: any,
  options: {
    balanceKey?: string;
    requiresToken?: boolean;
    refreshInterval?: number;
    params?: any;
  } = {},
) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    balanceKey = "balance",
    requiresToken = true,
    refreshInterval,
    params,
  } = options;

  const data = useSelector(selector);
  const loading = useSelector((state: any) => state?.transaction?.loading);
  const error = useSelector((state: any) => state?.transaction?.error);

  const fetch = useCallback(() => {
    const userToken = sessionStorage.getItem("userData");
    if (!requiresToken || userToken) {
      dispatch(fetchAction(params))
        .unwrap()
        .catch((err: any) => {
          dispatch(setMessage(err.message || "Failed to fetch balance"));
        });
    }
  }, [dispatch, params, requiresToken]);

  useEffect(() => {
    fetch();
    if (refreshInterval) {
      const interval = setInterval(fetch, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetch, refreshInterval]);

  const balanceInNaira = data?.[balanceKey] || 0;
  const formattedBalance = formatBalance(balanceInNaira);

  return {
    data,
    balanceInNaira,
    formattedBalance,
    loading,
    error,
    fetch,
  };
};

export const useWalletBalance = () => {
  const { isVisible, setIsVisible } = useVisibilityState(
    "walletBalanceVisible",
  );
  const { data, balanceInNaira, formattedBalance } = useBalanceFetcher(
    (state: any) => state?.transaction?.getWalletBalance,
    transactionSlices.GetWalletBalance,
  );

  return {
    isWalletVisible: isVisible,
    setIsWalletVisible: setIsVisible,
    formattedBalance,
    balanceInNaira,
    cards: data?.allCards || [],
  };
};

export const useContributionBalance = () => {
  const { isVisible, setIsVisible } = useVisibilityState(
    "contributionBalanceVisible",
  );
  const { formattedBalance, loading, error } = useBalanceFetcher(
    (state: any) => state?.transaction?.getContributionBalance,
    transactionSlices.GetContributionBalance,
    { balanceKey: "totalBalance" },
  );

  return {
    isContributionVisible: isVisible,
    setIsContributionVisible: setIsVisible,
    formattedBalance,
    isLoading: loading,
    error,
  };
};

export const useUnPaidContribution = () => {
  const location = useLocation();
  const contributionId = location?.state?.contributionId?.toString();
  const { isVisible, setIsVisible } = useVisibilityState(
    "walletBalanceVisible",
  );

  const { balanceInNaira, formattedBalance } = useBalanceFetcher(
    (state: any) => state?.transaction?.getUnPaidContributionBalance,
    transactionSlices.GetUnPaidBalance,
    { params: contributionId },
  );

  return {
    isUnPaidVisible: isVisible,
    setIsUnPaidVisible: setIsVisible,
    formattedBalance,
    balanceInNaira,
  };
};

export const useCryptoWallet = () => {
  const { isVisible, setIsVisible } = useVisibilityState(
    "walletBalanceVisible",
    true,
  );
  const {
    data: cryptoState,
    loading,
    error,
    fetch,
  } = useBalanceFetcher(
    (state: any) => state.kyc,
    Web3Slices.GetTotalCryptoWalletBalance,
    { refreshInterval: 30000 },
  );

  const Balance =
    cryptoState?.walletMessage === "No Wallet found"
      ? 0
      : cryptoState?.cryptoBalance || 0;

  return {
    isWalletVisible: isVisible,
    setIsWalletVisible: setIsVisible,
    loading,
    error,
    Balance,
    walletMessage: cryptoState?.walletMessage,
    isWalletActivated: !cryptoState?.walletMessage,
    fetchWalletBalance: fetch,
  };
};

const useDataFetcher = (selector: (state: any) => any, fetchAction: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(selector);
  const { loading, error } = useSelector((state: any) => state.kyc);

  const fetch = useCallback(() => {
    dispatch(fetchAction());
  }, [dispatch, fetchAction]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, fetch };
};

export const useCryptoWalletDetails = () => {
  const { data, loading, error } = useDataFetcher(
    (state: any) => state.kyc.cryptoWalletDetails,
    Web3Slices.GetCryptoWalletDetails,
  );
  return { cryptoWalletDetails: data, loading, error };
};

export const useAllUserPools = () => {
  const { data, loading, error } = useDataFetcher(
    (state: any) => state.kyc.userPools,
    Web3Slices.GetAllUserPools,
  );
  return { userPools: data, loading, error };
};

export const useAllUserTokens = () => {
  const { data, loading, error } = useDataFetcher(
    (state: any) => state.kyc.userTokens,
    Web3Slices.GetAllUserTokens,
  );
  return { userTokens: data, loading, error };
};

export default useWalletBalance;

export const useUserTransaction = () => {
  const { data } = useBalanceFetcher(
    (state: any) => state?.transaction?.getUsersTransaction,
    transactionSlices.GetUsersTransaction,
    {
      requiresToken: true,
    },
  );

  return {
    getTransaction: data,
  };
};
