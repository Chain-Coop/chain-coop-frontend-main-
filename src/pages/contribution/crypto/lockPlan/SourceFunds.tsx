import { IoIosArrowDropleft } from "react-icons/io";
import { Button } from "@material-tailwind/react";
import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import { useLocation, useNavigate } from "react-router-dom";
import cryptoSavings from "../../../../Assets/png/dashboard/cryptSavings.png";
import { useState } from "react";

const SourceFunds = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state || {};

  const [selectedSource, setSelectedSource] =
    useState<string>("internal-wallet");
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleNext = () => {
    if (!tokenAmount) {
      setError("Please enter a valid token amount.");
      return;
    }

    setError("");

    const updatedFormData = {
      ...formData,
      selectedSource,
      tokenAmount,
      fundSource:
        selectedSource === "external-wallet"
          ? "External Crypto Wallet"
          : "Internal Crypto Wallet",
    };

    navigate("/dashboard/contribution/lock/preview_savings", {
      state: updatedFormData,
    });
  };

  return (
    <main className="pb-[1.5em] font-sans">
      {/* Header */}
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Lock Savings
      </DashboardHeader>

      <div className="m-auto w-[90%]">
        {/* Title and Description */}
        <header className="mt-[1.5em] lg:mt-[3em]">
          <h1 className="text-center text-2xl font-bold">Lock Savings</h1>
          <p className="mt-[1em] text-center font-medium">
            You are about to save in Lisk token cryptocurrency
          </p>
        </header>

        {/* Image Section */}
        <section className="mt-[2.5em] flex justify-center">
          <div>
            <img
              src={cryptoSavings}
              alt="savings-img"
              className="h-auto w-[100px]"
            />
          </div>
        </section>

        {/* Source of Funds */}
        <div className="mt-[2.5em]">
          <label className="mb-3 flex text-lg font-semibold text-memt1">
            Source of Funds
          </label>
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="input mb-2 h-[4em] w-full rounded-lg border-[2px] border-gray-300 bg-white px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
          >
            <option value="internal-wallet">Internal Crypto Wallet</option>
            <option value="external-wallet">External Crypto Wallet</option>
          </select>
          {selectedSource === "internal-wallet" && (
            <p className="text-sm text-red-500">
              Funds will automatically be deducted from your chain co-op crypto
              wallet.
            </p>
          )}
        </div>

        {/* Internal Crypto Wallet */}
        {selectedSource === "internal-wallet" && (
          <div className="mt-[2.5em]">
            <label
              htmlFor="internalTokenAmount"
              className="mb-3 flex text-lg font-semibold text-memt1"
            >
              Deposit Amount (Token)
            </label>
            <input
              type="text"
              id="internalTokenAmount"
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              placeholder="e.g., Lk 10"
              className="input mb-2 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>
        )}

        {/* External Crypto Wallet */}
        {selectedSource === "external-wallet" && (
          <div className="mt-[2.5em]">
            <label
              htmlFor="externalTokenAmount"
              className="mb-3 flex text-lg font-semibold text-memt1"
            >
              Deposit Amount (Token)
            </label>
            <input
              type="text"
              id="externalTokenAmount"
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              placeholder="e.g., Lk 10"
              className="input mb-2 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="mt-2 text-sm font-semibold text-red-500">{error}</p>
        )}

        {/* Navigation Buttons */}
        <div className="mt-[3em] flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center transition-transform duration-300 hover:scale-110"
          >
            <IoIosArrowDropleft size={25} />
          </button>
          <Button
            variant="text"
            onClick={handleNext}
            className={`flex justify-center rounded-md ${
              !tokenAmount
                ? "cursor-not-allowed bg-gray-400"
                : "bg-text2 hover:scale-105 hover:bg-opacity-90 hover:shadow-lg active:scale-95"
            } px-8 py-[1em] font-semibold text-white transition-all duration-300 ease-in-out`}
          >
            Preview
          </Button>
        </div>
      </div>
    </main>
  );
};

export default SourceFunds;
