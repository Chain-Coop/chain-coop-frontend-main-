import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Modal from "../../../common/Modal";
import NewPassword from "./modal/NewPassword";

const Security = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePasswordResetClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const sections = [
    { title: "Allow Notifications" },
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
      {isModalOpen && (
        <Modal
          className="bg-[#E9E9E9]"
          isOpen
          onClose={handleCloseModal}
        >
          <NewPassword />
        </Modal>
      )}
    </main>
  );
};

export default Security;
