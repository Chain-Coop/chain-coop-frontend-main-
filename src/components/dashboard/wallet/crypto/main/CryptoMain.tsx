import React, { useState } from "react";
import { DashboardHeader } from "../../../../common/DashboardHeader";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../../../../shared/redux/reduxHooks";
import { AppDispatch } from "../../../../../shared/redux/store";
import { ActivateCryptoWallet } from "../../../../../shared/redux/slices/kyc.slices";
import { toast } from "react-toastify";
import walletActivated from "../../../../../Assets/svg/dashboard/walletActivated.svg";
import { useCryptoWallet } from "../../../../../shared/Hooks/useBalance";
import ToggleButton from "../../../../../shared/utils/ToggleButton";
import { Link } from "react-router-dom";
import withdraw_icon from "../../../../../Assets/svg/dashboard/wallet/withdraw.svg";
import fund_icon from "../../../../../Assets/svg/dashboard/wallet/fund.svg";
import transfer_icon from "../../../../../Assets/svg/dashboard/wallet/transfer.svg";
import { motion } from "framer-motion";
import lisk from "../../../../../Assets/svg/dashboard/token_lisk.svg";
import eth from "../../../../../Assets/svg/dashboard/Group 99764.png";
import usdc from "../../../../../Assets/svg/dashboard/usdc.svg";
import useUserProfile from "../../../../../shared/Hooks/useUserProfile";
import Modal from "../../../../common/Modal";
import CryptoModal from "../savingsModal/CryptoModal";

const CryptoMain = () => {
  const {
    Balance,
    loading: cryptoBalanceLoading,
    error: cryptoBalanceError,
    isWalletVisible,
    setIsWalletVisible,
  } = useCryptoWallet();
  const { profileDetails } = useUserProfile();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const tokenList = [
    {
      img: lisk,
      label: "Lisk",
      title: "Lisk",
      amount: "0.00",
    },
    {
      img: eth,
      label: "USDT",
      title: "Ethereum",
      amount: "0.00",
    },
    {
      img: usdc,
      label: "USDC",
      title: "Dollar",
      amount: Balance || "0.00",
    },
  ];

  const switchToNaira = () => {
    navigate("/dashboard/wallet");
  };

  const activateWallet = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await dispatch(ActivateCryptoWallet()).unwrap();
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="font-sans">
      <div className="mt-0 lg:mt-8">
        <header>
          <DashboardHeader className="flex items-center justify-center text-2xl tracking-wide md:text-3xl lg:text-xl">
            Chain Coop Wallet
          </DashboardHeader>
        </header>
      </div>
      <div className="mx-auto lg:w-[35em]">
        <section className="px-6 text-center text-text4">
          <div className="flex justify-between py-[1.5em]">
            {profileDetails?.isWalletActivated === true && (
              <div className="flex w-auto transform items-center gap-2 rounded-lg border-2 border-text2 bg-[#ECE6F2] px-3 font-medium text-text2 transition-all duration-300 hover:scale-105 active:scale-95 lg:py-2">
                Wallet Activated
                <img src={walletActivated} alt="walletActivated" />
              </div>
            )}
            <button
              onClick={switchToNaira}
              className="flex w-auto transform items-center gap-2 rounded-lg bg-[#29004D] px-6 font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 lg:py-2"
            >
              Switch to Naira Wallet
            </button>
          </div>

          {profileDetails?.isWalletActivated === true ? (
            <div className="mx-auto mt-8 rounded-3xl border-2 border-gray-300 py-[3.5em] shadow-lg">
              <div className="flex justify-center gap-4 font-sans">
                <p className="font-medium">Total Crypto Wallet Balance</p>
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
                  <p className="text-xl font-bold lg:text-xl">${Balance}</p>
                ) : (
                  <p className="text-2xl font-bold">*********</p>
                )}
                <hr className="mt-4 h-px rounded-md bg-howtext" />
              </div>
              <div className="m-auto mt-[1em] flex w-[70%] justify-between px-[1.5em]">
                <h1 className="font-semibold">User Address</h1>
                <div>
                  <input
                    type="tel"
                    className="h-8 rounded-lg border-2 border-gray-400"
                    name=""
                    id=""
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto mt-8 rounded-3xl border-2 border-gray-300 py-[3.5em] shadow-lg">
              <div className="flex justify-center gap-4 font-sans">
                <button
                  onClick={activateWallet}
                  className="flex w-auto transform items-center gap-2 rounded-lg bg-text2 px-9 font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 lg:py-3"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
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
                      Activating...
                    </div>
                  ) : (
                    "Activate Wallet"
                  )}
                </button>
              </div>
              <p className="mt-3 text-sm font-medium text-gray-400">
                Activate your crypto-wallet to access your account.
              </p>
            </div>
          )}
        </section>

        <section className="mx-auto mt-6 px-4 lg:w-[32em]">
          <h1 className="text-lg font-semibold">Token Balance</h1>
          <div className="mt-[1em] flex flex-col gap-[1em]">
            {tokenList.map((list, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-[1em] rounded-lg border-2 border-gray-300 px-[1em] py-1"
              >
                <div className="flex gap-[1em]">
                  <div className="flex items-center gap-3">
                    <div>
                      <img src={list?.img} alt={list.label} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-gray-400">{list.label}</p>
                      <p className="font-bold">{list.title}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-bold">${list.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-6 rounded-3xl px-4 shadow-md lg:w-[32em]">
          <div className="flex items-center justify-between px-4 py-8 font-semibold text-howtext lg:px-10">
            <Link to="">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center bg-inherit text-center"
              >
                <img src={withdraw_icon} alt="withdraw_icon" />
                <span className="block text-memt1 lg:text-lg">Withdraw</span>
              </motion.button>
            </Link>
            <motion.button
              onClick={toggleModal}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center bg-inherit text-center"
            >
              <img src={fund_icon} alt="fund_icon" />
              <span className="block text-memt1 lg:text-lg">
                Save in Crypto
              </span>
            </motion.button>
            <Link to="">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center bg-inherit text-center"
              >
                <img src={transfer_icon} alt="transfer_icon" />
                <span className="block text-memt1 lg:text-lg">Transfer</span>
              </motion.button>
            </Link>
          </div>
        </section>
      </div>
      <Modal className="bg-white" isOpen={isModalOpen} onClose={toggleModal}>
        <CryptoModal />
      </Modal>
    </main>
  );
};

export default CryptoMain;
