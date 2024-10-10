import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from "../../../common/DashboardHeader";
import { Alert } from '@mui/material';
import { IoIosArrowDropleft } from "react-icons/io";
import { SavingOn } from '../../../../data/Data';

const Purpose = () => {
  const [savingsCategory, setSavingsCategory] = useState("");
  const navigate = useNavigate();
  const [error, setError]= useState("")


  const handleNext = () => {
    if (savingsCategory) {
      setError("")
      navigate('/dashboard/contribution/plan', { state: { purpose: savingsCategory } });
    } else {
      setError("Please select a savings category");
    }
  };

  return (
    <main className="font-sans pb-[1.5em]">
      <DashboardHeader className="flex sm:mt-[0] lg:mt-[2em] items-center justify-center">
        Contribution Plan
      </DashboardHeader>
      <div className='w-[90%] m-auto'>
        <header className="flex justify-center lg:mt-[3em] mt-[1.5em] text-center">
          <h1 className='font-semibold text-center text-xl'>What are you saving on?</h1>
        </header>
        {SavingOn.map((purpose, index) => (
          <div key={index} className='flex w-full bg-[#ECE6F2] py-[9px] rounded-lg justify-between items-center px-4 mt-8'>
            <h3 className='font-semibold'>{purpose.text}</h3>
            <button 
              className={`py-1 px-6 font-medium border rounded-md ${savingsCategory === purpose.text ? 'bg-text2 text-white' : 'bg-white border-text2'}`}
              onClick={() => setSavingsCategory(purpose.text)}
            >
              Select
            </button>
          </div>
        ))}
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
    </main>
  );
};

export default Purpose;