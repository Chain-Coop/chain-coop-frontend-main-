import React from "react";
import {
  customerCardData,
  investorCardData,
  employeeCardData,
} from "../../../data/Data";
import member from "../../../Assets/jpg/membership/customer.jpg";
import investor from "../../../Assets/jpg/membership/investor.jpg";
import employee from "../../../Assets/jpg/membership/employee.jpg";
import dot from "../../../Assets/svg/membership/radio-button.svg";

const Card = () => {
  return (
    <main className="mx-auto mt-[3em] font-sans px-[1em]">
        <section>
        <div className=" text-center text-text4">
          <header>
            <h1 className="mb-2 font-bold text-memt1 sm:text-xl lg:text-3xl">
              Membership Tiers
            </h1>
          </header>
          <article className="sm:px-[5px] mx-auto lg:w-[77%]">
            <p className="lg:text-lg font-medium">
          Choose from various tiers to suits your needs. Each Cards grants access to voting rights, inverstment opportunities and
          exclusive Coop Network benefits, all tailred to your level of investment.
            </p>
          </article>
        </div>
      </section>
      <section className="mt-8 flex flex-col justify-between lg:flex-row lg:space-x-8">
        <div className="flex-1">
          <div className="relative">
            <img src={member} alt="customer's_card" className="w-full" />
            <div className="mt-[1.5em] flex flex-col">
              <h1 className="text-xl font-semibold text-howtext">
                Customer Membership Card
              </h1>
              <div className="mt-2">
                <ul className="space-y-3 text-text1">
                  {customerCardData.map((data, index) => (
                    <li className="flex items-center gap-1" key={index}>
                      <img src={dot} alt="points" />
                      <span>{data.paragraph}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 sm:mt-[1em] lg:mt-[0px]">
          <div className="relative">
            <img src={investor} alt="investor's_card" className="w-full" />
            <div className="mt-[1.5em] flex flex-col">
              <h1 className="text-start text-xl font-semibold text-howtext">
                Investor Membership Card
              </h1>
              <div className="mt-2">
                <h2 className="font-bold lg:text-center">{`Member's Contribution: N100k`}</h2>
                <ul className="space-y-3 text-text1">
                  {investorCardData.map((data, index) => (
                    <li className="flex items-center gap-1" key={index}>
                      <img src={dot} alt="points" />
                      <span>{data.paragraph}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 sm:mt-[1em] lg:mt-[0px]">
          <div className="relative">
            <img src={employee} alt="employee's_card" className="w-full" />
            <div className="mt-[1.5em] flex flex-col">
              <h1 className="text-start text-xl font-semibold text-howtext">
                Investors Membership Card
              </h1>
              <div className="mt-2">
                <h2 className="font-bold lg:text-center">{`Member's Contribution: N100k`}</h2>
                <ul className="space-y-3 text-text1">
                  {employeeCardData.map((data, index) => (
                    <li className="flex items-center gap-1" key={index}>
                      <img src={dot} alt="points" />
                      <span>{data.paragraph}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Card;
