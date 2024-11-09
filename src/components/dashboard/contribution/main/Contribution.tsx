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
  <div className="w-full px-2 bg-text2 rounded-lg flex flex-col h-auto gap-[1em] mt-[1em] text-center py-[3em]">
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="rounded-full w-[90%] flex flex-col gap-2 py-2 px-[1.5em] bg-white animate-pulse">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="h-6 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    ))}
  </div>
);

const Contribution: React.FC = () => {
  const navigate = useNavigate();
  const { formattedBalance, isLoading: isBalanceLoading } = useContributionBalance();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { getContributions, isLoading: isContributionsLoading, error } = useUserContributionHistory(page, limit);
  console.log("geee",getContributions)
  const [isContributionVisible, setIsContributionVisible] = useState(() => {
    const storedVisibility = sessionStorage.getItem("contributionBalanceVisible");
    return storedVisibility !== null ? storedVisibility === "true" : true;
  });

  const totalPages = getContributions?.totalPages || 1;
  
  const handlePrevPage = () => setPage(prev => Math.max(1, prev - 1));
  const handleNextPage = () => setPage(prev => Math.min(totalPages, prev + 1));

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
    <main className="font-sans pb-[1.5em]">
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
                  sessionStorage.setItem("contributionBalanceVisible", newVisibility.toString());
                }}
              />
            </div>

            <div className="mx-auto mt-[1.5em] w-[15em] rounded-md">
              {isBalanceLoading ? (
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              ) : isContributionVisible ? (
                <p className="font-bold sm:text-xl lg:text-xl">{formattedBalance}</p>
              ) : (
                <p className="text-2xl font-bold">*********</p>
              )}
              <hr className="mt-[1em] h-[1px] rounded-md bg-howtext" />
            </div>
          </div>

          <section className="mt-[2em]">
            <div className="flex justify-center">
              <button onClick={fundContribution} className="rounded-full text-text2 font-bold bg-inherit text-lg shadow-lg whitespace-nowrap sm:px-[1em] sm:py-[5px] lg:px-[3em] lg:py-[10px]">
                Add Savings
              </button>
            </div>
            <hr className="mt-[2em] w-full" />
          </section>
        </article>
      </section>

      <section className="mt-[2em] px-[2em]">
        <header>
          <h1 className="font-bold text-xl">My Savings</h1>
        </header>

        {isContributionsLoading ? (
          <ContributionListSkeleton />
        ) : getContributions?.contributions?.length > 0 ? (
          <div className="px-2 bg-text2 rounded-lg flex flex-col h-auto gap-[1em] mt-[1em] text-center py-[1.5em]">
            <div className="flex justify-between items-center px-4 mb-3">
              <span className="text-white font-medium">Page {page}/{totalPages}</span>
              <div className="flex font-semibold gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <IoIosArrowBack className="text-white" size={25}/>
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={page >= totalPages}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <IoIosArrowForward className="text-white" size={25} />
                </button>
              </div>
            </div>
            <hr className="text-gray-500"/>

            {getContributions?.contributions?.map((contribution: Contribution) => (
            <div
                key={contribution._id}
                onClick={() => navigateToContributionDetails(contribution._id)}
                className="rounded-full cursor-pointer w-[90%] flex border-2 border-gray-500 flex-col gap-2 py-2 px-[1.5em] bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex font-medium text-gray-500 justify-between">
                  <p>Savings Name</p>
                  <p>Savings Balance</p>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <img src={contributionImg} alt="Contribution category icon" />
                    </div>                    
                    <p className="font-semibold text-lg">{contribution?.savingsCategory}</p>
                  </div>
                  <div>
                    <figure className="font-semibold text-lg">
                      {formatCurrency(contribution?.balance)}
                    </figure>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full px-2 bg-text2 rounded-lg flex flex-col h-auto gap-[1em] mt-[1em] text-center py-[3em]">
            <h2 className="text-how1 font-bold text-xl">No Savings Yet</h2>
            <p onClick={fundContribution} className="text-how1 font-semibold mt-[1.5em] text-xl cursor-pointer">
              Get Started
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Contribution;

