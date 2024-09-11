import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import Modal from "../../../common/Modal";
import { Primary } from "../../../common/Button";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { IoIosArrowBack } from "react-icons/io";
import success from "../../../../Assets/svg/auth/sucess.svg";

const VerifyAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <main className="font-sans">
      <header className="lg:mt-[2em]">
        <DashboardHeader className="cursor-pointer" onClick={handleBackClick}>
          <div className="flex w-[65%] items-center justify-between">
            <IoIosArrowBack size={25} className="cursor-pointer" />
            <div className="tracking-wide">
              <h1>Veify Account</h1>
            </div>
          </div>
        </DashboardHeader>
      </header>
      <Primary
        className="mt-[2em] w-full bg-text2 py-2 text-white"
        onClick={toggleModal}
      >
        Continue
      </Primary>
      <div>
        <Modal
          isOpen={isModalOpen}
          onClose={toggleModal}
          className="bg-white py-[3em]"
        >
          <div className="mt-[2.5em] flex flex-col justify-center">
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
          </div>
        </Modal>
      </div>
    </main>
  );
};

export default VerifyAccount;
