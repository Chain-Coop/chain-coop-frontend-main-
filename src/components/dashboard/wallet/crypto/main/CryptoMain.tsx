import React, { useState } from "react";
import { DashboardHeader } from "../../../../common/DashboardHeader";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../../../../shared/redux/reduxHooks";
import { AppDispatch } from "../../../../../shared/redux/store";
import { ActivateCryptoWallet } from "../../../../../shared/redux/slices/kyc.slices";
import { toast } from "react-toastify";
import walletActivated from "../../../../../Assets/svg/dashboard/walletActivated.svg";
import {
  useAllUserTokens,
  useCryptoWallet,
  useCryptoWalletDetails,
} from "../../../../../shared/Hooks/useBalance";
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
import { Copy, Check } from "lucide-react";

interface TokenInfo {
  tokenAddress: string;
  balance: number;
  tokenSymbol: string;
}

interface TokenListItem {
  img: string;
  symbol: string;
  title: string;
  token: TokenInfo;
}

const CryptoMain = () => {
  const { Balance, isWalletVisible, setIsWalletVisible } = useCryptoWallet();
  const { userTokens } = useAllUserTokens();
  const { profileDetails, fetchUserProfile } = useUserProfile();
  const { cryptoWalletDetails } = useCryptoWalletDetails();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCopy = (address: string) => {
    navigator?.clipboard.writeText(address);
    setCopiedStates((prev) => ({ ...prev, [address]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [address]: false }));
    }, 2000);
  };

  const getDefaultToken = (): TokenInfo => ({
    tokenAddress: "",
    balance: 0,
    tokenSymbol: "",
  });

  const tokenList: TokenListItem[] = [
    {
      img: lisk,
      symbol: "LSK",
      title: "Lisk",
      token:
        userTokens?.find((t: any) => t?.tokenSymbol === "LSK") ||
        getDefaultToken(),
    },
    {
      img: eth,
      symbol: "LUSD",
      title: "Ethereum",
      token:
        userTokens?.find((t: any) => t?.tokenSymbol === "LUSD") ||
        getDefaultToken(),
    },
    {
      img: usdc,
      symbol: "WUSDC",
      title: "Dollar",
      token:
        userTokens?.find((t: any) => t.tokenSymbol === "WUSDC") ||
        getDefaultToken(),
    },
  ];

  const switchToNaira = () => {
    navigate("/dashboard/wallet");
  };

  const activateWallet = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await dispatch(ActivateCryptoWallet()).unwrap();
      toast.success(response.message);
      await fetchUserProfile();
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
          <div className="flex flex-col gap-3 py-[1.5em] sm:flex-row sm:justify-between sm:gap-4">
            {profileDetails?.isWalletActivated === true && (
              <div className="flex w-full transform items-center justify-center gap-2 rounded-lg border-2 border-text2 bg-[#ECE6F2] px-3 py-2 font-medium text-text2 transition-all duration-300 hover:scale-105 active:scale-95 sm:w-auto sm:justify-start lg:py-2">
                Wallet Activated
                <img src={walletActivated} alt="walletActivated" />
              </div>
            )}
            <button
              onClick={switchToNaira}
              className="flex w-full transform items-center justify-center gap-2 rounded-lg bg-[#29004D] px-6 py-2 font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 sm:w-auto lg:py-2"
            >
              Switch to Naira Wallet
            </button>
          </div>

          {profileDetails?.isWalletActivated === true ? (
            <div className="mx-auto mt-8 rounded-3xl border-2 border-gray-300 py-[2em] shadow-lg">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex items-center gap-4 font-sans">
                  <p className="font-medium">Total Crypto Wallet Balance</p>
                  <div>
                    <ToggleButton
                      isVisible={isWalletVisible}
                      onToggle={setIsWalletVisible}
                    />
                  </div>
                </div>

                <div className="w-60 text-center">
                  {isWalletVisible ? (
                    <p className="text-xl font-bold lg:text-xl">
                      $
                      {typeof Balance === "number"
                        ? Balance.toFixed(2)
                        : "0.00"}
                    </p>
                  ) : (
                    <p className="text-2xl font-bold">*********</p>
                  )}
                  <hr className="mt-4 h-px rounded-md bg-howtext" />
                </div>

                <div className="mt-[1em] flex flex-col items-center gap-4">
                  <h1 className="font-semibold">User Address</h1>
                  <div className="relative">
                    <input
                      type="text"
                      value={cryptoWalletDetails?.address || ""}
                      readOnly
                      className="h-8 w-[280px] overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border-2 border-gray-400 pl-3 pr-10 font-mono text-sm"
                    />
                    <button
                      onClick={() =>
                        handleCopy(cryptoWalletDetails?.address || "")
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-md p-1 text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-700"
                      title={
                        copiedStates[cryptoWalletDetails?.address || ""]
                          ? "Copied!"
                          : "Copy address"
                      }
                    >
                      {copiedStates[cryptoWalletDetails?.address || ""] ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
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
            {tokenList?.map((list, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg border-2 border-gray-300 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <img
                        src={list?.img}
                        alt={list?.symbol}
                        className="h-8 w-8"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-gray-400">
                        {list?.symbol}
                      </p>
                      <p className="font-bold">{list?.title}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold">${list?.token?.balance}</p>
                  </div>
                </div>

                {list?.token?.tokenAddress && (
                  <div className="flex">
                    <div className="mt-2 flex w-[200px] items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5">
                      <span className="font-mono text-sm text-gray-600">
                        {`${list?.token?.tokenAddress?.slice(0, 6)}...${list?.token?.tokenAddress?.slice(-4)}`}
                      </span>
                      <button
                        onClick={() => handleCopy(list?.token?.tokenAddress)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                        title={
                          copiedStates[list?.token?.tokenAddress]
                            ? "Copied!"
                            : "Copy address"
                        }
                      >
                        {copiedStates[list?.token?.tokenAddress] ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
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
        <CryptoModal onClose={toggleModal} />
      </Modal>
    </main>
  );
};

export default CryptoMain;
