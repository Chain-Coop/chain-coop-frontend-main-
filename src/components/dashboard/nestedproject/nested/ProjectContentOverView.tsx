import React, { useEffect, useState } from "react";
import { DashboardHeader } from "../../../common/DashboardHeader";
import ProjectContentDetails from "./ProjectContentDetails";
import PortfolioContent from "./PortfolioContent";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router";
import { AppDispatch } from "../../../../shared/redux/store";
import { useAppDispatch } from "../../../../shared/redux/reduxHooks";
import { useSelector } from "react-redux";
import { GetProjectById } from "../../../../shared/redux/slices/transaction.slices";

const ProjectContentOverView = () => {
  const [activeLink, setActiveLink] = useState("project");
  const location = useLocation();
  const { projectId } = location.state || {};
  const dispatch = useAppDispatch<AppDispatch>();
  const { currentProject, loading, error } = useSelector(
    (state: any) => state?.transaction,
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (projectId) {
      dispatch(GetProjectById({ projectId }));
    }
  }, [dispatch, projectId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const renderContent = () => {
    if (loading) {
      return <SkeletonLoader />;
    }
    if (error) {
      return <ErrorMessage message={error} />;
    }
    if (!currentProject) {
      return <NoProjectFound />;
    }
    return (
      <>
        {activeLink === "project" && (
          <ProjectContentDetails project={currentProject} />
        )}
        {activeLink === "portfolio" && <PortfolioContent />}
      </>
    );
  };

  return (
    <main className="mb-8 font-sans">
      <div className="sm:mt-[0] lg:mt-8">
        <DashboardHeader
          className="relative cursor-pointer items-center lg:mt-[2em]"
          onClick={handleBackClick}
        >
          <IoIosArrowBack
            size={25}
            className="absolute left-0 cursor-pointer"
          />
          <div className="flex flex-grow items-center justify-center">
            <div className="tracking-wide">Project Overview</div>
          </div>
        </DashboardHeader>
        <div>
          <nav>
            <div className="mt-8 flex justify-between border-b-[1px] border-howtext px-3 text-base font-semibold">
              <div
                className={`cursor-pointer ${activeLink === "project" ? "mt-4 flex w-[5em] justify-center rounded-sm border-b-[3px] border-text2" : "mt-4"}`}
                onClick={() => setActiveLink("project")}
              >
                Project
              </div>
              <div
                className={`cursor-pointer ${activeLink === "portfolio" ? "mt-4 w-[4em] border-b-[3px] border-text2" : "mt-4"}`}
                onClick={() => setActiveLink("portfolio")}
              >
                Portfolio
              </div>
            </div>
          </nav>
          <section className="mt-8">{renderContent()}</section>
        </div>
      </div>
    </main>
  );
};

const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="mb-4 h-8 w-3/4 rounded bg-gray-200"></div>
    <div className="mb-2 h-4 w-1/2 rounded bg-gray-200"></div>
    <div className="mb-2 h-4 w-2/3 rounded bg-gray-200"></div>
    <div className="mb-2 h-4 w-1/3 rounded bg-gray-200"></div>
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="font-semibold text-red-500">Error: {message}</div>
);

const NoProjectFound = () => (
  <div className="font-semibold text-gray-500">No project found</div>
);

export default ProjectContentOverView;
