import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PropTypes from "prop-types";

const Modal = ({ children, isOpen, onClose, className }) => {
  useEffect(() => {
    function handleEscapeKeyPress(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    function handleClickOutside(event) {
      if (event.target.closest(".modal") !== event.currentTarget) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKeyPress, true);
      document.addEventListener("mousedown", handleClickOutside, true);
      document.addEventListener("touchstart", handleClickOutside, true);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress, true);
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("touchstart", handleClickOutside, true);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`modal fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm`}
    >
      {/* <div
        className={`lg:p-15 bg-dashboard relative mx-4 my-8 w-full max-w-lg rounded-[1em] p-[1.5em] shadow-lg md:max-w-xl md:p-6 lg:max-w-2xl xl:max-w-3xl ${className}`}
      > */}
      <div
        className={`relative my-8 w-full max-w-lg rounded-[1em] p-3 px-[2em] ${className}`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose size={24} />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Modal;
