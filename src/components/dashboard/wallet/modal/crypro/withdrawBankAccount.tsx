import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { WithdrawAmountModalProps } from "../../../../../shared/types/types";
import etherium from "../../../../../Assets/svg/dashboard/contribution/etherum.svg";
import usdc from "../../../../../Assets/svg/dashboard/Group 99764.png";
import lisk from "../../../../../Assets/svg/dashboard/token_lisk.svg";
import usdt from "../../../../../Assets/svg/dashboard/usdc.svg";
import FormInput from "../../../../common/FormInput";

const WithdrawBankAccount: React.FC<WithdrawAmountModalProps> = ({
  isModalOpen,
  toggleModal,
}) => {
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  const handleOpen = () => {
    if (toggleModal) {
      toggleModal();
    }
  };

  const isOpen = isModalOpen === true;

  const handleCryptoTypeSelect = (cryptoType: string) => {
    setSelectedToken(cryptoType);
  };

  return (
    <main>
      <Dialog open={isOpen} handler={handleOpen} size="sm" className="p-4">
        <DialogHeader>
          <Typography
            variant="h1"
            className="flex items-center justify-center text-center text-lg font-semibold text-black sm:text-xl"
          >
            Bank Account Withdrawal
          </Typography>
        </DialogHeader>

        <DialogBody>
          <hr className="h-[1px] rounded-md" />
          <div className="mt-3 flex flex-col justify-between gap-2 text-sm sm:flex-row sm:text-base">
            <Typography className="font-normal text-howtext">
              Duration
            </Typography>
            <Typography className="font-medium text-black">
              2-3 business days
            </Typography>
          </div>
          <hr className="mt-3 h-[1px] rounded-md" />
          <div className="mt-5 flex flex-col justify-between gap-2 text-sm sm:flex-row sm:text-base">
            <Typography className="font-normal text-howtext">
              Withdrawal limit
            </Typography>
            <Typography className="font-medium text-black">
              $10,000 per transaction
            </Typography>
          </div>
          <hr className="mt-3 h-[1px] rounded-md" />
          <div className="mt-3 flex flex-col justify-between gap-2 text-sm sm:text-base">
            <Typography className="font-normal text-howtext">
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
            label="Enter USDT amount"
            placeholder="USDC"
            className="mb-2 rounded-none"
            labelClassName="text-black mt-4 text-gray-800"
            paddingY="3"
          />
          <span className="text-sm text-[#61C040]">
            1 USDC equivalent rate = 1549,43 NGN{" "}
          </span>

          <FormInput
            label="Naira Amount"
            placeholder="USDC"
            className=" rounded-none"
            labelClassName="text-black mt-4 text-gray-800"
            paddingY="3"
          />
        </DialogBody>

        <DialogFooter>
          <Button
            variant="text"
            className="w-full bg-text2 py-3 text-sm font-normal normal-case text-white hover:bg-text2"
            onClick={handleOpen}
            disabled={!selectedToken}
          >
            Continue
          </Button>
        </DialogFooter>
      </Dialog>
    </main>
  );
};

export default WithdrawBankAccount;
