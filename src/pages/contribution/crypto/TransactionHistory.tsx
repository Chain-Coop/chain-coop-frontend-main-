import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "../../../shared/redux/store";
import {
  StopPeriodicPool,
  ResumePeriodicPool,
} from "../../../shared/redux/slices/web3.slices";

interface Transaction {
  txHash: string;
  amount: string;
  timestamp: string;
  status: "CONFIRMED" | "PENDING" | "FAILED" | string;
}

interface ContributionData {
  poolId: string;
  poolType: "oneTime" | "periodic";
  tokenSymbol: string;
  totalAmount: string;
  transactions: Transaction[];
  isActive: boolean;
}

interface TransactionHistoryProps {
  contribution: ContributionData;
}

const formatTimestamp = (timestamp: string): string => {
  try {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "Invalid Date";
    const optionsDate: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const optionsTime: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    const formattedDate = date.toLocaleDateString("en-GB", optionsDate);
    const formattedTime = date.toLocaleTimeString("en-US", optionsTime);
    return `${formattedDate.split(", ")[0]}: ${formattedDate.split(", ")[1]}, ${formattedTime}`;
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    return "Invalid Date";
  }
};

const getStatusStyles = (status: string): string => {
  switch (status?.toUpperCase()) {
    case "CONFIRMED":
    case "SUCCESSFUL":
      return "text-green-500";
    case "PENDING":
      return "text-yellow-500";
    case "FAILED":
    case "DECLINED":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

const formatStatus = (status: string): string => {
  switch (status?.toUpperCase()) {
    case "CONFIRMED":
      return "Successful";
    case "PENDING":
      return "Pending";
    case "FAILED":
      return "Declined";
    default:
      return status || "Unknown";
  }
};

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  contribution,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const transactions = contribution?.transactions || [];
  const id = contribution.poolId;

  const [isActive, setIsActive] = useState(contribution?.isActive);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    setIsActive(contribution?.isActive);
  }, [contribution?.isActive]);

  const handleToggleAutoDeduction = async () => {
    if (!id || isToggling) return;

    setIsToggling(true);
    const actionToDispatch = isActive
      ? StopPeriodicPool(id)
      : ResumePeriodicPool(id);

    try {
      await dispatch(actionToDispatch).unwrap();
      const newState = !isActive;
      setIsActive(newState);
      toast.success(`Auto-deduction turned ${newState ? "ON" : "OFF"}.`);
    } catch (error: any) {
      console.error("Toggle auto-deduction error:", error);
      toast.error(error?.message || "Failed to update auto-deduction status.");
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <section className="my-10 w-full">
      {/* Auto-Deduction Section*/}
      {contribution?.poolType === "periodic" && (
        <div className="mb-6 flex items-center justify-between rounded-lg bg-gray-100 p-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">
              Auto-Deduction from Wallet
            </span>
          </div>
          {/* --- Updated Button --- */}
          <button
            onClick={handleToggleAutoDeduction}
            disabled={isToggling}
            className={`rounded-full px-4 py-1 text-sm font-semibold text-white transition-colors duration-200 ${
              isActive
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            } ${isToggling ? "cursor-not-allowed opacity-70" : ""}`}
          >
            {isToggling ? "Updating..." : isActive ? "Turn Off" : "Turn On"}
          </button>
        </div>
      )}

      {/* Header and Search */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">Transaction history</h2>
        <p className="text-sm text-gray-500">
          See all withdrawal and funding on this group
        </p>
      </div>
      <div className="mb-6 hidden items-center gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search transaction"
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <IoSearchOutline className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>
        <button className="whitespace-nowrap rounded-lg border border-purple-600 px-5 py-2 text-sm font-semibold text-purple-600 hover:bg-purple-50">
          See all
        </button>
      </div>

      {/* Transaction List */}
      {transactions.length > 0 ? (
        <div className="relative space-y-6 pl-6">
          {/* Vertical Line */}
          <div className="absolute bottom-0 left-2 top-0 w-[1px] bg-[#430280] md:w-0.5"></div>

          {transactions.map((tx, index) => (
            <div key={tx.txHash || index} className="relative">
              <div className="absolute -left-[24px] top-1 h-4 w-4 rounded-full bg-[#430280]"></div>

              {/* Transaction Card */}
              <div className="ml-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
                  <span>Saving token: {contribution.tokenSymbol}</span>
                </div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
                  {/* Left Side */}
                  <div className="flex items-center justify-between md:flex-col md:items-start">
                    <p className="mb-1 text-sm font-medium text-gray-800">
                      Deposited amount:{" "}
                      <span className="text-sm font-semibold text-purple-600">
                        ${tx.amount}
                      </span>
                    </p>
                    <p className="text-sm font-medium text-gray-500">
                      Current Balance: $ {contribution.totalAmount}
                    </p>
                  </div>
                  {/* Right Side */}
                  <div className="text-left md:text-right">
                    <p className="mb-1 text-sm text-gray-600">
                      {formatTimestamp(tx.timestamp)}
                    </p>
                    <p
                      className={`text-sm font-semibold ${getStatusStyles(tx.status)}`}
                    >
                      Status: {formatStatus(tx.status)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-gray-500">
          No transactions found for this contribution.
        </div>
      )}
    </section>
  );
};

export default TransactionHistory;
