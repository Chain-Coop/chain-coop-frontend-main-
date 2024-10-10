import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoIosArrowDropleft } from "react-icons/io";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { Alert } from '@mui/material';
import Modal from '../../../common/Modal';
import OTPInput from 'react-otp-input';
import { Primary } from '../../../common/Button';
import ReactLoading from "react-loading";
import { CreateContributionPlan } from '../../../../shared/redux/slices/transaction.slices';
import { AppDispatch } from '../../../../shared/redux/store';
import { useDispatch } from 'react-redux';
import success from "../../../../Assets/svg/auth/sucess.svg";


const StartDate: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { purpose, plan, amount } = location.state || {};

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate')?.setAttribute('min', today);
    document.getElementById('endDate')?.setAttribute('min', today);
  }, []);

  const handlePinChange = (pinValue: string) => {
    const numericValue = pinValue.replace(/[^0-9]/g, '');
    setPin(numericValue);
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    if (!startDate || !endDate || pin.length !== 4) {
      setError("Please fill in all fields correctly.");
      setLoading(false);
      return;
    }
  
    const body = {
      savingsCategory: purpose,
      contributionPlan: plan,
      amount,
      startDate,
      endDate,
      pin,
    };
  
    try {
      const response = await dispatch(CreateContributionPlan(body)).unwrap();
      console.log("Response:", response.contribution);  
      if (response?.statusCode === 201) { 
        setIsModalOpen(false);
        setIsSuccessModalOpen(true);
        setTimeout(() => {
          setIsSuccessModalOpen(false);
          navigate("/dashboard/contribution");
        }, 3000);
      } else {
        setError("Contribution plan creation failed. Please try again.");
      }
    } catch (error: any) {
      setError(error.error || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates before proceeding.");
      return;
    }
    setIsModalOpen(!isModalOpen);
    setPin("");
    setError("");
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
            onChange={(e) => setStartDate(e.target.value)}
            className="input mb-5 h-[4em] w-full rounded-lg border-[1px] px-4 text-sm shadow-md"
          /> 
        </div>
        <div className="mt-[2em]">
          <label htmlFor="endDate" className="mb-3 flex font-semibold">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            required
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input mb-5 h-[4em] w-full rounded-lg border-[1px] px-4 text-sm shadow-md"
          /> 
        </div>
        {error && <Alert severity="error" className="mt-4 mb-4">{error}</Alert>}
        <div className='mt-[3em]'>
          <button
            className="bg-text2 rounded-md flex text-center justify-center m-auto py-[1em] w-[80%] font-semibold px-8 text-white"
            onClick={toggleModal}
          >
            Submit
          </button>
        </div>
        <button onClick={() => navigate(-1)} className="flex mt-[3em] items-center">
        <IoIosArrowDropleft size={25} />
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        className="bg-white text-center flex flex-col justify-center items-center py-[3em]" 
      >
        <header>
          <h1 className="font-semibold text-2xl">
            My Chain Co-op Pin
          </h1>
          <p className="text-howtext mt-1">Enter your transaction pin.</p>
        </header>
        <div className="flex justify-center mt-5"> 
          <OTPInput
            value={pin}
            onChange={handlePinChange}
            numInputs={4}
            renderSeparator={<span className="w-2"></span>}
            renderInput={(props) => (
              <input 
                {...props} 
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                onKeyDown={(e) => {
                  if (
                    !(
                      (e.key >= '0' && e.key <= '9') ||
                      e.key === 'Backspace' ||
                      e.key === 'ArrowLeft' ||
                      e.key === 'ArrowRight' ||
                      e.key === 'Tab'
                    )
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            )}
            skipDefaultStyles={true}
            containerStyle="flex gap-3 my-5 justify-center"
            inputStyle={
              "block lg:h-[55px] lg:w-[55px] sm:h-[50px] sm:w-[35px] text-center border-gray-200 rounded-md text-sm placeholder:text-gray-300 focus:border-text2 focus:ring-text2 bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            }
          />
        </div>
        {error && <Alert severity="error" className="mt-4 mb-4">{error}</Alert>}

        <Primary
          onClick={handleSubmit}
          disabled={loading}
          className="mt-[2em] px-2 w-full flex justify-center font-semibold rounded-full bg-text2 py-2 text-white"
        >
          {loading ? (
            <ReactLoading color="#FFFFFF" height={25} width={25} type="spin" />
          ) : (
            "Confirm Contribution"
          )}
        </Primary>
      </Modal>
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
              Your contribution has been processed. Redirecting to contribution page...
            </p>
          </header>
        </div>
      </Modal>
    </main>
  );
};

export default StartDate;