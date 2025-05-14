import React, { useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  onValidityChange?: (isValid: boolean) => void;
}

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  onChange,
  disabled = false,
  onValidityChange,
}) => {
  const validatePhoneNumber = (number: string): boolean => {
    if (!number) {
      onValidityChange?.(false);
      return false;
    }

    const digitsOnly = number.replace(/\D/g, "");
    const isValid = digitsOnly.length >= 10;

    onValidityChange?.(isValid);
    return isValid;
  };

  useEffect(() => {
    if (value) {
      validatePhoneNumber(value);
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-2">
      {" "}
      <PhoneInput
        international
        countryCallingCodeEditable={true}
        defaultCountry="NG"
        value={value}
        onChange={(newValue) => onChange(newValue || "")}
        disabled={disabled}
        placeholder="Enter phone number"
        className="h-[4em] w-full rounded-full border-[1px] border-gray-200 bg-white pl-4 pr-4 text-sm shadow-md hover:border-text2 focus:border-text2 focus:outline-none focus:ring-2 focus:ring-text2"
        inputProps={{
          className:
            "h-full w-full rounded-full border-none bg-transparent text-sm focus:outline-none",
        }}
      />
    </div>
  );
};
