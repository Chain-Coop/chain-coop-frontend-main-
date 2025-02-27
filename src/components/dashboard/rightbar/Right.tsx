import React from "react";
import newspaper from "../../../Assets/svg/dashboard/newspaper.svg";
import { useAllProjects } from "../../../shared/Hooks/useUserProfile";
import { useNavigate } from "react-router";
import { Button } from "@material-tailwind/react";

interface Project {
  _id: string;
  title: string;
  status: string;
  documentUrl: string;
  createdAt: string;
}

const Right = () => {
  const { useProjects, loading } = useAllProjects();

  const latestProjects = React.useMemo(() => {
    if (!useProjects) return [];
    return [...useProjects]
      .sort(
        (a: Project, b: Project) =>
          new Date(b?.createdAt)?.getTime() - new Date(a?.createdAt)?.getTime(),
      )
      .slice(0, 2);
  }, [useProjects]);

  const renderProjects = React.useCallback(() => {
    if (!latestProjects?.length) {
      return null;
    }

    return latestProjects?.map((project: Project) => (
      <div key={project._id} className="mt-[1em] h-[200px] w-full px-[1em]">
        <article
          className="h-full rounded-2xl bg-no-repeat p-[1em] transition-transform hover:scale-[1.02]"
          style={{
            backgroundImage: `url(${project.documentUrl})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backgroundBlendMode: "overlay",
          }}
        >
          <h1 className="p-[1em] text-lg font-medium uppercase text-text3">
            {project?.title}
          </h1>
          <Button className="font-base mt-[1.5em] flex cursor-not-allowed justify-center rounded-xl bg-coming2  px-[15px] py-[6px] font-sans font-semibold normal-case">
            {project?.status}
          </Button>
        </article>
      </div>
    ));
  }, [loading, latestProjects]);

  return (
    <aside className="flex min-h-screen w-[30em] flex-col border-l border-bl bg-inherit px-[3em] py-[3em] font-sans text-memt1">
      <section className="h-full">
        <article className="rounded-xl bg-Dh p-[1em] shadow-md">
          <header className="text-xl font-semibold">
            <h2>Stay Updated with our</h2>
            <h2>Latest Developments</h2>
          </header>
          <div className="flex justify-between text-sm">
            <p>
              Experience the Power of Coop Wallet, Powered by Chain Coop
              Network, a Business-Oriented Community Designed as a Cooperative
              for Open and Digital Membership
            </p>
            <img src={newspaper} alt="newpaper-icon" />
          </div>
        </article>

        <hr className="mt-[1.5em] h-1" />

        <section className="mt-[2em] flex flex-col text-text4">
          <header>
            <h2 className="text-xl font-bold">Ongoing Project of Chain Coop</h2>
          </header>
          {renderProjects()}
        </section>
      </section>
    </aside>
  );
};

export default React.memo(Right);
