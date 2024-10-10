import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useUserProfile from "../../../../shared/Hooks/useUserProfile";
import { DashboardHeader } from "../../../common/DashboardHeader";
import Modal from "../../../common/Modal";
import TransferModal from "./modal/TransferModal";
import EmailAmountModal from "./modal/paystack/EmailAmountModal";
import { ModalTypes } from "../../../../data/Data";
import UploadReceiptModal from "./modal/UploadReceiptModal";
import PaymentSuccessfull from "./modal/PaymentSuccessfull";
import fund from "../../../../Assets/svg/dashboard/wallet/withdraw.svg";
import debit from "../../../../Assets/svg/dashboard/wallet/debit.svg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const FundWallet: React.FC = () => {
  const [modalType, setModalType] = useState<ModalTypes | null>(null);
  const navigate = useNavigate();
  const { profileDetails } = useUserProfile();

  const handleBackClick = () => {
    navigate(-1);
  };

  const openModal = (type: ModalTypes) => {
    setModalType(type);
  };

  const closeModal = () => setModalType(null);

  const handleTransferContinue = () => {
    openModal(ModalTypes.Upload);
  };

  const handleUploadContinue = () => {
    openModal(ModalTypes.Final);
  };


  return (
    <main className="font-sans">
        <DashboardHeader
          className="relative cursor-pointer lg:mt-[2em] items-center"
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
      <section className="m-auto mt-[1.5em] h-full w-full px-[1em]">
        {/* <div
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
        </div> */}
        {/* <hr className="mt-3 h-[1px] rounded-md" /> */}
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
          closeModal={closeModal}
        />
      </Modal>
    </main>
  );
};

export default FundWallet;
