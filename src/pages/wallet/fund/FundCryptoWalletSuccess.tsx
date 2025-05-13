import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import { OrderData } from "../../../shared/types/types";
import success from "../../../Assets/svg/auth/sucess.svg";
import { IoIosArrowBack } from "react-icons/io";
import FundProgressBar from "../../../components/dashboard/wallet/modal/crypro/ProgressBar";

const FundCryptoWalletSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = (location.state?.data?.data || {}) as OrderData;
  const network = location.state?.network || "BTC Lightning";

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard/wallet/crypto_wallet");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <main className="mt-0 mb-8 lg:my-8">
      <DashboardHeader className=" relative flex items-center justify-center text-2xl tracking-wide md:text-3xl lg:text-xl">
        <IoIosArrowBack
          onClick={handleBackClick}
          size={25}
          className="absolute left-2 top-1/2 -translate-y-1/2 transform cursor-pointer lg:left-7"
        />
        Fund Wallet
      </DashboardHeader>

      <FundProgressBar step={3} />

      <section className="relative mx-auto mt-6 w-full px-2">
        <div className="mt-4 flex flex-col items-center">
          <h2 className="mb-2 text-center text-lg font-semibold">
            Transaction Successful
          </h2>
          <div className="flex h-[121px] w-[121px] items-center justify-center rounded-full bg-[#F9F8FA]">
            <img src={success} alt="Success" className="mb-2 h-16 w-16" />
          </div>

          <div className="my-3 text-3xl font-bold text-text2">
            Payment Completed
          </div>
          <div className="mb-10 text-xl text-[#939090]">
            Your wallet will be credited shortly
          </div>
        </div>

        <div className="space-y-10 text-sm">
          <div className="flex justify-between border-b border-[#C4C0C0] pb-2">
            <span className="text-xl font-medium">Amount</span>
            <span className="text-lg font-semibold">
              {data.amountInLocalCurrency} {data.currency}
            </span>
          </div>

          <div className="flex justify-between border-b border-[#C4C0C0] pb-2">
            <span className="text-xl font-medium">Crypto Amount</span>
            <span className="text-lg font-semibold">
              {data.amountInCryptoAsset} {data.cryptoAsset}
            </span>
          </div>

          <div className="flex justify-between border-b border-[#C4C0C0] pb-2">
            <span className="text-xl font-medium">Network</span>
            <span className="text-lg font-semibold">{network}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-xl font-medium">Reference</span>
            <span className="max-w-[200px] truncate text-lg font-semibold text-text2">
              {data.reference}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-xl font-medium">Txt Reference</span>
            <span className="max-w-[200px] truncate text-lg font-semibold text-text2">
              {data.transactionReference}
            </span>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center">
          <div className="text-center text-[#939090]">
            Redirecting to wallet...
          </div>
        </div>
      </section>
    </main>
  );
};

export default FundCryptoWalletSuccess;
