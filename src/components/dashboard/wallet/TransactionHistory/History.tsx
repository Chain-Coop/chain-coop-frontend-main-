import { useState } from "react";
import {
  formatBalance,
  formatDayAndDate,
  formatMonthAndYear,
  formatRelativeTime,
} from "../../../../shared/utils/format";
import transact from "../../../../Assets/png/dashboard/wallet/transaction.png";
import { Button } from "@material-tailwind/react";
import Tooltip from "@mui/material/Tooltip";
import { Transaction } from "../../../../shared/types";
import { SkeletonTransactionCard } from "../../../common/Loading";
import { useWallet } from "../../../../shared/Hooks/useUserProfile";

const History = () => {
  const { usersTransaction, isLoading, error } = useWallet();
  const [showAll, setShowAll] = useState(false);

  const handleViewAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getAmountStyles = (type: "credit" | "debit") => {
    if (type === "debit") {
      return {
        color: "text-red-500",
        prefix: "-",
      };
    }
    return {
      color: "text-act",
      prefix: "+",
    };
  };

  const getTransactionsArray = () => {
    if (!usersTransaction) return [];

    if (Array.isArray(usersTransaction)) return usersTransaction;
    if (
      typeof usersTransaction === "object" &&
      usersTransaction !== null &&
      "data" in usersTransaction &&
      Array.isArray((usersTransaction as any).data)
    )
      return (usersTransaction as any).data;
    if (
      typeof usersTransaction === "object" &&
      usersTransaction !== null &&
      "transactions" in usersTransaction &&
      Array.isArray((usersTransaction as any).transactions)
    ) {
      return (usersTransaction as any).transactions;
    }

    const possibleArrays = Object.values(usersTransaction).filter(
      Array.isArray,
    );
    if (possibleArrays.length > 0) return possibleArrays[0];

    return [];
  };

  const transactions = getTransactionsArray();

  return (
    <main className="">
      <div className="flex flex-col gap-[1.5em] py-6">
        <div className="flex items-center justify-between px-2">
          <h1 className="text-xl font-semibold text-memt1 lg:text-xl">
            Recent Transactions
          </h1>
          {transactions.length > 3 && (
            <Button
              className="flex items-center rounded-lg border-[2px] border-text2 bg-inherit px-3 py-1 text-sm font-semibold text-memt1 md:px-4 md:text-base"
              onClick={handleViewAll}
            >
              {showAll ? "Close" : "View All"}
            </Button>
          )}
        </div>

        {isLoading ? (
          <section className="flex flex-col gap-[1em]">
            {[...Array(3)].map((_, index) => (
              <SkeletonTransactionCard key={index} />
            ))}
          </section>
        ) : transactions.length > 0 ? (
          transactions
            .slice(0, showAll ? transactions.length : 3)
            .map((transaction: Transaction) => {
              const amountStyle = getAmountStyles(transaction.type);
              return (
                <div
                  key={transaction._id}
                  className="flex flex-col gap-[10px] rounded-lg border border-gray-300 px-3 py-[1em] shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A] md:px-[1.5em]"
                >
                  <div className="flex flex-col gap-1 md:flex-row md:justify-between md:gap-0">
                    <div className="flex items-center justify-between md:justify-start md:gap-4">
                      <p className="text-sm font-semibold md:text-base">
                        {formatDayAndDate(transaction.createdAt)}
                      </p>
                      <p className="text-sm font-semibold text-gray-400 md:text-base">
                        {formatTime(transaction.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between md:justify-start md:gap-4">
                      <p className="text-xs font-semibold text-gray-400 md:text-base">
                        {formatRelativeTime(transaction.createdAt)}
                      </p>
                      <p className="text-sm font-semibold text-gray-400 md:text-base">
                        {formatMonthAndYear(transaction.createdAt)}
                      </p>
                    </div>
                  </div>

                  <hr className="mt-2 h-[1px] rounded-md" />

                  <div className="flex items-center justify-between">
                    <Tooltip title={transaction.label} placement="top" arrow>
                      <p className="max-w-[60%] cursor-pointer truncate text-sm font-semibold hover:text-gray-600 md:text-base">
                        {transaction.label}
                      </p>
                    </Tooltip>
                    <p
                      className={`text-sm font-medium md:text-base ${amountStyle.color}`}
                    >
                      {amountStyle.prefix}
                      {formatBalance(transaction.amount)}
                    </p>
                  </div>
                </div>
              );
            })
        ) : (
          <section className="flex h-full flex-col items-center justify-center py-[3em] text-center">
            <div className="flex flex-col items-center justify-center">
              <img
                className="mx-auto h-[40px] w-[40px] md:h-[70px] md:w-[70px]"
                src={transact}
                alt="transaction"
              />
              <p className="text-base text-gray-600 md:text-lg">
                Your transactions will appear here.
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default History;
