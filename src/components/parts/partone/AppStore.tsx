import React from "react";
import phone1 from "../../../Assets/png/home/store-phone.png";
import playstore from "../../../Assets/png/home/playstore.png";

const AppStore = () => {
  return (
    <main className="mx-auto flex items-center justify-center w-[90%] m-auto font-sans sm:mt-[2em] lg:h-screen ">
      <section className="flex w-full justify-center">
        <div className="lg:px-17 flex rounded-2xl bg-text5  sm:px-[1em]">
          <div className="flex-1 self-center sm:px-0 sm:py-[1em] lg:px-[3em]">
            <h1 className="text-text1 sm:text-xl sm:font-semibold lg:text-2xl lg:font-bold">
              Your Tech driven investment App
            </h1>
            <div className="sm:mt-[1.5em] lg:mt-[4em]">
              <p className="font-semibold text-text1">
                Experience the Power of Coop Wallet, Powered by Chain Coop
                Network, a business oriented Community Designed as a Cooperative
                for Open and Digital Membership, Simplifying Investing, Ensuring
                Safety, and Offering 100% Safety
              </p>
              <div className="mt-[2.5em]">
                <img src={playstore} alt="appstore image" />
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center sm:hidden lg:flex">
            <img src={phone1} alt="Phone" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AppStore;
