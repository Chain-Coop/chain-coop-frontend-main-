import { motion } from "framer-motion";
import { MotionTypography } from "../../common/motionTypography";
import { Button, Typography } from "@material-tailwind/react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../shared/routes";

const How = () => {
  const stepsData = [
    {
      title: "Create Your Account",
      bgClass: "bg-how1",
      steps: [
        "Sign up by email or phone number.",
        "Verify your identity.",
        "Connect a payment method.",
      ],
    },
    {
      title: "Choose Your Savings Plan",
      bgClass: "bg-how2",
      steps: [
        "Select Flexible, Lock, or Strict Lock savings.",
        "Set savings amount and duration.",
        "Connect a payment method.",
      ],
    },
    {
      title: "Automate & Grow",
      bgClass: "bg-how3",
      steps: [
        "Set up recurring deposits.",
        "Track performance in real-time.",
        "Contribute together and grow purchasing power.",
      ],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const articleVariant = {
    hidden: { opacity: 0, x: -50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="m-auto mb-8 mt-[3em] max-w-7xl  sm:px-[1em] lg:mt-[8em]">
      <header className="flex flex-col justify-center gap-3 text-center">
        <MotionTypography
          variant="h1"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight md:text-3xl lg:text-4xl"
        >
          How It Works
        </MotionTypography>
        <Typography className="font-medium tracking-tight">
          3 Simple Steps to Start Saving
        </Typography>
      </header>

      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="mt-8 flex flex-col lg:flex-row lg:space-x-9"
      >
        {stepsData.map((step, index) => (
          <motion.article
            key={index}
            variants={articleVariant}
            whileHover={{ scale: 1.02 }}
            className={`relative my-4 flex flex-col justify-between rounded-xl ${step.bgClass} p-[2.5em] sm:h-[411px] md:h-[280px] lg:h-[411px] lg:w-1/3`}
          >
            <div className="relative z-10">
              <Typography
                variant="h1"
                className="text-2xl font-bold text-howtext"
              >
                {step.title}
              </Typography>
              <div className="mt-4 flex flex-col gap-3">
                {step.steps.map((text, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="mt-2 h-3 w-3 rounded-full bg-text2" />
                    <Typography className="font-medium text-howtext">
                      {text}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.section>
      <div className="mt-3 flex flex-col gap-3 text-center sm:px-4 lg:px-0">
        <Typography
          variant="h5"
          className="text-base sm:text-lg md:text-xl lg:text-2xl"
        >
          It's not just savings—it's smarter, more secure, and more rewarding
          savings.
        </Typography>
        <Link to={ROUTES.sign_in}>
          <Button
            className="mx-auto flex items-center gap-3 border-[2px] border-text2 text-text2"
            variant="outlined"
          >
            <Typography className="font-semibold">Sign Up for Free</Typography>
            <FaArrowRight size={20} />
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default How;
