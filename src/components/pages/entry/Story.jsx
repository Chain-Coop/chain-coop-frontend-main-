import NavBar from "../../common/NavBar";
import Footer from "../../common/Footer";
import FooterBox from "../../common/FooterBox";
import background from "../../../Assets/png/story/background.png";
import image1 from "../../../Assets/jpg/story/image1.jpg";
import image2 from "../../../Assets/jpg/story/image2.jpg";
import mark from "../../../Assets/svg/story/icon-mark.svg";
import { useEffect } from "react";

const Story = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavBar />
      <main className="relative h-full font-sans">
        <div className="inset-0 flex items-center">
          <img src={background} className="w-full object-cover" alt="" />
        </div>
        <section className="absolute inset-0 mx-auto">
<header className="mx-auto text-center sm:mt-[2em] sm:w-full sm:px-1 md:px-[1em] lg:mt-[9em] lg:w-[65%]">
            <h1 className="font-semibold sm:text-[2em] lg:text-[2.5em]">
              Our Story
            </h1>
            <p className="text-sm">
              Meet our Chain Coop, our business-oriented community designed into
              a cooperative with open membership, through Chain Wallet Simple,
              Safe and transparent way
            </p>
          </header>
          <div className="m-auto mt-[3em] flex w-[86%] flex-col lg:gap-8">
            <div className="flex sm:flex-col lg:mt-[7em] lg:flex-row">
              <div>
                <img src={image1} alt="people-image" />
              </div>
              <div className="mx-auto mt-[3em] lg:w-[49%]">
                <p>
                  Meet Chain Coop, Our business-oriented community designed into
                  a cooperative with open membership through Chain Wallet,
                  Simple, safe and transparent way.
                </p>
              </div>
            </div>
            <div className="flex sm:flex-col-reverse lg:z-[10px]  lg:mt-[-170px] lg:flex-row">
              <div className="ml-[2em] mt-[12em] lg:w-[45%]">
                <h1 className="text-3xl font-semibold">Our Membership</h1>
                <p className="mt-[1em] text-sm">
                  Enjoy All the Benefits Chain Coop Has to Offer with a <br />
                  One-Time N100k Membership Fee
                </p>
                <div className="mt-[1em] flex flex-col font-medium sm:gap-2 lg:gap-7">
                  <p className="flex gap-3">
                    <img src={mark} alt="svg-image" /> Legally Guaranteed
                    Returns
                  </p>
                  <p className="flex gap-3">
                    <img src={mark} alt="svg-image" /> Access Exclusive
                    Investment Rounds
                  </p>
                  <p className="flex gap-3">
                    <img src={mark} alt="svg-image" /> Expand Your Network
                  </p>
                  <p className="flex gap-3">
                    <img src={mark} alt="svg-image" /> Vote and Engage wit Chain
                    Coop Network
                  </p>
                </div>
              </div>
              <div>
                <img src={image2} alt="people-image" />
              </div>
            </div>
          </div>
        </section>

        <div className="two-box mx-auto mt-[2em] flex w-[86%] justify-between gap-[3em] sm:flex-col lg:flex-row">
          <div className="box1 h-[18em] rounded-lg bg-text2 px-[1.5em] py-[3em] text-text3">
            <h1 className="text-2xl font-semibold">Our Mission</h1>
            <div>
              <p className="mt-4">
                Meet Chain Coop our business-Oriented community, designed into a
                cooperative with open membership, through chain wallet simple
                safe and transparent way. Meet Chain Coop our business-Oriented
                community, designed into a cooperative with open membership,
                through chain wallet simple safe and transparent way.
              </p>
            </div>
          </div>
          <div className="mb-[8em] h-[18em] rounded-lg px-[2em] py-[3em] shadow-md sm:mt-[1.5em] lg:mt-[5em]">
            <h1 className="text-2xl font-semibold">Our Goals</h1>
            <p className="mt-4">
              Meet Chain Coop our business-Oriented community, designed into a
              cooperative with open membership, through chain wallet simple safe
              and transparent way. Meet Chain Coop our business-Oriented
              community, designed into a cooperative with open membership,
              through chain wallet simple safe and transparent way.
            </p>
          </div>
        </div>
        <div>
          <FooterBox />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Story;

// import NavBar from "../../common/NavBar";
// import background from "../../../../public/images/png/story/background.png";
// import image1 from "../../../../public/images/jpg/story/image1.jpg";
// import image2 from "../../../../public/images/jpg/story/image2.jpg";
// import mark from "../../../../public/images/svg/story/icon-mark.svg";
// import { useEffect } from "react";

// const Story = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   return (
//     <>
//       <NavBar />
//       <main className="relative h-full font-sans">
//         <div className="inset-0 flex items-center">
//           <img src={background} className="w-full object-cover" alt="" />
//         </div>
//         <section className="absolute inset-0 mx-auto">
//           <header className="mx-auto text-center sm:mt-[2em] sm:w-full  lg:mt-[9em] lg:w-[65%]">
//             <h1 className="font-semibold sm:text-[2em] lg:text-[2.5em]">
//               Our Story
//             </h1>
//             <p className="text-sm">
//               Meet our Chain Coop, our business-oriented community designed into
//               a cooperative with open membership, through Chain Wallet Simple,
//               Safe and transparent way
//             </p>
//           </header>
//           <div className="m-auto mt-[3em] flex w-[86%] flex-col lg:gap-8">
//             <div className="flex sm:flex-col sm:space-y-[25em] lg:mt-[7em] lg:flex-row lg:space-y-0">
//               <div>
//                 <img src={image1} alt="people-image" />
//               </div>
//               <div className="mx-auto bg-slate-300 mt-[3em] lg:w-[49%]">
//                 <p>
//                   Meet Chain Coop, Our business-oriented community designed into
//                   a cooperative with open membership through Chain Wallet,
//                   Simple, safe and transparent way.
//                 </p>
//               </div>
//             </div>
//             <div className="flex sm:flex-col-reverse sm:space-y-[24em] lg:z-[10px] lg:mt-[-170px]  lg:flex-row lg:space-y-0">
//               <div className="ml-[2em] mt-[2em] lg:mt-[12em] lg:w-[45%]">
//                 <h1 className="text-3xl font-semibold">Our Membership</h1>
//                 <p className="mt-[1em] text-sm">
//                   Enjoy All the Benefits Chain Coop Has to Offer with a <br />
//                   One-Time N100k Membership Fee
//                 </p>
//                 <div className="mt-[1em] flex flex-col font-medium sm:gap-2 lg:gap-7">
//                   <p className="flex gap-3">
//                     <img src={mark} alt="svg-image" /> Legally Guaranteed
//                     Returns
//                   </p>
//                   <p className="flex gap-3">
//                     <img src={mark} alt="svg-image" /> Access Exclusive
//                     Investment Rounds
//                   </p>
//                   <p className="flex gap-3">
//                     <img src={mark} alt="svg-image" /> Expand Your Network
//                   </p>
//                   <p className="flex gap-3">
//                     <img src={mark} alt="svg-image" /> Vote and Engage wit Chain
//                     Coop Network
//                   </p>
//                 </div>
//               </div>
//               <div>
//                 <img src={image2} alt="people-image" />
//               </div>
//             </div>
//           </div>
//         </section>

//         <div className="two-box mx-auto mt-[2em] flex w-[86%] justify-between gap-[3em] sm:flex-col lg:flex-row">
//           <div className="box1 h-full rounded-lg bg-text2 px-[1.5em] py-[3em] text-text3">
//             <h1 className="text-2xl font-semibold">Our Mission</h1>
//             <div>
//               <p className="mt-4">
//                 Meet Chain Coop our business-Oriented community, designed into a
//                 cooperative with open membership, through chain wallet simple
//                 safe and transparent way. Meet Chain Coop our business-Oriented
//                 community, designed into a cooperative with open membership,
//                 through chain wallet simple safe and transparent way.
//               </p>
//             </div>
//           </div>
//           <div className="mb-[8em] h-full rounded-lg px-[2em] py-[3em] shadow-md sm:mt-[1.5em] lg:mt-[5em]">
//             <h1 className="text-2xl font-semibold">Our Goals</h1>
//             <p className="mt-4">
//               Meet Chain Coop our business-Oriented community, designed into a
//               cooperative with open membership, through chain wallet simple safe
//               and transparent way. Meet Chain Coop our business-Oriented
//               community, designed into a cooperative with open membership,
//               through chain wallet simple safe and transparent way.
//             </p>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default Story;
