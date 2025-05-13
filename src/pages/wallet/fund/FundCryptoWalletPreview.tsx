import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import btcImg from "../../../Assets/svg/dashboard/wallet/btc.svg";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../shared/redux/store";
import { CashwyreOnrampConfirm } from "../../../shared/redux/slices/web3.slices";
import BankTransfer from "../../../components/dashboard/wallet/modal/crypro/modals/BankTransfer";
import ConfirmingPaymentModal from "../../../components/dashboard/wallet/modal/crypro/modals/ConfirmPayment";
import { OrderData, Web3State } from "../../../shared/types/types";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const FundCryptoWalletPreview: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { state } = useLocation();
  const data = (state?.data?.data || {}) as OrderData;
  const network = state?.network || "BTC Lightning";
  const networkValue = state?.networkValue || {};
  const cryptoImg = state?.cryptoImg || btcImg;
  const [showBankModal, setShowBankModal] = React.useState(false);
  const [showLoaderModal, setShowLoaderModal] = React.useState(false);
  const [orderConfirmed, setOrderConfirmed] = React.useState(false);

  const onrampConfirmLoading = useSelector(
    (s: { web3: Web3State }) => s.web3.onrampConfirmLoading,
  );
  const onrampConfirmError = useSelector(
    (s: { web3: Web3State }) => s.web3.onrampConfirmError,
  );
  const onrampConfirmResult = useSelector(
    (s: { web3: Web3State }) => s.web3.onrampConfirmResult,
  );

  const formatCurrency = (value: number, currency = "NGN") =>
    value?.toLocaleString("en-NG", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    });

  const handleBuy = async () => {
    const payload = {
      amount: data.amountInLocalCurrency,
      crypto: data.cryptoAsset,
      network: networkValue,
      reference: data.reference,
      transactionReference: data.transactionReference,
    };

    try {
      await dispatch(CashwyreOnrampConfirm({ body: payload })).unwrap();
      setOrderConfirmed(true);
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  const handleViewBankDetails = () => {
    if (onrampConfirmResult && onrampConfirmResult.bankName) {
      setShowBankModal(true);
    }
  };

  const handleCloseBankModal = () => {
    setShowBankModal(false);
  };

  const handleConfirmTransfer = () => {
    setShowBankModal(false);
    setShowLoaderModal(true);
    setTimeout(() => {
      setShowLoaderModal(false);
      navigate("/dashboard/wallet/fund/success", {
        state: { data: { data } },
      });
    }, 3000);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <main className="mb-8 mt-0 lg:mt-8">
      <DashboardHeader className=" relative flex items-center justify-center text-2xl tracking-wide md:text-3xl lg:text-xl">
        <IoIosArrowBack
          onClick={handleBackClick}
          size={25}
          className="absolute left-2 top-1/2 -translate-y-1/2 transform cursor-pointer lg:left-7"
        />
        Fund Wallet
      </DashboardHeader>
      <section className="relative mx-auto mt-6 w-full px-2">
        <div className="mt-4 flex flex-col items-center">
          <h2 className="mb-2 text-center text-lg font-semibold">
            Confirm {(data.cryptoAsset || "crypto").toUpperCase()} order
          </h2>
          <img
            src={cryptoImg}
            alt={data.cryptoAsset || "crypto"}
            className="mb-2 h-[121px] w-[121px]"
          />

          <div className="my-3 text-3xl font-bold text-text2">
            {data.amountInCryptoAsset}{" "}
            {(data.cryptoAsset || "crypto").toUpperCase()}
          </div>
          <div className="mb-10 text-base text-[#939090] md:text-xl">
            Exchange rate: 1 {(data.cryptoAsset || "crypto").toUpperCase()} ≈{" "}
            {formatCurrency(data.cryptoRate, data.currency)}
          </div>
        </div>
        <div className="space-y-10 text-sm">
          <div className="flex justify-between border-b border-[#C4C0C0] pb-2">
            <span className="text-base font-medium md:text-xl">
              Deposit amount ({data.currency || "NGN"})
            </span>
            <span className="text:base font-semibold md:text-lg">
              {formatCurrency(data.amountInLocalCurrency, data.currency)}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#C4C0C0] pb-2">
            <span className="text-base font-medium md:text-xl">
              Deposit amount in {(data.cryptoAsset || "crypto").toUpperCase()}
            </span>
            <span className="text:base font-semibold md:text-lg">
              {data.amountInCryptoAsset}{" "}
              {(data.cryptoAsset || "crypto").toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#C4C0C0] pb-2">
            <span className="text-base font-medium md:text-xl">
              Total to receive
            </span>
            <span className="text:base font-semibold md:text-lg">
              {data.amountInCryptoAsset}{" "}
              {(data.cryptoAsset || "crypto").toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#C4C0C0] pb-2">
            <span className="text-xl font-medium">Network</span>
            <span className="text:base font-semibold md:text-lg">
              {network}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-base font-medium md:text-xl">
              Convert type
            </span>
            <span className="text:base font-semibold md:text-lg">Market</span>
          </div>
        </div>

        {onrampConfirmError && (
          <div className="mt-4 text-center text-sm text-red-600">
            {onrampConfirmError}
          </div>
        )}

        {orderConfirmed && onrampConfirmResult && (
          <div className="mt-4 text-center text-sm text-green-600">
            {onrampConfirmResult.message || "Order confirmed!"}
          </div>
        )}

        {!orderConfirmed ? (
          <div className="mt-10 flex items-center justify-between">
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
              onClick={handleBuy}
              disabled={onrampConfirmLoading}
            >
              {onrampConfirmLoading ? "Processing..." : "Buy"}
            </button>
          </div>
        ) : (
          <button
            className="mt-8 w-full rounded bg-green-600 py-3 text-lg font-semibold text-white"
            onClick={handleViewBankDetails}
          >
            View Bank Transfer Details
          </button>
        )}
      </section>

      {onrampConfirmResult && (
        <BankTransfer
          isOpen={showBankModal}
          onClose={handleCloseBankModal}
          onConfirm={handleConfirmTransfer}
          bankName={onrampConfirmResult.bankName}
          accountName={onrampConfirmResult.accountName}
          accountNumber={onrampConfirmResult.accountNumber}
          fiatAmount={
            data.amountInLocalCurrency || onrampConfirmResult.fiatAmount
          }
        />
      )}

      <ConfirmingPaymentModal
        isOpen={showLoaderModal}
        onClose={() => setShowLoaderModal(false)}
      />
    </main>
  );
};

export default FundCryptoWalletPreview;
