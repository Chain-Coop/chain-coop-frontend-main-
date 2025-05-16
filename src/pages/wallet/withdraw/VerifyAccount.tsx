import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@material-tailwind/react";
import {
  WithdrawalFromWallet,
  GeneratePinOTP,
} from "../../../shared/redux/slices/transaction.slices";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import { WithdrawIcon } from "../../../Assets/svg";
import { Alert } from "@mui/material";
import { AppDispatch } from "../../../shared/redux/store";
import { RootState } from "../../../shared/redux/rootReducer";
import { GetUserProfile } from "../../../shared/redux/slices/landing.slices";
import PinModal from "../../../components/common/PinModal";
import GeneratePin from "../../../components/dashboard/profile/security/modal/GeneratePin";
import OtpPin from "../../../components/dashboard/profile/security/modal/OtpPin";
import ChangePin from "../../../components/dashboard/profile/security/modal/ChangePin";
import SuccessModal from "../../../components/dashboard/wallet/modal/SuccessModal";
import { useUserProfile } from "../../../shared/Hooks/useUserProfile";

const VerifyAccount = () => {
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
      navigate("/dashboard/wallet", { replace: true });
    }
    dispatch(GetUserProfile());
  }, [location.state, navigate, dispatch]);

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
      await dispatch(GetUserProfile()).unwrap();
      setPinStep(4);
    } catch (error: any) {
      setError("Failed to refresh profile. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (pin.length !== 4) {
      setError("Please enter a 4-digit PIN.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await dispatch(
        WithdrawalFromWallet({
          accountNumber,
          bankCode,
          amount,
          bankName,
          pin,
        }),
      ).unwrap();

      handleSuccessfulTransaction();
    } catch (err: any) {
      const errorMessage = err || "An error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitClick = async () => {
    try {
      await dispatch(GetUserProfile()).unwrap();
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
      <header className="lg:mt-8">
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
      <section className="mt-8 flex flex-col items-center justify-center gap-4 text-center">
        <WithdrawIcon />
        <div className="mt-4">
          <Typography variant="h5" className="font-bold">
            {accountName}
          </Typography>
          <Typography className="flex gap-1 font-medium text-howtext">
            <span>{bankName}</span>.<span>{accountNumber}</span>
          </Typography>
        </div>

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

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          navigate("/dashboard/wallet", { replace: true });
        }}
      />
    </main>
  );
};

export default VerifyAccount;
