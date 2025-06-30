import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import background from "../../Assets/png/home/partner-wave.png";
import { Button, Typography } from "@material-tailwind/react";
import partner from "../../Assets/png/home/parners.png";
import trusted from "../../Assets/svg/trusted.svg";
import drive from "../../Assets/svg/drive.svg";
import bank from "../../Assets/svg/bank.svg";
import expand from "../../Assets/svg/expand.svg";
import PartnerModal from "./modals/PartnersModal";
import { Link } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import { MotionTypography } from "../../components/common/motionTypography";
import { ROUTES } from "../../shared/routes";
import Footer from "../../components/common/Footer";

const PartnerWithUs = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isBecomeModalOpen, setIsBecomeModalOpen] = useState(false);

  const handlePartnerModalOpen = () => setIsPartnerModalOpen(true);
  const handlePartnerModalClose = () => setIsPartnerModalOpen(false);
  const handleBecomeModalOpen = () => setIsBecomeModalOpen(true);
  const handleBecomeModalClose = () => setIsBecomeModalOpen(false);

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
        <div
          className="relative -mb-[-30px] w-full"
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
            className="relative mx-auto flex w-full flex-col items-center px-4 py-8 text-center lg:w-[80%] lg:px-2 lg:py-[4em]"
          >
            <div className="relative z-10 max-w-full text-center">
              <MotionTypography
                variant="h1"
                variants={fadeInUp}
                className="text-xl font-bold sm:text-2xl lg:text-3xl"
              >
                Come Build with Us
              </MotionTypography>
              <Typography
                variants={fadeInUp}
                variant="small"
                className="mt-4 px-4 font-normal text-gray-500 lg:px-0"
              >
                At Chain Co-op, we believe everyone should have access to the
                tools and resources to shape the future they want.
                <br className="hidden sm:block" />
                We're creating a platform that empowers individuals and
                communities to learn, share skills, and grow together. Join us
                on this journey of collective growth.
              </Typography>
              <Button
                onClick={handlePartnerModalOpen}
                className="relative mx-auto mt-6 flex items-center justify-center rounded-md bg-text2 px-6 py-3 text-center text-sm font-semibold normal-case text-text5 sm:mt-8"
              >
                Partner with Us
              </Button>
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={staggerContainer}
            className="relative mx-auto flex w-full flex-col-reverse items-center justify-between gap-8 px-4 py-8 lg:w-[80%] lg:flex-row lg:px-2 lg:py-[4em]"
          >
            <div className="flex flex-col gap-4 text-center lg:text-left">
              <Typography
                variant="h1"
                className="text-2xl font-bold sm:text-3xl"
              >
                Why Join Chain Co-op?
              </Typography>
              <Typography
                variant="small"
                className="max-w-xl text-sm font-normal text-gray-500 sm:text-base"
              >
                At Chain Co-op, we are on a mission to revolutionize how
                communities learn, collaborate, and access shared tools. By
                partnering with us, you contribute to fostering communal
                discipline, shared knowledge, and strategies that encourage
                collective growth. We offer a partnership model designed to
                create mutual success and impact.
              </Typography>
              <Link to={ROUTES.sign_up}>
                <Button className="mx-auto mt-6 max-w-fit rounded-md bg-text2 px-6 py-3 text-sm font-semibold normal-case text-text5 lg:mx-0 lg:mt-8">
                  Become a Member
                </Button>
              </Link>
            </div>
            <img
              src={partner}
              alt="Partnership image"
              className="h-48 w-auto sm:h-60 lg:h-72"
            />
          </motion.section>
          <motion.section className="relative mx-auto flex w-full flex-col items-center px-4 py-12 text-center lg:w-[80%] lg:px-2 lg:py-[8em]">
            <Typography
              variant="h3"
              className="mb-8 text-xl font-bold tracking-tight sm:text-2xl lg:mb-12"
            >
              Interested in Chain Co-op? Discover the benefits of
              <br className="hidden sm:block" />
              membership and partnership.
            </Typography>

            <div className="flex w-full flex-col gap-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="flex flex-col gap-4 text-left sm:flex-row">
                  <div className="flex-shrink-0">
                    <img
                      src={trusted}
                      alt="trusted"
                      className="mx-auto sm:mx-0"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography
                      variant="h4"
                      className="text-center text-lg font-bold tracking-tight text-text2 sm:text-left"
                    >
                      Trusted & Regulated Platform
                    </Typography>
                    <Typography
                      variant="small"
                      className="text-center font-normal text-gray-500 sm:text-left"
                    >
                      Chain Co-op is a registered cooperative under the Lagos
                      Ministry for Commerce, Trade, and Cooperatives, ensuring
                      compliance and reliability.
                    </Typography>
                  </div>
                </div>

                <div className="flex flex-col gap-4 text-left sm:flex-row">
                  <div className="flex-shrink-0">
                    <img src={bank} alt="bank" className="mx-auto sm:mx-0" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography
                      variant="h4"
                      className="text-center text-lg font-bold text-text2 sm:text-left"
                    >
                      Expand Your Reach
                    </Typography>
                    <Typography
                      variant="small"
                      className="text-center text-gray-500 sm:text-left"
                    >
                      Connect with our growing network of learners, educators,
                      and community-driven individuals to share your knowledge,
                      products, or services with an engaged audience focused on
                      personal and communal growth.
                    </Typography>
                  </div>
                </div>

                <div className="flex flex-col gap-4 text-left sm:flex-row">
                  <div className="flex-shrink-0">
                    <img
                      src={expand}
                      alt="expand"
                      className="mx-auto sm:mx-0"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography
                      variant="h4"
                      className="text-center text-lg font-bold text-text2 sm:text-left"
                    >
                      Expand Your Reach
                    </Typography>
                    <Typography
                      variant="small"
                      className="text-center text-gray-500 sm:text-left"
                    >
                      Leverage our growing network of savers and investors to
                      introduce your products and services to a financially
                      engaged audience.
                    </Typography>
                  </div>
                </div>

                <div className="flex flex-col gap-4 text-left sm:flex-row">
                  <div className="flex-shrink-0">
                    <img src={drive} alt="drive" className="mx-auto sm:mx-0" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography
                      variant="h4"
                      className="text-center text-lg font-bold text-text2 sm:text-left"
                    >
                      Drive Community Growth
                    </Typography>
                    <Typography
                      variant="small"
                      className="text-center text-gray-500 sm:text-left"
                    >
                      Support the movement to drive individual growth that will
                      lead to communal impact through disciplined and consistent
                      actions.
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
      <div className="z-10 -mt-[6em]">
        <Footer />
      </div>
      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={handlePartnerModalClose}
      />
    </div>
  );
};

export default PartnerWithUs;
