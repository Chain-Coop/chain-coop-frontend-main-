import { ComingSoonA, ComingSoonB } from "../../../common/Button";
import person1 from "../../../../../public/images/png/personlaptop.png";
import person2 from "../../../../../public/images/png/ladylaptop.png";
import person3 from "../../../../../public/images/png/ladylaptop3.png";

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
          <article
            className="mt-[2em] h-[550px] items-center rounded-xl bg-no-repeat p-[2em]"
            style={{
              backgroundImage: `url(${person1})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <h1 className="p-3em font-sans text-3xl font-medium uppercase text-text3">
              automated ai <br /> learning Platform
            </h1>
            <div className="mt-[19em] flex">
              <ComingSoonA text="" />
            </div>
          </article>
          <div className="mb-[2em] mt-4 flex flex-col lg:flex-row lg:space-x-4">
            <article
              className="lg:w-[calc(50% - 2rem)] rounded-lg bg-cover bg-center"
              style={{ backgroundImage: `url(${person2})` }}
            >
              <div className="p-6">
                <h1 className="text-lg font-medium uppercase text-text3">
                  automated ai <br /> learning Platform
                </h1>
                <div className="mt-4">
                  <ComingSoonB text="" />
                </div>
              </div>
            </article>
            <article
              className="lg:w-[calc(50% - 2rem)] mt-4 rounded-xl bg-cover bg-center lg:mt-0"
              style={{ backgroundImage: `url(${person3})` }}
            >
              <div className="p-6">
                <h1 className="text-lg font-medium uppercase text-text3">
                  automated ai <br /> learning Platform
                </h1>
                <div className="mt-4">
                  <ComingSoonB text="" />
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
