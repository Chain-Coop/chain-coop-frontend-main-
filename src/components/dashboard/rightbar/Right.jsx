import newspaper from "../../../../public/images/svg/newspaper.svg";
import { SiGooglemessages } from "react-icons/si";
import { IoIosArrowForward } from "react-icons/io";
import person2 from "../../../../public/images/png/ladylaptop.png";
import person3 from "../../../../public/images/png/ladylaptop3.png";

import { ComingSoonB } from "../../common/Button";

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
          <div className="mt-[1.5em] text-sm">4 mins ago</div>
        </article>
        <header className="mt-[2em]">
          <h2 className="text-lg font-semibold">Need Help? Contact Us </h2>
        </header>
        <hr className="mt-[1.5em] h-1" />
        <article className="mt-[1.5em] flex items-center gap-2">
          <div>
            <SiGooglemessages className="fill-text2" size={45} />
          </div>
          <div className="flex w-full flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text2">Contact Us</h2>
              <p>
                Chat with a member of our <br /> customer success team.
              </p>
            </div>
          </div>
          <div>
            <IoIosArrowForward
              size={20}
              className="cursor-pointer text-text2"
            />
          </div>
        </article>

        <hr className="mt-[1.5em] h-1" />
        <section className="mt-[1.5em] flex items-center gap-2">
          <div className="box-logo">
            <SiGooglemessages className="cursor-pointer fill-text2" size={40} />
          </div>
          <article className="flex w-full flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-text2">
                Coop Onboarding Series
              </h2>
              <p>
                Watch Our Onboarding Videos <br /> to get started
              </p>
            </div>
          </article>
          <div>
            <IoIosArrowForward
              size={20}
              className="cursor-pointer text-text2"
            />
          </div>
        </section>

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
              <div className="">
                <ComingSoonB text="" />
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
              <div className="">
                <ComingSoonB text="" />
              </div>
            </article>
          </div>
        </section>
      </section>
    </aside>
  );
};

export default Right;
