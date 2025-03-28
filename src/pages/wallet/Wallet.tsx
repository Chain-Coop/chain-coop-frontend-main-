import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useWalletBalance from "../../shared/Hooks/useBalance";
import { DashboardHeader } from "../../components/common/DashboardHeader";
import { Button, Typography } from "@material-tailwind/react";
import ToggleButton from "../../shared/utils/ToggleButton";
import { FundIcon, WithdrawIcon } from "../../Assets/svg";
import History from "../../components/dashboard/wallet/TransactionHistory/History";

const Wallet = () => {
  const { isWalletVisible, setIsWalletVisible, formattedBalance } =
    useWalletBalance();
  const navigate = useNavigate();

  const switchToCrypto = () => {
    navigate("/dashboard/wallet/crypto_wallet");
  };

  return (
    <main className="font-sans">
      <div className="mt-0 lg:mt-8">
        <header>
          <DashboardHeader className="flex items-center justify-center text-2xl tracking-wide md:text-3xl lg:text-xl">
            Chain Coop Wallet
          </DashboardHeader>
        </header>
        <div className="px-4 lg:px-6">
          <section className="text-center text-text4">
            <div className="flex justify-end py-[1.5em]">
              <Button
                onClick={switchToCrypto}
                variant="outlined"
                className="flex transform items-center rounded-lg border border-text2 normal-case text-text2 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Typography className="text-sm font-medium">
                  Switch to Crypto Wallet
                </Typography>
              </Button>
            </div>

            <div className="rounded-3xl border-[2px] border-gray-200 bg-white p-8 shadow-md sm:p-16">
              <div className="flex justify-center gap-4 font-sans">
                <p className="font-medium">Naira Wallet Balance</p>
                <div>
                  <ToggleButton
                    isVisible={isWalletVisible}
                    onToggle={(newVisibility) => {
                      setIsWalletVisible(newVisibility);
                      sessionStorage.setItem(
                        "walletBalanceVisible",
                        newVisibility.toString(),
                      );
                    }}
                  />
                </div>
              </div>
              <div className="mx-auto mt-6 w-60 rounded-md">
                {isWalletVisible ? (
                  <p className="text-xl font-bold lg:text-xl">
                    {formattedBalance}
                  </p>
                ) : (
                  <p className="text-2xl font-bold">*********</p>
                )}
                <hr className="mt-4 h-px rounded-md bg-howtext" />
              </div>
            </div>
          </section>

          <section className="my-8 rounded-3xl border-[1px] border-gray-300 px-4 shadow-md">
            <div className="flex items-center justify-between gap-4 px-3 py-8 font-semibold text-howtext sm:gap-8 lg:px-10">
              <Link to="/dashboard/wallet/withdraw">
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
