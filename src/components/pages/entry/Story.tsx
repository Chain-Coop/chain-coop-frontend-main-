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
      <main className={`relative font-sans transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative">
          <img
            src={background}
            className="h-[30vh] w-full object-cover sm:h-[40vh] lg:h-[50vh]"
            alt="background_image"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <header className="text-center px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold sm:text-3xl lg:text-4xl mb-2">
                Our Story
              </h1>
              <p className="text-sm sm:text-base lg:text-lg">
                A Tech-driven worker owned Cooperative, Built for a better future. 
              </p>
            </header>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center mb-12 lg:mb-20">
            <div className="lg:w-1/2 lg:pr-8 mb-6 lg:mb-0">
              <img src={image1} alt="people-image" className="w-full h-auto rounded-lg shadow-md" />
            </div>
            <div className="lg:w-1/2 lg:pl-8 text-center lg:text-left">
              <p className="text-sm sm:text-base lg:text-lg">
                Chain is Nigeria's first digital membership cooperative, leveraging blockchain to offer safe, guaranteed returns through 
                ethical investment. As a worker-owned co-op, we are reshaping the future of work and investment.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-8 order-2 lg:order-1">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-center lg:text-left">
                Join Our Tech-Driven Cooperative
              </h2>
              <p className="mb-6 text-sm sm:text-base lg:text-lg text-center lg:text-left">
                A one-time 100k membership access grants you exclusive investment rounds and the power to vote 
                on cooperative decisions that impact your future.
              </p>
              <div className="space-y-4">
                {["Legally Guaranteed Returns", "Access Exclusive Investment Rounds", "Expand Your Network", "Vote and Engage with Chain Coop Network"].map((item, index) => (
                  <p key={index} className="flex items-center text-sm sm:text-base">
                    <img src={mark} alt="checkmark" className="h-4 w-4 mr-3" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-8 mb-6 lg:mb-0 order-1 lg:order-2">
              <img src={image2} alt="people-image" className="w-full h-auto rounded-lg shadow-md" />
            </div>
          </div>
        </div>

        <div className="bg-gray-100 py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-sm sm:text-base mb-4">
                  Chain Co-op aims to create a community where tech Workers can participate in business 
                  ownership, make sustainable investment and drive collective success. 
                </p>
                <p className="text-sm sm:text-base">
                  We envision a future where cooperative governance leads innovation.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Our Goals</h2>
                <p className="text-sm sm:text-base">
                  Ownership innovation and inclusion: As a worker-owned co-op, we foster innovation through 
                  collaboration, prioritize democratic decision-making, and promote inclusivity in all business dealings.  
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Story;