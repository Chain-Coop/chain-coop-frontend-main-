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
    <main className="mt-10 px-2 md:px-0 lg:mt-16">
      <div>
        <header className="flex flex-col items-center text-center text-text4">
          <MotionTypography
            variant="h1"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold md:text-3xl"
          >
            Build your digital wealth through{" "}
            <span className="text-text2">savings</span>
          </MotionTypography>

          <MotionTypography
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0 }}
            className="mt-3 max-w-2xl font-normal lg:text-lg"
          >
            Your journey to wealth starts here.
          </MotionTypography>

          <Link to={ROUTES.sign_up}>
            <Button className="mt-3 bg-text2 px-8 py-3 text-sm font-semibold normal-case text-text5 transition-all hover:opacity-90 sm:text-base">
              Start Growing Your Wealth
            </Button>
          </Link>
        </header>
        <section className="container mx-auto px-4 lg:max-w-[75%] lg:px-0">
          <div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-6"
            >
              {becomeData.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariant}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="h-full"
                >
                  <Card className="flex flex-col p-6 lg:p-16">
                    <div className="flex-grow">
                      <Typography
                        variant="h2"
                        className="mb-4 text-xl font-bold tracking-tight"
                      >
                        {item.title}
                      </Typography>
                      <Typography className="text-lg font-normal leading-normal">
                        {item.paragraph}
                      </Typography>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Become;
