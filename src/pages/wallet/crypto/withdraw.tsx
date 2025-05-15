import { Typography } from "@material-tailwind/react";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import WithdrawBankAccount from "../../../components/dashboard/wallet/modal/crypro/withdrawBankAccount";
import WithdrawCryptoModal from "../../../components/dashboard/wallet/modal/crypro/withdrawCryptoModal";

const Withdraw = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { walletType } = location.state || {};
  const [isBankAccountModalOpen, setIsBankAccountModalOpen] = useState(false);
  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false);

  const toggleModal = () => {
    navigate("/dashboard/wallet/crypto/withdraw/bank");
  };

  const handleCryptoModalSubmit = (data: { walletAddress: string }) => {
    console.log("Withdraw Data:", data);
    setIsCryptoModalOpen(false);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <main>
      <div className="mt-0 lg:mt-8">
        <DashboardHeader className="relative flex items-center justify-center text-2xl tracking-wide md:text-3xl lg:text-xl">
          <IoIosArrowBack
            onClick={handleBackClick}
            size={25}
            className="absolute left-2 top-1/2 -translate-y-1/2 transform cursor-pointer lg:left-7"
          />
          Withdraw
        </DashboardHeader>
      </div>
      <section className="mt-6 flex flex-col gap-6">
        {/* Withdraw to Bank */}
        <div
          className="flex cursor-pointer flex-col gap-1"
          onClick={toggleModal}
        >
          <Typography className="text-lg font-semibold text-gray-800">
            Withdraw to Bank account
          </Typography>
          <div className="flex justify-between">
            <Typography className="text-gray-500">
              Funds will be moved to your account
            </Typography>
            <IoIosArrowForward size={25} />
          </div>
          <hr />
        </div>

        {/* Withdraw to Crypto */}
        <div
          className="flex cursor-pointer flex-col gap-1"
          onClick={() => setIsCryptoModalOpen(true)}
        >
          <Typography className="text-lg font-semibold text-gray-800">
            Withdraw to Crypto wallet
          </Typography>
          <div className="flex justify-between">
            <Typography className="text-gray-500">
              Funds will be moved to your wallet
            </Typography>
            <IoIosArrowForward size={25} />
          </div>
          <hr />
        </div>
      </section>

      <WithdrawBankAccount
        isModalOpen={isBankAccountModalOpen}
        toggleModal={toggleModal}
        walletType={walletType}
      />

      <WithdrawCryptoModal
        isOpen={isCryptoModalOpen}
        onClose={() => setIsCryptoModalOpen(false)}
        onSubmit={handleCryptoModalSubmit}
      />
    </main>
  );
};

export default Withdraw;
