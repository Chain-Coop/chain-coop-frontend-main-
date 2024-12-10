// import React, { useEffect, useState } from "react";
// import NavBar from "../../common/NavBar";
// import Footer from "../../common/Footer";
// import background from "../../../Assets/png/story/sHAPE.png";
// import image1 from "../../../Assets/jpg/story/image1.jpg";
// import image2 from "../../../Assets/jpg/story/image2.jpg";
// import mark from "../../../Assets/svg/story/icon-mark.svg";

// const Story = () => {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     setIsLoaded(true);
//   }, []);

//   return (
//     <>
//       <NavBar />
//       <main
//         className={`relative min-h-screen font-sans transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
//       >
//         <div className="inset-0 flex items-center">
//           <img
//             src={background}
//             className="h-[2vh] w-full object-cover md:h-[40vh] lg:h-auto"
//             alt="background_image"
//           />
//         </div>
//         <section className="relative mx-auto px-4 md:px-6 lg:absolute lg:inset-0">
//           <header className="mx-auto mt-1 text-center md:-mt-20 md:w-full md:px-4 lg:mt-[9em] lg:w-[65%]">
//             <h1 className="text-2xl font-semibold md:text-3xl lg:text-[2.5em]">
//               Our Story
//             </h1>
//             <p className="mt-2 text-sm tracking-wide md:text-base lg:px-0">
//               A Tech-driven worker owned Cooperative, Built for a better future.
//             </p>
//           </header>

//           <div className="m-auto mt-2 flex flex-col lg:mt-[3em] lg:w-[87%] lg:gap-8 lg:text-start">
//             <div className="flex flex-col lg:mt-[7em] lg:flex-row">
//               <div className="hidden lg:block lg:w-1/2">
//                 <img
//                   src={image1}
//                   alt="people-image"
//                   className="h-auto w-full"
//                 />
//               </div>
//               <div className="mx-auto mt-2 text-center tracking-wide lg:mt-[3em] lg:w-1/2 lg:text-start">
//                 <p className="text-base md:text-lg">
// Chain is Nigeria first digital membership cooperative,
// leveraging blockchain to offer safe, guanteed returns through
// ethical investment. As a worker-owned co-op, we are reshaping
// the future of work and investment
//                 </p>
//               </div>
//             </div>

//             <div className="mt-4 flex flex-col-reverse md:mt-12 lg:z-[10] lg:mt-[-170px] lg:flex-row">
//               <div className="mt-3 flex flex-col items-center lg:ml-[2em] lg:mt-[12em] lg:w-[50%] lg:items-start">
//                 <h1 className="w-full text-center text-xl font-bold md:text-3xl lg:w-[60%] lg:text-left">
//                   Join Our Tech-Driven Cooperative
//                 </h1>
//                 <p className="mt-2 w-full text-center text-sm md:text-base lg:w-[55%] lg:text-start">
//                   A one time 100k membership access grants you access to
//                   exclusive investment rounds, the power to vote on cooperative
//                   decisions that inpact your future
//                 </p>
//                 <div className="mt-3 flex w-full flex-col gap-2 font-medium lg:gap-7">
//                   <p className="flex items-center gap-3 text-base">
//                     <img src={mark} alt="svg-image" className="h-5 w-5" />
//                     Legally Guaranteed Returns
//                   </p>
//                   <p className="flex items-center gap-3 text-base">
//                     <img src={mark} alt="svg-image" className="h-5 w-5" />
//                     Access Exclusive Investment Rounds
//                   </p>
//                   <p className="flex items-center gap-3 text-base">
//                     <img src={mark} alt="svg-image" className="h-5 w-5" />
//                     Expand Your Network
//                   </p>
//                   <p className="flex items-center gap-3 text-base">
//                     <img src={mark} alt="svg-image" className="h-5 w-5" />
//                     Vote and Engage with Chain Coop Network
//                   </p>
//                 </div>
//               </div>
//               <div className="hidden lg:block lg:w-1/2">
//                 <img
//                   src={image2}
//                   alt="people-image"
//                   className="h-auto w-full"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

// <div className="mx-auto mt-6 flex flex-col justify-between gap-4 px-4 md:mt-24 lg:mt-[18em] lg:w-[87%] lg:flex-row">
//           <div className="h-full rounded-lg bg-text2 px-6 py-6 text-text3 shadow-md md:px-8 md:py-10 lg:h-[300px]">
//             <h1 className="text-2xl font-semibold md:text-3xl">Our Mission</h1>
//             <p className="mt-2 text-base md:text-lg">
//               Empowering members through secure flexible savings options to
//               hedge agains inflation, build wealth and unlock loan
//               possibilities, while fostering collective financial success.
//               Financial Scurity, inclusivity and flexibility
//             </p>
//             <p className="mt-2 text-base md:text-lg">
//               We prioritize secure savings in various currencies to protect
//               members from inflation and support future financial goals.
//             </p>
//           </div>
//           <div className="mb-6 h-full rounded-lg px-6 py-6 shadow-md md:px-8 md:py-10 lg:mt-[5em] lg:h-[300px]">
//             <h1 className="text-2xl font-semibold md:text-3xl">Our Goals</h1>
//             <p className="mt-2 text-base md:text-lg">
//               Ownership innovation: and inclusion: As a worker-owned co-op, we
//               foster innovation through collaboration, prioritize democratic
//               decision-making, and promote inclusivity in all business dealings.
//             </p>
//             <p className="mt-2 text-base md:text-lg">
//               Financial Security for Tomorrow: Build a cooperative savings
//               platform that ensures financial stability inflation resistance,
//               and wealth preservation for every member.
//             </p>
//           </div>
//         </div>
//         <Footer />
//       </main>
//     </>
//   );
// };

// export default Story;

import React, { useEffect, useState } from "react";
import NavBar from "../../common/NavBar";
import Footer from "../../common/Footer";
import background from "../../../Assets/png/story/sHAPE.png";
import image1 from "../../../Assets/jpg/story/image1.jpg";
import image2 from "../../../Assets/jpg/story/image2.jpg";
import mark from "../../../Assets/svg/story/icon-mark.svg";
import Rectangle from "../../../Assets/png/story/Rectangle.png";

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
        <section className="relative lg:absolute lg:inset-0">
          <div className="mx-auto px-[1em] lg:w-[80%]">
            <header className="mx-auto mt-1 text-center md:-mt-20 md:w-full md:px-4 lg:mt-[9em] lg:w-[65%]">
              <h1 className="text-2xl font-semibold md:text-3xl lg:text-[2.5em]">
                Our Story
              </h1>
              <p className="mt-2 text-sm tracking-wide md:text-base lg:px-0">
                A Tech-driven worker owned Cooperative, Built for a better
                future.
              </p>
            </header>

            <div className="m-auto mt-2 flex flex-col lg:mt-[3em] lg:w-full lg:gap-8 lg:text-start">
              <div className="flex flex-col lg:mt-[7em] lg:flex-row">
                <div className="lg:w- lg:block">
                  <img
                    src={image1}
                    alt="people-image"
                    className="h-auto w-full rounded-lg object-cover"
                  />
                </div>
                <div className="mx-auto mt-2  text-center tracking-wide lg:mt-[2em] lg:w-1/2 lg:px-8 lg:text-start">
                  <p className="text-base md:text-lg">
                    Chain is Nigeria first digital membership cooperative,
                    leveraging blockchain to offer safe, guanteed returns
                    through ethical investment. As a worker-owned co-op, we are
                    reshaping the future of work and investment
                  </p>
                </div>
              </div>

              <div className="relative mt-4 flex flex-col-reverse md:mt-12 lg:z-[10] lg:mt-[-150px] lg:flex-row">
                <div className="mt-3 flex flex-col items-center lg:ml-0 lg:mt-[8em] lg:w-[50%] lg:items-start">
                  <h1 className="w-full text-center text-xl font-bold md:text-3xl lg:w-[60%] lg:text-left">
                    Join Our Tech-Driven Cooperative
                  </h1>
                  <p className="mt-2 w-full text-center text-sm md:text-base lg:w-[55%] lg:text-start">
                    A one time 100k membership access grants you access to
                    exclusive investment rounds, the power to vote on
                    cooperative decisions that inpact your future
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
                <div className="hidden lg:absolute lg:right-[-12.5%] lg:block lg:w-1/2">
                  <img
                    src={Rectangle}
                    alt="rectangle-background"
                    className="absolute right-0 top-0 h-[200%] w-[130%] object-cover"
                  />
                  <img
                    src={image2}
                    alt="people-image"
                    className="h-aut relative z-10 w-[%] -translate-x-[35%] translate-y-[50%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto mt-3 flex flex-col justify-between gap-4 px-4 lg:w-[87%] lg:flex-row">
          <div className="h-full rounded-lg bg-text2 px-6 py-6 text-text3 shadow-md md:px-8 md:py-10 lg:h-[300px]">
            <h1 className="text-2xl font-semibold md:text-3xl">Our Mission</h1>
            <p className="mt-2 text-base md:text-lg">
              Empowering members through secure flexible savings options to
              hedge agains inflation, build wealth and unlock loan
              possibilities, while fostering collective financial success.
              Financial Scurity, inclusivity and flexibility
            </p>
            <p className="mt-2 text-base md:text-lg">
              We prioritize secure savings in various currencies to protect
              members from inflation and support future financial goals.
            </p>
          </div>
          <div className="mb-6 h-full rounded-lg px-6 py-6 shadow-md md:px-8 md:py-10 lg:mt-[5em] lg:h-[300px]">
            <h1 className="text-2xl font-semibold md:text-3xl">Our Goals</h1>
            <p className="mt-2 text-base md:text-lg">
              Ownership innovation: and inclusion: As a worker-owned co-op, we
              foster innovation through collaboration, prioritize democratic
              decision-making, and promote inclusivity in all business dealings.
            </p>
            <p className="mt-2 text-base md:text-lg">
              Financial Security for Tomorrow: Build a cooperative savings
              platform that ensures financial stability inflation resistance,
              and wealth preservation for every member.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Story;
