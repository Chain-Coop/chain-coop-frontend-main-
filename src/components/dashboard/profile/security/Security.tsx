import { useState, useCallback } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Email from "./modal/Email";
import OtpInput from "./modal/OtpInput";
import NewPassword from "./modal/NewPassword";
import useUserProfile from "../../../../shared/Hooks/useUserProfile";
import GeneratePin from "./modal/GeneratePin";
import OtpPin from "./modal/OtpPin";
import ChangePin from "./modal/ChangePin";
import { resetPasswordState } from "../../../../shared/redux/slices/landing.slices";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../shared/redux/store";
import Success from "./modal/Success";

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
            <Email
              email={email}
              setEmail={setEmail}
              onEmailSent={handleEmailSent}
              isOpen={true}
              onClose={handleModalClose}
            />
          );
        case 2:
          return (
            <OtpInput
              otp={otp}
              setOtp={setOtp}
              isOpen={isModalOpen}
              onClose={handleModalClose}
              onOtpEntered={() => setPasswordResetStep(3)}
            />
          );
        case 3:
          return (
            <NewPassword
              email={profileDetails.email}
              otp={otp}
              isOpen={isModalOpen}
              onClose={handleModalClose}
              onSuccess={handlePasswordResetSuccess}
            />
          );
        default:
          return null;
      }
    }
    if (currentModalType === "pin") {
      switch (pinResetStep) {
        case 1:
          return (
            <GeneratePin
              isOpen={isModalOpen}
              onClose={handleModalClose} 
            />
          );
        case 2:
          return (
            <OtpPin
              isOpen
              onNext={(enteredOtp: any) => {
                setOtp(enteredOtp);
                setPinResetStep(3);
              }}
              onClose={handleModalClose}
            />
          );
        case 3:
          return (
            <ChangePin
              otp={otp}
              isOpen={true}
              onClose={handleModalClose}
              onSuccess={handlePinSuccess}
            />
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

      <Success
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        title="Password Reset Successfully"
      />

      <Success
        isOpen={isPinSuccessModalOpen}
        onClose={handlePinSuccessModalClose}
        title="Pin Successfully Changed"
      />
    </main>
  );
};

export default Security;
