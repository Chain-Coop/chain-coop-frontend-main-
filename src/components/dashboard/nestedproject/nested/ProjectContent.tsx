import React from "react";
import { ComingSoon } from "../../../common/Button";
import { useAllProjects } from "../../../../shared/Hooks/useUserProfile";

const ProjectContent = () => {
  const { useProjects } = useAllProjects();

  return (
    <main className="font-sans">
      <div className="sm:px-[1em] lg:px-0">
        <section>
          <p className="text-medium font-bold">Project</p>
          {useProjects?.length === 0 ? (
            <p className="mt-[1em] text-sm">
              You have not created any portfolio yet. Click on any of the cards to
              create your portfolio
            </p>
          ) : (
            <p className="mt-[1em] text-sm">
              Here are your current projects:
            </p>
          )}
        </section>

        <section>
          {useProjects?.length > 0 && (
            <article 
              className="mt-[2em] items-center rounded-xl bg-no-repeat p-[2em]"
              style={{
                backgroundImage: `url(${useProjects[0]?.documentUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <h1 className="p-3em font-sans text-3xl font-medium uppercase text-text3">
                {useProjects[0]?.title}
              </h1>
              <ComingSoon className="mt-[19em] flex bg-coming1">
                {useProjects[0]?.status}
              </ComingSoon>
            </article>
          )}

          <div className="mb-[2em] mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {useProjects?.slice(1)?.map((project:any, index:number) => (
              <div 
                key={project._id}
                className="rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage: `url(${project.documentUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
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
        </section>
      </div>
    </main>
  );
};

export default ProjectContent;