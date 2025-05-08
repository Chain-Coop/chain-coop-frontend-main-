import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typography } from "@material-tailwind/react";
import juwon from "../../Assets/png/footer/about/juwon.png";
import heather from "../../Assets/png/footer/about/heather.png";
import samad from "../../Assets/png/footer/about/samad.png";
import imageRight from "../../Assets/png/home/about-bg.png";
import aya from "../../Assets/png/home/abt-aya.png";
import lisk from "../../Assets/png/home/abt-lisk.png";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import { MotionTypography } from "../../components/common/motionTypography";
import CardComponent from "../../components/common/ImageCard";
import Footer from "../../components/common/Footer";

const AboutUs = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const topInvestors = [aya, lisk, aya, lisk];
  const bottomInvestors = [aya, lisk, aya, lisk];

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

  return (
    <div className="overflow-x-hidden">
      <NavBar />
      <main
        className={`relative mb-[2em] transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={staggerContainer}
          className="mx-auto flex w-full flex-col items-center py-8 text-center lg:px-2"
        >
          <div className="max-w-full px-4 text-center sm:px-6 lg:px-8">
            <MotionTypography
              variant="h1"
              variants={fadeInUp}
              className="text-xl font-bold sm:mt-2 md:text-[2em] lg:text-3xl"
            >
              About Chain Coop
            </MotionTypography>
            <Typography
              variants={fadeInUp}
              className="mx-auto mt-4 text-sm font-normal md:text-base lg:max-w-4xl lg:text-base"
            >
              At the core of our service is democratising savings for Africans
              and giving individuals and communities access to wealth. We are
              Nigeria's first digital cooperative building communal wealth
              through digital solutions for modern Nigerians. As a worker-owned
              co-op we are reshaping the future of work and investment
            </Typography>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={staggerContainer}
          className="relative w-full py-8 md:py-12 lg:py-[4em]"
        >
          <div className="absolute right-0 top-0 hidden md:block">
            <img src={imageRight} alt="" className="max-w-none" />
          </div>

          <div className="relative z-10 mx-auto w-full px-4 sm:px-6 lg:w-[82%] lg:px-8">
            <div className="text-center">
              <MotionTypography
                variant="h1"
                variants={fadeInUp}
                className="text-xl font-bold  md:text-[2em] lg:text-3xl"
              >
                Meet the <span className="text-purple-600">Co-op Team</span>
              </MotionTypography>
              <Typography
                variants={fadeInUp}
                className="mx-auto text-sm font-normal md:text-base lg:max-w-2xl lg:text-base"
              >
                We are a diverse highly motivated team of learners who
                collaborate daily to achieve significant results and
                continuously grow.
              </Typography>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-2">
              <Link to="https://www.linkedin.com/in/oluwajuwon-micheal?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                <CardComponent image={juwon} title="Data Engineer/CCO" />
              </Link>
              <Link to="https://www.linkedin.com/in/thedotconnector?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                <CardComponent image={heather} title="Advisor and Consultant" />
              </Link>
              <Link to="https://www.linkedin.com/in/abdulsamadgobir?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                <CardComponent image={samad} title="Product Manager / CMO" />
              </Link>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={staggerContainer}
          className="w-full py-8 md:py-12 lg:py-[4em]"
        >
          <div className="bg-[#FDFCFE] py-8 sm:py-12 lg:py-16">
            <MotionTypography
              variant="h1"
              variants={fadeInUp}
              className="mb-[2em] text-center text-xl font-semibold md:text-[2em] lg:text-3xl"
            >
              Meet our investors
            </MotionTypography>
            <div className="mb-8">
              <Marquee
                speed={40}
                gradient={true}
                gradientWidth={50}
                pauseOnHover={true}
              >
                <div className="flex items-center">
                  {topInvestors.map((img, index) => (
                    <div
                      key={index}
                      className="mx-4 flex justify-center sm:mx-8"
                    >
                      <img
                        src={img}
                        alt="investor"
                        className="h-auto w-[120px] max-w-[150px] sm:w-auto sm:max-w-[200px]"
                      />
                    </div>
                  ))}
                </div>
              </Marquee>
            </div>
            <div>
              <Marquee
                speed={40}
                gradient={true}
                gradientWidth={50}
                pauseOnHover={true}
                direction="right"
              >
                <div className="flex items-center">
                  {bottomInvestors.map((img, index) => (
                    <div
                      key={index}
                      className="mx-4 flex justify-center sm:mx-8"
                    >
                      <img
                        src={img}
                        alt="investor"
                        className="h-auto w-[120px] max-w-[150px] sm:w-auto sm:max-w-[200px]"
                      />
                    </div>
                  ))}
                </div>
              </Marquee>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
