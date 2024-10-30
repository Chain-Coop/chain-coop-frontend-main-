import React from "react";
import newspaper from "../../../Assets/svg/dashboard/newspaper.svg";
import person2 from "../../../Assets/png/dashboard/right.png";
import person3 from "../../../Assets/png/home/ladylaptop3.png";
import { ComingSoon } from "../../common/Button";

const Right = () => {
  return (
    <aside className="h-vh flex w-full flex-col border-l border-bl bg-inherit px-[3em] py-[3em] font-sans text-memt1 shadow-md">
      <section>
        <article className="rounded-xl bg-Dh p-[1em] shadow-md">
          <header className="text-xl font-semibold">
            <h2>Stay Updated with our</h2>
            <h2>Latest Developments</h2>
          </header>
          <div className="flex justify-between text-sm">
            <p>
              Experience the Power of Coop Wallet, Powered by Chain Coop
              Network, a Business-Oriented Community Designed as a Cooperative
              for Open and Digital Membership
            </p>
            <img src={newspaper} alt="newpaper-icon" />
          </div>
        </article>


        <hr className="mt-[1.5em] h-1" />
     
        <section className="mt-[2em] flex flex-col text-text4">
          <header>
            <h2 className="text-xl font-bold">Ongoing Project of Chain Coop</h2>
          </header>
          <div className="w-full">
            <article
              className="mt-[1em] rounded-xl bg-no-repeat p-[1em]"
              style={{
                backgroundImage: `url(${person2})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                width: "100%",
              }}
            >
              <h1 className="p-[1em] text-lg font-medium uppercase text-text3">
                automated ai learning Platform
              </h1>
              <div>
                <ComingSoon className="bg-coming2">Coming Soon</ComingSoon>
              </div>
            </article>
          </div>
          {/* */}
          <div className="mt-[1em] h-[200px] w-full">
            <article
              className="rounded-xl bg-no-repeat p-[1em]"
              style={{
                backgroundImage: `url(${person3})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                width: "100%",
              }}
            >
              <h1 className="p-[1em] text-lg font-medium uppercase text-text3">
                automated ai learning Platform
              </h1>
              <ComingSoon className="bg-coming2">Coming Soon</ComingSoon>
            </article>
          </div>
        </section>
      </section>
    </aside>
  );
};

export default Right;
