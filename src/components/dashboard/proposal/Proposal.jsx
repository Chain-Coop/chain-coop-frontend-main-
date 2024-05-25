import { DashboardHeader } from "../../common/DashboardHeader";
import { FiSearch } from "react-icons/fi";
import { IoIosPeople } from "react-icons/io";
import plus from "../../../../public/images/png/plus.png";

import { Link } from "react-router-dom";

const Proposal = () => {
  return (
    <div className="font-sans">
      <div className="sm:mt-0 lg:mt-8">
        <header>
          <DashboardHeader text="Proposal" />
        </header>
        <div className="mx-auto mt-8 sm:px-[1em] lg:w-[31em] lg:px-[0]">
          <section className="mb-4">
            <h2 className="text-lg font-bold">Explore DAOs</h2>
          </section>
          <section className="flex w-full flex-col items-center justify-center rounded-lg bg-text2 text-text3 sm:py-[2em] lg:h-[11em] lg:py-[0]">
            <h1 className="mb-2 text-4xl font-bold">25</h1>
            <p className="font-base text-sm">Available DAOs</p>
          </section>
          <section className="mt-[1em] grid w-full grid-cols-1 items-center justify-between gap-4 text-center text-text3 sm:grid-cols-2 lg:grid-cols-2">
            <div className="box1 flex flex-col justify-center rounded-lg bg-text2 py-[2em]">
              <h1 className="mb-2 text-4xl font-bold">2</h1>
              <p>DOA Joined</p>
            </div>
            <div className="flex flex-col justify-center rounded-lg bg-text2 py-[2em]">
              <h1 className="mb-2 text-4xl font-bold">4</h1>
              <p>Proposal</p>
            </div>
          </section>
          <section className="relative mt-[2em]">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[2em]">
              <FiSearch className="text-lg" />
            </div>
            <input
              type="text"
              className="w-full rounded-full p-[1em] pl-[3.5em] pr-[1em] shadow-lg"
              placeholder="search for DAOs"
            />
          </section>
          <section className="mt-[2em] grid gap-8">
            <article className="rounded-xl bg-coming1 px-4 py-7 shadow-lg">
              <div className="items-center justify-between lg:flex">
                <div className="flex">
                  <div className="circle h-16 w-16 rounded-full bg-bl"></div>
                  <div className="ml-4 flex flex-col justify-center">
                    <h2 className="text-lg font-semibold text-text4">
                      Project Name
                    </h2>
                    <div className="flex items-center text-sm font-light text-text4">
                      <IoIosPeople className="mr-1" />
                      <span>10k+ Members</span>
                    </div>
                  </div>
                </div>
                <button className="rounded-full bg-text2 px-6 py-1 text-sm text-white sm:mt-3 lg:mt-0">
                  Join DAO
                </button>
              </div>
              <p className="mt-4 text-xs font-medium">
                Welcome to our cutting edge AI learning platform, where
                education meets innovation through automation. Our platform
                leverages the power of artificial intelligence to revolutionize
                the way you learn, grow, and excel in the field of AI.
              </p>
            </article>

            <article className="rounded-xl bg-how3 px-4 py-7 shadow-lg">
              <div className="items-center justify-between lg:flex">
                <div className="flex">
                  <div className="h-16 w-16 rounded-full bg-bl"></div>
                  <div className="ml-4 flex flex-col justify-center">
                    <h2 className="text-lg font-semibold text-text4">
                      Project Name
                    </h2>
                    <div className="flex items-center text-sm font-light text-text4">
                      <IoIosPeople className="mr-1" />
                      <span>10k+ Members</span>
                    </div>
                  </div>
                </div>
                <button className="rounded-full  bg-text2 px-6 py-1 text-sm text-white sm:mt-3 lg:mt-0">
                  Join DAO
                </button>
              </div>
              <p className="mt-4 text-xs font-medium">
                Welcome to our cutting edge AI learning platform, where
                education meets innovation through automation. Our platform
                leverages the power of artificial intelligence to revolutionize
                the way you learn, grow, and excel in the field of AI.
              </p>
            </article>
          </section>

          <section className="mb-[2em] mt-[2em] flex h-[250px] w-[190px] flex-col items-center justify-center rounded-lg border bg-Dh px-[1em] font-semibold shadow-lg hover:shadow-2xl">
            <Link to="/dashboard/proposal/submit-proposal">
              <img
                width="24"
                height="24"
                src={plus}
                alt="plus"
                className="w-[3em] cursor-pointer shadow-sm"
              />
            </Link>
            <p>Submit a </p>
            <p>proposal</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
