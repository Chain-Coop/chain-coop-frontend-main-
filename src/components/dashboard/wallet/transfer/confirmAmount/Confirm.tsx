import React, { useState } from "react";
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

  const { paymentPlan = "", contributionPlan = "Monthly", amount = 0 } = location.state as {
    paymentPlan?: string;
    contributionPlan?: string;
    amount?: number;
  } || {};

  const handleBackClick = () => {
    navigate("/dashboard/wallet/transfer");
  };

  const capitalizeContributionPlan = (plan: string) => {
    return plan.charAt(0).toUpperCase() + plan.slice(1);
  };

  const handleConfirmClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    setLoading(true);
    const body = {
      paymentPlan,
      contributionPlan: "Monthly",
      amount,
    };

    try {
      await dispatch(CreateContributionPlan(body)).unwrap();
      navigate("/dashboard");
    } catch (error: any) {
      const errorMessage = error.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="font-sans">
      <DashboardHeader
        className="relative lg:mt-4 cursor-pointer items-center px-4 md:px-6"
        onClick={handleBackClick}
      >
        <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />

        <div className="flex flex-grow items-center justify-center">
          <div className="text-lg font-semibold">Confirm Amount</div>
        </div>
      </DashboardHeader>

      <section className="px-4 lg:py-6 md:px-6 md:py-8">
        <div className="mt-4 flex justify-center">
          <h1 className="text-lg font-bold">NGN {amount.toLocaleString()}.00</h1>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <h1 className="font-normal text-base">Amount to Contribute (Monthly)</h1>
            <span className="text-base text-normal">NGN {amount.toLocaleString()}.00</span>
          </div>
          <hr className="w-full my-2" />
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <p className="text-base text-normal">Contribution Plan</p>
            <span className="text-base text-normal">{capitalizeContributionPlan(contributionPlan)}</span>
          </div>
          <hr className="w-full my-2" />
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <h1 className="font-normaltext-base ">Target Amount for Membership</h1>
            <span className="font-normal text-base">NGN 100,000.00</span>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Primary
            className="w-full max-w-md bg-text2 py-3 text-white text-base md:text-lg"
            onClick={handleConfirmClick}
            disabled={loading}
          >
            {loading ? (
              <ReactLoading
                color="#FFFFFF"
                width={25}
                height={25}
                type="spin"
              />
            ) : (
              <p className="font-semibold">
                Fund ₦{amount.toLocaleString()}.00
              </p>
            )}
          </Primary>
        </div>
        <p className="mt-6 text-center text-sm">
          <span className="font-semibold mr-1">Note: </span>
          Email will be sent 4 days as a reminder for your next month payment
        </p>
      </section>
    </main>
  );
};

export default Confirm;
