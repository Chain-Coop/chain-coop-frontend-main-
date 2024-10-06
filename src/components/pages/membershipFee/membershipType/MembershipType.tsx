import React, { useState } from 'react';
import logo from "../../../../Assets/svg/cooplogo.svg";
import useUserProfile from '../../../../shared/Hooks/useUserProfile';
import member from "../../../../Assets/jpg/membership/customer.jpg";
import investor from "../../../../Assets/jpg/membership/investor.jpg";
import dot from "../../../../Assets/svg/membership/radio-button.svg";
import { IoMdArrowForward } from "react-icons/io";
import { CustomerFeeExplorerCardData, MembershipFeePioneerCardData } from '../../../../data/Data';
import { Link } from 'react-router-dom';

const MembershipType = ({ onNext }: any) => {
  const { profileDetails } = useUserProfile();
  const [membershipType, setMembershipType] = useState(null);

  const handleCardSelect = (card: any) => {
    setMembershipType(card); 
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
            Welcome to Chain Coop {profileDetails?.username}
          </h1>
          <p className='text-lg lg:text-2xl mt-[1em] font-semibold'>
            Select a membership card to join our co-operatives
          </p>
        </header>
      </section>
      <section className='py-[2em]'>
        <div className='flex flex-col lg:flex-row lg:mt-[3em] justify-center items-stretch gap-[2em]'>
          <div
            className={`flex flex-col w-full lg:w-[22em] bg-[#F5F0F0] gap-[5px] min-h-[400px] lg:min-h-[500px] cursor-pointer 
              ${membershipType === 'Pioneer' ? 'bg-[#E3D9EC]' : ''}`}
             onClick={() => handleCardSelect('Pioneer')}
          >
            <div>
              <img src={investor} alt="investor_card" className='w-full h-auto' />
            </div>
            <article className='py-3 px-2 lg:px-4 rounded-lg shadow-md h-full'>
              <header>
                <h2 className='text-text2 font-bold text-lg lg:text-xl'>Investor Membership Card</h2>
              </header>
              <p className='font-bold text-md lg:text-lg'>Member's Fee 100k</p>
              <p className='text-text2 font-bold text-md lg:text-lg'>Benefits</p>
              <div className="mt-2">
                <ul className="space-y-2 lg:space-y-3 text-text1">
                  {MembershipFeePioneerCardData.map((data, index) => (
                    <li className="flex items-center gap-1" key={index}>
                      <img src={dot} alt="points" />
                      <span className='text-sm lg:text-base'>{data.paragraph}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>

          <div
            className={`flex flex-col w-full lg:w-[22em] bg-[#F5F0F0] gap-[5px] min-h-[400px] lg:min-h-[500px] cursor-pointer 
              ${membershipType === 'Explorer' ? 'bg-[#E3D9EC]' : ''}`}
              onClick={() => handleCardSelect('Explorer')}
          >
            <div>
              <img src={member} alt="customer_card" className='w-full h-auto' />
            </div>
            <article className='py-3 px-2 lg:px-4 rounded-lg shadow-md h-full'>
              <header>
                <h2 className='text-text2 font-bold text-lg lg:text-xl'>Customer Membership Card</h2>
              </header>
              <p className='font-bold text-md lg:text-lg'>Member's Fee 100k</p>
              <p className='text-text2 font-bold text-md lg:text-lg'>Benefits</p>
              <div className="mt-2">
                <ul className="space-y-2 lg:space-y-3 text-text1">
                  {CustomerFeeExplorerCardData.map((data, index) => (
                    <li className="flex items-center gap-1" key={index}>
                      <img src={dot} alt="points" />
                      <span className='text-sm lg:text-base'>{data.paragraph}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <div className='flex gap-2 mb-5 justify-end items-center'>
        <p className='text-text2 font-semibold text-xl'>Continue</p>
        <IoMdArrowForward
          onClick={() => onNext(membershipType)}  
          className='text-text2 cursor-pointer' size={25} 
        />
      </div>
    </main>
  );
};

export default MembershipType;
