import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router";
import arrow from "../../../../Assets/svg/dashboard/wallet/transfer-arrow.svg";
import log from "../../../../Assets/svg/dashboard/contribution/log.svg";
import { Alert } from "@mui/material";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { formatBalance } from "../../../../shared/utils/format";
import { Primary } from "../../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { GetContributionDetailsById } from "../../../../shared/redux/slices/transaction.slices";
import { AppDispatch } from "../../../../shared/redux/store";
import useWalletBalance from "../../../../shared/Hooks/useBalance";

const WithdrawContribution = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const [displayAmount, setDisplayAmount] = useState("");
  const [actualAmount, setActualAmount] = useState("");
  const [error, setError] = useState("");

  const { contributionDetails } = useSelector(
    (state: any) => state?.transaction,
  );
  const { formattedBalance } = useWalletBalance();

  useEffect(() => {
    if (!location.state?.contributionId) {
      navigate("/dashboard/contribution");
      return;
    }

    dispatch(
      GetContributionDetailsById({
        contributionId: location?.state?.contributionId,
      }),
    );
  }, [location.state, navigate, dispatch]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const formatNumberWithCommas = (value: string) => {
    const cleanValue = value?.replace(/[^\d.]/g, "");

    const parts = cleanValue.split(".");
    const wholePart = parts[0];
    const decimalPart = parts[1] || "";

    const formattedWholePart = wholePart?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return decimalPart
      ? `${formattedWholePart}?.${decimalPart?.slice(0, 2)}`
      : formattedWholePart;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const numericValue = inputValue?.replace(/[^\d.]/g, "");

    const parts = numericValue?.split(".");
    let cleanValue = parts[0];
    if (parts?.length > 1) {
      cleanValue += "." + parts[1]?.slice(0, 2);
    }

    setActualAmount(cleanValue);
    setDisplayAmount(formatNumberWithCommas(cleanValue));
    setError("");
  };

  const confirmAmount = () => {
    const amountInNaira = parseFloat(actualAmount);
    const contributionBalance = contributionDetails?.balance || 0;

    if (isNaN(amountInNaira) || amountInNaira <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (amountInNaira > contributionBalance) {
      setError(
        `Insufficient balance. Your contribution balance is ${formatBalance(contributionBalance)}`,
      );
      return;
    }

    navigate("/dashboard/contribution/withdraw_contribution/confirm-amount", {
      state: {
        amountInNaira,
        contributionId: location.state.contributionId,
        contributionPlan: contributionDetails?.contributionPlan,
      },
    });
  };

  if (!contributionDetails) {
    return null;
  }

  return (
    <main className="font-sans">
      <DashboardHeader
        className="relative cursor-pointer items-center lg:mt-[2em]"
        onClick={handleBackClick}
      >
        <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />
        <div className="flex flex-grow items-center justify-center">
          <div className="tracking-wide">
            Withdraw fund to Chain Co-op wallet
          </div>
        </div>
      </DashboardHeader>
      <section className="px-3">
        <div className="mt-6 flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-medium">Contribution Balance</p>
            <span className="text-gray-400">
              {formatBalance(contributionDetails?.balance || 0)}
            </span>
          </div>
          <img
            src={arrow}
            alt="transfer-arrow"
            className="h-6 w-6 md:h-auto md:w-auto"
          />
          <div className="flex flex-col gap-2">
            <p className="font-medium">Chain Coop Wallet</p>
            <span className="text-gray-400">{formattedBalance}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <hr className="w-full" />
          <div className="flex items-center justify-between">
            <p className="font-semibold">Amount to Withdraw</p>
            <span className="text-normal relative text-base">
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 pl-6 focus:border-text2 focus:outline-none focus:ring-text2 md:w-auto"
                placeholder="0.00"
                value={displayAmount}
                onChange={handleAmountChange}
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 transform">
                ₦
              </span>
            </span>
          </div>
          <hr className="w-full" />
        </div>

        <div className="mt-2 flex justify-between font-medium">
          <div className="flex gap-3">
            <img src={log} alt="log" />
            <p>Contribution</p>
          </div>
          <p>Monthly</p>
        </div>

        {error && (
          <Alert severity="error" className="mt-4">
            {error}
          </Alert>
        )}

        <Primary
          onClick={confirmAmount}
          className={`mt-[2em] w-full py-3 text-white ${
            displayAmount ? "bg-text2" : "cursor-not-allowed bg-gray-400"
          }`}
          disabled={!displayAmount}
        >
          Continue
        </Primary>
      </section>
    </main>
  );
};

export default WithdrawContribution;
