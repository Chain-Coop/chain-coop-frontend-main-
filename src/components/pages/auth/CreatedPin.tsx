import React from "react";
import { Primary } from "../../common/Button";


const CreatedPin = () => {
  return (
    <main className="flex h-screen items-center justify-center bg-log">
      <section className="text-center lg:w-[45%]">
        <div className="lg:px-[6em]">
          <h1 className="mb-4 text-3xl font-semibold text-text2 md:font-bold">
            {`You've Created Your Pin`}
          </h1>
          <div>
            <p className="font-sans font-medium text-howtext sm:text-base md:text-xl lg:text-base">
              Keep your account safe and your secrete PIN. Do not share this PIN
              with anyone
            </p>
          </div>
          <Primary className="w-[10em] rounded-full bg-text2 py-3 font-medium text-text5 sm:text-lg  lg:mt-[2em]">
            Okay
          </Primary>
        </div>
      </section>
    </main>
  );
};

export default CreatedPin;
