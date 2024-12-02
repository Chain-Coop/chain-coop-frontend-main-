import React from "react";
import step1 from "../../../Assets/png/home/howto-step1.png";
import step2 from "../../../Assets/png/home/howto-step2.png";
import step3 from "../../../Assets/png/home/howto-step3.png";
import { motion } from "framer-motion";

const How = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const articleVariant = {
    hidden: { opacity: 0, x: -50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="m-auto mt-[3em] w-[90%] font-sans sm:px-[em]  lg:mt-[8em]">
      <header className="flex justify-center">
        <motion.h1
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold lg:text-3xl"
        >
          How to Get started
        </motion.h1>
      </header>
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="mt-8 flex flex-col lg:flex-row lg:space-x-9"
      >
        <motion.article
          variants={articleVariant}
          whileHover={{ scale: 1.02 }}
          className="relative my-4 flex flex-col justify-between rounded-xl bg-how1 p-[3em] sm:h-[411px] md:h-[250px] lg:h-[411px] lg:w-1/3"
        >
          <img
            src={step1}
            className="absolute inset-0 mx-auto self-center object-cover"
            alt="Step 1"
          />
          <div>
            <h1 className="text-2xl font-bold text-howtext">
              Register as <br /> member
            </h1>
            <p className="mt-4 font-sans font-medium text-howtext">
              Register as a Chain Co-op saver.
            </p>
          </div>
        </motion.article>

        <motion.article
          variants={articleVariant}
          whileHover={{ scale: 1.02 }}
          className="relative my-4 flex flex-col justify-between rounded-xl bg-how2 p-[3em] sm:h-[411px] md:h-[250px] lg:h-[411px] lg:w-1/3"
        >
          <img
            src={step2}
            className="absolute inset-0 mx-auto self-center object-cover"
            alt="Step 2"
          />
          <div>
            <h1 className="text-2xl font-bold text-howtext">
              Purchase Your <br /> Card
            </h1>
            <p className="mt-4 font-medium text-howtext">
              Purchase Your Membership Card - Your ticket to co-op dividends and
              decision making
            </p>
          </div>
        </motion.article>

        <motion.article
          variants={articleVariant}
          whileHover={{ scale: 1.02 }}
          className="relative my-4 flex flex-col justify-between rounded-xl bg-how3 p-[3em] sm:h-[411px] md:h-[280px] lg:h-[411px] lg:w-1/3"
        >
          <img
            src={step3}
            className="absolute inset-0 mx-auto self-center object-cover"
            alt="Step 3"
          />
          <div>
            <h1 className="text-2xl font-bold text-howtext">
              Access the Co-op <br /> Wallet and Build <br /> Your Income
            </h1>
            <p className="mt-4 font-medium text-howtext">
              Start saving in your preferred asset class (Naira, Dollars, Gold,
              BTC,) to hedge against inflation and earn early potential loan
              eligibility.
            </p>
          </div>
        </motion.article>
      </motion.section>
    </main>
  );
};

export default How;
