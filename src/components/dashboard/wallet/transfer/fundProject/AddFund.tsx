import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { DashboardHeader } from "../../../../common/DashboardHeader";
import { useNavigate } from "react-router";
import arrow from "../../../../../Assets/svg/dashboard/wallet/transfer-arrow.svg";
import { Primary } from "../../../../common/Button";
import { useAllProjects } from "../../../../../shared/Hooks/useUserProfile";
import useWalletBalance from "../../../../../shared/Hooks/useBalance";

const AddFund = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const { useProjects } = useAllProjects();
  const { formattedBalance } = useWalletBalance();


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
            <span className="text-gray-400">0.00</span>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <hr className="w-full" />
          <div className="flex items-center justify-between">
            <p>NGN</p>
            <span className="text-base text-normal">
              <input 
                type="text" 
                className="border border-gray-300 focus:border-text2 focus:outline-none focus:ring-text2 rounded-md px-3 py-2 w-full md:w-auto"
                placeholder="Enter amount"
              />
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
              selectedProject
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
          <div className="absolute  h-[200px] left-0 px-[2em] right-0 top-full z-10 mt-2 overflow-auto bg-white shadow-md">
            {useProjects && useProjects.length > 0 ? (
              useProjects.map((project:any) => (
                <div
                  key={project.id}
                  className="cursor-pointer font-semibold p-2 hover:bg-gray-200"
                  onClick={() => handleProjectSelect(project.title)}
                >
                  {project.title}
                </div>
              ))
            ) : (
              <p className="p-2 text-gray-400">No projects available</p>
            )}
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
