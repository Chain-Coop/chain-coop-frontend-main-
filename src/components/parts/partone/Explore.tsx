import React from "react";
import { ComingSoon } from "../../common/Button";

const Explore = () => {
  return (
    <main className="flex h-full items-center justify-center font-sans sm:mt-[1em] lg:mt-[5em]">
      <section className="sm:px-[1em] lg:w-[86%] lg:px-[0]">
        <header className="py-8 text-text4">
          <h1 className="mb-2 font-bold text-center sm:text-[1.2em] md:text-2xl lg:text-3xl">
            Explore Our Investment Opportunities
          </h1>
          <div className="lg:w-[53%] m-auto">
          <p className="font-sans lg:mt-[1.5em]">
            Invest in Tomorrow: Explore innovative, self sustaining businessess backed by the 
          power of block chain and cooperative ownership.
          </p>
          </div>
        </header>

        <section className="grid justify-center gap-[40px] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="mb-8 flex flex-col justify-between rounded-2xl bg-explore1 bg-no-repeat p-[2em] sm:mb-0 md:p-[2em]">
            <div>
            <h1 className="p-3em lg:text-2xl font-bold uppercase text-text3">
              automated ai <br /> learning Platform
            </h1>
            <p className="text-white mt-[4px]">Our Ai-Driven Learnig Platform will change how members learn and grow. Stay 
              tuned for it's launch
            </p>
            </div>
            <div className="sm:mt-[1.2em] md:mt-[1.2em] lg:mt-[3em]">
             <ComingSoon className="bg-coming1 flex">Coming Soon</ComingSoon>
            </div>
          </div>

          <section className="grid w-full grid-cols-1 gap-[1em]">
            <div className="rounded-2xl bg-explore2 bg-no-repeat p-[2em]">
              <h1 className="p-2em lg:text-2xl font-bold uppercase text-text3">
                automated ai <br /> learning Platform
              </h1>
              <div className="sm:mt-[1.2em] md:mt-[1.2em] lg:mt-[3em]">
                <ComingSoon className="bg-coming2">Coming Soon</ComingSoon>
              </div>
            </div>

            <div className="rounded-2xl bg-explore3 bg-no-repeat p-[2em]">
              <h1 className="p-2em lg:text-2xl font-bold uppercase text-text3">
                automated ai <br /> learning Platform
              </h1>
              <div className="sm:mt-[1.2em] md:mt-[1.2em] lg:mt-[3em]">
                <ComingSoon className="bg-coming2">Coming Soon</ComingSoon>
              </div>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
};

export default Explore;
