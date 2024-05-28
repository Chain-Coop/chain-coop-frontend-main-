import { Link } from "react-router-dom";
import herobackground from "../../../../public/images/png/home/background.png";
import { GetStarted, Subscribe } from "../../common/Button";

const HeroSection = () => {
  return (
    <main className="relative flex w-full font-sans">
      <div className="flex items-center sm:h-[25em] lg:h-[106vh] lg:w-[50%]">
        <div className="px-[1em] lg:px-[4em]">
          <h1 className="mb-[1em] font-bold sm:text-3xl md:text-4xl lg:text-4xl">
            Your Trusted Investing <br /> Platform
            <span className="text-text2"> with</span>
            <br />
            <span className="text-text2">Guaranteed Returns</span>
          </h1>
          <div className="mb-[4em] sm:px-[8px] lg:w-[31em]">
            <p className="font-base text-text1">
              Meet Chain Coop, our business-oriented community, designed into a
              cooperative with open membership, through Chain Wallet. Simple,
              safe, and transparent way.
            </p>
          </div>
          <div className="flex justify-between md:justify-normal md:gap-[5em]">
            <Link to="/sign-up">
              <GetStarted text="" />
            </Link>
            <Subscribe text="" />
          </div>
        </div>
      </div>
      <div
        className="bg-no-repeats hidden bg-cover sm:block lg:w-[50%]"
        style={{ backgroundImage: `url(${herobackground})` }}
      ></div>
    </main>
  );
};

export default HeroSection;
