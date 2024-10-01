import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Modal from "../../../common/Modal";
import { Primary } from "../../../common/Button";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { IoIosArrowBack } from "react-icons/io";
// import success from "../../../../Assets/svg/auth/sucess.svg";
import withdraw_icon from "../../../../Assets/svg/dashboard/wallet/withdraw.svg";
import OTPInput from "react-otp-input";

const VerifyAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { accountName, accountNumber, bankName } = location.state || {};
  const [otp, setOtp] = useState("");

  const handleOtpChange = (otpValue: any) => {
    setOtp(otpValue);

  };


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <main className="font-sans">
      <header className="lg:mt-[2em]">
      <DashboardHeader
          className="relative cursor-pointer items-center"
          onClick={handleBackClick}
        >
          <IoIosArrowBack
            size={25}
            className="absolute left-0 cursor-pointer"
          />
          <div className="flex flex-grow items-center justify-center">
            <div className="tracking-wide">Verify Account</div>
          </div>
        </DashboardHeader>
      </header>
      <section className="text-center items-center flex gap- flex-col justify-center mt-[2.5em]">
      <img src={withdraw_icon} alt="withdraw_icon" />
      <div className="mt-[2em]">
      <h1 className="font-bold">{accountName}</h1>
      <p className="text-howtext flex gap-1 font-medium">
        <span>
          {bankName}
          </span>
          .
          <span>
          {accountNumber}
          </span>
          </p>
      </div>
      </section>
      <Primary
        className="mt-[2em] w-full bg-text2 py-3 text-white"
        onClick={toggleModal}
      >
        Submit
      </Primary>
      <div>
        <Modal
          isOpen={isModalOpen}
          onClose={toggleModal}
          className="bg-white text-center flex fle-col justify-center py-[3em]"
        > 
        <header>
          <h1 className="font-semibold text-2xl">
        My Chain Co-op Pin
          </h1>
          <p className="text-howtext mt-1">Enter your trasaction pin.</p>
        </header>
             <OTPInput
                value=""
                onChange={handleOtpChange}
                skipDefaultStyles={true}
                containerStyle={"gap-3 my-5"}
                numInputs={4}
                inputStyle={
                  "block lg:h-[55px] lg:w-[55px] sm:h-[50px] sm:w-[35px] text-center border-gray-200 rounded-md text-sm placeholder:text-gray-300 focus:border-text2 focus:ring-text2 bg-gray-100 disabled:opacity-50 disabled:pointer-events-none  dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                }
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />
                <Primary
              className="mt-[2em] w-full font-semibold rounded-full bg-text2 py-2 text-white"
            >
              Send
            </Primary>
        </Modal>
      </div>
    </main>
  );
};

export default VerifyAccount;



{/* <div className="mt-[2.5em] flex flex-col justify-center">
  <img
    src={success}
    alt="Logo"
    className="mx-auto sm:w-[6em] lg:w-[8em]"
  />
  <header>
    <h1 className="text-center text-xl font-semibold">
      Successfully Submitted
    </h1>
  </header>
</div> */}