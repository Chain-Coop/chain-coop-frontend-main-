import React, { useEffect, useState } from "react";
import NavBar from "../../common/NavBar";
import Footer from "../../common/Footer";
import background from "../../../Assets/png/story/background.png";
import image1 from "../../../Assets/jpg/story/image1.jpg";
import image2 from "../../../Assets/jpg/story/image2.jpg";
import mark from "../../../Assets/svg/story/icon-mark.svg";

const Story = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(true);
  }, []);

  return (
    <>
      <NavBar />
      <main className={`relative h-full font-sans transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
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
               A Tech-driven worker owned Cooperative, Built for a better future. 
            </p>
          </header>
          <div className="m-auto mt-8 flex flex-col px-4 sm:mt-0 sm:px-2 lg:mt-[3em] lg:w-[87%] lg:gap-8 lg:text-start">
            <div className="flex flex-col lg:mt-[7em] lg:flex-row">
              <div className="hidden lg:block lg:w-1/2">
                <img src={image1} alt="people-image" className="w-full h-auto" />
              </div>
              <div className="mx-auto mt-[1.5em] lg:text-start text-center tracking-wide lg:mt-[3em] lg:w-1/2">
                <p className="text-sm sm:text-base">
                  Chain is nigeria first digital membership cooperative, leveraging blockchain to offer safe, guanteed returns through 
                  ethical investment. As a worker-owned co-op, we are reshaping the future of work and investment
                </p>
              </div>
            </div>
            <div className="z-[0px] mt-8 flex flex-col-reverse sm:mt-0 lg:z-[10px] lg:mt-[-170px] lg:flex-row">
              <div className="mt-6 lg:ml-[2em] lg:mt-[12em] lg:w-[50%]">
                <h1 className="text-2xl w-[60%] font-bold sm:flex sm:justify-center sm:text-3xl">
                  Join Our Tech -Driven Cooperative
                </h1>
                <p className="mt-[1em] w-[55%] text-center text-xs sm:text-sm lg:text-start">
               A one time 100k membership access grants you access to exclusive investment rounds, the power to vote 
               on cooperative decisions that inpact your future 
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
                <img src={image2} alt="people-image" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </section>
        <div className="mx-auto flex lg:w-[87%] flex-col justify-between gap-[2em] px-4 sm:mt-[6em] lg:mt-[2em] lg:flex-row">
        <div className="h-full rounded-lg bg-text2 px-[1em] py-[8em] text-text3 shadow-md sm:px-[2em] sm:py-[3em] lg:h-[300px]">
          <h1 className="text-xl font-semibold sm:text-2xl">Our Mission</h1>
          <p className="mt-4 text-sm sm:text-base">
            Chain Co-op aims to create a community where tech Workers can participate in business 
            ownership, make sustainable investment and drive collective success. 
          </p>
          <p className="mt-4 text-sm sm:text-base">
            We envision a future where cooperative governance leads innovation.
          </p>
        </div>
        <div className="mb-[2em] h-full rounded-lg px-[1em] py-[8em] shadow-md sm:px-[2em] sm:py-[3em] lg:mt-[5em] lg:h-[300px]">
          <h1 className="text-xl font-semibold sm:text-2xl">Our Goals</h1>
          <p className="mt-4 text-sm sm:text-base">
            Ownership innovation: and inclusion: As a worker-owned co-op, we foster innovation through 
            collaboration, prioritize democratic decision-making, and promote inclusivity in all business dealings.  
          </p>
        </div>
      </div>
              <Footer />
      </main>
    </>
  );
};

export default Story;