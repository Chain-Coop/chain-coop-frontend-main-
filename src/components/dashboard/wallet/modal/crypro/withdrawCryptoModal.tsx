import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { Alert } from "@mui/material";
import FormInput from "../../../../common/FormInput";
import usdc from "../../../../../Assets/svg/dashboard/Group 99764.png";
import lisk from "../../../../../Assets/svg/dashboard/token_lisk.svg";
import usdt from "../../../../../Assets/svg/dashboard/usdc.svg";
import PinModal from "../../../../common/PinModal";
import Success from "../../../../common/Success";

const tokenOptions = [
  { type: "LISK", icon: lisk },
  { type: "USDC", icon: usdc },
  { type: "USDT", icon: usdt },
];

const WithdrawCryptoModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    walletAddress: string;
    token: string;
    amount: string;
  }) => void;
}) => {
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleDialogClose = () => {
    setSelectedToken(null);
    setWalletAddress("");
    setAmount("");
    setPin("");
    setError(null);
    setShowPinModal(false);
    setShowSuccess(false);
    onClose();
  };

  const WALLET_ADDRESS_LENGTH = "0x8a21CF9Ba08Ae709D64Cb25AfAA951183EC9FF6D"
    .length;

  const isWalletAddressValid = walletAddress.length === WALLET_ADDRESS_LENGTH;

  const handleContinue = () => {
    if (!selectedToken || !walletAddress || !amount) {
      setError("All fields are required.");
      return;
    }
    if (!isWalletAddressValid) {
      setError(
        `Wallet address must be exactly ${WALLET_ADDRESS_LENGTH} characters long.`,
      );
      return;
    }
    setError(null);
    setShowPinModal(true);
    onClose();
  };

  const handlePinSubmit = (enteredPin: string) => {
    setPin(enteredPin);
    setShowPinModal(false);
    setShowSuccess(true);
    onSubmit({ walletAddress, token: selectedToken!, amount });
  };

  const handleSuccessClose = () => {
    handleDialogClose();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        handler={handleDialogClose}
        size="sm"
        className="p-4"
      >
        <DialogHeader>
          <Typography
            variant="h1"
            className="flex items-center justify-center text-center text-lg font-semibold text-black sm:text-xl"
          >
            Crypto Wallet Withdrawal
          </Typography>
        </DialogHeader>
        <DialogBody>
          <hr className="h-[1px] rounded-md" />
          <div className="mt-3 text-sm sm:flex-row sm:text-base">
            <Typography className="font-normal text-howtext">
              Select token type
            </Typography>
            <div className="mt-[1em] flex flex-col items-center justify-center gap-[2em] md:flex-row md:items-start md:justify-start">
              {tokenOptions.map(({ type, icon }) => (
                <button
                  key={type}
                  onClick={() => setSelectedToken(type)}
                  className={`flex w-[9em] items-center gap-2 rounded-md bg-[#ECE6F2] px-6 font-medium transition-all duration-300 lg:py-1
                    ${
                      selectedToken === type
                        ? "border-2 border-text2"
                        : "hover:bg-text2 hover:text-white"
                    }
                    transform uppercase hover:scale-105 active:scale-95`}
                >
                  <img src={icon} alt={type} className="h-8 w-8" />
                  <span>{type}</span>
                </button>
              ))}
            </div>
          </div>
          <FormInput
            label="Wallet Address"
            placeholder="0x94a3C1CE0F4af53Ba8D3e186eDB8D6adBeF4D3Ed"
            value={walletAddress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setWalletAddress(e.target.value)
            }
            className="mb-2 rounded-none"
            labelClassName="text-black mt-4 text-gray-800"
            paddingY="3"
          />
          <FormInput
            label="Amount"
            placeholder="$1000"
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAmount(e.target.value)
            }
            className=" rounded-none"
            labelClassName="text-black mt-4 text-gray-800"
            paddingY="3"
            type="number"
            min="0"
          />
          {error && (
            <Alert severity="error" className="mb-4 mt-4">
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
              !selectedToken ||
              !walletAddress ||
              !amount ||
              !isWalletAddressValid
            }
          >
            Continue
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Pin Modal */}
      <PinModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        onSubmit={handlePinSubmit}
        header="Enter Pin"
        title="Enter your transaction pin to proceed"
        loading={false}
        pin={pin}
        onPinChange={setPin}
      />

      {/* Success Modal */}
      <Success
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        title="Withdrawal Successful"
      />
    </>
  );
};

export default WithdrawCryptoModal;
