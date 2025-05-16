import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import walletActivated from "../../../Assets/svg/dashboard/walletActivated.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import lisk from "../../../Assets/svg/dashboard/token_lisk.svg";
import usdc from "../../../Assets/svg/dashboard/usd.svg";
import usdt from "../../../Assets/svg/dashboard/usdt.svg";
import weth from "../../../Assets/svg/dashboard/ethereum.svg";
import { Copy, Check } from "lucide-react";
import { Button, Typography } from "@material-tailwind/react";
import {
  useAllUserTokens,
  useCryptoWallet,
  useCryptoWalletDetails,
  useTotalBalance,
} from "../../../shared/Hooks/useBalance";
import useUserProfile from "../../../shared/Hooks/useUserProfile";
import { useAppDispatch } from "../../../shared/redux/reduxHooks";
import { AppDispatch } from "../../../shared/redux/store";
import { ActivateCryptoWallet } from "../../../shared/redux/slices/web3.slices";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import ToggleButton from "../../../shared/utils/ToggleButton";
import { TransferIcon, WithdrawIcon } from "../../../Assets/svg";
import CryptoTransactionHistory from "./CryptoTransactionHistory";

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

const TOKEN_IMAGES: Record<string, string> = {
  USDT: usdt,
  USDC: usdc,
  WETH: weth,
  ETH: weth,
  WBTC: lisk,
  BTC: lisk,
  LSK: lisk,
  LUSD: usdc,
  WUSDC: usdc,
};

const TOKEN_NAMES: Record<string, string> = {
  USDT: "Tether",
  USDC: "USD Coin",
  WETH: "Wrapped Ethereum",
  ETH: "Ethereum",
  WBTC: "Wrapped Bitcoin",
  BTC: "Bitcoin",
  LSK: "Lisk",
  LUSD: "Lisk USD",
  WUSDC: "Wrapped USD Coin",
};

const CryptoMain = () => {
  const [selectedNetwork, setSelectedNetwork] = useState("ETHERLINK");
  const { Balance, isWalletVisible, setIsWalletVisible } =
    useCryptoWallet(selectedNetwork);
  const { totalBalance, fetchTotalBalance } = useTotalBalance(selectedNetwork);
  const { userTokens, fetchUserTokens } = useAllUserTokens(selectedNetwork);
  const { profileDetails, fetchUserProfile } = useUserProfile();
  const { cryptoWalletDetails } = useCryptoWalletDetails();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useAppDispatch();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  useEffect(() => {
    if (profileDetails?.isWalletActivated) {
      console.log("Wallet is activated, fetching data...");
      console.log("Selected network:", selectedNetwork);
      fetchUserTokens();
      fetchTotalBalance();
    } else {
      console.log("Wallet is not activated");
    }
  }, [
    fetchUserTokens,
    fetchTotalBalance,
    profileDetails?.isWalletActivated,
    selectedNetwork,
  ]);

  // Add console log for total balance
  useEffect(() => {
    console.log("Total balance:", totalBalance);
  }, [totalBalance]);

  const handleCopy = (address: string) => {
    navigator?.clipboard.writeText(address);
    setCopiedStates((prev) => ({ ...prev, [address]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [address]: false }));
    }, 2000);
  };

  const tokenList: TokenListItem[] = React.useMemo(() => {
    if (!userTokens || userTokens.length === 0) return [];

    return userTokens.map((token: TokenInfo) => {
      const symbol = token.tokenSymbol || "";

      return {
        img: TOKEN_IMAGES[symbol] || usdc,
        symbol: symbol,
        title: TOKEN_NAMES[symbol] || symbol,
        token: token,
      };
    });
  }, [userTokens]);

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
      await fetchUserTokens();
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Add network selection handler
  const handleNetworkChange = (network: string) => {
    setSelectedNetwork(network);
  };

  return (
    <main>
      <div className="mt-0 lg:mt-8">
        <DashboardHeader className="flex items-center justify-center text-2xl tracking-wide md:text-3xl lg:text-xl">
          Chain Coop Wallet
        </DashboardHeader>
      </div>
      <div>
        <section className="text-center text-text4">
          <div className="flex flex-col gap-3 py-[1.5em] sm:flex-row sm:justify-between sm:gap-4">
            {profileDetails?.isWalletActivated === true && (
              <>
                <div className="hidden w-fit transform items-center justify-center gap-2 rounded-lg border-2 border-text2 bg-[#ECE6F2] px-3 py-2 font-medium text-text2 transition-all duration-300 hover:scale-105 active:scale-95 sm:w-auto sm:justify-start lg:py-2">
                  Wallet Activated
                  <img src={walletActivated} alt="walletActivated" />
                </div>
                <div className="hidden items-center gap-4">
                  <select
                    value={selectedNetwork}
                    onChange={(e) => handleNetworkChange(e.target.value)}
                    className="rounded-lg border-2 border-gray-400 px-3 py-2 text-sm focus:border-text2 focus:outline-none"
                  >
                    <option value="ETHERLINK">ETHERLINK</option>
                    <option value="BSC">BSC</option>
                    <option value="GNOSIS">GNOSIS</option>
                  </select>
                </div>
              </>
            )}
            <div className="ml-auto flex">
              <Button
                onClick={switchToNaira}
                variant="outlined"
                className="transform rounded-lg border border-text2 normal-case text-text2 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Typography className="text-sm font-medium">
                  Switch to Naira Wallet
                </Typography>
              </Button>
            </div>
          </div>

          {profileDetails?.isWalletActivated === true ? (
            <div className="rounded-3xl border-2 border-gray-300 py-[2em] shadow-lg">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex items-center gap-4">
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
                    <>
                      <p className="text-xl font-bold lg:text-xl">
                        {typeof totalBalance === "number"
                          ? totalBalance.toFixed(2)
                          : "0.00"}
                      </p>
                    </>
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
                      className="font-mono h-8 w-[280px] overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border-2 border-gray-400 pl-3 pr-10 text-sm"
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
            <div className="rounded-3xl border-2 border-gray-300 py-[3.5em] shadow-lg">
              <div className="flex justify-center gap-4">
                <Button
                  onClick={activateWallet}
                  loading={loading}
                  className="flex w-auto transform items-center gap-2 rounded-lg bg-text2 px-9 text-sm font-semibold normal-case text-white transition-all duration-300 hover:scale-105 active:scale-95 lg:py-3"
                >
                  {loading ? "Activating..." : "Activate Wallet"}
                </Button>
              </div>
              <p className="mt-3 text-sm font-medium text-gray-400">
                Activate your crypto-wallet to access your account.
              </p>
            </div>
          )}
        </section>

        {profileDetails?.isWalletActivated === true && (
          <>
            <section className="mt-6">
              <h1 className="text-lg font-semibold">Token Balance</h1>

              {/* Show loading state when no user tokens are available yet */}
              {!userTokens && (
                <div className="mt-4 flex items-center justify-center py-8">
                  <p className="text-center text-gray-500">Loading tokens...</p>
                </div>
              )}

              {/* Show message when no tokens are found */}
              {userTokens && userTokens.length === 0 && (
                <div className="mt-4 flex items-center justify-center py-8">
                  <p className="text-center text-gray-500">
                    No tokens found in your wallet
                  </p>
                </div>
              )}

              {/* Display token list items */}
              <div className="mt-[1em] flex flex-col gap-[1em]">
                {tokenList.map((list, index) => (
                  <div
                    key={index}
                    className="flex flex-col rounded-lg border-2 border-gray-300 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div>
                          <img
                            src={list.img}
                            alt={list.symbol}
                            className="h-8 w-8"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="font-medium text-gray-400">
                            {list.symbol}
                          </p>
                          <p className="font-bold">{list.title}</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold">${list.token?.balance || 0}</p>
                      </div>
                    </div>

                    {list.token?.tokenAddress && (
                      <div className="flex">
                        <div className="mt-2 flex w-[200px] items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5">
                          <span className="font-mono text-sm text-gray-600">
                            {`${list.token.tokenAddress.slice(0, 6)}...${list.token.tokenAddress.slice(-4)}`}
                          </span>
                          <button
                            onClick={() => handleCopy(list.token.tokenAddress)}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                            title={
                              copiedStates[list.token.tokenAddress]
                                ? "Copied!"
                                : "Copy address"
                            }
                          >
                            {copiedStates[list.token.tokenAddress] ? (
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

            <section className="flex w-full items-center justify-center">
              <div className="my-8 w-full rounded-3xl border-[2px] border-gray-300 px-4 shadow-md lg:w-[25em]">
                <div className="flex items-center justify-between px-4 py-8 font-semibold text-howtext lg:px-10">
                  <Link
                    to="/dashboard/wallet/crypto/withdraw"
                    state={{ walletType: "crypto" }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex flex-col items-center bg-inherit text-center"
                    >
                      <WithdrawIcon />
                      <span className="block text-memt1 lg:text-lg">
                        Withdraw
                      </span>
                    </motion.button>
                  </Link>

                  <Link to="/dashboard/wallet/fund/fund_crypto_wallet">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex flex-col items-center bg-inherit text-center"
                    >
                      <TransferIcon />
                      <span className="block text-memt1 lg:text-lg">
                        Fund Wallet
                      </span>
                    </motion.button>
                  </Link>
                </div>
              </div>
            </section>

            <CryptoTransactionHistory />
          </>
        )}
      </div>
    </main>
  );
};

export default CryptoMain;
