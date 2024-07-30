import { ComingSoon } from "../../../common/Button";

const ProjectContent = () => {
  return (
    <main className="font-sans">
      <div className="sm:px-[1em] lg:px-0">
        <header>
          <p className="text-medium font-bold">Project</p>
          <p className="mt-[1em] text-sm">
            You have not created any portfolio yet. Click on any of the cards to
            create your portfolio
          </p>
        </header>

        <section>
          <article className="bg-explore1 mt-[2em] items-center rounded-xl bg-no-repeat p-[2em]">
            <h1 className="p-3em font-sans text-3xl font-medium uppercase text-text3">
              automated ai <br /> learning Platform
            </h1>
            <div className="mt-[19em] flex">
              <ComingSoon className="bg-coming1">Coming Soon</ComingSoon>
            </div>
          </article>

          <div className="mb-[2em] mt-4 flex flex-col lg:flex-row lg:space-x-4">
            <article className=" bg-explore2 rounded-lg bg-cover bg-center">
              <div className="p-6">
                <h1 className="text-lg font-medium uppercase text-text3">
                  automated ai <br /> learning Platform
                </h1>
                <div className="mt-4">
                  <ComingSoon className="bg-coming2">Coming Soon</ComingSoon>
                </div>
              </div>
            </article>
            <article className=" bg-explore3 mt-4 rounded-xl bg-cover bg-center lg:mt-0">
              <div className="p-6">
                <h1 className="text-lg font-medium uppercase text-text3">
                  automated ai <br /> learning Platform
                </h1>
                <div className="mt-4">
                  <ComingSoon className="bg-coming2">Coming Soon</ComingSoon>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProjectContent;
