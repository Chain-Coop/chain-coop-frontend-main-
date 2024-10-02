import Modal from "./Modal";
import React from "react";
import success from "../../Assets/svg/auth/sucess.svg";

const PinSuccess: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ 
    isOpen, 
    onClose 
  }) => (
    <Modal
    className="flex flex-col justify-center bg-white py-[3em] text-center"
     isOpen={isOpen} onClose={onClose}>
           <div className="flex justify-center">
          <img src={success} className="w-[6em] h-[6em]" alt="success" />
        </div>
      <div className="text-center mt-4 p-4">
        <h2 className="text-xl font-semibold text-green-600 mb-2">
          PIN Created Successfully!
        </h2>
        <p className="text-gray-600">
          Your transaction PIN has been set up. Keep it safe and never share it with anyone.
        </p>
      </div>
    </Modal>
  );

export default PinSuccess;