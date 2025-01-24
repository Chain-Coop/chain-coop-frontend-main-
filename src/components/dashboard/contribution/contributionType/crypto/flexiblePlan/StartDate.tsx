import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import { Alert } from "@mui/material";
import Modal from "../../../../../common/Modal";
import { Primary } from "../../../../../common/Button";
import ReactLoading from "react-loading";
import {
  CreateContributionPlan,
  GetWalletCard,
  PayContribution,
} from "../../../../../../shared/redux/slices/transaction.slices";
import { useAppDispatch } from "../../../../../../shared/redux/reduxHooks";
import PaymentWithCard from "../../../paymentChoice.tsx/PaymentWithCard";
import PayWithPaystack from "../../../paymentChoice.tsx/PayWithPaystack";
import { useUserCard } from "../../../../../../shared/Hooks/useUserProfile";
import { AppDispatch } from "../../../../../../shared/redux/store";
import { DashboardHeader } from "../../../../../common/DashboardHeader";
import cryptoSavings from "../../../../../../Assets/png/dashboard/cryptSavings.png";

interface ContributionResponse {
  result: {
    contributionId: string;
    withdrawalDate: string;
  };
}

const StartDate: React.FC = () => {
  const { useWalletCards } = useUserCard();
  const today = formatDate(new Date());
  const startDate = today;
  const [endDate, setEndDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contributionData, setContributionData] = useState<
    ContributionResponse["result"] | null
  >(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [useCustomDate, setUseCustomDate] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useAppDispatch();

  const { purpose, plan, amount, currency } = location.state || {};
  const isDaily = plan?.toLowerCase() === "daily";
  const isMonthly = plan?.toLowerCase() === "monthly";

  const MIN_DAILY_DAYS = 7;
  const MAX_YEARS = 2;
  const PRESET_DAILY_INTERVALS = [7, 14, 30, 60, 90, 180, 365, 730];
  const PRESET_MONTHLY_INTERVALS = Array.from({ length: 24 }, (_, i) => i + 1);

  useEffect(() => {
    dispatch(GetWalletCard());
  }, [dispatch]);

  const hasCards = (useWalletCards?.cards ?? []).length > 0;
  function formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  function addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  }

  function addMonths(date: Date, months: number): Date {
    const newDate = new Date(date);
    const targetMonth = newDate.getMonth() + months;
    const year = newDate.getFullYear() + Math.floor(targetMonth / 12);
    const month = targetMonth % 12;

    newDate.setDate(1);
    newDate.setFullYear(year);
    newDate.setMonth(month);

    const originalDay = date.getDate();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    newDate.setDate(Math.min(originalDay, lastDayOfMonth));

    return newDate;
  }

  const calculateAvailableEndDates = (startDateStr: string) => {
    if (!startDateStr) return [];

    const dates: string[] = [];
    const startDate = new Date(startDateStr);

    if (isDaily) {
      PRESET_DAILY_INTERVALS.forEach((days) => {
        dates.push(formatDate(addDays(startDate, days)));
      });
    } else if (isMonthly) {
      PRESET_MONTHLY_INTERVALS.forEach((months) => {
        const endDate = addMonths(startDate, months);
        dates.push(formatDate(endDate));
      });
    }

    return dates;
  };

  const validateCustomEndDate = (customDate: string): boolean => {
    if (!customDate) return false;

    const start = new Date(startDate);
    const end = new Date(customDate);

    if (end <= start) {
      setError("End date must be after start date");
      return false;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (isDaily && diffDays < MIN_DAILY_DAYS) {
      setError(`Minimum duration is ${MIN_DAILY_DAYS} days`);
      return false;
    }

    const maxDate = addMonths(start, MAX_YEARS * 12);
    if (end > maxDate) {
      setError(`Maximum duration is ${MAX_YEARS} years`);
      return false;
    }

    return true;
  };

  useEffect(() => {
    setEndDate("");
    setCustomEndDate("");
    setUseCustomDate(false);
  }, [startDate]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsProcessingPayment(false);
    setError("");
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    const finalEndDate = useCustomDate ? customEndDate : endDate;

    if (!finalEndDate) {
      setError("Please select or enter an end date.");
      return;
    }

    if (useCustomDate && !validateCustomEndDate(customEndDate)) {
      return;
    }

    setLoading(true);
    setError("");

    const body = {
      savingsCategory: purpose,
      contributionPlan: plan,
      amount,
      startDate,
      endDate: finalEndDate,
      currency: currency,
    };

    try {
      const response = await dispatch(CreateContributionPlan(body)).unwrap();
      if (response?.result) {
        setContributionData(response.result);
        setIsModalOpen(true);
      } else {
        setError("Contribution plan creation failed. Please try again.");
      }
    } catch (error: any) {
      setError(error?.msg || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDirectPayment = async (paymentType: "paystack") => {
    setIsProcessingPayment(true);

    try {
      const paymentResponse = await dispatch(
        PayContribution({
          contributionId: contributionData?.contributionId,
          paymentType,
        }),
      ).unwrap();

      if (paymentResponse?.landing?.payment?.info?.data) {
        handleModalClose();
        window.location.href =
          paymentResponse.landing.payment.info.data.authorization_url;
      } else {
        setError("Unable to process payment. Please try again.");
      }
    } catch (error: any) {
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.error || "Payment verification failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const formattedStartDate = new Date(startDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="pb-[1.5em] font-sans">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Flexible Savings
      </DashboardHeader>
      <div className="m-auto w-[90%]">
        <header className="mt-[1.5em] flex flex-col lg:mt-[3em]">
          <h1 className="text-2xl font-bold">Flexible Savings</h1>
          <p className="mt-[1em] font-medium">
            You are about to save in ** crypto currency
          </p>
        </header>
        <section className="mt-[2.5em] flex justify-center">
          <div>
            <img src={cryptoSavings} alt="savings-img" />
          </div>
        </section>
        <section className="mt-[2em]">
          <div>
            <h2 className="text-lg font-bold text-memt1">
              Select Saving Frequency
            </h2>
          </div>
          <div className="mt-[1.5em] grid w-[80%] grid-cols-1 gap-4 md:grid-cols-2">
            <button className="flex w-[9em] transform items-center rounded-md bg-[#ECE6F2] px-6 font-semibold uppercase text-memt1 transition-all duration-300 hover:scale-105 active:scale-95 lg:py-2">
              Daily
            </button>

            <button className="flex w-[9em] transform items-center rounded-md bg-[#ECE6F2] px-6 font-semibold uppercase text-memt1 transition-all duration-300 hover:scale-105 active:scale-95 lg:py-2">
              Monthly
            </button>

            <button className="flex w-[9em] transform items-center rounded-md bg-[#ECE6F2] px-6 font-semibold uppercase text-memt1 transition-all duration-300 hover:scale-105 active:scale-95 lg:py-2">
              <span>Weekly</span>
            </button>

            <button className="flex w-[9em] transform items-center rounded-md bg-[#ECE6F2] px-6 font-semibold uppercase text-memt1 transition-all duration-300 hover:scale-105 active:scale-95 lg:py-2">
              <span>Manually</span>
            </button>
          </div>
        </section>
        <div>
          <div className="mt-[2.5em]">
            <label className="mb-3 flex font-semibold">
              Start Date (Today)
            </label>
            <p className="input mb-5 flex h-[4em] w-full items-center rounded-lg border-[1px] bg-gray-100 px-4 text-sm shadow-md">
              {formattedStartDate}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="endDate"
              className="flex text-lg font-semibold text-memt1"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              required
              className="input mb-5 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="duration"
              className="flex text-lg font-semibold text-memt1"
            >
              Savings Duration
            </label>
            <input
              type="date"
              id="savingsDuration"
              required
              className="input mb-5 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="targetAmount"
              className="flex text-lg font-semibold text-memt1"
            >
              Target Amount
            </label>
            <input
              type="number"
              id="targetAmount"
              required
              placeholder="lk"
              className="input mb-5 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>
        </div>
        {error && (
          <Alert severity="error" className="mb-4 mt-4">
            {error}
          </Alert>
        )}
        <div className="mt-[3em]">
          <Primary
            onClick={handleSubmit}
            disabled={loading || (!endDate && !customEndDate)}
            className="m-auto flex w-[80%] justify-center rounded-md bg-text2
              px-8 py-[1em] font-semibold
              text-white transition-all duration-300
              ease-in-out hover:scale-105 hover:bg-opacity-90 hover:shadow-lg active:scale-95 active:transform"
          >
            {loading ? (
              <div className="flex gap-1">
                <ReactLoading
                  color="#FFFFFF"
                  height={25}
                  width={25}
                  type="spin"
                />
                <p>please wait...</p>
              </div>
            ) : (
              "Submit"
            )}
          </Primary>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-[3em] flex items-center transition-transform duration-300 hover:scale-110"
        >
          <IoIosArrowDropleft size={25} />
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        className="flex flex-col bg-[#ECE6F2] py-[2em]"
      >
        {hasCards ? (
          <PaymentWithCard
            contributionData={contributionData}
            onClose={handleModalClose}
          />
        ) : (
          <PayWithPaystack
            onSelect={handleDirectPayment}
            isProcessing={isProcessingPayment}
          />
        )}
      </Modal>
    </main>
  );
};

export default StartDate;
