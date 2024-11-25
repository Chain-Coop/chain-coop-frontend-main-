import React from "react";
import { Link } from "react-router-dom";
import subicon from "../../../Assets/png/home/subicon.png";
import { Primary } from "../../common/Button";

const HeroSection = () => {
  return (
    <main className="relative flex w-full flex-col font-sans lg:flex-row">
      <div className="flex items-center px-4 py-5 lg:w-1/2 lg:px-[4em] lg:py-[10em]">
        <div className="max-w-xl">
          <div className="mb-4 lg:mb-6">
            <h1 className="text-2xl font-bold  lg:text-4xl">
              Save in Naira, Dollars, Gold, or BTC{" "}
              <span className="text-text2"> with Chain Co-op</span>
            </h1>
          </div>
          <p className="mb-6 text-sm text-text1 sm:text-base lg:mb-8">
            Introducing Chain Co-op Savings. A secure platform to save in Naira,
            Dollars, Gold, or BTC. Protecting your wealth and preparing you for
            potential loans, with a focus on financial stability over growth.
          </p>
          <div className="flex flex-col gap-[2.5em] sm:flex-row sm:items-center">
            {/* <Link to="/sign-up" className="w-full sm:w-auto">
              <Primary className="w-full rounded-md bg-text2 lg:px-4 lg:py-2 text-center text-sm text-text5 px-[9px] py-2 sm:text-base">
                Get Started
              </Primary>
            </Link> */}
            <Primary className="flex w-full items-center justify-center rounded-md bg-white py-2 text-sm font-semibold text-text2 shadow-xl outline-none sm:w-auto sm:px-4 sm:py-3 sm:text-base">
              <img
                src={subicon}
                className="mr-2 h-[20px] sm:h-[25px]"
                alt="Subicon"
              />
              50+ Subscribes
            </Primary>
          </div>
        </div>
      </div>
      <div className="hidden w-full bg-heroBackground bg-cover bg-center bg-no-repeat lg:block lg:h-auto lg:w-1/2"></div>
    </main>
  );
};

export default HeroSection;
