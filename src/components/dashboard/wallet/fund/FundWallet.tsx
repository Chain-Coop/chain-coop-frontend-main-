import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "../../../common/DashboardHeader";
import Modal from "../../../common/Modal";
import EmailAmountModal from "./modal/paystack/EmailAmountModal";
import { ModalTypes } from "../../../../data/Data";
import PaymentSuccessfull from "./modal/PaymentSuccessfull";
import debit from "../../../../Assets/svg/dashboard/wallet/debit.svg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const FundWallet: React.FC = () => {
  const [modalType, setModalType] = useState<ModalTypes | null>(null);
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const handleBackClick = () => {
    navigate(-1);
  };

  const openModal = (type: ModalTypes) => {
    setModalType(type);
  };

  const closeModal = () => setModalType(null);

  return (
    <main className="font-sans">
      <DashboardHeader
        className="relative cursor-pointer items-center lg:mt-[2em]"
        onClick={handleBackClick}
      >
        <IoIosArrowBack
          size={25}
          className="absolute left-2 top-1/2 -translate-y-1/2 transform cursor-pointer lg:left-0"
        />
        <div className="flex flex-grow items-center justify-center">
          <div className="tracking-wide">Fund Wallet</div>
        </div>
      </DashboardHeader>
      <section className="m-auto mt-[1.5em] h-full w-full px-[1em]">
        <article
          className="mt-[1em] flex cursor-pointer items-center justify-between"
          onClick={() => openModal(ModalTypes.Paystack)}
        >
          <div className="flex items-center gap-4">
            <img src={debit} alt="Withdraw" className="h-12 w-12" />
            <div>
              <h2 className="font-medium">Debit / Credit Card</h2>
              <p className="text-sm font-medium text-howtext">
                Fund with Naira cards
              </p>
            </div>
          </div>
          <IoIosArrowForward size={25} />
        </article>
      </section>

      <Modal
        isOpen={modalType === ModalTypes.Final}
        onClose={closeModal}
        className="bg-white"
      >
        <PaymentSuccessfull />
      </Modal>
      <EmailAmountModal
        isOpen={modalType === ModalTypes.Paystack}
        closeModal={() => setModalType(null)}
        error={error}
      />
    </main>
  );
};

export default FundWallet;
