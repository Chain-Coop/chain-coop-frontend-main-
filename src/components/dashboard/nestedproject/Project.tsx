import React from "react";
import { useState } from "react";
import { DashboardHeader } from "../../common/DashboardHeader";
import PortfolioContent from "./nested/PortfolioContent";
import ProjectContent from "./nested/ProjectContent";


const Project = () => {
  const [activeLink, setActiveLink] = useState("project");

  return (
    <main className="font-sans">
      <div className="sm:mt-[0] lg:mt-8">
        <header>
          <DashboardHeader className="flex items-center justify-center">
            Project
          </DashboardHeader>
        </header>
        <div className="mx-auto lg:w-[34em] lg:px-0">
          <nav>
            <div className="mt-8 flex justify-between border-b-[1px] border-howtext text-base font-semibold sm:px-3">
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
            {activeLink === "project" && <ProjectContent />}
            {activeLink === "portfolio" && <PortfolioContent />}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Project;
