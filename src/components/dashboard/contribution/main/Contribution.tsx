import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleButton from "../../../../shared/utils/ToggleButton";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { useContributionBalance } from "../../../../shared/Hooks/useBalance";
import contributionImg from "../../../../Assets/svg/dashboard/contribution/category-contribution.svg";
import { useUserContributionHistory } from "../../../../shared/Hooks/useUserProfile";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Contribution = {
  _id: any | null | undefined;
  contributionId: string;
  savingsCategory: string;
  balance: number;
  contributionPlan?: string;
  startDate?: string;
  nextContributionDate?: string;
  amount?: number;
};

const ContributionListSkeleton: React.FC = () => (
  <div className="mt-[1em] flex h-auto w-full flex-col gap-[1em] rounded-lg bg-text2 px-2 py-[3em] text-center">
    {Array.from({ length: 3 }).map((_, index) => (
      <div
        key={index}
        className="flex w-[90%] animate-pulse flex-col gap-2 rounded-full bg-white px-[1.5em] py-2"
      >
        <div className="flex justify-between">
          <div className="h-4 w-1/4 rounded bg-gray-200"></div>
          <div className="h-4 w-1/4 rounded bg-gray-200"></div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
            <div className="h-6 w-24 rounded bg-gray-200"></div>
          </div>
          <div className="h-6 w-32 rounded bg-gray-200"></div>
        </div>
      </div>
    ))}
  </div>
);

const Contribution: React.FC = () => {
  const navigate = useNavigate();
  const { formattedBalance, isLoading: isBalanceLoading } =
    useContributionBalance();
  const [page, setPage] = useState(1);
  const limit = 10;
  const {
    getContributions,
    isLoading: isContributionsLoading,
    error,
  } = useUserContributionHistory(page, limit);
  // console.log("geee",getContributions)
  const [isContributionVisible, setIsContributionVisible] = useState(() => {
    const storedVisibility = sessionStorage.getItem(
      "contributionBalanceVisible",
    );
    return storedVisibility !== null ? storedVisibility === "true" : true;
  });

  const totalPages = getContributions?.totalPages || 1;

  const handlePrevPage = () => setPage((prev) => Math.max(1, prev - 1));
  const handleNextPage = () =>
    setPage((prev) => Math.min(totalPages, prev + 1));

  const navigateToContributionDetails = (contributionId: string) => {
    if (!contributionId) return;
    navigate(`/dashboard/contribution/contribution_details`, {
      state: { contributionId },
    });
  };

  const fundContribution = () => {
    navigate("/dashboard/contribution/purpose");
  };

  const formatCurrency = (amount: number) => {
    if (!amount && amount !== 0) return "₦ 0";
    return `₦ ${amount.toLocaleString()}`;
  };

  return (
    <main className="pb-[1.5em] font-sans">
      <header className="sm:mt-[0] lg:mt-[2em]">
        <DashboardHeader className="flex items-center justify-center">
          Contribution Plan
        </DashboardHeader>
      </header>

      <section className="mt-[2em] sm:px-[1.5em] lg:mx-auto lg:w-[33em] lg:px-[0]">
        <article className="text-center text-text4">
          <div className="mt-[2em] rounded-3xl py-[2em] shadow-md">
            <div className="flex justify-center gap-4 font-sans">
              <p className="font-medium">Contribution Balance</p>
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

            <div className="mx-auto mt-[1.5em] w-[15em] rounded-md">
              {isBalanceLoading ? (
                <div className="h-8 animate-pulse rounded bg-gray-200"></div>
              ) : isContributionVisible ? (
                <p className="font-bold sm:text-xl lg:text-xl">
                  {formattedBalance}
                </p>
              ) : (
                <p className="text-2xl font-bold">*********</p>
              )}
              <hr className="mt-[1em] h-[1px] rounded-md bg-howtext" />
            </div>
          </div>

          <section className="mt-[2em]">
            <div className="flex justify-center">
              <button
                onClick={fundContribution}
                className="whitespace-nowrap rounded-full bg-inherit text-lg font-bold text-text2 shadow-lg sm:px-[1em] sm:py-[5px] lg:px-[3em] lg:py-[10px]"
              >
                Add Savings
              </button>
            </div>
            <hr className="mt-[2em] w-full" />
          </section>
        </article>
      </section>

      <section className="mt-[2em] px-[2em]">
        <header>
          <h1 className="text-xl font-bold">My Savings</h1>
        </header>

        {isContributionsLoading ? (
          <ContributionListSkeleton />
        ) : getContributions?.contributions?.length > 0 ? (
          <div className="mt-[1em] flex h-auto flex-col gap-[1em] rounded-lg bg-text2 px-2 py-[1.5em] text-center">
            <div className="mb-3 flex items-center justify-between px-4">
              <span className="font-medium text-white">
                Page {page}/{totalPages}
              </span>
              <div className="flex gap-2 font-semibold">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <IoIosArrowBack className="text-white" size={25} />
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={page >= totalPages}
                  className="disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <IoIosArrowForward className="text-white" size={25} />
                </button>
              </div>
            </div>
            <hr className="text-gray-500" />

            {getContributions?.contributions?.map(
              (contribution: Contribution) => (
                <div
                  key={contribution._id}
                  onClick={() =>
                    navigateToContributionDetails(contribution._id)
                  }
                  className="flex w-[90%] cursor-pointer flex-col gap-2 rounded-full border-2 border-gray-500 bg-white px-[1.5em] py-2 transition-colors hover:bg-gray-50"
                >
                  <div className="flex justify-between font-medium text-gray-500">
                    <p>Savings Name</p>
                    <p>Savings Balance</p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <img
                          src={contributionImg}
                          alt="Contribution category icon"
                        />
                      </div>
                      <p className="text-lg font-semibold">
                        {contribution?.savingsCategory}
                      </p>
                    </div>
                    <div>
                      <figure className="text-lg font-semibold">
                        {formatCurrency(contribution?.balance)}
                      </figure>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        ) : (
          <div className="mt-[1em] flex h-auto w-full flex-col gap-[1em] rounded-lg bg-text2 px-2 py-[3em] text-center">
            <h2 className="text-xl font-bold text-how1">No Savings Yet</h2>
            <p
              onClick={fundContribution}
              className="mt-[1.5em] cursor-pointer text-xl font-semibold text-how1"
            >
              Get Started
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Contribution;
