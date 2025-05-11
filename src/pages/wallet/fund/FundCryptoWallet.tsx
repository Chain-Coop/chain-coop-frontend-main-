import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../shared/redux/store";
import { useDispatch } from "react-redux";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import { CashwyreFund } from "../../../shared/redux/slices/web3.slices";
import btcImg from "../../../Assets/svg/dashboard/wallet/btc.svg";
import usdcImg from "../../../Assets/svg/dashboard/Group 99764.png";
import usdtImg from "../../../Assets/svg/dashboard/usdc.svg";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

// Crypto options
const CRYPTOS = [
  { label: "Bitcoin (BTC)", value: "bitcoin", img: btcImg },
  { label: "USDC", value: "usdc", img: usdcImg },
  { label: "USDT", value: "usdt", img: usdtImg },
];

// All available networks
const ALL_NETWORKS = [
  { label: "BTC Lightning", value: "BTC_LN" },
  { label: "BTC", value: "btc" },
  { label: "LISK", value: "lisk" },
  { label: "BNB Smart Chain-BEP20", value: "bsc" },
  { label: "Etherlink", value: "etherlink" },
];

// Network options by crypto type
const NETWORKS_BY_CRYPTO = {
  bitcoin: ["BTC_LN", "btc"],
  usdc: ["lisk", "bsc", "etherlink"],
  usdt: ["lisk", "bsc", "etherlink"],
};

const FundCryptoWallet: React.FC = () => {
  const [crypto, setCrypto] = useState(CRYPTOS[0]);
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [availableNetworks, setAvailableNetworks] = useState<typeof ALL_NETWORKS>([]);
  const [network, setNetwork] = useState(ALL_NETWORKS[0]);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Update available networks when crypto changes
  useEffect(() => {
    // Get network values for the selected crypto
    const allowedNetworkValues = NETWORKS_BY_CRYPTO[crypto.value as keyof typeof NETWORKS_BY_CRYPTO] || [];
    
    // Filter networks to only show those that are allowed for this crypto
    const networks = ALL_NETWORKS.filter(n => allowedNetworkValues.includes(n.value));
    
    setAvailableNetworks(networks);
    
    // Select the first available network by default
    if (networks.length > 0) {
      // Check if current selected network is valid for this crypto
      const currentNetworkIsValid = networks.some(n => n.value === network.value);
      
      // If not valid, set to first available network
      if (!currentNetworkIsValid) {
        setNetwork(networks[0]);
      }
    }
  }, [crypto]);

  const handlePreviewOrder = async () => {
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
      const payload = {
        amount: Number(amount),
        crypto: crypto.value,
        network: network.value,
      };

      const cashwyrePayload = {
        body: payload,
      };

      const response = await dispatch(CashwyreFund(cashwyrePayload));

      toast.update(toastId, {
        render: "Request processed successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      navigate("/dashboard/wallet/fund/fund_crypto_wallet_preview", {
        state: {
          ...response.payload,
          network: network.label,
          networkValue: network.value,
        },
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to process request. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
      console.error("Error processing fund request:", error);
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
        stiffness: 300
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { 
        duration: 0.2 
      } 
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCryptoChange = (selectedCrypto: typeof CRYPTOS[0]) => {
    setCrypto(selectedCrypto);
    setShowCryptoModal(false);
  };

  return (
    <main className="mt-0 lg:mt-8">
      <DashboardHeader className=" relative flex items-center justify-center text-2xl tracking-wide md:text-3xl lg:text-xl">
        <IoIosArrowBack
          onClick={handleBackClick}
          size={25}
          className="absolute left-2 top-1/2 -translate-y-1/2 transform cursor-pointer lg:left-7"
        />
        Fund Wallet
      </DashboardHeader>
      <section className="relative mx-auto my-10 w-full px-2">
        {/* Crypto image and title */}
        <div className="flex flex-col items-center">
          <h1 className="pb-3 text-3xl font-semibold">Cryptocurrency</h1>
          <div className="flex h-[121px] w-[121px] items-center justify-center rounded-full bg-[#F9D68A]">
            <img
              src={crypto.img}
              alt={crypto.label}
              className="mb-2 h-16 w-16"
            />
          </div>
        </div>
        {/* Info banner */}
        <div className="my-4 px-5 text-center text-lg">
          The cryptocurrency the market prices varies, so there is no fixed
          crypto price. However, crypto will be credited based on the amount
          deposited with the current market price
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

                {/* Modal container*/}
                <motion.div
                  className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg bg-white p-0 shadow-xl"
                  style={{ 
                    margin: 0, 
                    maxHeight: "80vh"
                  }}
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
                          className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                          onClick={() => handleCryptoChange(c)}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${c.value === "bitcoin" ? "bg-purple-100" : c.value === "usdc" ? "bg-blue-100" : "bg-green-100"}`}
                            >
                              <img
                                src={c.img}
                                alt={c.label}
                                className="w-8 h-8"
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
                  className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg bg-white p-0 shadow-xl"
                  style={{ 
                    margin: 0, 
                    maxHeight: "80vh"
                  }}
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
                          className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                          onClick={() => {
                            setNetwork(n);
                            setShowNetworkModal(false);
                          }}
                        >
                          <span className="font-medium">{n.label}</span>
                          <input
                            type="radio"
                            checked={network.value === n.value}
                            readOnly
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
              placeholder="₦ 100,000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={0}
            />
            <span className="ml-2 font-bold text-green-600">NGN</span>
          </div>
        </div>
        {/* Preview Order Button */}
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center transition-all duration-300 ease-in-out hover:scale-110 hover:text-text2"
          >
            <IoIosArrowDropleft size={25} />
          </button>
          <button
            className="rounded-md bg-text2 px-8 py-2 font-semibold text-white
              transition-all duration-300 ease-in-out hover:scale-105 hover:bg-opacity-90 hover:shadow-lg
              active:scale-95 active:transform disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handlePreviewOrder}
            disabled={!amount || isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Preview order"}
          </button>
        </div>
      </section>
    </main>
  );
};

export default FundCryptoWallet;