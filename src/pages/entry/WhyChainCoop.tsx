import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import background from "../../Assets/png/story/background.png";
import imageLeft from "../../Assets/png/home/what-we-doL.png";
import imageRight from "../../Assets/png/home/what-we-doR.png";
import lady from "../../Assets/png/home/lady.png";
import investor from "../../Assets/png/home/investor.png";
import investor2 from "../../Assets/png/home/investor2.png";
import investor3 from "../../Assets/png/home/investor3.png";
import investor4 from "../../Assets/png/home/investor4.png";
import investor5 from "../../Assets/png/home/investor5.png";
import { Typography } from "@material-tailwind/react";
import box1 from "../../Assets/png/home/box1.png";
import box2 from "../../Assets/png/home/box2.png";
import box3 from "../../Assets/png/home/box3.png";
import box4 from "../../Assets/png/home/box4.png";
import box5 from "../../Assets/png/home/box5.png";
import NavBar from "../../components/common/NavBar";
import { MotionTypography } from "../../components/common/motionTypography";
import Footer from "../../components/common/Footer";

const WhyChainCoop = () => {
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

  return (
    <div className="overflow-x-hidden">
      <NavBar />
      <main
        className={`relative transition-opacity duration-300 lg:mb-[2em] ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="relative z-10 w-full lg:mb-[-28px]"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
          }}
        >
          <section className="relative mx-auto flex w-full flex-col items-center px-2 py-8 text-center md:py-[4em]">
            <div className="relative z-10 max-w-full px-1 text-center md:px-1 lg:px-2">
              <MotionTypography
                variant="h1"
                variants={fadeInUp}
                className="text-xl font-bold sm:mt-2 md:text-[2em] lg:text-3xl"
              >
                Building communal wealth for Africans, one
                <br className="hidden sm:block" /> person at a time.
              </MotionTypography>
              <Typography
                variants={fadeInUp}
                className="mx-auto mt-4 text-sm font-normal text-gray-500 md:text-base lg:max-w-2xl lg:text-base"
              >
                Chain Co-op provides a secure platform for members to save,
                hedge against inflation, and access loans, creating a
                cooperative savings ecosystem focused on members' security and
                stability.
              </Typography>
            </div>
          </section>

          <section className="relative z-10 flex flex-col gap-6 overflow-hidden pt-8 text-white sm:gap-8 lg:-mt-1 lg:mr-0 lg:flex-row lg:gap-0">
            <div
              className="relative mr-auto h-[370px] w-full md:h-[400px] lg:h-[450px] lg:w-[38%]"
              style={{
                backgroundImage: `url(${imageRight})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 flex flex-col justify-center px-16 lg:px-20">
                <motion.h2
                  variants={fadeInUp}
                  className="mb-4 text-xl font-semibold sm:text-2xl lg:text-3xl"
                >
                  Who we are
                </motion.h2>
                <MotionTypography
                  variant="small"
                  variants={fadeInUp}
                  className="text-sm font-normal lg:text-base"
                >
                  Chain Co-op provides a secure platform for members to save,
                  hedge against inflation, and build wealth. We're breaking down
                  traditional wealth-building barriers and introducing a digital
<<<<<<< HEAD
                  saving culture with crypto, putting financial empowerment
                  within everyone's reach.
=======
                  saving culture, putting financial empowerment within
                  everyone's reach.
>>>>>>> f09838306ba95944619fd460a897adf872c4aec1
                </MotionTypography>
              </div>
            </div>

            <div className="hidden lg:flex lg:w-1/3 lg:justify-between lg:py-[3em]">
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
            </div>

            <div
              className="relative h-[370px] w-full md:h-[400px] lg:h-[450px] lg:w-[38%]"
              style={{
                backgroundImage: `url(${imageLeft})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 flex flex-col justify-center px-16 lg:px-20">
                <MotionTypography
                  variant="h2"
                  variants={fadeInUp}
                  className="mb-4 text-xl font-semibold sm:text-2xl lg:text-3xl"
                >
                  What we stand for
                </MotionTypography>
                <MotionTypography
                  variant="small"
                  variants={fadeInUp}
                  className="text-sm font-normal lg:text-base"
                >
                  Wealth creation, empowerment, and inclusion are at the core of
                  what we stand for. Our values guide what we do at Chain Co-op.
                  We are focused on building a secure and transparent savings
                  platform that bridges traditional and digital finance,
                  empowering individuals and communities to achieve financial
                  stability and growth.
                </MotionTypography>
              </div>
            </div>
          </section>

          <section className="relative mx-auto flex w-full flex-col items-center px-4 lg:w-[74%] lg:px-2 lg:py-[4em]">
            <div className="relative z-10 mt-[1.5em] max-w-full px-2 text-center sm:px-4">
              <MotionTypography
                variant="h1"
                variants={fadeInUp}
                className="text-xl font-bold sm:mt-2 md:text-[1.5em]"
              >
                Join Early and Multiply Your Savings with Exclusive{" "}
                <br className="hidden sm:block" /> Multiple Currency Cycles.
              </MotionTypography>
              <Typography
                variants={fadeInUp}
                className="mt-4 text-sm font-normal text-gray-500 sm:text-sm lg:text-base"
              >
                Access 5x your funds by participating in Chain Co-Op’s powerful
                saving cycles.
              </Typography>
              <Typography
                variant="h5"
                className="text-sm font-semibold sm:text-base"
              >
                Limited Spots Available!
              </Typography>
            </div>

            <div className="mt-8 flex w-full flex-col gap-12 sm:mt-12 sm:gap-16 lg:mt-16 lg:gap-24">
              <div className="flex flex-col items-center justify-between md:flex-row md:gap-[3em] lg:gap-[7em]">
                <div className="order-2 flex flex-1 flex-col gap-4 p-4 sm:p-6 md:order-1 lg:p-8">
                  <Typography
                    variant="h5"
                    className="text-center text-xl text-text2 lg:text-start lg:text-lg"
                  >
                    Blockchain-Powered Security
                  </Typography>
                  <Typography
                    variant="small"
                    className="text-center text-sm font-normal lg:text-start"
                  >
                    Your savings are protected by cutting-edge blockchain
                    technology, ensuring transparency, security, and peace of
                    mind. Say goodbye to data breaches and unauthorized access.
                  </Typography>
                </div>
                <div className="order-1 mt-4 md:order-2 md:mt-0">
                  <img
                    src={box1}
                    alt="Blockchain Security"
                    className="w-full max-w-[300px] md:max-w-none"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center justify-between md:flex-row md:gap-[3em] lg:gap-[7em]">
                <div className="order-2 flex flex-1 flex-col gap-4 p-4 sm:p-6 md:order-2 lg:p-8">
                  <Typography
                    variant="h5"
                    className="text-center text-xl text-text2 lg:text-start lg:text-lg"
                  >
                    Save in Multiple Currencies
                  </Typography>
                  <Typography
                    variant="small"
                    className="text-center text-sm font-normal lg:text-start"
                  >
<<<<<<< HEAD
                    Choose how you want to save—whether in dollars, crypto, or
=======
                    Choose how you want to save—whether in dollars, naira, or
>>>>>>> f09838306ba95944619fd460a897adf872c4aec1
                    even gold. Our platform adapts to your preferences, giving
                    you the freedom to diversify your savings like never before.
                  </Typography>
                </div>
                <div className="order-1 mt-4 md:order-1 md:mt-0">
                  <img
                    src={box2}
                    alt="Multiple Currencies"
                    className="w-full max-w-[300px] md:max-w-none"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center justify-between md:flex-row md:gap-[3em] lg:gap-[7em]">
                <div className="order-2 flex flex-1 flex-col gap-4 p-4 sm:p-6 md:order-1 lg:p-8">
                  <Typography
                    variant="h5"
                    className="text-center text-xl text-text2 lg:text-start lg:text-lg"
                  >
                    Auto-Savings for Your Convenience
                  </Typography>
                  <Typography
                    variant="small"
                    className="text-center text-sm font-normal lg:text-start"
                  >
                    Take the hassle out of saving with our auto-savings feature.
                    Set your goal, customize your schedule, and watch your
                    savings grow effortlessly—all on autopilot.
                  </Typography>
                </div>
                <div className="order-1 mt-4 md:order-2 md:mt-0">
                  <img
                    src={box3}
                    alt="Auto Savings"
                    className="w-full max-w-[300px] md:max-w-none"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div
          className="lg:min-[100vh] relative ml-auto w-full pb-[4em] lg:pb-[8em]"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <section className="relative mx-auto flex w-full flex-col items-center px-4 pt-8 sm:pt-12 lg:w-[74%] lg:px-2 lg:py-[4em]">
            <div className="mt-8 flex w-full flex-col gap-12 sm:mt-12 sm:gap-16 lg:mt-16 lg:gap-24">
              <section className="flex flex-col items-center justify-between md:flex-row md:gap-[3em] lg:gap-[7em]">
                <div className="order-2 flex flex-1 flex-col gap-4 p-4 sm:p-6 md:order-1 lg:p-8">
                  <Typography
                    variant="h5"
                    className="text-center text-xl text-text2 lg:text-start lg:text-lg"
                  >
                    Blockchain-Powered Security
                  </Typography>
                  <Typography
                    variant="small"
                    className="text-center text-sm font-normal lg:text-start"
                  >
                    Your savings are protected by cutting-edge blockchain
                    technology, ensuring transparency, security, and peace of
                    mind. Say goodbye to worries about data breaches or
                    unauthorized access.
                  </Typography>
                </div>
                <div className="order-1 mt-4 md:order-2 md:mt-0">
                  <img
                    src={box4}
                    alt="Blockchain Security"
                    className="w-full max-w-[300px] md:max-w-none"
                  />
                </div>
              </section>

              <section className="flex flex-col items-center justify-between md:flex-row md:gap-[3em] lg:gap-[7em]">
                <div className="order-2 flex flex-1 flex-col gap-4 p-4 sm:p-6 md:order-2 lg:p-8">
                  <Typography
                    variant="h5"
                    className="text-center text-xl text-text2 lg:text-start lg:text-lg"
                  >
                    Save in Multiple Currencies
                  </Typography>
                  <Typography
                    variant="small"
                    className="text-center text-sm font-normal lg:text-start"
                  >
<<<<<<< HEAD
                    Choose how you want to save—in dollars, crypto, or even
                    gold. Our platform adapts to your preferences, giving you
                    the freedom to diversify your savings like never before.
=======
                    Choose how you want to save—in dollars, naira, or even gold.
                    Our platform adapts to your preferences, giving you the
                    freedom to diversify your savings like never before.
>>>>>>> f09838306ba95944619fd460a897adf872c4aec1
                  </Typography>
                </div>
                <div className="order-1 mt-4 md:order-1 md:mt-0">
                  <img
                    src={box5}
                    alt="Multiple Currencies"
                    className="w-full max-w-[300px] md:max-w-none"
                  />
                </div>
              </section>
            </div>
          </section>
        </div>
      </main>
      <div className="z-10 mt-[-5em]">
        <Footer />
      </div>
    </div>
  );
};

export default WhyChainCoop;
