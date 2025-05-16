import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useLocation } from "react-router";
import { formatBalance } from "../utils/format";
import { setMessage } from "../redux/slices/message.slices";
import * as transactionSlices from "../redux/slices/transaction.slices";
import * as Web3Slices from "../redux/slices/web3.slices";
import { CryptoTransaction } from "../types/types";
import { parseISO, isAfter, isToday } from "date-fns";

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

export const useCryptoWallet = (network: string = "ETHERLINK") => {
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
    (state: any) => state.web3,
    Web3Slices.GetTotalCryptoWalletBalance,
    {
      refreshInterval: 30000,
      params: network,
    },
  );
  useEffect(() => {
    //console.log('Web3 State:', cryptoState);
  }, [cryptoState]);

  const Balance =
    cryptoState?.walletMessage === "No Wallet found"
      ? "----"
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
  const data = useSelector(selector, shallowEqual);

  const fetch = useCallback(() => {
    dispatch(fetchAction());
  }, [dispatch, fetchAction]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, fetch };
};

export const useCryptoWalletDetails = () => {
  const { data, fetch } = useDataFetcher(
    (state: any) => state.web3.cryptoWalletDetails,
    Web3Slices.GetCryptoWalletDetails,
  );
  return { cryptoWalletDetails: data, fetchCryptoWalletDetails: fetch };
};

export const useAllUserPools = () => {
  const { data, fetch } = useDataFetcher(
    (state: any) => state.web3.userPools,
    Web3Slices.GetAllUserPools,
  );
  const loading = useSelector((state: any) => state.web3.userPoolsLoading);
  const error = useSelector((state: any) => state.web3.userPoolsError);

  return { userPools: data, loading, error, fetchUserPools: fetch };
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

export const useAllUserTokens = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allNetworkTokens, allNetworkTokensLoading, allNetworkTokensError } =
    useSelector(
      (state: any) => ({
        allNetworkTokens: state.web3.allNetworkTokens,
        allNetworkTokensLoading: state.web3.allNetworkTokensLoading,
        allNetworkTokensError: state.web3.allNetworkTokensError,
      }),
      shallowEqual,
    );

  const fetchUserTokens = useCallback(() => {
    // Fetches tokens from ALL supported networks
    dispatch(Web3Slices.FetchAllTokensFromSupportedNetworks());
  }, [dispatch]);

  // useEffect(() => {
  //   // Decide if you want to auto-fetch on hook mount or let the component decide
  //   // fetchUserTokens();
  // }, [fetchUserTokens]);

  return {
    userTokens: allNetworkTokens || [],
    loading: allNetworkTokensLoading,
    error: allNetworkTokensError,
    fetchUserTokens,
  };
};

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

export const useCryptoTransactionHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cryptoHistory, cryptoHistoryLoading, cryptoHistoryError } =
    useSelector(
      (state: any) => ({
        cryptoHistory: state.web3.cryptoHistory,
        cryptoHistoryLoading: state.web3.cryptoHistoryLoading,
        cryptoHistoryError: state.web3.cryptoHistoryError,
      }),
      shallowEqual,
    );

  const fetchHistory = useCallback(() => {
    dispatch(Web3Slices.GetCryptoTransactionHistory());
  }, [dispatch]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    transactions: cryptoHistory as CryptoTransaction[] | null,
    loading: cryptoHistoryLoading,
    error: cryptoHistoryError,
    fetchHistory,
  };
};

export const useCashwyreHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cashwyreHistory, cashwyreHistoryLoading, cashwyreHistoryError } =
    useSelector(
      (state: any) => ({
        cashwyreHistory: state.web3.cashwyreHistory,
        cashwyreHistoryLoading: state.web3.cashwyreHistoryLoading,
        cashwyreHistoryError: state.web3.cashwyreHistoryError,
      }),
      shallowEqual,
    );

  const fetchHistory = useCallback(() => {
    dispatch(Web3Slices.GetCashwyreHistory());
  }, [dispatch]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    transactions: cashwyreHistory as CryptoTransaction[] | null,
    loading: cashwyreHistoryLoading,
    error: cashwyreHistoryError,
    fetchHistory,
  };
};

export const useTotalContributionBalanceCrypto = (refreshInterval?: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isVisible, setIsVisible } = useVisibilityState(
    "contributionBalanceVisible",
    true,
  );

  const { balance, loading, error } = useSelector(
    (state: any) => ({
      balance: state.web3.totalContributionBalanceCrypto,
      loading: state.web3.totalContributionBalanceLoading,
      error: state.web3.totalContributionBalanceError,
    }),
    shallowEqual,
  );

  const fetchBalance = useCallback(() => {
    dispatch(Web3Slices.GetTotalContributionBalanceCrypto());
  }, [dispatch]);

  useEffect(() => {
    fetchBalance();

    if (refreshInterval) {
      const intervalId = setInterval(fetchBalance, refreshInterval);
      return () => clearInterval(intervalId);
    }
  }, [fetchBalance, refreshInterval]);

  const formattedBalance =
    balance !== null
      ? Number(balance).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "---";

  return {
    isContributionVisible: isVisible,
    setIsContributionVisible: setIsVisible,
    balance: balance,
    formattedBalance: formattedBalance,
    loading: loading,
    error: error,
    fetchBalance: fetchBalance,
  };
};

export const isBeforeWithdrawalDate = (
  withdrawalDate: string | null,
): boolean => {
  if (!withdrawalDate) return false;
  try {
    const parsedWithdrawalDate = parseISO(withdrawalDate);
    const today = new Date();
    return (
      isAfter(parsedWithdrawalDate, today) && !isToday(parsedWithdrawalDate)
    );
  } catch (e) {
    return false;
  }
};

export const calculateFees = (
  savingsType: string,
  withdrawalDate: string | null,
  amount: number,
  membershipStatus: string,
): number => {
  let fees = 50;

  if (membershipStatus === "inactive") {
    fees += 1000;
  }

  if (savingsType === "Lock" && isBeforeWithdrawalDate(withdrawalDate)) {
    fees += amount * 0.03;
  }

  return fees;
};

export const useWithdrawalValidation = ({
  savingsType,
  withdrawalDate,
  withdrawalAmount,
  balance,
  membershipStatus,
}: {
  savingsType: string;
  withdrawalDate: string | null;
  withdrawalAmount: number;
  balance: number;
  membershipStatus: string;
}) => {
  const isStrictLockBlocked =
    savingsType === "StrictLock" && isBeforeWithdrawalDate(withdrawalDate);

  if (isStrictLockBlocked) {
    return {
      isValid: false,
      error: "Strict Lock savings can only be withdrawn on the maturity date.",
      totalFees: 0,
      netAmount: 0,
      shortfall: 0,
      isStrictLockBlocked: true,
    };
  }

  const totalFees = calculateFees(
    savingsType,
    withdrawalDate,
    withdrawalAmount,
    membershipStatus,
  );
  const netAmount = withdrawalAmount - totalFees;
  const totalRequired = withdrawalAmount; // Total deduction is the requested amount
  const shortfall = totalRequired > balance ? totalRequired - balance : 0;

  return {
    isValid: netAmount > 0 && shortfall === 0,
    error:
      shortfall > 0
        ? `Insufficient balance. You need ₦${shortfall.toLocaleString()} more.`
        : netAmount <= 0
          ? `Fees (₦${totalFees.toLocaleString()}) exceed the requested amount. Please increase the withdrawal amount.`
          : null,
    totalFees,
    netAmount,
    shortfall,
    isStrictLockBlocked: false,
  };
};

export const useTotalBalance = (network: string = "ETHERLINK") => {
  const dispatch = useDispatch<AppDispatch>();
  const { totalBalanceData, isLoading, errorData } = useSelector(
    (state: any) => ({
      totalBalanceData: state.web3.totalBalance,
      isLoading: state.web3.loading,
      errorData: state.web3.error,
    }),
    shallowEqual,
  );

  const fetchTotalBalance = useCallback(() => {
    dispatch(Web3Slices.GetTotalBalance(network))
      .unwrap()
      .catch((err: any) => {
        console.error("Failed to fetch total balance:", err);
      });
  }, [dispatch, network]);

  return {
    totalBalance: totalBalanceData,
    loading: isLoading,
    error: errorData,
    fetchTotalBalance,
  };
};
