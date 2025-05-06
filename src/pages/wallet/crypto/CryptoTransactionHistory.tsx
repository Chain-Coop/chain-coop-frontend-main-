import React, { useState } from "react";
import { motion } from "framer-motion";
import { Typography } from "@material-tailwind/react";
import { useCryptoTransactionHistory } from "../../../shared/Hooks/useBalance";
import { CryptoTransaction } from "../../../shared/types/types";
import { format, parseISO } from "date-fns";

const SaveIcon = () => <span>+</span>;
const WithdrawIcon = () => <span>-</span>;
const TransferIcon = () => <span>🔄</span>;

const ITEMS_PER_PAGE = 10;

const CryptoTransactionHistory: React.FC = () => {
  const { transactions, loading, error } = useCryptoTransactionHistory();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const getTransactionIcon = (type: string) => {
    switch (type?.toUpperCase()) {
      case "SAVE":
      case "DEPOSIT":
        return <SaveIcon />;
      case "WITHDRAW":
        return <WithdrawIcon />;
      case "TRANSFER":
        return <TransferIcon />;
      default:
        return <span>+</span>;
    }
  };

  const formatTxDate = (dateString: string): string => {
    try {
      return format(parseISO(dateString), "MMM d, yyyy hh:mm a");
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Invalid Date";
    }
  };

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  const visibleTransactions = transactions ? transactions.slice(0, visibleCount) : [];

  return (
    <section className="my-8">
      <Typography
        variant="h3"
        className="mb-4 text-lg font-semibold text-gray-800"
      >
        Transaction History
      </Typography>

      {loading && (
         <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-gray-500">
          <Typography>Loading history...</Typography>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-600">
          <Typography>Error loading transaction history: {error}</Typography>
        </div>
      )}

      {!loading && !error && (!transactions || transactions.length === 0) && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-gray-500">
          <Typography>No crypto transactions found.</Typography>
        </div>
      )}

      {!loading && !error && visibleTransactions && visibleTransactions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-3"
        >
          {visibleTransactions.map((tx: CryptoTransaction) => {
            let amountColor = "text-gray-700";
            let signPrefix = "";
            const typeUpper = tx.transactionType?.toUpperCase();

            if (typeUpper === "WITHDRAW") {
              amountColor = "text-green-600";
              signPrefix = "+";
            } else if (
              typeUpper === "SAVE" ||
              typeUpper === "DEPOSIT" ||
              typeUpper === "UPDATE"
            ) {
              amountColor = "text-red-600";
            }

            return (
              <motion.div
                key={tx._id}
                whileHover={{ backgroundColor: "#f9fafb" }}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                    {getTransactionIcon(tx.transactionType)}
                  </div>
                  <div>
                    <Typography className="text-sm font-medium text-gray-700">
                      {tx.transactionType
                        ? tx.transactionType.charAt(0).toUpperCase() +
                          tx.transactionType.slice(1).toLowerCase()
                        : "Transaction"}
                    </Typography>
                    <Typography className="text-xs text-gray-500">
                      {formatTxDate(tx.createdAt)}
                    </Typography>
                  </div>
                </div>
                <Typography className={`text-sm font-semibold ${amountColor}`}>
                  {signPrefix}
                  {Math.abs(tx.amount)} {tx.Token}
                </Typography>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {!loading && transactions && transactions.length > visibleCount && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSeeMore}
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
          >
            See More
          </button>
        </div>
      )}

    </section>
  );
};

export default CryptoTransactionHistory;
