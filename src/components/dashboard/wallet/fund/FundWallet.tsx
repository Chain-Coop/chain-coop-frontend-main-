import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useUserProfile from "../../../../shared/Hooks/useUserProfile";
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

const FundWallet: React.FC = () => {
  const [modalType, setModalType] = useState<ModalTypes | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [transactionReference, setTransactionReference] = useState<string>("");
  const navigate = useNavigate();
  const { profileDetails } = useUserProfile();

  const generateUniqueReference = () => {
    return `REF-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const openModal = (type: ModalTypes) => {
    if (type === ModalTypes.Paystack) {
      setTransactionReference(generateUniqueReference());
    }
    setModalType(type);
  };

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
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email: profileDetails?.email,
        amount: amount * 100,
        currency: "NGN",
        ref: transactionReference,
        callback: function (response: any) {
          if (response.status === "success") {
            openModal(ModalTypes.Final);
          }
        },
        onClose: function () {
          // Handle modal close
        },
      });
      handler.openIframe();
      closeModal();
    },
    [amount, profileDetails?.email, transactionReference],
  );

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
          amount={amount ?? 0}
          setAmount={setAmount}
          handlePaystackPayment={handlePaystackPayment}
          closeModal={closeModal}
        />
      </Modal>
    </main>
  );
};

export default FundWallet;
