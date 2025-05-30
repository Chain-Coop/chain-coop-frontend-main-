import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSavingCirclePayment } from "../../shared/Hooks/useTransactions";
import { Dialog, DialogBody, Typography } from "@material-tailwind/react";
import { Alert, Snackbar } from "@mui/material";
import { IoIosArrowRoundForward } from "react-icons/io";
import success from "../../Assets/svg/auth/sucess.svg";
import { useDispatch } from "react-redux";
import { GetUserProfile } from "../../shared/redux/slices/landing.slices";
import { AppDispatch } from "../../shared/redux/store";

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { verifyPayment, isLoading } = useSavingCirclePayment();

  useEffect(() => {
    const reference = searchParams.get("reference");
    const trxref = searchParams.get("trxref");
    const circleName = searchParams.get("circleName");
    const circleData = searchParams.get("circleData");

    if (!reference || !trxref) {
      setError("Invalid payment reference");
      return;
    }

    const verifyPaymentStatus = async () => {
      try {
        // First, ensure we have a valid session
        const authToken = sessionStorage.getItem("authToken");
        if (!authToken) {
          setError("Session expired. Please login again.");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
          return;
        }

        // Try to refresh the user profile to ensure token is valid
        try {
          await dispatch(GetUserProfile()).unwrap();
        } catch (profileError) {
          console.error("Profile refresh failed:", profileError);
          // Continue with payment verification even if profile refresh fails
        }

        const response = await verifyPayment(reference);
        if (response?.status === "success") {
          setIsSuccess(true);
          // Redirect to specific savings circle page after 3 seconds
          setTimeout(() => {
            if (circleName) {
              // If we have circleData, parse it and pass it in state
              const parsedCircleData = circleData ? JSON.parse(decodeURIComponent(circleData)) : null;
              navigate(`/dashboard/ajo/${circleName}`, {
                state: parsedCircleData ? { circleData: parsedCircleData } : undefined
              });
            } else {
              navigate("/dashboard/ajo");
            }
          }, 3000);
        } else {
          setError("Payment verification failed");
        }
      } catch (err: any) {
        setError(err.message || "Failed to verify payment");
      }
    };

    verifyPaymentStatus();
  }, [searchParams, verifyPayment, navigate, dispatch]);

  if (isSuccess) {
    return (
      <Dialog open={true} size="sm" className="bg-white">
        <DialogBody className="py-8 text-center">
          <img
            src={success}
            alt="Success"
            className="mx-auto sm:w-[6em] lg:w-[8em]"
          />
          <Typography variant="h4" className="mt-[1.5em] font-semibold">
            Payment Successful
          </Typography>
          <div className="mt-[1.5em] flex items-center justify-center gap-3">
            <Typography
              variant="paragraph"
              className="font-semibold text-howtext"
            >
              Returning to savings...
            </Typography>
            <IoIosArrowRoundForward size={30} className="animate-pulse" />
          </div>
        </DialogBody>
      </Dialog>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#ECECF2]">
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Dialog open={true} size="sm" className="bg-white">
        <DialogBody className="py-8 text-center">
          <Typography variant="h4" className="font-semibold">
            {isLoading ? "Verifying Payment..." : "Payment Status"}
          </Typography>
          <Typography variant="paragraph" className="mt-4 text-gray-600">
            {isLoading
              ? "Please wait while we verify your payment"
              : "Processing your payment status"}
          </Typography>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default PaymentCallback;
