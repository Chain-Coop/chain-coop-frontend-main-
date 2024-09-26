import React, { useEffect, useState } from "react";
import { DashboardHeader } from "../../../common/DashboardHeader";
import ProjectContentDetails from "./ProjectContentDetails";
import PortfolioContent from "./PortfolioContent";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router";
import { AppDispatch } from "../../../../shared/redux/store";
import { useAppDispatch } from "../../../../shared/redux/reduxHooks";
import { useSelector } from "react-redux";
import { GetProjectById } from "../../../../shared/redux/slices/transaction.slices";

const ProjectContentOverView = () => {
  const [activeLink, setActiveLink] = useState("project");
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useAppDispatch<AppDispatch>();
  const { currentProject, loading, error } = useSelector((state: any) => state?.transaction);

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
        {activeLink === "project" && <ProjectContentDetails project={currentProject} />}
        {activeLink === "portfolio" && <PortfolioContent />}
      </>
    );
  };

  return (
    <main className="font-sans mb-8">
      <div className="sm:mt-[0] lg:mt-8">
        <DashboardHeader
          className="relative cursor-pointer lg:mt-[2em] items-center"
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
        <div className="mx-auto lg:w-[34em] lg:px-0">
          <nav>
            <div className="flex justify-between border-b-[1px] border-howtext text-base font-semibold sm:px-3">
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
          <section className="mt-8">
            {renderContent()}
          </section>
        </div>
      </div>
    </main>
  );
};

const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="text-red-500 font-semibold">Error: {message}</div>
);

const NoProjectFound = () => (
  <div className="text-gray-500 font-semibold">No project found</div>
);

export default ProjectContentOverView;