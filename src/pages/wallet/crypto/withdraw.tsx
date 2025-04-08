import { Typography } from "@material-tailwind/react";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import WithdrawBankAccount from "../../../components/dashboard/wallet/modal/crypro/withdrawBankAccount";

const Withdraw = () => {
  const [isBankAccountModalOpen, setIsBankAccountModalOpen] = useState(false);

  const toggleModal = () => {
    setIsBankAccountModalOpen((prev) => !prev);
  };

  return (
    <main>
      <div className="mt-0 lg:mt-8">
        <DashboardHeader className="flex items-center justify-center text-2xl tracking-wide md:text-3xl lg:text-xl">
          Withdraw
        </DashboardHeader>
      </div>
      <section className="mt-6 flex flex-col gap-6">
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

        <div className="flex cursor-pointer flex-col gap-1">
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
      />
    </main>
  );
};

export default Withdraw;
