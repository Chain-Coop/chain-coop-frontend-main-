import React from "react";
import { meetImage } from "../../../data/Data";
import { motion } from "framer-motion";

const Meet = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="mx-auto grid items-center justify-center font-sans sm:-mt-[1em] sm:px-[1em] lg:mt-[7em] lg:w-[90%] lg:px-[0]">
      <div>
        <header className="text-center text-text4">
          <motion.h1
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="mb-2 gap-1 text-xl font-bold lg:text-3xl"
          >
            Meet Your
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="ml-1 font-sans text-text2 sm:text-2xl lg:text-3xl"
            >
              Co-op Community
            </motion.span>
          </motion.h1>
        </header>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-[2em] grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-3"
        >
          {meetImage.map((item, index) => (
            <motion.img
              key={index}
              variants={imageVariant}
              whileHover={{ scale: 1.05 }}
              src={item.src}
              alt={`Person ${index + 1}`}
              className="rounded-md"
            />
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default Meet;
