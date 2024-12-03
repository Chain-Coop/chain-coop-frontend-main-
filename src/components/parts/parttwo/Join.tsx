import React from "react";
import { motion } from "framer-motion";

const Join = () => {
  return (
    <main className="mt-[1em] font-sans lg:mt-[6em]">
      <section>
        <div className=" text-center text-text4">
          <header>
            <motion.h1
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.5 }}
              className="mb-2 font-bold text-memt1 sm:text-xl lg:text-3xl"
            >
              Join Chain Co-op Today
            </motion.h1>
          </header>
          <article className="mx-auto sm:px-[5px] lg:w-[70%]">
            <motion.p
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.7 }}
              className="font-medium lg:text-lg"
            >
              Becoming a Chain Co-op is simple and secure. Your membership is
              represented{" "}
              <span className="ml-2 text-red-500">by a digital NFT Card </span>
              ensuring your ownership and invesment are securely tracked through
              block chain. Limited to 3000 early members - don't miss your
              chance.
            </motion.p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Join;
