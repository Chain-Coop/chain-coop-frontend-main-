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
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handlePreview = () => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }

    navigate("/dashboard/contribution/strict_lock/preview_savings", {
      state: {
        ...formData,
        selectedSource,
        tokenAmount,
        fundSource:
          selectedSource === "external-wallet"
            ? "External Crypto Wallet"
            : "Internal Crypto Wallet",
      },
    });
  };

  return (
    <main className="pb-[1.5em] ">
      {/* Header */}
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Strict Lock Savings
      </DashboardHeader>

      <div className="m-auto w-[90%]">
        {/* Title and Description */}
        <header className="mt-[1.5em] lg:mt-[3em]">
          <h1 className="text-2xl font-bold">Strict Lock Savings</h1>
          <p className="mt-[1em] font-medium">
            You can save one-time and withdrawal will be locked until saving
            duration is complete
          </p>
        </header>

        {/* Image Section */}
        <section className="mt-[2.5em] flex justify-center">
          <div>
            <img src={cryptoSavings} alt="savings-img" />
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
            className="input mb-5 h-[4em] w-full rounded-lg border-[2px] border-gray-300 bg-white px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
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
              placeholder="e.g., LK 10"
              className="input mb-2 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
            <p className="text-sm text-gray-500">
              Note: Lisk token will be added to your savings based on the
              current rate.
            </p>
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
              placeholder="e.g., LK 10"
              className="input mb-2 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
            <p className="text-sm text-gray-500">
              Note: Lisk token will be added to your savings based on the
              current rate.
            </p>
          </div>
        )}

        {/* Terms and Conditions */}
        <div className="mt-[2.5em]">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-5 w-5"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <span className="text-sm text-gray-500">
              I accept that this strict lock <strong>CANNOT</strong> be broken
              until the end date duration is complete once created.
            </span>
          </label>
        </div>

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
            onClick={handlePreview}
            disabled={!tokenAmount || !termsAccepted}
            className={`flex justify-center rounded-md ${
              !tokenAmount || !termsAccepted
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
