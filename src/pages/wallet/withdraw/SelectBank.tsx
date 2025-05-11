import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { RxDotFilled } from "react-icons/rx";
import { Button, Typography } from "@material-tailwind/react";
import { AppDispatch } from "../../../shared/redux/store";
import { WithdrawalFromWallet } from "../../../shared/redux/slices/transaction.slices";
import { CashwyreOfframpConfirm } from "../../../shared/redux/slices/web3.slices";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import { WithdrawIcon, Xclamation } from "../../../Assets/svg";
import PinModal from "../../../components/common/PinModal";
import { useAppSelector } from "../../../shared/redux/reduxHooks";
import SuccessModal from "../../../components/dashboard/wallet/modal/SuccessModal";

interface BankAccount {
  accountNumber: string;
  bankCode: string;
  accountName: string;
  bankName: string;
  bankId: number;
  _id: string;
}

const SelectBank = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const amount = location.state?.amount;
  const cryptoData = location.state?.data?.data;
  const isCryptoWithdrawal = !!cryptoData;
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
    navigate("/dashboard/wallet/bank-account", {
      state: {
        amount,
        isCryptoWithdrawal,
        cryptoData,
      },
    });
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
      if (isCryptoWithdrawal) {
        // Crypto withdrawal payload
        const payload = {
          amount: cryptoData.amountInCryptoAsset,
          crypto: cryptoData.cryptoAsset,
          network: cryptoData.network,
          reference: cryptoData.reference,
          transactionReference: cryptoData.transactionReference,
          accountNumber: selectedAccount.accountNumber,
          accountName: selectedAccount.accountName,
          bankCode: selectedAccount.bankCode,
        };
        await dispatch(CashwyreOfframpConfirm({ body: payload })).unwrap();
      } else {
        // Naira withdrawal payload
        const response = await dispatch(
          WithdrawalFromWallet({
            accountNumber: selectedAccount.accountNumber,
            bankCode: selectedAccount.bankCode,
            amount,
            bankName: selectedAccount.bankName,
            pin,
          }),
        ).unwrap();
      }

      handleSuccessfulTransaction();
    } catch (err: any) {
      const errorMessage = err.error || "An error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = (account?: any) => {
    if (account) {
      setSelectedAccount(account);
    }
    setIsModalOpen(!isModalOpen);
    setPin("");
    setError("");
  };

  return (
    <main className="items-center">
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
        <div className="flex flex-col gap-8">
          <div className="mt-8 flex w-full gap-4 rounded-lg bg-Dh px-4 py-4 font-medium sm:px-6">
            <Xclamation />
            <Typography variant="small" className="font-medium">
              Withdrawals can only be made to bank accounts that match the name
              of your Chain Coop account
            </Typography>
          </div>

          {hasBankAccount ? (
            <section>
              <Typography variant="h1" className="text-lg font-bold">
                Existing Bank Accounts
              </Typography>
              <div className="mt-4 flex flex-col gap-4">
                {accountData.bankAccounts.map((account: any, index: number) => (
                  <div
                    key={account._id}
                    className="flex h-auto flex-col items-center gap-4 rounded-xl bg-[#ece6f2] px-4 py-6 text-center sm:px-6"
                  >
                    <div>
                      <WithdrawIcon />
                    </div>
                    <h1 className="font-bold">{account.accountName}</h1>
                    <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
                      <p className="truncate font-medium text-gray-600">
                        {account?.bankName}
                      </p>
                      <RxDotFilled className="hidden text-gray-500 sm:block" />
                      <p className="font-medium text-gray-600">
                        {account.accountNumber}
                      </p>
                    </div>
                    <Button
                      variant="text"
                      onClick={() => toggleModal(account)}
                      className="flex w-[70%] justify-center bg-text2 py-3 text-white transition-colors duration-200 hover:bg-text2"
                    >
                      Select Account
                    </Button>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <div className="mt-8 text-center">
              <div className="flex justify-center">
                <WithdrawIcon />
              </div>
              <Typography className="mt-4 font-normal text-howtext">
                You haven't added any bank accounts
              </Typography>
            </div>
          )}

          <Button
            className="mb-[2em] mt-8 flex w-full justify-center gap-4 rounded-lg bg-Dh px-4 py-3 text-sm font-semibold normal-case text-text2 sm:px-6 sm:py-4"
            onClick={BankAccount}
          >
            <p>
              {hasBankAccount
                ? "Add another bank account"
                : "Add a new bank account"}
            </p>
          </Button>
        </div>
      </article>

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

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </main>
  );
};

export default SelectBank;
