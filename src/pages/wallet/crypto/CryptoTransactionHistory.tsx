import React from "react";
import { motion } from "framer-motion";
import { Typography } from "@material-tailwind/react";
import { useCryptoTransactionHistory } from "../../../shared/Hooks/useBalance";
import { CryptoTransaction } from "../../../shared/types/types";
import { format, parseISO } from 'date-fns';

const SaveIcon = () => <span>+</span>; 
const WithdrawIcon = () => <span>-</span>;
const TransferIcon = () => <span>🔄</span>; 

const CryptoTransactionHistory: React.FC = () => {
  const { transactions, loading, error } = useCryptoTransactionHistory();

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

  return (
    <section className="my-8">
      <Typography variant="h3" className="mb-4 text-lg font-semibold text-gray-800">
        Transaction History
      </Typography>

      {loading}
      
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

      {!loading && !error && transactions && transactions.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-3"
        >
          {transactions.map((tx: CryptoTransaction) => (
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
                    {tx.transactionType}
                  </Typography>
                  <Typography className="text-xs text-gray-500">
                    {formatTxDate(tx.createdAt)}
                  </Typography>
                </div>
              </div>
              <Typography 
                className={`text-sm font-semibold ${tx.amount < 0 ? 'text-red-600' : 'text-green-600'}`}
              >
                {tx.amount >= 0 ? '+' : ''}{tx.amount} {tx.Token} 
              </Typography>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default CryptoTransactionHistory; 