import { IoIosArrowBack } from "react-icons/io";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import { useNavigate, useParams } from "react-router";
import { Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import { useGroupTransactionHistory } from "../../../shared/Hooks/useTransactions";
import { SkeletonTransactionCard } from "../../../components/common/Loading";

const TransactionHistoryPage = () => {
  const { name, id } = useParams();
  const navigate = useNavigate();

  const { transactions, isLoading, error } = useGroupTransactionHistory(
    id || "",
  );

  const handleBackClick = () => {
    navigate(-1);
  };


  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "dd/MM/yyyy, hh:mmaaa").toLowerCase();
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <main className="mb-[40px] flex flex-col gap-6 font-asap">
      <DashboardHeader
        className="relative cursor-pointer items-center lg:mt-[2em]"
        onClick={handleBackClick}
      >
        <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />
        <div className="flex flex-grow items-center justify-center">
          <div className="tracking-wide">{name}</div>
        </div>
      </DashboardHeader>

      <h3 className="mt-4 text-[20px] font-[600] tracking-tight text-[#1E1E1E]">
        Transaction history
      </h3>

      <section className="flex w-[100%] flex-col gap-4">
        <Typography className="font-asap text-[18px] font-[600] tracking-tight text-[#1E1E1E]">
          All ({isLoading ? "..." : transactions.length})
        </Typography>

        {isLoading && (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <SkeletonTransactionCard key={i} />
            ))}
          </div>
        )}

        {error && (
          <Typography color="red" className="py-4 text-center">
            Error loading transactions: {error}
          </Typography>
        )}

        {!isLoading && !error && transactions.length === 0 && (
          <Typography className="py-4 text-center">
            No transaction history found for this group.
          </Typography>
        )}

        {!isLoading && !error && transactions.length > 0 && (
          <ul className="flex w-[100%] flex-col flex-wrap gap-3 3xl:flex-row">
            {transactions.map((transaction, index) => (
              <li
                key={index}
                className="flex w-[100%] flex-col gap-3 rounded-md border border-[#93909080] bg-[#F6EFF7] p-3 3xl:w-[48%]"
              >
                <div className="flex w-[100%] items-center justify-between">
                  <Typography className="font-asap text-[18px] font-[500] tracking-tight text-[#1E1E1E]">
                    {transaction.name || "Group Transaction"}
                  </Typography>
                  <Typography className="font-asap text-[16px] font-[500] tracking-tight text-[#1E1E1E] opacity-60">
                    by: {transaction.userName || transaction.user || "Member"}
                  </Typography>
                </div>
                <div className="flex w-[100%] items-center justify-between">
                  <Typography className="font-asap text-[14px] font-[400] tracking-normal text-[#959494]">
                    {transaction.type || "Deposit"}
                  </Typography>
                  <Typography className="font-asap text-[16px] font-[600] tracking-tight text-[#61C040]">
                    +{transaction.amount || transaction.deposit}
                  </Typography>
                </div>
                <div className="flex w-[100%] items-center justify-between">
                  <Typography className="font-asap text-[14px] font-[400] tracking-normal text-[#959494]">
                    Total balance
                  </Typography>
                  <Typography className="font-asap text-[16px] font-[600] tracking-tight text-[#440080]">
                    {transaction.totalBalance || transaction.total}
                  </Typography>
                </div>
                <div className="flex w-[100%] items-center justify-between">
                  <Typography className="font-asap text-[14px] font-[400] tracking-normal text-[#959494]">
                    {formatDate(transaction.createdAt || transaction.date)}
                  </Typography>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default TransactionHistoryPage;
