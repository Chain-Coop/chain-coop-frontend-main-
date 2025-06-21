import { Link } from "react-router-dom";
import subicon from "../../../Assets/png/home/subicon.png";
import { motion } from "framer-motion";
import { Button, Typography } from "@material-tailwind/react";
import { MotionTypography } from "../../common/motionTypography";
import { ROUTES } from "../../../shared/routes";

const container = (delay: number) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});

const HeroSection = () => {
  return (
    <main className="relative mt-3 flex w-full flex-col md:mt-0 lg:flex-row">
      <div className="flex items-center px-4 md:px-8 lg:flex-1 lg:px-8 xl:px-12">
        <div className="mx-auto w-full max-w-none lg:max-w-fit">
          <MotionTypography
            variant="h1"
            variants={container(0.5)}
            initial="hidden"
            animate="visible"
            className="mb-2 text-2xl font-bold tracking-tight lg:mb-8 lg:text-5xl"
          >
            Save Smarter, Grow <br /> Faster{" "}
            <span className="text-text2">with Chain Co-op</span>
          </MotionTypography>
          <MotionTypography
            variants={container(1)}
            initial="hidden"
            animate="visible"
            variant="small"
            className="mb-8 font-normal tracking-tight text-gray-600 lg:text-lg"
          >
            Your all-in-one platform for automated savings <br /> in crypto and
            digital assets
          </MotionTypography>

          <motion.div
            variants={container(1)}
            initial="hidden"
            animate="visible"
            className="flex flex-row flex-wrap gap-4 sm:gap-6 lg:gap-8"
          >
            <Link to={ROUTES.sign_up} className="flex-shrink-0">
              <Button
                variant="text"
                className="bg-text2 px-6 py-3 text-center normal-case transition-all duration-300 hover:bg-text2 hover:bg-opacity-90 hover:shadow-lg"
              >
                <Typography className="text-sm font-semibold text-text5 sm:text-base">
                  Start Saving
                </Typography>
              </Button>
            </Link>
            <Button className="flex flex-shrink-0 items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold normal-case text-text2 shadow-xl transition-all duration-300 hover:bg-gray-50 hover:shadow-2xl sm:text-base">
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

      <div className="hidden flex-1 lg:block">
        <div className="h-full min-h-[60vh] w-full bg-heroBackground bg-cover bg-center bg-no-repeat lg:min-h-[92vh]"></div>
      </div>
    </main>
  );
};

export default HeroSection;
