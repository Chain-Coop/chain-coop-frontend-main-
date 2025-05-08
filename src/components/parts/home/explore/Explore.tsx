import "./explore.css";
import flexible from "../../../../Assets/png/home/flexible_savings.png";
import lock from "../../../../Assets/png/home/lock_savings.png";
import strict_lock from "../../../../Assets/png/home/strict_lock.png";
import { motion } from "framer-motion";
import { MotionTypography } from "../../../common/motionTypography";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../shared/routes";

const Explore = () => {
  return (
    <main className="container mx-auto mt-5 max-w-[82%] md:mt-0 lg:mt-0">
      <section className="w-full">
        <header className="mx-auto w-full py-6 text-center text-text4 md:py-8 lg:max-w-3xl lg:py-12">
          <MotionTypography
            variant="h1"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold md:text-3xl lg:text-4xl"
          >
            Savings Made Simple
          </MotionTypography>

          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-3 max-w-xl px-3"
          >
            <Typography className="mb-6 text-sm font-normal md:text-base lg:text-lg">
              Join hundreds of others using our smart lock savings options.
            </Typography>

            <Link to={ROUTES.sign_up} className="inline-block">
              <Button className="bg-text2 px-8 py-3 text-sm font-semibold normal-case text-text5 transition-all hover:opacity-90 md:text-base">
                Start Saving
              </Button>
            </Link>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Flexible Savings",
              image: flexible,
              description:
                "Savings at your convenience and access funds whenever needed.",
              tags: ["Accessible", "Convenient", "Liquidity"],
            },
            {
              title: "Lock Savings",
              image: lock,
              description:
                "We are committed to helping you reach your savings target. If you break your goal, you pay a 1% penalty fee for early withdrawal.",
              tags: ["Set Target", "Commit", "Execute"],
            },
            {
              title: "Strict Lock",
              image: strict_lock,
              description:
                "Build unshakable savings habits. Stay locked in; no withdrawals are allowed until you reach your selected target or timeline.",
              tags: ["Smartsave", "Easy Entry", "Simple Withdrawal"],
            },
          ].map((item, index) => (
            <div key={index} className="card mx-auto w-full">
              <div className="poster">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="details flex flex-col gap-3">
                <Typography
                  variant="h1"
                  className="text-lg font-bold md:text-xl"
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="small"
                  className="text-sm text-gray-800 md:text-base"
                >
                  {item.description}
                </Typography>
                <div className="tags text-text2">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="tag text-xs md:text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <div>
                  <Link to={ROUTES.sign_up}>
                    <Button className="mt-4 bg-text2 px-8 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105 md:text-base">
                      Start Saving
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Explore;
