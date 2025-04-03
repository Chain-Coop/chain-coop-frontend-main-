import { IoIosArrowDropleft } from "react-icons/io";
import { Button } from "@material-tailwind/react";
import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import { useLocation, useNavigate } from "react-router-dom";
import cryptoSavings from "../../../../Assets/png/dashboard/cryptSavings.png";
import { useState } from "react";
import Pin from "../../../../components/dashboard/contribution/modals/Pin";
import PaymentWithCard from "../../../../components/dashboard/contribution/paymentChoice/PaymentWithCard";

const PreviewSavings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state || {};

  const [showPinModal, setShowPinModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pin, setPin] = useState("");

  const conversionRate = 1549.43;

  const handlePay = () => {
    if (formData.fundSource === "Internal Crypto Wallet") {
      setShowPinModal(true);
    } else if (formData.fundSource === "Debit Card") {
      setShowPaymentModal(true);
    } else {
      console.log("Invalid payment method selected.");
    }
  };

  const handlePinSubmit = () => {
    console.log("Entered PIN:", pin);
    setShowPinModal(false);
  };

  const nairaEquivalent =
    formData.tokenAmount && parseFloat(formData.tokenAmount) * conversionRate;
  const tokenEquivalent =
    formData.amount && parseFloat(formData.amount) / conversionRate;

  return (
    <main className="pb-[1.5em] font-sans">
      {/* Header */}
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Preview Savings
      </DashboardHeader>

      <div className="m-auto flex w-[90%] flex-col">
        {/* Title and Description */}
        <header className="mt-[1.5em] lg:mt-[3em]">
          <h1 className="text-center text-2xl font-bold">
            Lock Savings Preview
          </h1>
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

        {/* Savings Details */}
        <div className="mt-[2.5em] flex w-full flex-col gap-4">
          {/* Title */}
          <div className="flex items-start">
            <div className="flex flex-col items-center text-left">
              <h2 className="text-sm font-semibold text-gray-500">Title</h2>
              <p className="text-lg font-bold">{formData.title}</p>
            </div>
          </div>

          {/* Interest Rate */}
          <section className="flex w-full flex-col gap-2 md:flex-row md:gap-5">
            <div className="flex items-center gap-1 md:gap-2">
              <h2 className="text-sm font-semibold text-gray-500">
                Interest Rate
              </h2>
              <p className="text-sm font-bold text-green-500 md:text-lg">
                {formData.interestRate || "0.4%"}
              </p>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <h2 className="text-sm font-semibold text-gray-500">
                Withdrawal Day:
              </h2>
              <p className="text-sm font-bold md:text-lg">{formData.endDate}</p>
            </div>
          </section>

          <section className="flex flex-wrap gap-5">
            {/* Token */}
            <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
              <h2 className="text-sm font-semibold text-gray-500">Token</h2>
              <p className="text-lg font-bold">
                {formData.cryptoType || "Lisk"}
              </p>
            </div>

            {/* Conditional Rendering Based on Deduction Option */}
            {formData.deductionOption === "naira" ? (
              <>
                {/* Naira Amount */}
                <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
                  <h2 className="text-sm font-semibold text-gray-500">
                    Deposit Amount (NGN)
                  </h2>
                  <p className="text-lg font-bold">
                    {formData.amount || "N/A"}
                  </p>
                </div>

                {/* Token Equivalent */}
                <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
                  <h2 className="text-sm font-semibold text-gray-500">
                    Token Value
                  </h2>
                  <p className="text-lg font-bold">
                    {tokenEquivalent?.toFixed(2) || "N/A"} Lisk
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Token Amount */}
                <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
                  <h2 className="text-sm font-semibold text-gray-500">
                    Deposit Token
                  </h2>
                  <p className="text-lg font-bold">
                    {formData.tokenAmount || "N/A"}
                  </p>
                </div>

                {/* Naira Equivalent */}
                <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
                  <h2 className="text-sm font-semibold text-gray-500">
                    Deposit Amount (NGN)
                  </h2>
                  <p className="text-lg font-bold">
                    {nairaEquivalent?.toFixed(2) || "N/A"} NGN
                  </p>
                </div>
              </>
            )}

            {/* Saving Frequency */}
            <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
              <h2 className="text-sm font-semibold text-gray-500">
                Saving Frequency
              </h2>
              <p className="text-lg font-bold">{formData.savingFrequency}</p>
            </div>

            {/* Start Date */}
            <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
              <h2 className="text-sm font-semibold text-gray-500">
                Start Date
              </h2>
              <p className="text-lg font-bold">{formData.startDate || "N/A"}</p>
            </div>

            {/* End Date*/}
            <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
              <h2 className="text-sm font-semibold text-gray-500">End Date</h2>
              <p className="text-lg font-bold">
                {formData.endDate || "20/07/2025"}
              </p>
            </div>

            {/* Fund Source */}
            <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
              <h2 className="text-sm font-semibold text-gray-500">
                Fund Source
              </h2>
              <p className="text-lg font-bold">
                {formData.fundSource || "N/A"}
              </p>
            </div>
          </section>
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
            onClick={handlePay}
            className="flex justify-center rounded-md bg-text2
              px-8 py-[1em] font-semibold
              text-white transition-all duration-300
              ease-in-out hover:scale-105 hover:bg-opacity-90 hover:shadow-lg active:scale-95 active:transform"
          >
            Pay
          </Button>
        </div>
      </div>

      {/* PIN Modal */}
      {showPinModal && (
        <Pin
          pin={pin}
          setPin={setPin}
          onSubmit={handlePinSubmit}
          onClose={() => setShowPinModal(false)}
        />
      )}

      {/* PaymentWithCard Modal */}
      {showPaymentModal && (
        <PaymentWithCard
          contributionData={{
            contributionId: formData.contributionId || "",
            withdrawalDate: formData.endDate || undefined,
          }}
          onClose={() => setShowPaymentModal(false)} // Close the modal
          isOpen={showPaymentModal} // Control modal visibility
        />
      )}
    </main>
  );
};

export default PreviewSavings;
