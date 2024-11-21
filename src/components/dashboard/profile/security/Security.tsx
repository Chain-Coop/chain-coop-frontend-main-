import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Modal from "../../../common/Modal";
import Email from "./modal/Email";
import OtpInput from "./modal/OtpInput";
import NewPassword from "./modal/NewPassword";
import useUserProfile from "../../../../shared/Hooks/useUserProfile";
import GeneratePin from "./modal/GeneratePin";
import OtpPin from "./modal/OtpPin";
import ChangePin from "./modal/ChangePin";

const Security = () => {
  const [passwordResetStep, setPasswordResetStep] = useState(0);
  const [pinResetStep, setPinResetStep] = useState(0);
  const [email, setEmail] = useState("");
  const { profileDetails } = useUserProfile();
  const [otp, setOtp] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalType, setCurrentModalType] = useState("");

  const resetStates = () => {
    setPasswordResetStep(0);
    setPinResetStep(0);
    setEmail("");
    setOtp("");
    setIsModalOpen(false);
    setCurrentModalType("");
  };

  const sections = [
    {
      title: "Chain Pin",
      onClick: () => {
        setCurrentModalType("pin");
        setPinResetStep(1);
        setIsModalOpen(true);
      },
    },
    {
      title: "Password Reset",
      onClick: () => {
        setCurrentModalType("password");
        setPasswordResetStep(1);
        setIsModalOpen(true);
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
              className="w-[25em] bg-[#E9E9E9]"
              isOpen
              onClose={resetStates}
            >
              <Email
                email={email}
                setEmail={setEmail}
                onClose={resetStates}
                onEmailSent={() => setPasswordResetStep(2)}
              />
            </Modal>
          );
        case 2:
          return (
            <Modal className="bg-[#E9E9E9]" isOpen onClose={resetStates}>
              <OtpInput
                otp={otp}
                setOtp={setOtp}
                onClose={resetStates}
                onOtpEntered={() => setPasswordResetStep(5)}
              />
            </Modal>
          );
        case 3:
          return (
            <Modal className="bg-[#E9E9E9]" isOpen onClose={resetStates}>
              <NewPassword
                email={profileDetails.email}
                otp={otp}
                onClose={resetStates}
                onSuccess={resetStates}
              />
            </Modal>
          );
      }
    }

    if (currentModalType === "pin") {
      switch (pinResetStep) {
        case 1:
          return (
            <Modal
              className="w-[25em] bg-[#E9E9E9]"
              isOpen
              onClose={resetStates}
            >
              <GeneratePin onClose={() => setPinResetStep(2)} />
            </Modal>
          );
        case 2:
          return (
            <Modal
              className="w-[25em] bg-[#E9E9E9]"
              isOpen
              onClose={resetStates}
            >
              <OtpPin
                onNext={(enteredOtp: any) => {
                  setOtp(enteredOtp);
                  setPinResetStep(3);
                }}
                onClose={resetStates}
              />
            </Modal>
          );
        case 3:
          return (
            <Modal
              className="w-[25em] bg-[#E9E9E9]"
              isOpen
              onClose={resetStates}
            >
              <ChangePin otp={otp} onClose={resetStates} />
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
    </main>
  );
};

export default Security;
