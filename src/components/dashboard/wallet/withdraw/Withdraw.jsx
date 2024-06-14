import { useNavigate } from "react-router";
import { DashboardHeader } from "../../../common/DashboardHeader";
import withdraw from "../../../../Assets/svg/dashboard/wallet/withdraw.svg";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Modal from "../../../common/Modal";
import { Primary } from "../../../common/Button";
import { Link } from "react-router-dom";

const Withdraw = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const wallet = () => {
    navigate("/dashboard/wallet"); // Ensure this path is correct
  };

  const SelectBank = () => {
    navigate("/dashboard]/wallet/select-bank"); // Ensure this path is correct
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <main className="font-sans">
      <header className="mt-[2em]">
        <DashboardHeader>
          <div className="flex w-[55%] items-center justify-between">
            <div>
              <IoIosArrowBack
                size={25}
                className="cursor-pointer"
                onClick={wallet}
              />
            </div>
            <div className="tracking-wide">Withdraw</div>
          </div>
        </DashboardHeader>
      </header>
      <div className="m-auto mt-[2em] h-full w-[33em]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={withdraw} alt="Withdraw" />
            <p className="font-medium">Withdraw to Bank Account</p>
          </div>
          <div>
            <IoIosArrowForward
              size={25}
              className="cursor-pointer"
              onClick={toggleModal}
            />
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={toggleModal} className="bg-white">
        <div className="mt-[2.5em]">
          <header>
            <h1 className="text-center text-xl font-semibold">
              Bank Account Withdrawal
            </h1>
          </header>
          <div className="mt-[2em] text-howtext">
            <hr className="h-[1px] rounded-md " />
            <div className="mt-3 flex justify-between">
              <p>Duration</p>
              <p>2-3 business days</p>
            </div>
            <hr className="mt-3 h-[1px] rounded-md" />
            <div className="mt-5 flex justify-between">
              <p>Withdrawal limit</p>
              <p>500,000,000 / transaction</p>
            </div>
          </div>
          <hr className="mt-3 h-[1px] rounded-md" />
          <Link to={SelectBank}>
            <Primary className="mt-[2.5em] w-full bg-text2 py-2 text-white">
              Continue
            </Primary>
          </Link>
        </div>
      </Modal>
    </main>
  );
};

export default Withdraw;
