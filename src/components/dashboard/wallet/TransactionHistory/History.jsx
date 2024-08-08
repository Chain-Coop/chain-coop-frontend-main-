import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUsersTransaction } from "../../../../shared/redux/slices/transaction.slices";
import {
  formatAmount,
  formatDayAndDate,
  formatMonthAndYear,
  formatRelativeTime,
} from "../../../../shared/utils/format";
import transact from "../../../../Assets/png/dashboard/wallet/transaction.png";
import { toast } from "react-toastify";
import { Primary } from "../../../common/Button";

const History = () => {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);

  const getTransaction = useSelector(
    (state) => state?.transaction?.getUsersTransaction,
  );

  useEffect(() => {
    const userToken = sessionStorage.getItem("userData");
    if (userToken) {
      dispatch(GetUsersTransaction())
        .unwrap()
        .then(() => {})
        .catch((err) => {
          const errorMessage = err.message;
          toast.error(errorMessage);
        });
    }
  }, [dispatch]);

  const handleViewAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  return (
    <main className="font-sans">
      <div className="mt-[3em] flex flex-col gap-[1.5em]">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-memt1">
            Recent Transactions
          </h1>
          {getTransaction && getTransaction.length > 3 && (
            <Primary
              className="flex items-center rounded-lg border-[2px] border-text2 bg-inherit px-4 py-1 font-semibold text-memt1"
              onClick={handleViewAll}
            >
              {showAll ? (
                <>
                  <span>Close</span>
                </>
              ) : (
                <>
                  <span>View All</span>
                </>
              )}
            </Primary>
          )}
        </div>
        {getTransaction && getTransaction.length > 0 ? (
          getTransaction
            .slice(0, showAll ? getTransaction.length : 3)
            .map((transaction, index) => (
              <div
                key={index}
                className="flex flex-col gap-[10px] rounded-lg px-[1.5em] py-[1em] shadow-md"
              >
                <div className="flex justify-between">
                  <p className="font-semibold">
                    {formatDayAndDate(transaction.createdAt)}
                  </p>
<<<<<<< HEAD
                  <p className="font-semibold text-gray-400">
=======
                  <p className="font-semibold text-howtext">
>>>>>>> 10cf39ba59df1c53433ab269595f99f4750d01bf
                    {formatRelativeTime(transaction.createdAt)}
                  </p>
                  <p className="font-semibold">
                    {formatMonthAndYear(transaction.createdAt)}
                  </p>
                </div>
                <hr className="mt-3 h-[1px] rounded-md" />
                <div className="flex justify-between">
                  <p className="font-semibold">{`Chain Coop Wallet ${transaction.type}ed`}</p>
                  <p className="font-medium">
                    <span className="text-act">
                      {transaction.type === "credit" ? "+" : "-"}
                      {formatAmount(transaction.amount)}
                    </span>
                  </p>
                </div>
              </div>
            ))
        ) : (
          <section className="flex h-full flex-col items-center justify-center py-[3em] text-center">
            <div className="flex flex-col items-center justify-center">
              <img
                className="mx-auto h-[50px] w-[50px] md:h-[70px] md:w-[70px]"
                src={transact}
                alt="transaction"
              />
              <p className="text-lg text-gray-600">
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
