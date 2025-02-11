import React, { useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { PINInputProps } from "../types/types";

const PINInput: React.FC<PINInputProps> = ({
  length = 4,
  value,
  onChange,
  className = "",
  inputClassName = "",
  showVisibilityToggle = false,
  label,
  gap = 4, // Default gap of 4
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPin, setShowPin] = useState(false);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = e.target.value;
    const isNumeric = /^\d*$/.test(newValue);

    if (!isNumeric) return;

    const digit = newValue.slice(-1);
    const newPIN = value.padEnd(length, "").split("");
    newPIN[index] = digit;
    onChange(newPIN.join("").trim());

    if (digit && index < length - 1) {
      const parent = e.target.parentElement as HTMLElement;
      const nextInput = parent?.children[index + 1] as HTMLInputElement;
      nextInput?.focus();
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      if (value[index]) {
        const newPIN = value.padEnd(length, "").split("");
        newPIN[index] = "";
        onChange(newPIN.join("").trim());
      } else if (index > 0) {
        const parent = e.currentTarget.parentElement as HTMLElement;
        const prevInput = parent?.children[index - 1] as HTMLInputElement;
        prevInput?.focus();
        setActiveIndex(index - 1);
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      const parent = e.currentTarget.parentElement as HTMLElement;
      const prevInput = parent?.children[index - 1] as HTMLInputElement;
      prevInput?.focus();
      setActiveIndex(index - 1);
    }

    if (e.key === "ArrowRight" && index < length - 1) {
      const parent = e.currentTarget.parentElement as HTMLElement;
      const nextInput = parent?.children[index + 1] as HTMLInputElement;
      nextInput?.focus();
      setActiveIndex(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    const isNumeric = /^\d+$/.test(pastedData);

    if (isNumeric) {
      onChange(pastedData);

      const nextEmptyIndex = Math.min(pastedData.length, length - 1);
      const parent = e.currentTarget.parentElement as HTMLElement;
      const nextInput = parent?.children[nextEmptyIndex] as HTMLInputElement;
      nextInput?.focus();
      setActiveIndex(nextEmptyIndex);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label className="mb-3 flex justify-center font-semibold text-text2">
          {label}
        </label>
      )}
      <div className={`relative ${className}`}>
        <div className={`flex items-center justify-center gap-${gap}`}>
          {" "}
          {/* Modified gap here */}
          {Array(length)
            .fill(null)
            .map((_, index) => (
              <input
                key={index}
                type={showPin ? "text" : "password"}
                inputMode="numeric"
                maxLength={1}
                value={value[index] || ""}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`
                h-12 w-12 rounded-md 
                border text-center text-lg shadow-sm
                focus:border-text2 focus:outline-none focus:ring-1 focus:ring-text2
                ${activeIndex === index ? "border-text2" : "border-gray-200"}
                transition-all duration-200
                ${inputClassName}
              `}
                aria-label={`PIN digit ${index + 1} of ${length}`}
              />
            ))}
        </div>
        {showVisibilityToggle && (
          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="absolute right-0 top-1/2 -translate-x-4 -translate-y-1/2"
          >
            {showPin ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
          </button>
        )}
      </div>
    </div>
  );
};

export default PINInput;
