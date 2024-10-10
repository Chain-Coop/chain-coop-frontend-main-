import React, { useState } from 'react';
import logo from "../../../../Assets/svg/cooplogo.svg";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { AppDispatch } from '../../../../shared/redux/store';
import { useAppDispatch } from '../../../../shared/redux/reduxHooks';
import { PayStackMembershipSubscription } from '../../../../shared/redux/slices/transaction.slices';
import { toast } from "react-toastify";

const SelectPaymentPlan = ({ onNext, onPrev, membershipType }: any) => { 
    const [value, setValue] = useState('PaystackSubscription'); 
    const dispatch: AppDispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('PaystackSubscription'); 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = (event.target as HTMLInputElement).value;
        setValue(selectedValue);
        
        if (selectedValue === 'PaystackSubscription') {
            setPaymentMethod('PaystackSubscription');
        } else {
            setPaymentMethod('OneTimePayment'); 
        }
    };

    const submitData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
  
        if (loading) return; 

        setLoading(true);

        let body = {
            membershipType,
            paymentMethod, 
        };

        if (value === 'PaystackSubscription') {
            dispatch(PayStackMembershipSubscription(body))
                .unwrap()
                .then((response) => {
                    setLoading(false);
                    const paymentUrl = response?.transaction?.paymentLink?.authorization_url;
                    if (paymentUrl) {
                        window.location.href = paymentUrl; 
                    }
                })
                .catch((error: any) => {
                    setLoading(false);
                    const errorMessage = error?.message || "An error occurred, please try again";
                    toast.error(errorMessage);
                });
        } else if (value === 'Once Payment') {
            setLoading(false);
            onNext('one-time', membershipType); 
        }
    };

    const handleNextClick = () => {
        const formEvent = new Event('submit', { bubbles: true });
        document.querySelector('form')?.dispatchEvent(formEvent);
    };

    return (
        <main className='w-[95%] py-4 lg:w-[85%] font-sans m-auto'>
            <Link to="/">
                <nav className='py-[1em]'>
                    <img src={logo} alt="chain_coop_logo" />
                </nav>
            </Link>
            <section className='text-center'>
                <header>
                    <h1 className='text-xl lg:text-3xl font-bold mt-[1em] lg:mt-[2em] text-text2'>
                        {membershipType === 'Pioneer' ? 'Pioneer Membership Card' : 'Explorer Membership Card'}
                    </h1>
                </header>
            </section>
      
            <section className='mt-[2em]'>
                <h1 className='font-semibold text-2xl'>Select Payment Plan</h1>
            </section>
       
            <form onSubmit={submitData}> 
                <div className='flex mt-[2em] flex-col gap-[2em]'>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                        >
                            <div className='flex flex-col gap-[1em]'>
                                <FormControlLabel value="Once Payment" control={<Radio />} label="Once Payment" />
                                <hr />
                                <FormControlLabel value="PaystackSubscription" control={<Radio />} label="Installment Payment" />
                            </div>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className='flex gap-2 mt-[3em] justify-between items-center'>
                    <IoMdArrowBack
                        onClick={onPrev}  
                        className='text-text2 cursor-pointer' size={25}
                    />
                    <div className='flex gap-2 mb-5 justify-end items-center'>
                        <p className='text-text2 font-semibold text-xl'>Continue</p>
                        <IoMdArrowForward
                            onClick={handleNextClick}  
                            className='text-text2 cursor-pointer' size={25} 
                        />
                    </div>
                </div>
            </form>
        </main>
    );
};

export default SelectPaymentPlan;