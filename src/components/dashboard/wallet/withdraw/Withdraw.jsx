import { useState } from "react";
import { useNavigate } from "react-router";
import { DashboardHeader } from "../../../common/DashboardHeader";
import Modal from "../../../common/Modal";
import { Primary } from "../../../common/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import withdraw from "../../../../Assets/svg/dashboard/wallet/withdraw.svg";

const Withdraw = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

<<<<<<< HEAD
  const handleBackClick = () => {
    navigate(-1);
=======
  const wallet = () => {
    navigate("/dashboard/wallet");
>>>>>>> 10cf39ba59df1c53433ab269595f99f4750d01bf
  };

  const SelectBank = () => {
    navigate("/dashboard/wallet/select-bank");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <main className="font-sans">
      <header className="mt-[2em]">
<<<<<<< HEAD
        <DashboardHeader className="cursor-pointer" onClick={handleBackClick}>
          <div className="flex w-[55%] items-center justify-between">
            <IoIosArrowBack size={25} className="cursor-pointer" />
=======
        <DashboardHeader>
          <div className="flex w-[55%] items-center justify-between">
            <IoIosArrowBack
              size={25}
              className="cursor-pointer"
              onClick={wallet}
            />
>>>>>>> 10cf39ba59df1c53433ab269595f99f4750d01bf
            <div className="tracking-wide">Withdraw</div>
          </div>
        </DashboardHeader>
      </header>
      <section className="m-auto mt-[2em] h-full w-full">
        <div className="flex items-center justify-between px-4 sm:px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <img
              src={withdraw}
              alt="Withdraw"
              className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
            />
            <p className="text-lg font-medium">Withdraw to Bank Account</p>
          </div>
          <IoIosArrowForward
            size={25}
            className="cursor-pointer"
            onClick={toggleModal}
          />
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={toggleModal} className="bg-white">
        <div className="mt-[2.5em]">
          <header>
            <h1 className="text-center text-xl font-semibold">
              Bank Account Withdrawal
            </h1>
          </header>
          <section className="mt-[2em]">
            <hr className="h-[1px] rounded-md " />
            <div className="mt-3 flex justify-between">
              <p className="text-howtext">Duration</p>
              <p className="font-medium">2-3 business days</p>
            </div>
            <hr className="mt-3 h-[1px] rounded-md" />
            <div className="mt-5 flex justify-between">
              <p className="text-howtext">Withdrawal limit</p>
              <p className="font-medium">500,000,000 / transaction</p>
            </div>
            <hr className="mt-3 h-[1px] rounded-md" />
            <div className="mt-[1em] w-full">
              <label htmlFor="amount" className="flex-start flex font-medium">
                Enter Amount
              </label>
              <div className="relative mt-[1em] flex w-full items-center">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 font-semibold text-gray-500">
                  NGN
                </span>
                <input
                  name="amount"
                  id="amount"
                  type="number"
                  className="border-border bg-input focus:border-border flex-1 rounded-lg border-[1px] bg-inherit p-3 pl-10 focus:bg-inherit focus:outline-none"
                  style={{ textAlign: "right" }}
                />
              </div>
            </div>
          </section>
          <Primary
            className="mt-[2em] w-full bg-text2 py-2 text-white"
            onClick={SelectBank}
          >
            Continue
          </Primary>
        </div>
      </Modal>
    </main>
  );
};

export default Withdraw;
