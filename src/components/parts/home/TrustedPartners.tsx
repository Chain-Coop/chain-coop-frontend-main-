import React from "react";
import Marquee from "react-fast-marquee";
import { trustedPartners } from "../../../data/Data";

interface TrustedPartner {
  src: string;
}

const TrustedPartners: React.FC = () => {
  return (
    <div className="w-full bg-white py-8 shadow-md">
      <h2 className="mb-6 px-8 text-lg font-bold text-[#440080]">
        Our Trusted Partners
      </h2>

      <Marquee speed={40} gradient={true} pauseOnHover={true}>
        <div className="flex items-center">
          {trustedPartners.map((partner: TrustedPartner, index: number) => (
            <img
              key={index}
              src={partner.src}
              alt={`Partner ${index + 1}`}
              className="mx-4 h-12 w-auto sm:h-16"
            />
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default TrustedPartners;
