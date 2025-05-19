import { useState } from "react";
import { AppDispatch } from "../../../../../../../shared/redux/store";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import FormInput from "../../../../../../common/FormInput";
import { useAllBanks } from "../../../../../../../shared/Hooks/useUserProfile";
import BankDropdown, { Bank } from "../../../../../../common/BankDropdown";

import { Alert } from "@mui/material";
import { VerifyBvnDetails } from "../../../../../../../shared/redux/slices/kyc.slices";
import { IoMdClose } from "react-icons/io";

const VerifyBvn = ({
  isOpen,
  onClose,
  bvn,
}: {
  isOpen: boolean;
  onClose: () => void;
  bvn: string;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { useBanks } = useAllBanks();
  const [error, setError] = useState("");
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setError("");
    setVerified(false);
  };

  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setAccountNumber(value);
    setVerified(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedBank || !accountNumber || accountNumber.length < 10) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    const body = {
      accountNumber: accountNumber,
      bankcode: selectedBank.code,
    };

    dispatch(VerifyBvnDetails(body))
      .unwrap()
      .then((result) => {
        setLoading(false);
        setVerified(true);
      })
      .catch((error) => {
        setLoading(false);
        setError(error || "Verification failed. Please try again.");
      });
  };
  return (
    <Dialog
      size="md"
      open={isOpen}
      handler={onClose}
      className="py-6"
      dismiss={{ enabled: false }}
    >
      <form onSubmit={handleSubmit}>
        <button
          type="button"
          onClick={onClose}
          className="absolute left-4 top-4 z-10 rounded-full p-1.5 hover:bg-gray-100 focus:outline-none"
          aria-label="Close"
        >
          <IoMdClose size={24} />
        </button>
        <DialogHeader className="flex flex-col justify-center text-center">
          <Typography className="text-lg font-semibold leading-tight tracking-tight text-black lg:text-2xl">
            Verify Your BVN
          </Typography>
          <Typography className="mt-2 max-w-sm text-xs text-gray-500">
            We've sent a verification code to the phone number registered with
            your BVN ***{bvn.slice(-4)}
          </Typography>
        </DialogHeader>

        <DialogBody className="mx-auto grid max-w-md grid-cols-1 gap-3">
          <FormInput
            label="Account Number"
            type="text"
            labelClassName="text-black text-text2"
            autoComplete="off"
            className="rounded-lg"
            paddingY="3"
            maxLength={10}
            pattern="[0-9]*"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            required
          />

          <BankDropdown
            labelTextColor="text-text2"
            banks={useBanks?.banks || []}
            onBankSelect={handleBankSelect}
            selectedBank={selectedBank}
            error={error && !selectedBank ? error : ""}
          />

          {error && (
            <Alert severity="error" className="mt-2">
              {error}
            </Alert>
          )}

          {verified && (
            <Alert severity="success" className="mt-2">
              Account verified successfully
            </Alert>
          )}
        </DialogBody>

        <DialogFooter className="mx-auto max-w-sm">
          <Button
            type="submit"
            size="sm"
            disabled={
              !selectedBank ||
              !accountNumber ||
              accountNumber.length < 10 ||
              loading
            }
            loading={loading}
            className="w-full items-center justify-center rounded-lg bg-text2 text-center text-sm font-semibold normal-case text-text5"
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default VerifyBvn;
