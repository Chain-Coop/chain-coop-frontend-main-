import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { Primary } from "../../../common/Button";
import { IoIosArrowBack, IoIosSearch, IoIosArrowDown } from "react-icons/io";
import { useAllBanks } from "../../../../shared/Hooks/useUserProfile";
import { useDispatch } from "react-redux";
import { GetAccountName } from "../../../../shared/redux/slices/transaction.slices";
import { AppDispatch } from "../../../../shared/redux/store";
import ReactLoading from "react-loading";
import { Alert } from '@mui/material';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const verifyAccount = async() => {
    if (selectedBank) {
      setLoading(true);
      setError("");
      try {
        const response = await dispatch(GetAccountName({ 
          accountNumber, 
          bankCode: selectedBank.code 
        })).unwrap();
        
        if (response.transaction.result.status) {
          navigate("/dashboard/wallet/verify-account", { 
            state: { 
              accountName: response.transaction.result.data.account_name,
              accountNumber: response.transaction.result.data.account_number,
              bankName: selectedBank.name
            }
          });
        } else {
          setError("Unable to verify account. Please check the details and try again.");
        }
      } catch (error:any) {
        console.log("Eee",error)
        setError(error || "An error occurred while verifying the account. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please select a bank");
    } 
  };

  return (
    <main className="font-sans">
      <header className="lg:mt-8">
        <DashboardHeader className="relative cursor-pointer items-center" onClick={handleBackClick}>
          <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />
          <div className="flex flex-grow items-center justify-center">
            <div className="tracking-wide">Select Bank</div>
          </div>
        </DashboardHeader>
      </header>

      <section className="mt-8 px-4">

        <div className="mt-6 relative w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Select a bank
          </label>
          <div 
            className="border border-gray-300 bg-white flex items-center justify-between p-3 rounded-lg cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={`${selectedBank ? 'text-gray-900' : 'text-gray-500'}`}>
              {selectedBank ? selectedBank.name : "Choose a bank"}
            </span>
            <IoIosArrowDown className="text-gray-400" />
          </div>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
              <div className="p-2 border-b sticky top-0 bg-white">
                <div className="flex items-center bg-gray-100 rounded-md p-2">
                  <IoIosSearch className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Search banks..."
                    className="bg-transparent outline-none flex-1 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="overflow-y-auto max-h-55">
                {filteredBanks?.length > 0 ? (
                  filteredBanks?.map((bank: Bank) => (
                    <div
                      key={bank.id}
                      className="p-3 hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => handleBankSelect(bank)}
                    >
                      {bank.name}
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-center text-gray-500">No results found</div>
                )}
              </div>
            </div>
          )}
        </div>

        {error && (
          <Alert severity="error" className="mt-4">{error}</Alert>
        )}

        <Primary
          className="mt-8 w-full bg-text2 py-3 text-white flex justify-center items-center"
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
            "Verify Account"
          )}
        </Primary>
      </section>
    </main>
  );
};

export default SelectAccount;