import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WithdrawAmountModalProps } from "../../../../../shared/types/types";
import usdc from "../../../../../Assets/svg/dashboard/Group 99764.png";
import lisk from "../../../../../Assets/svg/dashboard/token_lisk.svg";
import usdt from "../../../../../Assets/svg/dashboard/usdc.svg";
import FormInput from "../../../../common/FormInput";
import { IoMdClose } from "react-icons/io";

const NAIRA_EQUIVALENT_RATE = 1549.43;

const WithdrawBankAccount: React.FC<WithdrawAmountModalProps> = ({
  isModalOpen,
  toggleModal,
  walletType,
}) => {
  const navigate = useNavigate();
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [nairaValue, setNairaValue] = useState<string>("NGN 0.00");

  useEffect(() => {
    if (tokenAmount && !isNaN(parseFloat(tokenAmount)) && selectedToken) {
      const calculated = parseFloat(tokenAmount) * NAIRA_EQUIVALENT_RATE;
      setNairaValue(`NGN ${calculated.toLocaleString(undefined, { minimumFractionDigits: 2 })}`);
    } else {
      setNairaValue("NGN 0.00");
    }
  }, [tokenAmount, selectedToken]);

  const handleCryptoTypeSelect = (cryptoType: string) => {
    setSelectedToken(cryptoType);
  };

  const handleTokenAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setTokenAmount(value);
    }
  };

  const handleContinue = () => {
    if (!selectedToken || !tokenAmount) return;

    navigate("/dashboard/wallet/select-bank", {
      state: {
        amount: tokenAmount,
        nairaEquivalent: nairaValue,
        tokenSymbol: selectedToken,
        walletType: walletType,
      },
    });

    if (toggleModal) {
      toggleModal();
    }
  };

  const isOpen = isModalOpen === true;

  useEffect(() => {
    if (!isOpen) {
      setSelectedToken(null);
      setTokenAmount("");
      setNairaValue("NGN 0.00");
    }
  }, [isOpen]);

  return (
    <>
      <Dialog open={isOpen} handler={toggleModal || (() => {})}  size="sm" className="p-4">
        <DialogHeader className="flex items-center justify-between">
          <div className="w-8" /> 
          <Typography
            variant="h1"
            className="flex-grow text-center text-lg font-semibold text-black sm:text-xl"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Bank Account Withdrawal
          </Typography>
          <IconButton
            variant="text"
            color="gray"
            onClick={toggleModal}
            className="p-2"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <IoMdClose size={24} />
          </IconButton>
        </DialogHeader>

        <DialogBody>
          <hr className="h-[1px] rounded-md" />
          <div className="mt-3 flex flex-col justify-between gap-2 text-sm sm:flex-row sm:text-base">
            <Typography className="font-normal text-howtext" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
              Duration
            </Typography>
            <Typography className="font-medium text-black" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
              2-3 business days
            </Typography>
          </div>
          <hr className="mt-3 h-[1px] rounded-md" />
          <div className="mt-5 flex flex-col justify-between gap-2 text-sm sm:flex-row sm:text-base">
            <Typography className="font-normal text-howtext" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
              Withdrawal limit
            </Typography>
            <Typography className="font-medium text-black" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
              $10,000 per transaction
            </Typography>
          </div>
          <hr className="mt-3 h-[1px] rounded-md" />
          <div className="mt-3 flex flex-col justify-between gap-2 text-sm sm:text-base">
            <Typography className="font-normal text-howtext" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
              Select token type
            </Typography>
            <hr className="h-[1px] rounded-md" />
            <div className="mt-[1em] flex flex-col items-center justify-center gap-[2em] md:flex-row md:items-start md:justify-start">
              {[
                { type: "LISK", icon: lisk },
                { type: "USDC", icon: usdc },
                { type: "USDT", icon: usdt },
              ].map(({ type, icon }) => (
                <button
                  key={type}
                  onClick={() => handleCryptoTypeSelect(type)}
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
            label={`Enter ${selectedToken || "token"} amount`}
            placeholder="0.00"
            className="mb-2 rounded-none"
            labelClassName="text-black mt-4 text-gray-800"
            paddingY="3"
            value={tokenAmount}
            onChange={handleTokenAmountChange}
            type="text"
            disabled={!selectedToken}
          />
          {selectedToken && (
            <span className="text-sm text-[#61C040]">
              1 {selectedToken} equivalent rate = {NAIRA_EQUIVALENT_RATE} NGN
            </span>
          )}

          <FormInput
            label="Naira Amount"
            placeholder="NGN 0.00"
            className="rounded-none"
            labelClassName="text-black mt-4 text-gray-800"
            paddingY="3"
            value={nairaValue}
            readOnly
          />
        </DialogBody>

        <DialogFooter>
          <Button
            variant="text"
            className="w-full bg-text2 py-3 text-sm font-normal normal-case text-white hover:bg-text2"
            onClick={handleContinue}
            disabled={!selectedToken || !tokenAmount || parseFloat(tokenAmount) <= 0}
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Continue
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default WithdrawBankAccount;