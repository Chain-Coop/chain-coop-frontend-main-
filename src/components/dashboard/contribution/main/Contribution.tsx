import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import ToggleButton from "../../../../shared/utils/ToggleButton";
import { DashboardHeader } from "../../../common/DashboardHeader";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { MdArrowOutward } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { format } from 'date-fns';
import { useContributionBalance } from "../../../../shared/Hooks/useBalance";
import { useUserContributionHisory } from "../../../../shared/Hooks/useUserProfile";

const Contribution = () => {
  const { formattedBalance } = useContributionBalance();
  const [isContributionVisible, setIsContributionVisible] = useState(() => {
    const storedVisibility = sessionStorage.getItem("contributionBalanceVisible");
    return storedVisibility !== null ? storedVisibility === "true" : true;
  });
  
  const { getContributions } = useUserContributionHisory();
  const navigate = useNavigate();

  const ContributionTracker = () => {
    if (!getContributions || getContributions.length === 0) return null;

    const contribution = getContributions[0];
    const { startDate, nextContributionDate, amount, contributionPlan } = contribution;

    const steps = [
      {
        date: new Date(startDate),
        amount,
        status: 'Completed'
      },
      {
        date: new Date(nextContributionDate),
        amount,
        status: 'In Progress'
      }
    ];

    const getStatusStyle = (status:any) => {
      switch (status) {
        case 'Completed':
          return 'bg-green-500 text-white';
        case 'In Progress':
          return 'bg-gray-200 text-gray-600';
        default:
          return '';
      }
    };

    return (
      <section className="mt-[1em] font-sans">
        <div className="flex justify-between mb-4 whitespace-nowrap">
          <p className="text-lg font-semibold">Daily Contribution</p>
          <p className="text-lg font-semibold">Status</p>
        </div>
        <div>
          <p className="mt-[1em] text-sm">
            Effortlessly manage and monitor your financial commitments
          </p>
        </div>
        <Box sx={{ maxWidth: "100%", marginTop: "1em" }}>
          <Stepper orientation="vertical">
            {steps.map((step, index) => (
              <Step key={index} active={true}>
                <StepLabel 
                  sx={{
                    '& .MuiStepLabel-iconContainer': {
                      paddingRight: '1rem',
                      '& .MuiStepIcon-root': {
                        color: index === 1 ? '#9CA3AF' : '#430280',
                      }
                    }
                  }}
                >
                  <div className="flex justify-between items-start w-full sm:flex-row flex-col gap-2 sm:gap-0">
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-lg truncate ${index === 1 ? 'text-gray-400' : ''}`}>
                        Cash Transfer from Co-op wallet
                      </p>
                      <p className={`font-semibold whitespace-nowrap ${index === 1 ? 'text-gray-400' : ''}`}>
                        {format(step.date, "EEEE: dd/MM/yyyy")}
                      </p>
                      <p className={`font-semibold whitespace-nowrap ${index === 1 ? 'text-gray-400' : ''}`}>
                        Amount: <span className={index === 1 ? 'text-gray-400' : 'text-act'}>
                          NGN {step.amount.toLocaleString()}
                        </span>
                      </p>
                    </div>
                    <div className="sm:ml-2 self-start sm:self-center">
                      <div className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${getStatusStyle(step.status)}`}>
                        {step.status}
                      </div>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </section>
    );
  };

  const fundContribution = () => {
    navigate("/dashboard/contribution/purpose");
  };

  return (
    <main className="font-sans pb-[1.5em]">
      <header className="sm:mt-[0] lg:mt-[2em]">
        <DashboardHeader className="flex items-center justify-center">
         Contribution Plan
        </DashboardHeader>
      </header>
      <section className="mt-[2em] sm:px-[1.5em] lg:mx-auto lg:w-[33em] lg:px-[0]">
        <article className="text-center text-text4">
          <div className="mt-[2em] rounded-3xl py-[2em] shadow-md">
            <div className="flex justify-center gap-4 font-sans">
              <p className="font-medium">Contribution Balance</p>
              <div>
                <ToggleButton
                  isVisible={isContributionVisible}
                  onToggle={(newVisibility) => {
                    setIsContributionVisible(newVisibility);
                    sessionStorage.setItem(
                      "contributionBalanceVisible",
                      newVisibility.toString(),
                    );
                  }}
                />
              </div>
            </div>
            <div className="mx-auto mt-[1.5em] w-[15em] rounded-md">
              {isContributionVisible ? (
                <p className="font-bold sm:text-xl lg:text-xl">
                  {formattedBalance}
                </p>
              ) : (
                <p className="text-2xl font-bold">*********</p>
              )}
              <hr className="mt-[1em] h-[1px] rounded-md bg-howtext" />
            </div>
            <div className="mt-[1em] flex justify-center gap-2">
              <span>Total Gains</span>
              <MdArrowOutward className="fill-act" />
              <span className="font-semibold text-act">0%</span>
            </div>
          </div>
          
          <section className="mt-[2em]">
            <div className="flex justify-between">
              <div>
                <button onClick={fundContribution} className="rounded-full bg-inherit text-lg font-semibold whitespace-nowrap shadow-md sm:px-[1em] sm:py-[5px] lg:px-[3em] lg:py-[10px]">
                  Start to save
                </button>
              </div>
              <div>
                <button className="rounded-full bg-inherit text-lg font-semibold shadow-md whitespace-nowrap sm:px-[1em] sm:py-[5px] lg:px-[3em] lg:py-[10px]">
                  Withdraw
                </button>
              </div>
            </div>
            <hr className="mt-[2em] w-full" />
            <div className="auto-deduction mt-[1em] flex justify-between">
              <p className="sm:font-semibold lg:text-sm lg:font-medium">
                Auto-Deduction from Wallet
              </p>
            </div>
          </section>
        </article>
        
        <ContributionTracker />
      </section>
    </main>
  );
};

export default Contribution;