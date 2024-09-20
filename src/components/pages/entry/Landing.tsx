// import React, { useEffect, useState } from "react";
// import background from "../../../Assets/png/story/background.png";
// import imageLeft from "../../../Assets/png/home/what-we-doL.png";
// import imageRight from "../../../Assets/png/home/what-we-doR.png";
// import NavBar from "../../common/NavBar";
// import lady from "../../../Assets/png/home/lady.png";
// import rectangle from "../../../Assets/png/home/who-lady.png";
// import innovation from "../../../Assets/png/home/innovation.png";
// import group from "../../../Assets/png/home/group.png";
// import Footer from "../../common/Footer";

// const Landing = () => {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     setIsLoaded(true);
//   }, []);

//   return (
//     <>
//       <NavBar />
//       <main className={`relative font-sans transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
//         <div className="inset-0 flex items-center">
//           <img
//             src={background}
//             className="h-[30vh] w-full object-cover sm:h-[40vh] lg:h-auto"
//             alt="background_image"
//           />
//         </div>
//         <section className="absolute inset-0 mx-auto">
//           <div className="relative z-10 mx-auto w-full px-4 py-8 lg:py-[4em] text-center lg:w-[70%]">
//             <h1 className="text-[1.5em] font-semibold sm:text-[2em] lg:text-[2.5em]">
//               What We Do
//             </h1>
//             <p className="mt-4 text-xs sm:text-sm lg:text-base">
//               We are a worker-owned cooperative that specializes in investment.
//               We reach out to investors and partners who want to own shares and
//               work with us. Lorem ipsum dolor sit amet, consectetur adipisicing
//               elit. Officia rerum amet quis quisquam nostrum atque?
//             </p>
//           </div>

//           <div className="flex flex-col lg:flex-row">
//             <div className="relative h-[300px] py-[3em] w-full lg:h-[450px] lg:w-1/3"
//                  style={{
//                    backgroundImage: `url(${imageRight})`,
//                    backgroundSize: "cover",
//                    backgroundPosition: "center",
//                  }}>
//               <div className="absolute inset-0 flex flex-col items-center justify-center px-4 lg:px-[5em] text-center text-white">
//                 <h2 className="mb-4 text-2xl lg:text-3xl font-semibold">As an Investor</h2>
//                 <p className="text-sm lg:text-base">
//                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam temporibus
//                   voluptate vitae nulla ipsam voluptatem soluta modi dicta deleniti autem,
//                   quod mollitia quam corporis similique cum cumque accusantium officiis delectus 
//                   consequuntur accusamus sint in ratione.
//                 </p>
//               </div>
//             </div>

//             <div className="hidden lg:flex lg:w-1/3 justify-between py-[3em]">
//               <div className="flex mt-[1.5em] justify-between flex-col">
//                 <img src={lady} alt="lady" className="h-[8em] w-[8em] object-cover" />
//                 <img src={lady} alt="lady" className="h-[8em] w-[8em] object-cover" />
//               </div>
//               <div className="flex gap-[2em] mt-[2.7em] flex-col">
//                 <img src={lady} alt="lady" className="h-[8em] w-[8em] object-cover" />
//                 <img src={lady} alt="lady" className="h-[8em] w-[8em] object-cover" />
//               </div>
//               <div className="flex gap-[2.7em] flex-col">
//                 <img src={lady} alt="lady" className="h-[8em] w-[8em] object-cover" />
//                 <img src={lady} alt="lady" className="h-[8em] w-[8em] object-cover" />
//               </div>
//             </div>

//             <div className="relative h-[300px] w-full lg:h-[450px] lg:w-1/3"
//                  style={{
//                    backgroundImage: `url(${imageLeft})`,
//                    backgroundSize: "cover",
//                    backgroundPosition: "center",
//                  }}>
//               <div className="absolute inset-0 flex flex-col items-center justify-center px-4 lg:px-[5em] text-center text-white">
//                 <h2 className="mb-4 text-2xl lg:text-3xl font-semibold">As Employee</h2>
//                 <p className="text-sm lg:text-base">
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                   Debitis qui magni ipsam velit nostrum expedita quam accusamus. 
//                   Excepturi dignissimos, adipisci deleniti commodi vel voluptatem temporibus.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="w-full lg:w-[80%] mt-8 lg:mt-[12em] flex flex-col lg:flex-row justify-between m-auto px-4 lg:px-0">
//             <div className="w-full lg:w-[50%] flex flex-col gap-[2em]">
//               <h2 className="font-semibold text-xl">How Our Membership Works</h2>
//               <p className="text-sm lg:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
//               aliquam quas magnam necessitatibus iure aspernatur, provident dicta
//               enim ut. Nam atque aliquam qui dolorum debitis sapiente quos aut veniam,
//               dolor delectus alias necessitatibus minus. Veritatis nulla, animi, ad
//               natus porro excepturi corporis commodi perspiciatis ab cum voluptas blanditiis
//               qui fugiat?</p>
//             </div>
//             <div className="mt-4 lg:mt-0">
//               <img src={group} alt="group" className="h-auto w-full lg:h-[300px] lg:w-[400px] object-cover" />
//             </div>
//           </div>
//         </section>

        // <div className="relative mt-8 lg:mt-[-6em]"> 
        //   <div className="inset-0 flex items-center">
        //     <img
        //       src={background}
        //       className="h-[40vh] sm:h-[50vh] lg:h-auto w-full object-cover"
        //       alt="background_image"
        //     />
        //   </div>
        //   <section className="absolute inset-0 mx-auto">
        //     <div className="w-full px-4 lg:px-7 bg-[#ece6f2] py-8 sm:py-12">
        //       <h2 className="font-semibold text-[1.5em] lg:text-[2em] text-center mb-8">
        //         Who is a member?
        //       </h2>

        //       <div className="w-full lg:w-[85%] m-auto flex flex-col gap-12">
                
        //         <div className="flex flex-col lg:flex-row justify-between">
        //           <div className="w-full lg:w-[48%] flex flex-col gap-4">
        //             <h2 className="font-semibold text-xl">How Our Membership Works</h2>
        //             <p className="text-sm sm:text-base">
        //               Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
        //               aliquam quas magnam necessitatibus iure aspernatur, provident dicta
        //               enim ut. Nam atque aliquam qui dolorum debitis sapiente quos aut veniam,
        //               dolor delectus alias necessitatibus minus.
        //             </p>
        //           </div>
        //           <div className="mt-6 lg:mt-0 w-full lg:w-[32%]">
        //             <img src={rectangle} alt="group" className="h-auto w-full object-cover" />
        //           </div>
        //         </div>

        //         <div className="flex flex-col-reverse lg:flex-row justify-between">
        //           <div className="mt-6 lg:mt-0 w-full lg:w-[32%]">
        //             <img src={innovation} alt="group" className="h-auto w-full object-cover" />
        //           </div>
        //           <div className="w-full lg:w-[48%] mt-auto flex flex-col gap-4">
        //             <h2 className="font-semibold text-xl">How Our Membership Works</h2>
        //             <p className="text-sm sm:text-base">
        //               Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
        //               aliquam quas magnam necessitatibus iure aspernatur, provident dicta
        //               enim ut. Nam atque aliquam qui dolorum debitis sapiente quos aut veniam,
        //               dolor delectus alias necessitatibus minus.
        //             </p>
        //           </div>
        //         </div>

        //       </div>
        //     </div>
        //   </section>
        // </div>
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default Landing;

import React, { useEffect, useState } from "react";
import background from "../../../Assets/png/story/background.png";
import imageLeft from "../../../Assets/png/home/what-we-doL.png";
import imageRight from "../../../Assets/png/home/what-we-doR.png";
import NavBar from "../../common/NavBar";
import lady from "../../../Assets/png/home/lady.png";
import rectangle from "../../../Assets/png/home/who-lady.png";
import innovation from "../../../Assets/png/home/innovation.png";
import group from "../../../Assets/png/home/group.png";
import Footer from "../../common/Footer";


const Landing = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(true);
  }, []);

  return (
    <>
      <NavBar />
      <main
        className={`relative font-sans transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="relative"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <section className="relative flex flex-col items-center mx-auto w-full px-4 text-center lg:py-[4em] lg:w-[70%]">
            <div className="relative z-10 text-center">
              <h1 className="text-[1.5em] font-semibold sm:text-[2em] lg:text-[2.5em]">
                What We Do
              </h1>
              <p className="mt-4 text-xs sm:text-sm lg:text-base">
                We are a worker-owned cooperative that specializes in investment.
                We reach out to investors and partners who want to own shares and
                work with us. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Officia rerum amet quis quisquam nostrum atque?
              </p>
            </div>
          </section>

          <section className="relative flex flex-col lg:flex-row pt-8 lg:-mt-1 text-white z-10">
  {/* Investor Section */}
  <div
    className="relative h-[300px] w-full lg:h-[450px] lg:w-1/3"
    style={{
      backgroundImage: `url(${imageRight})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center lg:px-[5em]">
      <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6"> {/* Centering block */}
        <h2 className="text-xl font-semibold sm:text-2xl lg:text-3xl">
          As an Investor
        </h2>
        <p className="text-xs sm:text-sm lg:text-base max-w-xs sm:max-w-md lg:max-w-lg"> {/* Ensure paragraph stays within bounds */}
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam temporibus
          voluptate vitae nulla ipsam voluptatem soluta modi dicta deleniti autem, quod
          mollitia quam corporis similique cum cumque accusantium officiis delectus.
        </p>
      </div>
    </div>
  </div>

  {/* Lady Images Section (small screens) */}
  <div className="flex flex-wrap gap-2 lg:hidden justify-center py-4">
    {[1, 2, 3, 4].map((_, index) => (
      <img
        key={index}
        src={lady}
        alt="lady"
        className="h-[6em] w-[6em] object-cover"
      />
    ))}
  </div>

  {/* Lady Images Section (large screens) */}
  <div className="hidden lg:flex lg:w-1/3 justify-between py-[3em]">
    <div className="flex mt-[1.5em] justify-between flex-col">
      <img
        src={lady}
        alt="lady"
        className="h-[8em] w-[8em] object-cover"
      />
      <img
        src={lady}
        alt="lady"
        className="h-[8em] w-[8em] object-cover"
      />
    </div>
    <div className="flex gap-[2em] mt-[2.7em] flex-col">
      <img
        src={lady}
        alt="lady"
        className="h-[8em] w-[8em] object-cover"
      />
      <img
        src={lady}
        alt="lady"
        className="h-[8em] w-[8em] object-cover"
      />
    </div>
    <div className="flex gap-[2.7em] flex-col">
      <img
        src={lady}
        alt="lady"
        className="h-[8em] w-[8em] object-cover"
      />
      <img
        src={lady}
        alt="lady"
        className="h-[8em] w-[8em] object-cover"
      />
    </div>
  </div>

  {/* Employee Section */}
  <div
    className="relative h-[300px] w-full lg:h-[450px] lg:w-1/3"
    style={{
      backgroundImage: `url(${imageLeft})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center lg:px-[5em]">
      <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6"> {/* Centering block */}
        <h2 className="text-xl font-semibold sm:text-2xl lg:text-3xl">
          As Employee
        </h2>
        <p className="text-xs sm:text-sm lg:text-base max-w-xs sm:max-w-md lg:max-w-lg"> {/* Ensure paragraph stays within bounds */}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis qui magni
          ipsam velit nostrum expedita quam accusamus. Excepturi dignissimos, adipisci
          deleniti commodi vel voluptatem temporibus.
        </p>
      </div>
    </div>
  </div>
</section>

            <div className="w-full lg:w-[80%] mt-8 lg:mt-[12em] flex flex-col lg:flex-row justify-between m-auto px-4 lg:px-0">
            <div className="w-full lg:w-[50%] flex flex-col gap-[2em]">
              <h2 className="font-semibold text-xl">How Our Membership Works</h2>
              <p className="text-sm lg:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              aliquam quas magnam necessitatibus iure aspernatur, provident dicta
              enim ut. Nam atque aliquam qui dolorum debitis sapiente quos aut veniam,
              dolor delectus alias necessitatibus minus. Veritatis nulla, animi, ad
              natus porro excepturi corporis commodi perspiciatis ab cum voluptas blanditiis
              qui fugiat?</p>
            </div>
            <div className="mt-4 lg:mt-0">
              <img src={group} alt="group" className="h-auto w-full lg:h-[300px] lg:w-[400px] object-cover" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Landing;
