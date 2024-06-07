import { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import {
  MdOutlineVisibilityOff,
  MdOutlineVisibility,
  MdArrowOutward,
} from "react-icons/md";
import { ComingSoon } from "../../common/Button";
import person2 from "../../../Assets/png/dashboard/home.png";
import plus from "../../../Assets/png/home/plus.png";

const Home = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);

  const toggleVisibility = () => {
    setBalanceVisible((prevVisible) => !prevVisible);
  };

  return (
    <main className="mx-auto mb-[2em] px-[2em] font-sans">
      <header className="flex justify-between sm:mt-[1em] lg:mt-[2.5em]">
        <div className="font-medium">
          <p>Welcome Back!</p>
          <p className="font-semibold">Ogba Presido</p>
        </div>
        <div>
          <IoIosNotifications className="cursor-pointer fill-text4" size={27} />
        </div>
      </header>
      <section className="text-center text-text4">
        <article className="mt-[2em] rounded-3xl py-[2em] shadow-lg sm:px-[2em]">
          <div className="flex items-center justify-center gap-4">
            <p>Total Balance</p>
            <div>
              <button
                className="bg-inherit sm:ml-[2px] lg:ml-[3px]"
                onClick={toggleVisibility}
              >
                {balanceVisible ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )}
              </button>
            </div>
          </div>
          <div className="mx-auto mt-[1.5em] rounded-md lg:w-[15em]">
            {balanceVisible ? (
              <p className="font-bold sm:text-xl lg:text-2xl">N 500,000.00</p>
            ) : (
              <p className="text-2xl font-bold">*********</p>
            )}

            <hr className="mt-[1em] h-[1px] rounded-md bg-howtext" />
          </div>
          <div className="mt-[1em] flex justify-center gap-2">
            <span>Total Gains</span>
            <MdArrowOutward className="fill-act" />
            <span className="font-semibold text-act">0%</span>
          </div>
        </article>
      </section>
      <div>
        <button className="mx-auto mt-[2em] w-full rounded-3xl bg-inherit py-[1em] text-center text-lg font-semibold text-text4 shadow-md">
          + Add Fund
        </button>
      </div>
      <section className="mt-[2em] w-full">
        <header>
          <p className="font-semibold sm:text-lg">Create a portfolio</p>
          <p className="mt-[1em]">
            Start your investment journey by creating a portfolio
          </p>
        </header>
        <div className="mt-4 gap-[1.5em] space-y-[1.5em] sm:flex-col lg:flex lg:flex-row">
          <article className="mt-2 flex h-[230px] flex-col items-center justify-center rounded-lg bg-Dh font-semibold shadow-md lg:w-[180px]">
            <img
              width="24"
              height="24"
              src={plus}
              alt="plus"
              className="w-[3em] cursor-pointer shadow-sm"
            />
            <p className="font-sans sm:text-lg sm:font-semibold">Create a</p>
            <p className="font-sans sm:text-lg sm:font-semibold">
              portfolio project
            </p>
          </article>
          <article>
            <div
              className="rounded-xl bg-no-repeat p-[1em]"
              style={{
                backgroundImage: `url(${person2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100%",
              }}
            >
              <h1 className="p-[1em] text-lg font-medium uppercase text-text3">
                automated ai <br /> learning Platform
              </h1>
              <div className="mt-[3.5em]">
                <ComingSoon className="bg-coming2">Coming Soon</ComingSoon>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Home;
