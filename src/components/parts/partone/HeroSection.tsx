import React from "react";
import { Link } from "react-router-dom";
import subicon from "../../../Assets/png/home/subicon.png";
import { Primary } from "../../common/Button";

const HeroSection = () => {
  return (
    <main className="relative flex w-full flex-col font-sans lg:flex-row">
      <div className="flex items-center px-4 py-8 sm:px-6 lg:w-1/2 lg:px-[4em] lg:py-24">
        <div className="max-w-xl">
          <h1 className="mb-4 text-2xl font-bold sm:text-3xl lg:mb-6 lg:text-5xl">
            Your Trusted Investing <br className="hidden sm:inline" /> Platform
            <span className="text-text2"> with</span>
            <br className="hidden sm:inline" />
            <span className="text-text2">Guaranteed Returns</span>
          </h1>
          <p className="mb-6 text-sm text-text1 sm:text-base lg:mb-8">
            Meet Chain Coop, our business-oriented community, designed into a
            cooperative with open membership, through Chain Wallet. Simple,
            safe, and transparent way.
          </p>
          <div className="flex flex-col gap-[3em] sm:flex-row sm:items-center">
            <Link to="/sign-up" className="w-full sm:w-auto">
              <Primary className="w-full rounded-md bg-text2 px-4 py-2 text-center text-sm text-text5 sm:px-4 sm:py-3 sm:text-base">
                Get Started
              </Primary>
            </Link>
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
      <div className="hidden h-64 w-full bg-heroBackground bg-cover bg-center bg-no-repeat lg:block lg:h-auto lg:w-1/2"></div>
    </main>
  );
};

export default HeroSection;
