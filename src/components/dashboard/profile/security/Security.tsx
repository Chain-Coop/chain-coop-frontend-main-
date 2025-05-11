import { useState, useCallback } from "react";
import { IoIosArrowForward } from "react-icons/io";
import GeneratePin from "./modal/GeneratePin";
import OtpPin from "./modal/OtpPin";
import ChangePin from "./modal/ChangePin";
import Email from "./modal/Email";
import OtpInput from "./modal/OtpInput";
import NewPassword from "./modal/NewPassword";
import Success from "../../../common/Success";
import ChangePhoneNumber from "./modal/changePhoneNumber";
import PhoneNumberOtp from "./phoneNumberOtp";
import NewPhoneNumber from "./newPhoneNumber";
import { useAppSelector } from "../../../../shared/redux/reduxHooks";
import { RootState } from "../../../../shared/redux/rootReducer";

const Security = () => {
  const { getProfile } = useAppSelector((state: RootState) => state.landing);

  const [passwordResetStep, setPasswordResetStep] = useState(0);
  const [pinResetStep, setPinResetStep] = useState(0);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalType, setCurrentModalType] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isPinSuccessModalOpen, setIsPinSuccessModalOpen] = useState(false);
  const [changePhoneNumberSteps, setChangePhoneNumberSteps] = useState(0);
  const [isPhoneNumberSuccessModalOpen, setIsPhoneNumberSuccessModalOpen] =
    useState(false);
  const [successMessage, setSuccessMessage] = useState(
    "Operation completed successfully",
  );

  const resetStates = () => {
    setPasswordResetStep(0);
    setPinResetStep(0);
    setChangePhoneNumberSteps(0);
    setEmail("");
    setOtp("");
    setIsModalOpen(false);
    setCurrentModalType("");
    setIsSuccessModalOpen(false);
    setIsPinSuccessModalOpen(false);
    setIsPhoneNumberSuccessModalOpen(false);
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
    setSuccessMessage("Password Reset Successfully");
    setIsSuccessModalOpen(true);
  };

  const handlePhoneNumberSuccess = () => {
    setIsModalOpen(false);
    setSuccessMessage("Phone Number Updated Successfully");
    setIsPhoneNumberSuccessModalOpen(true);
  };

  const handlePhoneNumberSuccessModalClose = () => {
    setIsPhoneNumberSuccessModalOpen(false);
    resetStates();
  };

  const handleEmailSent = useCallback(() => {
    if (currentModalType === "password") {
      setPasswordResetStep(2);
    } else if (currentModalType === "phoneNumber") {
      setChangePhoneNumberSteps(2);
    }
  }, [currentModalType]);

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
        // dispatch(resetPasswordState());
      },
    },
    {
      title: "Change phone number",
      onClick: () => {
        setCurrentModalType("phoneNumber");
        setChangePhoneNumberSteps(1);
        setIsModalOpen(true);
        setOtp("");
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
              email={email}
            />
          );
        case 3:
          return (
            <NewPassword
              email={getProfile?.email || ""}
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
              onOtpGenerated={() => setPinResetStep(2)}
            />
          );
        case 2:
          return (
            <OtpPin
              isOpen={isModalOpen}
              onNext={(enteredOtp: string) => {
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
              isOpen={isModalOpen}
              onClose={handleModalClose}
              onSuccess={handlePinSuccess}
            />
          );
        default:
          return null;
      }
    }

    if (currentModalType === "phoneNumber") {
      switch (changePhoneNumberSteps) {
        case 1:
          return (
            <ChangePhoneNumber
              email={email}
              setEmail={setEmail}
              onEmailSent={handleEmailSent}
              isOpen={true}
              onClose={handleModalClose}
            />
          );
        case 2:
          return (
            <PhoneNumberOtp
              otp={otp}
              setOtp={setOtp}
              isOpen={isModalOpen}
              onClose={handleModalClose}
              onOtpEntered={() => setChangePhoneNumberSteps(3)}
              email={email}
            />
          );
        case 3:
          return (
            <NewPhoneNumber
              isOpen={isModalOpen}
              onClose={handleModalClose}
              onSuccess={handlePhoneNumberSuccess}
            />
          );
        default:
          return null;
      }
    }
  };

  return (
    <main className="mt-4">
      <header>
        <h2 className="font-semibold uppercase text-[#B3B3B3]">Security</h2>
      </header>

      <section className="mt-[1.2em]">
        {sections.map((section, index) => (
          <div key={index} className="mb-2 flex flex-col">
            <hr className="h-[1px] rounded-full bg-gray-200" />
            <div
              className="flex cursor-pointer items-center justify-between py-3"
              onClick={section.onClick}
            >
              <span className="font-semibold">{section.title}</span>
              <div className="flex items-center">
                <IoIosArrowForward size={20} className="text-black" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {renderModal()}

      <Success
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        title={successMessage}
      />

      <Success
        isOpen={isPinSuccessModalOpen}
        onClose={handlePinSuccessModalClose}
        title="Pin Successfully Changed"
      />

      <Success
        isOpen={isPhoneNumberSuccessModalOpen}
        onClose={handlePhoneNumberSuccessModalClose}
        title="Phone Number Updated Successfully"
      />
    </main>
  );
};

export default Security;
