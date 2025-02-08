import { Link } from "react-router-dom";
import subicon from "../../../Assets/png/home/subicon.png";
import { motion } from "framer-motion";
import { Button, Typography } from "@material-tailwind/react";
import { MotionTypography } from "../../common/motionTypography";
import { ROUTES } from "../../../shared/routes";

const container = (delay: any) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});

const HeroSection = () => {
  return (
    <main className="relative flex w-full flex-col font-sans lg:flex-row">
      <div className="flex items-center px-4 py-5 lg:w-1/2 lg:px-[4em] lg:py-[10em]">
        <div className="max-w-xl">
          <div className="mb-4 lg:mb-6">
            <MotionTypography
              variant="h1"
              variants={container(0.5)}
              initial="hidden"
              animate="visible"
              className="text-xl font-bold lg:text-4xl"
            >
              Save Smarter, Grow <br />
              Faster
              <span className="text-text2"> with Chain Co-op</span>
            </MotionTypography>
          </div>
          <MotionTypography
            variants={container(1)}
            initial="hidden"
            animate="visible"
            variant="small"
            className="mb-6 font-medium text-gray-600 sm:text-base lg:mb-8"
          >
            Your all-in-one platform for automated savings in Naira and crypto
          </MotionTypography>
          <motion.div
            variants={container(1)}
            initial="hidden"
            animate="visible"
            className="flex flex-row gap-3 sm:gap-6"
          >
            <Link to={ROUTES.sign_up} className="flex-shrink-0">
              <Button
                variant="small"
                className="bg-text2 px-4 py-3 text-center transition-all hover:bg-opacity-90 sm:px-5 sm:py-4"
              >
                <Typography className="text-sm font-semibold text-text5 sm:text-base">
                  Start Saving
                </Typography>
              </Button>
            </Link>
            <Button className="flex flex-shrink-0 items-center justify-center rounded-md bg-white px-4 py-3 text-sm font-semibold text-text2 shadow-xl transition-all hover:bg-gray-50 sm:px-5 sm:py-4 sm:text-base">
              <img
                src={subicon}
                className="mr-2 h-5 w-5 sm:h-6 sm:w-6"
                alt="Subicon"
              />
              50+ Subscribers
            </Button>
          </motion.div>
        </div>
      </div>
      <div className="hidden w-full bg-heroBackground bg-cover bg-center bg-no-repeat lg:block lg:h-auto lg:w-1/2"></div>
    </main>
  );
};

export default HeroSection;
