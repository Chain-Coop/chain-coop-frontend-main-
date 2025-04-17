import { IoIosArrowDropleft } from "react-icons/io";
import { Button } from "@material-tailwind/react";
import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import { useLocation, useNavigate } from "react-router-dom";
import cryptoSavings from "../../../../Assets/png/dashboard/cryptSavings.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../shared/redux/store";
import { CreatePool } from "../../../../shared/redux/slices/web3.slices";
//import Pin from "../../../../components/dashboard/contribution/modals/Pin";
import PinModal from "../../../../components/common/PinModal";
import PaymentWithCard from "../../../../components/dashboard/contribution/paymentChoice/PaymentWithCard";
import ConnectWallet from "../../../../components/dashboard/contribution/modals/ConnectWallet";
import { toast } from "react-toastify";

const PreviewSavings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const formData = location.state || {};
  const { lockedType } = formData;

  const [showPinModal, setShowPinModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const conversionRate = 1549.43;

  const handlePay = () => {
    if (formData.fundSource === "Internal Crypto Wallet") {
      setShowPinModal(true);
    } else if (formData.fundSource === "External Crypto Wallet") {
      setShowConnectWalletModal(true);
    } else {
      console.log("Invalid payment method selected.");
    }
  };

  const handlePinSubmit = (formData: any) => {
    const {
      interestRate,
      pin,
      tokenEquivalent,
      tokenName,
      nairaEquivalent,
      description,
      fundSource,
      savingFrequency,
      selectedSource,
      currency,
      startDate,
      duration,
      goalAmount,
      initialSaveAmount,
      ...payload
    } = formData;

    const durationInDays = Math.ceil(
      (new Date(duration).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24),
    );

    const finalPayload = {
      ...payload,
      tokenId: formData.tokenId,
      initialSaveAmount,
      reasonForSaving: formData.reasonForSaving,
      duration: durationInDays,
      lockedType,
    };

    //console.log("Payload being sent to the backend:", finalPayload);
    //console.log("Final Payload:", JSON.stringify(finalPayload));

    setLoading(true);

    dispatch(CreatePool(finalPayload))
      .unwrap()
      .then((response) => {
        console.log("Pool created successfully:", response);
        setShowPinModal(false);
        toast.success("Savings pool created successfully!");
        navigate("/dashboard/contribution/main/crypto_contribution");
      })
      .catch((error) => {
        console.error("Error creating pool:", error);
        toast.error(
          error.message
            ? `Failed to create savings pool: ${error.message}`
            : "Failed to create savings pool. Please try again.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleConnectWallet = () => {
    console.log("Wallet connected successfully!");
    setShowConnectWalletModal(false);
  };

  const nairaEquivalent =
    formData.initialSaveAmount &&
    parseFloat(formData.initialSaveAmount) * conversionRate;
  const tokenEquivalent =
    formData.amount && parseFloat(formData.amount) / conversionRate;

  return (
    <main className="pb-[1.5em] ">
      {/* Header */}
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Preview Savings
      </DashboardHeader>

      <div className="m-auto flex w-[90%] flex-col">
        {/* Title and Description */}
        <header className="mt-[1.5em] lg:mt-[3em]">
          <h1 className="text-center text-2xl font-bold">
            Flexible Savings Preview
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
              <p className="text-lg font-bold text-black">
                {formData.reasonForSaving}
              </p>
            </div>
          </div>

          {/* Interest Rate */}
          <section className="flex w-full flex-col gap-2 md:flex-row md:gap-5">
            <div className="flex items-center gap-1 md:gap-2">
              <h2 className="text-sm font-semibold text-gray-500">
                Interest Rate:
              </h2>
              <p className="text-sm font-bold text-green-500 md:text-lg">
                {formData.interestRate || "0.4%"}
              </p>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <h2 className="text-sm font-semibold text-gray-500">
                Withdrawal Day:
              </h2>
              <p className="text-sm font-bold md:text-lg">
                {formData.duration}
              </p>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-2">
            {/* Token */}
            <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
              <h2 className="text-sm font-semibold text-gray-500">Token</h2>
              <p className="font-bold">{formData.tokenName}</p>
            </div>

            {formData.deductionOption === "naira" ? (
              <>
                {/* Naira Amount */}
                <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
                  <h2 className="text-sm font-semibold text-gray-500">
                    Deposit Amount (NGN)
                  </h2>
                  <p className="font-bold">{formData.amount}</p>
                </div>

                {/* Token Equivalent */}
                <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
                  <h2 className="text-sm font-semibold text-gray-500">
                    Token Value
                  </h2>
                  <p className="font-bold">
                    {tokenEquivalent?.toFixed(2)} Lisk
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
                  <p className="font-bold">{formData.initialSaveAmount}</p>
                </div>

                {/* Naira Equivalent */}
                <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
                  <h2 className="text-sm font-semibold text-gray-500">
                    Deposit Amount (NGN)
                  </h2>
                  <p className="font-bold">{nairaEquivalent?.toFixed(2)} NGN</p>
                </div>
              </>
            )}

            {/* Saving Frequency */}
            <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
              <h2 className="text-sm font-semibold text-gray-500">
                Saving Frequency
              </h2>
              <p className="font-bold">{formData.savingFrequency}</p>
            </div>

            <div className="hidden h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
              <h2 className="text-sm font-semibold text-gray-500">
                Goal Amount
              </h2>
              <p className="font-bold">{formData.goalAmount}</p>
            </div>

            {/* Start Date */}
            <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
              <h2 className="text-sm font-semibold text-gray-500">
                Start Date
              </h2>
              <p className="font-bold">{formData.startDate}</p>
            </div>

            {/* End Date*/}
            <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
              <h2 className="text-sm font-semibold text-gray-500">End Date</h2>
              <p className="font-bold">{formData.duration}</p>
            </div>

            {/* Fund Source */}
            <div className="h-[83px] w-full rounded-lg bg-[#ECE6F242] p-4 md:w-[210px] md:p-2">
              <h2 className="text-sm font-semibold text-gray-500">
                Fund Source
              </h2>
              <p className=" font-bold">{formData.fundSource}</p>
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
            variant="filled"
            color="blue"
            onClick={handlePay}
            disabled={loading}
            className="flex justify-center rounded-md bg-text2
    px-8 py-[1em] font-semibold
    text-white transition-all duration-300
    ease-in-out hover:scale-105 hover:bg-opacity-90 hover:shadow-lg active:scale-95 active:transform"
          >
            {loading ? "Processing..." : "Pay"}
          </Button>
        </div>
      </div>

      {/* PIN Modal */}
      {showPinModal && (
        <PinModal
          isOpen={showPinModal}
          onClose={() => setShowPinModal(false)}
          onSubmit={() => handlePinSubmit({ ...formData })}
          header="Enter Your Pin"
          title="Please enter your 4-digit transaction pin to proceed."
          loading={loading}
          error={error}
          pin={pin}
          onPinChange={setPin}
        />
      )}

      {/* PaymentWithCard Modal */}
      {showPaymentModal && (
        <PaymentWithCard
          contributionData={{
            contributionId: formData.contributionId || "",
            withdrawalDate: formData.endDate || undefined,
          }}
          onClose={() => setShowPaymentModal(false)}
          isOpen={showPaymentModal}
        />
      )}

      {/* Connect Wallet Modal */}
      {showConnectWalletModal && (
        <ConnectWallet
          isOpen={showConnectWalletModal}
          onClose={() => setShowConnectWalletModal(false)}
          onConnect={handleConnectWallet}
        />
      )}
    </main>
  );
};

export default PreviewSavings;
