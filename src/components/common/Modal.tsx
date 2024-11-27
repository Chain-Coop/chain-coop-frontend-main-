// import React from "react";
// import { useEffect } from "react";
// import cancel from "../../Assets/svg/cancel.svg";

// const Modal = ({ children, isOpen, onClose, className }: any) => {
//   useEffect(() => {
//     function handleEscapeKeyPress(event: any) {
//       if (event.key === "Escape") {
//         onClose();
//       }
//     }

//     if (isOpen) {
//       document.addEventListener("keydown", handleEscapeKeyPress, true);
//     }
//     return () => {
//       document.removeEventListener("keydown", handleEscapeKeyPress, true);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <div
//       className={`modal fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm`}
//     >
//       <div
//         className={`relative my-8 w-full max-w-md rounded-[1em] p-3 px-[1.5em] ${className}`}
//       >
//         <img
//           src={cancel}
//           alt="cancel"
//           onClick={onClose}
//           className="absolute right-4 top-4 cursor-pointer hover:text-gray-700"
//         />
//         <div>{children}</div>
//       </div>
//     </div>
//   );
// };

// export default Modal;
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
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress, true);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 p-4 backdrop-blur-sm sm:p-0">
      <div
        className={`relative my-4 w-full max-w-[95vw] rounded-2xl p-2 px-3 sm:my-8 sm:w-auto sm:max-w-none sm:rounded-[1em] sm:p-3 sm:px-[1.5em] ${className}`}
      >
        <img
          src={cancel}
          alt="cancel"
          onClick={onClose}
          className="absolute right-2 top-4 h-9 w-9 cursor-pointer hover:text-gray-700 sm:right-4 lg:top-2 lg:h-6 lg:w-6"
        />
        <div className="mt-4 sm:mt-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
