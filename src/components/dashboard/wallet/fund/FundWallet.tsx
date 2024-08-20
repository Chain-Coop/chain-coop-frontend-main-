import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../shared/redux/store";
import useUserProfile from "../../../../shared/Hooks/useUserProfile";
import { GetWalletBalance } from "../../../../shared/redux/slices/transaction.slices";
import Modal from "../../../common/Modal";
import TransferModal from "./modal/TransferModal";
import UploadReceiptModal from "./modal/UploadReceiptModal";
import PaymentSuccessfull from "./modal/PaymentSuccessfull";
import EmailAmountModal from "./modal/paystack/EmailAmountModal";
import { ModalType } from "../../../../data/Data";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import fund from "../../../../Assets/svg/dashboard/wallet/withdraw.svg";
import debit from "../../../../Assets/svg/dashboard/wallet/debit.svg";

const FundWallet: React.FC = () => {
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [amount, setAmount] = useState<number | undefined>();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { profileDetails } = useUserProfile();

  const handleBackClick = () => {
    navigate(-1);
  };

  const openModal = (type: ModalType) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  const handleTransferContinue = () => {
    closeModal();
    openModal(ModalType.Upload);
  };

  const handleUploadContinue = () => {
    closeModal();
    openModal(ModalType.Final);
  };

  const handlePaystackPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount) {
      console.error("Amount is undefined");
      return;
    }

    if (!profileDetails?.email) {
      console.error("User email is missing");
      return;
    }

    const handler = window.PaystackPop?.setup({
      key: "pk_test_23c84d5c89c5b18982c60e27e917a498d8f76dd9",
      email: profileDetails.email,
      amount: amount * 100,
      currency: "NGN",
      ref: `REF-${Math.floor(Math.random() * 1000000)}`,
      onClose: function () {
        console.warn("Payment process was closed");
      },
      callback: function (response: { reference: string }) {
        handlePaymentSuccess(response.reference);
        setAmount(0);
      },
    });

    if (handler) {
      handler.openIframe();
    } else {
      console.error("Paystack handler is not available");
    }

    closeModal();
  };

  const handlePaymentSuccess = (reference: string) => {
    console.log("Payment reference:", reference);

    fetch("https://chain-coop-backend.onrender.com/api/v1/wallet/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reference }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(GetWalletBalance());
        } else {
          console.error("Webhook response indicated failure:", data);
        }
      })
      .catch((error) => {
        console.error("Error calling webhook:", error);
      });
  };

  return (
    <main className="font-sans">
      <header className="mt-[2em]">
        <DashboardHeader
          className="relative cursor-pointer items-center"
          onClick={handleBackClick}
        >
          <IoIosArrowBack
            size={25}
            className="absolute left-0 cursor-pointer"
          />
          <div className="flex flex-grow items-center justify-center">
            <div className="tracking-wide">Fund Wallet</div>
          </div>
        </DashboardHeader>
      </header>
      <section className="m-auto mt-[1.5em] h-full w-full px-[1em]">
        <div
          className="flex items-center justify-between"
          onClick={() => openModal(ModalType.Transfer)}
        >
          <div className="flex cursor-pointer items-center gap-4">
            <img src={fund} alt="Withdraw" />
            <div>
              <h2 className="font-medium">Bank Transfer</h2>
              <p className="text-sm font-medium text-howtext">
                Transfer to your wallet account number
              </p>
            </div>
          </div>
          <IoIosArrowForward
            size={25}
            className="hidden cursor-pointer lg:block"
          />
        </div>
        <hr className="mt-3 h-[1px] rounded-md" />
        <article className="mt-[1em] flex items-center justify-between">
          <div
            className="flex cursor-pointer items-center gap-4"
            onClick={() => openModal(ModalType.Paystack)}
          >
            <img src={debit} alt="Withdraw" />
            <div>
              <h2 className="font-medium">Debit / Credit Card</h2>
              <p className="text-sm font-medium text-howtext">
                Fund with Naira cards
              </p>
            </div>
          </div>
          <IoIosArrowForward
            size={25}
            className="cursor-pointer sm:hidden lg:block"
          />
        </article>
      </section>

      <Modal
        isOpen={modalType === ModalType.Transfer}
        onClose={closeModal}
        className="bg-white"
      >
        <TransferModal onContinue={handleTransferContinue} />
      </Modal>

      <Modal
        isOpen={modalType === ModalType.Upload}
        onClose={closeModal}
        className="bg-white"
      >
        <UploadReceiptModal onContinue={handleUploadContinue} />
      </Modal>

      <Modal
        isOpen={modalType === ModalType.Final}
        onClose={closeModal}
        className="bg-white"
      >
        <PaymentSuccessfull />
      </Modal>

      <Modal
        isOpen={modalType === ModalType.Paystack}
        onClose={closeModal}
        className="bg-white"
      >
        <EmailAmountModal
          amount={amount}
          setAmount={(value: number) => setAmount(Number(value))}
          handlePaystackPayment={handlePaystackPayment}
          closeModal={closeModal}
        />
      </Modal>
    </main>
  );
};

export default FundWallet;
