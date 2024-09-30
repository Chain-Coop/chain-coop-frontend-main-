import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { Primary } from "../../../common/Button";
import { IoIosArrowBack, IoIosSearch, IoIosArrowDown } from "react-icons/io";
import { useAllBanks } from "../../../../shared/Hooks/useUserProfile";
import { useDispatch } from "react-redux";
import { GetAccountName } from "../../../../shared/redux/slices/transaction.slices";
import { AppDispatch } from "../../../../shared/redux/store";
import ReactLoading from "react-loading";

interface Bank {
  id: string;
  name: string;
  code: string;
}

const SelectAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { useBanks } = useAllBanks();
  
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null); 
  const { amount, accountNumber } = location.state || {};
  const [loading,setLoading] = useState(false)
  const filteredBanks: Bank[] = useBanks?.banks?.filter((bank: Bank) => 
    bank?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setIsOpen(false);
  };
  const verifyAccount = () => {
    if (selectedBank) {
      setLoading(true);
      dispatch(GetAccountName({ 
        accountNumber, 
        bankCode: selectedBank.code 
      }));
      setLoading(false);
    } else {
      setLoading(false);
      alert("Please select a bank");
    } 
  };
  

  return (
    <main className="font-sans">
      <header className="lg:mt-[2em]">
        <DashboardHeader className="relative cursor-pointer items-center" onClick={handleBackClick}>
          <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />
          <div className="flex flex-grow items-center justify-center">
            <div className="tracking-wide">Select Bank</div>
          </div>
        </DashboardHeader>
      </header>

      <section className="mt-[2em] px-[1em]">
        {amount && (
          <p className="mt-[1em] font-medium">
            Withdrawal amount:<span className="text-green-500">NGN {parseFloat(amount).toLocaleString()}</span>
          </p>
        )}
        <p className="mt-[1em] font-medium">
          Account Number: <span className="text-green-500">{accountNumber}</span> 
        </p>

        <div className="mt-[1.5em] relative">
          <div 
            className="border-border bg-input flex items-center justify-between p-3 rounded-lg cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{selectedBank ? selectedBank.name : "Select a bank"}</span>
            <IoIosArrowDown />
          </div>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
              <div className="p-2 border-b">
                <div className="flex items-center bg-gray-100 rounded-md p-2">
                  <IoIosSearch className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Search banks..."
                    className="bg-transparent outline-none flex-1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {filteredBanks?.length > 0 ? (
                  filteredBanks?.map((bank:any) => (
                    <div
                      key={bank.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleBankSelect(bank)}
                    >
                      {bank?.name}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-center text-gray-500">No results found</div>
                )}
              </div>
            </div>
          )}
        </div>

        <Primary
          className="mt-[2em] w-full bg-text2 py-3 text-white"
          onClick={verifyAccount}
        >
             {loading ? (
              <ReactLoading
                color="#FFFFFF"
                width={25}
                height={25}
                type="spin"
              />
            ) : (
              " Verify Account"
            )}
        </Primary>
      </section>
    </main>
  );
};

export default SelectAccount;