import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUsersTransaction } from "../../../../shared/redux/slices/transaction.slices";
import {
  formatAmount,
  formatDayAndDate,
  formatMonthAndYear,
} from "../../../../shared/utils/format";
import transact from "../../../../Assets/png/dashboard/wallet/transaction.png";
import { toast } from "react-toastify";

const History = () => {
  const dispatch = useDispatch();

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

  return (
    <div className="mt-[4em] flex flex-col gap-[1.5em]">
      {getTransaction && getTransaction.length > 0 ? (
        getTransaction.map((transaction, index) => (
          <div
            key={index}
            className="flex flex-col gap-[10px] rounded-lg px-[1.5em] py-[1em] shadow-md"
          >
            <div className="flex justify-between">
              <p>{formatDayAndDate(transaction.createdAt)}</p>
              <p>{formatMonthAndYear(transaction.createdAt)}</p>
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
  );
};

export default History;
