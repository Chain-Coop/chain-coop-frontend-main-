import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import btcImg from "../../../Assets/svg/dashboard/wallet/btc.svg";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import { OrderData } from "../../../shared/types/types";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const WithdrawCryptoPreview: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const data = (state?.data?.data || {}) as OrderData;
  const network = state?.network || "BTC Lightning";
  const networkValue = state?.networkValue || {};
  const [isProcessing, setIsProcessing] = useState(false);

  // Formatters
  const formatCurrency = (value: number, currency = "NGN") =>
    value?.toLocaleString("en-NG", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    });

  const handleWithdraw = () => {
    setIsProcessing(true);

    // Simply navigate to the bank selection page with the data
    navigate("/dashboard/wallet/select-bank", {
      state: {
        data: {
          data: {
            amountInCryptoAsset: data.amountInCryptoAsset,
            cryptoAsset: data.cryptoAsset,
            currency: data.currency,
            network: networkValue,
            reference: data.reference,
            transactionReference: data.transactionReference,
            amountInLocalCurrency: data.amountInLocalCurrency,
            cryptoRate: data.cryptoRate,
          },
        },
        network,
        networkValue,
      },
    });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <main className="mt-0 lg:mt-8">
      <DashboardHeader className=" relative flex items-center justify-center text-2xl tracking-wide md:text-3xl lg:text-xl">
        <IoIosArrowBack
          onClick={handleBackClick}
          size={25}
          className="absolute left-2 top-1/2 -translate-y-1/2 transform cursor-pointer lg:left-7"
        />
        Withdraw Crypto
      </DashboardHeader>
      <section className="relative mx-auto mt-6 w-full px-2">
        <div className="mt-4 flex flex-col items-center">
          <h2 className="mb-2 text-center text-lg font-semibold">
            Confirm {(data.cryptoAsset || "crypto").toUpperCase()} withdrawal
          </h2>
          <div className="flex h-[121px] w-[121px] items-center justify-center rounded-full bg-[#F9D68A]">
            <img
              src={btcImg}
              alt={data.cryptoAsset || "crypto"}
              className="mb-2 h-16 w-16"
            />
          </div>

          <div className="my-3 text-3xl font-bold text-text2">
            {data.amountInCryptoAsset}{" "}
            {(data.cryptoAsset || "crypto").toUpperCase()}
          </div>
          <div className="mb-10 text-xl text-[#939090]">
            Exchange rate: 1 {(data.cryptoAsset || "crypto").toUpperCase()} ≈{" "}
            {formatCurrency(data.cryptoRate, data.currency)}
          </div>
        </div>
        <div className="space-y-10 text-sm">
          <div className="flex justify-between border-b border-[#C4C0C0] pb-2">
            <span className="text-xl font-medium">
              Withdrawal amount ({data.currency || "NGN"})
            </span>
            <span className="text-lg font-semibold">
              {formatCurrency(data.amountInLocalCurrency)}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#C4C0C0] pb-2">
            <span className="text-xl font-medium">
              Withdrawal amount in{" "}
              {(data.cryptoAsset || "crypto").toUpperCase()}
            </span>
            <span className="text-lg font-semibold">
              {data.amountInCryptoAsset}{" "}
              {(data.cryptoAsset || "crypto").toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#C4C0C0] pb-2">
            <span className="text-xl font-medium">Total to receive</span>
            <span className="text-lg font-semibold">
              {formatCurrency(data.amountInLocalCurrency)}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#C4C0C0] pb-2">
            <span className="text-xl font-medium">Network</span>
            <span className="text-lg font-semibold">{network}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xl font-medium">Convert type</span>
            <span className="text-lg font-semibold">Market</span>
          </div>
        </div>

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
              active:scale-95 active:transform"
            onClick={handleWithdraw}
          >
            Withdraw
          </button>
        </div>
      </section>
    </main>
  );
};

export default WithdrawCryptoPreview;
