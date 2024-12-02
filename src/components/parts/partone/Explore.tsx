import React from "react";
import "./explore.css";
import explore1 from "../../../Assets/png/home/project1.png";
import explore2 from "../../../Assets/png/home/prooject2.png";
import explore3 from "../../../Assets/png/home/project3.png";
import person1 from "../../../Assets/png/home/Co-op-PX1.png";
import person2 from "../../../Assets/png/home/Co-op-PX2.png";
import { motion } from "framer-motion";

const Explore = () => {
  return (
    <main className="flex h-full items-center justify-center font-sans sm:mt-[1em] lg:mt-[5em]">
      <section className="lg:w-[89%] lg:px-[0]">
        <header className="py-8 text-center text-text4">
          <motion.h1
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="mb-2 font-bold sm:text-[1em] md:text-2xl lg:text-3xl"
          >
            Explore Our Investment Opportunities
          </motion.h1>
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="m-auto lg:w-[53%]"
          >
            <p className="font-sans lg:mt-[1.5em]">
              Access low risk options that prioritize keeping your money safe.
            </p>
            <p className="font-sans">
              Invest in your tomorrow: Explore innovative, self-sustaining
              businesses backed by the power of blockchain and cooperative
              ownership.
            </p>
          </motion.div>
        </header>

        <div className="wrapper flex w-full flex-wrap items-center justify-center gap-[24px]">
          <div className="card">
            <div className="poster">
              <img src={explore1} alt="Location Unknown" />
            </div>
            <div className="details">
              <h1>Automated Ai Learning Platform</h1>
              <p className="desc">
                Our upcoming project leverages cutting-edge AI to streamline
                learning processes, designed to enhance productivity and unlock
                new growth opportunities for forward-thinking companies.
              </p>
              <div className="tags">
                <span className="tag">Investment</span>
                <span className="tag">Growth</span>
                <span className="tag">Innovation</span>
              </div>
              <div className="cast">
                <h3>Cast</h3>
                <ul>
                  <li>
                    <img
                      src={person1}
                      alt="Marco Andrews"
                      title="Marco Andrews"
                    />
                  </li>
                  <li>
                    <img
                      src={person2}
                      alt="Rebecca Floyd"
                      title="Rebecca Floyd"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="poster">
              <img src={explore2} alt="explore-img" />
            </div>
            <div className="details">
              <h1>Automated Ai Learning Platform</h1>
              <p className="desc">
                Our upcoming project leverages cutting-edge AI to streamline
                learning processes, designed to enhance productivity and unlock
                new growth opportunities for forward-thinking companies.
              </p>
              <div className="tags">
                <span className="tag">Investment</span>
                <span className="tag">Growth</span>
                <span className="tag">Innovation</span>
              </div>
              <div className="cast">
                <h3>Cast</h3>
                <ul>
                  <li>
                    <img
                      src={person1}
                      alt="Marco Andrews"
                      title="Marco Andrews"
                    />
                  </li>
                  <li>
                    <img
                      src={person2}
                      alt="Rebecca Floyd"
                      title="Rebecca Floyd"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="poster">
              <img src={explore3} alt="Location Unknown" />
            </div>
            <div className="details">
              <h1>Automated Ai Learning Platform</h1>
              <p className="desc">
                Our upcoming project leverages cutting-edge AI to streamline
                learning processes, designed to enhance productivity and unlock
                new growth opportunities for forward-thinking companies.
              </p>
              <div className="tags">
                <span className="tag">Investment</span>
                <span className="tag">Growth</span>
                <span className="tag">Innovation</span>
              </div>
              <div className="cast">
                <h3>Cast</h3>
                <ul>
                  <li>
                    <img
                      src={person1}
                      alt="Marco Andrews"
                      title="Marco Andrews"
                    />
                  </li>
                  <li>
                    <img
                      src={person2}
                      alt="Rebecca Floyd"
                      title="Rebecca Floyd"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Explore;
