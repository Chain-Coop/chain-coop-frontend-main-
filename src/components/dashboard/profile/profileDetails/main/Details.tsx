import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Modal from "../../../../common/Modal";
import TierOneFirstModal from "../kyc/teirOne/phoneNumber/TierOneFirstModal";
import TierOneSecondModal from "../kyc/teirOne/phoneNumber/TeirOneSecondModal";
import TierOneThirdModal from "../kyc/teirOne/phoneNumber/TeirOneThirdModal";
import WhatsappOtpModal from "../kyc/teirOne/whatsapp/WhatsappOtpModal";
import SuccessModal from "../kyc/teirOne/phoneNumber/SuccessModal";
import WhatsappVerificationModal from "../kyc/teirOne/whatsapp/WhatsappVerificationModal";
import useUserProfile from "../../../../../shared/Hooks/useUserProfile";

const Details = () => {
  const navigate = useNavigate();
  const [showTierOneModal, setShowTierOneModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showThirdModal, setShowThirdModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [otpReference, setOtpReference] = useState<string>("");
  const [showWhatsAppVerificationModal, setShowWhatsAppVerificationModal] =
    useState(false);
  const [whatsAppReference, setWhatsAppReference] = useState<string>("");

  const sections = [
    {
      title: "ID Verification",
      status: "0/2 verified",
      statusColor: "bg-red-600",
      onClick: () => setShowTierOneModal(true),
    },
    {
      title: "Accounts & Card",
      to: "/dashboard/profile/manage-cards",
    },
  ];

  const handleModalClose = () => {
    setShowTierOneModal(false);
    setShowSecondModal(false);
    setShowThirdModal(false);
    setShowWhatsAppModal(false);
    setShowWhatsAppVerificationModal(false);
    setShowSuccessModal(false);
  };

  const handleVerificationSuccess = () => {
    setShowThirdModal(false);
    setShowWhatsAppVerificationModal(false);
    setShowSuccessModal(true);
  };

  const handleStepOneClick = () => {
    setShowSecondModal(true);
    setShowTierOneModal(false);
  };

  const handleStepTwoSuccess = (reference: string) => {
    setOtpReference(reference);
    setShowSecondModal(false);
    setShowThirdModal(true);
  };

  const handleSwitchToWhatsapp = () => {
    setShowThirdModal(false);
    setShowWhatsAppModal(true);
  };

  const handleBackToSMS = () => {
    setShowWhatsAppModal(false);
    setShowThirdModal(true);
  };

  const handleSectionClick = (section: any) => {
    if (section.to) {
      navigate(section.to);
    } else if (section.onClick) {
      section.onClick();
    }
  };

  const handleWhatsAppOtpSuccess = (reference: string) => {
    setWhatsAppReference(reference);
    setShowWhatsAppModal(false);
    setShowWhatsAppVerificationModal(true);
  };

  return (
    <main className="mt-4 font-sans">
      <header>
        <h2 className="font-semibold text-howtext">PROFILE</h2>
      </header>
      <section className="mt-[1.2em]">
        {sections.map((section, index) => (
          <div
            key={index}
            className="mb-2 flex cursor-pointer flex-col"
            onClick={() => handleSectionClick(section)}
          >
            <hr className="h-[1px] rounded-full bg-gray-200" />
            <div className="flex items-center justify-between py-1">
              <span className="font-semibold">{section.title}</span>
              <div className="flex items-center">
                {section.status && (
                  <button
                    className={`rounded-full px-4 py-1 text-sm font-medium text-white shadow-md ${section.statusColor}`}
                  >
                    {section.status}
                  </button>
                )}
                <IoIosArrowForward size={15} className="text-text2" />
              </div>
            </div>
          </div>
        ))}
      </section>

      <Modal
        className="bg-white"
        isOpen={showTierOneModal}
        onClose={handleModalClose}
      >
        <TierOneFirstModal
          onClose={handleModalClose}
          onStepOneClick={handleStepOneClick}
        />
      </Modal>

      <Modal
        className="bg-white"
        isOpen={showSecondModal}
        onClose={handleModalClose}
      >
        <TierOneSecondModal
          onClose={handleModalClose}
          onSuccess={handleStepTwoSuccess}
        />
      </Modal>

      <Modal
        className="bg-white"
        isOpen={showThirdModal}
        onClose={handleModalClose}
      >
        <TierOneThirdModal
          reference={otpReference}
          onClose={handleModalClose}
          onSwitchToWhatsapp={handleSwitchToWhatsapp}
          onVerificationSuccess={handleVerificationSuccess}
        />
      </Modal>

      <Modal
        className="bg-white"
        isOpen={showWhatsAppModal}
        onClose={handleModalClose}
      >
        <WhatsappOtpModal
          onClose={handleModalClose}
          onBack={() => {
            setShowWhatsAppModal(false);
            setShowThirdModal(true);
          }}
          onOtpSuccess={handleWhatsAppOtpSuccess}
        />
      </Modal>

      <Modal
        className="bg-white"
        isOpen={showWhatsAppVerificationModal}
        onClose={handleModalClose}
      >
        <WhatsappVerificationModal
          reference={whatsAppReference}
          onClose={handleModalClose}
          onBack={() => {
            setShowWhatsAppVerificationModal(false);
            setShowWhatsAppModal(true);
          }}
          onVerificationSuccess={handleVerificationSuccess}
        />
      </Modal>

      <Modal
        className="bg-white"
        isOpen={showSuccessModal}
        onClose={handleModalClose}
      >
        <SuccessModal onClose={handleModalClose} />
      </Modal>
    </main>
  );
};

export default Details;
