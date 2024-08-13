import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import success from "../../../../../Assets/svg/auth/sucess.svg";
import { useNavigate } from "react-router";


const PaymentSuccessfull = () => {
  const navigate = useNavigate();
  const wallet = () => {
    navigate("/dashboard/wallet");
  };
  return (
    <main className="py-8 font-sans">
      <img src={success} alt="Logo" className="mx-auto sm:w-[6em] lg:w-[8em]" />
      <p className="mt-[1.5em] text-center text-xl font-semibold">
        Payment Successful
      </p>
      <div className="mt-[1.5em] flex items-center justify-center gap-3">
        <h1 className="text-center font-semibold text-howtext">
          Return to your wallet
        </h1>
        <IoIosArrowRoundForward
          size={30}
          className="cursor-pointer"
          onClick={wallet}
        />
      </div>
    </main>
  );
};

export default PaymentSuccessfull;
