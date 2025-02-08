import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import background from "../../../Assets/png/story/background.png";
import NavBar from "../../common/NavBar";
import Footer from "../../common/Footer";
import { Typography } from "@material-tailwind/react";
import { MotionTypography } from "../../common/motionTypography";
import { Linkedin, X } from "../../../Assets/svg";
import { teamMembers } from "../../../data/Data";

const Team = () => {
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

  const TeamMemberCard = ({ member }: any) => (
    <div className="flex flex-col items-center p-4 text-center">
      <div className="h-32 w-32 overflow-hidden rounded-full sm:h-40 sm:w-40 md:h-48 md:w-48">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover"
        />
      </div>
      <Typography variant="h1" className="mt-4 text-xl font-bold sm:text-2xl">
        {member.name}
      </Typography>
      <Typography className="mt-1 text-base font-medium text-text2 sm:text-lg">
        {member.role}
      </Typography>
      <Typography className="max-w-sm py-3 text-xs font-normal sm:text-sm">
        {member.description}
      </Typography>
      <div className="flex justify-center gap-3">
        <X />
        <Linkedin />
      </div>
    </div>
  );

  return (
    <div className="overflow-x-hidden">
      <NavBar />
      <main
        className={`relative mb-[2em] font-sans transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="relative ml-auto w-full pb-[4em] sm:pb-[6em] lg:pb-[8em]"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
          }}
        >
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={staggerContainer}
            className="relative mx-auto flex w-full max-w-5xl flex-col items-center py-4 text-center sm:py-8 md:py-12 lg:py-[4em]"
          >
            <div className="relative z-10 max-w-2xl px-4 text-center">
              <MotionTypography
                variant="h1"
                variants={fadeInUp}
                className="text-lg font-bold sm:mt-2 sm:text-xl md:text-2xl lg:text-3xl"
              >
                Meet our Leaders
              </MotionTypography>
              <Typography
                variants={fadeInUp}
                className="mx-auto mt-2 text-xs font-normal text-gray-500 sm:mt-4 sm:text-sm md:text-base"
              >
                Our Team of worker-owners comes from diverse backgrounds in tech
                and entrepreneurship, united by a shared mission of transforming
                the cooperative space
              </Typography>
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={staggerContainer}
            className="relative mx-auto max-w-5xl px-4"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:gap-12">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </motion.section>
        </div>
      </main>
      <div className="z-10 mt-[-4em]">
        <Footer />
      </div>
    </div>
  );
};

export default Team;
