import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import useUserProfile from "../../../shared/Hooks/useUserProfile";
import { ComingSoon, Primary } from "../../common/Button";
import {
  MdOutlineVisibilityOff,
  MdOutlineVisibility,
  MdArrowOutward,
} from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import plus from "../../../Assets/png/home/plus.png";
import Modal from "../../common/Modal";
import OTPInput from "react-otp-input";
import { CreateTransactionPin } from "../../../shared/redux/slices/transaction.slices";
import { AppDispatch } from "../../../shared/redux/store";
import ReactLoading from "react-loading";
import PinReminder from "../../common/PinReminder";

const Home = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [pin, setPin] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showReminder, setShowReminder] = useState(false);

  const { profileDetails } = useUserProfile();
  
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (profileDetails) {
      const pinSkippedAt = localStorage.getItem('pinSkippedAt');
      if (profileDetails.isPinCreated === false && !pinSkippedAt) {
        setIsModalOpen(true);
      } else if (profileDetails.isPinCreated === false && pinSkippedAt) {
        checkIfReminderNeeded(pinSkippedAt);
      }
    }
  }, [profileDetails]);

  const checkIfReminderNeeded = (skippedAt: string) => {
    const skippedDate = new Date(skippedAt);
    const currentDate = new Date();
    const minutesSinceSkipped = Math.floor((currentDate.getTime() - skippedDate.getTime()) / (1000 * 60));
    
    if (minutesSinceSkipped >= 2) {
      setShowReminder(true);
    } else {
      const remainingTime = (2 * 60 * 1000) - (currentDate.getTime() - skippedDate.getTime());
      setTimeout(() => setShowReminder(true), remainingTime);
    }
  };

  const handlePinChange = (otpValue: string) => {
    setPin(otpValue);
  };

  const handlePinSubmit = async () => {
    if (pin.length === 4) {
      setIsLoading(true);
      try {
        await dispatch(CreateTransactionPin({ pin })).unwrap();
        setIsModalOpen(false);
        setIsSuccessModalOpen(true);
        localStorage.removeItem('pinSkippedAt'); 
      } catch (error) {
        console.error("Failed to create PIN:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSkipPinCreation = () => {
    const currentDate = new Date().toISOString();
    localStorage.setItem('pinSkippedAt', currentDate);
    setIsModalOpen(false);
    // Set a timeout to show the reminder after 2 minutes
    setTimeout(() => setShowReminder(true), 2 * 60 * 1000);
  };

  const addFund = () => {
    navigate("/dashboard/wallet");
  };

  const toggleVisibility = () => {
    setBalanceVisible((prev) => !prev);
  };

  return (
    <main className="mx-auto mb-[2em] px-[2em] font-sans">
      <header className="flex justify-between sm:mt-[1em] lg:mt-[2.5em]">
        <div className="font-medium">
          <p>Welcome Back!</p>
          <p className="mt-1 font-semibold">
            {profileDetails?.username || "user"}
          </p>
        </div>
        <div>
          <IoIosNotifications className="cursor-pointer fill-text4" size={27} />
        </div>
      </header>
      
      <section className="text-center text-text4">
        <article className="mt-[2em] rounded-3xl py-[2em] shadow-lg sm:px-[2em]">
          <div className="flex items-center justify-center gap-4">
            <p>Total Balance</p>
            <div>
              <button
                className="bg-inherit sm:ml-[2px] lg:ml-[3px]"
                onClick={toggleVisibility}
              >
                {balanceVisible ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )}
              </button>
            </div>
          </div>
          <div className="mx-auto mt-[1.5em] rounded-md lg:w-[15em]">
            {balanceVisible ? (
              <p className="font-bold sm:text-xl lg:text-2xl">N 500,000.00</p>
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
        </article>
      </section>

      <div>
        <button
          onClick={addFund}
          className="mx-auto mt-[2em] w-full rounded-3xl bg-inherit py-[1em] text-center text-lg font-semibold text-text4 shadow-md"
        >
          + Add Fund
        </button>
      </div>

      <section className="mt-[2em] w-full">
        <header>
          <p className="font-semibold sm:text-lg">Create a portfolio</p>
          <p className="mt-[1em]">
            Start your investment journey by creating a portfolio
          </p>
        </header>
        <div className="mt-4 gap-[1.5em] space-y-[1.5em] sm:flex-col lg:flex lg:flex-row">
          <article className="mt-2 flex flex-col items-center justify-center rounded-lg bg-Dh p-4 font-semibold shadow-md sm:py-[2em] lg:w-[180px]">
            <img
              width="24"
              height="24"
              src={plus}
              alt="plus"
              className="h-[3em] w-[3em] cursor-pointer shadow-sm"
            />
            <p className="text-center font-sans sm:text-lg sm:font-semibold">
              Create a
            </p>
            <p className="text-center font-sans sm:text-lg sm:font-semibold">
              portfolio project
            </p>
          </article>
          <article>
            <div className="flex h-auto flex-col gap-[2em] rounded-xl bg-dashboardHome bg-cover bg-no-repeat p-3">
              <h1 className="text-lg font-medium uppercase text-text3">
                automated ai <br /> learning Platform
              </h1>
              <div className="mt-[3em]">
                <ComingSoon className="bg-coming2">Coming Soon</ComingSoon>
              </div>
            </div>
          </article>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}  
        className="flex flex-col justify-center bg-white py-[3em] text-center"
      >
        <header>
          <h1 className="text-2xl font-semibold">Create a 4-digit Pin</h1>
          <p className="mt-1 text-howtext">You'll use this Pin to Authorize your transactions.</p>
        </header>
        <div className="flex justify-center">
          <OTPInput
            value={pin}
            onChange={handlePinChange}
            numInputs={4}
            skipDefaultStyles={true}
            containerStyle="gap-3 my-5"
            inputStyle="block lg:h-[55px] lg:w-[55px] sm:h-[50px] sm:w-[35px] text-center border-gray-200 rounded-md text-sm placeholder:text-gray-300 focus:border-text2 focus:ring-text2 bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <Primary
          onClick={handlePinSubmit}
          className="mt-[2em] w-full rounded-full bg-text2 py-2 font-semibold text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <ReactLoading
              color="#FFFFFF"
              width={25}
              height={25}
              type="spin"
            />
          ) : (
            "Create PIN"
          )}
        </Primary>
        <Primary
          onClick={handleSkipPinCreation}
          className="mt-[1em] w-full rounded-full bg-gray-200 py-2 font-semibold text-gray-700"
        >
          Skip for now
        </Primary>
      </Modal>

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        className="flex flex-col justify-center bg-white py-[3em] text-center"
      >
        <header>
          <h1 className="text-2xl font-semibold">You've created your PIN</h1>
          <p className="mt-1 text-howtext">Keep your account safe and your secret Pin. Do not share this PIN with anyone</p>
        </header>
        <Primary
          onClick={() => setIsSuccessModalOpen(false)}
          className="mt-[2em] w-full rounded-full bg-text2 py-2 font-semibold text-white"
        >
          Close
        </Primary>
      </Modal>

      {showReminder && <PinReminder onClose={() => setShowReminder(false)} onCreatePin={() => setIsModalOpen(true)} />}
    </main>
  );
};

export default Home;