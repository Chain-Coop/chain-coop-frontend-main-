import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import background from "../../../Assets/png/story/background.png";
import NavBar from "../../common/NavBar";
import { Button, Typography } from "@material-tailwind/react";
import { MotionTypography } from "../../common/motionTypography";
import Footer from "../../common/Footer";
import partner from "../../../Assets/png/home/parners.png";
import { ROUTES } from "../../../shared/routes";
import { Link } from "react-router-dom";
import trusted from "../../../Assets/svg/trusted.svg";
import drive from "../../../Assets/svg/drive.svg";
import bank from "../../../Assets/svg/bank.svg";
import expand from "../../../Assets/svg/expand.svg";
import PartnerModal from "./modals/PartnersModal";
import BecomeModal from "./modals/BecomeModal";

const PartnerWithUs = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isBecomeModalOpen, setIsBecomeModalOpen] = useState(false);

  const handlePartnerModalOpen = () => {
    setIsPartnerModalOpen(true);
  };

  const handlePartnerModalClose = () => {
    setIsPartnerModalOpen(false);
  };

  const handleBecomeModalOpen = () => {
    setIsBecomeModalOpen(true);
  };

  const handleBecomeModalClose = () => {
    setIsBecomeModalOpen(false);
  };

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
        className={`relative mb-[2em] font-sans transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="relative mb-[-28px] w-full"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
          }}
        >
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={staggerContainer}
            className="relative mx-auto flex w-full flex-col items-center px-4 text-center lg:w-[80%] lg:px-2 lg:py-[4em]"
          >
            <div className="relative z-10 max-w-full text-center">
              <MotionTypography
                variant="h1"
                variants={fadeInUp}
                className="text-[1.5em] font-bold sm:mt-2 lg:text-3xl"
              >
                Come build with us
              </MotionTypography>
              <Typography
                variants={fadeInUp}
                className="mt-4 text-xs font-normal text-gray-500 sm:text-sm lg:text-base"
              >
                At Chain Co-op everyone deserves the tools to achieve financial
                stability and growth. We're building a platform that bridges
                traditional and digital finance. empowering individuals and
                communities. We invite you to partner with us on this journey.
              </Typography>
              <Button
                onClick={handlePartnerModalOpen}
                className="relative mx-auto mt-[2em] flex items-center justify-center rounded-md bg-text2 p-4 text-center text-sm font-semibold text-text5"
              >
                Partner with us
              </Button>
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={staggerContainer}
            className="relative mx-auto flex w-full items-center justify-between  lg:w-[80%] lg:px-2 lg:py-[4em]"
          >
            <div className="flex flex-col gap-4">
              <Typography variant="h1" className="text-2xl font-bold">
                Why join Chain Coop?
              </Typography>
              <Typography
                variant="small"
                className="max-w-xl font-normal text-gray-500"
              >
                At Chain Co-op, we are on a mission to revolutionize and
                wealth-building for individuals and business across Africa.
                Parner with us and be a part of a financial ecosystem that
                promotes secure and innovative savings solutions. We offer a
                partner model designed for mutual growth and impact.
              </Typography>
              <Button
                onClick={handleBecomeModalOpen}
                className="mt-[2em] max-w-fit rounded-md bg-text2 p-4 text-sm font-semibold text-text5"
              >
                Become a Member
              </Button>
            </div>
            <img src={partner} alt="partnership image" className="w-50 h-60" />
          </motion.section>

          <motion.section className="relative mx-auto flex w-full flex-col items-center px-4 text-center lg:w-[80%] lg:px-2 lg:py-[12em]">
            <Typography variant="h3" className="mb-12 text-2xl font-bold">
              Interested in Chain Coop? Discover the benefits of
              <br />
              membership and partnership
            </Typography>

            <div className="flex w-full flex-col gap-8">
              <div className="flex flex-col justify-between gap-8 md:flex-row">
                <div className="flex gap-4 text-left">
                  <div className="flex-shrink-0">
                    <img src={trusted} alt="trusted" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography
                      variant="h4"
                      className="text-lg font-bold text-text2"
                    >
                      Trusted & Regulated Platform
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-500"
                    >
                      Chain Co-Op is a registered cooperative under the Lagos
                      Ministry for Commerce, Trade, and Cooperatives, ensuring
                      compliance and reliability.
                    </Typography>
                  </div>
                </div>

                <div className="flex gap-4 text-left">
                  <div className="flex-shrink-0">
                    <img src={bank} alt="bank" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography
                      variant="h4"
                      className="text-lg font-bold text-text2"
                    >
                      Bank-Grade Security
                    </Typography>
                    <Typography variant="small" className=" text-gray-500">
                      Your funds are protected with industry-standard security
                      measures, including encrypted transactions, cold wallet
                      storage, and proof of reserves.
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-8 md:flex-row">
                <div className="flex gap-4 text-left">
                  <div className="flex-shrink-0">
                    <img src={expand} alt="expand" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography
                      variant="h4"
                      className="text-lg font-bold text-text2"
                    >
                      Expand Your Reach
                    </Typography>
                    <Typography variant="small" className=" text-gray-500">
                      Leverage our growing network of savers and investors to
                      introduce your products and services to a financially
                      engaged audience.
                    </Typography>
                  </div>
                </div>

                <div className="flex gap-4 text-left">
                  <div className="flex-shrink-0">
                    <img src={drive} alt="drive" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography
                      variant="h4"
                      className="text-lg font-bold text-text2"
                    >
                      Drive Financial Inclusion
                    </Typography>
                    <Typography variant="small" className=" text-gray-500">
                      Support the movement to provide accessible and secure
                      wealth management solutions to underserved communities
                      across Africa.
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
      <div className="z-10 mt-[-4em]">
        <Footer />
      </div>
      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={handlePartnerModalClose}
      />
      <BecomeModal
        isOpen={isBecomeModalOpen}
        onClose={handleBecomeModalClose}
      />
    </div>
  );
};

export default PartnerWithUs;
