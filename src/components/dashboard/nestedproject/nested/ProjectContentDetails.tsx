import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatBalance } from "../../../../shared/utils/format";
import DOMPurify from "dompurify";
import { IoIosArrowDropleft } from "react-icons/io";

interface ProjectContentDetailsProps {
  project: any;
}

const LoadingIndicator = () => (
  <div className="flex h-40 items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-gray-900"></div>
  </div>
);

const ProjectContentDetails: React.FC<ProjectContentDetailsProps> = ({
  project,
}) => {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  if (!project) {
    return <LoadingIndicator />;
  }

  return (
    <main className="px-3 font-sans">
      <header>
        <h1 className="text-lg font-semibold">{project?.title}</h1>
      </header>
      <div className="mt-[1.3em] flex flex-col gap-[1.4em]">
        <p className="text-sm font-semibold text-gray-400">OverView</p>
        <article>
          <div
            className="prose mb-4"
            dangerouslySetInnerHTML={{
              __html: DOMPurify?.sanitize(project?.description),
            }}
          />
        </article>
        <div>
          <img
            src={project?.documentUrl}
            alt={project.title}
            className="rounded-lg"
          />
        </div>
        {/* <div className="flex flex-col gap-[1em]">
          <p className="font-medium text-howtext">Project Price</p>
          <p className="font-bold">
            This Project is available for {formatBalance(project?.projectPrice)}{" "}
            {}
          </p>
        </div> */}
        <div className="flex items-center justify-between">
          <IoIosArrowDropleft
            size={25}
            onClick={back}
            className="cursor-pointer transition-transform duration-300 hover:scale-110"
          />
          {/* <Link to="/dashboard/wallet/transfer/fund-project">
            <Primary className="mt-8 rounded-md bg-text2 px-5 py-2 font-semibold text-white transition-transform duration-300 hover:scale-110">
              Purchase
            </Primary>
          </Link> */}
        </div>
      </div>
    </main>
  );
};

export default ProjectContentDetails;
