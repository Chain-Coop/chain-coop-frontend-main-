import React from "react";
import phone1 from "../../../Assets/png/home/store-phone.png";
import playstore from "../../../Assets/png/home/playstore.png";

const AppStore = () => {
  return (
    <main className="w-full px-4 py-8 md:py-12 lg:py-16">
      <section className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-2xl bg-text5 p-6 sm:p-8 md:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-textPrimary text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl">
                Chain Co-op wallet-
              </h1>

              <p className="text-textPrimary text-sm sm:text-base md:text-lg">
                Your secure savings app. Track, save and earn as your prepare
                for potential loan access and inflation hedging all withing
                Nigeria's first tech driven co-op savings platform.
              </p>

              <div className="pt-4 sm:pt-6 md:pt-8">
                <img src={playstore} alt="Download on Play Store" />
              </div>
            </div>

            <div className="mt-8 flex justify-center lg:mt-0 lg:flex-1">
              <img
                src={phone1}
                alt="App Preview"
                className="h-auto w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px]"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AppStore;
