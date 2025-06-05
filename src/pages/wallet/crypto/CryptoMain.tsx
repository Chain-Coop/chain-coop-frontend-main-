import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import walletActivated from "../../../Assets/svg/dashboard/walletActivated.svg";
import bitcoinIcon from "../../../Assets/svg/dashboard/bitcoin.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import lisk from "../../../Assets/svg/dashboard/token_lisk.svg";
import usdc from "../../../Assets/svg/dashboard/usd.svg";
import usdt from "../../../Assets/svg/dashboard/usdt.svg";
import weth from "../../../Assets/svg/dashboard/ethereum.svg";
import gnosis from "../../../Assets/svg/dashboard/gnosis.svg";
import polygon from "../../../Assets/svg/dashboard/polygon-matic-logo.svg";
import { Button, Typography } from "@material-tailwind/react";
import {
  useAllUserTokens,
  useCryptoWallet,
  useCryptoWalletDetails,
  useTotalBalance,
  useBitcoinAccount,
} from "../../../shared/Hooks/useBalance";
import { useAppDispatch } from "../../../shared/redux/reduxHooks";
import { AppDispatch } from "../../../shared/redux/store";
import { ActivateCryptoWallet } from "../../../shared/redux/slices/web3.slices";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import ToggleButton from "../../../shared/utils/ToggleButton";
import { TransferIcon, FundIcon, WithdrawIcon } from "../../../Assets/svg";
import CryptoTransactionHistory from "./CryptoTransactionHistory";
import { useUserProfile } from "../../../shared/Hooks/useUserProfile";
import { TokenListSkeleton } from "../../../components/common/Loading";
import { TokenDetails } from "../../../components/dashboard/wallet/modal/crypro/modals/TokenDetails";

interface TokenInfo {
  tokenAddress: string;
  balance: number;
  tokenSymbol: string;
  network?: string;
  networks?: string[];
}

interface TokenListItem {
  img: string;
  symbol: string;
  title: string;
  token: TokenInfo;
  isAggregated: boolean;
}

const TOKEN_IMAGES: Record<string, string> = {
  USDT: usdt,
  USDC: usdc,
  GNO: gnosis,
  Polygon: polygon,
  WETH: weth,
  ETH: weth,
  WBTC: lisk,
  BTC: bitcoinIcon,
  LSK: lisk,
  LUSD: usdc,
  WUSDC: usdc,
};

const TOKEN_NAMES: Record<string, string> = {
  USDT: "Tether",
  USDC: "USD Coin",
  WETH: "Wrapped Ethereum",
  GNO: "Gnosis",
  Polygon: "Matic",
  ETH: "Ethereum",
  WBTC: "Wrapped Bitcoin",
  BTC: "Bitcoin",
  LSK: "Lisk",
  LUSD: "Lisk USD",
  WUSDC: "Wrapped USD Coin",
};

const AggregatedTokenListItem: React.FC<{
  listItem: TokenListItem;
  onViewDetails: (token: TokenListItem) => void;
}> = React.memo(({ listItem, onViewDetails }) => {
  return (
    <div className="flex flex-col rounded-lg border-2 border-gray-300 p-4 lg:py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <img
              src={listItem.img}
              alt={listItem.symbol}
              className="h-8 w-8"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium text-gray-400">{listItem.symbol} </p>
            <p className="font-bold">{listItem.title}</p>
            <button
              onClick={() => onViewDetails(listItem)}
              className="mt-1 w-fit rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200"
            >
              View Details
            </button>
          </div>
        </div>
        <div>
          <p className="font-bold">
            {listItem.token?.balance?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            }) || "0.00"}
          </p>
        </div>
      </div>
    </div>
  );
});
AggregatedTokenListItem.displayName = "AggregatedTokenListItem";

const CryptoMain = () => {
  const { isWalletVisible, setIsWalletVisible } = useCryptoWallet("ETHERLINK");
  const {
    totalBalance,
    fetchTotalBalance,
    loading: loadingTotalBalance,
  } = useTotalBalance();
  const {
    userTokens: allTokensFromSupportedNetworks,
    fetchUserTokens,
    loading: loadingUserTokens,
    error: errorUserTokens,
  } = useAllUserTokens();
  const { profileDetails, fetchUserProfile } = useUserProfile();
  const { cryptoWalletDetails } = useCryptoWalletDetails();
  const {
    isBitcoinAccountActivated,
    bitcoinActivationLoading,
    activateBitcoinAccount,
    bitcoinBalance,
    bitcoinAddress,
    bitcoinBalanceLoading,
    fetchBitcoinBalance,
  } = useBitcoinAccount();
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<TokenListItem | null>(
    null,
  );

  const handleViewTokenDetails = (token: TokenListItem) => {
    setSelectedToken(token);
    setDetailsModalOpen(true);
  };

  const navigate = useNavigate();
  const [activatingGenericWalletLoading, setActivatingGenericWalletLoading] =
    useState(false);
  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    if (profileDetails?.isWalletActivated) {
      fetchUserTokens();
      fetchTotalBalance();
      if (isBitcoinAccountActivated === true) {
        fetchBitcoinBalance();
      }
    }
  }, [
    fetchUserTokens,
    fetchTotalBalance,
    profileDetails?.isWalletActivated,
    profileDetails?.isBitcoinWalletActivated,
    isBitcoinAccountActivated,
    fetchBitcoinBalance,
  ]);

  const tokenList: TokenListItem[] = useMemo(() => {
    if (
      !allTokensFromSupportedNetworks ||
      allTokensFromSupportedNetworks.length === 0
    )
      return [];
    const aggregatedTokens: {
      [symbol: string]: {
        totalBalance: number;
        networks: Set<string>;
        firstToken: TokenInfo;
      };
    } = {};
    allTokensFromSupportedNetworks.forEach((token: TokenInfo) => {
      if (!token.tokenSymbol) return;
      if (!aggregatedTokens[token.tokenSymbol]) {
        aggregatedTokens[token.tokenSymbol] = {
          totalBalance: 0,
          networks: new Set<string>(),
          firstToken: token,
        };
      }
      aggregatedTokens[token.tokenSymbol].totalBalance += token.balance;
      if (token.network)
        aggregatedTokens[token.tokenSymbol].networks.add(token.network);
    });

    const allAggregatedItems = Object.entries(aggregatedTokens).map(
      ([symbol, data]) => {
        const displayNetworks = Array.from(data.networks);
        return {
          img: TOKEN_IMAGES[symbol] || usdc,
          symbol: symbol,
          title: TOKEN_NAMES[symbol] || symbol,
          token: {
            tokenAddress: data.firstToken.tokenAddress,
            balance: data.totalBalance,
            tokenSymbol: symbol,
            network:
              displayNetworks.length === 1 ? displayNetworks[0] : undefined,
            networks: displayNetworks,
          },
          isAggregated: displayNetworks.length > 1,
        };
      },
    );

    const allowedSymbols = ["USDC", "USDT"];
    return allAggregatedItems.filter((item) =>
      allowedSymbols.includes(item.symbol.toUpperCase()),
    );
  }, [allTokensFromSupportedNetworks]);

  const switchToNaira = () => navigate("/dashboard/wallet");

  const activateGenericWallet = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setActivatingGenericWalletLoading(true);
    try {
      const response = await dispatch(ActivateCryptoWallet()).unwrap();
      toast.success(response.message);
      await fetchUserProfile();
    } catch (error: any) {
      toast.error(error.message || "Failed to activate wallet");
    } finally {
      setActivatingGenericWalletLoading(false);
    }
  };

  const handleActivateBitcoin = async () => {
    try {
      const response = await activateBitcoinAccount();
      toast.success(
        response.message || "Bitcoin account activation initiated.",
      );
      await fetchUserProfile();
      await fetchBitcoinBalance();
    } catch (error: any) {
      toast.error(error.message || "Failed to activate Bitcoin account.");
    }
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
            <div className="rounded-3xl border-2 border-gray-300 py-[4em] shadow-lg">
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
                    <p className="text-xl font-bold lg:text-xl">
                      {loadingTotalBalance ? (
                        <div className="animate-pulse">
                          <div className="mx-auto h-6 w-32 rounded bg-gray-200"></div>
                        </div>
                      ) : typeof totalBalance === "number" ? (
                        `$${totalBalance.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`
                      ) : (
                        "$0.00"
                      )}
                    </p>
                  ) : (
                    <p className="text-2xl font-bold">*********</p>
                  )}
                  <hr className="mt-2 h-px rounded-md bg-howtext" />
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border-2 border-gray-300 py-[3.5em] shadow-lg">
              <div className="flex justify-center gap-4">
                <Button
                  onClick={activateGenericWallet}
                  loading={activatingGenericWalletLoading}
                  className="flex w-auto transform items-center gap-2 rounded-lg bg-text2 px-9 text-sm font-semibold normal-case text-white transition-all duration-300 hover:scale-105 active:scale-95 lg:py-3"
                >
                  {activatingGenericWalletLoading
                    ? "Activating..."
                    : "Activate Wallet"}
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
              <h1 className="text-lg font-semibold">Token Balances</h1>

              {loadingUserTokens && <TokenListSkeleton count={2} />}
              {!loadingUserTokens && errorUserTokens && (
                <div className="mt-4 flex items-center justify-center py-8">
                  <p className="text-center text-red-500">
                    Error: {errorUserTokens}
                  </p>
                </div>
              )}
              {!loadingUserTokens &&
                !errorUserTokens &&
                tokenList.length > 0 && (
                  <div className="mt-[1em] flex flex-col gap-[1em]">
                    {tokenList.map((list) => (
                      <AggregatedTokenListItem
                        key={`${list.symbol}-aggregated-${list.token.networks?.join("-") || list.token.network}`}
                        listItem={list}
                        onViewDetails={handleViewTokenDetails}
                      />
                    ))}
                  </div>
                )}

              <div className="mt-[1em]">
                {!profileDetails?.isBitcoinWalletActivated &&
                  isBitcoinAccountActivated !== true &&
                  !bitcoinActivationLoading && (
                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400 p-4 text-center hover:border-orange-500 lg:py-6">
                      <img
                        src={bitcoinIcon}
                        alt="Bitcoin"
                        className="mb-2 h-10 w-10 opacity-60"
                      />
                      <p className="mb-3 text-base font-medium text-gray-600">
                        Bitcoin (BTC)
                      </p>
                      <p className="mb-4 text-sm text-gray-500">
                        Activate your Bitcoin wallet to send and receive BTC.
                      </p>
                      <Button
                        onClick={handleActivateBitcoin}
                        className="flex transform items-center gap-2 rounded-lg bg-orange-500 px-6 py-2 text-sm font-semibold normal-case text-white transition-all duration-300 hover:bg-orange-600 active:scale-95"
                      >
                        Activate Bitcoin Wallet
                      </Button>
                    </div>
                  )}

                {bitcoinActivationLoading && (
                  <div className="flex animate-pulse flex-col items-center justify-center rounded-lg border-2 border-gray-300 p-4 lg:py-8">
                    <div className="mb-3 h-10 w-10 rounded-full bg-gray-200"></div>
                    <div className="mb-2 h-5 w-20 rounded bg-gray-200"></div>
                    <div className="mb-3 h-4 w-40 rounded bg-gray-200"></div>
                    <div className="h-8 w-48 rounded bg-gray-200"></div>
                    <p className="mt-3 text-sm text-orange-500">
                      Activating Bitcoin Wallet...
                    </p>
                  </div>
                )}

                {(profileDetails?.isBitcoinWalletActivated === true ||
                  isBitcoinAccountActivated === true) &&
                  !bitcoinActivationLoading && (
                    <div className="flex flex-col rounded-lg border-2 border-gray-300 p-4 lg:py-8">
                      {bitcoinBalanceLoading ? (
                        <div className="flex animate-pulse items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                            <div className="flex flex-col gap-1">
                              <div className="h-4 w-16 rounded bg-gray-200"></div>
                              <div className="h-5 w-24 rounded bg-gray-200"></div>
                            </div>
                          </div>
                          <div className="h-6 w-20 rounded bg-gray-200"></div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between py-[1em]">
                          <div className="flex items-center gap-3">
                            <div>
                              <img
                                src={TOKEN_IMAGES["BTC"]}
                                alt="BTC"
                                className="h-8 w-8"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="font-medium text-gray-400">BTC</p>
                              <p className="font-bold">Bitcoin</p>
                            </div>
                          </div>
                          <div>
                            <p className="font-bold">
                              {bitcoinBalance !== undefined
                                ? bitcoinBalance.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 8,
                                  })
                                : "0.00000000"}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
              </div>

              {!loadingUserTokens &&
                !errorUserTokens &&
                tokenList.length === 0 &&
                isBitcoinAccountActivated !== true &&
                !bitcoinActivationLoading && (
                  <div className="mt-4 flex items-center justify-center py-8">
                    <p className="text-center text-gray-500">
                      No other tokens found. You can activate your Bitcoin
                      wallet above.
                    </p>
                  </div>
                )}
            </section>

            <section className="flex w-full items-center justify-center">
              <div className="my-8 w-full rounded-3xl border-[2px] border-gray-300 px-4 shadow-md ">
                <div className="flex items-center justify-between px-4 py-8 font-semibold text-howtext lg:px-2">
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

                  <Link
                    to="/dashboard/wallet/deposit/crypto"
                    state={{ walletType: "crypto" }}
                    className="cursor-not-allowed"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={true}
                      onClick={(e) => e.preventDefault()}
                      className="flex flex-col items-center bg-inherit text-center opacity-50"
                    >
                      <TransferIcon />
                      <span className="block text-memt1 lg:text-lg">
                        Deposit
                      </span>
                    </motion.button>
                  </Link>

                  <Link to="/dashboard/wallet/fund/fund_crypto_wallet">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex flex-col items-center bg-inherit text-center"
                    >
                      <FundIcon />
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

      <TokenDetails
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        token={selectedToken}
        allTokens={allTokensFromSupportedNetworks || []}
      />
    </main>
  );
};

export default CryptoMain;
