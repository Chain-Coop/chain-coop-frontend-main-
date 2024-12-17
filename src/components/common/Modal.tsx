import React from "react";
import { useEffect } from "react";
import cancel from "../../Assets/svg/cancel.svg";

const Modal = ({
  children,
  isOpen,
  onClose,
  className,
  minWidth = "min-w-md",
}: any) => {
  useEffect(() => {
    function handleEscapeKeyPress(event: any) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKeyPress, true);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress, true);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 p-4 backdrop-blur-sm sm:p-0">
      <div
        className={`relative my-4 max-h-[90vh] w-full max-w-[95vw] overflow-y-auto rounded-2xl p-2 px-3 sm:my-8 sm:w-auto sm:max-w-none sm:rounded-[1em] sm:p-3 sm:px-[1.5em] ${className}`}
      >
        <img
          src={cancel}
          alt="cancel"
          onClick={onClose}
          className="absolute right-4 top-4 h-10 w-10 cursor-pointer hover:text-gray-700 lg:right-2 lg:top-2 lg:h-12 lg:w-12"
        />
        <div className="mt-4 sm:mt-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
