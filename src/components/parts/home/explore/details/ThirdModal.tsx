import React from "react";
import explore2 from "../../../../../Assets/png/home/savings-credit-service.png";
import { Primary } from "../../../../common/Button";

const ThirdModal = () => {
  return (
    <main className="w-full max-w-[43em] px-2 font-sans sm:px-3 md:px-5">
      <section className="flex flex-col gap-3 py-3 md:py-8">
        <div className="flex flex-col gap-3">
          <header className="flex flex-col gap-2 px-2 text-center sm:px-4">
            <h3 className="text-sm font-semibold leading-tight text-gray-400 sm:text-base md:text-lg">
              OverView
            </h3>
            <h1 className="font-bold leading-tight text-text2 sm:text-lg md:text-2xl lg:text-xl">
              SAVIGS and Credit as a Service: Simplifying Financial Automation
            </h1>
          </header>

          <article className="px-2 sm:px-3">
            <p className="text-xs font-medium text-gray-600 sm:text-sm">
              Our Savings and Credit platform enables businesses, developers,
              NGOs, and cooperatives to streamline their financial operations
              with API intergration, you can automate revenue, collections and
              disbursements seamlessly, wheathr for a single organization or
              cooperative-to-cooperative (C-to-C) networks. Everything operates
              with just a click, empowring you ro save time and resouces.
            </p>
            <p className="mt-2 text-xs font-medium text-gray-600 sm:text-sm">
              By leveraging this advanced solution, you can launch savings and
              credit systems tailored to your needs. the platform is built to
              ensure efficiency and flexibility enabling you to scale operations
              effortlessly while focusing on growth.
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
                Take control of your financial systems with ease. Stay tuned for
                the launch of this groundbreaking service and revolutionze your
                savings and credit solutions.
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

export default ThirdModal;
