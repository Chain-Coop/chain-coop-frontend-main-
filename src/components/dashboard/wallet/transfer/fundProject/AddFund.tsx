import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
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
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const { useProjects } = useAllProjects();
  const { balanceInKobo, formattedBalance } = useWalletBalance();

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

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9.]/g, '');
    
    const parts = inputValue.split('.');
    if (parts.length > 1) {
      parts[1] = parts[1].slice(0, 2);
      setAmount(parts.join('.'));
    } else {
      setAmount(inputValue);
    }
    
    setError("");
  };

  const confirmAmount = () => {
    const amountInKobo = Math.round(parseFloat(amount) * 100);

    if (isNaN(amountInKobo) || amountInKobo <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (amountInKobo > balanceInKobo) {
      setError(`Insufficient balance. Your current balance is ${formattedBalance}`);
      return;
    }

    navigate("/dashboard/wallet/transfer/confirm-amount", { state: { amountInKobo } });
  };

  return (
    <main className="font-sans">
      <DashboardHeader
        className="relative lg:mt-[2em] cursor-pointer items-center"
        onClick={handleBackClick}
      >
        <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />
        <div className="flex flex-grow items-center justify-center">
          <div className="tracking-wide">Add Fund To Project</div>
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
              {selectedProject ? formatBalance(selectedProject.projectPrice) : "₦0.00"}
            </span>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <hr className="w-full" />
          <div className="flex items-center justify-between">
            <p className="font-semibold">NGN</p>
            <span className="text-base text-normal relative">
              <input 
                type="text" 
                className="border border-gray-300 focus:border-text2 focus:outline-none focus:ring-text2 rounded-md px-3 py-2 w-full md:w-auto pl-6"
                placeholder="0.00"
                value={amount}   
                onChange={handleAmountChange} 
              />
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2">₦</span>
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
              <span className="font-medium px-[1.5em]">--- No project selected ---</span>
            )}
          </p>
          {dropdownVisible ? (
            <IoIosArrowDown size={25} />
          ) : (
            <IoIosArrowForward size={25} />
          )}

          {dropdownVisible && (
            <div className="absolute h-[200px] left-0 px-[em] right-0 top-full z-10 mt-2 overflow-auto bg-white shadow-md">
              {useProjects && useProjects.length > 0 ? (
                useProjects.map((project: any) => (
                  <div
                    key={project._id}
                    className="cursor-pointer flex justify-between font-semibold p-2 hover:bg-gray-200"
                    onClick={() => handleProjectSelect(project)}
                  >
                    <p>{project.title}</p>
                    <p className="text-howtext">
                      {formatBalance(project.projectPrice)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="p-2 text-gray-400">No projects available</p>
              )}
            </div>
          )}
        </div>
        {error && (
          <Alert severity="error" className="mt-4">{error}</Alert>
        )}

        <Primary
          onClick={confirmAmount}
          className={`mt-[2em] w-full py-3 text-white ${
            selectedProject && amount ? "bg-text2" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!selectedProject || !amount}
        >
          Continue
        </Primary>
      </section>
    </main>
  );
};

export default AddFund;