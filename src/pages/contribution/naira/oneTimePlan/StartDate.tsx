import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Alert } from "@mui/material";
import {
  useUserProfile,
  useWallet,
} from "../../../../shared/Hooks/useUserProfile";
import {
  addDays,
  formatDate,
  addMonths,
  calculateAvailableEndDates,
  getDateDifference,
  validateCustomEndDate,
} from "../../../../shared/utils/format";
import { AppDispatch } from "../../../../shared/redux/store";
import { useAppDispatch } from "../../../../shared/redux/reduxHooks";
import {
  CreateContributionPlan,
  GetWalletCard,
  PayContributionPaystack,
} from "../../../../shared/redux/slices/transaction.slices";
import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import { Button } from "@material-tailwind/react";
import PaymentWithCard from "../../../../components/dashboard/contribution/paymentChoice/PaymentWithCard";
import PayWithPaystack from "../../../../components/dashboard/contribution/paymentChoice/PayWithPaystack";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import prevFormIcon from "../../../../Assets/svg/dashboard/ajo/prev_form.svg";

interface ContributionResponse {
  result: {
    contributionId: string;
    withdrawalDate: string;
  };
}

const StartDate: React.FC = () => {
  const { walletCard } = useWallet();
  const { profileDetails } = useUserProfile();
  const today = formatDate(new Date());
  const startDate = today;
  const [endDate, setEndDate] = useState("");
  const [availableEndDates, setAvailableEndDates] = useState<string[]>([]);
  const [customEndDate, setCustomEndDate] = useState("");
  const [useCustomDate, setUseCustomDate] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contributionData, setContributionData] = useState<
    ContributionResponse["result"] | null
  >(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useAppDispatch();

  const { purpose, amount, currency, savingsType, contributionType } =
    location.state || {};

  const MAX_YEARS = 2;

  const hasCards = (walletCard?.cards ?? []).length > 0;

  useEffect(() => {
    dispatch(GetWalletCard());
  }, [dispatch]);

  useEffect(() => {
    const dateType =
      savingsType?.toLowerCase() === "daily" ? "daily" : "monthly";
    const dates = calculateAvailableEndDates(startDate, dateType);
    setAvailableEndDates(dates);
    setEndDate("");
    setCustomEndDate("");
    setUseCustomDate(false);
  }, [startDate, savingsType]);

  const handleEndDateChange = (event: any) => {
    const value = event.target.value;
    if (value === "custom") {
      setUseCustomDate(true);
      setEndDate("");
    } else {
      setUseCustomDate(false);
      setEndDate(value);
      setCustomEndDate("");
    }
    setError("");
  };

  const handleCustomEndDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setCustomEndDate(value);
    const dateType =
      savingsType?.toLowerCase() === "daily" ? "daily" : "monthly";
    const validation = validateCustomEndDate(startDate, value, {
      type: dateType,
    });
    if (validation.isValid) {
      setError("");
    } else {
      setError(validation.error || "");
    }
  };

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

    const dateType =
      savingsType?.toLowerCase() === "daily" ? "daily" : "monthly";
    const validation = validateCustomEndDate(startDate, finalEndDate, {
      type: dateType,
    });
    if (!validation.isValid) {
      setError(validation.error || "");
      return;
    }

    setLoading(true);
    setError("");

    const body = {
      savingsCategory: purpose,
      amount,
      startDate: today,
      endDate: finalEndDate,
      currency: currency,
      contributionType: contributionType,
      savingsType: savingsType,
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
    if (!contributionData?.contributionId) {
      setError("Invalid contribution data");
      return;
    }

    setIsProcessingPayment(true);
    setError("");

    try {
      const paymentResponse = await dispatch(
        PayContributionPaystack({
          contributionId: contributionData.contributionId,
          userId: profileDetails?._id || "",
          paymentType: "paystack",
        }),
      ).unwrap();

      if (paymentResponse?.payment?.info?.data?.authorization_url) {
        handleModalClose();
        window.location.href =
          paymentResponse?.payment.info.data.authorization_url;
      } else {
        throw new Error("Missing payment authorization URL");
      }
    } catch (error: any) {
      let errorMessage = "An error occurred during payment. Please try again.";

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      setError(errorMessage);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const formattedStartDate = new Date(today).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="pb-[1.5em]">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Contribution Plan
      </DashboardHeader>

      <div>
        <header className="mt-[1em] flex flex-col justify-center text-center lg:mt-[3em]">
          <h1 className="text-center text-2xl font-bold">
            One-Time Contribution
          </h1>
          <p className="mt-[1em] text-center font-medium">
            You are about to save NGN{amount} one-time into your contribution
            amount
          </p>
        </header>

        <div className="mt-6 lg:mt-[2em]">
          <label className="mb-3 flex font-semibold">Start Date (Today)</label>
          <p className="input mb-5 flex h-[4em] w-full items-center rounded-lg border-[1px] bg-gray-100 px-4 text-sm shadow-md">
            {formattedStartDate}
          </p>
        </div>

        <div className="mt-[2em]">
          <FormControl fullWidth>
            <InputLabel id="end-date-label" style={{ color: "#440080" }}>
              Choose End Date
            </InputLabel>
            <Select
              labelId="end-date-label"
              id="end-date-select"
              value={useCustomDate ? "custom" : endDate}
              label="Choose End Date"
              onChange={handleEndDateChange}
              className="mb-5"
              sx={{
                height: "3.4em",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "0.5rem",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#440080",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#440080",
                },
              }}
            >
              <MenuItem value="">
                <em>Select end date</em>
              </MenuItem>
              {availableEndDates.map((date) => (
                <MenuItem key={date} value={date}>
                  {new Date(date)?.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  ({getDateDifference(startDate, date, "monthly")})
                </MenuItem>
              ))}
              <MenuItem value="custom">
                <em>Set custom end date</em>
              </MenuItem>
            </Select>
          </FormControl>

          {useCustomDate && (
            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium">
                Custom End Date
              </label>
              <input
                type="date"
                value={customEndDate}
                onChange={handleCustomEndDateChange}
                min={formatDate(addDays(new Date(startDate), 1))}
                max={formatDate(addMonths(new Date(startDate), MAX_YEARS * 12))}
                className="input mb-2 h-[4em] w-full rounded-lg border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
              />
              {customEndDate && (
                <p className="text-sm text-gray-600">
                  Duration:{" "}
                  {getDateDifference(
                    startDate,
                    customEndDate,
                    savingsType?.toLowerCase() === "daily"
                      ? "daily"
                      : "monthly",
                  )}
                </p>
              )}
            </div>
          )}
        </div>

        {error && (
          <Alert severity="error" className="mb-4 mt-4">
            {error}
          </Alert>
        )}

        <div className="mt-4 lg:mt-[3em]">
          <Button
            onClick={handleSubmit}
            disabled={loading || (!endDate && !customEndDate)}
            loading={loading}
            className="m-auto flex w-[80%] justify-center rounded-md bg-text2 px-8 py-[1em] text-sm font-semibold normal-case text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-opacity-90 hover:shadow-lg active:scale-95 active:transform"
          >
            {loading ? "Please Wait..." : "Submit"}
          </Button>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-[3em] flex items-center transition-transform duration-300 hover:scale-110"
        >
          <img src={prevFormIcon} alt="Previous form" className="w-[40px]" />
        </button>
      </div>

      {hasCards ? (
        contributionData && (
          <PaymentWithCard
            contributionData={contributionData}
            onClose={handleModalClose}
            isOpen={isModalOpen}
          />
        )
      ) : (
        <PayWithPaystack
          onSelect={handleDirectPayment}
          isProcessing={isProcessingPayment}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </main>
  );
};

export default StartDate;
