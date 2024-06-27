import { DashboardHeader } from "../../common/DashboardHeader";
import { useEffect, useState } from "react";
import {
  MdOutlineVisibilityOff,
  MdOutlineVisibility,
  MdArrowOutward,
} from "react-icons/md";
import { PiHandWithdrawBold } from "react-icons/pi";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  GetUsersTransaction,
  GetWalletBalance,
} from "../../../shared/redux/slices/transaction.slices";
import transact from "../../../Assets/png/dashboard/wallet/transaction.png";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Wallet = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const balance = useSelector((state) => state?.transaction?.getWalletBalance);

  const navigate = useNavigate();

  const withdraw = () => {
    navigate("/dashboard/wallet/withdraw");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const userToken = sessionStorage.getItem("userData");
    if (userToken) {
      dispatch(GetWalletBalance())
        .unwrap()
        .then(() => {})
        .catch((err) => {
          const errorMessage = err.message;
          toast.error(errorMessage);
        });
    } else {
      // Handle case when student token is not found
    }
  }, [dispatch]);

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
    } else {
      // Handle case when student token is not found
    }
  }, [dispatch]);

  const toggleVisibility = () => {
    setBalanceVisible((prevVisible) => !prevVisible);
  };

  return (
    <main className="font-sans">
      <div className="items-center sm:mt-[0] lg:mt-[2em]">
        <header>
          <DashboardHeader className="flex items-center justify-center">
            Chiain Coop Wallet
          </DashboardHeader>
        </header>
        <div className="mx-auto sm:px-[1.5em] lg:w-[35em]">
          <section className="text-center text-text4">
            <div className="mx-auto mt-[2em] rounded-3xl py-[2em] shadow-md">
              <div className="flex justify-center gap-4 font-sans">
                <p className="font-medium">Wallet Balance</p>
                <div>
                  <button className="bg-inherit" onClick={toggleVisibility}>
                    {balanceVisible ? (
                      <MdOutlineVisibilityOff />
                    ) : (
                      <MdOutlineVisibility />
                    )}
                  </button>
                </div>
              </div>
              <div className="mx-auto mt-[1.5em] w-[15em] rounded-md">
                {balanceVisible ? (
                  <p className="font-bold sm:text-xl lg:text-2xl">
                    &nbsp;₦ {balance?.balance?.toLocaleString()}
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
                  <PiHandWithdrawBold className="cursor-pointer fill-howtext text-4xl" />
                  <span className="block lg:text-lg ">Withdraw</span>
                </button>
              </Link>
              <Link to="/dashboard/wallet/fund">
                <button className="flex flex-col items-center bg-inherit text-center">
                  <BsPlusCircleFill className="cursor-pointer fill-howtext text-4xl" />
                  <span className="block lg:text-lg">Fund Wallet</span>
                </button>
              </Link>
              <button className="flex flex-col items-center bg-inherit text-center">
                <FaMoneyBillTransfer className="cursor-pointer fill-howtext text-4xl" />
                <span className="block lg:text-lg ">Transfer</span>
              </button>
            </div>
          </section>
          <hr className="mt-[2em] h-[1px] rounded-md bg-howtext font-normal" />
          <section className="mt-[2em]">
            <p className="text-lg font-bold text-memt1">No Card Linked</p>
            <div className="mt-[1em] font-medium lg:flex lg:justify-between ">
              <p>You havent linked your card to add fund</p>
              <div className="flex items-center">
                <button className="flex items-center rounded-full bg-act py-[2px] text-center font-medium text-text5 sm:px-[9px] lg:px-[7px]">
                  Link Card
                  <IoIosArrowForward />
                </button>
              </div>
            </div>

            <div className="mt-[2em]">
              <p className="text-lg font-bold text-memt1">
                Recent Transactions
              </p>
            </div>

            <section className="flex h-full flex-col items-center justify-center py-[3em] text-center">
              <div className="flex flex-col items-center justify-center">
                <img
                  className="mx-auto h-[50px] w-[50px] md:h-[70px] md:w-[70px]"
                  src={transact}
                  alt=""
                />
                <p className="text-lg text-gray-600">
                  Your transaction will appear here
                </p>
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Wallet;
