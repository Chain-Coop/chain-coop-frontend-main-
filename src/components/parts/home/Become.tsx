import { becomeData } from "../../../data/Data";
import Card from "../../common/Card";
import { motion } from "framer-motion";
import { MotionTypography } from "../../common/motionTypography";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../shared/routes";

const Become = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="min-h-screen w-full px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col items-center gap-6 text-center text-text4 md:mb-12">
          <MotionTypography
            variant="h1"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl"
          >
            Build your digital wealth through{" "}
            <span className="text-text2">savings</span>
          </MotionTypography>

          <MotionTypography
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0 }}
            className="max-w-2xl text-sm font-normal sm:text-base md:text-lg"
          >
            Your journey to wealth starts here
          </MotionTypography>

          <Link to={ROUTES.sign_up}>
            <Button className="bg-text2 px-8 py-3 text-sm font-semibold text-text5 transition-all hover:opacity-90 sm:text-base">
              Start Growing your wealth
            </Button>
          </Link>
        </header>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 lg:grid-cols-2"
        >
          {becomeData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariant}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="h-full"
            >
              <Card className="flex h-full flex-col p-4 sm:p-6 md:p-8">
                <div className="flex-grow">
                  <Typography
                    variant="h2"
                    className="mb-3 text-base font-bold sm:text-lg md:text-xl lg:mb-4"
                  >
                    {item.title}
                  </Typography>
                  <Typography className="text-sm font-normal sm:text-base">
                    {item.paragraph}
                  </Typography>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default Become;
