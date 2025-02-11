import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import { DashboardHeader } from "../../../../common/DashboardHeader";
import fund_icon from "../../../../../Assets/svg/dashboard/project.svg";
import { Link } from "react-router-dom";
import Modal from "../../../../common/Modal";
import ContributionPlan from "../modal/ContributionPlan";
import { TransferIcon } from "../../../../../Assets/svg";

const Transfer: React.FC = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isContributionPlanModalOpen, setIsContributionPlanModalOpen] =
    useState(false);

  const handleBackClick = () => {
    navigate("/dashboard/wallet");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOpenContributionPlanModal = () => {
    setIsContributionPlanModalOpen(true);
  };

  const handleCloseContributionPlanModal = () => {
    setIsContributionPlanModalOpen(false);
  };

  const handleConfirmPlan = (selectedPlan: string) => {
    setIsContributionPlanModalOpen(false);
    navigate("/dashboard/contribution/fund_contribution/confirm_transaction", {
      state: { contributionPlan: selectedPlan },
    });
  };

  return (
    <main className="font-sans">
      <DashboardHeader
        className="relative cursor-pointer items-center lg:mt-[2em]"
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
            className="flex cursor-pointer items-center gap-3 sm:gap-2 lg:gap-3"
            onClick={toggleDropdown}
          >
            <TransferIcon />
            <div className="flex flex-col">
              <p className="whitespace-nowrap text-sm font-medium sm:text-base lg:text-lg">
                Send to contribution or fund a project
              </p>
              <span className="text-xs text-howtext sm:text-sm lg:text-base">
                Fund one of your plans
              </span>
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
                  <img src={fund_icon} alt="fund project" />
                  Fund your project
                </li>
              </Link>
            </ul>
          </div>
        )}
      </section>
      <Modal
        isOpen={isContributionPlanModalOpen}
        onClose={handleCloseContributionPlanModal}
        className="bg-white"
      >
        <ContributionPlan onConfirm={handleConfirmPlan} />
      </Modal>
    </main>
  );
};

export default Transfer;
