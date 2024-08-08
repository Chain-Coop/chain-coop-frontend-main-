import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetWalletBalance } from "../redux/slices/transaction.slices";
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

export default useBalance;
