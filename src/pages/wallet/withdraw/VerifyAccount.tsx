import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Button, Typography } from "@material-tailwind/react";
import { WithdrawalFromWallet } from "../../../shared/redux/slices/transaction.slices";
import Success from "../../../components/common/Success";
import PinModal from "../../../components/common/PinModal";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import { AppDispatch } from "../../../shared/redux/store";
import { WithdrawIcon } from "../../../Assets/svg";

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

  const { accountName, accountNumber, bankName, bankCode, amount } =
    location.state || {};

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

  const handleSubmit = async (pin: string) => {
    if (pin.length !== 4) {
      setError("Please enter a 4-digit PIN.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await dispatch(
        WithdrawalFromWallet({
          accountNumber,
          bankCode,
          amount,
          pin,
          bankName,
        }),
      ).unwrap();

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

  useEffect(() => {
    if (!location.state) {
      navigate("/wallet", { replace: true });
    }
  }, [location.state, navigate]);

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
        <Button
          variant="text"
          onClick={toggleModal}
          className="mt-8 flex w-full items-center justify-center bg-text2 py-4 text-sm normal-case text-white hover:bg-text2"
        >
          Submit
        </Button>
      </section>

      <PinModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onSubmit={handleSubmit}
        header="My Chain Co-op Pin"
        title="Enter your transaction pin."
        loading={loading}
        error={error}
        pin={pin}
        onPinChange={setPin}
      />

      <Success
        isOpen={isSuccessModalOpen}
        onClose={() => {
          navigate("/wallet", { replace: true });
        }}
        title="Successfully Submitted"
      />
    </main>
  );
};

export default VerifyAccount;
