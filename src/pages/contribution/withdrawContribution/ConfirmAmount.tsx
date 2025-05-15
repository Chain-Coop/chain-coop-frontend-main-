import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router";
import { Alert } from "@mui/material";
import { Button, Typography } from "@material-tailwind/react";
import { formatBalance } from "../../../shared/utils/format";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import Success from "../../../components/common/Success";
import { parseISO, isAfter, isToday } from "date-fns";
import PinModal from "../../../components/common/PinModal";
import ChangePin from "../../../components/dashboard/profile/security/modal/ChangePin";
import OtpPin from "../../../components/dashboard/profile/security/modal/OtpPin";
import GeneratePin from "../../../components/dashboard/profile/security/modal/GeneratePin";
import {
  WithdrawalFromContribution,
  GeneratePinOTP,
  GetWalletBalance,
} from "../../../shared/redux/slices/transaction.slices";
import { AppDispatch } from "../../../shared/redux/store";
import { useDispatch } from "react-redux";
import { useUserProfile } from "../../../shared/Hooks/useUserProfile";
import { GetUserProfile } from "../../../shared/redux/slices/landing.slices";

const ConfirmAmount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { profileDetails } = useUserProfile();

  const [pinStep, setPinStep] = useState(0);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [amountInNaira, setAmountInNaira] = useState<number | null>(null);
  const [contributionId, setContributionId] = useState<string | null>(null);
  const [savingsType, setSavingsType] = useState<string>("FLEXIBLE");
  const [withdrawalDate, setWithdrawalDate] = useState<string | null>(null);

  const isPinCreated = profileDetails?.isPinCreated || false;

  const isBeforeWithdrawalDate = () => {
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

  const calculateFees = () => {
    let fees = 50;

    if (profileDetails?.membershipStatus === "inactive") {
      fees += 1000;
    }

    const isLockSavings = savingsType === "Lock";

    if (isLockSavings && isBeforeWithdrawalDate() && amountInNaira) {
      fees += amountInNaira * 0.03;
    }

    return fees;
  };

  const totalFees = calculateFees();
  const netAmount = amountInNaira ? amountInNaira - totalFees : 0;
  const totalDeduction = amountInNaira || 0;

  useEffect(() => {
    if (!location.state) {
      setError("Missing required information. Please try again.");
      return;
    }

    const {
      amountInNaira: amount,
      contributionId: id,
      savingsType: type,
      withdrawalDate: wDate,
    } = location.state as {
      amountInNaira?: number;
      contributionId?: string;
      savingsType?: string;
      withdrawalDate?: string;
    };

    if (!amount || !id) {
      setError("Invalid amount or contribution ID. Please try again.");
      return;
    }

    setAmountInNaira(amount);
    setContributionId(id);
    setSavingsType(type || "FLEXIBLE");
    setWithdrawalDate(wDate || null);
  }, [location.state]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate("/contribution");
  };

  const handleGeneratePinClose = () => {
    setPinStep(0);
    setOtp("");
  };

  const handleOtpGenerated = async () => {
    setLoading(true);
    setError("");
    try {
      await dispatch(GeneratePinOTP()).unwrap();
      setPinStep(2);
    } catch (error: any) {
      setError(error.message || "Failed to generate OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpPinNext = (enteredOtp: string) => {
    setOtp(enteredOtp);
    setPinStep(isPinCreated ? 4 : 3);
  };

  const handleOtpPinClose = () => {
    setPinStep(0);
    setOtp("");
  };

  const handleChangePinClose = () => {
    setPinStep(0);
    setOtp("");
  };

  const handleChangePinSuccess = async () => {
    try {
      await dispatch(GetUserProfile()).unwrap();
      setPinStep(4);
    } catch (error: any) {
      setError("Failed to refresh profile. Please try again.");
    }
  };

  const handlePinSubmit = async (submittedPin: string) => {
    if (!amountInNaira || !contributionId) {
      setError("Missing required information. Please try again.");
      return;
    }

    if (netAmount <= 0) {
      setError(
        `Fees (₦${totalFees.toLocaleString()}) exceed the requested amount. Please increase the withdrawal amount.`,
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const pinNumber = parseInt(submittedPin, 10);
      if (isNaN(pinNumber)) {
        throw new Error("Invalid PIN. Please enter a valid number.");
      }

      const body = {
        amount: totalDeduction,
        contributionId: contributionId,
        pin: pinNumber,
      };

      const result = await dispatch(WithdrawalFromContribution(body)).unwrap();
      if (result?.statusCode === 200) {
        dispatch(GetWalletBalance());
        setPinStep(0);
        setIsSuccessModalOpen(true);
        setPin("");
        setOtp("");
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error: any) {
      setError(error.message || "Invalid PIN or OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmWithdrawal = async () => {
    if (profileDetails?.isPinCreated) {
      setPinStep(4);
    } else {
      setPinStep(1);
    }
  };

  if (error && (!amountInNaira || !contributionId)) {
    return (
      <main>
        <DashboardHeader
          className="relative cursor-pointer items-center lg:mt-[2em]"
          onClick={handleBackClick}
        >
          <IoIosArrowBack
            size={25}
            className="absolute left-0 cursor-pointer"
          />
          <div className="flex flex-grow items-center justify-center">
            <div className="tracking-wide">Error</div>
          </div>
        </DashboardHeader>
        <div className="mt-8 px-4">
          <Alert severity="error">{error}</Alert>
          <div className="mt-4 flex justify-center">
            <Button
              variant="text"
              className="w-[70%] bg-text2 py-3 text-white"
              onClick={handleBackClick}
            >
              Go Back
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const isLockSavings = savingsType === "Lock";
  const showEarlyWithdrawalFee = isLockSavings && isBeforeWithdrawalDate();

  return (
    <main>
      <DashboardHeader
        className="relative cursor-pointer items-center lg:mt-[2em]"
        onClick={handleBackClick}
      >
        <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />
        <div className="flex flex-grow items-center justify-center">
          <div className="tracking-wide">Confirm Withdrawal</div>
        </div>
      </DashboardHeader>

      <section className="px-4">
        <div className="mt-[2.5em] flex justify-center">
          <h1 className="text-xl font-bold">
            {netAmount > 0 ? formatBalance(netAmount) : "---"}
          </h1>
        </div>

        <div className="mt-9 space-y-4 rounded-lg bg-gray-50 p-4">
          <div className="flex justify-between">
            <Typography className="text-base font-medium">
              Amount to Receive
            </Typography>
            <span className="font-medium">
              {netAmount > 0 ? formatBalance(netAmount) : "---"}
            </span>
          </div>

          <div className="space-y-2">
            <Typography className="text-base font-medium text-gray-700">
              Fees Breakdown:
            </Typography>

            {profileDetails?.membershipStatus === "inactive" && (
              <div className="flex justify-between">
                <Typography className="text-base text-amber-600">
                  Membership Fee
                </Typography>
                <span className="text-amber-600">₦1,000.00</span>
              </div>
            )}
            {showEarlyWithdrawalFee && amountInNaira && (
              <div className="flex justify-between">
                <Typography className="text-base text-amber-600">
                  Early Withdrawal Fee (3%)
                </Typography>
                <span className="text-amber-600">
                  ₦
                  {(amountInNaira * 0.03).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <Typography className="text-base">Transaction Fee</Typography>
              <span>₦50.00</span>
            </div>
          </div>

          <hr className="border-gray-300" />

          <div className="flex justify-between font-semibold">
            <Typography className="text-base">Total Deduction</Typography>
            <span className="text-text2">{formatBalance(totalDeduction)}</span>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <Typography className="font-semibold">Contribution Plan</Typography>
            <span className="font-medium">
              {location.state?.contributionPlan || "Monthly"}
            </span>
          </div>
          <hr className="mt-4 w-full" />
        </div>

        {error && (
          <Alert severity="error" className="mt-4">
            {error}
          </Alert>
        )}

        <div className="mt-8 flex justify-center">
          <Button
            variant="text"
            className="w-[70%] bg-text2 py-3 text-sm normal-case text-white hover:bg-text2 disabled:bg-gray-300"
            onClick={handleConfirmWithdrawal}
            disabled={
              loading || !amountInNaira || !contributionId || netAmount <= 0
            }
          >
            Confirm Withdrawal (
            {netAmount > 0 ? formatBalance(netAmount) : "---"})
          </Button>
        </div>
      </section>

      {pinStep === 1 && (
        <GeneratePin
          isOpen={pinStep === 1}
          onClose={handleGeneratePinClose}
          onOtpGenerated={handleOtpGenerated}
        />
      )}

      {pinStep === 2 && (
        <OtpPin
          isOpen={pinStep === 2}
          onNext={handleOtpPinNext}
          onClose={handleOtpPinClose}
        />
      )}

      {pinStep === 3 && (
        <ChangePin
          otp={otp}
          isOpen={pinStep === 3}
          onClose={handleChangePinClose}
          onSuccess={handleChangePinSuccess}
        />
      )}

      {pinStep === 4 && (
        <PinModal
          isOpen={pinStep === 4}
          onClose={() => setPinStep(0)}
          onSubmit={handlePinSubmit}
          header="My Chain Co-op Pin"
          title="Enter your transaction PIN."
          loading={loading}
          error={error}
          pin={pin}
          onPinChange={setPin}
        />
      )}

      <Success
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        title="Withdrawal Successful"
      />
    </main>
  );
};

export default ConfirmAmount;
