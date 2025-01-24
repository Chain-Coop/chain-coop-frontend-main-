// import React from "react";
// import { meetImage } from "../../../data/Data";
// import { motion } from "framer-motion";

// const Meet = () => {
//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const imageVariant = {
//     hidden: { opacity: 0, scale: 0.8 },
//     show: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <main className="mx-auto grid items-center justify-center font-sans sm:-mt-[1em] sm:px-[1em] lg:mt-[7em] lg:w-[90%] lg:px-[0]">
//       <div>
//         <header className="text-center text-text4">
//           <motion.h1
//             whileInView={{ opacity: 1, y: 0 }}
//             initial={{ opacity: 0, y: -100 }}
//             transition={{ duration: 0.5 }}
//             className="mb-2 gap-1 text-xl font-bold lg:text-3xl"
//           >
//             Meet Your
//             <motion.span
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="ml-1 font-sans text-text2 sm:text-2xl lg:text-3xl"
//             >
//               Co-op Community
//             </motion.span>
//           </motion.h1>
//         </header>
//         <motion.div
//           variants={container}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, margin: "-50px" }}
//           className="mt-[2em] grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-3"
//         >
//           {meetImage.map((item, index) => (
//             <motion.img
//               key={index}
//               variants={imageVariant}
//               whileHover={{ scale: 1.05 }}
//               src={item.src}
//               alt={`Person ${index + 1}`}
//               className="rounded-md"
//             />
//           ))}
//         </motion.div>
//       </div>
//     </main>
//   );
// };

// export default Meet;

import React, { useState } from "react";
import "./explore/explore.css";
import explore1 from "../../../../src/Assets/png/home/Co-op-PX1.png";
import explore2 from "../../../../src/Assets/png/home/Co-op-PX2.png";
import explore3 from "../../../../src/Assets/png/home/Co-op-PX3.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Meet = () => {
  return (
    <main className="flex h-full items-center justify-center font-sans sm:mt-[1em] lg:mt-[5em]">
      <section className="lg:w-[89%] lg:px-[0]">
        <header className="py-8 text-center text-text4">
          <motion.h1
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="mb-2 font-bold sm:text-[1em] md:text-2xl lg:text-3xl"
          >
            Explore Our Investment Opportunities
          </motion.h1>
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="m-auto lg:w-[53%]"
          >
            <p className="font-sans lg:mt-[1.5em]">
              Access low risk options that prioritize keeping your money safe.
            </p>
            <p className="font-sans">
              Invest in your tomorrow: Explore innovative, self-sustaining
              businesses backed by the power of blockchain and cooperative
              ownership.
            </p>
          </motion.div>
        </header>

        <div className="wrapper flex w-full flex-wrap items-center justify-center gap-[24px]">
          <div className="card">
            <div className="poster">
              <img src={explore1} alt="Location Unknown" />
            </div>

            <div className="details flex flex-col gap-3">
              <h1 className="text-#000 ">Ogunseye Olajuwon</h1>
              <p className="font-medium text-text2">Data Engineer</p>
              <p className="text-#000">
                Ogunseye Olajuwon is a Data Engineer with 6+ years fintech and
                blockchain. He is focusing on cooperative and decentralized
                finance.
              </p>
              <div className="flex gap-2">
                <Link
                  to="https://x.com/juwon_ogunseye?t=ZAuheRFCskhkB6NeNITdUA&s=09"
                  target="blank"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="50"
                      height="50"
                      viewBox="0 0 48 48"
                    >
                      <linearGradient
                        id="U8Yg0Q5gzpRbQDBSnSCfPa_yoQabS8l0qpr_gr1"
                        x1="4.338"
                        x2="38.984"
                        y1="-10.056"
                        y2="49.954"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stop-color="#4b4b4b"></stop>
                        <stop offset=".247" stop-color="#3e3e3e"></stop>
                        <stop offset=".686" stop-color="#2b2b2b"></stop>
                        <stop offset="1" stop-color="#252525"></stop>
                      </linearGradient>
                      <path
                        fill="url(#U8Yg0Q5gzpRbQDBSnSCfPa_yoQabS8l0qpr_gr1)"
                        d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v28	C42,40.209,40.209,42,38,42z"
                      ></path>
                      <path
                        fill="#fff"
                        d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"
                      ></path>
                      <polygon
                        fill="#fff"
                        points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"
                      ></polygon>
                      <polygon
                        fill="#fff"
                        points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"
                      ></polygon>
                    </svg>
                  </span>
                </Link>
                <Link
                  to="https://www.linkedin.com/in/oluwajuwon-micheal?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="blank"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="50"
                      height="50"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#0288D1"
                        d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                      ></path>
                      <path
                        fill="#FFF"
                        d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                      ></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="poster">
              <img src={explore2} alt="explore-img" />
            </div>

            <div className="details flex flex-col gap-3">
              <h1 className="text-#000 ">Abdul Samad</h1>
              <p className="font-medium text-text2">Data Engineer</p>
              <p className="text-#000">
                Ogunseye Olajuwon is a Data Engineer with 6+ years fintech and
                blockchain. He is focusing on cooperative and decentralized
                finance.
              </p>
              <div className="flex gap-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="50"
                    height="50"
                    viewBox="0 0 48 48"
                  >
                    <linearGradient
                      id="U8Yg0Q5gzpRbQDBSnSCfPa_yoQabS8l0qpr_gr1"
                      x1="4.338"
                      x2="38.984"
                      y1="-10.056"
                      y2="49.954"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stop-color="#4b4b4b"></stop>
                      <stop offset=".247" stop-color="#3e3e3e"></stop>
                      <stop offset=".686" stop-color="#2b2b2b"></stop>
                      <stop offset="1" stop-color="#252525"></stop>
                    </linearGradient>
                    <path
                      fill="url(#U8Yg0Q5gzpRbQDBSnSCfPa_yoQabS8l0qpr_gr1)"
                      d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v28	C42,40.209,40.209,42,38,42z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"
                    ></path>
                    <polygon
                      fill="#fff"
                      points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"
                    ></polygon>
                    <polygon
                      fill="#fff"
                      points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"
                    ></polygon>
                  </svg>
                </span>
                <Link
                  to="https://www.linkedin.com/in/oluwajuwon-micheal?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="blank"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="50"
                      height="50"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#0288D1"
                        d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                      ></path>
                      <path
                        fill="#FFF"
                        d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                      ></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="poster">
              <img src={explore3} alt="Location Unknown" />
            </div>
            <div className="details flex flex-col gap-3">
              <h1 className="text-#000 ">Rabecca Asseh</h1>
              <p className="font-medium text-text2">Content Marketer</p>
              <p className="text-#000">
                Rabecca Assrh is a Blockchain Content Marketer and board member
                of Black Women in Blockchain Council. She works on simplifying
                blockchain for end-users.
              </p>
              <div className="flex gap-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="50"
                    height="50"
                    viewBox="0 0 48 48"
                  >
                    <linearGradient
                      id="U8Yg0Q5gzpRbQDBSnSCfPa_yoQabS8l0qpr_gr1"
                      x1="4.338"
                      x2="38.984"
                      y1="-10.056"
                      y2="49.954"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stop-color="#4b4b4b"></stop>
                      <stop offset=".247" stop-color="#3e3e3e"></stop>
                      <stop offset=".686" stop-color="#2b2b2b"></stop>
                      <stop offset="1" stop-color="#252525"></stop>
                    </linearGradient>
                    <path
                      fill="url(#U8Yg0Q5gzpRbQDBSnSCfPa_yoQabS8l0qpr_gr1)"
                      d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v28	C42,40.209,40.209,42,38,42z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"
                    ></path>
                    <polygon
                      fill="#fff"
                      points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"
                    ></polygon>
                    <polygon
                      fill="#fff"
                      points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"
                    ></polygon>
                  </svg>
                </span>
                <Link
                  to="https://www.linkedin.com/in/rebeccaasseh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="blank"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="50"
                      height="50"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#0288D1"
                        d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                      ></path>
                      <path
                        fill="#FFF"
                        d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                      ></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Meet;
