import { useEffect, useState } from "react";
import { DashboardHeader } from "../../common/DashboardHeader";
import {
  MdOutlineVisibilityOff,
  MdOutlineVisibility,
  MdArrowOutward,
} from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { toggleState } from "../../../shared/utils/ToggleButton";
import { GetWalletBalance } from "../../../shared/redux/slices/transaction.slices";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const Contribution = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const balance = useSelector((state) => state.transaction?.getWalletBalance);
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

  const toggleVisibility = () => {
    setBalanceVisible((prevVisible) => !prevVisible);
  };
  const [autoDeductionEnabled, setAutoDeductionEnabled] = useState(false);

  const toggleAutoDeduction = () => {
    setAutoDeductionEnabled((prevEnabled) => toggleState(prevEnabled));
  };

  return (
    <main className="font-sans">
      <header className="sm:mt-[0] lg:mt-[2em]">
        <DashboardHeader className="flex items-center justify-center">
          Monthly Contribution
        </DashboardHeader>
      </header>
      <section className="mt-[2em] sm:px-[1.5em] lg:mx-auto lg:w-[33em] lg:px-[0]">
        <article className="text-center text-text4">
          <div className=" mt-[2em] rounded-3xl py-[2em] shadow-md">
            <div className="flex justify-center gap-4 font-sans">
              <p className="font-medium">Contribution Balance</p>
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
                  &nbsp;₦ {balance?.balance.toLocaleString()}
                </p>
              ) : (
                <p className="text-2xl font-bold">*********</p>
              )}
              <hr className="mt-[1em] h-[1px] rounded-md bg-howtext" />
            </div>
            <div className="mt-[1em] flex justify-center gap-2">
              <span>Total Gains</span>
              <MdArrowOutward className="fill-act" />
              <span className="font-semibold text-act">0%</span>
            </div>
          </div>
          <div className="mt-[2em]">
            <div className=" flex justify-between">
              <div>
                <button className="rounded-full bg-inherit  text-lg font-semibold shadow-md sm:px-[2em] sm:py-[5px] lg:px-[3em] lg:py-[10px]">
                  Payment
                </button>
              </div>
              <div>
                <button className="rounded-full bg-inherit text-lg font-semibold shadow-md sm:px-[2em] sm:py-[5px] lg:px-[3em] lg:py-[10px]">
                  Withdraw
                </button>
              </div>
            </div>
            <hr className="mt-[2em] w-full" />
            <div className="auto-deduction mt-[1em] flex justify-between">
              <p className="sm:font-semibold lg:text-sm lg:font-medium">
                Auto-Deduction from Wallet
              </p>
              <div className="flex items-center">
                <button
                  onClick={toggleAutoDeduction}
                  className={`cursor-pointer rounded-full font-medium sm:px-[1em] sm:py-[2px] lg:px-[1.5em] lg:py-[5px] ${autoDeductionEnabled ? "bg-act text-white shadow-md" : "bg-act text-gray-500"}`}
                >
                  {autoDeductionEnabled ? "Turn Off" : "Turn On"}
                </button>
                <IoIosArrowForward className="cursor-pointer" />
              </div>
            </div>
          </div>
        </article>

        <section className="mt-[1em]">
          <p className="text-lg font-semibold">Monthly Contribution Tracker</p>
        </section>
        <div>
          <p className="mt-[1em] text-sm">
            Effortlessy manage and monitor your financial commitments
          </p>
        </div>
      </section>
    </main>
  );
};

export default Contribution;
