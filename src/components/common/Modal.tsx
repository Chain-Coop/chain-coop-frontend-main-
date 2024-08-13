import React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import cancel from "../../Assets/svg/cancel.svg";

const Modal = ({ children, isOpen, onClose, className }: any) => {
  useEffect(() => {
    function handleEscapeKeyPress(event: any) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKeyPress, true);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress, true);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`modal fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm`}
    >
      <div
        className={`relative my-8 w-full max-w-lg rounded-[1em] p-3 px-[2em] ${className}`}
      >
        <img
          src={cancel}
          alt="cancel"
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer hover:text-gray-700"
        />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
