import React, { useState } from "react";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import { DashboardHeader } from "../../../../common/DashboardHeader";
import { useNavigate } from "react-router";
import arrow from "../../../../../Assets/svg/dashboard/wallet/transfer-arrow.svg";
import { Primary } from "../../../../common/Button";
import { useAllProjects } from "../../../../../shared/Hooks/useUserProfile";
import useWalletBalance from "../../../../../shared/Hooks/useBalance";
import { Alert } from "@mui/material";
import { formatBalance } from "../../../../../shared/utils/format";

const AddFund = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [displayAmount, setDisplayAmount] = useState("");
  const [actualAmount, setActualAmount] = useState("");
  const [error, setError] = useState("");
  const { useProjects } = useAllProjects();
  const { balanceInNaira, formattedBalance } = useWalletBalance();

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleProjectSelect = (project: any) => {
    setSelectedProject(project);
    setDropdownVisible(false);
  };

  const formatNumberWithCommas = (value: string) => {
    const cleanValue = value?.replace(/[^\d.]/g, "");

    const parts = cleanValue?.split(".");
    const wholePart = parts[0];
    const decimalPart = parts[1] || "";

    const formattedWholePart = wholePart?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return decimalPart
      ? `${formattedWholePart}.${decimalPart?.slice(0, 2)}`
      : formattedWholePart;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const numericValue = inputValue?.replace(/[^\d.]/g, "");

    const parts = numericValue?.split(".");
    let cleanValue = parts[0];
    if (parts?.length > 1) {
      cleanValue += "." + parts[1]?.slice(0, 2);
    }

    setActualAmount(cleanValue);

    setDisplayAmount(formatNumberWithCommas(cleanValue));

    setError("");
  };

  const confirmAmount = () => {
    const amountInNaira = parseFloat(actualAmount);

    if (isNaN(amountInNaira) || amountInNaira <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (amountInNaira > balanceInNaira) {
      setError(
        `Insufficient balance. Your current balance is ${formattedBalance}`,
      );
      return;
    }

    navigate("/dashboard/wallet/transfer/confirm-amount", {
      state: {
        amountInNaira,
        selectedProjectId: selectedProject?._id,
      },
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
          <div className="tracking-wide">Add fund to project</div>
        </div>
      </DashboardHeader>
      <section className="px-3">
        <div className="mt-6 flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-medium">Chain Coop Wallet</p>
            <span className="text-gray-400">{formattedBalance}</span>
          </div>
          <img
            src={arrow}
            alt="transfer-arrow"
            className="h-6 w-6 md:h-auto md:w-auto"
          />
          <div className="flex flex-col gap-2">
            <p className="font-medium">Project Fund</p>
            <span className="text-gray-400">
              {selectedProject
                ? formatBalance(selectedProject?.projectPrice)
                : "₦0.00"}
            </span>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <hr className="w-full" />
          <div className="flex-co flex gap-2 lg:flex-row lg:items-center lg:justify-between">
            <p className="whitespace-nowrap font-semibold">Amount to Invest</p>
            <span className="text-normal relative text-base">
              <input
                type="text"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 pl-6 focus:border-text2 focus:outline-none focus:ring-text2 md:w-auto"
                placeholder="0.00"
                value={displayAmount}
                onChange={handleAmountChange}
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 transform">
                ₦
              </span>
            </span>
          </div>

          <hr className="w-full" />
        </div>
        <div
          className="relative mt-4 flex cursor-pointer items-center justify-between"
          onClick={toggleDropdown}
        >
          <p className="font-semibold">
            {selectedProject ? (
              selectedProject.title
            ) : (
              <span className="px-[1.5em] font-medium">
                --- No project selected ---
              </span>
            )}
          </p>
          {dropdownVisible ? (
            <IoIosArrowDown size={25} />
          ) : (
            <IoIosArrowForward size={25} />
          )}

          {dropdownVisible && (
            <div className="absolute left-0 right-0 top-full z-10 mt-2 h-[200px] overflow-auto bg-white shadow-md">
              {useProjects && useProjects.length > 0 ? (
                <ul className="list-disc px-4">
                  {useProjects.map((project: any) => (
                    <li
                      key={project._id}
                      className="flex cursor-pointer justify-between p-2 font-semibold hover:bg-gray-200"
                      onClick={() => handleProjectSelect(project)}
                    >
                      <span>{project.title}</span>
                      <span className="text-howtext">
                        {formatBalance(project.projectPrice)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="p-2 text-gray-400">No projects available</p>
              )}
            </div>
          )}
        </div>
        {error && (
          <Alert severity="error" className="mt-4">
            {error}
          </Alert>
        )}

        <Primary
          onClick={confirmAmount}
          className={`mt-[2em] w-full bg-text2 py-3 text-white ${
            selectedProject && displayAmount ? "bg-text2" : "cursor-disabled"
          }`}
          disabled={!selectedProject || !displayAmount}
        >
          Continue
        </Primary>
      </section>
    </main>
  );
};

export default AddFund;
