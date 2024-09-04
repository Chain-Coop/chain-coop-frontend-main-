import React from "react";
import { ComingSoon } from "../../common/Button";

const Explore = () => {
  return (
    <main className="flex h-full items-center justify-center font-sans sm:mt-[1em] lg:mt-[5em]">
      <section className="sm:px-[1em] lg:w-[86%] lg:px-[0]">
        <header className="py-8 text-center text-text4">
          <h1 className="mb-2 font-bold sm:text-[1.2em] md:text-2xl lg:text-3xl">
            Explore Our Investment Opportunities
          </h1>
          <p className="font-sans lg:mt-[1.5em]">
            Self-Sustaining Business Already Making Waves in the Market
          </p>
        </header>

        <section className="grid justify-center gap-[40px] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="mb-8 items-center rounded-2xl bg-explore1 bg-no-repeat p-[3em] sm:mb-0 md:p-[2em]">
            <h1 className="p-3em text-3xl font-medium uppercase text-text3">
              automated ai <br /> learning Platform
            </h1>
            <div className="mt-[19em] flex">
              <ComingSoon className="bg-coming1">Coming Soon</ComingSoon>
            </div>
          </div>

          <section className="grid w-full grid-cols-1 gap-[1em]">
            <div className="mb-8 rounded-2xl bg-explore2 bg-no-repeat p-[2em] sm:mb-0">
              <h1 className="p-3em text-3xl font-medium uppercase text-text3">
                automated ai <br /> learning Platform
              </h1>
              <div className="mt-[4em]">
                <ComingSoon className="bg-coming2">Coming Soon</ComingSoon>
              </div>
            </div>

            <div className="rounded-2xl bg-explore3 bg-no-repeat p-[2em]">
              <h1 className="p-3em text-3xl font-medium uppercase text-text3">
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
