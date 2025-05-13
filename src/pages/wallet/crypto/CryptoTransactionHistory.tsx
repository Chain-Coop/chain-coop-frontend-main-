import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Typography } from "@material-tailwind/react";
import {
  useCryptoTransactionHistory,
  useCashwyreHistory,
} from "../../../shared/Hooks/useBalance";
import { CryptoTransaction } from "../../../shared/types/types";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import {
  IoSearchOutline,
  IoFilterOutline,
  IoOptionsOutline,
} from "react-icons/io5";

const SaveIcon = () => <span>+</span>;
const WithdrawIcon = () => <span>-</span>;
const TransferIcon = () => <span>🔄</span>;

const ITEMS_PER_PAGE = 10;

type FilterType = "all" | "wallet" | "contribution";

const CryptoTransactionHistory: React.FC = () => {
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterPopupOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const {
    transactions: cryptoTransactions,
    loading: cryptoLoading,
    error: cryptoError,
  } = useCryptoTransactionHistory();

  const {
    transactions: cashwyreTransactions,
    loading: cashwyreLoading,
    error: cashwyreError,
  } = useCashwyreHistory();

  // Function to check if a transaction is a cashwyre transaction
  const isCashwyreTransaction = (tx: any): boolean => {
    return (
      tx.hasOwnProperty("cryptoAssetNetwork") ||
      tx.hasOwnProperty("accountNumber")
    );
  };

  // Combine and filter transactions based on selected filter
  const filteredTransactions = useMemo(() => {
    const crypto = cryptoTransactions || [];
    const cashwyre = cashwyreTransactions || [];

    let result = [];

    // Apply type filter
    switch (filterType) {
      case "wallet":
        result = cashwyre;
        break;
      case "contribution":
        result = crypto;
        break;
      default:
        result = [...crypto, ...cashwyre];
        break;
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (tx) =>
          tx.cryptoAsset?.toLowerCase().includes(query) ||
          tx.transactionType?.toLowerCase().includes(query) ||
          tx.reference?.toLowerCase().includes(query) ||
          tx.status?.toLowerCase().includes(query),
      );
    }

    // Sort by date based on sortOrder
    return result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [
    cryptoTransactions,
    cashwyreTransactions,
    filterType,
    searchQuery,
    sortOrder,
  ]);

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Use combined loading and error states
  const isLoading = cryptoLoading || cashwyreLoading;
  const hasError = cryptoError || cashwyreError;
  const errorMessage = cryptoError || cashwyreError;

  const getTransactionIcon = (type: string) => {
    switch (type?.toUpperCase()) {
      case "SAVE":
      case "DEPOSIT":
      case "ONRAMP":
        return <SaveIcon />;
      case "WITHDRAW":
      case "OFFRAMP":
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

  const formatShortDate = (dateString: string): string => {
    try {
      return format(parseISO(dateString), "EEE dd MMM yyyy");
    } catch (e) {
      return "Invalid Date";
    }
  };

  const formatTime = (dateString: string): string => {
    try {
      return format(parseISO(dateString), "h:mm:ssa");
    } catch (e) {
      return "";
    }
  };

  const getTimeAgo = (dateString: string): string => {
    try {
      return (
        formatDistanceToNow(parseISO(dateString), { addSuffix: false }) + " ago"
      );
    } catch (e) {
      return "";
    }
  };

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  const visibleTransactions = filteredTransactions
    ? filteredTransactions.slice(0, visibleCount)
    : [];

  // Group cashwyre transactions by date for display
  const groupedTransactionsByDate = useMemo(() => {
    const groups: Record<string, any[]> = {};

    visibleTransactions.forEach((tx) => {
      if (isCashwyreTransaction(tx)) {
        const dateKey = format(parseISO(tx.createdAt), "yyyy-MM-dd");
        if (!groups[dateKey]) {
          groups[dateKey] = [];
        }
        groups[dateKey].push(tx);
      }
    });

    return groups;
  }, [visibleTransactions]);

  return (
    <section className="my-8">
      <div className="mb-6 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <Typography
          variant="h3"
          className="text-lg font-semibold text-gray-800"
        >
          Recent transactions
        </Typography>

        <div className="flex w-full flex-row flex-wrap items-start gap-3 md:w-auto lg:items-center">
          {/* Search bar */}
          <div className="relative flex-grow md:w-64 md:flex-grow-0">
            <input
              type="text"
              placeholder="Search transactions"
              className="w-full rounded-md border border-gray-300 px-3 py-2 pl-9 text-sm focus:border-purple-500 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Filter button with popup */}
          <div className="relative" ref={filterRef}>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
              onClick={() => {
                setIsFilterPopupOpen(!isFilterPopupOpen);
                setIsSortPopupOpen(false);
              }}
              aria-label="Filter transactions"
            >
              <IoFilterOutline size={18} className="text-gray-700" />
            </button>

            {isFilterPopupOpen && (
              <div className="absolute right-0 top-12 z-10 w-48 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                <div className="p-2 text-sm font-medium text-gray-700">
                  Filter by
                </div>
                <div className="space-y-1">
                  <button
                    className={`w-full rounded-md p-2 text-left text-sm transition-colors ${filterType === "all" ? "bg-purple-100 text-purple-600" : "hover:bg-gray-100"}`}
                    onClick={() => {
                      setFilterType("all");
                      setIsFilterPopupOpen(false);
                    }}
                  >
                    All Transactions
                  </button>
                  <button
                    className={`w-full rounded-md p-2 text-left text-sm transition-colors ${filterType === "wallet" ? "bg-purple-100 text-purple-600" : "hover:bg-gray-100"}`}
                    onClick={() => {
                      setFilterType("wallet");
                      setIsFilterPopupOpen(false);
                    }}
                  >
                    Wallet Transactions
                  </button>
                  <button
                    className={`w-full rounded-md p-2 text-left text-sm transition-colors ${filterType === "contribution" ? "bg-purple-100 text-purple-600" : "hover:bg-gray-100"}`}
                    onClick={() => {
                      setFilterType("contribution");
                      setIsFilterPopupOpen(false);
                    }}
                  >
                    Contribution Transactions
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sort button with popup */}
          <div className="relative" ref={sortRef}>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
              onClick={() => {
                setIsSortPopupOpen(!isSortPopupOpen);
                setIsFilterPopupOpen(false);
              }}
              aria-label="Sort transactions"
            >
              <IoOptionsOutline size={18} className="text-gray-700" />
            </button>

            {isSortPopupOpen && (
              <div className="absolute right-0 top-12 z-10 w-48 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                <div className="p-2 text-sm font-medium text-gray-700">
                  Sort by
                </div>
                <div className="space-y-1">
                  <button
                    className={`w-full rounded-md p-2 text-left text-sm transition-colors ${sortOrder === "newest" ? "bg-purple-100 text-purple-600" : "hover:bg-gray-100"}`}
                    onClick={() => {
                      setSortOrder("newest");
                      setIsSortPopupOpen(false);
                    }}
                  >
                    Newest First
                  </button>
                  <button
                    className={`w-full rounded-md p-2 text-left text-sm transition-colors ${sortOrder === "oldest" ? "bg-purple-100 text-purple-600" : "hover:bg-gray-100"}`}
                    onClick={() => {
                      setSortOrder("oldest");
                      setIsSortPopupOpen(false);
                    }}
                  >
                    Oldest First
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-gray-500">
          <Typography>Loading history...</Typography>
        </div>
      )}

      {hasError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-600">
          <Typography>
            Error loading transaction history: {errorMessage}
          </Typography>
        </div>
      )}

      {!isLoading &&
        !hasError &&
        (!filteredTransactions || filteredTransactions.length === 0) && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-gray-500">
            <Typography>No transactions found.</Typography>
          </div>
        )}

      {!isLoading &&
        !hasError &&
        visibleTransactions &&
        visibleTransactions.length > 0 && (
          <div className="flex flex-col gap-6">
            {/* Cashwyre Transactions with new UI */}
            {Object.keys(groupedTransactionsByDate).map((dateKey) => {
              const transactions = groupedTransactionsByDate[dateKey];
              if (!transactions?.length) return null;

              const dateFormatted = formatShortDate(transactions[0].createdAt);
              const timeAgo = getTimeAgo(transactions[0].createdAt);

              return (
                <div key={dateKey} className="flex flex-col gap-3">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{dateFormatted}</span>
                    <span>{timeAgo}</span>
                  </div>

                  {transactions.map((tx) => {
                    const isDebit =
                      tx.transactionType?.toUpperCase() === "OFFRAMP";
                    const amount = isDebit
                      ? `-${tx.cryptoAmount}`
                      : `+${tx.cryptoAmount}`;
                    const amountColor = isDebit
                      ? "text-red-600"
                      : "text-green-600";
                    const formattedTime = formatTime(tx.createdAt);
                    const cryptoAsset = tx.cryptoAsset?.toUpperCase() || "";
                    const cryptoNetwork = tx.cryptoAssetNetwork || "";
                    const rate = tx.cryptoRate || tx.rate || 0;

                    return (
                      <div
                        key={tx._id}
                        className="flex flex-col gap-4 rounded-md border border-gray-200 p-4"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            {formattedTime}
                          </div>
                          <div className={`font-semibold ${amountColor}`}>
                            {amount} {cryptoAsset}
                          </div>
                        </div>

                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">From:</span>
                            <span className="text-sm font-medium">
                              Chain Coop Crypto Wallet Debited
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">To:</span>
                            <span className="text-sm font-medium">
                              {tx.accountName || "Unknown Recipient"}
                            </span>
                          </div>

                          <div className="flex flex-col justify-between md:flex-row">
                            <div className="flex items-center">
                              <span className="text-xs text-gray-500">
                                Crypto Type:
                              </span>
                              <span className="ml-1 text-sm">
                                {cryptoAsset} {cryptoNetwork}
                              </span>
                            </div>

                            <div>
                              <span className="text-xs text-gray-500">
                                Transaction Status:
                              </span>
                              <span
                                className={`ml-1 text-sm ${tx.status === "SUCCESS" ? "text-green-600" : tx.status === "FAILED" ? "text-red-600" : "text-yellow-600"}`}
                              >
                                {tx.status === "SUCCESS"
                                  ? "Successful"
                                  : tx.status === "FAILED"
                                    ? "Failed"
                                    : "Pending"}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">
                              Crypto Rate:
                            </span>
                            <span className="text-sm font-medium">
                              $ {rate}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Original UI for crypto contribution transactions */}
            {visibleTransactions
              .filter((tx) => !isCashwyreTransaction(tx))
              .map((tx: CryptoTransaction) => {
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
                    <Typography
                      className={`text-sm font-semibold ${amountColor}`}
                    >
                      {signPrefix}
                      {Math.abs(tx.amount)} {tx.Token}
                    </Typography>
                  </motion.div>
                );
              })}
          </div>
        )}

      {!isLoading &&
        filteredTransactions &&
        filteredTransactions.length > visibleCount && (
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
