import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { Alert } from "@mui/material";
import { Button, Typography } from "@material-tailwind/react";
import { AppDispatch } from "../../../shared/redux/store";
import useUserProfile from "../../../shared/Hooks/useUserProfile";
import { WithdrawalFromContribution } from "../../../shared/redux/slices/transaction.slices";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import { formatBalance } from "../../../shared/utils/format";
import Success from "../../../components/common/Success";
import { parseISO, isAfter, isToday } from "date-fns";

const ConfirmAmount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { profileDetails } = useUserProfile();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [amountInNaira, setAmountInNaira] = useState<number | null>(null);
  const [contributionId, setContributionId] = useState<string | null>(null);
  const [savingsType, setSavingsType] = useState<string>("FLEXIBLE");
  const [withdrawalDate, setWithdrawalDate] = useState<string | null>(null);

  const isBeforeWithdrawalDate = () => {
    if (!withdrawalDate) return false;
    try {
      const parsedWithdrawalDate = parseISO(withdrawalDate);
      const today = new Date();
      return (
        isAfter(parsedWithdrawalDate, today) && !isToday(parsedWithdrawalDate)
      );
    } catch (e) {
      return false;
    }
  };

  const calculateFees = () => {
    let fees = 50; 

    if (profileDetails?.membershipStatus === "inactive") {
      fees += 1000;
    }

    const isLockSavings = savingsType === "Lock";

    if (isLockSavings && isBeforeWithdrawalDate()) {
      fees += 2000;
    }

    return fees;
  };

  const totalFees = calculateFees();
  const totalDeduction = amountInNaira ? amountInNaira + totalFees : 0;

  useEffect(() => {
    if (!location.state) {
      setError("Missing required information. Please try again.");
      return;
    }

    const {
      amountInNaira: amount,
      contributionId: id,
      savingsType: type,
      withdrawalDate: wDate,
    } = location.state as {
      amountInNaira?: number;
      contributionId?: string;
      savingsType?: string;
      withdrawalDate?: string;
    };

    if (!amount || !id) {
      setError("Invalid amount or contribution ID. Please try again.");
      return;
    }

    setAmountInNaira(amount);
    setContributionId(id);
    setSavingsType(type || "FLEXIBLE");
    setWithdrawalDate(wDate || null);
  }, [location.state]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/dashboard");
  };

  const handleFund = async () => {
    if (!amountInNaira || !contributionId) {
      setError("Missing required information. Please try again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const body = {
        amount: totalDeduction,
        contributionId: contributionId,
      };

      const result = await dispatch(WithdrawalFromContribution(body)).unwrap();
      if (result?.landing?.statusCode === 200) {
        setLoading(false);
        setIsModalOpen(true);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.message || "An error occurred. Please try again.");
    }
  };

  if (error && (!amountInNaira || !contributionId)) {
    return (
      <main>
        <DashboardHeader
          className="relative cursor-pointer items-center lg:mt-[2em]"
          onClick={handleBackClick}
        >
          <IoIosArrowBack
            size={25}
            className="absolute left-0 cursor-pointer"
          />
          <div className="flex flex-grow items-center justify-center">
            <div className="tracking-wide">Error</div>
          </div>
        </DashboardHeader>
        <div className="mt-8 px-4">
          <Alert severity="error">{error}</Alert>
          <div className="mt-4 flex justify-center">
            <Button
              variant="text"
              className="w-[70%] bg-text2 py-3 text-white"
              onClick={handleBackClick}
            >
              Go Back
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const isLockSavings = savingsType === "Lock";

  const showEarlyWithdrawalFee = isLockSavings && isBeforeWithdrawalDate();

  return (
    <main>
      <DashboardHeader
        className="relative cursor-pointer items-center lg:mt-[2em]"
        onClick={handleBackClick}
      >
        <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />
        <div className="flex flex-grow items-center justify-center">
          <div className="tracking-wide">Confirm Withdrawal</div>
        </div>
      </DashboardHeader>

      <section className="px-4">
        <div className="mt-[2.5em] flex justify-center">
          <h1 className="text-xl font-bold">
            {amountInNaira ? formatBalance(amountInNaira) : "---"}
          </h1>
        </div>

        <div className="mt-9 space-y-4 rounded-lg bg-gray-50 p-4">
          <div className="flex justify-between">
            <Typography className="text-base font-medium">
              Amount to Receive
            </Typography>
            <span className="font-medium">
              {amountInNaira ? formatBalance(amountInNaira) : "---"}
            </span>
          </div>

          <div className="space-y-2">
            <Typography className="text-base font-medium text-gray-700">
              Fees Breakdown:
            </Typography>

            {profileDetails?.membershipStatus === "inactive" && (
              <div className="flex justify-between">
                <Typography className="text-base text-amber-600">
                  Membership Fee
                </Typography>
                <span className="text-amber-600">₦1,000.00</span>
              </div>
            )}
            {showEarlyWithdrawalFee && (
              <div className="flex justify-between">
                <Typography className="text-base text-amber-600">
                  Early Withdrawal Fee
                </Typography>
                <span className="text-amber-600">₦2,000.00</span>
              </div>
            )}

            <div className="flex justify-between">
              <Typography className="text-base">Transaction Fee</Typography>
              <span>₦50.00</span>
            </div>
          </div>

          <hr className="border-gray-300" />

          <div className="flex justify-between font-semibold">
            <Typography className="text-base">Total Deduction</Typography>
            <span className="text-text2">{formatBalance(totalDeduction)}</span>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <Typography className="font-semibold">Contribution Plan</Typography>
            <span className="font-medium">
              {location.state?.contributionPlan || "Monthly"}
            </span>
          </div>
          <hr className="mt-4 w-full" />
        </div>

        {error && (
          <Alert severity="error" className="mt-4">
            {error}
          </Alert>
        )}

        <div className="mt-8 flex justify-center">
          <Button
            variant="text"
            className="w-[70%] bg-text2 py-3 text-sm normal-case text-white hover:bg-text2 disabled:bg-gray-300"
            onClick={handleFund}
            disabled={loading || !amountInNaira || !contributionId}
          >
            {loading
              ? "Processing..."
              : `Confirm Withdrawal (${formatBalance(totalDeduction)})`}
          </Button>
        </div>
      </section>

      <Success
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Withdrawal Successful"
      />
    </main>
  );
};

export default ConfirmAmount;
