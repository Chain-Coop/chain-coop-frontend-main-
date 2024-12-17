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

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const slideInLeft = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const slideInRight = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const circleAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <NavBar />
      <main
        className={`relative mb-[2em] font-sans transition-opacity duration-300 ${
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
            viewport={{ once: false, amount: 0.3 }}
            variants={staggerContainer}
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
                Chain Co-op provides a secure platform for members to save,
                hedge against inflation, and access loans, creating a
                cooperative savings ecosystem focused on members security and
                stability.
              </motion.p>
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={staggerContainer}
            className="relative z-10 flex w-full flex-col gap-6 pt-8 text-white sm:gap-8 lg:-mt-1 lg:flex-row lg:gap-0"
          >
            {/* Customer Section */}
            <motion.div
              variants={slideInLeft}
              className="relative h-[300px] w-full sm:h-[350px] md:h-[400px] lg:h-[450px] lg:w-1/3"
              style={{
                backgroundImage: `url(${imageRight})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center sm:px-8 md:px-10 lg:px-[5em]">
                <motion.h2
                  variants={fadeInUp}
                  className="mb-4 text-xl font-semibold sm:text-2xl lg:text-3xl"
                >
                  As a Customer
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="mr-2 text-sm sm:mr-3 md:mr-4 lg:mr-5 lg:text-base"
                >
                  You gained access to secure savings options designed to
                  protect your wealth and hedge against inflation. Save in
                  stable assets like USDT or USDC, ensuring stability in
                  uncertain times.
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  className="mr-2 mt-[1em] text-sm sm:mr-3 md:mr-4 lg:mr-5 lg:text-base"
                >
                  Your savings contribute to sustainable, blockchain-driven
                  ventures, with opportunities to invest directly in the
                  business.
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  className="mr-2 mt-[1em] text-sm sm:mr-3 md:mr-4 lg:mr-5 lg:text-base"
                >
                  Enjoy the potentials for yield profits and Access to the group
                  savings circles through a trusted, legally backed cooperative.
                </motion.p>
              </div>
            </motion.div>

            {/* Middle Images Section */}
            <motion.div
              variants={fadeIn}
              className="hidden lg:flex lg:w-1/3 lg:justify-between lg:py-[3em]"
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

            {/* Investor Section */}
            <motion.div
              variants={slideInRight}
              className="relative h-[300px] w-full sm:h-[350px] md:h-[400px] lg:h-[450px] lg:w-1/3"
              style={{
                backgroundImage: `url(${imageLeft})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center sm:px-8 md:px-10 lg:px-[5em]">
                <motion.h2
                  variants={fadeInUp}
                  className="mb-4 text-xl font-semibold sm:text-2xl lg:text-3xl"
                >
                  As an Investor
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="ml-2 text-sm sm:ml-3 md:ml-4 lg:ml-5 lg:text-base"
                >
                  Enjoy all the benefits Chain Co-op has to offer. you again
                  access to high growth business and early investment rounds
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  className="ml-2 mt-[1em] text-sm sm:ml-3 md:ml-4 lg:ml-5 lg:text-base"
                >
                  Your investment directly support sustainable blockchain driven
                  ventures and you emjoy fixd legally guaranteed returns that
                  promote long-term wealth growth.
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  className="ml-2 mt-[1em] text-sm sm:ml-3 md:ml-4 lg:ml-5 lg:text-base"
                >
                  Secure your future with Exclusive savings and sustainable
                  Opportunities.
                </motion.p>
              </div>
            </motion.div>
          </motion.section>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={staggerContainer}
            className="m-auto mt-8 flex w-full flex-col justify-between px-2 lg:mt-[12em] lg:w-[80%] lg:flex-row lg:px-0"
          >
            <motion.div
              variants={slideInRight}
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
            variants={staggerContainer}
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
                        A Chain Co-op, member is Anyone focused on financial
                        security, inflation protection, and savings growth can
                        become a member.
                      </motion.p>
                      <motion.p
                        variants={fadeInUp}
                        className="mt-[1em] text-center text-sm text-gray-500 sm:text-base"
                      >
                        Chain Co-op welcomes individuals looking to save in a
                        community-driven secure platform with opportunities to
                        prepare for future financial needs through loans and
                        cooperative benefits.
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
            variants={staggerContainer}
            className="mt-[2.5em]"
          >
            <motion.h1
              variants={fadeInUp}
              className="mx-auto text-center text-[1.5em] text-lg font-bold tracking-wide sm:mt-2 md:text-lg lg:w-[50%] lg:text-[1.6em]"
            >
              Join and Multiply Your Savings with our exclusive Dollar Group
              Cycles.
            </motion.h1>
            <motion.div
              variants={fadeInUp}
              className="m-auto mt-1 px-2 text-center md:text-center lg:w-[50%]"
            >
              <p>
                Access 5x your funds by Participating in Chain Co-op Poweful
                Group Savings Cycles{" "}
                <span className="font-bold lg:text-xl">
                  -Limited Spots Available!
                </span>
              </p>
            </motion.div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={staggerContainer}
            className="mt-[2em] flex flex-col items-center"
          >
            <div className="flex flex-wrap justify-center gap-[1em] lg:flex-row lg:gap-[3em]">
              {Object.entries(earlyMemberCircleText)
                .slice(0, 2)
                .map(([key, content], index) => (
                  <motion.div
                    key={index}
                    variants={circleAnimation}
                    whileInView="visible"
                    initial="hidden"
                    viewport={{ once: false, amount: 0.3 }}
                    className="relative flex h-[320px] w-[320px] items-center justify-center bg-[#e3d9ec] px-2"
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

            <div className="mt-4 flex flex-wrap justify-center gap-[1em] lg:flex-row lg:gap-[3em]">
              {Object.entries(earlyMemberCircleText)
                .slice(2)
                .map(([key, content], index) => (
                  <motion.div
                    key={index + 2}
                    variants={circleAnimation}
                    whileInView="visible"
                    initial="hidden"
                    viewport={{ once: false, amount: 0.3 }}
                    className="relative flex h-[320px] w-[320px] items-center justify-center bg-[#e3d9ec] px-2"
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
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Landing;
