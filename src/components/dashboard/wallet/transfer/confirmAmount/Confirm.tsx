import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { DashboardHeader } from "../../../../common/DashboardHeader";
import { useNavigate } from "react-router";
import { Primary } from "../../../../common/Button";

const Confirm = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <main className="font-sans">
      <DashboardHeader
        className="mt-8 cursor-pointer"
        onClick={handleBackClick}
      >
        <div className="flex w-[90%] items-center justify-between md:w-[65%]">
          <IoIosArrowBack size={25} className="cursor-pointer" />
          <div className="tracking-wide">
            <h1>Confirm Amount</h1>
          </div>
        </div>
      </DashboardHeader>

      <section className="px-2">
        <div className="mt-[2.5em] flex justify-center">
          <h1 className="text-xl font-bold">N 2,000,000.00</h1>
        </div>
        <div className="mt-9 flex flex-col gap-4">
          <div className="flex justify-between">
            <h1 className="font-semibold">Amount to invest</h1>
            <span className="font-medium">2,000,000.00</span>
          </div>
          <hr className="w-full" />
          <div className="flex items-center justify-between">
            <p className="font-semibold">Interest</p>
            <span className="font-medium">9%</span>
          </div>
          <hr className="w-full" />
          <div className="flex justify-between">
            <h1 className="font-semibold">Returns</h1>
            <span className="font-medium">180,000.00</span>
          </div>
        </div>
        <div className="mt-[2em] flex justify-center">
          <Primary className="w-[70%] bg-text2 py-3 text-white">
            Fund 2,000,000.00
          </Primary>
        </div>
      </section>
    </main>
  );
};

export default Confirm;
