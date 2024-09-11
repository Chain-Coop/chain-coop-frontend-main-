import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { DashboardHeader } from "../../../../common/DashboardHeader";
import { useNavigate } from "react-router";
import arrow from "../../../../../Assets/svg/dashboard/wallet/transfer-arrow.svg";
import { Primary } from "../../../../common/Button";

const AddFund = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleProjectSelect = (project: string) => {
    setSelectedProject(project);
    setDropdownVisible(false);
  };

  const confirmAmount = () => {
    navigate("/dashboard/wallet/transfer/confirm-amount");
  };

  return (
    <main className="font-sans">
      <DashboardHeader
        className="relative cursor-pointer items-center"
        onClick={handleBackClick}
      >
        <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />
        <div className="flex flex-grow items-center justify-center">
          <div className="tracking-wide">Add Fund To Project</div>
        </div>
      </DashboardHeader>
      <section className="px-3">
        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="font-medium">Chain Coop Wallet</p>
            <span className="text-gray-400">0.00</span>
          </div>
          <img
            src={arrow}
            alt="transfer-arrow"
            className="h-6 w-6 md:h-auto md:w-auto"
          />
          <div>
            <p className="font-medium">Project Fund</p>
            <span className="text-gray-400">0.00</span>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <hr className="w-full" />
          <div className="flex items-center justify-between">
            <p>NGN</p>
            <span>0.00</span>
          </div>
          <hr className="w-full" />
        </div>
        <div
          className="relative mt-4 flex cursor-pointer items-center justify-between"
          onClick={toggleDropdown}
        >
          <p>
            {selectedProject ? (
              selectedProject
            ) : (
              <span className="font-medium">--- No project selected ---</span>
            )}
          </p>
          {dropdownVisible ? (
            <IoIosArrowDown size={25} />
          ) : (
            <IoIosArrowForward size={25} />
          )}

          {dropdownVisible && (
            <div className="absolute left-0 right-0 top-full z-10 mt-2 overflow-auto">
              <ul className="rounded-lg bg-white px-2 shadow-md">
                <li
                  className="flex cursor-pointer items-center gap-3 border-b p-4 font-semibold hover:bg-gray-100"
                  onClick={() => handleProjectSelect("AI Learning Platform")}
                >
                  AI Learning Platform
                </li>
                <li
                  className="flex cursor-pointer items-center gap-3 border-b p-4 font-semibold hover:bg-gray-100"
                  onClick={() => handleProjectSelect("Blockchain Project")}
                >
                  Blockchain Project
                </li>
                <li
                  className="flex cursor-pointer items-center gap-3 border-b p-4 font-semibold hover:bg-gray-100"
                  onClick={() => handleProjectSelect("Data Science Project")}
                >
                  Data Science Project
                </li>
              </ul>
            </div>
          )}
        </div>
        <Primary
          onClick={confirmAmount}
          className={`mt-[2em] w-full py-3 text-white ${
            selectedProject ? "bg-text2" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!selectedProject}
        >
          Continue
        </Primary>
      </section>
    </main>
  );
};

export default AddFund;
