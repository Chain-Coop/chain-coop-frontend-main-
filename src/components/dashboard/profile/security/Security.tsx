import React, { useState, useCallback, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Modal from "../../../common/Modal";
import Email from "./modal/Email";
import OtpInput from "./modal/OtpInput";
import NewPassword from "./modal/NewPassword";
import useUserProfile from "../../../../shared/Hooks/useUserProfile";
import GeneratePin from "./modal/GeneratePin";
import OtpPin from "./modal/OtpPin";
import ChangePin from "./modal/ChangePin";
import success from "../../../../Assets/svg/auth/sucess.svg";
import { resetPasswordState } from "../../../../shared/redux/slices/landing.slices";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../shared/redux/store";
const Security = () => {
  const dispatch: AppDispatch = useDispatch();
  const [passwordResetStep, setPasswordResetStep] = useState(0);
  const [pinResetStep, setPinResetStep] = useState(0);
  const [email, setEmail] = useState("");
  const { profileDetails } = useUserProfile();
  const [otp, setOtp] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalType, setCurrentModalType] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isPinSuccessModalOpen, setIsPinSuccessModalOpen] = useState(false);

  const resetStates = () => {
    setPasswordResetStep(0);
    setPinResetStep(0);
    setEmail("");
    setOtp("");
    setIsModalOpen(false);
    setCurrentModalType("");
    setIsSuccessModalOpen(false);
    setIsPinSuccessModalOpen(false);
  };

  const handlePinSuccess = () => {
    setIsModalOpen(false);
    setIsPinSuccessModalOpen(true);
  };

  const handlePinSuccessModalClose = () => {
    setIsPinSuccessModalOpen(false);
    resetStates();
  };

  const handleModalClose = () => {
    resetStates();
    setOtp("");
  };

  const handlePasswordResetSuccess = () => {
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleEmailSent = useCallback(() => {
    setPasswordResetStep(2);
  }, []);

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    resetStates();
  };

  const sections = [
    {
      title: "Chain Pin",
      onClick: () => {
        setCurrentModalType("pin");
        setPinResetStep(1);
        setIsModalOpen(true);
        setOtp("");
      },
    },
    {
      title: "Password Reset",
      onClick: () => {
        setCurrentModalType("password");
        setPasswordResetStep(1);
        setIsModalOpen(true);
        setOtp("");
        dispatch(resetPasswordState());
      },
    },
  ];

  const renderModal = () => {
    if (!isModalOpen) return null;

    if (currentModalType === "password") {
      switch (passwordResetStep) {
        case 1:
          return (
            <Modal
              className="bg-[#E9E9E9] px-[3em]"
              isOpen={true}
              onClose={handleModalClose}
            >
              <Email
                email={email}
                setEmail={setEmail}
                onClose={handleModalClose}
                onEmailSent={handleEmailSent}
              />
            </Modal>
          );
        case 2:
          return (
            <Modal
              className="w-[25em] bg-[#E9E9E9]"
              isOpen={true}
              onClose={handleModalClose}
            >
              <OtpInput
                otp={otp}
                setOtp={setOtp}
                onClose={handleModalClose}
                onOtpEntered={() => setPasswordResetStep(3)}
              />
            </Modal>
          );
        case 3:
          return (
            <Modal
              className="w-[25em] bg-[#E9E9E9]"
              isOpen={true}
              onClose={handleModalClose}
            >
              <NewPassword
                email={profileDetails.email}
                otp={otp}
                onClose={handleModalClose}
                onSuccess={handlePasswordResetSuccess}
              />
            </Modal>
          );
        default:
          return null;
      }
    }
    if (currentModalType === "pin") {
      switch (pinResetStep) {
        case 1:
          return (
            <Modal
              className="w-[25em] bg-[#E9E9E9]"
              isOpen
              onClose={handleModalClose}
            >
              <GeneratePin
                onClose={() => {
                  setPinResetStep(2);
                  setOtp("");
                }}
              />
            </Modal>
          );
        case 2:
          return (
            <Modal className="bg-[#E9E9E9]" isOpen onClose={handleModalClose}>
              <OtpPin
                onNext={(enteredOtp: any) => {
                  setOtp(enteredOtp);
                  setPinResetStep(3);
                }}
                onClose={handleModalClose}
              />
            </Modal>
          );
        case 3:
          return (
            <Modal
              className="w-[25em] bg-[#E9E9E9]"
              isOpen
              onClose={handleModalClose}
            >
              <ChangePin
                onSuccess={handlePinSuccess}
                otp={otp}
                onClose={handleModalClose}
              />
            </Modal>
          );
      }
    }
  };

  return (
    <main className="mt-4 font-sans">
      <header>
        <h2 className="font-semibold text-howtext">Security</h2>
      </header>

      <section className="mt-[1.2em]">
        {sections.map((section, index) => (
          <div key={index} className="mb-2 flex flex-col">
            <hr className="h-[1px] rounded-full bg-gray-200" />
            <div
              className="flex cursor-pointer items-center justify-between py-1"
              onClick={section.onClick}
            >
              <span className="font-semibold">{section.title}</span>
              <div className="flex items-center">
                <IoIosArrowForward size={15} className="text-text2" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {renderModal()}

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        className="bg-white "
      >
        <div className="mt-[2.5em] flex w-[25em] flex-col items-center gap-[1.5em] py-[1em] lg:py-[2em]">
          <header>
            <h1 className="text-center text-2xl font-semibold">
              Reset Password
            </h1>
          </header>
          <img
            src={success}
            alt="Success Icon"
            className="sm:w-[6em] lg:w-[8em]"
          />
          <p className="text-center font-medium">Password Reset Successfully</p>
        </div>
      </Modal>

      <Modal
        isOpen={isPinSuccessModalOpen}
        onClose={handlePinSuccessModalClose}
        className="bg-white"
      >
        <div className="mt-[2.5em] flex w-[25em] flex-col items-center gap-[1.5em] py-[1em] lg:py-[2em]">
          <img
            src={success}
            alt="Success Icon"
            className="sm:w-[6em] lg:w-[8em]"
          />
          <p className="text-center font-semibold">PIN Successfully Changed</p>
        </div>
      </Modal>
    </main>
  );
};

export default Security;
