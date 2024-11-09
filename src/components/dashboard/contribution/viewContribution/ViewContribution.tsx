// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router";
// import ToggleButton from "../../../../shared/utils/ToggleButton";
// import { DashboardHeader } from "../../../common/DashboardHeader";
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import { format, parseISO, isPast } from 'date-fns';
// import { AppDispatch } from "../../../../shared/redux/store";
// import { useAppDispatch } from "../../../../shared/redux/reduxHooks";
// import { useSelector } from "react-redux";
// import { GetContributionDetailsById } from "../../../../shared/redux/slices/transaction.slices";
// import { formatBalance } from "../../../../shared/utils/format";
// import { IoIosArrowBack } from "react-icons/io";
// import { Link } from "react-router-dom";

// const ViewContribution = () => {
//   const [isContributionVisible, setIsContributionVisible] = useState(() => {
//     const storedVisibility = sessionStorage.getItem("contributionBalanceVisible");
//     return storedVisibility !== null ? storedVisibility === "true" : true;
//   });
  
//   const location = useLocation();
//   const contributionId = location?.state?.contributionId;
//   console.log("conn", contributionId);
//   const dispatch: AppDispatch = useAppDispatch();
  
//   useEffect(() => {
//     dispatch(GetContributionDetailsById({ contributionId }));
//  }, [dispatch, contributionId]);


//   const { contributionDetails } = useSelector((state: any) => state.transaction);
//   console.log("details", contributionDetails);
//   const navigate = useNavigate();

//   const balanceInNaira = contributionDetails?.balance || 0;
//   const formattedBalance = formatBalance(balanceInNaira);

//   const handleBackClick = () => {
//     navigate(-1);
//   };

//   const formatContributionDate = (dateString: string) => {
//     if (!dateString) return "Date not available";
//     try {
//       return format(parseISO(dateString), "MMMM dd, yyyy");
//     } catch {
//       return "Invalid date";
//     }
//   };


//   const ContributionTracker = () => {
//     if (!contributionDetails) return null;

//     const {
//       startDate,
//       lastContributionDate,
//       nextContributionDate,
//       amount = 0,
//       status,
//     } = contributionDetails;

//     const steps = [
//       {
//         label: 'Start Date',
//         date: startDate,
//         amount,
//         status: isPast(parseISO(startDate)) ? 'Completed' : 'Pending'
//       },
//       {
//         date: lastContributionDate,
//         amount,
//         description: 'Last Contribution Made',
//         status: lastContributionDate ? 'Completed' : 'Pending'
//       },
//       {
//         label: 'Next Contribution',
//         date: nextContributionDate,
//         amount,
//         status: 'Upcoming'
//       }
//     ].filter(step => step.date); 

//     const getStatusStyle = (status: string) => {
//       switch (status) {
//         case 'Completed':
//           return 'bg-green-500 text-white';
//         case 'Upcoming':
//           return 'bg-gray-200 text-gray-600';
//         case 'Pending':
//           return 'bg-yellow-500 text-white';
//         default:
//           return 'bg-gray-200 text-gray-600';
//       }
//     };

//     const formatSafeDate = (dateString: string) => {
//       try {
//         return format(parseISO(dateString), "EEEE: dd/MM/yyyy");
//       } catch {
//         return "Date unavailable";
//       }
//     };

//     const isStepActive = (status: string) => {
//       return status !== 'Upcoming';
//     };

//     return (
//       <section className="mt-[1em] font-sans">
//         <div className="flex justify-between mb-4 whitespace-nowrap">
//           <p className="text-lg font-bold">Transaction History</p>
//         </div>
//         <div>
//           <p className="mt-[1em] text-sm">
//             Effortlessly manage and monitor your financial commitments
//           </p>
//         </div>
//         <div className="flex mt-[1em] font-semibold justify-between">
//           <p>Monthly Contribution</p>
//           <p>Status</p>
//         </div>
//         <Box sx={{ maxWidth: "100%", marginTop: "1.5em" }}>
//           <Stepper orientation="vertical">
//             {steps.map((step, index) => (
//               <Step key={index} active={isStepActive(step.status)}>
//                 <StepLabel
//                   sx={{
//                     '& .MuiStepLabel-iconContainer': {
//                       paddingRight: '1rem',
//                       '& .MuiStepIcon-root': {
//                         color: step.status === 'Upcoming' ? '#9CA3AF' : '#430280',
//                       }
//                     }
//                   }}
//                 >
//                   <div className="flex justify-between items-start w-full sm:flex-row flex-col gap-2 sm:gap-0">
//                     <div className="flex-1 min-w-0">
//                       <p className={`font-medium text-lg ${step.status === 'Upcoming' ? 'text-gray-400' : ''}`}>
//                       Cash Transfer from savings bank account
//                       </p>
//                      <div className="lg:flex gap-[1em]">
//                      <p className={`font-semibold text-gray-700 whitespace-nowrap ${step.status === 'Upcoming' ? 'text-gray-400' : ''}`}>
//                         {formatSafeDate(step.date)}
//                       </p>
//                       <p className={`font-semibold whitespace-nowrap ${step.status === 'Upcoming' ? 'text-gray-400' : ''}`}>
//                         Amount: <span className={step.status === 'Upcoming' ? 'text-gray-400' : 'text-act'}>
//                           NGN {step?.amount?.toLocaleString()}
//                         </span>
//                       </p>
//                      </div>
//                     </div>
//                     <div className="sm:ml-2 self-start sm:self-center">
//                       <div className={`px-5 py-1 rounded-full text-sm whitespace-nowrap ${getStatusStyle(step.status)}`}>
//                         {step.status}
//                       </div>
//                     </div>
//                   </div>
//                 </StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//         </Box>
//       </section>
//     );
//   };

//   return (
//     <main className="font-sans pb-[1.5em]">
//       <header className="sm:mt-[0] lg:mt-[2em]">
//         <DashboardHeader className="flex items-center justify-center">
//           {contributionDetails?.contributionPlan} Contribution Plan
//         </DashboardHeader>
//       </header>
//       <header className="flex items-center justify-between gap-8 w-full max-w-md mx-auto p-4">
//         <div className="left-0 ml-4">
//           <IoIosArrowBack onClick={handleBackClick} className="cursor-pointer" size={30} />
//         </div>
//         <div className="flex-1 text-center">
//           <h1 className="font-bold text-xl">{contributionDetails?.savingsCategory}</h1>
//         </div>
//       </header>
//       <section className="sm:px-[1.5em] lg:mx-auto lg:w-[33em] lg:px-[0]">
//         <article className="text-center text-text4">
//           <div className="rounded-3xl py-[2em] shadow-md">
//             <div className="flex justify-center gap-4 font-sans">
//               <p className="font-medium">Contribution Balance</p>
//               <div>
//                 <ToggleButton
//                   isVisible={isContributionVisible}
//                   onToggle={(newVisibility) => {
//                     setIsContributionVisible(newVisibility);
//                     sessionStorage.setItem(
//                       "contributionBalanceVisible",
//                       newVisibility.toString()
//                     );
//                   }}
//                 />
//               </div>
//             </div>
//             <div className="mx-auto mt-[1.5em] w-[15em] rounded-md">
//               {isContributionVisible ? (
//                 <p className="font-bold sm:text-xl lg:text-xl">
//                   {formattedBalance}
//                 </p>
//               ) : (
//                 <p className="text-2xl font-bold">*********</p>
//               )}
//               <hr className="mt-[1em] h-[1px] rounded-md bg-howtext" />
//             </div>
//           </div>
//           <section>
//             <div className="bg-text2 mt-[1.5em] rounded-2xl py-[1em]">
//               <div className="w-[60%] flex flex-col py-2 items-center border-gray-500 border-2 rounded-full m-auto bg-white">
//                 <p className="font-semibold">{formatContributionDate(contributionDetails?.withdrawalDate)}</p>
//                 <p className="font-medium">Withdrawal Day</p>
//               </div>
//             </div>
//           </section>
//           <section className="mt-[2em] mb-[2em]">
//             <div className="flex justify-center">
//               <Link
//                 to="/dashboard/contribution/withdraw_contribution"
//                 state={{ contributionId: contributionId }}
//               >
//                 <button className="rounded-full bg-inherit text-lg font-semibold shadow-md whitespace-nowrap sm:px-[1em] sm:py-[5px] lg:px-[3em] lg:py-[10px]">
//                   Withdraw
//                 </button>
//               </Link>
//             </div>
//           </section>
//           <span className="font-semibold mt-[1em] text-gray-500">
//             Next Contribution: {formatContributionDate(contributionDetails?.nextContributionDate)}
//           </span>
//           <hr className="mt-[2em] w-full" />
//         </article>
//         <ContributionTracker />
//       </section>
//     </main>
//   );
// };

// export default ViewContribution;


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import ToggleButton from "../../../../shared/utils/ToggleButton";
import { DashboardHeader } from "../../../common/DashboardHeader";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { format, parseISO, isPast, isFuture, isToday } from 'date-fns';
import { AppDispatch } from "../../../../shared/redux/store";
import { useAppDispatch } from "../../../../shared/redux/reduxHooks";
import { useSelector } from "react-redux";
import { GetContributionDetailsById } from "../../../../shared/redux/slices/transaction.slices";
import { formatBalance } from "../../../../shared/utils/format";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const ViewContribution = () => {
  const [isContributionVisible, setIsContributionVisible] = useState(() => {
    const storedVisibility = sessionStorage.getItem("contributionBalanceVisible");
    return storedVisibility !== null ? storedVisibility === "true" : true;
  });
  
  const location = useLocation();
  const contributionId = location?.state?.contributionId;
  const dispatch: AppDispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(GetContributionDetailsById({ contributionId }));
  }, [dispatch, contributionId]);

  const { contributionDetails } = useSelector((state: any) => state.transaction);
  const navigate = useNavigate();

  const balanceInNaira = contributionDetails?.balance || 0;
  const formattedBalance = formatBalance(balanceInNaira);

  const handleBackClick = () => {
    navigate(-1);
  };

  const formatContributionDate = (dateString: string) => {
    if (!dateString) return "Date not available";
    try {
      return format(parseISO(dateString), "MMMM dd, yyyy");
    } catch {
      return "Invalid date";
    }
  };

  const ContributionTracker = () => {
    if (!contributionDetails) return null;

    const {
      startDate,
      nextContributionDate,
      withdrawalDate,
      amount = 0,
      history = [],
    } = contributionDetails;

    const generateSteps = () => {
      const steps = [];

      if (history.length > 0) {
        const firstPayment = history[0];
        steps.push({
          label: 'Initial Payment',
          date: firstPayment.Date,
          amount: firstPayment.amount,
          status: 'Completed',
          type: 'Credit'
        });
      }

      if (startDate && (!history.length || 
          format(parseISO(startDate), 'yyyy-MM-dd') !== 
          format(parseISO(history[0].Date), 'yyyy-MM-dd'))) {
        steps.push({
          label: 'Start Date',
          date: startDate,
          amount,
          status: isPast(parseISO(startDate)) || isToday(parseISO(startDate)) ? 'Completed' : 'Pending',
          type: 'Plan Start'
        });
      }

      history.slice(1).forEach((payment :any)=> {
        steps.push({
          label: 'Contribution',
          date: payment.Date,
          amount: payment.amount,
          status: payment.status,
          type: payment.type
        });
      });

      if (nextContributionDate && isFuture(parseISO(nextContributionDate))) {
        steps.push({
          label: 'Next Contribution',
          date: nextContributionDate,
          amount,
          status: 'Upcoming',
          type: 'Future Payment'
        });
      }

      if (withdrawalDate) {
        steps.push({
          label: 'Withdrawal Date',
          date: withdrawalDate,
          amount: balanceInNaira,
          status: isPast(parseISO(withdrawalDate)) ? 'Completed' : 'Upcoming',
          type: 'Withdrawal'
        });
      }

      return steps;
    };

    const steps = generateSteps();

    const getStatusStyle = (status: string) => {
      switch (status) {
        case 'Completed':
          return 'bg-green-500 text-white';
        case 'Upcoming':
          return 'bg-gray-200 text-gray-600';
        case 'Pending':
          return 'bg-yellow-500 text-white';
        default:
          return 'bg-gray-200 text-gray-600';
      }
    };

    const formatSafeDate = (dateString: string) => {
      try {
        return format(parseISO(dateString), "EEEE: dd/MM/yyyy");
      } catch {
        return "Date unavailable";
      }
    };

    const getStepIcon = (type: string) => {
      switch (type) {
        case 'Credit':
          return '💳';
        case 'Plan Start':
          return '🎯';
        case 'Future Payment':
          return '📅';
        case 'Withdrawal':
          return '💰';
        default:
          return '💵';
      }
    };

    const isStepActive = (status: string) => {
      return status !== 'Upcoming';
    };

    return (
      <section className="mt-[1em] font-sans">
        <div className="flex justify-between mb-4 whitespace-nowrap">
          <p className="text-lg font-bold">Transaction History</p>
        </div>
        <div>
          <p className="mt-[1em] text-sm">
            Effortlessly manage and monitor your financial commitments
          </p>
        </div>
        <div className="flex mt-[1em] font-semibold justify-between">
          <p>Monthly Contribution</p>
          <p>Status</p>
        </div>
        <Box sx={{ maxWidth: "100%", marginTop: "1.5em" }}>
          <Stepper orientation="vertical">
            {steps?.map((step, index) => (
              <Step key={index} active={isStepActive(step.status)}>
                <StepLabel
                  sx={{
                    '& .MuiStepLabel-iconContainer': {
                      paddingRight: '1rem',
                      '& .MuiStepIcon-root': {
                        color: step?.status === 'Upcoming' ? '#9CA3AF' : '#430280',
                      }
                    }
                  }}
                >
                  <div className="flex justify-between items-start w-full sm:flex-row flex-col gap-2 sm:gap-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span>{getStepIcon(step?.type)}</span>
                        <p className={`font-medium text-lg ${step?.status === 'Upcoming' ? 'text-gray-400' : ''}`}>
                          {step?.label} {step?.type === 'Credit' ? '- Initial Payment' : ''}
                        </p>
                      </div>
                      <div className="lg:flex gap-[1em]">
                        <p className={`font-semibold text-gray-700 whitespace-nowrap ${step?.status === 'Upcoming' ? 'text-gray-400' : ''}`}>
                          {formatSafeDate(step?.date)}
                        </p>
                        <p className={`font-semibold whitespace-nowrap ${step?.status === 'Upcoming' ? 'text-gray-400' : ''}`}>
                          Amount: <span className={step?.status === 'Upcoming' ? 'text-gray-400' : 'text-act'}>
                            NGN {step?.amount?.toLocaleString()}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="sm:ml-2 self-start sm:self-center">
                      <div className={`px-5 py-1 rounded-full text-sm whitespace-nowrap ${getStatusStyle(step.status)}`}>
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

  return (
    <main className="font-sans pb-[1.5em]">
      <header className="sm:mt-[0] lg:mt-[2em]">
        <DashboardHeader className="flex items-center justify-center">
          {contributionDetails?.contributionPlan} Contribution Plan
        </DashboardHeader>
      </header>
      <header className="flex items-center justify-between gap-8 w-full max-w-md mx-auto p-4">
        <div className="left-0 ml-4">
          <IoIosArrowBack onClick={handleBackClick} className="cursor-pointer" size={30} />
        </div>
        <div className="flex-1 text-center">
          <h1 className="font-bold text-xl">{contributionDetails?.savingsCategory}</h1>
        </div>
      </header>
      <section className="sm:px-[1.5em] lg:mx-auto lg:w-[33em] lg:px-[0]">
        <article className="text-center text-text4">
          <div className="rounded-3xl py-[2em] shadow-md">
            <div className="flex justify-center gap-4 font-sans">
              <p className="font-medium">Contribution Balance</p>
              <div>
                <ToggleButton
                  isVisible={isContributionVisible}
                  onToggle={(newVisibility) => {
                    setIsContributionVisible(newVisibility);
                    sessionStorage.setItem(
                      "contributionBalanceVisible",
                      newVisibility.toString()
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
          </div>
          <section>
            <div className="bg-text2 mt-[1.5em] rounded-2xl py-[1em]">
              <div className="w-[60%] flex flex-col py-2 items-center border-gray-500 border-2 rounded-full m-auto bg-white">
                <p className="font-semibold">{formatContributionDate(contributionDetails?.withdrawalDate)}</p>
                <p className="font-medium">Withdrawal Day</p>
              </div>
            </div>
          </section>
          <section className="mt-[2em] mb-[2em]">
            <div className="flex justify-center">
              <Link
                to="/dashboard/contribution/withdraw_contribution"
                state={{ contributionId: contributionId }}
              >
                <button className="rounded-full bg-inherit text-lg font-semibold shadow-md whitespace-nowrap sm:px-[1em] sm:py-[5px] lg:px-[3em] lg:py-[10px]">
                  Withdraw
                </button>
              </Link>
            </div>
          </section>
          <span className="font-semibold mt-[1em] text-gray-500">
            Next Contribution: {formatContributionDate(contributionDetails?.nextContributionDate)}
          </span>
          <hr className="mt-[2em] w-full" />
        </article>
        <ContributionTracker />
      </section>
    </main>
  );
};

export default ViewContribution;