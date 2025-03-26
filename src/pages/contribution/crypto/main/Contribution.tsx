import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Typography } from "@material-tailwind/react";
import { useCryptoWallet } from "../../../../shared/Hooks/useBalance";
import { useAllUserPools } from "../../../../shared/Hooks/useUserProfile";
import { UpdateUserPool } from "../../../../shared/redux/slices/web3.slices";
import { DashboardHeader } from "../../../../components/common/DashboardHeader";
import ToggleButton from "../../../../shared/utils/ToggleButton";
import { ContributionListSkeleton } from "../../../../components/common/Loading";
import { AppDispatch } from "../../../../shared/redux/store";
import { SavingsPlan } from "../../../../components/dashboard/contribution/modals/SavingsPlan";

const CryptoSavings: React.FC = () => {
  const navigate = useNavigate();
  const {
    Balance,
    loading: cryptoBalanceLoading,
    isWalletVisible,
    setIsWalletVisible,
  } = useCryptoWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatePayment, setUpdatePayment] = useState(false);
  const [savingsType, setSavingsType] = useState<"naira" | "crypto">("crypto");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { userPools = [], loading: poolsLoading } = useAllUserPools() || {};
  const [selectedPool, setSelectedPool] = useState<{
    poolId_bytes: string;
    tokenAddressToSaveWith: string;
  } | null>(null);
  const dispatch: AppDispatch = useDispatch();

  const [isContributionVisible, setIsContributionVisible] = useState(() => {
    const storedVisibility = sessionStorage.getItem(
      "contributionBalanceVisible",
    );
    return storedVisibility !== null ? storedVisibility === "true" : true;
  });

  const formatDuration = (durationInSeconds: any) => {
    const daysRemaining = Math.ceil(
      parseInt(durationInSeconds) / (24 * 60 * 60),
    );
    return `Ends in ${daysRemaining} Days`;
  };

  const handleSavingsTypeChange = (type: "naira" | "crypto") => {
    setSavingsType(type);
    if (type === "naira") {
      navigate("/dashboard/contribution");
    }
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleUpdatePaymentModal = (pool?: any) => {
    if (pool) {
      setSelectedPool({
        poolId_bytes: pool.poolIndex,
        tokenAddressToSaveWith: pool.tokenToSaveWith,
      });
    } else {
      setSelectedPool(null);
    }
    setUpdatePayment(!updatePayment);
  };

  const fundContribution = () => {
    navigate("/dashboard/contribution/contribution_curency_type");
  };

  const SubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !selectedPool ||
      !amount ||
      isNaN(Number(amount)) ||
      Number(amount) <= 0
    ) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);
    const body = {
      amount,
      poolId_bytes: selectedPool.poolId_bytes,
      tokenAddressToSaveWith: selectedPool.tokenAddressToSaveWith,
    };

    dispatch(UpdateUserPool(body))
      .unwrap()
      .then(() => {
        setLoading(false);
        toast.success("Payment Updated Successfully");
        toggleUpdatePaymentModal();
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error?.message || "Failed to update payment");
      });
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-full font-sans"
    >
      <DashboardHeader className="flex items-center justify-center text-2xl md:text-3xl lg:mt-[2em] lg:text-xl">
        Contribution Plan
      </DashboardHeader>

      <main>
        <section>
          <article className="text-center text-gray-700">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-3xl border-[2px] border-gray-200 bg-white p-6 shadow-md"
            >
              <div className="mb-4 flex justify-end">
                <button
                  onClick={toggleModal}
                  className="text-md flex transform  items-center gap-2 rounded-lg border-[3px] border-gray-200 bg-[#E3D9E6] px-3 py-2 font-semibold normal-case text-text2 transition-all duration-300
                  hover:scale-105 active:scale-95"
                >
                  Crypto Savings
                  <IoIosArrowDown />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 sm:gap-4">
                <p className="text-xs font-medium sm:text-sm lg:text-base">
                  Total Contribution Balance
                </p>
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

              <div className="mt-4 w-full rounded-md sm:mt-6">
                {cryptoBalanceLoading ? (
                  <div className="h-6 animate-pulse rounded bg-gray-200 sm:h-8"></div>
                ) : isContributionVisible ? (
                  <p className="text-xl font-bold lg:text-2xl">${Balance}</p>
                ) : (
                  <p className="text-lg font-bold sm:text-xl">*********</p>
                )}
                <hr className="mt-[1em] h-[1px] rounded-md bg-howtext" />
              </div>
            </motion.div>

            <section className="mt-6 lg:mt-8">
              <div className="grid w-[80%] grid-cols-1 gap-4 md:grid-cols-2">
                <Link to="/dashboard/contribution/flexible/crypto_purpose">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-full border-[3px] border-gray-300 bg-inherit px-2 py-2 text-base font-semibold text-memt1 shadow-lg transition-all hover:bg-gray-50 md:px-4 md:py-3 md:text-lg"
                  >
                    Flexible Savings
                  </motion.button>
                </Link>

                <Link to="/dashboard/contribution/strict_lock/crypto_purpose">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-full border-[3px] border-gray-300 bg-inherit px-2 py-2 text-base font-semibold text-memt1 shadow-lg transition-all hover:bg-gray-50 md:px-4 md:py-3 md:text-lg"
                  >
                    Strict Lock Savings
                  </motion.button>
                </Link>
              </div>
              <hr className="mx-auto mt-8 w-full max-w-2xl" />
            </section>
          </article>
        </section>

        <section className="mt-6 w-full sm:mt-8 lg:mt-10">
          <header>
            <h1 className="text-lg font-bold sm:text-xl lg:text-2xl">
              My Savings
            </h1>
          </header>

          {poolsLoading ? (
            <ContributionListSkeleton />
          ) : userPools?.length > 0 ? (
            <div className="p3 mt-4 flex h-auto flex-col gap-3 rounded-lg bg-text2 text-center sm:mt-6 sm:gap-4">
              {userPools?.map((pools: any) => (
                <motion.div
                  key={pools.poolIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  className="mx-auto flex w-full max-w-3xl cursor-pointer flex-col gap-2 rounded-2xl border border-gray-300 bg-white p-3 transition-all hover:bg-gray-50 sm:gap-3 sm:p-4"
                >
                  <div className="flex justify-between text-xs font-medium text-gray-500 sm:text-sm">
                    <p>Savings Token: {pools?.symbol}</p>
                    <p>Target Amount: ${pools?.goalAmount}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold sm:text-base">
                      {pools?.Reason}
                    </p>
                    <p className="text-sm font-semibold sm:text-base">
                      Deposited Amount:{" "}
                      <span className="font-bold text-text2">
                        ${pools?.amountSaved}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">
                      Duration:{" "}
                      <span className="text-gray-500">
                        {formatDuration(pools?.Duration)}
                      </span>
                    </p>
                    <p className="text-xs font-semibold sm:text-sm">
                      Current Balance:{" "}
                      <span className="text-gray-800">
                        ${pools?.amountSaved}
                      </span>
                    </p>
                  </div>

                  <hr className="my-1" />

                  <div className="flex justify-between">
                    <div className="flex gap-2 sm:gap-3">
                      <button className="rounded-lg border border-text2 px-2 py-1 text-xs font-semibold text-text2 transition-all hover:scale-105 active:scale-95 sm:px-3 sm:text-sm">
                        Withdraw
                      </button>
                      <button
                        onClick={() => toggleUpdatePaymentModal(pools)}
                        className="rounded-lg bg-[#ECE6F2] px-2 py-1 text-xs font-semibold text-text2 transition-all hover:scale-105 active:scale-95 sm:px-3 sm:text-sm"
                      >
                        Update
                      </button>
                    </div>
                    <button className="rounded-lg bg-[#ECE6F2] px-2 py-1 text-xs font-semibold text-text2 transition-all hover:scale-105 active:scale-95 sm:px-3 sm:text-sm">
                      Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 mt-4 flex h-[12em] w-full flex-col items-center justify-center gap-4 rounded-lg bg-text2 p-6 text-center md:mt-6 md:p-8"
            >
              <Typography
                variant="h2"
                className="text-xl font-bold text-how1 md:text-2xl"
              >
                No Savings Yet
              </Typography>
            </motion.div>
          )}
        </section>
      </main>

      <SavingsPlan
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        savingsType={savingsType}
        onSavingsTypeChange={handleSavingsTypeChange}
      />
      {/* 
      <Modal
        isOpen={updatePayment}
        onClose={toggleUpdatePaymentModal}
        className="bg-white"
      >
        <div className="max-w-[28em] px-4 py-5 sm:px-6">
          <header>
            <h1 className="text-center text-2xl font-bold text-text2 sm:text-lg">
              Update Payment
            </h1>
          </header>
          <article>
            <p className="text-center font-medium">
              The deposit amount will be credited manually from your crypto
              wallet.
            </p>
          </article>
          <form action="">
            <div className="mt-[1.5em]">
              <label htmlFor="email" className="mb-3 flex text-text2">
                Enter Amount
              </label>
              <input
                type="amount"
                id="amount"
                disabled={loading}
                required
                placeholder="enter your amount"
                onChange={(e) => setAmount(e.target.value)}
                className="input mb-5 h-[4em] w-full rounded-2xl border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
              />
            </div>

            <div className="mt-[1.5em] flex justify-center">
              <button
                onClick={SubmitPayment}
                disabled={loading}
                className="flex w-full transform items-center justify-center gap-2 rounded-lg bg-text2 px-9 py-2 text-center font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <div className="flex items-center justify-center text-center">
                    <svg
                      className="mr-3 h-5 w-5 animate-spin"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating Payment...
                  </div>
                ) : (
                  "Submmit"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal> */}
    </motion.main>
  );
};

export default CryptoSavings;
