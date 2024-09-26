import React from "react";
import { ComingSoon } from "../../../common/Button";
import { useAllProjects } from "../../../../shared/Hooks/useUserProfile";
import { useNavigate } from "react-router-dom";

const ProjectContent = () => {
  const { useProjects, loading } = useAllProjects();
  const navigate = useNavigate();

  const handleProjectClick = (projectId: string) => {
    navigate(`/dashboard/project/project_over-view/${projectId}`);
  };

  const renderProjects = () => {
    if (loading) {
      return <SkeletonLoader />;
    }

    if (!useProjects || useProjects.length === 0) {
      return <NoProjectsFound />;
    }

    return (
      <>
        <article 
          className="mt-[2em] items-center rounded-xl bg-no-repeat p-[2em] cursor-pointer"
          style={{
            backgroundImage: `url(${useProjects[0]?.documentUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          onClick={() => handleProjectClick(useProjects[0]._id)}
        >
          <h1 className="p-3em font-sans text-3xl font-medium uppercase text-text3">
            {useProjects[0]?.title}
          </h1>
          <ComingSoon className="mt-[19em] flex bg-coming1">
            {useProjects[0]?.status}
          </ComingSoon>
        </article>

        <div className="mb-[2em] mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {useProjects.slice(1)?.map((project:any) => (
            <div 
              key={project._id}
              className="rounded-lg bg-cover bg-center cursor-pointer"
              style={{
                backgroundImage: `url(${project.documentUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onClick={() => handleProjectClick(project._id)}
            >
              <article className="p-6">
                <h1 className="text-lg font-medium uppercase text-text3">
                  {project?.title}
                </h1>
                <ComingSoon className="mt-4 bg-coming2">{project?.status}</ComingSoon>
              </article>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <main className="font-sans">
      <div className="sm:px-[1em] lg:px-0">
        <section>
          <p className="text-medium font-bold">Project</p>
          <p className="mt-[1em] font-medium text-sm">
            {loading ? "Loading projects..." : "Click on any of the cards to view project details"}
          </p>
        </section>

        <section>
          {renderProjects()}
        </section>
      </div>
    </main>
  );
};

const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="mt-[2em] h-64 bg-gray-200 rounded-xl"></div>
    <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="h-40 bg-gray-200 rounded-lg"></div>
      <div className="h-40 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
);

const NoProjectsFound = () => (
  <div className="mt-[2em] text-center text-gray-500">
    <p className="text-xl font-semibold">No projects found</p>
    <p className="mt-2">Create a new project to get started</p>
  </div>
);

export default ProjectContent;