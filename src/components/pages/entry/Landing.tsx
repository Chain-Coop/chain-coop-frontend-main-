import React, { useEffect, useState } from "react";
import background from "../../../Assets/png/story/background.png";
import imageLeft from "../../../Assets/png/home/what-we-doL.png";
import imageRight from "../../../Assets/png/home/what-we-doR.png";
import NavBar from "../../common/NavBar";
import lady from "../../../Assets/png/home/lady.png";
import rectangle from "../../../Assets/png/home/who-lady.png";
import innovation from "../../../Assets/png/home/innovation.png";
import group from "../../../Assets/png/home/group.png";
import Footer from "../../common/Footer";
import { earlyMemberCircleText } from "../../../data/Data";

const Landing = () => {
const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
window.scrollTo(0, 0);
setIsLoaded(true);
}, []);

return (
          <>
          <NavBar />
          <main
          className={`relative font-sans transition-opacity duration-300 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                  }`} >
          <div
          className="relative"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
          }} >
          <section className="relative flex flex-col items-center mx-auto w-full px-2 text-center lg:py-[4em] lg:w-[74%]">
          <div className="relative z-10 text-center">
          <h1 className="text-[1.5em] font-semibold sm:text-[1.5em] sm:mt-2 lg:text-[2.5em]">
          What We Do
          </h1>
          <p className="mt-4 text-gray-500 text-xs sm:text-sm lg:text-base">
       Chain Co-op is a worker-owned, tech driven cooperative that facilitates sustainable investment through modern technology
          </p>
          <p className="mt-4 text-xs text-gray-500 sm:text-sm lg:text-base">
       We partner with investors and like-minded business who aim to grow through ethical, transparent, investment that contribute to the cooperative shared economy
          </p>
          </div>
          </section>

          <section className="relative flex flex-col w-full lg:flex-row pt-8 lg:-mt-1 text-white z-10">
               <div
              className="relative h-[300px] sm:mb-3 w-full lg:h-[450px] lg:w-1/3"
              style={{
                backgroundImage: `url(${imageRight})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-8 lg:px-[5em] text-center">
                <h2 className="mb-4 text-xl font-semibold sm:text-2xl lg:text-3xl">
                  As an Investor
                </h2>
                <p className="text-sm lg:text-base">
                 As an investor in Chain Co-op, you gain access to high growth
                 businesess and early investment rounds.
                </p>
                <p className="text-sm mt-[1em] lg:text-base">
                  Your investment directly support sustainable , blockchain driven 
                  ventures, and you enjoy fixed, legally guaranteed returns that promote
                  long-term wealth growth.
                </p>
              </div>
            </div>


            <div className="hidden lg:flex lg:w-1/3 justify-between py-[3em]">
              <div className="flex mt-[1.5em] justify-between flex-col">
                <img
                  src={lady}
                  alt="lady"
                  className="h-[8em] w-[8em] object-cover"
                />
                <img
                  src={lady}
                  alt="lady"
                  className="h-[8em] w-[8em] object-cover"
                />
              </div>
              <div className="flex gap-[2em] mt-[2.7em] flex-col">
                <img
                  src={lady}
                  alt="lady"
                  className="h-[8em] w-[8em] object-cover"
                />
                <img
                  src={lady}
                  alt="lady"
                  className="h-[8em] w-[8em] object-cover"
                />
              </div>
              <div className="flex gap-[2.7em] flex-col">
                <img
                  src={lady}
                  alt="lady"
                  className="h-[8em] w-[8em] object-cover"
                />
                <img
                  src={lady}
                  alt="lady"
                  className="h-[8em] w-[8em] object-cover"
                />
              </div>
            </div>

          <div
          className="relative h-[300px] w-full lg:h-[450px] lg:w-1/3"
          style={{
            backgroundImage: `url(${imageLeft})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-8 lg:px-[5em] text-center">
            <h2 className="mb-4 text-xl font-semibold sm:text-2xl lg:text-3xl">
              As Employee
            </h2>
            <p className="text-sm lg:text-base">
              As a worker-owned, you don't just work at Chain Co-op you own a piece of it
            </p>
            <p className="text-sm mt-[1em] lg:text-base">
             Employees are shareholders, earning dividends and actively participating in Key business decisions through 
             democratic voting 
            </p>
            <p className="text-sm mt-[1em] lg:text-base">
            Your voice shapes the future of our cooperative 
            </p>
          </div>
        </div>
          </section>

          <div className="w-full lg:w-[80%] mt-8 lg:mt-[12em] flex flex-col lg:flex-row justify-between m-auto px-2 lg:px-0">
            <div className="w-full lg:w-[50%] flex flex-col gap-[2em]">
              <h2 className="font-semibold sm:text-center lg:text-start text-center text-xl">How Our Membership Works</h2>
              <p className="text-sm text-center text-gray-500 lg:text-start lg:text-base">
               Becoming a Chain Co-op member is easy
              </p>
              <p className="text-sm text-gray-500 text-center lg:text-start lg:text-base">
               Complete the KYC process, purchase your digital membership card (NFT),
               and unlock exclusive access to investment opportunities, annual dividends,
               and the ability to vote on strategic decisions that shape the cooperative's future.
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <img
                src={group}
                alt="group"
                className="h-auto w-full lg:h-[300px] lg:w-[400px] object-cover"
              />
            </div>
          </div>
        </div>

        <div
          className="relative"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
          }}
        >
          <section className="relative flex flex-col lg:flex-row pt-8 lg:-mt-3 z-10">
            <section className="inset-0 mt-[2em] w-full">
              <div className="w-full px-3 lg:px-7  bg-[#ece6f2] py-8 sm:py-12">
                <h2 className="font-bold text-[1.5em] lg:text-[2em] text-center mb-8">
                  Who is a member?
                </h2>

                <div className="w-full lg:w-[85%] m-auto flex flex-col gap-12">
                  <div className="flex flex-col lg:flex-row justify-between">
                    <div className="w-full lg:w-[45%]  text-center flex flex-col gap-4">
                      <p className="text-sm text-gray-500 text-center sm:text-base">
                       At Chain Co-op, Members are innovators, tech enthusiasts, Employees, and 
                       investors who believe in building a sustainable future through blockchain driven 
                       cooperative ownership. 
                      </p>
                      <p className="text-sm mt-[1em] text-gray-500 text-center sm:text-base">Anyone can join
                         and contribute to shaping a transparent, tech-powered cooperative economy.</p>
                    </div>
                    <div className="mt-6 lg:mt-0 w-full lg:w-[32%]">
                      <img src={rectangle} alt="group" className="h-auto w-full object-cover" />
                    </div>
                  </div>

                  <div className="flex flex-col-reverse lg:flex-row justify-between">
                    <div className="mt-6 lg:mt-0 w-full lg:w-[32%]">
                      <img src={innovation} alt="group" className="h-auto w-full object-cover" />
                    </div>
                    <div className="w-full lg:w-[48%] mt-auto flex flex-col gap-4">
                      <p className="text-sm text-gray-500 lg:text-start text-center sm:text-base">
                        At Chain Co-op, members are innovators, tech enthusiasts, Employees,
                        and investors who believe in building a sustainable future through blockchain-driven 
                        cooperative ownership.
                      </p>
                      <p className="text-sm text-gray-500 lg:text-start text-center sm:text-base">
                      Anyone can join and contribute to shipping a transparent,
                      tech-powered cooperative economy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
            <div className=" mt-[2.5em]">
              <h1 className="text-[1.5em] text-center font-bold sm:text-[1.5em] sm:mt-2 lg:text-[1.6em]">
              Become an Early Member
            </h1> 
              <h1 className="text-[1.5em] text-center font-bold sm:text-[1.5em] sm:mt-2 lg:text-[1.6em]">
                With a One-Time N100k Membership Fee
              </h1>
              <div className="lg:w-[50%] sm:px-2 sm:text-center m-auto">
                <p>Secure your spot as an early member of Chain Co-op with a one time N100k
                  membership fee. Gain early access to investment round, and become part of growing
                  tech-powered community focused on long-term financial success.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center sm:flex-col lg:flex-row items-center mt-[2em] sm:space-y-4 lg:space-x-4 lg:space-y-0">
            <div className="flex flex-col items-center mt-[2em]">

  <div className="flex flex-wrap justify-center lg:flex-row sm:space-y-4 lg:space-x-4 lg:space-y-0">
    {Object.entries(earlyMemberCircleText).slice(0, 3).map(([key, content], index) => (
      <div
        key={index}
        className="relative w-[320px] h-[320px] px-2 flex items-center justify-center bg-[#e3d9ec] mt-4 lg:mt-0"
        style={{
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        <div className="text-center">
          <div className="px-[1.7em]">
            <h1 className="text-text2 text-lg font-bold text-[1em]">
            {content.title}
          </h1>
          </div>

          <div className="font-medium px-3 text-center text-sm">
           <p className="mt-[5px]">
            {content.p}
          </p>
          <p className="mt-[8px]">
            {content.p2}
          </p>
        </div>
          </div>
      </div>
    ))}
  </div>

      {earlyMemberCircleText.fourthBox && (
      <div
        className="relative w-[320px] h-[320px] px-2 flex items-center justify-center bg-[#e3d9ec] mt-6"
        style={{
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        <div className="text-center">
        <h1 className="text-text2 text-lg font-bold text-[1em]">
            {earlyMemberCircleText.fourthBox.title}
          </h1>
          <div className="font-medium px-3 text-center text-sm">
          <p className="mt-[tpx]">
            {earlyMemberCircleText.fourthBox.p}
          </p>
          <p className="mt-[8px]">
            {earlyMemberCircleText.fourthBox.p2}
          </p>
          </div>
        </div>
      </div>
    )}
  </div>
         </div>
        </div>
      </main>
    <Footer />
        </>
      );
      };

      export default Landing;