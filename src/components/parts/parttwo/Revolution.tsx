// import React from "react";

// const Revolution = () => {z
//   return (
//     <main className="mx-auto flex items-center justify-center font-sans sm:mt-[2em] sm:px-[7px] lg:mt-[5em]  lg:px-0">
//       <section>
//         <header className="text-center text-text4">
//           <h1 className="mb-2 font-bold sm:text-xl lg:text-3xl">
//             Confidence in Every Step
//           </h1>
//         </header>
//         <article className="text-center text-base font-medium text-text4 sm:w-full">
//           <div>
//           <p className="font-sans m-auto text-center w-full lg:w-[65%]">
//          Your digital membership card, secured by blockchain, provides you with seemless registration ,
//         transparent ownership, and guanteed returns on your investment.
//           </p>
//           </div>
//         </article>

//         <section className="mt-[2em] ">
//           <div className="rectangle1 mx-auto w-full rounded-2xl bg-rec1 p-[3em] shadow-md ">
//             <div className="sm:w-full lg:w-[72%]">
//               <h3 className="font-bold text-howtext sm:text-xl lg:text-2xl">
//                  Guranteed Returns & Growth
//               </h3>
//               <div className="mt-[1em]">
//                 <p className="font-lg font-medium">
//                   Recieve annual dividends based on your contribution, with opportunities to further
//                   investment at fixed interest rate
//                 </p>
//                 <p  className="font-lg mt-[1em] font-medium">safe, simple and legally protected.</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="mt-[2em] ">
//           <div className="mx-auto w-full rounded-2xl bg-rec2 p-[3em] shadow-md ">
//             <div className="sm:w-full lg:w-[71%]">
//               <h3 className="font-bold text-howtext sm:text-xl lg:text-2xl">
//                 Access To Funding And Portfolio Grwoth
//               </h3>
//               <div className="mt-[1em]">
//                 <p className="font-lg font-sans font-medium">
//                Gain early access to early rounds, build you portfolio, and track your Progress with quarterly performance
//                reports.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="mt-[2em] ">
//           <div className="rectangle1 mx-auto w-full rounded-2xl bg-rec1 p-[3em] shadow-md ">
//             <div className="sm:w-full lg:w-[71%] ">
//               <h3 className="font-bold  text-howtext sm:text-xl lg:text-2xl">
//                Shape the Future
//               </h3>
//               <div className="mt-[1em]">
//                 <p className="font-lg font-medium">
//                 Join as an active participant in project development and decision-making, helping grow
//                 the cooperative ecosystem with your feedbacks.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="mt-[2em] ">
//           <div className="mx-auto w-full rounded-2xl bg-rec3 p-[3em] shadow-md ">
//             <div className="sm:w-full lg:w-[71%]">
//               <h3 className="font-sans font-bold text-howtext sm:text-xl lg:text-2xl">
//                 Collaborate & connect
//               </h3>
//               <div className="mt-[1em]">
//                 <p className="font-lg font-medium">
//                  Join exclusive meetings and online discusions with fellow investors and experts,
//                  gain valuable insights while growing your network in the shared community.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="mt-[2em] ">
//           <div className="rectangle1 mx-auto w-full rounded-2xl bg-rec2 p-[3em] shadow-md ">
//             <div className="sm:w-full lg:w-[71%]">
//               <h3 className="font-sans font-bold text-howtext sm:text-xl lg:text-2xl">
//                 Investing In The Future
//               </h3>
//               <div className="mt-[1em]">
//                 <p className="font-lg font-sans font-medium">
//                  Support sustainable, innovative businesess  in energy, agriculture and water
//                  through cutting edge technology, creating long term impact.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </section>
//     </main>
//   );
// };

// export default Revolution;
import React from "react";
import { motion } from "framer-motion";

const Revolution = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const rectangleVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const rectangleContent = [
    {
      bg: "bg-rec1",
      title: "Guranteed Returns & Growth",
      description: [
        "Recieve annual dividends based on your contribution, with opportunities to further investment at fixed interest rate",
        "safe, simple and legally protected.",
      ],
    },
    {
      bg: "bg-rec2",
      title: "Access To Funding And Portfolio Growth",
      description: [
        "Gain early access to early rounds, build you portfolio, and track your Progress with quarterly performance reports.",
      ],
    },
    {
      bg: "bg-rec1",
      title: "Shape the Future",
      description: [
        "Join as an active participant in project development and decision-making, helping grow the cooperative ecosystem with your feedbacks.",
      ],
    },
    {
      bg: "bg-rec3",
      title: "Collaborate & connect",
      description: [
        "Join exclusive meetings and online discusions with fellow investors and experts, gain valuable insights while growing your network in the shared community.",
      ],
    },
    {
      bg: "bg-rec2",
      title: "Investing In The Future",
      description: [
        "Support sustainable, innovative businesess in energy, agriculture and water through cutting edge technology, creating long term impact.",
      ],
    },
  ];

  return (
    <motion.main
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="mx-auto flex items-center justify-center font-sans sm:mt-[2em] sm:px-[7px] lg:mt-[5em] lg:px-0"
    >
      <section className="w-full max-w-7xl">
        <motion.header
          variants={textVariants}
          className="mb-12 text-center text-text4"
        >
          <motion.h1
            variants={textVariants}
            className="mb-2 font-bold sm:text-xl lg:text-3xl"
          >
            Confidence in Every Step
          </motion.h1>
          <motion.article
            variants={textVariants}
            className="text-center text-base font-medium text-text4 sm:w-full"
          >
            <motion.p
              variants={textVariants}
              className="m-auto w-full text-center font-sans lg:w-[65%]"
            >
              Your digital membership card, secured by blockchain, provides you
              with seemless registration, transparent ownership, and guanteed
              returns on your investment.
            </motion.p>
          </motion.article>
        </motion.header>

        <motion.div variants={containerVariants} className="space-y-8">
          {rectangleContent.map((content, index) => (
            <motion.section
              key={index}
              variants={rectangleVariants}
              className="mt-[2em]"
            >
              <motion.div
                whileHover="hover"
                variants={rectangleVariants}
                className={`mx-auto w-full rounded-2xl ${content.bg} transform p-[3em] shadow-md transition-all duration-300`}
              >
                <div className="sm:w-full lg:w-[71%]">
                  <motion.h3
                    variants={textVariants}
                    className="font-bold text-howtext sm:text-xl lg:text-2xl"
                  >
                    {content.title}
                  </motion.h3>
                  <div className="mt-[1em]">
                    {content.description.map((text, idx) => (
                      <motion.p
                        key={idx}
                        variants={textVariants}
                        className={`font-lg font-medium ${idx > 0 ? "mt-[1em]" : ""}`}
                      >
                        {text}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.section>
          ))}
        </motion.div>
      </section>
    </motion.main>
  );
};

export default Revolution;
