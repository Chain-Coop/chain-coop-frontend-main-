import React from "react";
import { becomeData } from "../../../data/Data";
import Card from "../../common/Card";
import { motion } from "framer-motion";

const Become = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="mx-auto mb-[3em] flex items-center justify-center font-sans lg:w-[90%]">
      <div>
        <header className="px-4 py-8 text-center text-text4">
          <motion.h1
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold md:text-2xl lg:text-3xl"
          >
            Save Your Tomorrow with Stable, Inflation-Resistant Options{" "}
          </motion.h1>

          <motion.p
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0 }}
            className="mx-auto max-w-2xl px-4 text-sm md:text-base lg:text-lg"
          >
            Protect your wealth by savings in Naira, Dollars, Gold or BTC to
            preserve value over time
          </motion.p>
        </header>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-4 lg:grid-cols-2"
        >
          {becomeData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariant}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="h-full"
            >
              <Card className="flex h-full flex-col p-6 md:p-8 lg:p-5">
                <div className="flex-grow">
                  <h2 className="mb-4 text-lg font-bold">{item.title}</h2>
                  <p className="font-sans">{item.paragraph}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default Become;
