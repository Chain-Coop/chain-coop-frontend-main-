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

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handlePreview = () => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }

    const lockValue = selectedOption === "naira" ? amount : tokenAmount;

    navigate("/dashboard/contribution/strict_lock/preview_savings", {
      state: {
        ...formData,
        selectedOption,
        amount,
        tokenAmount,
        lockValue,
        fundSource: "Debit Card",
      },
    });
  };
  return (
    <main className="pb-[1.5em] font-sans">
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
          <select className="input mb-5 h-[4em] w-full rounded-lg border-[2px] border-gray-300 bg-white px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2">
            <option value="debit-card">Debit Card</option>
          </select>
        </div>

        {/* Deduction Options */}
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
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <label htmlFor="deduct-naira" className="font-medium">
                Deduct Naira worth of Lisk monthly
              </label>
              <p className="mt-2 text-sm text-gray-500">
                Naira worth of current token rate value will be deducted but the
                naira amount is not fixed.
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
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <label htmlFor="deduct-tokens" className="font-medium">
                Deduct only in tokens monthly
              </label>
              <p className="mt-2 text-sm text-gray-500">
                Naira worth of current token rate value will be deducted but the
                naira amount is not fixed.
              </p>
            </div>
          </div>
        </div>

        {selectedOption === "naira" && (
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
            <p className="mt-2 text-sm text-gray-500">
              Note: Lisk token will be added to your savings based on the
              current rate.
            </p>
          </div>
        )}

        {selectedOption === "tokens" && (
          <div className="mt-[2.5em]">
            <label
              htmlFor="tokenAmount"
              className="mb-3 flex text-lg font-semibold text-memt1"
            >
              Deposit Amount (Token)
            </label>
            <input
              type="text"
              id="tokenAmount"
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              placeholder="e.g., LK 2"
              className="input mb-2 h-[4em] w-full rounded-lg border-[2px] border-gray-300 px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
            <p className="text-sm text-green-500">
              1 Lisk equivalent rate = 1549.43 NGN
            </p>
            <p className="mt-2 text-sm text-gray-500">
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
            disabled={
              !selectedOption ||
              (selectedOption === "naira" && !amount) ||
              (selectedOption === "tokens" && !tokenAmount) ||
              !termsAccepted
            }
            className={`flex justify-center rounded-md ${
              !selectedOption || !termsAccepted
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
