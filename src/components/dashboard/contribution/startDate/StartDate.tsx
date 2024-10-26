import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoIosArrowDropleft } from "react-icons/io";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Modal from '../../../common/Modal';
import { Primary } from '../../../common/Button';
import ReactLoading from "react-loading";
import { CreateContributionPlan } from '../../../../shared/redux/slices/transaction.slices';
import { AppDispatch } from '../../../../shared/redux/store';
import { useDispatch } from 'react-redux';
import success from "../../../../Assets/svg/auth/sucess.svg";

const StartDate: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [availableEndDates, setAvailableEndDates] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { purpose, plan, amount } = location.state || {};

  const formatDate = (date: Date): string => {
    return date.toISOString()?.split('T')[0];
  };

  const calculateAvailableEndDates = (startDateStr: string) => {
    if (!startDateStr) return [];
    
    const dates: string[] = [];
    const startDate = new Date(startDateStr);
    
    for (let i = 1; i <= 12; i++) {
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + i);
      
      if (startDate?.getDate() !== endDate?.getDate()) {
        endDate?.setDate(0); 
      }
      
      dates.push(formatDate(endDate));
    }
    
    return dates;
  };

  useEffect(() => {
    const today = formatDate(new Date());
    document.getElementById('startDate')?.setAttribute('min', today);
  }, []);

  useEffect(() => {
    if (startDate) {
      const dates = calculateAvailableEndDates(startDate);
      setAvailableEndDates(dates);
      setEndDate("");
    }
  }, [startDate]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
  };

  const handleEndDateChange = (event: any) => {
    setEndDate(event.target.value as string);
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      setLoading(false);
      return;
    }

    if (!availableEndDates.includes(endDate)) {
      setError("Please select a valid monthly interval from the start date");
      setLoading(false);
      return;
    }
  
    const body = {
      savingsCategory: purpose,
      contributionPlan: plan,
      amount,
      startDate,
      endDate
    };
  
    try {
      const response = await dispatch(CreateContributionPlan(body)).unwrap();
      if (response?.paymentUrl) {
        setIsSuccessModalOpen(true);
        setTimeout(() => {
          window.location.href = response.paymentUrl;
        }, 2000);
      } else {
        setError("Payment initialization failed. Please try again.");
      }
    } catch (error: any) {
      setError(error?.error || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="font-sans pb-[1.5em]">
      <DashboardHeader className="flex sm:mt-[0] lg:mt-[2em] items-center justify-center">
        Contribution Plan
      </DashboardHeader>
      <div className='w-[90%] m-auto'>
        <header className="flex flex-col justify-center lg:mt-[3em] mt-[1.5em] text-center">
          <h1 className='font-bold text-center text-xl'>{plan} Contribution</h1>
          <p className='font-medium text-center mt-[1em]'>You are about to save NGN{amount} {plan} into your contribution amount</p>
        </header> 
        <div className="mt-[2em]">
          <label htmlFor="startDate" className="mb-3 flex font-semibold">
            Choose Start Date
          </label>
          <input
            type="date"
            id="startDate"
            required
            value={startDate}
            onChange={handleStartDateChange}
            className="input mb-5 h-[4em] w-full rounded-lg border-[1px] px-4 text-sm shadow-md"
          /> 
        </div>
        <div className="mt-[2em]">
          <FormControl fullWidth>
            <InputLabel id="end-date-label" style={{color:'#440080'}}>Choose End Date</InputLabel>
            <Select
              labelId="end-date-label"
              id="end-date-select"
              value={endDate}
              label="Choose End Date"
              onChange={handleEndDateChange}
              disabled={!startDate}
              className="mb-5"
              sx={{
                height: '3.4em',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderRadius: '0.5rem',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#440080',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#440080',
                },
              }}
            >
              <MenuItem value="">
                <em>Select end date</em>
              </MenuItem>
              {availableEndDates.map((date, index) => (
                <MenuItem key={date} value={date}>
                  {new Date(date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} ({index + 1} {index === 0 ? 'month' : 'months'})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {error && <Alert severity="error" className="mt-4 mb-4">{error}</Alert>}
        <div className='mt-[3em]'>
          <Primary
            onClick={handleSubmit}
            disabled={loading}
            className="bg-text2 rounded-md flex text-center justify-center m-auto py-[1em] w-[80%] font-semibold px-8 text-white"
          >
            {loading ? (
              <ReactLoading color="#FFFFFF" height={25} width={25} type="spin" />
            ) : (
              "Submit"
            )}
          </Primary>
        </div>
        <button onClick={() => navigate(-1)} className="flex mt-[3em] items-center">
          <IoIosArrowDropleft size={25} />
        </button>
      </div>
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        className="bg-white text-center flex flex-col justify-center items-center py-[3em]"
      >
        <div className="mt-[2.5em] flex flex-col justify-center">
          <img
            src={success}
            alt="Success Icon"
            className="mx-auto sm:w-[6em] lg:w-[8em]"
          />
          <header className="mt-4">
            <h1 className="text-center text-xl font-semibold">
              Contribution Successful
            </h1>
            <p className="text-howtext mt-2">
              Redirecting to payment page...
            </p>
          </header>
        </div>
      </Modal>
    </main>
  );
};

export default StartDate;