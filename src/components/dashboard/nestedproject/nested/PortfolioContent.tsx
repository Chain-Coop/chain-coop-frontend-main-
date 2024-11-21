import React from "react";
import { useAllUserFundedProjects } from "../../../../shared/Hooks/useUserProfile";
import { ComingSoon } from "../../../common/Button";

const PortfolioContent = () => {
  const { useUserProjects, loading } = useAllUserFundedProjects();
  console.log("user", useUserProjects);
  const { totalFundedProjects, totalFundedAmount, fundedProjects } =
    useUserProjects || {};

  if (loading) {
    return (
      <main className="font-sans">
        <div className="sm:px-[1.5em] lg:px-0">
          <div>
            <p className="text-medium font-bold">Your Portfolio</p>
          </div>
          <div className="mt-[1.5em] justify-between sm:flex-col lg:flex lg:flex-row">
            <article>
              <div className="animate-pulse rounded-lg bg-rec1 p-[1.5em] text-center shadow-md sm:w-full lg:w-[14em]">
                <p className="text-xl font-medium text-fade">Net Worth Asset</p>
                <div className="mt-2 h-8 rounded bg-gray-200"></div>
              </div>
            </article>

            <article className="sm:mt-[1.5em] sm:text-center lg:mt-0">
              <div className="animate-pulse rounded-lg bg-rec1 p-[1.5em] shadow-md sm:w-full lg:w-[14em]">
                <p className="text-xl font-medium text-fade">Asset Type</p>
                <div className="mt-2 h-8 rounded bg-gray-200"></div>
              </div>
            </article>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="font-sans">
      <div className="sm:px-[1.5em] lg:px-0 ">
        <div>
          <p className="text-medium font-bold">Your Portfolio</p>
        </div>
        <div className="mt-[1.5em] justify-between sm:flex-col lg:flex lg:flex-row">
          <article>
            <div className="rounded-lg bg-rec1 p-[1.5em] text-center shadow-md sm:w-full lg:w-[14em]">
              <p className="text-xl font-medium text-fade">Net Worth Asset</p>
              <h2 className="text-2xl font-bold text-text4 ">
                {totalFundedProjects?.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                })}
              </h2>
            </div>
          </article>

          <article className="sm:mt-[1.5em] sm:text-center lg:mt-0">
            <div className="rounded-lg bg-rec1 p-[1.5em] shadow-md sm:w-full lg:w-[14em]">
              <p className="text-xl font-medium text-fade">Asset Type</p>
              <h2 className="text-2xl font-bold text-text4 ">
                {totalFundedAmount || 0}
              </h2>
            </div>
          </article>
        </div>

        <div className="mb-[2em] mt-[4em] flex flex-col gap-[2em]">
          {fundedProjects?.length > 0 ? (
            fundedProjects?.map((project: any, index: number) => (
              <article key={index} className="w-full">
                <div
                  className="rounded-xl bg-explore2 bg-cover bg-center bg-no-repeat p-[1em]"
                  style={{
                    backgroundImage: `url(${project.imageUrl})`,
                  }}
                >
                  <h1 className="p-[1em] font-sans text-lg font-medium uppercase text-text3">
                    {project.title}
                  </h1>
                  <div className="mt-12">
                    <ComingSoon className="bg-coming2">
                      {project?.status}
                    </ComingSoon>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p>No projects funded yet.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default PortfolioContent;
