<<<<<<< HEAD
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useBalance from "../../../shared/Hooks/useBalance";
=======
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetWalletBalance } from "../../../shared/redux/slices/transaction.slices";
import { formatAmount } from "../../../shared/utils/format";
>>>>>>> 10cf39ba59df1c53433ab269595f99f4750d01bf
import ToggleButton from "../../../shared/utils/ToggleButton";
import History from "./TransactionHistory/History";
import { DashboardHeader } from "../../common/DashboardHeader";
import { MdArrowOutward } from "react-icons/md";
<<<<<<< HEAD
import withdraw_icon from "../../../Assets/svg/dashboard/wallet/withdraw.svg";
import fund_icon from "../../../Assets/svg/dashboard/wallet/fund.svg";
import transfer_icon from "../../../Assets/svg/dashboard/wallet/transfer.svg";
import { IoIosArrowForward } from "react-icons/io";

const Wallet = () => {
  const { isWalletVisible, setIsWalletVisible, formattedBalance } =
    useBalance();
  const navigate = useNavigate();

=======
import { PiHandWithdrawBold } from "react-icons/pi";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { toast } from "react-toastify";

const Wallet = () => {
  const balance = useSelector((state) => state?.transaction?.getWalletBalance);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isWalletVisible, setIsWalletVisible] = useState(() => {
    const storedVisibility = sessionStorage.getItem("walletBalanceVisible");
    return storedVisibility !== null ? storedVisibility === "true" : true;
  });

  useEffect(() => {
    const userToken = sessionStorage.getItem("userData");
    if (userToken) {
      dispatch(GetWalletBalance())
        .unwrap()
        .then(() => {})
        .catch((error) => {
          const errorMessage = error;
          toast.error(errorMessage);
        });
    }
  }, [dispatch]);

  const formattedBalance = balance?.balance
    ? formatAmount(balance.balance)
    : "₦ 0.00";

>>>>>>> 10cf39ba59df1c53433ab269595f99f4750d01bf
  const withdraw = () => {
    navigate("/dashboard/wallet/withdraw");
  };

  return (
    <main className="font-sans">
      <div className="items-center sm:mt-[0] lg:mt-[2em]">
        <header>
          <DashboardHeader className="flex items-center justify-center">
            Chain Coop Wallet
          </DashboardHeader>
        </header>
        <div className="mx-auto sm:px-[1.5em] lg:w-[35em]">
          <section className="text-center text-text4">
            <div className="mx-auto mt-[2em] rounded-3xl py-[2em] shadow-md">
              <div className="flex justify-center gap-4 font-sans">
                <p className="font-medium">Wallet Balance</p>
                <div>
                  <ToggleButton
                    isVisible={isWalletVisible}
                    onToggle={(newVisibility) => {
                      setIsWalletVisible(newVisibility);
                      sessionStorage.setItem(
                        "walletBalanceVisible",
                        newVisibility.toString(),
                      );
                    }}
                  />
                </div>
              </div>
              <div className="mx-auto mt-[1.5em] w-[15em] rounded-md">
                {isWalletVisible ? (
                  <p className="font-bold sm:text-xl lg:text-xl">
                    {formattedBalance}
                  </p>
                ) : (
                  <p className="text-2xl font-bold">*********</p>
                )}
                <hr className="mt-[1em] h-[1px] rounded-md bg-howtext font-normal" />
              </div>
              <div className="mt-[1em] flex justify-center gap-2">
                <span>Total Gains</span>
                <MdArrowOutward className="fill-act" />
                <span className="font-semibold text-act">0%</span>
              </div>
            </div>
          </section>

          <section className="mt-[1.5em] rounded-3xl shadow-md">
            <div className="flex items-center justify-between py-[2em] font-semibold text-howtext sm:px-[1em] lg:px-[2.5em]">
              <Link to="/dashboard/wallet/withdraw">
                <button
                  className="flex flex-col items-center bg-inherit text-center"
                  onClick={withdraw}
                >
<<<<<<< HEAD
                  <img src={withdraw_icon} alt="withdraw_icon" />
                  <span className="block text-memt1 lg:text-lg ">Withdraw</span>
=======
                  <PiHandWithdrawBold className="cursor-pointer fill-howtext text-4xl" />
                  <span className="block lg:text-lg ">Withdraw</span>
>>>>>>> 10cf39ba59df1c53433ab269595f99f4750d01bf
                </button>
              </Link>
              <Link to="/dashboard/wallet/fund">
                <button className="flex flex-col items-center bg-inherit text-center">
<<<<<<< HEAD
                  <img src={fund_icon} alt="withdraw" />
                  <span className="block text-memt1 lg:text-lg">
                    Fund Wallet
                  </span>
                </button>
              </Link>
              <Link to="/dashboard/wallet/transfer">
                <button className="flex flex-col items-center bg-inherit text-center">
                  <img src={transfer_icon} alt="withdraw" />
                  <span className="block text-memt1 lg:text-lg ">Transfer</span>
                </button>
              </Link>
=======
                  <BsPlusCircleFill className="cursor-pointer fill-howtext text-4xl" />
                  <span className="block lg:text-lg">Fund Wallet</span>
                </button>
              </Link>
              <button className="flex flex-col items-center bg-inherit text-center">
                <FaMoneyBillTransfer className="cursor-pointer fill-howtext text-4xl" />
                <span className="block lg:text-lg ">Transfer</span>
              </button>
>>>>>>> 10cf39ba59df1c53433ab269595f99f4750d01bf
            </div>
          </section>

          <section className="mt-[2em]">
            <p className="text-sm font-bold text-memt1">No Card Linked</p>
            <div className="items-center font-medium lg:flex lg:justify-between ">
              <p>{`You haven't linked your card to add funds.`}</p>
              <div className="flex items-center">
                <button className="flex items-center rounded-full bg-act py-[2px] text-center text-sm  text-text5 sm:px-[9px] lg:px-[7px]">
                  Link Card
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          </section>
<<<<<<< HEAD

=======
          
>>>>>>> 10cf39ba59df1c53433ab269595f99f4750d01bf
          <History />
        </div>
      </div>
    </main>
  );
};

export default Wallet;
