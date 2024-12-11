import React, { useState } from "react";
import "./explore.css";
import explore1 from "../../../../Assets/png/home/automated-ai.png";
import explore2 from "../../../../Assets/png/home/savings-group.png";
import explore3 from "../../../../Assets/png/home/savings-credit.png";
import { motion } from "framer-motion";
import { Primary } from "../../../common/Button";
import Modal from "../../../common/Modal";
import FirstModal from "./details/FirstModal";
import SecondModal from "./details/SecondModal";
import ThirdModal from "./details/ThirdModal";

const Explore = () => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecodModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);

  const handleFirstModalOpen = () => {
    setIsFirstModalOpen(true);
  };

  const handleFirstModalClose = () => {
    setIsFirstModalOpen(false);
  };

  const handleSecondModalOpen = () => {
    setIsSecodModalOpen(true);
  };

  const handleSecondModalClose = () => {
    setIsSecodModalOpen(false);
  };

  const handleThirdModalOpen = () => {
    setIsThirdModalOpen(true);
  };

  const handleThirdModalClose = () => {
    setIsThirdModalOpen(false);
  };

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
                Our AI-Driven Learning Platform will change how members learn
                and grow. Stay tuned for its launch.
              </p>
              <div className="tags">
                <span className="tag">Growth</span>
                <span className="tag">Education</span>
                <span className="tag">Partnership</span>
              </div>
              <Primary
                onClick={handleFirstModalOpen}
                className="mt-8 rounded-md bg-text2 px-5 py-2 font-semibold text-white transition-transform duration-300 hover:scale-110"
              >
                Learn More
              </Primary>
            </div>
          </div>

          <div className="card">
            <div className="poster">
              <img src={explore2} alt="explore-img" />
            </div>

            <div className="details">
              <h1>GROUP SAVINGS CYCLE</h1>
              <p className="desc">
                Get access to 5x your funds in Naira, Dollars, BTC, and more
                automaticallyand secured by Chain Co-op.
              </p>
              <div className="tags">
                <span className="tag">Growth</span>
                <span className="tag">Partnership</span>
                <span className="tag">Funding</span>
              </div>
              <Primary
                onClick={handleSecondModalOpen}
                className="mt-8 rounded-md bg-text2 px-5 py-2 font-semibold text-white transition-transform duration-300 hover:scale-110"
              >
                Learn More
              </Primary>
            </div>
          </div>

          <div className="card">
            <div className="poster">
              <img src={explore3} alt="Location Unknown" />
            </div>
            <div className="details">
              <h1>SAVINGS AND CREDIT AS A SERVICE</h1>
              <p className="desc">
                Launch your savings ad credit solution effortlessly using our
                API, and unlock endless opportunities for financial freedom.
              </p>
              <div className="tags">
                <span className="tag">Automation</span>
                <span className="tag"> Partnership</span>
                <span className="tag"> Developers </span>
              </div>
              <Primary
                onClick={handleThirdModalOpen}
                className="mt-8 rounded-md bg-text2 px-5 py-2 font-semibold text-white transition-transform duration-300 hover:scale-110"
              >
                Learn More
              </Primary>
            </div>
          </div>
        </div>
      </section>
      <Modal
        isOpen={isFirstModalOpen}
        className="bg-white"
        onClose={handleFirstModalClose}
      >
        <FirstModal />
      </Modal>
      <Modal
        isOpen={isSecondModalOpen}
        className="bg-white"
        onClose={handleSecondModalClose}
      >
        <SecondModal />
      </Modal>
      <Modal
        isOpen={isThirdModalOpen}
        className="bg-white"
        onClose={handleThirdModalClose}
      >
        <ThirdModal />
      </Modal>
    </main>
  );
};

export default Explore;
