import { useState, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  approveWithdrawal,
  fetchAllWithdrawals,
} from "../../shared/redux/slices/adminSlices/adminSlices";
import { AppDispatch } from "../../shared/redux/store";
import { useAllWithdrawals } from "../../shared/Hooks/useAdminData";

interface BankDetails {
  accountNumber: string;
  bankCode: string;
  accountName: string;
  bankName?: string;
}

interface Withdrawal {
  _id: string;
  user: string;
  amount: number;
  status: "pending" | "completed" | "approved";
  createdAt: string;
  bankDetails: BankDetails;
}

const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-lg bg-gray-100 p-4">
          <div className="h-6 w-1/3 rounded bg-gray-200"></div>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {[...Array(6)].map((_, j) => (
              <div key={j} className="h-6 rounded bg-gray-200"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isLoading: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm rounded-lg bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold">Confirm Approval</h3>
        <p className="mb-6 text-gray-600">
          Are you sure you want to approve this withdrawal? This action cannot
          be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-200 px-4 py-2 text-gray-600 hover:bg-gray-300"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 animate-spin text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const WithdrawalRequest = ({
  withdrawal,
  onRefresh,
}: {
  withdrawal: Withdrawal;
  onRefresh: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isApproving, setIsApproving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const confirmApprove = useCallback(async () => {
    setIsApproving(true);
    try {
      console.log("Approving withdrawal:", withdrawal._id);
      const result = await dispatch(
        approveWithdrawal({
          withdrawalId: withdrawal._id,
          status: "completed",
        }),
      ).unwrap();
      console.log("Approval result:", result);
      toast.success("Withdrawal approved successfully");
      setShowConfirmModal(false);
      // Refresh the withdrawals list
      onRefresh();
    } catch (error: any) {
      console.error("Approval error:", error);
      toast.error(error || "Failed to approve withdrawal");
    } finally {
      setIsApproving(false);
    }
  }, [dispatch, withdrawal._id, onRefresh]);

  const handleApprove = () => {
    setShowConfirmModal(true);
  };

  return (
    <div className="w-full max-w-full rounded-lg bg-white px-6 py-3 shadow-md">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-medium text-gray-400">
            Withdrawal request: Bank Account
          </h2>
          <span
            className={`rounded-full px-2 py-1 text-sm font-medium ${
              withdrawal.status === "completed" ||
              withdrawal.status === "approved"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {withdrawal.status.charAt(0).toUpperCase() +
              withdrawal.status.slice(1)}
          </span>
        </div>
        {withdrawal.status === "pending" && (
          <button
            onClick={handleApprove}
            className="flex-shrink-0 whitespace-nowrap rounded-lg bg-green-500 px-6 py-2 text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isApproving}
          >
            {isApproving ? (
              <span className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 animate-spin text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Accept"
            )}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <div className="min-w-0">
          <div className="mb-2 font-semibold text-gray-400">
            Transaction Sources
          </div>
          <div className="break-words font-semibold text-text2">
            Chain Wallet
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-2 font-semibold text-gray-400">To</div>
          <div className="flex items-center">
            <span className="text-text2">→</span>
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-2 font-semibold text-gray-400">Account number</div>
          <div className="break-words">
            {withdrawal.bankDetails?.accountNumber || "N/A"}
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-2 font-semibold text-gray-400">Account name</div>
          <div className="break-words">
            {withdrawal.bankDetails?.accountName || "N/A"}
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-2 font-semibold text-gray-400">Bank name</div>
          <div className="break-words">
            {withdrawal.bankDetails?.bankName || "N/A"}
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-2 text-sm font-semibold text-gray-600">Amount</div>
          <div className="break-words font-medium">
            NGN {withdrawal.amount?.toLocaleString() || "0"}
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-4">
        <div className="mb-2 font-semibold text-gray-400">Date Initiated</div>
        <div className="text-sm">
          {withdrawal.createdAt
            ? new Date(withdrawal.createdAt).toLocaleString()
            : "N/A"}
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmApprove}
        isLoading={isApproving}
      />
    </div>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      {getVisiblePages().map((page, index) => (
        <span key={index}>
          {page === "..." ? (
            <span className="px-3 py-2 text-sm font-medium text-gray-700">
              ...
            </span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                currentPage === page
                  ? "border border-blue-600 bg-blue-600 text-white"
                  : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          )}
        </span>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

const FinancialManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Fixed: Use the correct hook name and destructure the correct property
  const {
    allUserWithdrawals: withdrawals,
    loading,
    error,
  } = useAllWithdrawals();
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const itemsPerPage = 20;

  // Function to refresh withdrawals data
  const handleRefresh = useCallback(() => {
    dispatch(fetchAllWithdrawals());
  }, [dispatch]);

  const filteredWithdrawals = useMemo(() => {
    if (!withdrawals || !Array.isArray(withdrawals)) {
      return [];
    }
    return filter === "all"
      ? withdrawals
      : withdrawals.filter(
          (withdrawal: any) =>
            withdrawal.status === filter ||
            (filter === "completed" && withdrawal.status === "approved"),
        );
  }, [withdrawals, filter]);

  const { paginatedWithdrawals, totalPages } = useMemo(() => {
    if (!filteredWithdrawals) {
      return { paginatedWithdrawals: [], totalPages: 0 };
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedWithdrawals = filteredWithdrawals.slice(
      startIndex,
      endIndex,
    );
    const totalPages = Math.ceil(filteredWithdrawals.length / itemsPerPage);

    console.log(
      "Paginated withdrawals:",
      paginatedWithdrawals,
      "Total pages:",
      totalPages,
    );

    return { paginatedWithdrawals, totalPages };
  }, [filteredWithdrawals, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (newFilter: "all" | "pending" | "completed") => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  return (
    <main className="max-w-full p-4 font-sans md:p-6">
      <header className="mb-8">
        <div className="mt-[2em] text-center">
          <h1 className="text-2xl font-bold">Financial Management</h1>
          <p className="text-lg font-medium">
            Payment and Contribution from users
          </p>
          {filteredWithdrawals.length > 0 && (
            <p className="mt-2 text-sm text-gray-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredWithdrawals.length)}{" "}
              of {filteredWithdrawals.length} withdrawals
            </p>
          )}
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <button
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              filter === "pending"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handleFilterChange("pending")}
          >
            Pending
          </button>
          <button
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              filter === "completed"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handleFilterChange("completed")}
          >
            Completed
          </button>
        </div>
      </header>

      <div className="w-full">
        {loading ? (
          <SkeletonLoader />
        ) : error ? (
          <div className="py-8 text-center text-red-500">Error: {error}</div>
        ) : paginatedWithdrawals.length > 0 ? (
          <div className="space-y-6">
            {paginatedWithdrawals.map((withdrawal: any) => (
              <WithdrawalRequest
                key={withdrawal._id}
                withdrawal={withdrawal}
                onRefresh={handleRefresh}
              />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            No withdrawals found
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
};

export default FinancialManagement;
