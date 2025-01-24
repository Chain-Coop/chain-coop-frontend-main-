// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { IoIosArrowDropleft } from "react-icons/io";
// import { Alert } from "@mui/material";
// import { DashboardHeader } from "../../../../common/DashboardHeader";
// import NigerianFlag from "../../../../../Assets/svg/dashboard/contribution/NigerianFlag.svg";
// import etherium from "../../../../../Assets/svg/dashboard/contribution/etherum.svg";
// import lisk from "../../../../../Assets/svg/dashboard/token_lisk.svg";
// import eth from "../../../../../Assets/svg/dashboard/Group 99764.png";
// import usdc from "../../../../../Assets/svg/dashboard/usdc.svg";

// export const ContributionFundType = [
//   {
//     text: "Naira",
//     icon: <img src={NigerianFlag} alt="Nigerian Flag" className="h-10 w-10" />,
//   },
//   {
//     text: "Cryptocurrency",
//     icon: <img src={etherium} alt="eherium" className="h-10 w-10" />,
//   },
// ];
// const ContributionCurrencyType = () => {
//   const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
//   const [cryptoType, setCryptoType] = useState("");
//   const [selectedCurrency, setSelectedCurrency] = useState<string>("");
//   const [selectedCryptoType, setSelectedCryptoType] = useState<string>("");
//   const navigate = useNavigate();
//   const [error, setError] = useState("");

//   const handleCategorySelect = (category: string) => {
//     setSelectedCurrency(category);
//     setCryptoType(category);
//     setSelectedCryptoType("");
//   };

//   const handleNext = () => {
//     if (!cryptoType) {
//       setError("Please select a contribution plan");
//       return;
//     }

//     setError("");
//     if (cryptoType === "Naira") {
//       navigate("/dashboard/contribution/purpose", {
//         state: { currency: "NGN" },
//       });
//     } else {
//       if (cryptoType === "Cryptocurrency" && !selectedCryptoType) {
//         setError("Please select a cryptocurrency type");
//         return;
//       }

//       navigate("/dashboard/contribution/crypto/purpose", {
//         state: {
//           cryptoType: selectedCryptoType,
//         },
//       });
//     }
//   };

//   return (
//     <main className="pb-[1.5em] font-sans">
//       <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
//         Flexible Savings
//       </DashboardHeader>
//       <div className="m-auto w-[90%]">
//         <header className="mt-[1.5em] lg:mt-[3em]">
//           <h1 className="text-xl font-semibold md:text-2xl lg:text-2xl">
//             Flexible Savings
//           </h1>
//           <p className=" mt-[1em] font-medium">
//             You can save and withdraw anytime you want
//           </p>
//         </header>

//         <header className="mt-[1.5em] lg:mt-[3em]">
//           <h1 className="text-lg font-semibold md:text-xl lg:text-xl">
//             What Currency are you Saving on ?
//           </h1>
//         </header>

//         {ContributionFundType.map((plan: any, index: number) => (
//           <div
//             key={index}
//             className={`mt-8 flex w-full items-center justify-between rounded-lg px-4 py-[9px]
//           transition-all duration-300 ease-in-out
//           ${hoveredPlan === index ? "scale-[1.02] transform bg-[#DED3EA] shadow-lg" : "bg-[#ECE6F2]"}
//           cursor-pointer`}
//             onMouseEnter={() => setHoveredPlan(index)}
//             onMouseLeave={() => setHoveredPlan(null)}
//             onClick={() => handleCategorySelect(plan.text)}
//           >
//             <div className="flex flex-col gap-1">
//               <div className="flex items-center  gap-3">
//                 <span className="items-center text-xl">{plan.icon}</span>
//                 <h3
//                   className={`${hoveredPlan === index ? "scale-105" : "scale-100"}
//               transform items-center font-semibold transition-all duration-300 ease-in-out`}
//                 >
//                   {plan.text}
//                 </h3>
//               </div>
//               {hoveredPlan === index && (
//                 <p className="animate-fade-in text-sm text-gray-600">
//                   Click to select this Currency
//                 </p>
//               )}
//             </div>
//             <button
//               className={`rounded-md border px-6 py-2 font-medium transition-all duration-300 ease-in-out
//       ${
//         cryptoType === plan.text
//           ? "border-[2px] border-[#9F7C6B] bg-text2 font-semibold text-white hover:bg-opacity-90"
//           : "border-text2 bg-white hover:bg-text2 hover:text-white"
//       }
//       transform ${hoveredPlan === index ? "scale-105" : "scale-100"}
//       ${hoveredPlan === index ? "shadow-md" : ""}
//     `}
//             >
//               {cryptoType === plan.text ? "Selected" : "Select"}
//             </button>
//           </div>
//         ))}

//         {selectedCurrency === "Cryptocurrency" && (
//           <section className="mt-[3em]">
//             <div className="w-full max-w-[30em] rounded-xl bg-inherit py-[2em] shadow-lg">
//               <div className="px-[1em]">
//                 <header>
//                   <h4 className="mb-2 text-lg font-semibold text-memt1">
//                     Select Cryptocurrency type
//                   </h4>
//                 </header>
//               </div>
//               <hr />
//               <div className="mt-[1em] flex gap-[2em] px-[1em]">
//                 <button
//                   onClick={() => setSelectedCryptoType("BTC")}
//                   className={`flex w-[9em] items-center gap-2 rounded-md bg-[#ECE6F2] px-6 font-medium transition-all duration-300 lg:py-1
//           ${
//             selectedCryptoType === "BTC"
//               ? "border-2 border-text2"
//               : "hover:bg-text2 hover:text-white"
//           }
//           transform uppercase hover:scale-105 active:scale-95`}
//                 >
//                   <img src={lisk} alt="BTC" className="h-8 w-8" />
//                   <span>lisk</span>
//                 </button>

//                 <button
//                   onClick={() => setSelectedCryptoType("ETH")}
//                   className={`flex w-[9em] items-center gap-2 rounded-md bg-[#ECE6F2] px-6 font-medium transition-all duration-300 lg:py-1
//           ${
//             selectedCryptoType === "ETH"
//               ? "border-2 border-text2"
//               : "hover:bg-text2 hover:text-white"
//           }
//           transform uppercase hover:scale-105 active:scale-95`}
//                 >
//                   <img src={eth} alt="Ethereum" className="h-8 w-8" />
//                   <span>usdc</span>
//                 </button>

//                 <button
//                   onClick={() => setSelectedCryptoType("USDT")}
//                   className={`flex w-[9em] items-center gap-2 rounded-md bg-[#ECE6F2] px-6 font-medium transition-all duration-300 lg:py-1
//           ${
//             selectedCryptoType === "USDT"
//               ? "border-2 border-text2"
//               : "hover:bg-text2 hover:text-white"
//           }
//           transform uppercase hover:scale-105 active:scale-95`}
//                 >
//                   <img src={usdc} alt="Ethereum" className="h-8 w-8" />
//                   <span>usdt</span>
//                 </button>
//               </div>
//             </div>
//           </section>
//         )}
//         {error && (
//           <Alert severity="error" className="mb-4 mt-4">
//             {error}
//           </Alert>
//         )}

//         <div className="mt-[3em] flex justify-between">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center transition-all duration-300 ease-in-out hover:scale-110 hover:text-text2"
//           >
//             <IoIosArrowDropleft size={25} />
//           </button>
//           <button
//             className="rounded-md bg-text2 px-8 py-2 font-semibold text-white
//               transition-all duration-300 ease-in-out hover:scale-105 hover:bg-opacity-90 hover:shadow-lg
//               active:scale-95 active:transform disabled:cursor-not-allowed disabled:opacity-50"
//             onClick={handleNext}
//             disabled={!cryptoType}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default ContributionCurrencyType;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import { Alert } from "@mui/material";
import NigerianFlag from "../../../../../../Assets/svg/dashboard/contribution/NigerianFlag.svg";
import { DashboardHeader } from "../../../../../common/DashboardHeader";

export const ContributionFundType = [
  {
    text: "Naira",
    icon: <img src={NigerianFlag} alt="Nigerian Flag" className="h-10 w-10" />,
  },
];

const ContributionCurrencyType = () => {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const [cryptoType, setCryptoType] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!cryptoType) {
      setError("Please select a contribution plan");
      return;
    }

    setError("");
    navigate("/dashboard/contribution/lock/purpose", {
      state: { currency: "NGN" },
    });
  };

  return (
    <main className="pb-[1.5em] font-sans">
      <DashboardHeader className="flex items-center justify-center sm:mt-[0] lg:mt-[2em]">
        Lock Savings
      </DashboardHeader>
      <div className="m-auto w-[90%]">
        <header className="mt-[1.5em] lg:mt-[3em]">
          <h1 className="text-2xl font-bold md:text-2xl lg:text-2xl">
            Lock Savings
          </h1>
          <p className="mt-[1em] font-medium">
            You can save and withdraw anytime you want
          </p>
        </header>

        {ContributionFundType.map((plan: any, index: number) => (
          <div
            key={index}
            className={`mt-8 flex w-full items-center justify-between rounded-lg px-4 py-[9px] 
          transition-all duration-300 ease-in-out
          ${hoveredPlan === index ? "scale-[1.02] transform bg-[#DED3EA] shadow-lg" : "bg-[#ECE6F2]"}
          cursor-pointer`}
            onMouseEnter={() => setHoveredPlan(index)}
            onMouseLeave={() => setHoveredPlan(null)}
            onClick={() => setCryptoType(plan.text)}
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span className="items-center text-xl">{plan.icon}</span>
                <h3
                  className={`${hoveredPlan === index ? "scale-105" : "scale-100"} 
              transform items-center font-semibold transition-all duration-300 ease-in-out`}
                >
                  {plan.text}
                </h3>
              </div>
              {hoveredPlan === index && (
                <p className="animate-fade-in text-sm text-gray-600">
                  Click to select this Currency
                </p>
              )}
            </div>
            <button
              className={`rounded-md border px-6 py-2 font-medium transition-all duration-300 ease-in-out
      ${
        cryptoType === plan.text
          ? "border-[2px] border-[#9F7C6B] bg-text2 font-semibold text-white hover:bg-opacity-90"
          : "border-text2 bg-white hover:bg-text2 hover:text-white"
      }
      transform ${hoveredPlan === index ? "scale-105" : "scale-100"}
      ${hoveredPlan === index ? "shadow-md" : ""}
    `}
            >
              {cryptoType === plan.text ? "Selected" : "Select"}
            </button>
          </div>
        ))}

        {error && (
          <Alert severity="error" className="mb-4 mt-4">
            {error}
          </Alert>
        )}

        <div className="mt-[3em] flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center transition-all duration-300 ease-in-out hover:scale-110 hover:text-text2"
          >
            <IoIosArrowDropleft size={25} />
          </button>
          <button
            className="rounded-md bg-text2 px-8 py-2 font-semibold text-white
              transition-all duration-300 ease-in-out hover:scale-105 hover:bg-opacity-90 hover:shadow-lg
              active:scale-95 active:transform disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleNext}
            disabled={!cryptoType}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default ContributionCurrencyType;
