import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { DashboardHeader } from "../../../../../common/DashboardHeader";
import etherium from "../../../../../../Assets/svg/dashboard/contribution/etherum.svg";
import usdc from "../../../../../../Assets/svg/dashboard/Group 99764.png";
import lisk from "../../../../../../Assets/svg/dashboard/token_lisk.svg";
import usdt from "../../../../../../Assets/svg/dashboard/usdc.svg";
import { IoIosArrowDropleft } from "react-icons/io";

const ContributionCurrencyType = () => {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [selectedCryptoType, setSelectedCryptoType] = useState<string>("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleCategorySelect = (category: string) => {
    setSelectedCurrency(category);
    setSelectedCryptoType("");
  };

  const handleNext = () => {
    if (!selectedCurrency) {
      setError("Please select a contribution currency");
      return;
    }

    setError("");
    if (selectedCurrency === "Cryptocurrency" && !selectedCryptoType) {
      setError("Please select a cryptocurrency type");
      return;
    }

    const state = {
      currency: selectedCurrency,
      cryptoType: selectedCryptoType,
    };

    if (selectedCurrency === "Cryptocurrency") {
      navigate("/dashboard/contribution/crypto/purpose", { state });
    } else {
      navigate("/dashboard/contribution/purpose", { state });
    }
  };

  return (
    <main className="pb-[1.5em] font-sans">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Flexible Savings
      </DashboardHeader>
      <div className="m-auto w-[90%]">
        <header className="mt-[1.5em] lg:mt-[3em]">
          <h1 className="text-xl font-semibold md:text-2xl lg:text-2xl">
            Flexible Savings
          </h1>
          <p className=" mt-[1em] font-medium">
            You can save and withdraw anytime you want
          </p>
        </header>

        <div className="mt-[2em]">
          <div className="flex flex-col gap-4">
            <div className="mt-[2em]">
              <label
                htmlFor="savingsTitle"
                className="mb-3 flex text-lg font-semibold text-memt1"
              >
                Savings Title
              </label>
              <input
                type="savingsTitle"
                id="savingsTitle"
                required
                placeholder="Buy a car"
                className="input mb-5 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
              />
            </div>
            <div>
              <label
                htmlFor="savingsDesc"
                className="mb-3 flex text-lg font-semibold text-memt1"
              >
                Savings Description{" "}
                <span className="ml-2 text-gray-400">(Optional)</span>
              </label>
              <textarea
                id="saving-description"
                name="saving-description"
                className="mt-1 block min-h-32 w-full rounded-md border-[2px] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              ></textarea>
            </div>
          </div>
        </div>

        <header className="mt-[1.5em] lg:mt-[3em]">
          <h1 className="text-lg font-semibold md:text-xl lg:text-xl">
            What Currency are you Saving on ?
          </h1>
        </header>

        <div
          className={`mt-8 flex w-full items-center justify-between rounded-lg px-4 py-[9px] 
    transition-all duration-300 ease-in-out
    ${hoveredPlan === 0 ? "scale-[1.02] transform bg-[#DED3EA] shadow-lg" : "bg-[#ECE6F2]"}
    cursor-pointer`}
          onMouseEnter={() => setHoveredPlan(0)}
          onMouseLeave={() => setHoveredPlan(null)}
          onClick={() => handleCategorySelect("Cryptocurrency")}
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center  gap-3">
              <span className="items-center text-xl">
                <img src={etherium} alt="eherium" className="h-10 w-10" />
              </span>
              <h3
                className={`${hoveredPlan === 0 ? "scale-105" : "scale-100"} 
              transform items-center font-semibold transition-all duration-300 ease-in-out`}
              >
                Cryptocurrency
              </h3>
            </div>
            {hoveredPlan === 0 && (
              <p className="animate-fade-in text-sm text-gray-600">
                Click to select this Currency
              </p>
            )}
          </div>
          <button
            className={`rounded-md border px-6 py-1 font-medium transition-all duration-300 ease-in-out
      ${
        selectedCurrency === "Cryptocurrency"
          ? "bg-text2 text-white hover:bg-opacity-90"
          : "border-text2 bg-white hover:bg-text2 hover:text-white"
      }
      transform ${hoveredPlan === 0 ? "scale-105" : "scale-100"}
      ${hoveredPlan === 0 ? "shadow-md" : ""}
    `}
          >
            {selectedCurrency === "Cryptocurrency" ? "Selected" : "Select"}
          </button>
        </div>

        {selectedCurrency === "Cryptocurrency" && (
          <section className="mt-[3em]">
            <div className="w-full max-w-[30em] rounded-xl bg-inherit py-[2em] shadow-lg">
              <div className="px-[1em]">
                <header>
                  <h4 className="mb-2 text-lg font-semibold text-memt1">
                    Select Cryptocurrency type
                  </h4>
                </header>
              </div>
              <hr />
              <div className="mt-[1em] flex gap-[2em] px-[1em]">
                <button
                  onClick={() => setSelectedCryptoType("LISK")}
                  className={`flex w-[9em] items-center gap-2 rounded-md bg-[#ECE6F2] px-6 font-medium transition-all duration-300 lg:py-1
  ${
    selectedCryptoType === "LISK"
      ? "border-2 border-text2"
      : "hover:bg-text2 hover:text-white"
  }
  transform uppercase hover:scale-105 active:scale-95`}
                >
                  <img src={lisk} alt="Ethereum" className="h-8 w-8" />
                  <span>lisk</span>
                </button>

                <button
                  onClick={() => setSelectedCryptoType("USDC")}
                  className={`flex w-[9em] items-center gap-2 rounded-md bg-[#ECE6F2] px-6 font-medium transition-all duration-300 lg:py-1
  ${
    selectedCryptoType === "USDC"
      ? "border-2 border-text2"
      : "hover:bg-text2 hover:text-white"
  }
  transform uppercase hover:scale-105 active:scale-95`}
                >
                  <img src={usdc} alt="Ethereum" className="h-8 w-8" />
                  <span>usdc</span>
                </button>

                <button
                  onClick={() => setSelectedCryptoType("USDT")}
                  className={`flex w-[9em] items-center gap-2 rounded-md bg-[#ECE6F2] px-6 font-medium transition-all duration-300 lg:py-1
  ${
    selectedCryptoType === "USDT"
      ? "border-2 border-text2"
      : "hover:bg-text2 hover:text-white"
  }
  transform uppercase hover:scale-105 active:scale-95`}
                >
                  <img src={usdt} alt="Ethereum" className="h-8 w-8" />

                  <span>USDT</span>
                </button>
              </div>
            </div>
          </section>
        )}
        {error && (
          <Alert severity="error" className="mb-4 mt-4">
            {error}
          </Alert>
        )}

        <div className="mt-[3em] flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center transition-all duration-300 ease-in-out hover:scale-110 hover:text-text2"
          >
            <IoIosArrowDropleft size={25} />
          </button>
          <button
            className="rounded-md bg-text2 px-8 py-2 font-semibold text-white
              transition-all duration-300 ease-in-out hover:scale-105 hover:bg-opacity-90 hover:shadow-lg
              active:scale-95 active:transform disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleNext}
            disabled={!selectedCurrency}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default ContributionCurrencyType;
