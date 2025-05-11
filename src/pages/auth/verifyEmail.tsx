// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Button } from "@material-tailwind/react";
// import { AppDispatch } from "../../shared/redux/store";
// import { VerifyUserAuth } from "../../shared/redux/slices/landing.slices";
// import { RESEND_LOGIN_OTP } from "../../shared/redux/services/landing.services";

// const VerifyEmail = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [isResending, setIsResending] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const [resendTimer, setResendTimer] = useState(0);

//   const dispatch: AppDispatch = useDispatch();

//   const queryParams = new URLSearchParams(location.search);
//   const email = queryParams.get("email");
//   const phoneNumber = queryParams.get("phoneNumber");
//   const userId = queryParams.get("userId");

//   const handleOtpChange = (otpValue: string) => {
//     setOtp(otpValue);
//     if (otpValue.length === 6) {
//       verifyUserData(otpValue);
//     }
//   };

//   const verifyUserData = (otpValue: string) => {
//     setIsVerifying(true);
//     dispatch(VerifyUserAuth({ otp: otpValue, email }))
//       .unwrap()
//       .then(() => {
//         setIsVerifying(false);
//         toast.success("Email verified successfully");
//         navigate(
//           `/verify-phone-number?phoneNumber=${phoneNumber}&userId=${userId}`,
//         );
//       })
//       .catch((error) => {
//         setIsVerifying(false);
//         setOtp("");
//         toast.error(error);
//       });
//   };

//   const startResendTimer = () => {
//     setResendDisabled(true);
//     setResendTimer(30);
//     const interval = setInterval(() => {
//       setResendTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           setResendDisabled(false);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

// const ResendOtp = async () => {
//   setIsResending(true);
//   try {
//     const response = await RESEND_LOGIN_OTP("/auth/resend_otp", { email });
//     toast.success(response.data.msg);
//     startResendTimer();
//   } catch (error: any) {
//     toast.error(error);
//   } finally {
//     setIsResending(false);
//   }
// };

//   return (
//     <main className="flex h-screen items-center justify-center bg-log ">
//       <section className="text-center md:w-[55%]">
//         <div className="px-[2em]">
//           <p className="font-medium text-howtext md:text-lg lg:text-base">
//             Enter the OTP code sent to your mail to complete your registration.
//           </p>

//           <div className="flex justify-center rounded-lg border-gray-200 px-3 py-2">
//             <div className="flex space-x-5" data-hs-pin-input="">
//               <OtpInput
//                 length={6}
//                 value={otp}
//                 className="mt-[1em]"
//                 onChange={handleOtpChange}
//               />
//             </div>
//           </div>

//           <Button
//             onClick={ResendOtp}
//             disabled={isVerifying || isResending || resendDisabled}
//             className="m-auto mt-6 flex w-[12em] justify-center rounded-full bg-text2 px-2 py-3 text-center font-medium normal-case text-text5 disabled:opacity-50 sm:text-lg lg:mt-[2em]"
//           >
//             {isResending
//               ? "Resending..."
//               : resendDisabled
//                 ? `Resend OTP (${resendTimer}s)`
//                 : "Resend OTP"}
//           </Button>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default VerifyEmail;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@material-tailwind/react";
import { AppDispatch } from "../../shared/redux/store";
import {
  ResendEmailOtp,
  resetAuthState,
  VerifyUserAuth,
} from "../../shared/redux/slices/landing.slices";
import { ResendEmailOtpRequest, VerifyEmailRequest } from "../../shared/types";
import { clearMessage } from "../../shared/redux/slices/message.slices";
import OtpInput from "../../shared/utils/OtpInput";
import { RootState } from "../../shared/redux/rootReducer";

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string>("");
  const [resendDisabled, setResendDisabled] = useState<boolean>(false);
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [isResending, setIsResending] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, error, verifyEmailSuccess } = useSelector(
    (state: RootState) => state.landing,
  );

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const phoneNumber = queryParams.get("phoneNumber");
  const userId = queryParams.get("userId");

  // Validate query parameters
  useEffect(() => {
    if (!email || !phoneNumber || !userId) {
      toast.error("Invalid verification link. Please try registering again.");
      navigate("/create-account");
    }
  }, [email, phoneNumber, userId, navigate]);

  // Handle success and error states
  useEffect(() => {
    if (verifyEmailSuccess) {
      toast.success("Email verified successfully");
      navigate(
        `/verify-phone-number?phoneNumber=${encodeURIComponent(phoneNumber!)}&userId=${userId!}`,
      );
    }
    if (error) {
      toast.error(error);
      setOtp("");
    }
  }, [verifyEmailSuccess, error, navigate, phoneNumber, userId]);

  // Handle OTP change and verification
  const handleOtpChange = (otpValue: string) => {
    setOtp(otpValue);
    if (otpValue.length === 6 && email) {
      dispatch(VerifyUserAuth({ otp: otpValue, email } as VerifyEmailRequest));
    }
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (!email) {
      toast.error("Email is missing. Please try registering again.");
      return;
    }
    setIsResending(true);
    dispatch(ResendEmailOtp({ email } as ResendEmailOtpRequest))
      .unwrap()
      .then((response) => {
        toast.success(response.msg);
        startResendTimer();
      })
      .catch(() => {
        // Error handled by useEffect
      })
      .finally(() => {
        setIsResending(false);
      });
  };

  // Start resend timer
  const startResendTimer = () => {
    setResendDisabled(true);
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  return (
    <main className="flex h-screen items-center justify-center bg-log">
      <section className="text-center md:w-[55%]">
        <div className="px-[2em]">
          <p className="font-medium text-howtext md:text-lg lg:text-base">
            Enter the OTP code sent to your mail to complete your registration.
          </p>

          <div className="flex justify-center rounded-lg border-gray-200 px-3 py-2">
            <div className="flex space-x-5" data-hs-pin-input="">
              <OtpInput
                length={6}
                value={otp}
                className="mt-[1em]"
                onChange={handleOtpChange}
              />
            </div>
          </div>

          <Button
            onClick={handleResendOtp}
            disabled={isLoading || isResending || resendDisabled}
            className="m-auto mt-6 flex w-[12em] justify-center rounded-full bg-text2 px-2 py-3 text-center font-medium normal-case text-text5 disabled:opacity-50 sm:text-lg lg:mt-[2em]"
          >
            {isResending
              ? "Resending..."
              : resendDisabled
                ? `Resend OTP (${resendTimer}s)`
                : "Resend OTP"}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default VerifyEmail;
