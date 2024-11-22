import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { AppDispatch } from "../../../../shared/redux/store";
import { useAppDispatch } from "../../../../shared/redux/reduxHooks";
import { verifyUnpaidContribution } from "../../../../shared/redux/slices/transaction.slices";

type VerificationStatus = "idle" | "verifying" | "success" | "error";

interface StatusConfig {
  icon: JSX.Element;
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

const VerifyUnpaidContribution: React.FC = () => {
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    const verifyTransaction = async () => {
      const urlParams = new URLSearchParams(location.search);
      const reference = urlParams.get("reference");

      if (!reference) {
        setVerificationStatus("error");
        setErrorMessage("No reference code found in URL");
        return;
      }

      try {
        setVerificationStatus("verifying");
        const response = await dispatch(
          verifyUnpaidContribution({
            reference,
            addCard: true,
          }),
        ).unwrap();

        if (response?.transaction?.statusCode === 200) {
          setVerificationStatus("success");
          const redirectTimer = setTimeout(() => {
            navigate("/dashboard/contribution");
          }, 2000);
          return () => clearTimeout(redirectTimer);
        } else {
          throw new Error("Verification failed");
        }
      } catch (error: any) {
        setVerificationStatus("error");
        setErrorMessage(error);
      }
    };

    verifyTransaction();
  }, [dispatch, location.search, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg transition-all duration-300">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex justify-center">
            {statusConfig[verificationStatus].icon}
          </div>

          <h1
            className={`text-xl font-semibold ${statusConfig[verificationStatus].color}`}
          >
            {statusConfig[verificationStatus].title}
          </h1>

          <p className="text-center font-semibold text-gray-600">
            {errorMessage || statusConfig[verificationStatus].message}
          </p>

          {verificationStatus === "error" && (
            <div className="w-full space-y-4">
              <p className="text-center text-sm text-gray-500">
                If this issue persists, please contact our support team or try
                again.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-800"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {verificationStatus === "success" && (
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div
                className="duration-2000 h-2 rounded-full bg-green-500 transition-all ease-out"
                style={{ width: "100%" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyUnpaidContribution;
