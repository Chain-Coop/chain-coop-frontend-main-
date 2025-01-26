import React, { useRef } from "react";
import { toast } from "react-toastify";

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
  const inputRef = useRef<HTMLInputElement>(null);

  const validateNigerianNumber = (number: string): boolean => {
    const phoneNumber = number.startsWith("+234") ? number.slice(4) : number;

    const isValid = /^[789]\d{9}$/.test(phoneNumber);

    if (phoneNumber.length > 0 && !isValid) {
      if (phoneNumber.length < 10) {
        // toast.error("phone number must be 10 digits")
      } else if (!phoneNumber.match(/^[789]/)) {
        toast.error("Nigerian phone numbers must start with 7, 8, or 9");
      } else {
        toast.error("Please enter a valid Nigerian phone number");
      }
      onValidityChange?.(false);
      return false;
    }

    onValidityChange?.(phoneNumber.length === 10 && isValid);
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    inputValue = inputValue.replace(/\D/g, "");
    inputValue = inputValue.slice(0, 10);

    const formattedNumber = inputValue ? `+234${inputValue}` : "";

    validateNigerianNumber(formattedNumber);
    onChange(formattedNumber);
  };

  const handleBlur = () => {
    if (value) {
      validateNigerianNumber(value);
    }
  };

  const displayValue = React.useMemo(() => {
    return value?.startsWith("+234") ? value.slice(4) : value;
  }, [value]);

  return (
    <div className="relative flex items-center">
      <div className="pointer-events-none absolute left-4 text-gray-600">
        +234
      </div>
      <input
        ref={inputRef}
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        value={displayValue || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder="*********"
        className="h-[4em] w-full rounded-full border-[1px] pl-16 pr-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
      />
    </div>
  );
};

export const CardBrandLogo = ({ brand }: { brand: string }) => {
  const logoStyle =
    "absolute right-4 bottom-4 h-6 w-10 rounded bg-white/90 flex items-center justify-center font-bold";

  switch (brand.toLowerCase()) {
    case "visa":
      return <div className={logoStyle + " text-blue-600"}>VISA</div>;
    case "mastercard":
      return <div className={logoStyle + " text-red-600"}>MC</div>;
    case "verve":
      return <div className={logoStyle + " text-green-600"}>VERVE</div>;
    default:
      return <div className={logoStyle + " text-gray-600"}>{brand}</div>;
  }
};
