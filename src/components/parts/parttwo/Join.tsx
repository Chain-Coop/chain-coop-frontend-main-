import React from "react";
import { motion } from "framer-motion";

const Join = () => {
  return (
    <main className="mt-[1em]  lg:mt-[6em]">
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
              Becoming a Chain Co-op is simple and secure. Your membership
              ensures that your ownership and investment are effortlessly
              tracked. with only limited spots for early members, seize this
              exclusive opportunity to elevate your financial power.
            </motion.p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Join;
