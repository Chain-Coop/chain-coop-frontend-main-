import React, { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { Alert } from "@mui/material";

export interface Bank {
  id: string;
  name: string;
  code: string;
}

interface BankDropdownProps {
  onBankSelect: (bank: Bank) => void;
  banks: Bank[];
  label?: string;
  placeholder?: string;
  className?: string;
  error?: string;
  selectedBank?: Bank | null;
  required?: boolean;
  labelTextColor?: string;
}

const BankDropdown: React.FC<BankDropdownProps> = ({
  onBankSelect,
  banks,
  label = "Select a bank",
  placeholder = "Choose a bank",
  className = "",
  error = "",
  selectedBank = null,
  required = false,
  labelTextColor = "text-gray-700",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [localSelectedBank, setLocalSelectedBank] = useState<Bank | null>(
    selectedBank,
  );

  useEffect(() => {
    if (selectedBank) {
      setLocalSelectedBank(selectedBank);
    }
  }, [selectedBank]);

  const filteredBanks: Bank[] = banks?.filter((bank: Bank) =>
    bank?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
  );

  const handleBankSelect = (bank: Bank) => {
    setLocalSelectedBank(bank);
    onBankSelect(bank);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <label className={`mb-2 block text-sm font-medium ${labelTextColor}`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white p-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`${localSelectedBank ? "text-gray-900" : "text-gray-500"}`}
        >
          {localSelectedBank ? localSelectedBank.name : placeholder}
        </span>
        <IoIosArrowDown className="text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg">
          <div className="sticky top-0 border-b bg-white p-2">
            <div className="flex items-center rounded-md bg-gray-100 p-2">
              <IoIosSearch className="mr-2 text-gray-500" />
              <input
                type="text"
                placeholder="Search banks..."
                className="w-full flex-1 bg-transparent outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="max-h-55 overflow-y-auto">
            {filteredBanks?.length > 0 ? (
              filteredBanks?.map((bank: Bank) => (
                <div
                  key={bank.id}
                  className="cursor-pointer p-3 transition-colors hover:bg-gray-100"
                  onClick={() => handleBankSelect(bank)}
                >
                  {bank.name}
                </div>
              ))
            ) : (
              <div className="p-3 text-center text-gray-500">
                No results found
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <Alert severity="error" className="mt-2">
          {error}
        </Alert>
      )}
    </div>
  );
};

export default BankDropdown;
