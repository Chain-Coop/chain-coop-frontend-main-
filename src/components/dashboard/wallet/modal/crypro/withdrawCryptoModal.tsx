import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../shared/redux/store";
import type { RootState } from "../../../../../shared/redux/rootReducer";
import {
  WithdrawBitcoin,
  WithdrawCryptoToken,
} from "../../../../../shared/redux/slices/web3.slices";
import FormInput from "../../../../common/FormInput";
import usdcIcon from "../../../../../Assets/svg/dashboard/usd.svg";
import bitcoinIcon from "../../../../../Assets/svg/dashboard/bitcoin.svg";
import usdtIcon from "../../../../../Assets/svg/dashboard/usdt.svg";
import PinModal from "../../../../common/PinModal";
import Success from "../../../../common/Success";
import { toast } from "react-toastify";

const tokenOptions: TokenOptionType[] = [
  {
    type: "BITCOIN",
    value: "bitcoin",
    icon: bitcoinIcon,
    addressPattern: /^(1|3|bc1)[a-zA-HJ-NP-Z0-9]{25,39}$/,
    addressPlaceholder: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    tokenId: null,
  },
  {
    type: "USDC",
    value: "usdc",
    icon: usdcIcon,
    addressPattern: /^0x[a-fA-F0-9]{40}$/,
    addressPlaceholder: "0x8a21CF9Ba08Ae709D64Cb25AfAA951183EC9FF6D",
    tokenId: 2,
  },
  {
    type: "USDT",
    value: "usdt",
    icon: usdtIcon,
    addressPattern: /^0x[a-fA-F0-9]{40}$/,
    addressPlaceholder: "0x8a21CF9Ba08Ae709D64Cb25AfAA951183EC9FF6D",
    tokenId: 1,
  },
];

const ALL_NETWORKS: NetworkOptionType[] = [
  { label: "BTC Core", value: "BTC", disabled: false, forTokens: ["bitcoin"] },
  {
    label: "BNB Smart Chain (BEP20)",
    value: "BSC",
    disabled: false,
    forTokens: ["usdc", "usdt"],
  },
  {
    label: "Etherlink",
    value: "ETHERLINK",
    disabled: false,
    forTokens: ["usdc", "usdt"],
  },
  {
    label: "Lisk",
    value: "LISK",
    disabled: false,
    forTokens: ["usdc", "usdt"],
  },
  {
    label: "Polygon",
    value: "POLYGON",
    disabled: false,
    forTokens: ["usdc", "usdt"],
  },
];

interface TokenOptionType {
  type: string;
  value: string;
  icon: string;
  addressPattern: RegExp;
  addressPlaceholder: string;
  tokenId: number | null;
}

interface NetworkOptionType {
  label: string;
  value: string;
  disabled: boolean;
  forTokens: string[];
}

interface WithdrawCryptoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    walletAddress: string;
    token: string;
    tokenId: number | null;
    network: string;
    amount: string;
  }) => void;
}

const WithdrawCryptoModal: React.FC<WithdrawCryptoModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error: reduxError } = useSelector(
    (state: RootState) => state.web3,
  );

  const [selectedTokenValue, setSelectedTokenValue] = useState<string>("");
  const [selectedNetworkValue, setSelectedNetworkValue] = useState<string>("");

  const [selectedToken, setSelectedToken] = useState<TokenOptionType | null>(
    null,
  );
  const [selectedNetwork, setSelectedNetwork] =
    useState<NetworkOptionType | null>(null);

  const [availableNetworks, setAvailableNetworks] = useState<
    NetworkOptionType[]
  >([]);
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const tokenObj =
      tokenOptions.find((t) => t.value === selectedTokenValue) || null;
    setSelectedToken(tokenObj);
  }, [selectedTokenValue]);

  useEffect(() => {
    if (selectedToken) {
      setWalletAddress("");
      setError(null);

      let networksForToken: NetworkOptionType[] = [];
      if (selectedToken.value === "bitcoin") {
        const btcNetwork = ALL_NETWORKS.find((n) => n.value === "BTC");
        networksForToken = btcNetwork ? [btcNetwork] : [];
        setSelectedNetworkValue(btcNetwork?.value || "");
      } else if (
        selectedToken.value === "usdc" ||
        selectedToken.value === "usdt"
      ) {
        networksForToken = ALL_NETWORKS.filter((n) =>
          n.forTokens.includes(selectedToken.value),
        ).sort((a, b) => Number(a.disabled) - Number(b.disabled));
        const firstEnabled = networksForToken.find((n) => !n.disabled);
        setSelectedNetworkValue(firstEnabled?.value || "");
      } else {
        setSelectedNetworkValue("");
      }
      setAvailableNetworks(networksForToken);
    } else {
      setAvailableNetworks([]);
      setSelectedNetworkValue("");
      setWalletAddress("");
      setError(null);
    }
  }, [selectedToken]);

  useEffect(() => {
    const networkObj =
      availableNetworks.find((n) => n.value === selectedNetworkValue) || null;
    setSelectedNetwork(networkObj);
  }, [selectedNetworkValue, availableNetworks]);

  const handleDialogClose = () => {
    setSelectedTokenValue("");
    setWalletAddress("");
    setAmount("");
    setPin("");
    setError(null);
    setShowPinModal(false);
    setShowSuccess(false);
    onClose();
  };

  const isWalletAddressValid = () => {
    if (!selectedToken || !walletAddress) return false;
    return selectedToken.addressPattern.test(walletAddress);
  };
  const currentWalletAddressValid = isWalletAddressValid();

  const handleContinue = () => {
    if (!selectedToken || !walletAddress || !amount) {
      setError("Token, Wallet Address, and Amount are required.");
      return;
    }
    if (selectedToken.value !== "bitcoin" && !selectedNetwork) {
      setError("Please select a token network.");
      return;
    }
    if (selectedNetwork && selectedNetwork.disabled) {
      setError(
        "The selected network is currently disabled. Please choose another network.",
      );
      return;
    }
    if (!currentWalletAddressValid) {
      setError(`Invalid wallet address format for ${selectedToken.type}.`);
      return;
    }

    setError(null);
    setShowPinModal(true);
  };

  const handlePinSubmit = async (enteredPin: string) => {
    if (!selectedToken) {
      setError("Token selection is missing.");
      return;
    }

    setPin(enteredPin);
    const processingToastId = toast.loading("Processing withdrawal...", {
      position: "top-right",
    });

    try {
      let result;

      if (selectedToken.value === "bitcoin") {
        // Use WithdrawBitcoin for Bitcoin
        result = await dispatch(
          WithdrawBitcoin({
            amount,
            address: walletAddress,
            pin: enteredPin,
          }),
        ).unwrap();
      } else {
        // For other tokens (USDC, USDT), use WithdrawCryptoToken
        let networkForSubmission: string;

        if (selectedNetwork) {
          networkForSubmission = selectedNetwork.value;
        } else {
          setError("Network selection is missing.");
          return;
        }

        result = await dispatch(
          WithdrawCryptoToken({
            amount,
            network: networkForSubmission,
            token: selectedToken.value,
            address: walletAddress,
            tokenId: selectedToken.tokenId?.toString() || "",
            pin: enteredPin,
          }),
        ).unwrap();
      }

      toast.dismiss(processingToastId);
      toast.success("Withdrawal successful!", {
        position: "top-right",
        autoClose: 5000,
      });

      setShowPinModal(false);
      setShowSuccess(true);
      navigate("/dashboard/wallet/crypto_wallet");

      onSubmit({
        walletAddress,
        token: selectedToken.value,
        tokenId: selectedToken.tokenId,
        network:
          selectedToken.value === "bitcoin" ? "BTC" : selectedNetwork!.value,
        amount,
      });
    } catch (err: any) {
      console.error("Error during withdrawal:", err);

      toast.dismiss(processingToastId);
      toast.error(err.message || "Withdrawal failed", {
        position: "top-right",
        autoClose: 5000,
      });

      setShowPinModal(false);
      setError(err.message || "An unexpected error occurred during withdrawal");
    }
  };

  const handleSuccessClose = () => {
    handleDialogClose();
  };

  const needsNetworkSelection =
    selectedToken &&
    (selectedToken.value === "usdc" || selectedToken.value === "usdt");

  const formElementClasses =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-70";
  const labelClasses =
    "mb-1 block text-sm font-medium text-black text-gray-800";

  return (
    <>
      <Dialog
        open={isOpen}
        handler={() => {
          if (!showPinModal) {
            handleDialogClose();
          }
        }}
        size="sm"
        className="p-4"
      >
        <DialogHeader>
          <Typography
            variant="h1"
            className="flex w-full items-center justify-center text-center text-lg font-semibold text-black sm:text-xl"
          >
            Crypto Wallet Withdrawal
          </Typography>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <hr className="h-[1px] rounded-md" />

          <div>
            <label htmlFor="token-select" className={labelClasses}>
              Select Token{" "}
              {selectedToken && (
                <img
                  src={selectedToken.icon}
                  alt=""
                  className="ml-2 inline h-5 w-5 align-middle"
                />
              )}
            </label>
            <select
              id="token-select"
              value={selectedTokenValue}
              onChange={(e) => setSelectedTokenValue(e.target.value)}
              className={formElementClasses}
            >
              <option value="" disabled>
                Select a token
              </option>
              {tokenOptions.map((token) => (
                <option key={token.value} value={token.value}>
                  {token.type}
                </option>
              ))}
            </select>
          </div>

          {needsNetworkSelection && (
            <div>
              <label htmlFor="network-select" className={labelClasses}>
                Select Token Network
              </label>
              <select
                id="network-select"
                value={selectedNetworkValue}
                onChange={(e) => setSelectedNetworkValue(e.target.value)}
                disabled={!selectedToken || availableNetworks.length === 0}
                className={formElementClasses}
              >
                <option value="" disabled>
                  Select a network
                </option>
                {availableNetworks.map((network) => (
                  <option
                    key={network.value}
                    value={network.value}
                    disabled={network.disabled}
                  >
                    {network.label} {network.disabled ? "(Disabled)" : ""}
                  </option>
                ))}
              </select>
            </div>
          )}

          <FormInput
            label="Wallet Address"
            placeholder={
              selectedToken?.addressPlaceholder || "Enter wallet address"
            }
            value={walletAddress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setWalletAddress(e.target.value)
            }
            className="rounded-md"
            labelClassName="text-black text-gray-800"
            paddingY="2.5"
            disabled={!selectedToken}
          />
          <FormInput
            label="Amount"
            placeholder="Token amount"
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAmount(e.target.value)
            }
            className="rounded-md"
            labelClassName="text-black text-gray-800"
            paddingY="2.5"
            type="number"
            min="0"
            step="any"
            disabled={!selectedToken}
          />
          {error && (
            <Alert severity="error" className="mt-2">
              {error}
            </Alert>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            className="w-full bg-text2 py-3 text-sm font-normal normal-case text-white hover:bg-text2"
            onClick={handleContinue}
            disabled={
              loading || // Add loading state from Redux
              !selectedToken ||
              (needsNetworkSelection &&
                (!selectedNetwork || selectedNetwork.disabled)) ||
              !walletAddress ||
              !amount ||
              !currentWalletAddressValid
            }
          >
            {loading ? "Processing..." : "Continue"}
          </Button>
        </DialogFooter>
      </Dialog>

      {showPinModal && (
        <PinModal
          isOpen={showPinModal}
          onClose={() => {
            setShowPinModal(false);
            setError(null);
            setPin("");
          }}
          onSubmit={handlePinSubmit}
          header="Enter Pin"
          title="Enter your transaction pin to proceed"
          loading={loading}
          pin={pin}
          onPinChange={setPin}
        />
      )}

      <Success
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        title="Withdrawal Successful"
      />
    </>
  );
};

export default WithdrawCryptoModal;
