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
      <main
        className={`relative min-h-screen font-sans transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <div className="inset-0 flex items-center">
          <img
            src={background}
            className="h-[2vh] w-full object-cover md:h-[40vh] lg:h-auto"
            alt="background_image"
          />
        </div>
        <section className="relative mx-auto px-4 md:px-6 lg:absolute lg:inset-0">
          <header className="mx-auto mt-1 text-center md:-mt-20 md:w-full md:px-4 lg:mt-[9em] lg:w-[65%]">
            <h1 className="text-2xl font-semibold md:text-3xl lg:text-[2.5em]">
              Our Story
            </h1>
            <p className="mt-2 text-sm tracking-wide md:text-base lg:px-0">
              A Tech-driven worker owned Cooperative, Built for a better future.
            </p>
          </header>

          <div className="m-auto mt-2 flex flex-col lg:mt-[3em] lg:w-[87%] lg:gap-8 lg:text-start">
            <div className="flex flex-col lg:mt-[7em] lg:flex-row">
              <div className="hidden lg:block lg:w-1/2">
                <img
                  src={image1}
                  alt="people-image"
                  className="h-auto w-full"
                />
              </div>
              <div className="mx-auto mt-2 text-center tracking-wide lg:mt-[3em] lg:w-1/2 lg:text-start">
                <p className="text-base md:text-lg">
                  Chain is Nigeria first digital membership cooperative,
                  leveraging blockchain to offer safe, guanteed returns through
                  ethical investment. As a worker-owned co-op, we are reshaping
                  the future of work and investment
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col-reverse md:mt-12 lg:z-[10] lg:mt-[-170px] lg:flex-row">
              <div className="mt-3 flex flex-col items-center lg:ml-[2em] lg:mt-[12em] lg:w-[50%] lg:items-start">
                <h1 className="w-full text-center text-xl font-bold md:text-3xl lg:w-[60%] lg:text-left">
                  Join Our Tech-Driven Cooperative
                </h1>
                <p className="mt-2 w-full text-center text-sm md:text-base lg:w-[55%] lg:text-start">
                  A one time 100k membership access grants you access to
                  exclusive investment rounds, the power to vote on cooperative
                  decisions that inpact your future
                </p>
                <div className="mt-3 flex w-full flex-col gap-2 font-medium lg:gap-7">
                  <p className="flex items-center gap-3 text-base">
                    <img src={mark} alt="svg-image" className="h-5 w-5" />
                    Legally Guaranteed Returns
                  </p>
                  <p className="flex items-center gap-3 text-base">
                    <img src={mark} alt="svg-image" className="h-5 w-5" />
                    Access Exclusive Investment Rounds
                  </p>
                  <p className="flex items-center gap-3 text-base">
                    <img src={mark} alt="svg-image" className="h-5 w-5" />
                    Expand Your Network
                  </p>
                  <p className="flex items-center gap-3 text-base">
                    <img src={mark} alt="svg-image" className="h-5 w-5" />
                    Vote and Engage with Chain Coop Network
                  </p>
                </div>
              </div>
              <div className="hidden lg:block lg:w-1/2">
                <img
                  src={image2}
                  alt="people-image"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto mt-6 flex flex-col justify-between gap-4 px-4 md:mt-24 lg:mt-[18em] lg:w-[87%] lg:flex-row">
          <div className="h-full rounded-lg bg-text2 px-6 py-6 text-text3 shadow-md md:px-8 md:py-10 lg:h-[300px]">
            <h1 className="text-2xl font-semibold md:text-3xl">Our Mission</h1>
            <p className="mt-2 text-base md:text-lg">
              Chain Co-op aims to create a community where tech Workers can
              participate in business ownership, make sustainable investment and
              drive collective success.
            </p>
            <p className="mt-2 text-base md:text-lg">
              We envision a future where cooperative governance leads
              innovation.
            </p>
          </div>
          <div className="mb-6 h-full rounded-lg px-6 py-6 shadow-md md:px-8 md:py-10 lg:mt-[5em] lg:h-[300px]">
            <h1 className="text-2xl font-semibold md:text-3xl">Our Goals</h1>
            <p className="mt-2 text-base md:text-lg">
              Ownership innovation: and inclusion: As a worker-owned co-op, we
              foster innovation through collaboration, prioritize democratic
              decision-making, and promote inclusivity in all business dealings.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Story;
