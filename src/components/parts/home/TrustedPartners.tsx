import React from "react";
import { trustedPartners } from "../../../data/Data";
import "../../parts/home/animation.css";

interface TrustedPartner {
  src: string;
}

const TrustedPartners: React.FC = () => {
  return (
    <main className="logos flex justify-center shadow-md sm:py-[15px] lg:p-[2rem]">
      <div className="logos-slide flex w-[96vw] items-center justify-between whitespace-nowrap">
        <div className="flex sm:mt-4">
          {trustedPartners.map((img: TrustedPartner, index: number) => (
            <img
              key={index}
              src={img.src}
              alt={`Image ${index + 1}`}
              className="mr-4 h-[5em]"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default TrustedPartners;
