import React from "react";
import { Link } from "react-router-dom";
import subicon from "../../../Assets/png/home/subicon.png";
import { Primary } from "../../common/Button";

const HeroSection = () => {
  return (
    <>
      <main className="relative flex w-full font-sans">
        <div className="flex items-center sm:h-[25em] lg:h-[106vh] lg:w-[50%]">
          <div className="px-[1em] lg:px-[4em]">
            <h1 className="mb-[1em] font-bold sm:text-3xl md:text-4xl lg:text-4xl">
              Your Trusted Investing <br /> Platform
              <span className="text-text2"> with</span>
              <br />
              <span className="text-text2">Guaranteed Returns</span>
            </h1>
            <div className="mb-[4em] sm:px-[8px] lg:w-[31em]">
              <p className="font-base text-text1">
                Meet Chain Coop, our business-oriented community, designed into
                a cooperative with open membership, through Chain Wallet.
                Simple, safe, and transparent way.
              </p>
            </div>
            <div className="flex justify-between md:justify-normal md:gap-[5em]">
              <Link to="/sign-up">
                <Primary className="rounded-md bg-text2 px-4 py-3 text-text5 lg:px-7 lg:py-4">
                  Get Started
                </Primary>
              </Link>

              <Primary className="flex cursor-default items-center rounded-md bg-white py-3 font-semibold text-text2 shadow-xl outline-none lg:px-2 lg:py-4">
                <img src={subicon} className="mr-2 h-[25px]" alt="Subicon" />
                50+ Subscribes
              </Primary>
            </div>
          </div>
        </div>
        <div className="bg-heroBackground hidden bg-cover  bg-no-repeat sm:block lg:w-[50%]"></div>
      </main>
    </>
  );
};

export default HeroSection;
