import React from "react";
import Marquee from "react-fast-marquee";
import { trustedPartners } from "../../../data/Data";
import { Typography } from "@material-tailwind/react";

interface TrustedPartner {
  src: string;
}

const TrustedPartners: React.FC = () => {
  return (
    <main className="shadow-md">
      <div className="container mx-auto py-8 lg:max-w-[81%]">
        <Typography className="mb-6 px-8 text-lg font-semibold text-[#440080]">
          Meet our Partners
        </Typography>
        <Marquee speed={40} gradient={true} pauseOnHover={true}>
          <div className="container flex max-w-[90%] items-center">
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
    </main>
  );
};

export default TrustedPartners;
