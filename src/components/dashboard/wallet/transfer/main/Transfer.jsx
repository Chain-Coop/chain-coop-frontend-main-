import { useState } from "react";
import { useNavigate } from "react-router";
import transfer from "../../../../../Assets/svg/dashboard/wallet/transfer.svg";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import { DashboardHeader } from "../../../../common/DashboardHeader";

const Transfer = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <main className="font-sans">
      <header className="mt-[2em]">
        <DashboardHeader className="cursor-pointer" onClick={handleBackClick}>
          <div className="flex w-[65%] items-center justify-between">
            <IoIosArrowBack size={25} className="cursor-pointer" />
            <div className="tracking-wide">
              <h1>Transfer</h1>
            </div>
          </div>
        </DashboardHeader>
      </header>
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
              <li className="cursor-pointer border-b p-4 hover:bg-gray-100">
                Fund your contribution
              </li>
              <li className="cursor-pointer p-4 hover:bg-gray-100">
                Fund your project
              </li>
            </ul>
          </div>
        )}
      </section>
    </main>
  );
};

export default Transfer;
