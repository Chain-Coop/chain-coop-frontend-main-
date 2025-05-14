import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Button, Typography } from "@material-tailwind/react";
import {
  WithdrawalFromWallet,
  GeneratePinOTP,
} from "../../../shared/redux/slices/transaction.slices";
import Success from "../../../components/common/Success";
import PinModal from "../../../components/common/PinModal";
import GeneratePin from "../../../components/dashboard/profile/security/modal/GeneratePin";
import OtpPin from "../../../components/dashboard/profile/security/modal/OtpPin";
import ChangePin from "../../../components/dashboard/profile/security/modal/ChangePin";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import { AppDispatch } from "../../../shared/redux/store";
import { WithdrawIcon } from "../../../Assets/svg";
import useUserProfile from "../../../shared/Hooks/useUserProfile";
import { Alert } from "@mui/material";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { profileDetails, fetchUserProfile } = useUserProfile();

  const [pinStep, setPinStep] = useState(0);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionComplete, setTransactionComplete] = useState(false);

  const { accountName, accountNumber, bankName, bankCode, amount } =
    location.state || {};

  const isPinCreated = profileDetails?.isPinCreated || false;

  useEffect(() => {
    if (transactionComplete) {
      window.history.pushState(null, "", window.location.pathname);
      window.addEventListener("popstate", () => {
        navigate("/dashboard/wallet");
      });
    }
    return () => {
      window.removeEventListener("popstate", () => {});
    };
  }, [transactionComplete, navigate]);

  useEffect(() => {
    if (!location.state) {
      navigate("/wallet", { replace: true });
    }
  }, [location.state, navigate]);

  const handleBackClick = () => {
    if (!transactionComplete) {
      navigate(-1);
    }
  };

  const handleSuccessfulTransaction = () => {
    setTransactionComplete(true);
    setPinStep(0);
    setIsSuccessModalOpen(true);
    setPin("");
    setOtp("");
    setTimeout(() => {
      navigate("/dashboard/wallet", { replace: true });
    }, 3000);
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
      await fetchUserProfile();
      setPinStep(4);
    } catch (error: any) {
      setError("Failed to refresh profile. Please try again.");
    }
  };

  const handleSubmit = async (submittedPin: string) => {
    if (submittedPin.length !== 4) {
      setError("Please enter a 4-digit PIN.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const body = {
        accountNumber,
        bankCode,
        amount,
        pin: submittedPin,
        bankName,
      };

      const response = await dispatch(WithdrawalFromWallet(body)).unwrap();

      if (response.landing.message) {
        handleSuccessfulTransaction();
      } else {
        setError(
          response.landing.message || "Withdrawal failed. Please try again.",
        );
      }
    } catch (err: any) {
      const errorMessage = err.error || "An error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitClick = async () => {
    try {
      await fetchUserProfile();
      if (isPinCreated) {
        setPinStep(4);
      } else {
        setPinStep(1);
      }
    } catch (error: any) {
      setError("Failed to fetch profile. Please try again.");
    }
  };

  return (
    <main>
      <header className="lg:mt-[2em]">
        <DashboardHeader
          className="relative cursor-pointer items-center"
          onClick={handleBackClick}
        >
          <IoIosArrowBack
            size={25}
            className="absolute left-0 cursor-pointer"
          />
          <div className="flex flex-grow items-center justify-center">
            <div className="tracking-wide">Verify Account</div>
          </div>
        </DashboardHeader>
      </header>
      <section className="gap- mt-[2.5em] flex flex-col items-center justify-center text-center">
        <WithdrawIcon />
        <div className="mt-[2em]">
          <Typography variant="h5" className="font-bold">
            {accountName}
          </Typography>
          <Typography className="flex gap-1 font-medium text-howtext">
            <span>{bankName}</span>.<span>{accountNumber}</span>
          </Typography>
        </div>
        {error && (
          <Alert severity="error" className="mt-4">
            {error}
          </Alert>
        )}
        <Button
          variant="text"
          onClick={handleSubmitClick}
          className="mt-8 flex w-full items-center justify-center bg-text2 py-4 text-sm normal-case text-white hover:bg-text2"
          disabled={loading}
        >
          Submit
        </Button>
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
          onSubmit={handleSubmit}
          header="My Chain Co-op Pin"
          title="Enter your transaction pin."
          loading={loading}
          error={error}
          pin={pin}
          onPinChange={setPin}
        />
      )}

      <Success
        isOpen={isSuccessModalOpen}
        onClose={() => {
          navigate("/dashboard/wallet", { replace: true });
        }}
        title="Successfully Submitted"
      />
    </main>
  );
};

export default VerifyAccount;
