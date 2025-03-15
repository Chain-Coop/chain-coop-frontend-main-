import { IoIosArrowDropleft } from "react-icons/io";
import { DashboardHeader } from "../../../../../common/DashboardHeader";
import cryptoSavings from "../../../../../../Assets/png/dashboard/cryptSavings.png";
import { Button } from "@material-tailwind/react";

const StartDate = () => {
  return (
    <main className="pb-[1.5em] font-sans">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Flexible Savings
      </DashboardHeader>
      <div className="m-auto w-[90%]">
        <header className="mt-[1.5em] flex flex-col lg:mt-[3em]">
          <h1 className="text-2xl font-bold">Flexible Savings</h1>
          <p className="mt-[1em] font-medium">
            You are about to save in ** crypto currency
          </p>
        </header>
        <section className="mt-[2.5em] flex justify-center">
          <div>
            <img src={cryptoSavings} alt="savings-img" />
          </div>
        </section>
        <section className="mt-[2em]">
          <div>
            <h2 className="text-lg font-bold text-memt1">
              Select Saving Frequency
            </h2>
          </div>
          <div className="mt-[1.5em] grid w-[80%] grid-cols-1 gap-4 md:grid-cols-2">
            <button className="flex w-[9em] transform items-center rounded-md bg-[#ECE6F2] px-6 font-semibold uppercase text-memt1 transition-all duration-300 hover:scale-105 active:scale-95 lg:py-2">
              Daily
            </button>

            <button className="flex w-[9em] transform items-center rounded-md bg-[#ECE6F2] px-6 font-semibold uppercase text-memt1 transition-all duration-300 hover:scale-105 active:scale-95 lg:py-2">
              Monthly
            </button>

            <button className="flex w-[9em] transform items-center rounded-md bg-[#ECE6F2] px-6 font-semibold uppercase text-memt1 transition-all duration-300 hover:scale-105 active:scale-95 lg:py-2">
              <span>Weekly</span>
            </button>

            <button className="flex w-[9em] transform items-center rounded-md bg-[#ECE6F2] px-6 font-semibold uppercase text-memt1 transition-all duration-300 hover:scale-105 active:scale-95 lg:py-2">
              <span>Manually</span>
            </button>
          </div>
        </section>
        <div>
          <div className="mt-[2.5em]">
            <label className="mb-3 flex font-semibold">
              Start Date (Today)
            </label>
            <p className="input mb-5 flex h-[4em] w-full items-center rounded-lg border-[1px] bg-gray-100 px-4 text-sm shadow-md"></p>
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="endDate"
              className="flex text-lg font-semibold text-memt1"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              required
              className="input mb-5 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="duration"
              className="flex text-lg font-semibold text-memt1"
            >
              Savings Duration
            </label>
            <input
              type="date"
              id="savingsDuration"
              required
              className="input mb-5 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="targetAmount"
              className="flex text-lg font-semibold text-memt1"
            >
              Target Amount
            </label>
            <input
              type="number"
              id="targetAmount"
              required
              placeholder="lk"
              className="input mb-5 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>
        </div>

        <div className="mt-[3em]">
          <Button
            variant="text"
            className="m-auto flex w-[80%] justify-center rounded-md bg-text2
              px-8 py-[1em] font-semibold
              text-white transition-all duration-300
              ease-in-out hover:scale-105 hover:bg-opacity-90 hover:shadow-lg active:scale-95 active:transform"
          >
            Submit
          </Button>
        </div>
        <button className="mt-[3em] flex items-center transition-transform duration-300 hover:scale-110">
          <IoIosArrowDropleft size={25} />
        </button>
      </div>
    </main>
  );
};

export default StartDate;
