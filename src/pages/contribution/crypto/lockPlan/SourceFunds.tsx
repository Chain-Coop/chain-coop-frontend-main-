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
  const [deductionOption, setDeductionOption] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleNext = () => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }

    navigate("/dashboard/contribution/lock/preview_savings", {
      state: {
        ...formData,
        selectedSource,
        amount,
        tokenAmount,
        deductionOption,
        fundSource:
          selectedSource === "debit-card"
            ? "Debit Card"
            : "Internal Crypto Wallet",
      },
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
            <option value="debit-card">Debit Card</option>
          </select>
          {selectedSource === "internal-wallet" && (
            <p className="text-sm text-red-500">
              Funds will automatically be deducted from your chain co-op crypto
              wallet.
            </p>
          )}
        </div>

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

        {selectedSource === "debit-card" && (
          <div className="mt-[2.5em]">
            <h2 className="mb-3 text-lg font-semibold text-memt1">
              How do you prefer to deduct your lock fund?
            </h2>
            <div className="flex flex-col gap-4 rounded-lg border-[2px] border-solid border-gray-300 px-4 py-4">
              <p>Choose Option</p>
              {/* Option 1 */}
              <div>
                <input
                  type="radio"
                  id="deduct-naira"
                  name="deduction-option"
                  className="mr-3"
                  value="naira"
                  checked={deductionOption === "naira"}
                  onChange={() => {
                    setDeductionOption("naira");
                    setTokenAmount("");
                  }}
                />
                <label htmlFor="deduct-naira" className="font-medium">
                  Deduct Naira worth of Lisk monthly
                </label>
                <p className="mt-2 text-sm text-gray-500">
                  Naira worth of current token rate value will be deducted but
                  the naira amount is not fixed.
                </p>
              </div>

              {/* Option 2 */}
              <div>
                <input
                  type="radio"
                  id="deduct-tokens"
                  name="deduction-option"
                  className="mr-3"
                  value="tokens"
                  checked={deductionOption === "tokens"}
                  onChange={() => {
                    setDeductionOption("tokens");
                    setAmount("");
                  }}
                />
                <label htmlFor="deduct-tokens" className="font-medium">
                  Deduct only in tokens monthly
                </label>
                <p className="mt-2 text-sm text-gray-500">
                  Naira worth of current token rate value will be deducted but
                  the naira amount is not fixed.
                </p>
              </div>
            </div>

            {/* Conditional Inputs for Debit Card */}
            {deductionOption === "naira" && (
              <div className="mt-[2.5em]">
                <label
                  htmlFor="amount"
                  className="mb-3 flex text-lg font-semibold text-memt1"
                >
                  Enter Amount (NGN)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g., 200,000"
                  className="input mb-2 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
                />
                <p className="text-sm text-gray-500">
                  1 Lisk equivalent rate = 1549.43 NGN
                </p>
              </div>
            )}

            {deductionOption === "tokens" && (
              <div className="mt-[2.5em]">
                <label
                  htmlFor="tokenAmount"
                  className="mb-3 flex text-lg font-semibold text-memt1"
                >
                  Enter Token Amount
                </label>
                <input
                  type="text"
                  id="tokenAmount"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                  placeholder="e.g., Lk 10"
                  className="input mb-2 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
                />
              </div>
            )}
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
            onClick={handleNext}
            disabled={!termsAccepted || (!tokenAmount && !amount)}
            className={`flex justify-center rounded-md ${
              !termsAccepted || (!tokenAmount && !amount)
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
