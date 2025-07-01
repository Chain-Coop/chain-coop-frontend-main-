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
    <main className="container mx-auto mt-5 px-2 md:mt-0 md:max-w-7xl md:px-0 lg:mt-0">
      <section className="w-full">
        <header className="mx-auto w-full py-6 text-center text-text4 md:py-8 lg:max-w-3xl lg:py-12">
          <MotionTypography
            variant="h1"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold md:text-3xl lg:text-4xl"
          >
            Community Made Simple for you
          </MotionTypography>

          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-3 max-w-xl px-3"
          >
            <Typography className="mb-6 text-lg font-normal">
              Join hundreds of others who are strengthening their community
              through shared goals.
            </Typography>

            <Link to={ROUTES.sign_up} className="inline-block">
              <Button className="bg-text2 px-8 py-3 text-sm font-semibold normal-case text-text5 transition-all hover:opacity-90">
                Start Here
              </Button>
            </Link>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Flexible Participation ",
              image: flexible,
              description:
                "Engage when and how it suits you, and access the benefits of being part of a thriving cooperative.",
              tags: ["Accessible", "Convenient", "Liquidity"],
            },
            {
              title: "Voluntary Commitments",
              image: lock,
              description:
                "Make voluntary contributions that help you and others in your cooperative achieve shared goals. Our platform supports full flexibility for members.",
              tags: ["Set Target", "Commit", "Execute"],
            },
            {
              title: "Strict Commitments",
              image: strict_lock,
              description:
                "Stay committed to the goals of your cooperative. Voluntary contributions are strictly for members, and your participation is essential for collective success.",
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
                      Join Us
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
