import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Button } from "reactstrap";
import { Typography } from "@material-tailwind/react";
import { DashboardHeader } from "../../../components/common/DashboardHeader";

const CustomOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#E5E7EB",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000080",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000080",
  },
  "& input": {
    padding: "14px",
  },
}));

const CustomInputLabel = styled(InputLabel)({
  "&.Mui-focused": {
    color: "#000080",
  },
});

const BankAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const amount = location?.state?.amount;

  const [accountNumber, setAccountNumber] = useState("");
  const [error, setError] = useState("");

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAccountNumber(e.target.value);
    setError("");
  };

  const selectAccount = () => {
    if (accountNumber.length !== 10) {
      setError("Please enter a valid 10-digit account number.");
      return;
    }
    navigate("/dashboard/wallet/select-account", {
      state: { amount, accountNumber },
    });
  };

  return (
    <main>
      <header className="lg:mt-8">
        <DashboardHeader
          className="relative cursor-pointer items-center"
          onClick={handleBackClick}
        >
          <IoIosArrowBack
            size={25}
            className="absolute left-8 cursor-pointer"
          />
          <div className="flex flex-grow items-center justify-center">
            <div className="tracking-wide">Add Bank Account</div>
          </div>
        </DashboardHeader>
      </header>
      <section className="mt-8">
        <Typography className="text-sm font-normal">
          Please, only add a bank account that you own. Transactions to accounts
          that don't belong to you will be flagged
        </Typography>

        <div className="mt-6">
          <FormControl className="w-full" variant="outlined">
            <CustomInputLabel htmlFor="account-number">
              Account Number
            </CustomInputLabel>
            <CustomOutlinedInput
              id="account-number"
              type="text"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              label="Account Number"
              inputProps={{
                maxLength: 10,
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
            />
          </FormControl>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
        <Button
          variant="Text"
          className="mt-8 w-full bg-text2 py-3 text-white"
          onClick={selectAccount}
        >
          Continue
        </Button>
      </section>
    </main>
  );
};

export default BankAccount;
