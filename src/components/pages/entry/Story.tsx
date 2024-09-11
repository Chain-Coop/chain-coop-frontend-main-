import React from "react";
import NavBar from "../../common/NavBar";
import Footer from "../../common/Footer";
import FooterBox from "../../common/FooterBox";
import background from "../../../Assets/png/story/background.png";
import image1 from "../../../Assets/jpg/story/image1.jpg";
import image2 from "../../../Assets/jpg/story/image2.jpg";
import mark from "../../../Assets/svg/story/icon-mark.svg";
import { useEffect } from "react";

const Story = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar />
      <main className="relative h-full font-sans">
        <div className="inset-0 flex items-center">
          <img
            src={background}
            className="h-[30vh] w-full object-cover sm:h-auto"
            alt="background_image"
          />
        </div>
        <section className="absolute inset-0 mx-auto">
          <header className="mx-auto text-center sm:w-full sm:px-1 md:px-[1em] lg:mt-[9em] lg:w-[65%]">
            <h1 className="text-[1.5em] font-semibold sm:text-[2em] lg:text-[2.5em]">
              Our Story
            </h1>
            <p className="px-4 text-xs tracking-wide sm:px-0 sm:text-sm">
              Meet our Chain Coop, our business-oriented community designed into
              a cooperative with open membership, through Chain Wallet Simple,
              Safe and transparent way
            </p>
          </header>
          <div className="m-auto mt-8 flex flex-col px-4 sm:mt-0 sm:px-2 lg:mt-[3em] lg:w-[87%] lg:gap-8 lg:text-start">
            <div className="flex flex-col lg:mt-[7em] lg:flex-row">
              <div className="hidden lg:block lg:w-1/2">
                <img src={image1} alt="people-image" />
              </div>
              <div className="mx-auto mt-[1.5em] text-center tracking-wide lg:mt-[3em] lg:w-1/2">
                <p className="text-sm sm:text-base">
                  Meet Chain Coop, Our business-oriented community designed into
                  a cooperative with open membership through Chain Wallet,
                  Simple, safe and transparent way.
                </p>
              </div>
            </div>
            <div className="z-[0px] mt-8 flex flex-col-reverse sm:mt-0 lg:z-[10px] lg:mt-[-170px] lg:flex-row">
              <div className="mt-6 lg:ml-[2em] lg:mt-[12em] lg:w-[45%]">
                <h1 className="text-2xl font-semibold sm:flex sm:justify-center sm:text-3xl">
                  Our Membership
                </h1>
                <p className="mt-[1em] text-center text-xs sm:text-sm lg:text-start">
                  Enjoy All the Benefits Chain Coop Has to Offer with a
                  <br className="hidden sm:block" />
                  One-Time N100k Membership Fee
                </p>
                <div className="mt-[1em] flex flex-col gap-2 font-medium lg:gap-7">
                  <p className="flex items-center gap-3 text-sm">
                    <img src={mark} alt="svg-image" className="h-4 w-4" />{" "}
                    Legally Guaranteed Returns
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <img src={mark} alt="svg-image" className="h-4 w-4" />{" "}
                    Access Exclusive Investment Rounds
                  </p>
                  <p className="flex items-center gap-3 text-sm">
                    <img src={mark} alt="svg-image" className="h-4 w-4" />{" "}
                    Expand Your Network
                  </p>
                  <p className="flex items-center gap-3 text-sm">
                    <img src={mark} alt="svg-image" className="h-4 w-4" /> Vote
                    and Engage with Chain Coop Network
                  </p>
                </div>
              </div>
              <div className="hidden lg:block lg:w-1/2">
                <img src={image2} alt="people-image" />
              </div>
            </div>
          </div>
        </section>
        <div className="mx-auto flex lg:w-[87%] flex-col justify-between gap-[2em] px-4 sm:mt-[6em]  lg:mt-[2em] lg:flex-row">
          <div className="h-full rounded-lg bg-text2 px-[1em] py-[2em] text-text3 shadow-md sm:px-[2em] sm:py-[3em]">
            <h1 className="text-xl font-semibold sm:text-2xl">Our Mission</h1>
            <p className="mt-4 text-sm sm:text-base">
              Meet Chain Coop our business-Oriented community, designed into a
              cooperative with open membership, through chain wallet simple safe
              and transparent way. Meet Chain Coop our business-Oriented
              community, designed into a cooperative with open membership,
              through chain wallet simple safe and transparent way.
            </p>
          </div>
          <div className="mb-[2em] h-full rounded-lg px-[1em] py-[2em] shadow-md sm:px-[2em] sm:py-[3em] lg:mt-[5em]">
            <h1 className="text-xl font-semibold sm:text-2xl">Our Goals</h1>
            <p className="mt-4 text-sm sm:text-base">
              Meet Chain Coop our business-Oriented community, designed into a
              cooperative with open membership, through chain wallet simple safe
              and transparent way. Meet Chain Coop our business-Oriented
              community, designed into a cooperative with open membership,
              through chain wallet simple safe and transparent way.
            </p>
          </div>
        </div>
        <FooterBox />
        <Footer />
      </main>
    </>
  );
};

export default Story;
