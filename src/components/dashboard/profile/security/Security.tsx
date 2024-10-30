import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Modal from "../../../common/Modal";
import Email from "./modal/Email";
import OtpInput from "./modal/OtpInput";
import NewPassword from "./modal/NewPassword";
import useUserProfile from "../../../../shared/Hooks/useUserProfile";
const Security = () => {
  const [currentStep, setCurrentStep] = useState(0); 
  const [email, setEmail] = useState("");
  const { profileDetails } = useUserProfile();
  const [otp, setOtp] = useState("");

  const handlePasswordResetClick = () => {
    setCurrentStep(1);
  };

  const handleCloseModal = () => {
    setCurrentStep(0);
    setEmail("");
    setOtp("");
  };

  const handleEmailSent = () => {
    setCurrentStep(2); 
  };

  const handleOtpEntered = () => {
    setCurrentStep(3); 
  };

  const handleResetSuccess = () => {
    setCurrentStep(0);
  };

  const sections = [
    { title: "Chain Pin" },
    { title: "Password Reset", onClick: handlePasswordResetClick },
  ];

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

      {currentStep === 1 && (
        <Modal
          className="bg-[#E9E9E9]"
          isOpen
          onClose={handleCloseModal}
        >
          <Email
            email={email}
            setEmail={setEmail}
            onClose={handleCloseModal}
            onEmailSent={handleEmailSent}
          />
        </Modal>
      )}

      {currentStep === 2 && (
        <Modal
          className="bg-[#E9E9E9]"
          isOpen
          onClose={handleCloseModal}
        >
          <OtpInput
            otp={otp}
            setOtp={setOtp}
            onClose={handleCloseModal}
            onOtpEntered={handleOtpEntered}
          />
        </Modal>
      )}

       {currentStep === 3 && (
        <Modal
          className="bg-[#E9E9E9]"
          isOpen
          onClose={handleCloseModal}
        >
          <NewPassword
            email={profileDetails.email}
            otp={otp}
            onClose={handleCloseModal}
            onSuccess={handleResetSuccess} // Pass onSuccess to close all modals
          />
        </Modal>
      )} 
    </main>
  );
};

export default Security;
