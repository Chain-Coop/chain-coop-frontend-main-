import { useState } from "react";
import { useNavigate } from "react-router";
import transfer from "../../../../../Assets/svg/dashboard/wallet/transfer.svg";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import { DashboardHeader } from "../../../../common/DashboardHeader";
import contribution from "../../../../../Assets/svg/dashboard/contribution.svg";
import fund_icon from "../../../../../Assets/svg/dashboard/project.svg";
import { Link } from "react-router-dom";
import Modal from "../../../../common/Modal";
import PaymentPlan from "../modal/PaymentPlan";

const Transfer = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleContributionClick = () => {
    setIsModalOpen(true);
  };

  return (
    <main className="font-sans">
      <DashboardHeader
        className="mt-[2em] cursor-pointer"
        onClick={handleBackClick}
      >
        <div className="flex w-[55%] items-center justify-between">
          <IoIosArrowBack size={25} className="cursor-pointer" />
          <div className="tracking-wide">
            <h1>Transfer</h1>
          </div>
        </div>
      </DashboardHeader>
      <section className="m-auto mt-[2em] w-full px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div
            className="flex cursor-pointer items-center gap-3"
            onClick={toggleDropdown}
          >
            <img
              src={transfer}
              alt="transfer"
              className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
            />
            <div className="flex flex-col">
              <p className="font-medium">
                Send to contribution or fund a project
              </p>
              <span className="text-howtext">Fund one of your plans</span>
            </div>
          </div>
          {dropdownVisible ? (
            <IoIosArrowDown size={25} className="cursor-pointer" />
          ) : (
            <IoIosArrowForward size={25} className="cursor-pointer" />
          )}
        </div>
        {dropdownVisible && (
          <div className="mt-2">
            <ul className="rounded-lg bg-white shadow-md">
              <Link to="/dashboard/wallet/transfer/fund-project">
                <li className="flex cursor-pointer items-center gap-3 border-b p-4 font-medium hover:bg-gray-100">
                  <img src={fund_icon} alt="contribution" />
                  Fund your project
                </li>
              </Link>

              <li
                className="flex cursor-pointer items-center gap-3 border-b p-4 font-medium hover:bg-gray-100"
                onClick={handleContributionClick}
              >
                <img src={contribution} alt="contribution" />
                Fund your contribution
              </li>
            </ul>
          </div>
        )}
      </section>
      <Modal isOpen={isModalOpen} onClose={toggleModal} className="bg-white">
        <PaymentPlan />
      </Modal>
    </main>
  );
};

export default Transfer;
