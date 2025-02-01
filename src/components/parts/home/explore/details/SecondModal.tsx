import React from "react";
import explore2 from "../../../../../Assets/png/home/savings-group-mini.png";
import { brandPrimary } from "../../../../common/Button";

const SecondModal = () => {
  return (
    <main className="w-full max-w-[43em] px-2 font-sans sm:px-3 md:px-5">
      <section className="flex flex-col gap-3 py-3 md:py-8">
        <div className="flex flex-col gap-3">
          <header className="flex flex-col gap-2 px-2 text-center sm:px-4">
            <h3 className="text-sm font-semibold leading-tight text-gray-400 sm:text-base md:text-lg">
              OverView
            </h3>
            <h1 className="font-bold leading-tight text-text2 sm:text-lg md:text-2xl lg:text-xl">
              GROUP SAVIGS CYCLE
            </h1>
          </header>

          <article className="px-2 sm:px-3">
            <p className="text-xs font-medium text-gray-600 sm:text-sm">
              Saving Cycles designed to revolutionize how individuals, Traders,
              SMEs and corperate business in groups achieve financial growth.
              Members join savings groups contributing one at a time until the
              cycle is complete. all fully automated and seamlessly managed.
              Flexible microcredit is available in Naira, Dollars, Bitcoin and
              more wit zero interest rates, ensuring everyone can grow without
              financial starin.
            </p>
            <p className="mt-2 text-xs font-medium text-gray-600 sm:text-sm">
              This blockchain-backed platform guanrantees transparency and
              security nsuring that every transaction is safe and tamper-proof.
              Supported by advanced security Savings Cycles offers a reliable
              and efficient solution for savings and credit.
            </p>
            <p className="mt-2 text-xs font-medium text-gray-600 sm:text-sm">
              Plus participants can earn attarctive yields on their savings.
              maximizing the value of their contributions.
            </p>
          </article>

          <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <div className="w-full sm:w-auto">
              <img
                src={explore2}
                alt="automated-ai-learning-platform"
                className="h-[8em] w-full object-cover sm:h-[10em] sm:w-[10em]"
              />
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <p className="text-xs font-medium text-gray-600 sm:text-sm">
                Be part of this financial revolution. Stay tuned for the launch
                of Saving Cycles and unlock the power of automated savings and
                secure financial support
              </p>
              <Primary className="w-full rounded-lg bg-text2 px-4 py-2 font-semibold text-white transition-transform duration-300 hover:scale-110 sm:w-[11em]">
                Coming soon
              </Primary>
            </div>
          </div>

          <div className="mt-3 flex flex-col justify-between gap-2 sm:flex-row sm:gap-0">
            <h2 className="text-center text-base font-semibold text-red-600 sm:text-left sm:text-lg">
              Annual Percentage Rate: 30%
            </h2>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SecondModal;
