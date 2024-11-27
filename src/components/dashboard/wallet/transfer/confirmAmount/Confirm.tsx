import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { AppDispatch } from "../../../../../shared/redux/store";
import { CreateContributionPlan } from "../../../../../shared/redux/slices/transaction.slices";
import { useAppDispatch } from "../../../../../shared/redux/reduxHooks";
import { DashboardHeader } from "../../../../common/DashboardHeader";
import { IoIosArrowBack } from "react-icons/io";
import { Primary } from "../../../../common/Button";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const Confirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useAppDispatch();
  const [amount, setAmount] = useState<string>("");

  const { contributionPlan } =
    (location.state as {
      contributionPlan: string;
    }) || {};

  useEffect(() => {
    if (!contributionPlan) {
      navigate("/dashboard/wallet/transfer");
    }
  }, [contributionPlan, navigate]);

  const handleBackClick = () => {
    navigate("/dashboard/wallet/transfer");
  };

  const capitalizeContributionPlan = (plan: string) => {
    return plan.charAt(0).toUpperCase() + plan.slice(1);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
  };

  const handleConfirmClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }

    setLoading(true);
    const body = {
      contributionPlan,
      amount: parseFloat(amount),
    };

    try {
      const response = await dispatch(CreateContributionPlan(body)).unwrap();
      if (response.transaction.statusCode === 201) {
        toast.success(response.transaction.message);
      }
      navigate("/dashboard/contribution");
    } catch (error: any) {
      const errorMessage = error || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!contributionPlan) {
    return null;
  }

  return (
    <main className="font-sans">
      <DashboardHeader
        className="relative cursor-pointer items-center px-4 md:px-6 lg:mt-4"
        onClick={handleBackClick}
      >
        <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />

        <div className="flex flex-grow items-center justify-center">
          <div className="text-lg font-semibold">Contribution Amount</div>
        </div>
      </DashboardHeader>

      <section className="px-4 md:px-6 md:py-8 lg:py-6">
        <header className="mt-4 flex justify-center">
          <h1 className="text-lg font-bold">
            NGN {amount ? parseFloat(amount).toLocaleString() : "0"}.00
          </h1>
        </header>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col justify-between md:flex-row md:items-center">
            <h1 className="text-base font-medium">
              Amount to Contribute (
              {capitalizeContributionPlan(contributionPlan)})
            </h1>
            <span className="text-normal text-base">
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-text2 focus:outline-none focus:ring-text2 md:w-auto"
                placeholder="Enter amount"
              />
            </span>
          </div>
          <hr className="my-2 w-full" />
          <div className="flex flex-col justify-between md:flex-row md:items-center">
            <p className="text-normal text-base">Contribution Plan</p>
            <span className="text-base font-medium">
              {capitalizeContributionPlan(contributionPlan)}
            </span>
          </div>
          <hr className="my-2 w-full" />
        </div>
        <div className="mt-8 flex justify-center">
          <Primary
            className="w-full max-w-md cursor-pointer bg-text2 px-2 py-3 text-base text-white md:text-lg"
            onClick={handleConfirmClick}
            disabled={loading || !amount}
          >
            {loading ? (
              <ReactLoading
                color="#FFFFFF"
                width={25}
                height={25}
                type="spin"
              />
            ) : (
              <p className="font-semibold">Create Contribution</p>
            )}
          </Primary>
        </div>
        <p className="mt-6 text-center text-sm">
          <span className="mr-1 font-semibold">Note: </span>
          Email will be sent 4 days as a reminder for your next{" "}
          {contributionPlan.toLowerCase()} payment
        </p>
      </section>
    </main>
  );
};

export default Confirm;
