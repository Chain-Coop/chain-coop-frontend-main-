// import React, { useEffect, useState } from "react";
// import background from "../../../Assets/png/story/background.png";
// import imageLeft from "../../../Assets/png/home/what-we-doL.png";
// import imageRight from "../../../Assets/png/home/what-we-doR.png";
// import NavBar from "../../common/NavBar";
// import lady from "../../../Assets/png/home/lady.png";
// import investor from "../../../Assets/png/home/investor.png";
// import investor2 from "../../../Assets/png/home/investor2.png";
// import investor3 from "../../../Assets/png/home/investor3.png";
// import investor4 from "../../../Assets/png/home/investor4.png";
// import investor5 from "../../../Assets/png/home/investor5.png";
// import rectangle from "../../../Assets/png/home/who-lady.png";
// import innovation from "../../../Assets/png/home/innovation.png";
// import kyc from "../../../Assets/png/home/Co-op-PX4.png";
// import Footer from "../../common/Footer";
// import { earlyMemberCircleText } from "../../../data/Data";

// const Landing = () => {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     setIsLoaded(true);
//   }, []);

//   return (
//     <>
//       <NavBar />
//       <main
//         className={`relative font-sans transition-opacity duration-300 ${
//           isLoaded ? "opacity-100" : "opacity-0"
//         }`}
//       >
//         <div
//           className="relative"
//           style={{
//             backgroundImage: `url(${background})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//             minHeight: "100vh",
//           }}
//         >
//           <section className="relative mx-auto flex w-full flex-col items-center px-2 text-center lg:w-[74%] lg:py-[4em]">
//             <div className="relative z-10 text-center">
//               <h1 className="text-[1.5em] font-semibold sm:mt-2 sm:text-[1.5em] lg:text-[2.5em]">
//                 What We Do
//               </h1>
//               <p className="mt-4 text-xs text-gray-500 sm:text-sm lg:text-base">
//                 Chain Co-op is a worker-owned, tech driven cooperative that
//                 facilitates sustainable investment through modern technology
//               </p>
//               <p className="mt-4 text-xs text-gray-500 sm:text-sm lg:text-base">
//                 We partner with investors and like-minded business who aim to
//                 grow through ethical, transparent, investment that contribute to
//                 the cooperative shared economy
//               </p>
//             </div>
//           </section>

//           <section className="relative z-10 flex w-full flex-col pt-8 text-white lg:-mt-1 lg:flex-row">
//             <div
//               className="relative h-[300px] w-full sm:mb-3 lg:h-[450px] lg:w-1/3"
//               style={{
//                 backgroundImage: `url(${imageRight})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 backgroundRepeat: "no-repeat",
//               }}
//             >
//               <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center sm:px-8 lg:px-[5em]">
//                 <h2 className="mb-4 text-xl font-semibold sm:text-2xl lg:text-3xl">
//                   As an Investor
//                 </h2>
//                 <p className="mr-5 text-sm lg:text-base">
//                   As an investor in Chain Co-op, you gain access to high growth
//                   businesess and early investment rounds.
//                 </p>
//                 <p className="mr-5  mt-[1em] text-sm lg:text-base">
//                   Your investment directly support sustainable , blockchain
//                   driven ventures, and you enjoy fixed, legally guaranteed
//                   returns that promote long-term wealth growth.
//                 </p>
//               </div>
//             </div>

//             <div className="hidden justify-between py-[3em] lg:flex lg:w-1/3">
//               <div className="mt-[1.5em] flex flex-col justify-between">
//                 <img
//                   src={lady}
//                   alt="lady"
//                   className="h-[8em] w-[8em] object-cover"
//                 />
//                 <img
//                   src={investor}
//                   alt="lady"
//                   className="h-[8em] w-[8em] object-cover"
//                 />
//               </div>
//               <div className="mt-[2.7em] flex flex-col gap-[2em]">
//                 <img
//                   src={investor2}
//                   alt="lady"
//                   className="h-[8em] w-[8em] object-cover"
//                 />
//                 <img
//                   src={investor4}
//                   alt="lady"
//                   className="h-[8em] w-[8em] object-cover"
//                 />
//               </div>
//               <div className="flex flex-col gap-[2.7em]">
//                 <img
//                   src={investor3}
//                   alt="lady"
//                   className="h-[8em] w-[8em] object-cover"
//                 />
//                 <img
//                   src={investor5}
//                   alt="lady"
//                   className="h-[8em] w-[8em] object-cover"
//                 />
//               </div>
//             </div>

//             <div
//               className="relative h-[300px] w-full lg:h-[450px] lg:w-1/3"
//               style={{
//                 backgroundImage: `url(${imageLeft})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 backgroundRepeat: "no-repeat",
//               }}
//             >
//               <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center sm:px-8 lg:px-[5em]">
//                 <h2 className="mb-4 text-xl font-semibold sm:text-2xl lg:text-3xl">
//                   As Employee
//                 </h2>
//                 <p className="ml-5 text-sm lg:text-base">
//                   As a worker-owned, you don't just work at Chain Co-op you own
//                   a piece of it
//                 </p>
//                 <p className="ml-5 mt-[1em] text-sm lg:text-base">
//                   Employees are shareholders, earning dividends and actively
//                   participating in Key business decisions through democratic
//                   voting
//                 </p>
//                 <p className="ml-5 mt-[1em] text-sm lg:text-base">
//                   Your voice shapes the future of our cooperative
//                 </p>
//               </div>
//             </div>
//           </section>

//           <div className="m-auto mt-8 flex w-full flex-col justify-between px-2 lg:mt-[12em] lg:w-[80%] lg:flex-row lg:px-0">
//             <div className="flex w-full flex-col gap-[2em] lg:w-[50%]">
//               <h2 className="text-center text-xl font-semibold sm:text-center lg:text-start">
//                 How Our Membership Works
//               </h2>
//               <p className="text-center text-sm text-gray-500 lg:text-start lg:text-base">
//                 Becoming a Chain Co-op member is easy
//               </p>
//               <p className="text-center text-sm text-gray-500 lg:text-start lg:text-base">
//                 Complete the KYC process, purchase your digital membership card
//                 (NFT), and unlock exclusive access to investment opportunities,
//                 annual dividends, and the ability to vote on strategic decisions
//                 that shape the cooperative's future.
//               </p>
//             </div>
//             <div className="mt-4 lg:mt-0">
//               <img
//                 src={kyc}
//                 alt="group"
//                 className="h-auto w-full object-cover lg:h-[] lg:w-[400px]"
//               />
//             </div>
//           </div>
//         </div>

//         <div
//           className="relative"
//           style={{
//             backgroundImage: `url(${background})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//             minHeight: "100vh",
//           }}
//         >
//           <section className="relative z-10 flex flex-col pt-8 lg:-mt-3 lg:flex-row">
//             <section className="inset-0 mt-[2em] w-full">
//               <div className="w-full bg-[#ece6f2] px-3  py-8 sm:py-12 lg:px-7">
//                 <h2 className="mb-8 text-center text-[1.5em] font-bold lg:text-[2em]">
//                   Who is a member?
//                 </h2>

//                 <div className="m-auto flex w-full flex-col gap-12 lg:w-[85%]">
//                   <div className="flex flex-col justify-between lg:flex-row">
//                     <div className="flex w-full  flex-col gap-4 text-center lg:w-[45%]">
//                       <p className="text-center text-sm text-gray-500 sm:text-base">
//                         At Chain Co-op, Members are innovators, tech
//                         enthusiasts, Employees, and investors who believe in
//                         building a sustainable future through blockchain driven
//                         cooperative ownership.
//                       </p>
//                       <p className="mt-[1em] text-center text-sm text-gray-500 sm:text-base">
//                         Anyone can join and contribute to shaping a transparent,
//                         tech-powered cooperative economy.
//                       </p>
//                     </div>
//                     <div className="mt-6 w-full lg:mt-0 lg:w-[32%]">
//                       <img
//                         src={rectangle}
//                         alt="group"
//                         className="h-auto w-full object-cover"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex flex-col-reverse justify-between lg:flex-row">
//                     <div className="mt-6 w-full lg:mt-0 lg:w-[32%]">
//                       <img
//                         src={innovation}
//                         alt="group"
//                         className="h-auto w-full object-cover"
//                       />
//                     </div>
//                     <div className="mt-auto flex w-full flex-col gap-4 lg:w-[48%]">
//                       <p className="text-center text-sm text-gray-500 sm:text-base lg:text-start">
//                         At Chain Co-op, members are innovators, tech
//                         enthusiasts, Employees, and investors who believe in
//                         building a sustainable future through blockchain-driven
//                         cooperative ownership.
//                       </p>
//                       <p className="text-center text-sm text-gray-500 sm:text-base lg:text-start">
//                         Anyone can join and contribute to shipping a
//                         transparent, tech-powered cooperative economy.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </section>
//           <div className=" mt-[2.5em]">
//             <h1 className="text-center text-[1.5em] font-bold sm:mt-2 sm:text-lg md:text-lg lg:text-[1.6em]">
//               Become an Early Member
//             </h1>
//             <h1 className="text-center text-[1.5em] font-bold sm:mt-1 sm:text-lg md:text-lg lg:text-[1.6em]">
//               With a One-Time N100k Membership Fee
//             </h1>
//             <div className="m-auto mt-1 px-2 text-center md:text-center lg:w-[50%]">
//               <p>
//                 Secure your spot as an early member of Chain Co-op with a one
//                 time N100k membership fee. Gain early access to investment
//                 round, and become part of growing tech-powered community focused
//                 on long-term financial success.
//               </p>
//             </div>
//           </div>
//           <div className="mt-[2em] flex flex-wrap items-center justify-center sm:flex-col sm:space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
//             <div className="mt-[2em] flex flex-col items-center">
//               <div className="flex flex-wrap justify-center sm:space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
//                 {Object.entries(earlyMemberCircleText)
//                   .slice(0, 3)
//                   .map(([key, content], index) => (
//                     <div
//                       key={index}
//                       className="relative mt-4 flex h-[320px] w-[320px] items-center justify-center bg-[#e3d9ec] px-2 lg:mt-0"
//                       style={{
//                         borderRadius: "50%",
//                         overflow: "hidden",
//                       }}
//                     >
//                       <div className="text-center">
//                         <div className="px-[1.7em]">
//                           <h1 className="text-[1em] text-lg font-bold text-text2">
//                             {content.title}
//                           </h1>
//                         </div>

//                         <div className="px-3 text-center text-sm font-medium">
//                           <p className="mt-[5px]">{content.p}</p>
//                           <p className="mt-[8px]">{content.p2}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//               </div>

//               {earlyMemberCircleText.fourthBox && (
//                 <div
//                   className="relative mt-6 flex h-[320px] w-[320px] items-center justify-center bg-[#e3d9ec] px-2"
//                   style={{
//                     borderRadius: "50%",
//                     overflow: "hidden",
//                   }}
//                 >
//                   <div className="text-center">
//                     <h1 className="text-[1em] text-lg font-bold text-text2">
//                       {earlyMemberCircleText.fourthBox.title}
//                     </h1>
//                     <div className="px-3 text-center text-sm font-medium">
//                       <p className="mt-[tpx]">
//                         {earlyMemberCircleText.fourthBox.p}
//                       </p>
//                       <p className="mt-[8px]">
//                         {earlyMemberCircleText.fourthBox.p2}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default Landing;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import background from "../../../Assets/png/story/background.png";
import imageLeft from "../../../Assets/png/home/what-we-doL.png";
import imageRight from "../../../Assets/png/home/what-we-doR.png";
import NavBar from "../../common/NavBar";
import lady from "../../../Assets/png/home/lady.png";
import investor from "../../../Assets/png/home/investor.png";
import investor2 from "../../../Assets/png/home/investor2.png";
import investor3 from "../../../Assets/png/home/investor3.png";
import investor4 from "../../../Assets/png/home/investor4.png";
import investor5 from "../../../Assets/png/home/investor5.png";
import rectangle from "../../../Assets/png/home/who-lady.png";
import innovation from "../../../Assets/png/home/innovation.png";
import kyc from "../../../Assets/png/home/Co-op-PX4.png";
import Footer from "../../common/Footer";
import { earlyMemberCircleText } from "../../../data/Data";

const Landing = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(true);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const slideIn = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const circleAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <NavBar />
      <main
        className={`relative font-sans transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
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
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="relative mx-auto flex w-full flex-col items-center px-2 text-center lg:w-[74%] lg:py-[4em]"
          >
            <div className="relative z-10 text-center">
              <motion.h1
                variants={fadeInUp}
                className="text-[1.5em] font-semibold sm:mt-2 sm:text-[1.5em] lg:text-[2.5em]"
              >
                What We Do
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mt-4 text-xs text-gray-500 sm:text-sm lg:text-base"
              >
                Chain Co-op is a worker-owned, tech driven cooperative that
                facilitates sustainable investment through modern technology
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="mt-4 text-xs text-gray-500 sm:text-sm lg:text-base"
              >
                We partner with investors and like-minded business who aim to
                grow through ethical, transparent, investment that contribute to
                the cooperative shared economy
              </motion.p>
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="relative z-10 flex w-full flex-col pt-8 text-white lg:-mt-1 lg:flex-row"
          >
            <motion.div
              variants={slideIn}
              className="relative h-[300px] w-full sm:mb-3 lg:h-[450px] lg:w-1/3"
              style={{
                backgroundImage: `url(${imageRight})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center sm:px-8 lg:px-[5em]">
                <motion.h2
                  variants={fadeInUp}
                  className="mb-4 text-xl font-semibold sm:text-2xl lg:text-3xl"
                >
                  As an Investor
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="mr-5 text-sm lg:text-base"
                >
                  As an investor in Chain Co-op, you gain access to high growth
                  businesess and early investment rounds.
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  className="mr-5 mt-[1em] text-sm lg:text-base"
                >
                  Your investment directly support sustainable, blockchain
                  driven ventures, and you enjoy fixed, legally guaranteed
                  returns that promote long-term wealth growth.
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="hidden justify-between py-[3em] lg:flex lg:w-1/3"
            >
              <div className="mt-[1.5em] flex flex-col justify-between">
                <motion.img
                  variants={fadeInUp}
                  src={lady}
                  alt="lady"
                  className="h-[8em] w-[8em] object-cover"
                />
                <motion.img
                  variants={fadeInUp}
                  src={investor}
                  alt="investor"
                  className="h-[8em] w-[8em] object-cover"
                />
              </div>
              <div className="mt-[2.7em] flex flex-col gap-[2em]">
                <motion.img
                  variants={fadeInUp}
                  src={investor2}
                  alt="investor2"
                  className="h-[8em] w-[8em] object-cover"
                />
                <motion.img
                  variants={fadeInUp}
                  src={investor4}
                  alt="investor4"
                  className="h-[8em] w-[8em] object-cover"
                />
              </div>
              <div className="flex flex-col gap-[2.7em]">
                <motion.img
                  variants={fadeInUp}
                  src={investor3}
                  alt="investor3"
                  className="h-[8em] w-[8em] object-cover"
                />
                <motion.img
                  variants={fadeInUp}
                  src={investor5}
                  alt="investor5"
                  className="h-[8em] w-[8em] object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              variants={slideIn}
              className="relative h-[300px] w-full lg:h-[450px] lg:w-1/3"
              style={{
                backgroundImage: `url(${imageLeft})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center sm:px-8 lg:px-[5em]">
                <motion.h2
                  variants={fadeInUp}
                  className="mb-4 text-xl font-semibold sm:text-2xl lg:text-3xl"
                >
                  As Employee
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="ml-5 text-sm lg:text-base"
                >
                  As a worker-owned, you don't just work at Chain Co-op you own
                  a piece of it
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  className="ml-5 mt-[1em] text-sm lg:text-base"
                >
                  Employees are shareholders, earning dividends and actively
                  participating in Key business decisions through democratic
                  voting
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  className="ml-5 mt-[1em] text-sm lg:text-base"
                >
                  Your voice shapes the future of our cooperative
                </motion.p>
              </div>
            </motion.div>
          </motion.section>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="m-auto mt-8 flex w-full flex-col justify-between px-2 lg:mt-[12em] lg:w-[80%] lg:flex-row lg:px-0"
          >
            <motion.div
              variants={slideIn}
              className="flex w-full flex-col gap-[2em] lg:w-[50%]"
            >
              <h2 className="text-center text-xl font-semibold sm:text-center lg:text-start">
                How Our Membership Works
              </h2>
              <p className="text-center text-sm text-gray-500 lg:text-start lg:text-base">
                Becoming a Chain Co-op member is easy
              </p>
              <p className="text-center text-sm text-gray-500 lg:text-start lg:text-base">
                Complete the KYC process, purchase your digital membership card
                (NFT), and unlock exclusive access to investment opportunities,
                annual dividends, and the ability to vote on strategic decisions
                that shape the cooperative's future.
              </p>
            </motion.div>
            <motion.div variants={fadeIn} className="mt-4 lg:mt-0">
              <img
                src={kyc}
                alt="group"
                className="h-auto w-full object-cover lg:h-[] lg:w-[400px]"
              />
            </motion.div>
          </motion.div>
        </div>

        <div
          className="relative overflow-hidden"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
          }}
        >
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="relative z-10 flex flex-col pt-8 lg:-mt-3 lg:flex-row"
          >
            <section className="inset-0 mt-[2em] w-full">
              <div className="w-full bg-[#ece6f2] px-3 py-8 sm:py-12 lg:px-7">
                <motion.h2
                  variants={fadeInUp}
                  className="mb-8 text-center text-[1.5em] font-bold lg:text-[2em]"
                >
                  Who is a member?
                </motion.h2>

                <div className="m-auto flex w-full flex-col gap-12 lg:w-[85%]">
                  <motion.div
                    variants={fadeIn}
                    className="flex flex-col justify-between lg:flex-row"
                  >
                    <div className="flex w-full flex-col gap-4 text-center lg:w-[45%]">
                      <motion.p
                        variants={fadeInUp}
                        className="text-center text-sm text-gray-500 sm:text-base"
                      >
                        At Chain Co-op, Members are innovators, tech
                        enthusiasts, Employees, and investors who believe in
                        building a sustainable future through blockchain driven
                        cooperative ownership.
                      </motion.p>
                      <motion.p
                        variants={fadeInUp}
                        className="mt-[1em] text-center text-sm text-gray-500 sm:text-base"
                      >
                        Anyone can join and contribute to shaping a transparent,
                        tech-powered cooperative economy.
                      </motion.p>
                    </div>
                    <motion.div
                      variants={fadeIn}
                      className="mt-6 w-full lg:mt-0 lg:w-[32%]"
                    >
                      <img
                        src={rectangle}
                        alt="group"
                        className="h-auto w-full object-cover"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    variants={fadeIn}
                    className="flex flex-col-reverse justify-between lg:flex-row"
                  >
                    <motion.div
                      variants={fadeIn}
                      className="mt-6 w-full lg:mt-0 lg:w-[32%]"
                    >
                      <img
                        src={innovation}
                        alt="group"
                        className="h-auto w-full object-cover"
                      />
                    </motion.div>
                    <div className="mt-auto flex w-full flex-col gap-4 lg:w-[48%]">
                      <motion.p
                        variants={fadeInUp}
                        className="text-center text-sm text-gray-500 sm:text-base lg:text-start"
                      >
                        At Chain Co-op, members are innovators, tech
                        enthusiasts, Employees, and investors who believe in
                        building a sustainable future through blockchain-driven
                        cooperative ownership.
                      </motion.p>
                      <motion.p
                        variants={fadeInUp}
                        className="text-center text-sm text-gray-500 sm:text-base lg:text-start"
                      >
                        Anyone can join and contribute to shipping a
                        transparent, tech-powered cooperative economy.
                      </motion.p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          </motion.section>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="mt-[2.5em]"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-center text-[1.5em] font-bold sm:mt-2 sm:text-lg md:text-lg lg:text-[1.6em]"
            >
              Become an Early Member
            </motion.h1>
            <motion.h1
              variants={fadeInUp}
              className="text-center text-[1.5em] font-bold sm:mt-1 sm:text-lg md:text-lg lg:text-[1.6em]"
            >
              With a One-Time N100k Membership Fee
            </motion.h1>
            <motion.div
              variants={fadeInUp}
              className="m-auto mt-1 px-2 text-center md:text-center lg:w-[50%]"
            >
              <p>
                Secure your spot as an early member of Chain Co-op with a one
                time N100k membership fee. Gain early access to investment
                round, and become part of growing tech-powered community focused
                on long-term financial success.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="mt-[2em] flex flex-wrap items-center justify-center sm:flex-col sm:space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0"
          >
            <div className="mt-[2em] flex flex-col items-center">
              <div className="flex flex-wrap justify-center sm:space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
                {Object.entries(earlyMemberCircleText)
                  .slice(0, 3)
                  .map(([key, content], index) => (
                    <motion.div
                      key={index}
                      variants={circleAnimation}
                      className="relative mt-4 flex h-[320px] w-[320px] items-center justify-center bg-[#e3d9ec] px-2 lg:mt-0"
                      style={{
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                    >
                      <div className="text-center">
                        <div className="px-[1.7em]">
                          <h1 className="text-[1em] text-lg font-bold text-text2">
                            {content.title}
                          </h1>
                        </div>

                        <div className="px-3 text-center text-sm font-medium">
                          <p className="mt-[5px]">{content.p}</p>
                          <p className="mt-[8px]">{content.p2}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>

              {earlyMemberCircleText.fourthBox && (
                <motion.div
                  variants={circleAnimation}
                  className="relative mt-6 flex h-[320px] w-[320px] items-center justify-center bg-[#e3d9ec] px-2"
                  style={{
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <div className="text-center">
                    <h1 className="text-[1em] text-lg font-bold text-text2">
                      {earlyMemberCircleText.fourthBox.title}
                    </h1>
                    <div className="px-3 text-center text-sm font-medium">
                      <p className="mt-[5px]">
                        {earlyMemberCircleText.fourthBox.p}
                      </p>
                      <p className="mt-[8px]">
                        {earlyMemberCircleText.fourthBox.p2}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Landing;
