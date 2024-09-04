import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const CustomSelect = ({ value, onChange, options }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="mb-5 flex h-[4em] w-full cursor-pointer items-center justify-between rounded-full border-[1px] bg-white px-4 text-sm shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || "--- Select your membership type ---"}</span>
        <FaChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full rounded-md bg-log shadow-lg">
          {options.map((option: any) => (
            <li
              key={option.value}
              className="cursor-pointer px-4 py-2 hover:bg-white"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
