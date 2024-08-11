import { useState } from "react";
import ToggleButton from "../../../shared/utils/ToggleButton";
import useBalance from "../../../shared/Hooks/useBalance";
import { DashboardHeader } from "../../common/DashboardHeader";
import { MdArrowOutward } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

const Contribution = () => {
  const [isContributionVisible, setIsContributionVisible] = useState(() => {
    const storedVisibility = sessionStorage.getItem(
      "contributionBalanceVisible",
    );
    return storedVisibility !== null ? storedVisibility === "true" : true;
  });
  const { formattedBalance } = useBalance();

  return (
    <main className="font-sans">
      <header className="sm:mt-[0] lg:mt-[2em]">
        <DashboardHeader className="flex items-center justify-center">
          Monthly Contribution
        </DashboardHeader>
      </header>
      <section className="mt-[2em] sm:px-[1.5em] lg:mx-auto lg:w-[33em] lg:px-[0]">
        <article className="text-center text-text4">
          <div className="mt-[2em] rounded-3xl py-[2em] shadow-md">
            <div className="flex justify-center gap-4 font-sans">
              <p className="font-medium">Contribution Balance</p>
              <div>
                <ToggleButton
                  isVisible={isContributionVisible}
                  onToggle={(newVisibility) => {
                    setIsContributionVisible(newVisibility);
                    sessionStorage.setItem(
                      "contributionBalanceVisible",
                      newVisibility.toString(),
                    );
                  }}
                />
              </div>
            </div>
            <div className="mx-auto mt-[1.5em] w-[15em] rounded-md">
              {isContributionVisible ? (
                <p className="font-bold sm:text-xl lg:text-xl">
                  {formattedBalance}
                </p>
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
          </div>
          <section className="mt-[2em]">
            <div className="flex justify-between">
              <div>
                <button className="rounded-full bg-inherit text-lg font-semibold shadow-md sm:px-[2em] sm:py-[5px] lg:px-[3em] lg:py-[10px]">
                  Payment
                </button>
              </div>
              <div>
                <button className="rounded-full bg-inherit text-lg font-semibold shadow-md sm:px-[2em] sm:py-[5px] lg:px-[3em] lg:py-[10px]">
                  Withdraw
                </button>
              </div>
            </div>
            <hr className="mt-[2em] w-full" />
            <div className="auto-deduction mt-[1em] flex justify-between">
              <p className="sm:font-semibold lg:text-sm lg:font-medium">
                Auto-Deduction from Wallet
              </p>
              <div className="flex items-center">
                <button className="cursor-pointer rounded-full font-medium sm:px-[1em] sm:py-[2px] lg:px-[1.5em] lg:py-[5px]">
                  Turn Off
                </button>
                <IoIosArrowForward className="cursor-pointer" />
              </div>
            </div>
          </section>
        </article>
        <section className="mt-[1em]">
          <p className="text-lg font-semibold">Monthly Contribution Tracker</p>
        </section>
        <div>
          <p className="mt-[1em] text-sm">
            Effortlessly manage and monitor your financial commitments
          </p>
        </div>
      </section>
    </main>
  );
};

export default Contribution;
