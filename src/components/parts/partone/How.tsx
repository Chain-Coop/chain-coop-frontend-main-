import React from "react";
import step1 from "../../../Assets/png/home/howto-step1.png";
import step2 from "../../../Assets/png/home/howto-step2.png";
import step3 from "../../../Assets/png/home/howto-step3.png";

const How = () => {
  return (
    <main className="mx-auto font-sans sm:mt-[3em] sm:px-[1em] lg:mt-[8em] lg:w-[86%] lg:px-[0]">
      <header className="flex justify-center">
        <h1 className="text-3xl font-bold">How to Get started</h1>
      </header>
      <section className="mt-8 flex flex-col lg:flex-row lg:space-x-9">
        <article className="relative  my-4 flex flex-col justify-between rounded-xl bg-how1 p-[3em] sm:h-[411px] md:h-[250px] lg:h-[411px]">
          <img
            src={step1}
            className="absolute inset-0 mx-auto self-center object-cover"
            alt="Step 1"
          />
          <div>
            <h1 className="text-2xl font-bold text-howtext">
              Register as <br /> member
            </h1>
            <p className="mt-4 font-sans font-medium text-howtext">
              Complete our Know Your Customer (KYC) process for a legally
              compliant and secure registration. Once verified, you can
              contribute to project development, invest in sustainable business
              and much more.
            </p>
          </div>
        </article>

        <article className="relative my-4 flex flex-col justify-between rounded-xl bg-how2 p-[3em] sm:h-[411px] md:h-[250px] lg:h-[411px]">
          <img
            src={step2}
            className="absolute inset-0 mx-auto self-center object-cover"
            alt="Step 2"
          />
          <div>
            <h1 className="text-2xl font-bold text-howtext">
              Purchase Your <br /> Card
            </h1>
            <p className="mt-4 font-medium text-howtext">
              {`Buy your membership card and get your stake in Coop. Once you've
              passed the registration process, your card becomes the bearer of
              your Coop stake and bringer of the corresponding dividends.`}
            </p>
          </div>
        </article>

        <article className="relative my-4 flex flex-col justify-between rounded-xl bg-how3 p-[3em] sm:h-[411px] md:h-[280px] lg:h-[411px]">
          <img
            src={step3}
            className="absolute inset-0 mx-auto self-center object-cover"
            alt="Step 3"
          />
          <div>
            <h1 className="text-2xl font-bold text-howtext">
              Access the Coop <br /> Wallet and Build <br /> Your Income
            </h1>
            <p className="mt-4 font-medium text-howtext">
              As a member, you will soon be able to use our customized app and
              get access to the entire Coop ecosystem. Purchase discounted goods
              and services, invest in one or more of our innovative businesses,
              build your portfolio, and track your growth.
            </p>
          </div>
        </article>
      </section>
    </main>
  );
};

export default How;
