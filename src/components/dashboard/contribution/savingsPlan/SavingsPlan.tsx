import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoIosArrowDropleft } from "react-icons/io";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { Alert } from '@mui/material';
import { Plan } from '../../../../data/Data';


const SavingsPlan = () => {
  const [contributionPlan, setContributionPlan] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { purpose } = location.state || {};
  const [error, setError]= useState("")

  const handleNext = () => {
    if (contributionPlan) {
      setError("");
      navigate('/dashboard/contribution/amount', { state: { purpose, plan: contributionPlan } });
    } else {
      setError("Please select a contribution plan");
    }
  };

  return (
    <main className="font-sans pb-[1.5em]">
      <DashboardHeader className="flex sm:mt-[0] lg:mt-[2em] items-center justify-center">
        Contribution Plan
      </DashboardHeader>
      <div className='w-[90%] m-auto'>
        <header className="flex justify-center lg:mt-[3em] mt-[1.5em] text-center">
          <h1 className='font-semibold text-center text-xl'>How would you like to save?</h1>
        </header>
        {Plan.map((plan:any, index:number) => (
          <div key={index} className='flex w-full bg-[#ECE6F2] py-[9px] rounded-lg justify-between items-center px-4 mt-8'>
            <h3 className='font-semibold'>{plan.text}</h3>
            <button 
              className={`py-1 px-6 font-medium border rounded-md ${contributionPlan === plan.text ? 'bg-text2 text-white' : 'bg-white border-text2'}`}
              onClick={() => setContributionPlan(plan.text)}
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

export default SavingsPlan;