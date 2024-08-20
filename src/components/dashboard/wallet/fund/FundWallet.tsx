import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../shared/redux/store";
import useUserProfile from "../../../../shared/Hooks/useUserProfile";
import { GetWalletBalance } from "../../../../shared/redux/slices/transaction.slices";
import { DashboardHeader } from "../../../common/DashboardHeader";
import Modal from "../../../common/Modal";
import TransferModal from "./modal/TransferModal";
import EmailAmountModal from "./modal/paystack/EmailAmountModal";
import { ModalTypes } from "../../../../data/Data";
import UploadReceiptModal from "./modal/UploadReceiptModal";
import PaymentSuccessfull from "./modal/PaymentSuccessfull";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import fund from "../../../../Assets/svg/dashboard/wallet/withdraw.svg";
import debit from "../../../../Assets/svg/dashboard/wallet/debit.svg";

const FundWallet = () => {
  const [modalType, setModalType] = useState<ModalTypes | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { profileDetails } = useUserProfile();

  const handleBackClick = () => {
    navigate(-1);
  };

  const openModal = (type: ModalTypes) => setModalType(type);
  const closeModal = () => setModalType(null);

  const handleTransferContinue = () => {
    openModal(ModalTypes.Upload);
  };

  const handleUploadContinue = () => {
    openModal(ModalTypes.Final);
  };

  const handlePaystackPayment = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!amount) {
        console.error("Amount is undefined");
        return;
      }

      const handler = window.PaystackPop.setup({
        key: "pk_test_23c84d5c89c5b18982c60e27e917a498d8f76dd9",
        email: profileDetails?.email,
        amount: amount * 100,
        currency: "NGN",
        ref: `REF-${Math.floor(Math.random() * 1000000)}`,
        onClose: function () {},
        callback: function (response: { reference: string }) {
          handlePaymentSuccess(response.reference);
          setAmount(null);
        },
      });
      handler.openIframe();
      closeModal();
    },
    [amount, profileDetails?.email],
  );

  const handlePaymentSuccess = async (reference: string) => {
    try {
      const response = await fetch(
        "https://chain-coop-backend.onrender.com/api/v1/wallet/webhook",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reference }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(GetWalletBalance());
      } else {
        console.error("Error from webhook:", data.message);
      }
    } catch (error) {
      console.error("Error calling webhook:", error);
    }
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
          className="flex cursor-pointer items-center justify-between"
          onClick={() => openModal(ModalTypes.Transfer)}
        >
          <div className="flex items-center gap-4">
            <img src={fund} alt="Withdraw" />
            <div>
              <h2 className="font-medium">Bank Transfer</h2>
              <p className="text-sm font-medium text-howtext">
                Transfer to your wallet account number
              </p>
            </div>
          </div>
          <IoIosArrowForward size={25} className="hidden lg:block" />
        </div>
        <hr className="mt-3 h-[1px] rounded-md" />
        <article
          className="mt-[1em] flex cursor-pointer items-center justify-between"
          onClick={() => openModal(ModalTypes.Paystack)}
        >
          <div className="flex items-center gap-4">
            <img src={debit} alt="Withdraw" />
            <div>
              <h2 className="font-medium">Debit / Credit Card</h2>
              <p className="text-sm font-medium text-howtext">
                Fund with Naira cards
              </p>
            </div>
          </div>
          <IoIosArrowForward size={25} className="hidden lg:block" />
        </article>
      </section>

      {/* Dynamic Modal Rendering */}
      <Modal
        isOpen={modalType === ModalTypes.Transfer}
        onClose={closeModal}
        className="bg-white"
      >
        <TransferModal onContinue={handleTransferContinue} />
      </Modal>

      <Modal
        isOpen={modalType === ModalTypes.Upload}
        onClose={closeModal}
        className="bg-white"
      >
        <UploadReceiptModal onContinue={handleUploadContinue} />
      </Modal>

      <Modal
        isOpen={modalType === ModalTypes.Final}
        onClose={closeModal}
        className="bg-white"
      >
        <PaymentSuccessfull />
      </Modal>

      <Modal
        isOpen={modalType === ModalTypes.Paystack}
        onClose={closeModal}
        className="bg-white"
      >
        <EmailAmountModal
          amount={amount}
          setAmount={(value: number) => setAmount(value)}
          handlePaystackPayment={handlePaystackPayment}
          closeModal={closeModal}
        />
      </Modal>
    </main>
  );
};

export default FundWallet;
