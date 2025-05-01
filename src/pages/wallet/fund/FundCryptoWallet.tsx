import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import debit from "../../../Assets/svg/dashboard/wallet/debit.svg";
import external from "../../../Assets/svg/dashboard/wallet/externalW.svg";
import transfer from "../../../Assets/svg/dashboard/wallet/t.svg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ModalTypes } from "../../../data/Data";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import PaymentSuccessfull from "../../../components/dashboard/wallet/modal/PaymentSuccessfull";
import EmailAmountModal from "../../../components/dashboard/wallet/modal/EmailAmountModal";
import FundExternalModal from "../../../components/dashboard/wallet/modal/crypro/modals/FundExternalModal";
import BankTransfer from "../../../components/dashboard/wallet/modal/crypro/modals/BankTransfer";
const FundCryptoWallet: React.FC = () => {
  const [modalType, setModalType] = useState<ModalTypes | null>(null);
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [isFundWalletModalOpen, setIsFundWalletModalOpen] = useState(false);
  const [isBankTransferModalOpen, setIsBankTransferModalOpen] = useState(false);

  const handleFundModalSubmit = (data: { walletAddress: string }) => {
    console.log("Wallet Address:", data.walletAddress);
    setIsFundWalletModalOpen(false);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const openModal = (type: ModalTypes) => {
    setModalType(type);
  };

  const closeModal = () => setModalType(null);

  return (
    <main>
      <DashboardHeader
        className="relative cursor-pointer items-center lg:mt-[2em]"
        onClick={handleBackClick}
      >
        <IoIosArrowBack
          size={25}
          className="absolute left-2 top-1/2 -translate-y-1/2 transform cursor-pointer lg:left-10"
        />
        <div className="flex flex-grow items-center justify-center">
          <div className="tracking-wide">Fund Wallet</div>
        </div>
      </DashboardHeader>
      <section className="m-auto mt-[1.5em] h-full w-full px-[1em]">
        <article
          className="mt-[1em] flex cursor-pointer items-center justify-between"
          onClick={() => setIsBankTransferModalOpen(true)}
        >
          <div className="flex items-center gap-4">
            <img src={transfer} alt="Transfer" className="h-12 w-12" />
            <div>
              <h2 className="font-medium">Bank Transfer</h2>
              <p className="text-sm font-medium text-howtext">
                Transfer to your wallet account number
              </p>
            </div>
          </div>
          <IoIosArrowForward size={25} />
        </article>

        <article
          className="mt-[1em] flex cursor-pointer items-center justify-between"
          onClick={() => setIsFundWalletModalOpen(true)}
        >
          <div className="flex items-center gap-4">
            <img src={external} alt="External-Crypto" className="h-12 w-12" />
            <div>
              <h2 className="font-medium">External Crypto Wallet</h2>
              <p className="text-sm font-medium text-howtext">
                Fund from another wallet
              </p>
            </div>
          </div>
          <IoIosArrowForward size={25} />
        </article>

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

      <PaymentSuccessfull
        isOpen={modalType === ModalTypes.Final}
        onClose={closeModal}
      />

      <EmailAmountModal
        isOpen={modalType === ModalTypes.Paystack}
        closeModal={closeModal}
        error={error}
      />

      <FundExternalModal
        isOpen={isFundWalletModalOpen}
        onClose={() => setIsFundWalletModalOpen(false)}
        onSubmit={handleFundModalSubmit}
      />

      <BankTransfer
        isOpen={isBankTransferModalOpen}
        onClose={() => setIsBankTransferModalOpen(false)}
      />
    </main>
  );
};

export default FundCryptoWallet;
