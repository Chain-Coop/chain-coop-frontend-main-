import { ComingSoon } from "../../../common/Button";

const ProjectContent = () => {
  return (
    <main className="font-sans">
      <div className="sm:px-[1em] lg:px-0">
        <section>
          <p className="text-medium font-bold">Project</p>
          <p className="mt-[1em] text-sm">
            You have not created any portfolio yet. Click on any of the cards to
            create your portfolio
          </p>
        </section>

        <section>
          <article className="mt-[2em] items-center rounded-xl bg-explore1 bg-no-repeat p-[2em]">
            <h1 className="p-3em font-sans text-3xl font-medium uppercase text-text3">
              automated ai <br /> learning Platform
            </h1>
            <ComingSoon className="mt-[19em] flex bg-coming1">
              Coming Soon
            </ComingSoon>
          </article>

          <div className="mb-[2em] mt-4 flex flex-col lg:flex-row lg:space-x-4">
            <div className=" rounded-lg bg-explore2 bg-cover bg-center">
              <article className="p-6">
                <h1 className="text-lg font-medium uppercase text-text3">
                  automated ai <br /> learning Platform
                </h1>
                <ComingSoon className="mt-4 bg-coming2">Coming Soon</ComingSoon>
              </article>
            </div>
            <div className=" mt-4 rounded-xl bg-explore3 bg-cover bg-center lg:mt-0">
              <article className="p-6">
                <h1 className="text-lg font-medium uppercase text-text3">
                  automated ai <br /> learning Platform
                </h1>
                <ComingSoon className="mt-4 bg-coming2">Coming Soon</ComingSoon>
              </article>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProjectContent;
