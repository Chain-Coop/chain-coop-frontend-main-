import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router";
import log from "../../../../Assets/svg/dashboard/contribution/log.svg";
import { Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { parseISO, isAfter, isToday } from "date-fns";
import { AppDispatch } from "../../../../shared/redux/store";
import { useAppDispatch } from "../../../../shared/redux/reduxHooks";
import useWalletBalance from "../../../../shared/Hooks/useBalance";
import { GetContributionDetailsById } from "../../../../shared/redux/slices/transaction.slices";
import { formatBalance } from "../../../../shared/utils/format";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { Button, Typography } from "@material-tailwind/react";
import { ArrowIcon } from "../../../../Assets/svg";
import NoticeModal from "./modals/Notice";

const WithdrawContribution = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useAppDispatch();

  const [displayAmount, setDisplayAmount] = useState("");
  const [actualAmount, setActualAmount] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [withdrawalAmount, setWithdrawalAmount] = useState<number>(0);

  const { contributionDetails } = useSelector(
    (state: any) => state?.transaction,
  );
  console.log("connn", contributionDetails);
  const { formattedBalance } = useWalletBalance();

  useEffect(() => {
    const initializeComponent = async () => {
      if (!location.state?.contributionId) {
        navigate("/dashboard/contribution");
        return;
      }

      try {
        await dispatch(
          GetContributionDetailsById({
            contributionId: location?.state?.contributionId,
          }),
        ).unwrap();
      } catch (error) {
        setError("Failed to load contribution details");
      } finally {
        setIsLoading(false);
      }
    };

    initializeComponent();
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
      ? `${formattedWholePart}.${decimalPart.slice(0, 2)}`
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
    const withdrawalDate = contributionDetails?.withdrawalDate;

    if (isNaN(amountInNaira) || amountInNaira <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (amountInNaira > contributionBalance) {
      setError(
        `Insufficient balance. Your contribution balance is ${formatBalance(
          contributionBalance,
        )}`,
      );
      return;
    }

    if (withdrawalDate) {
      const parsedWithdrawalDate = parseISO(withdrawalDate);
      const today = new Date();

      if (
        isAfter(parsedWithdrawalDate, today) &&
        !isToday(parsedWithdrawalDate)
      ) {
        setIsModalOpen(true);
        return;
      }
    }

    navigateToConfirmation(amountInNaira);
  };

  const navigateToConfirmation = (amountInNaira: number) => {
    setWithdrawalAmount(amountInNaira);
    navigate("/dashboard/contribution/withdraw_contribution/confirm-amount", {
      state: {
        amountInNaira,
        contributionId: location.state.contributionId,
        contributionPlan: contributionDetails?.contributionPlan,
        savingsType: contributionDetails?.savingsType,
      },
    });
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigateToConfirmation(parseFloat(actualAmount));
  };

  const renderHeader = () => (
    <DashboardHeader
      className="relative cursor-pointer items-center lg:mt-[2em]"
      onClick={handleBackClick}
    >
      <IoIosArrowBack
        size={25}
        className="absolute left-0 hidden cursor-pointer lg:block"
      />
      <div className="flex flex-grow items-center justify-center">
        <div className="tracking-wide">Withdraw fund to Chain Co-op wallet</div>
      </div>
    </DashboardHeader>
  );

  if (isLoading) {
    return (
      <main className="font-sans">
        {renderHeader()}
        <div className="flex h-[50vh] items-center justify-center">
          <div className="animate-pulse text-gray-500">
            Loading contribution details...
          </div>
        </div>
      </main>
    );
  }

  if (error && !contributionDetails) {
    return (
      <main className="font-sans">
        {renderHeader()}
        <div className="mt-6 px-3">
          <Alert severity="error">{error}</Alert>
          <Button
            variant="text"
            onClick={handleBackClick}
            className="mt-4 w-full bg-text2 py-3 text-white"
          >
            Go Back
          </Button>
        </div>
      </main>
    );
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
    setWithdrawalAmount(0);
  };

  return (
    <main className="font-sans">
      {renderHeader()}

      <section className="px-3">
        <div className="mt-6 flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <Typography className="font-medium">
              Contribution Balance
            </Typography>
            <span className="text-gray-400">
              {formatBalance(contributionDetails?.balance || 0)}
            </span>
          </div>
          <ArrowIcon />
          <div className="flex flex-col gap-2">
            <Typography className="font-medium">Wallet Balance</Typography>
            <span className="text-gray-400">{formattedBalance}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <hr className="w-full" />
          <div className="flex items-center justify-between">
            <Typography className="font-semibold">
              Amount to Withdraw
            </Typography>
            <span className="text-normal relative text-base">
              <input
                type="tel"
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
            <Typography className="font-normal">Contribution</Typography>
          </div>
          <p>Monthly</p>
        </div>

        {error && (
          <Alert severity="error" className="mt-4">
            {error}
          </Alert>
        )}

        <Button
          variant="text"
          onClick={confirmAmount}
          className={` mt-[2em] w-full bg-text2 py-3 text-sm normal-case text-white hover:bg-text2 ${
            displayAmount ? "bg-text2" : "cursor-not-allowed"
          }`}
          disabled={!displayAmount}
        >
          Continue
        </Button>
      </section>
      <NoticeModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        withdrawalDate={contributionDetails?.withdrawalDate}
        savingsType={contributionDetails?.history[0]?.savingsType || "Flexible"}
        withdrawalAmount={Number(actualAmount)}
        balance={contributionDetails?.balance || 0}
      />
    </main>
  );
};

export default WithdrawContribution;
