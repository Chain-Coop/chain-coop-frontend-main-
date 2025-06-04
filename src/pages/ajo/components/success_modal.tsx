import React from "react";
import { IoClose } from "react-icons/io5";
import { BsPatchCheck } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";

export interface SuccessModalProps {
  // Required props
  open: boolean;
  onClose: () => void;

  // Optional props
  title?: string;
  subtitle?: string;
  showInviteButton?: boolean;
  inviteButtonText?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animationDuration?: number; // in milliseconds
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;

  // Customization props
  className?: string;
  containerClassName?: string;
  backdropClassName?: string;
  contentClassName?: string;
  closeButtonClassName?: string;
  iconClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  inviteButtonClassName?: string;
  iconColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  inviteButtonColor?: string;
  closeButtonColor?: string;

  // Custom callbacks
  onInviteClick?: () => void;
  onAnimationEnd?: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  open,
  onClose,
  title = "Group successfully created",
  subtitle,
  showInviteButton = true,
  inviteButtonText = "Invite members",
  size = "md",
  animationDuration = 300,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className = "",
  containerClassName = "",
  backdropClassName = "",
  contentClassName = "",
  closeButtonClassName = "",
  iconClassName = "",
  titleClassName = "",
  subtitleClassName = "",
  inviteButtonClassName = "",
  iconColor = "#61C040",
  titleColor = "#1E1E1E",
  subtitleColor = "#6E6C6C",
  inviteButtonColor = "#440080",
  closeButtonColor = "#430280",
  onInviteClick,
  onAnimationEnd,
}) => {
  // Size configurations
  const sizeConfig = {
    sm: { width: "300px", iconSize: "50px", textSize: "14px" },
    md: { width: "400px", iconSize: "70px", textSize: "16px" },
    lg: { width: "500px", iconSize: "90px", textSize: "18px" },
    xl: { width: "600px", iconSize: "110px", textSize: "20px" },
  };

  const { width, iconSize, textSize } = sizeConfig[size];

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, closeOnEscape, onClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${className}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm backdrop-brightness-75 transition-opacity duration-${animationDuration} ${backdropClassName}`}
        onClick={closeOnBackdropClick ? onClose : undefined}
      />

      {/* Modal Content */}
      <div
        className={`relative flex w-full max-w-[90%] flex-col items-center justify-center rounded-xl bg-white p-6 shadow-xl transition-all duration-${animationDuration} ${containerClassName}`}
        style={{ width }}
        onAnimationEnd={onAnimationEnd}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`flex h-[30px] w-[30px] items-center justify-center self-start rounded-full bg-[#72889D1A] transition-colors duration-${animationDuration} hover:bg-[#72889D33] ${closeButtonClassName}`}
          aria-label="Close modal"
        >
          <IoClose className={`text-[20px] ${closeButtonColor}`} />
        </button>

        {/* Success Icon */}
        <BsPatchCheck
          className={`${iconClassName}`}
          style={{ fontSize: iconSize, color: iconColor }}
        />

        {/* Title */}
        <h2
          id="success-modal-title"
          className={`my-3 text-center font-semibold ${titleClassName}`}
          style={{ fontSize: textSize, color: titleColor }}
        >
          {title}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <p
            className={`text-center ${subtitleClassName}`}
            style={{ fontSize: textSize, color: subtitleColor }}
          >
            {subtitle}
          </p>
        )}

        {/* Invite Button */}
        {showInviteButton && (
          <button
            onClick={onInviteClick}
            className={`mt-4 flex items-center gap-1 font-bold transition-colors duration-${animationDuration} hover:opacity-80 ${inviteButtonClassName}`}
            style={{ fontSize: textSize, color: inviteButtonColor }}
          >
            {inviteButtonText}
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default SuccessModal;
