import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import { DashboardHeader } from "../../../common/DashboardHeader";
import {
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Modal from "../../../common/Modal";
import { Primary } from "../../../common/Button";
import ReactLoading from "react-loading";
import {
  CreateContributionPlan,
  GetWalletBalance,
  PayContribution,
} from "../../../../shared/redux/slices/transaction.slices";
import { AppDispatch } from "../../../../shared/redux/store";
import { useDispatch, useSelector } from "react-redux";
import PaymentChoice from "../paymentChoice.tsx/PaymentChoice";
import { useAppDispatch } from "../../../../shared/redux/reduxHooks";
import PayWithPaystack from "../paymentChoice.tsx/PayWithPaystack";
import { Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface ContributionResponse {
  result: {
    contributionId: string;
    withdrawalDate: string;
  };
}

type VerificationStatus = "idle" | "verifying" | "success" | "error";

interface StatusConfig {
  icon: React.ReactNode;
  title: string;
  message: string;
  color: string;
}

const statusConfig: Record<VerificationStatus, StatusConfig> = {
  idle: {
    icon: <AlertCircle className="h-12 w-12 text-gray-400" />,
    title: "Initializing Verification",
    message: "Please wait...",
    color: "text-gray-600",
  },
  verifying: {
    icon: <Loader2 className="h-12 w-12 animate-spin text-blue-500" />,
    title: "Verifying Transaction",
    message: "Please wait while we verify your payment...",
    color: "text-blue-600",
  },
  success: {
    icon: <CheckCircle2 className="h-12 w-12 text-green-500" />,
    title: "Verification Successful",
    message: "Your payment has been verified. Redirecting...",
    color: "text-green-600",
  },
  error: {
    icon: <XCircle className="h-12 w-12 text-red-500" />,
    title: "Verification Failed",
    message: "An error occurred during verification.",
    color: "text-red-600",
  },
};

const StartDate: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [availableEndDates, setAvailableEndDates] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contributionData, setContributionData] = useState<
    ContributionResponse["result"] | null
  >(null);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "verifying" | "success" | "error"
  >("idle");
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetWalletBalance());
  }, [dispatch]);

  const walletData = useSelector(
    (state: any) => state?.transaction?.getWalletBalance,
  );
  const hasCards = walletData?.allCards?.length > 0;

  const navigate = useNavigate();
  const location = useLocation();

  const { purpose, plan, amount } = location.state || {};

  const formatDate = (date: Date): string => {
    return date.toISOString()?.split("T")[0];
  };

  const calculateAvailableEndDates = (startDateStr: string) => {
    if (!startDateStr) return [];

    const dates: string[] = [];
    const startDate = new Date(startDateStr);

    for (let i = 1; i <= 12; i++) {
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + i);

      if (startDate?.getDate() !== endDate?.getDate()) {
        endDate?.setDate(0);
      }

      dates.push(formatDate(endDate));
    }

    return dates;
  };

  useEffect(() => {
    const today = formatDate(new Date());
    document.getElementById("startDate")?.setAttribute("min", today);
  }, []);

  useEffect(() => {
    if (startDate) {
      const dates = calculateAvailableEndDates(startDate);
      setAvailableEndDates(dates);
      setEndDate("");
    }
  }, [startDate]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
  };

  const handleEndDateChange = (event: any) => {
    setEndDate(event.target.value as string);
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      setLoading(false);
      return;
    }

    if (!availableEndDates.includes(endDate)) {
      setError("Please select a valid monthly interval from the start date");
      setLoading(false);
      return;
    }

    const body = {
      savingsCategory: purpose,
      contributionPlan: plan,
      amount,
      startDate,
      endDate,
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
      setError(error?.error || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDirectPayment = async (paymentType: "paystack") => {
    setIsProcessing(true);
    setVerificationStatus("verifying");

    try {
      const paymentResponse = await dispatch(
        PayContribution({
          contributionId: contributionData?.contributionId,
          paymentType,
        }),
      ).unwrap();

      if (paymentResponse?.landing?.payment?.info?.data) {
        window.location.href =
          paymentResponse.landing.payment.info.data.authorization_url;
      } else {
        setVerificationStatus("error");
      }
    } catch (error) {
      setVerificationStatus("error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="pb-[1.5em] font-sans">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Contribution Plan
      </DashboardHeader>
      <div className="m-auto w-[90%]">
        <header className="mt-[1.5em] flex flex-col justify-center text-center lg:mt-[3em]">
          <h1 className="text-center text-xl font-bold">{plan} Contribution</h1>
          <p className="mt-[1em] text-center font-medium">
            You are about to save NGN{amount} {plan} into your contribution
            amount
          </p>
        </header>
        <div className="mt-[2em]">
          <label htmlFor="startDate" className="mb-3 flex font-semibold">
            Choose Start Date
          </label>
          <input
            type="date"
            id="startDate"
            required
            value={startDate}
            onChange={handleStartDateChange}
            className="input mb-5 h-[4em] w-full rounded-lg border-[1px] px-4 text-sm shadow-md"
          />
        </div>
        <div className="mt-[2em]">
          <FormControl fullWidth>
            <InputLabel id="end-date-label" style={{ color: "#440080" }}>
              Choose End Date
            </InputLabel>
            <Select
              labelId="end-date-label"
              id="end-date-select"
              value={endDate}
              label="Choose End Date"
              onChange={handleEndDateChange}
              disabled={!startDate}
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
              {availableEndDates.map((date, index) => (
                <MenuItem key={date} value={date}>
                  {new Date(date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  ({index + 1} {index === 0 ? "month" : "months"})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {error && (
          <Alert severity="error" className="mb-4 mt-4">
            {error}
          </Alert>
        )}
        <div className="mt-[3em]">
          <Primary
            onClick={handleSubmit}
            disabled={loading}
            className="m-auto flex w-[80%] justify-center rounded-md bg-text2 px-8 py-[1em] text-center font-semibold text-white"
          >
            {loading ? (
              <ReactLoading
                color="#FFFFFF"
                height={25}
                width={25}
                type="spin"
              />
            ) : (
              "Submit"
            )}
          </Primary>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-[3em] flex items-center"
        >
          <IoIosArrowDropleft size={25} />
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="flex flex-col bg-[#ECE6F2] py-[2em]"
      >
        {hasCards ? (
          <PaymentChoice contributionData={contributionData} />
        ) : (
          <PayWithPaystack
            onSelect={handleDirectPayment}
            isProcessing={isProcessing}
          />
        )}
      </Modal>
      <Modal
        isOpen={verificationStatus !== "idle"}
        onClose={() => !isProcessing && setVerificationStatus("idle")}
        className="bg-white"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          {statusConfig[verificationStatus].icon}
          <h3
            className={`text-lg font-semibold ${statusConfig[verificationStatus]?.color}`}
          >
            {statusConfig[verificationStatus]?.title}
          </h3>
          <p className="text-sm text-gray-500">
            {statusConfig[verificationStatus]?.message}
          </p>
        </div>
      </Modal>
    </main>
  );
};

export default StartDate;
