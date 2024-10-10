import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Modal from "../../../common/Modal";
import { Primary } from "../../../common/Button";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { IoIosArrowBack } from "react-icons/io";
import withdraw_icon from "../../../../Assets/svg/dashboard/wallet/withdraw.svg";
import success from "../../../../Assets/svg/auth/sucess.svg";
import OTPInput from "react-otp-input";
import { WithdrawalFromWallet } from "../../../../shared/redux/slices/transaction.slices";
import { Alert } from '@mui/material';
import { AppDispatch } from "../../../../shared/redux/store";
import { useDispatch } from "react-redux";
import ReactLoading from "react-loading";

const VerifyAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionComplete, setTransactionComplete] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { accountName, accountNumber, bankName, bankCode, amount } = location.state || {};

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

  const handlePinChange = (pinValue: string) => {
    const numericValue = pinValue.replace(/[^0-9]/g, '');
    setPin(numericValue);
  };


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setPin("");
    setError("");
  };

  const handleBackClick = () => {
    if (!transactionComplete) {
      navigate(-1);
    }
  };

  const handleSuccessfulTransaction = () => {
    setTransactionComplete(true);
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);
    
    setPin("");
    
    setTimeout(() => {
      navigate("/dashboard/wallet", { replace: true }); 
    }, 3000);
  };

  const handleSubmit = async () => {
    if (pin.length !== 4) {
      setError("Please enter a 4-digit PIN.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await dispatch(WithdrawalFromWallet({
        accountNumber,
        bankCode,
        amount,
        pin
      })).unwrap();
      
      if (response.landing.message) {
        handleSuccessfulTransaction();
      } else {
        setError(response.landing.message || "Withdrawal failed. Please try again.");
      }
    } catch (err: any) {
      const errorMessage = err.error || "An error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (!location.state) {
      navigate("/wallet", { replace: true });
    }
  }, [location.state, navigate]);
  
  return (
    <main className="font-sans">
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
      <section className="text-center items-center flex gap- flex-col justify-center mt-[2.5em]">
        <img src={withdraw_icon} alt="withdraw_icon" />
        <div className="mt-[2em]">
          <h1 className="font-bold">{accountName}</h1>
          <p className="text-howtext flex gap-1 font-medium">
            <span>{bankName}</span>.
            <span>{accountNumber}</span>
          </p>
        </div>
      </section>
      <Primary
        className="mt-[2em] w-full bg-text2 py-3 text-white"
        onClick={toggleModal}
      >
        Submit
      </Primary>
      
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        className="bg-white text-center flex fle-col justify-center py-[3em]"
      > 
        <header>
          <h1 className="font-semibold text-2xl">
            My Chain Co-op Pin
          </h1>
          <p className="text-howtext mt-1">Enter your transaction pin.</p>
        </header>
      <div className="flex justify-center">
      <OTPInput
          value={pin}
          onChange={handlePinChange}
          numInputs={4}
          renderSeparator={<span className="w-2"></span>}
          renderInput={(props) => (
            <input 
              {...props} 
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              onKeyDown={(e) => {
                if (
                  !(
                    (e.key >= '0' && e.key <= '9') ||
                    e.key === 'Backspace' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'Tab'
                  )
                ) {
                  e.preventDefault();
                }
              }}
            />
          )}
          skipDefaultStyles={true}
          containerStyle={"gap-3 my-5"}
          inputStyle={
            "block lg:h-[55px] lg:w-[55px] sm:h-[50px] sm:w-[35px] text-center border-gray-200 rounded-md text-sm placeholder:text-gray-300 focus:border-text2 focus:ring-text2 bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          }
        />
        {error && (
          <Alert severity="error" className="mt-4 mb-4">
            {error}
          </Alert>
        )}
      </div>
        <Primary
          onClick={handleSubmit}
          disabled={loading}
          className="mt-[2em] px-2 w-full font-semibold rounded-full bg-text2 py-2 text-white"
        >
          {loading ? (
            <ReactLoading color="#FFFFFF" height={25} width={25} type="spin" />
          ) : (
            "Confirm Withdrawal"
          )}
        </Primary>
      </Modal>

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          navigate("/wallet", { replace: true });
        }}
        className="bg-white text-center py-[3em]"
      >
        <div className="mt-[2.5em] flex flex-col justify-center">
          <img
            src={success}
            alt="Success Icon"
            className="mx-auto sm:w-[6em] lg:w-[8em]"
          />
          <header className="mt-4">
            <h1 className="text-center text-xl font-semibold">
              Transaction Successful
            </h1>
            <p className="text-howtext mt-2">
              Your withdrawal has been processed. Redirecting to wallet...
            </p>
          </header>
        </div>
      </Modal>
    </main>
  );
};

export default VerifyAccount;