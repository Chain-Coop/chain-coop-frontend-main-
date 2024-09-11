import React, { useState } from "react";
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
import ContributionPlan from "../modal/ContributionPlan";

const Transfer = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isPaymentPlanModalOpen, setIsPaymentPlanModalOpen] = useState(false);
  const [isContributionPlanModalOpen, setIsContributionPlanModalOpen] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleContributionClick = () => {
    setIsPaymentPlanModalOpen(true);
  };

  const handleClosePaymentPlanModal = () => {
    setIsPaymentPlanModalOpen(false);
  };

  const handleOpenContributionPlanModal = () => {
    setIsPaymentPlanModalOpen(false); 
    setIsContributionPlanModalOpen(true); 
  };

  const handleCloseContributionPlanModal = () => {
    setIsContributionPlanModalOpen(false);
  };

  return (
    <main className="font-sans">
      <DashboardHeader
        className="relative cursor-pointer lg:mt-[2em] items-center"
        onClick={handleBackClick}
      >
        <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />

        <div className="flex flex-grow items-center justify-center">
          <div className="tracking-wide">Transfer</div>
        </div>
      </DashboardHeader>
      <section className="m-auto mt-[2em] w-full px-4">
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
      <Modal isOpen={isPaymentPlanModalOpen} onClose={handleClosePaymentPlanModal} className="bg-white">
        <PaymentPlan onContinue={handleOpenContributionPlanModal} />
      </Modal>
      <Modal isOpen={isContributionPlanModalOpen} onClose={handleCloseContributionPlanModal} className="bg-white">
        <ContributionPlan /> 
      </Modal>
    </main>
  );
};

export default Transfer;
