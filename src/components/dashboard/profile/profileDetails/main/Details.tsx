import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Modal from "../../../../common/Modal";
import TierOneFirstModal from "../kyc/teirOne/TierOneFirstModal";
import TierOneSecondModal from "../kyc/teirOne/TeirOneSecondModal";

const Details = () => {
  const navigate = useNavigate();
  const [showTierOneModal, setShowTierOneModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);

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
  };

  const handleStepOneClick = () => {
    setShowSecondModal(true);
    setShowTierOneModal(false);
  };

  const handleSectionClick = (section: any) => {
    if (section.to) {
      navigate(section.to);
    } else if (section.onClick) {
      section.onClick();
    }
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
        <TierOneSecondModal onClose={handleModalClose} />
      </Modal>
    </main>
  );
};

export default Details;
