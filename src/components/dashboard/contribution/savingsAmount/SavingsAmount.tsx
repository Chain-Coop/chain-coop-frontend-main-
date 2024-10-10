import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoIosArrowDropleft } from "react-icons/io";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { Alert } from '@mui/material';


const SavingsAmount = () => {
  const [amount, setAmount] = useState(0); 
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const { purpose, plan } = location.state || {};

  const handleNext = () => {
    if (amount > 0) { 
      setError("");
      navigate('/dashboard/contribution/date', { state: { purpose, plan, amount } });
    } else {
      setError("Please enter a valid amount");
    }
  };

  const handleAmountChange = (e:any) => {
    const inputAmount = parseFloat(e.target.value); 
    if (!isNaN(inputAmount)) {
      setAmount(inputAmount); 
    } else {
      setAmount(0); 
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
          <input
            type="tel"
            id="amount"
            required
            value={amount || ""}
            onChange={handleAmountChange}
            className="input mb-5 h-[4em] w-full rounded-full border-[1px] px-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
          />
        {error && <Alert severity="error" className="mt-4 mb-4">{error}</Alert>}
          <div className='flex justify-between mt-[3em]'>
            <button onClick={() => navigate(-1)} className="flex items-center">
            <IoIosArrowDropleft size={25} />
            </button>
            <button
              className="bg-text2 rounded-md py-2 font-semibold px-8 text-white"
              onClick={handleNext}
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
