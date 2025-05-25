import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Alert } from "@mui/material";
import { Button } from "@material-tailwind/react";
import { AppDispatch } from "../../../shared/redux/store";
import { useAllBanks } from "../../../shared/Hooks/useUserProfile";
import BankDropdown, { Bank } from "../../../components/common/BankDropdown";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import { GetAccountName } from "../../../shared/redux/slices/transaction.slices";

const SelectAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { useBanks } = useAllBanks();
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const { amount, accountNumber } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setError("");
  };

  const verifyAccount = async () => {
    if (!selectedBank) {
      setError("Please select a bank");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await dispatch(
        GetAccountName({
          accountNumber,
          bankCode: selectedBank.code,
        }),
      ).unwrap();

      if (response.result.status) {
        navigate("/dashboard/wallet/verify-account", {
          state: {
            accountName: response.result.data.account_name,
            accountNumber: response.result.data.account_number,
            bankName: selectedBank.name,
            bankCode: selectedBank.code,
            amount,
          },
        });
      } else {
        setError(
          response.result.message ||
            "Unable to verify account. Please check the details and try again.",
        );
      }
    } catch (error: any) {
      setError(error || "An error occurred while verifying the account.");
    } finally {
      setLoading(false);
    }
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
            <div className="tracking-wide">Select Bank</div>
          </div>
        </DashboardHeader>
      </header>

      <section className="mt-8">
        <BankDropdown
          banks={useBanks?.banks || []}
          onBankSelect={handleBankSelect}
          selectedBank={selectedBank}
          className="mt-6"
          required
          error={error && !selectedBank ? error : ""}
        />

        {error && selectedBank && (
          <Alert severity="error" className="mt-4">
            {error}
          </Alert>
        )}

        <Button
          variant="text"
          className="mt-8 flex w-full items-center justify-center bg-text2 py-4 text-sm normal-case text-white hover:bg-text2"
          onClick={verifyAccount}
          disabled={!selectedBank || loading}
          loading={loading}
        >
          Verify Account
        </Button>
      </section>
    </main>
  );
};

export default SelectAccount;
