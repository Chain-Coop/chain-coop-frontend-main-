import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../shared/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import { CashwyreOfframpQuote } from "../../../shared/redux/slices/web3.slices";
import btcImg from "../../../Assets/svg/dashboard/bitcoin.svg";
import usdcImg from "../../../Assets/svg/dashboard/usd.svg";
import usdtImg from "../../../Assets/svg/dashboard/usdt.svg";
import { IoIosArrowDropleft, IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";
import { NumericFormat } from "react-number-format";

const CRYPTOS = [
  { label: "Bitcoin (BTC)", value: "bitcoin", img: btcImg, disabled: false },
  { label: "USDC", value: "usd-coin", img: usdcImg, disabled: false },
  { label: "USDT", value: "usdt", img: usdtImg, disabled: false },
];

const ALL_NETWORKS = [
  { label: "BTC Core", value: "BTC", disabled: false },
  { label: "BTC Lightning", value: "BTC_LN", disabled: true },
  { label: "LISK", value: "lisk", disabled: true },
  { label: "BNB Smart Chain-BEP20", value: "bsc", disabled: false },
  { label: "Etherlink", value: "etherlink", disabled: true },
  { label: "Polygon", value: "polygon", disabled: true },
];

const NETWORKS_BY_CRYPTO: Record<string, string[]> = {
  bitcoin: ["BTC_LN", "BTC"],
  "usd-coin": ["lisk", "bsc", "etherlink", "polygon"],
  usdt: ["lisk", "bsc", "etherlink", "polygon"],
};

const WithdrawToBank: React.FC = () => {
  const [crypto, setCrypto] = useState(CRYPTOS[0]);
  const [availableNetworks, setAvailableNetworks] = useState<
    typeof ALL_NETWORKS
  >([]);
  const [network, setNetwork] = useState(ALL_NETWORKS[0]);
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { offrampQuoteError } = useSelector((state: any) => state.web3);

  useEffect(() => {
    const allowedNetworkValues =
      NETWORKS_BY_CRYPTO[crypto.value as keyof typeof NETWORKS_BY_CRYPTO] || [];

    const networks = ALL_NETWORKS.filter((n) =>
      allowedNetworkValues.includes(n.value),
    ).sort((a, b) => Number(a.disabled) - Number(b.disabled));

    setAvailableNetworks(networks);

    if (networks.length > 0) {
      const currentNetworkIsValid = networks.some(
        (n) => n.value === network.value && !n.disabled,
      );

      if (currentNetworkIsValid) {
        const currentNetObj = networks.find((n) => n.value === network.value);
        if (currentNetObj) setNetwork(currentNetObj);
      } else {
        const firstEnabled = networks.find((n) => !n.disabled);
        if (firstEnabled) {
          setNetwork(firstEnabled);
        } else {
          setNetwork(networks[0]);
        }
      }
    } else {
      setNetwork(ALL_NETWORKS[0]);
    }
  }, [crypto, network.value]);

  const handlePreviewWithdrawal = async () => {
    if (network.disabled) {
      toast.error("The selected network is currently disabled.", {
        position: "top-right",
      });
      return;
    }
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
        render:
          offrampQuoteError || "Failed to process request. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
      console.error("Failed to get withdrawal quote:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCryptoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedCrypto = CRYPTOS.find((c) => c.value === selectedValue);
    if (selectedCrypto && !selectedCrypto.disabled) {
      setCrypto(selectedCrypto);
    }
  };

  const handleNetworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedNet = availableNetworks.find(
      (n) => n.value === selectedValue,
    );
    if (selectedNet && !selectedNet.disabled) {
      setNetwork(selectedNet);
    } else if (selectedNet) {
      toast.warn(`Network ${selectedNet.label} is currently disabled.`, {
        position: "top-right",
      });
      setNetwork(selectedNet);
    }
  };

  const selectClasses =
    "w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-400 focus:border-text2 focus:outline-none focus:ring-2 focus:ring-text2 focus:ring-opacity-50 disabled:bg-gray-100 disabled:cursor-not-allowed";

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
        <div className="flex flex-col items-center">
          <h1 className="pb-3 text-3xl font-semibold">Cryptocurrency</h1>
          <img
            src={crypto.img}
            alt={crypto.label}
            className="mb-2 h-[121px] w-[121px]"
          />
        </div>
        <div className="mb-6 mt-4 px-0 text-center text-base md:px-5 md:text-lg">
          When withdrawing crypto, the amount will be converted to Naira based
          on current market rates. The final amount you receive may vary
          slightly due to market fluctuations.
        </div>

        {/* Crypto type dropdown */}
        <div className="relative mb-4">
          <label
            htmlFor="crypto-select"
            className="mb-1 block text-lg font-medium"
          >
            Crypto type
          </label>
          <div className="relative">
            <select
              id="crypto-select"
              value={crypto.value}
              onChange={handleCryptoChange}
              className={selectClasses}
            >
              {CRYPTOS.map((c) => (
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
              <svg
                className="h-5 w-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Token network dropdown */}
        <div className="relative mb-4">
          <label
            htmlFor="network-select"
            className="mb-1 block text-lg font-medium"
          >
            Token network
          </label>
          <div className="relative">
            <select
              id="network-select"
              value={network.value}
              onChange={handleNetworkChange}
              className={selectClasses}
              disabled={
                availableNetworks.length === 0 ||
                availableNetworks.every(
                  (n) => n.disabled && n.value !== network.value,
                )
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
                  No networks available for {crypto.label}
                </option>
              )}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-5 w-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Token amount input field */}
        <div className="mb-4">
          <label className="mb-1 block text-base font-medium">Token Amount</label>
          <div className="flex items-center rounded border px-3 py-2">
            <NumericFormat
              value={amount}
              thousandSeparator={true}
              decimalScale={crypto.value === "bitcoin" ? 8 : 6}
              placeholder="0.00"
              onValueChange={(values) => {
                setAmount(values.value);
              }}
              className="flex-1 bg-transparent outline-none"
              disabled={isSubmitting}
            />
            <span className="ml-2 text-sm font-medium text-gray-600">
              {crypto.value.toUpperCase()}
            </span>
          </div>
          <div className="mt-1 text-right text-xs text-gray-500">
            Min: {crypto.value === "bitcoin" ? "0.00050000" : "10.000000"} |
            Max: {crypto.value === "bitcoin" ? "1.00000000" : "5,000.000000"}
          </div>
        </div>

        {offrampQuoteError && (
          <div className="mt-4 text-center text-sm text-red-600">
            {offrampQuoteError}
          </div>
        )}
        {network.disabled && (
          <div className="mt-4 text-center text-sm text-orange-600">
            The selected network ({network.label}) is currently disabled. Please
            choose another network to proceed.
          </div>
        )}

        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={handleBackClick}
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
            disabled={
              !amount ||
              isSubmitting ||
              network.disabled ||
              (availableNetworks.length > 0 &&
                availableNetworks.every((n) => n.disabled))
            }
          >
            {isSubmitting ? "Processing..." : "Preview withdrawal"}
          </button>
        </div>
      </section>
    </main>
  );
};

export default WithdrawToBank;
