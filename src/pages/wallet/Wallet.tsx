import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DashboardHeader } from "../../components/common/DashboardHeader";
import { Button, Typography } from "@material-tailwind/react";
import { FundIcon, WithdrawIcon } from "../../Assets/svg";
import History from "../../components/dashboard/wallet/TransactionHistory/History";
import { formatBalance } from "../../shared/utils/format";
import BalanceDisplay from "../../components/dashboard/contribution/balanceDisplay/balanceDisplay";
import { useWallet } from "../../shared/Hooks/useUserProfile";

const Wallet = () => {
  const navigate = useNavigate();
  const { walletBalance, isLoading } = useWallet();

  const [isWalletVisible, setIsWalletVisible] = useState<boolean>(() => {
    const saved = sessionStorage.getItem("walletBalanceVisible");
    return saved ? JSON.parse(saved) : true;
  });

  const switchToCrypto = () => {
    navigate("/dashboard/wallet/crypto_wallet");
  };

  const formatCurrency = (amount: number | undefined) => {
    return amount ? formatBalance(amount) : "₦0.00";
  };

  return (
    <main>
      <div className="mt-0 lg:mt-8">
        <header>
          <DashboardHeader className="flex items-center justify-center text-2xl tracking-wide md:text-3xl lg:text-xl">
            Chain Coop Wallet
          </DashboardHeader>
        </header>
        <div>
          <section className="mt-9 text-center text-text4">
            <div className="rounded-3xl border-[2px] border-gray-200 bg-white p-8 shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A] sm:p-16">
              <BalanceDisplay
                title="Naira Wallet Balance"
                balance={walletBalance?.balance}
                isLoading={isLoading}
                isVisible={isWalletVisible}
                onToggle={(newVisibility) => {
                  setIsWalletVisible(newVisibility);
                  sessionStorage.setItem(
                    "walletBalanceVisible",
                    newVisibility.toString(),
                  );
                }}
                formatCurrency={formatCurrency}
                className="w-60"
              />
            </div>
          </section>

          <section className="my-8 rounded-3xl border-[1px] border-gray-300 px-4 shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A]">
            <div className="flex items-center justify-between gap-4 px-3 py-8 font-semibold text-howtext sm:gap-8 lg:px-10">
              <Link
                to="/dashboard/wallet/withdraw"
                state={{ walletType: "naira" }}
              >
                <div className="flex cursor-pointer flex-col items-center bg-inherit text-center">
                  <WithdrawIcon />
                  <span className="block text-sm text-memt1 sm:text-base lg:text-lg">
                    Withdraw
                  </span>
                </div>
              </Link>

              <Link to="/dashboard/wallet/fund">
                <button className="flex flex-col items-center bg-inherit text-center">
                  <FundIcon />
                  <span className="block text-sm text-memt1 sm:text-base lg:text-lg">
                    Fund Wallet
                  </span>
                </button>
              </Link>
            </div>
          </section>

          <History />
        </div>
      </div>
    </main>
  );
};

export default Wallet;
