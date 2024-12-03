import React from "react";
import {
  customerCardData,
  investorCardData,
  employeeCardData,
} from "../../../data/Data";
import member from "../../../Assets/jpg/membership/customer.jpg";
import investor from "../../../Assets/jpg/membership/investor.jpg";
import employee from "../../../Assets/jpg/membership/employee.jpg";
import dot from "../../../Assets/svg/membership/radio-button.svg";
import { motion } from "framer-motion";

const Card = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.main
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="mx-auto mt-[1.5em] px-[1em] font-sans lg:mt-[3em]"
    >
      <section>
        <motion.div variants={textVariants} className="text-center text-text4">
          <motion.h1 className="mb-2 font-bold text-memt1 sm:text-xl lg:text-3xl">
            Membership Tiers
          </motion.h1>
          <motion.p
            variants={textVariants}
            className="mx-auto font-medium sm:px-[5px] lg:w-[77%] lg:text-lg"
          >
            Choose from various tiers to suits your needs. Each Cards grants
            access to voting rights, inverstment opportunities and exclusive
            Coop Network benefits, all tailred to your level of investment.
          </motion.p>
        </motion.div>
      </section>

      <section className="mt-8 flex flex-col justify-between lg:flex-row lg:space-x-8">
        {[
          {
            img: member,
            title: "Customer Membership Card",
            data: customerCardData,
          },
          {
            img: investor,
            title: "Investor Membership Card",
            data: investorCardData,
            contribution: "N100k",
          },
          {
            img: employee,
            title: "Employee Membership Card",
            data: employeeCardData,
            contribution: "N100k",
          },
        ].map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="flex-1 sm:mt-[1em] lg:mt-[0px]"
            custom={index}
            whileHover={{ y: -10 }}
          >
            <div className="relative">
              <motion.img
                src={card.img}
                alt={`${card.title.toLowerCase()}`}
                className="w-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              <div className="mt-[1.5em] flex flex-col">
                <motion.h1
                  variants={textVariants}
                  className="text-xl font-semibold text-howtext"
                >
                  {card.title}
                </motion.h1>
                {card.contribution && (
                  <motion.h2
                    variants={textVariants}
                    className="font-bold lg:text-center"
                  >
                    Member's Contribution: {card.contribution}
                  </motion.h2>
                )}
                <motion.ul className="mt-2 space-y-3 text-text1">
                  {card.data.map((item, idx) => (
                    <motion.li
                      key={idx}
                      variants={listItemVariants}
                      className="flex items-center gap-1"
                      custom={idx}
                    >
                      <img src={dot} alt="points" />
                      <span>{item.paragraph}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </motion.main>
  );
};

export default Card;
