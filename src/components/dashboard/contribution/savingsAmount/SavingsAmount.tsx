import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoIosArrowDropleft } from "react-icons/io";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { Alert } from '@mui/material';

const MIN_AMOUNT = 2000;

const SavingsAmount = () => {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const { purpose, plan } = location.state || {};

  const formatAmount = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const formatted = Number(numbers).toLocaleString();
    return formatted === 'NaN' ? '' : formatted;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const rawValue = inputValue.replace(/,/g, '');
    
    if (rawValue === '' || /^\d+$/.test(rawValue)) {
      setAmount(formatAmount(rawValue));
      setError(''); 
    }
  };

  const handleNext = () => {
    const numericAmount = Number(amount.replace(/,/g, ''));
    
    if (numericAmount < MIN_AMOUNT) {
      setError(`Minimum contribution amount is ₦${MIN_AMOUNT.toLocaleString()}`);
    } else {
      setError("");
      navigate('/dashboard/contribution/date', { 
        state: { 
          purpose, 
          plan, 
          amount: numericAmount 
        } 
      });
    }
  };

  return (
    <main className="font-sans pb-[1.5em]">
      <DashboardHeader className="flex sm:mt-[0] lg:mt-[2em] items-center justify-center">
        Contribution Plan
      </DashboardHeader>
      <div className='w-[90%] m-auto'>
        <header className="flex flex-col justify-center lg:mt-[3em] mt-[1.5em] text-center">
          <h1 className='font-semibold text-center text-xl'>{plan} Contribution</h1>
          <p>Enter the amount suitable to you</p>
        </header>
        <div className="mt-[2em]">
          <label htmlFor="amount" className="mb-3 flex text-text2">
            Amount
          </label>
          <div className="relative">
            <input
              type="text"
              id="amount"
              required
              value={amount}
              onChange={handleAmountChange}
              placeholder="0"
              className="input mb-5 h-[4em] w-full rounded-full border-[1px] pl-8 pr-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Minimum contribution amount: ₦{MIN_AMOUNT.toLocaleString()}
          </p>
          {error && <Alert severity="error" className="mt-4 mb-4">{error}</Alert>}
          <div className='flex justify-between mt-[3em]'>
            <button onClick={() => navigate(-1)} className="flex items-center">
              <IoIosArrowDropleft size={25} />
            </button>
            <button
              className="bg-text2 rounded-md py-2 font-semibold px-8 text-white"
              onClick={handleNext}
              disabled={!amount || Number(amount.replace(/,/g, '')) < MIN_AMOUNT}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SavingsAmount;