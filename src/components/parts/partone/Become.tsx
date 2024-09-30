// import React from "react";
// import { becomeData } from "../../../data/Data";
// import Card from "../../common/Card";

// const Become = () => {
//   return (
//     <main className="mx-auto mb-[3em] flex items-center justify-center font-sans lg:w-[86%] ">
//       <div>
//         <header className="py-8 text-center text-text4">
//           <h1 className="mb-2 font-bold sm:text-[17px] lg:text-3xl">
//             Become an Early Member
//           </h1>
//           <h1 className="mb-2 font-bold sm:text-[17px] lg:text-3xl">
//             with a One-Time N100K Membership Fee
//           </h1>
//           <p className="font-semibold sm:text-sm">
//             Enjoy All the Benefits Chain Coop Has to Offer
//           </p>
//         </header>
//         <div className="grid justify-center sm:grid-cols-[1fr] lg:grid-cols-[1fr,1fr] lg:gap-2">
//           {becomeData.map((item, index) => (
//             <Card className="sm:p-3 md:p-[3.2em] lg:p-[3.2em]" key={index}>
//               <div className="lg:px-[3em] sm:text-sm sm:px-[4px]">
//                 <h2 className="mb-2 text-lg font-bold">{item.title}</h2>
//                 <p className="font-sans lg:mt-[2em]">{item.paragraph}</p>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Become;

import React from "react";
import { becomeData } from "../../../data/Data";
import Card from "../../common/Card";

const Become = () => {
  return (
    <main className="mx-auto mb-[3em] flex items-center justify-center font-sans lg:w-[90%]">
      <div>
        <header className="py-8 text-center text-text4">
          <h1 className="mb-2 font-bold sm:text-[17px] lg:text-3xl">
            Become an Early Member
          </h1>
          <h1 className="mb-2 font-bold sm:text-[17px] lg:text-3xl">
            with a One-Time N100K Membership Fee
          </h1>
          <p className="font-semibold sm:text-sm">
            Enjoy All the Benefits Chain Coop Has to Offer
          </p>
        </header>
        <div className="grid justify-center sm:grid-cols-[1fr] lg:grid-cols-[1fr,1fr] lg:gap-2">
          {becomeData.map((item, index) => (
            <Card
              className="flex flex-col sm:min-h-[9em] sm:p-3 md:p-[3.2em] lg:p-[3.2em]" 
              key={index}
            >
              <div className="flex-grow lg:px-[3em] sm:text-sm sm:px-[4px]">
                <h2 className="mb-2 text-lg font-bold">{item.title}</h2>
                <p className="font-sans lg:mt-[2em]">{item.paragraph}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Become;
