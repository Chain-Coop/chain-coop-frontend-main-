import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import {
  useCryptoWalletDetails,
  useBitcoinAccount,
} from "../../../shared/Hooks/useBalance";
import { useUserProfile } from "../../../shared/Hooks/useUserProfile";
import btcImg from "../../../Assets/svg/dashboard/bitcoin.svg";
import usdcImg from "../../../Assets/svg/dashboard/usd.svg";
import usdtImg from "../../../Assets/svg/dashboard/usdt.svg";
import { IoCopyOutline, IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";
import * as QRCodeLibrary from "qrcode.react";
import BtcCoreNoticeModal from "../../../components/dashboard/wallet/modal/crypro/modals/NoticeModal";
const QRCode = QRCodeLibrary.QRCodeSVG;

interface DepositCryptoOption {
  label: string;
  value: string;
  img: string;
  disabled?: boolean;
}

interface NetworkOption {
  label: string;
  value: string;
  addressType: "btc" | "evm";
  disabled?: boolean;
  warning?: string;
}

const DEPOSIT_CRYPTOS: DepositCryptoOption[] = [
  { label: "Bitcoin (BTC)", value: "BTC", img: btcImg },
  { label: "USDC", value: "USDC", img: usdcImg },
  { label: "USDT", value: "USDT", img: usdtImg },
];

const ALL_DEPOSIT_NETWORKS: NetworkOption[] = [
  { label: "BTC Lightning", value: "btc_lightning", addressType: "btc" },
  { label: "BTC Core", value: "btc_core", addressType: "btc" },
  { label: "BNB Smart Chain (BEP20)", value: "bsc", addressType: "evm" },
  {
    label: "Polygon (Matic)",
    value: "polygon",
    addressType: "evm",
    disabled: false,
  },
  {
    label: "Etherlink",
    value: "etherlink",
    addressType: "evm",
    disabled: false,
  },
  {
    label: "Lisk",
    value: "lisk",
    addressType: "evm",
    disabled: false,
  },
];

const NETWORKS_BY_CRYPTO: Record<string, string[]> = {
  BTC: ["btc_lightning", "btc_core"],
  USDC: ["bsc", "polygon", "etherlink", "lisk"],
  USDT: ["bsc", "polygon", "etherlink", "lisk"],
};

const DepositCryptoPage: React.FC = () => {
  const navigate = useNavigate();
  const { profileDetails } = useUserProfile();
  const { cryptoWalletDetails, fetchCryptoWalletDetails } =
    useCryptoWalletDetails();
  const {
    bitcoinAddress,
    isBitcoinAccountActivated: isBitcoinActiveInSession,
    fetchBitcoinBalance,
  } = useBitcoinAccount();

  const [selectedCrypto, setSelectedCrypto] = useState<DepositCryptoOption>(
    DEPOSIT_CRYPTOS[0],
  );
  const [availableNetworks, setAvailableNetworks] = useState<NetworkOption[]>(
    [],
  );
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkOption | null>(
    null,
  );
  const [depositAddress, setDepositAddress] = useState<string | null>(null);
  const [addressMessage, setAddressMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isBtcCoreNoticeOpen, setIsBtcCoreNoticeOpen] = useState(false);

  useEffect(() => {
    const allowedNetworkValues = NETWORKS_BY_CRYPTO[selectedCrypto.value] || [];
    const networks = ALL_DEPOSIT_NETWORKS.filter((n) =>
      allowedNetworkValues.includes(n.value),
    ).sort((a, b) => Number(a.disabled) - Number(b.disabled));

    setAvailableNetworks(networks);

    if (networks.length > 0) {
      const firstEnabledNetwork =
        networks.find((n) => !n.disabled) || networks[0];
      setSelectedNetwork(firstEnabledNetwork);
    } else {
      setSelectedNetwork(null);
    }
  }, [selectedCrypto]);

  useEffect(() => {
    setDepositAddress(null);
    setAddressMessage("Loading address...");

    if (!profileDetails?.isWalletActivated) {
      setAddressMessage("Please activate your main wallet first.");
      return;
    }

    if (selectedNetwork?.addressType === "btc") {
      if (
        profileDetails?.isBitcoinWalletActivated ||
        isBitcoinActiveInSession
      ) {
        if (bitcoinAddress) {
          setDepositAddress(bitcoinAddress);
          setAddressMessage(null);
        } else {
          fetchBitcoinBalance().catch(() =>
            setAddressMessage("Could not load Bitcoin address."),
          );
          setAddressMessage("Fetching Bitcoin address...");
        }
      } else {
        setAddressMessage(
          "Activate your Bitcoin wallet in the main wallet screen to get your address.",
        );
      }
    } else if (selectedNetwork?.addressType === "evm") {
      if (cryptoWalletDetails?.address) {
        setDepositAddress(cryptoWalletDetails.address);
        setAddressMessage(null);
      } else {
        setAddressMessage("Fetching wallet address...");
        fetchCryptoWalletDetails();
      }
    } else {
      setAddressMessage("Select a crypto and network to see the address.");
    }
  }, [
    selectedCrypto,
    selectedNetwork,
    profileDetails,
    cryptoWalletDetails,
    bitcoinAddress,
    isBitcoinActiveInSession,
    fetchBitcoinBalance,
    fetchCryptoWalletDetails,
  ]);

  const handleCopyAddress = useCallback(() => {
    if (depositAddress) {
      navigator.clipboard.writeText(depositAddress);
      setIsCopied(true);
      toast.success("Address copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    }
  }, [depositAddress]);

  const handleBackClick = () => navigate(-1);

  const handleCryptoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const cryptoOption = DEPOSIT_CRYPTOS.find((c) => c.value === selectedValue);
    if (cryptoOption && !cryptoOption.disabled) {
      setSelectedCrypto(cryptoOption);
    }
  };

  const handleNetworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const networkOption = availableNetworks.find(
      (n) => n.value === selectedValue,
    );
    if (networkOption && !networkOption.disabled) {
      setSelectedNetwork(networkOption);
      if (
        networkOption.value === "btc_core" &&
        selectedCrypto.value === "BTC"
      ) {
        setIsBtcCoreNoticeOpen(true);
      }
    }
  };

  const handleSwitchToLightning = () => {
    const lightningNetwork = availableNetworks.find(
      (n) => n.value === "btc_lightning",
    );
    if (lightningNetwork) {
      setSelectedNetwork(lightningNetwork);
    }
    setIsBtcCoreNoticeOpen(false);
  };

  const currentNetworkWarning =
    selectedNetwork?.warning ||
    (selectedNetwork?.addressType === "evm" && selectedCrypto.value !== "ETH"
      ? `Ensure you are sending ${selectedCrypto.label} as a token on the ${selectedNetwork.label} network.`
      : null);

  return (
    <main className="mt-0 lg:mt-8">
      <DashboardHeader className="relative flex items-center justify-center text-2xl tracking-wide md:text-3xl lg:text-xl">
        <IoIosArrowBack
          onClick={handleBackClick}
          size={25}
          className="absolute left-2 top-1/2 -translate-y-1/2 transform cursor-pointer lg:left-7"
        />
        Deposit Crypto
      </DashboardHeader>

      <section className="relative mx-auto my-10 w-full max-w-lg px-4 md:px-2">
        <div className="flex flex-col items-center">
          <img
            src={selectedCrypto.img}
            alt={selectedCrypto.label}
            className="mb-4 h-24 w-24 md:h-32 md:w-32"
          />
          <h1 className="pb-3 text-2xl font-semibold md:text-3xl">
            Deposit {selectedCrypto.label}
          </h1>
        </div>

        <div className="mb-6 mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3 text-center text-sm text-blue-700 md:text-base">
          To deposit, select the cryptocurrency and network below. Then, send
          your funds to the displayed address.
        </div>

        {/* Crypto type dropdown */}
        <div className="relative mb-5">
          <label
            htmlFor="crypto-select"
            className="mb-1 block text-base font-medium text-gray-700 md:text-lg"
          >
            Select Cryptocurrency
          </label>
          <div className="relative">
            <select
              id="crypto-select"
              value={selectedCrypto.value}
              onChange={handleCryptoChange}
              className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              {DEPOSIT_CRYPTOS.map((c) => (
                <option
                  key={c.value}
                  value={c.value}
                  disabled={c.disabled}
                  className={`py-2 ${c.disabled ? "text-gray-400" : "text-gray-700"}`}
                >
                  {c.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                <path
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Token network dropdown */}
        <div className="relative mb-6">
          <label
            htmlFor="network-select"
            className="mb-1 block text-base font-medium text-gray-700 md:text-lg"
          >
            Select Network
          </label>
          <div className="relative">
            <select
              id="network-select"
              value={selectedNetwork?.value || ""}
              onChange={handleNetworkChange}
              className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              disabled={
                availableNetworks.length === 0 ||
                availableNetworks.every((n) => n.disabled)
              }
            >
              {availableNetworks.length > 0 ? (
                availableNetworks.map((n) => (
                  <option
                    key={n.value}
                    value={n.value}
                    disabled={n.disabled}
                    className={`py-2 ${n.disabled ? "text-gray-400" : "text-gray-700"}`}
                  >
                    {n.label}
                  </option>
                ))
              ) : (
                <option value="" disabled className="text-gray-500">
                  No networks available for {selectedCrypto.label}
                </option>
              )}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                <path
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Deposit Address Display */}
        <div className="mt-8 rounded-lg bg-gray-50 p-4 shadow">
          <h2 className="mb-3 text-lg font-semibold text-gray-800">
            Your {selectedCrypto.label} ({selectedNetwork?.label}) Address:
          </h2>
          {depositAddress ? (
            <>
              <div className="mb-4 flex flex-col items-center justify-center">
                <QRCode value={depositAddress} size={160} level="H" />
              </div>
              <div className="font-mono relative mb-3 break-all rounded-md border border-gray-300 bg-white p-3 text-sm text-gray-700">
                {depositAddress}
                <button
                  onClick={handleCopyAddress}
                  className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100"
                  title={isCopied ? "Copied!" : "Copy address"}
                >
                  {isCopied ? (
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-green-500"
                    />
                  ) : (
                    <IoCopyOutline size={20} />
                  )}
                </button>
              </div>
              {currentNetworkWarning && (
                <div className="mt-3 rounded-md border border-yellow-300 bg-yellow-50 p-3 text-xs text-yellow-800">
                  <strong>Important:</strong> {currentNetworkWarning} Only send{" "}
                  {selectedCrypto.label} via the {selectedNetwork?.label}{" "}
                  network. Sending other assets or using a different network may
                  result in permanent loss of funds.
                </div>
              )}
            </>
          ) : (
            <div className="flex h-24 items-center justify-center rounded-md border border-gray-200 bg-white p-3 text-gray-500">
              {addressMessage || "Address will appear here."}
            </div>
          )}
        </div>
      </section>
      <BtcCoreNoticeModal
        open={isBtcCoreNoticeOpen}
        onClose={() => setIsBtcCoreNoticeOpen(false)}
        onSwitchToLightning={handleSwitchToLightning}
      />
    </main>
  );
};

export default DepositCryptoPage;
