import { useState } from "react";
import { useNavigate } from "react-router";
import { DashboardHeader } from "../../../common/DashboardHeader";
import Modal from "../../../common/Modal";
import TransferModal from "./modal/TransferModal";
import UploadReceiptModal from "./modal/UploadReceiptModal";
import PaymentSuccessfull from "./modal/PaymentSuccessfull";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import fund from "../../../../Assets/svg/dashboard/wallet/withdraw.svg";
import debit from "../../../../Assets/svg/dashboard/wallet/debit.svg";

const FundWallet = () => {
  const [modalType, setModalType] = useState(null);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const openModal = (type) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  const handleTransferContinue = () => {
    closeModal();
    openModal("upload");
  };

  const handleUploadContinue = () => {
    closeModal();
    openModal("final");
  };

  return (
    <main className="font-sans">
      <header className="mt-[2em]">
        <DashboardHeader>
          <div className="flex w-[55%] items-center justify-between">
            <IoIosArrowBack
              size={25}
              className="cursor-pointer"
              onClick={handleBackClick}
            />
            <h1 className="tracking-wide">Fund Wallet</h1>
          </div>
        </DashboardHeader>
      </header>
      <section className="m-auto mt-[2em] h-full w-[33em]">
        <article className="flex items-center justify-between">
          <div className="flex items-center gap-4">
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
            className="cursor-pointer"
            onClick={() => openModal("transfer")}
          />
        </article>
        <hr className="mt-3 h-[1px] rounded-md" />
        <article className="mt-[1em] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={debit} alt="Withdraw" />
            <div>
              <h2 className="font-medium">Debit / Credit Card</h2>
              <p className="text-sm font-medium text-howtext">
                Fund with Naira cards
              </p>
            </div>
          </div>
          <IoIosArrowForward size={25} className="cursor-pointer" />
        </article>
      </section>

      <Modal
        isOpen={modalType === "transfer"}
        onClose={closeModal}
        className="bg-white"
      >
        <TransferModal onContinue={handleTransferContinue} />
      </Modal>

      <Modal
        isOpen={modalType === "upload"}
        onClose={closeModal}
        className="bg-white"
      >
        <UploadReceiptModal onContinue={handleUploadContinue} />
      </Modal>

      <Modal
        isOpen={modalType === "final"}
        onClose={closeModal}
        className="bg-white"
      >
        <PaymentSuccessfull />
      </Modal>
    </main>
  );
};

export default FundWallet;
