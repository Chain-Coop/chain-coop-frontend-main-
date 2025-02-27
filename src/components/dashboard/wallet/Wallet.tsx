import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useWalletBalance from "../../../shared/Hooks/useBalance";
import ToggleButton from "../../../shared/utils/ToggleButton";
import History from "./TransactionHistory/History";
import { DashboardHeader } from "../../common/DashboardHeader";
import { motion } from "framer-motion";
import { FundIcon, WithdrawIcon } from "../../../Assets/svg";

const Wallet = () => {
  const { isWalletVisible, setIsWalletVisible, formattedBalance } =
    useWalletBalance();
  const navigate = useNavigate();

  const withdraw = () => {
    navigate("/dashboard/wallet/withdraw");
  };

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
        <div>
          <section className="text-center text-text4">
            <div className="flex justify-end px-5 py-[1.5em]">
              <button
                onClick={switchToCrypto}
                className="flex w-auto transform items-center gap-2 rounded-lg bg-[#29004D] px-4 py-2 font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 sm:px-6 sm:py-3 lg:py-2"
              >
                Switch to Crypto Wallet
              </button>
            </div>

            <div className="mt-6 rounded-3xl border-[2px] border-gray-200 bg-white p-8 shadow-md sm:p-16">
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

          <section className="mx-auto mt-6 rounded-3xl px-4 shadow-md">
            <div className="flex items-center justify-between gap-4 px-3 py-8 font-semibold text-howtext sm:gap-8 lg:px-10">
              <Link to="/dashboard/wallet/withdraw">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex cursor-pointer flex-col items-center bg-inherit text-center"
                >
                  <WithdrawIcon />
                  <span className="block text-sm text-memt1 sm:text-base lg:text-lg">
                    Withdraw
                  </span>
                </motion.div>
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

          <section className="py-[1.5em]">
            <History />
          </section>
        </div>
      </div>
    </main>
  );
};

export default Wallet;
