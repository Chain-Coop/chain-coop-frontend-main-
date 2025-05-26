import { useEffect, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AppDispatch } from "../redux/store";
import { GetSavingCircleHistory } from "../redux/slices/web_savings_groups.slices";
import {
  InitializeSavingCirclePayment,
  MakeSavingCirclePayment,
  VerifySavingCirclePayment,
} from "../redux/slices/web_savings_groups.slices";

export const useGroupTransactionHistory = (circleId: string) => {
  const dispatch = useDispatch<AppDispatch>();

  const { history, loading, error } = useSelector(
    (state: any) => ({
      history: state.web_group_savings?.circleHistory || [],
      loading: state.web_group_savings?.historyLoading || false,
      error: state.web_group_savings?.historyError || null,
    }),
    shallowEqual,
  );

  const fetchHistory = useCallback(() => {
    if (circleId) {
      dispatch(GetSavingCircleHistory(circleId));
    }
  }, [dispatch, circleId]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    transactions: history,
    isLoading: loading,
    error,
    refetch: fetchHistory,
  };
};

export const useSavingCirclePayment = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    paymentInitialization,
    payment,
    paymentVerification,
    isLoading,
    error,
  } = useSelector(
    (state: any) => ({
      paymentInitialization: state.web_group_savings?.paymentInitialization,
      payment: state.web_group_savings?.payment,
      paymentVerification: state.web_group_savings?.paymentVerification,
      isLoading: state.web_group_savings?.paymentLoading || false,
      error: state.web_group_savings?.paymentError || null,
    }),
    shallowEqual,
  );

  const initializePayment = useCallback(
    (paymentData: {
      circleId: string;
      userId: string;
      depositAmount: number;
      paymentType: string;
      callbackUrl?: string;
    }) => {
      const defaultCallbackUrl = `${window.location.origin}/dashboard/payment-callback`;
      return dispatch(
        InitializeSavingCirclePayment({
          ...paymentData,
          callbackUrl: paymentData.callbackUrl || defaultCallbackUrl,
        }),
      ).unwrap();
    },
    [dispatch],
  );

  const makePayment = useCallback(
    (paymentData: {
      circleId: string;
      userId: string;
      paymentType: string;
    }) => {
      return dispatch(MakeSavingCirclePayment(paymentData)).unwrap();
    },
    [dispatch],
  );

  const verifyPayment = useCallback(
    (reference: string) => {
      return dispatch(VerifySavingCirclePayment(reference)).unwrap();
    },
    [dispatch],
  );

  return {
    paymentInitialization,
    payment,
    paymentVerification,
    isLoading,
    error,
    initializePayment,
    makePayment,
    verifyPayment,
  };
};
