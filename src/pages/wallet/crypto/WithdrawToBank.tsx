import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../shared/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import { CashwyreOfframpQuote } from "../../../shared/redux/slices/web3.slices";
import btcImg from "../../../Assets/svg/dashboard/bitcoin.svg";
import usdcImg from "../../../Assets/svg/dashboard/usd.svg";
import usdtImg from "../../../Assets/svg/dashboard/usdt.svg";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { IoIosArrowBack } from "react-icons/io";

const CRYPTOS = [
  { label: "Bitcoin (BTC)", value: "bitcoin", img: btcImg, disabled: false },
  { label: "USDC", value: "usdc", img: usdcImg, disabled: true },
  { label: "USDT", value: "usdt", img: usdtImg, disabled: false },
];

const ALL_NETWORKS = [
  { label: "BTC Lightning", value: "BTC_LN", disabled: false },
  { label: "BTC Core", value: "btc", disabled: false },
  { label: "LISK", value: "lisk", disabled: true },
  { label: "BNB Smart Chain-BEP20", value: "bsc", disabled: false },
  { label: "Etherlink", value: "etherlink", disabled: true },
];

const NETWORKS_BY_CRYPTO = {
  bitcoin: ["BTC_LN", "btc"],
  usdc: ["lisk", "bsc", "etherlink"],
  usdt: ["lisk", "bsc", "etherlink"],
};

const WithdrawToBank: React.FC = () => {
  const [crypto, setCrypto] = useState(CRYPTOS[0]);
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [availableNetworks, setAvailableNetworks] = useState<
    typeof ALL_NETWORKS
  >([]);
  const [network, setNetwork] = useState(ALL_NETWORKS[0]);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { offrampQuoteError, offrampQuoteResult } = useSelector(
    (state: any) => state.web3,
  );

  useEffect(() => {
    const allowedNetworkValues =
      NETWORKS_BY_CRYPTO[crypto.value as keyof typeof NETWORKS_BY_CRYPTO] || [];

    const networks = ALL_NETWORKS.filter((n) =>
      allowedNetworkValues.includes(n.value),
    ).sort((a, b) => Number(a.disabled) - Number(b.disabled));

    setAvailableNetworks(networks);

    if (networks.length > 0) {
      const currentNetworkIsValid = networks.some(
        (n) => n.value === network.value,
      );

      if (!currentNetworkIsValid || networks[0].disabled) {
        const firstEnabled = networks.find((n) => !n.disabled);
        if (firstEnabled) {
          setNetwork(firstEnabled);
        } else {
          setNetwork(networks[0]);
        }
      }
    }
  }, [crypto]);

  const handlePreviewWithdrawal = async () => {
    setIsSubmitting(true);

    const toastId = toast.loading("Processing your request...", {
      position: "top-right",
      autoClose: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      closeButton: false,
    });

    try {
      const response = await dispatch(
        CashwyreOfframpQuote({
          body: {
            amount: Number(amount),
            crypto: crypto.value,
            network: network.value,
          },
        }),
      ).unwrap();

      toast.update(toastId, {
        render: "Request processed successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      navigate("/dashboard/wallet/crypto/withdraw/preview", {
        state: {
          data: {
            data: {
              amountInCryptoAsset: Number(amount),
              cryptoAsset: crypto.value,
              currency: "NGN",
              amountInLocalCurrency: response.data.data.amountInLocalCurrency,
              cryptoRate: response.data.data.cryptoRate,
              reference: response.data.data.reference,
              transactionReference: response.data.data.transactionReference,
            },
          },
          network: network.label,
          networkValue: network.value,
          cryptoImg: crypto.img,
        },
      });
    } catch (error: any) {
      toast.update(toastId, {
        render: "Failed to process request. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
      console.error("Failed to get withdrawal quote:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCryptoChange = (selectedCrypto: (typeof CRYPTOS)[0]) => {
    setCrypto(selectedCrypto);
    setShowCryptoModal(false);
  };

  return (
    <main className="mt-0 lg:mt-8">
      <DashboardHeader className="relative flex items-center justify-center text-2xl tracking-wide md:text-3xl lg:text-xl">
        <IoIosArrowBack
          onClick={handleBackClick}
          size={25}
          className="absolute left-2 top-1/2 -translate-y-1/2 transform cursor-pointer lg:left-7"
        />
        Withdraw to Bank
      </DashboardHeader>
      <section className="relative mx-auto my-10 w-full px-2">
        {/* Crypto image and title */}
        <div className="flex flex-col items-center">
          <h1 className="pb-3 text-3xl font-semibold">Cryptocurrency</h1>
          <img
            src={crypto.img}
            alt={crypto.label}
            className="mb-2 h-[121px] w-[121px]"
          />
        </div>
        {/* Info banner */}
        <div className="mb-6 mt-4 px-0 text-center text-base md:px-5 md:text-lg">
          When withdrawing crypto, the amount will be converted to Naira based
          on current market rates. The final amount you receive may vary
          slightly due to market fluctuations.
        </div>

        {/* Crypto type dropdown */}
        <div className="relative mb-4">
          <label className="mb-1 block text-lg font-medium">Crypto type</label>
          <button
            className="flex w-full items-center justify-between rounded border px-3 py-2"
            onClick={() => setShowCryptoModal(true)}
            type="button"
          >
            {crypto.label}
            <span className="ml-2">▼</span>
          </button>

          {/* Slide-down modal for crypto selection */}
          <AnimatePresence>
            {showCryptoModal && (
              <>
                <motion.div
                  className="fixed inset-0 z-40 bg-black bg-opacity-30"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={backdropVariants}
                  onClick={() => setShowCryptoModal(false)}
                />

                {/* Modal container */}
                <motion.div
                  className="fixed left-[5%] top-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg bg-white p-0 shadow-xl md:left-[25%] lg:left-1/2"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={modalVariants}
                >
                  <div className="p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-medium">
                        Select Cryptocurrency Type
                      </h3>
                      <button
                        onClick={() => setShowCryptoModal(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <IoClose size={24} />
                      </button>
                    </div>

                    {/* Crypto options */}
                    <div className="space-y-3">
                      {CRYPTOS.map((c) => (
                        <div
                          key={c.value}
                          className={`flex items-center justify-between rounded-lg border border-gray-200 p-3
                            ${c.disabled ? "cursor-not-allowed bg-gray-100 opacity-60" : "cursor-pointer hover:bg-gray-50"}`}
                          onClick={() => !c.disabled && handleCryptoChange(c)}
                          tabIndex={c.disabled ? -1 : 0}
                          aria-disabled={c.disabled}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${c.value === "bitcoin" ? "bg-purple-100" : c.value === "usdc" ? "bg-blue-100" : "bg-green-100"}`}
                            >
                              <img
                                src={c.img}
                                alt={c.label}
                                className="h-8 w-8"
                              />
                            </div>
                            <span className="font-medium">
                              {c.value === "bitcoin"
                                ? "BTC"
                                : c.value.toUpperCase()}
                            </span>
                          </div>
                          <input
                            type="radio"
                            checked={crypto.value === c.value}
                            readOnly
                            disabled={c.disabled}
                            className="h-5 w-5 accent-purple-600"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Token network dropdown */}
        <div className="relative mb-4">
          <label className="mb-1 block text-lg font-medium">
            Token network
          </label>
          <button
            className="flex w-full items-center justify-between rounded border px-3 py-2"
            onClick={() => setShowNetworkModal(true)}
            type="button"
          >
            {network.label}
            <span className="ml-2">▼</span>
          </button>

          <AnimatePresence>
            {showNetworkModal && (
              <>
                <motion.div
                  className="fixed inset-0 z-40 bg-black bg-opacity-30"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={backdropVariants}
                  onClick={() => setShowNetworkModal(false)}
                />

                {/* Modal container */}
                <motion.div
                  className="fixed left-[5%] top-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg bg-white p-0 shadow-xl md:left-[25%] lg:left-1/2"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={modalVariants}
                >
                  <div className="p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-medium">
                        Select Token Network
                      </h3>
                      <button
                        onClick={() => setShowNetworkModal(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <IoClose size={24} />
                      </button>
                    </div>

                    {/* Network options - filtered by selected crypto */}
                    <div className="space-y-3">
                      {availableNetworks.map((n) => (
                        <div
                          key={n.value}
                          className={`flex items-center justify-between rounded-lg border border-gray-200 p-3
                            ${n.disabled ? "cursor-not-allowed bg-gray-100 opacity-60" : "cursor-pointer hover:bg-gray-50"}`}
                          onClick={() => {
                            if (!n.disabled) {
                              setNetwork(n);
                              setShowNetworkModal(false);
                            }
                          }}
                          tabIndex={n.disabled ? -1 : 0}
                          aria-disabled={n.disabled}
                        >
                          <span className="font-medium">{n.label}</span>
                          <input
                            type="radio"
                            checked={network.value === n.value}
                            readOnly
                            disabled={n.disabled}
                            className="h-5 w-5 accent-purple-600"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Enter Amount */}
        <div className="mb-6">
          <label className="mb-1 block text-lg font-medium">Enter Amount</label>
          <div className="flex items-center rounded border px-3 py-2">
            <input
              type="number"
              className="flex-1 bg-transparent outline-none"
              placeholder={`0.00 ${crypto.label}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={0}
              step="any"
            />
            <span className="ml-2 font-bold text-green-600">
              {crypto.label}
            </span>
          </div>
        </div>

        {/* Error message */}
        {offrampQuoteError && (
          <div className="mt-4 text-center text-sm text-red-600">
            {offrampQuoteError}
          </div>
        )}

        {/* Preview Withdrawal Button */}
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center transition-all duration-300 ease-in-out hover:scale-110 hover:text-text2"
            disabled={isSubmitting}
          >
            <IoIosArrowDropleft size={25} />
          </button>
          <button
            className="rounded-md bg-text2 px-8 py-2 font-semibold text-white
              transition-all duration-300 ease-in-out hover:scale-105 hover:bg-opacity-90 hover:shadow-lg
              active:scale-95 active:transform disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handlePreviewWithdrawal}
            disabled={!amount || isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Preview withdrawal"}
          </button>
        </div>
      </section>
    </main>
  );
};

export default WithdrawToBank;
