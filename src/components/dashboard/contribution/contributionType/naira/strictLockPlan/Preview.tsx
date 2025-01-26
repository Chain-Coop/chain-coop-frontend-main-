import React from "react";
import { DashboardHeader } from "../../../../../common/DashboardHeader";
import { useLocation } from "react-router";

const Preview = () => {
  const location = useLocation();
  const { purpose, amount, currency, startDate, endDate, savingsDuration } =
    location.state || {};

  const formattedStartDate = new Date(startDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedEndDate = new Date(endDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="pb-[1.5em] font-sans">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Strict Lock Savings
      </DashboardHeader>
      <div className="m-auto w-[90%]">
        <header className="mt-[1.5em] flex flex-col gap-2 lg:mt-[3em]">
          <h1 className="text-2xl font-bold">Strict Lock Savings Preview</h1>
        </header>
        <header className="mt-[1.5em]">
          <p className="font-semibold text-gray-400">Title</p>
          <h1 className="text-2xl font-bold">{purpose}</h1>
        </header>
        <div className="mt-[2em] grid grid-cols-2 gap-6">
          <div className="flex flex-col rounded-lg bg-gray-100 p-4">
            <p className="font-semibold text-gray-400">Lock Amount</p>
            <h1 className="mt-auto text-xl font-semi">
              {amount.toLocaleString()} {currency}
            </h1>
          </div>
          <div className="flex flex-col rounded-lg bg-gray-100 p-4">
            <p className="font-semibold text-gray-400">Savings Duration</p>
            <h1 className="mt-auto text-xl font-semibold">
              {savingsDuration} months (180 days)
            </h1>
          </div>
          <div className="flex flex-col rounded-lg bg-gray-100 p-4">
            <p className="font-semibold text-gray-400">Start Date</p>
            <h1 className="mt-auto text-xl font-semibold">{formattedStartDate}</h1>
          </div>
          <div className="flex flex-col rounded-lg bg-gray-100 p-4">
            <p className="font-semibold text-gray-400">End Date</p>
            <h1 className="mt-auto text-xl font-semibold">{formattedEndDate}</h1>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Preview;
