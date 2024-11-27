import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { IoIosArrowBack } from "react-icons/io";
import withdraw from "../../../../Assets/svg/dashboard/wallet/withdraw.svg";
import xlamation from "../../../../Assets/svg/dashboard/wallet/xclamation.svg";
import { useAppSelector } from "../../../../shared/redux/reduxHooks";
import { Primary } from "../../../common/Button";
import Modal from "../../../common/Modal";
import ReactLoading from "react-loading";
import { WithdrawalFromWallet } from "../../../../shared/redux/slices/transaction.slices";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../shared/redux/store";
import OTPInput from "react-otp-input";
import { Alert } from "@mui/material";
import success from "../../../../Assets/svg/auth/sucess.svg";

interface BankAccount {
  accountNumber: string;
  bankCode: string;
  accountName: string;
  bankId: number;
  _id: string;
}

const SelectBank = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const amount = location.state?.amount;
  const dispatch: AppDispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(
    null,
  );

  const handleBackClick = () => {
    navigate(-1);
  };

  const BankAccount = () => {
    navigate("/dashboard/wallet/bank-account", { state: { amount } });
  };

  const accountData = useAppSelector(
    (state: any) => state?.transaction?.getWalletBalance,
  );

  const hasBankAccount =
    accountData?.bankAccounts && accountData?.bankAccounts?.length > 0;

  const handleSuccessfulTransaction = () => {
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);
    setPin("");
    setTimeout(() => {
      navigate("/dashboard/wallet", { replace: true });
    }, 3000);
  };

  const handleSubmit = async () => {
    if (!selectedAccount) {
      setError("Please select a bank account");
      return;
    }
    if (pin.length !== 4) {
      setError("Please enter a 4-digit PIN.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await dispatch(
        WithdrawalFromWallet({
          accountNumber: selectedAccount.accountNumber,
          bankCode: selectedAccount.bankCode,
          amount,
          pin,
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

  const toggleModal = (account: any) => {
    setSelectedAccount(account);
    setIsModalOpen(!isModalOpen);
    setPin("");
    setError("");
  };

  const handlePinChange = (pinValue: string) => {
    const numericValue = pinValue.replace(/[^0-9]/g, "");
    setPin(numericValue);
  };

  return (
    <main className="items-center font-sans">
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
            <div className="tracking-wide">Select Bank</div>
          </div>
        </DashboardHeader>
      </header>
      <article>
        <div className="flex flex-col gap-8 px-4">
          <div className="mt-8 flex w-full gap-4 rounded-lg bg-Dh px-6 py-4 font-medium">
            <img src={xlamation} alt="" />
            <p className="sm:text-sm">
              Withdrawals can only be made to bank accounts that match the name
              of your Chain Coop account
            </p>
          </div>

          {hasBankAccount ? (
            <section>
              <h1 className="text-lg font-bold">Existing Bank Accounts</h1>
              <div className="mt-4 flex flex-col gap-4">
                {accountData.bankAccounts.map((account: any, index: number) => (
                  <div
                    key={account._id}
                    className="flex h-auto flex-col items-center gap-4 rounded-xl bg-[#ece6f2] px-2 py-6 text-center"
                  >
                    <div>
                      <img
                        src={withdraw}
                        alt="withdraw"
                        className="h-11 w-11"
                      />
                    </div>
                    <h1 className="font-bold">{account.accountName}</h1>
                    <p className="font-medium text-gray-600">
                      {account.accountNumber}
                    </p>
                    <Primary
                      onClick={() => toggleModal(account)}
                      className="flex w-[70%] justify-center bg-text2 py-3 text-white"
                    >
                      Select Account
                    </Primary>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <div className="mt-8 text-center">
              <div className="flex justify-center">
                <img src={withdraw} alt="withdraw" />
              </div>
              <p className="mt-4 text-howtext">
                You haven't added any bank accounts
              </p>
            </div>
          )}

          <button
            className="mb-[2em] mt-8 flex w-full justify-center gap-4 rounded-lg bg-Dh px-6 py-4 font-semibold text-text2"
            onClick={BankAccount}
          >
            <p>
              {hasBankAccount
                ? "Add another bank account"
                : "Add a new bank account"}
            </p>
          </button>
        </div>
      </article>
      <Modal
        isOpen={isModalOpen}
        onClose={() => toggleModal(null)}
        className="fle-col flex justify-center bg-white py-[3em] text-center"
      >
        <header>
          <h1 className="text-2xl font-semibold">My Chain Co-op Pin</h1>
          <p className="mt-1 text-howtext">Enter your transaction pin.</p>
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
                      (e.key >= "0" && e.key <= "9") ||
                      e.key === "Backspace" ||
                      e.key === "ArrowLeft" ||
                      e.key === "ArrowRight" ||
                      e.key === "Tab"
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
        </div>
        {error && (
          <Alert severity="error" className="mb-4 mt-4">
            {error}
          </Alert>
        )}
        <Primary
          onClick={handleSubmit}
          disabled={loading}
          className="mt-[2em] flex w-full justify-center rounded-full bg-text2 px-2 py-2 font-semibold text-white"
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
        className="bg-white py-[3em] text-center"
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
            <p className="mt-2 text-howtext">
              Your withdrawal has been processed. Redirecting to wallet...
            </p>
          </header>
        </div>
      </Modal>
    </main>
  );
};

export default SelectBank;
