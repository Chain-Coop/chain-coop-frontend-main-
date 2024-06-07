import { DashboardHeader } from "../../common/DashboardHeader";

const SubmitProposal = () => {
  return (
    <main className="mb-[2em] font-sans">
      <div className="mt-8">
        <header>
          <DashboardHeader text="Submit a Proposal" />
        </header>
        <form className="mx-auto mt-8 font-sans sm:px-[1.5em] lg:w-[31em] lg:px-0">
          <div className="mb-4">
            <h2 className="text-lg font-bold">Submit a Proposal</h2>
          </div>
          <div>
            <label htmlFor="text" className="font-semibold">
              Proposal Title
            </label>
            <div>
              <input
                type="text"
                placeholder="proposal title text here"
                className="mt-[1em] h-12 w-full rounded-lg border-fade pl-4 shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-fade"
              />
            </div>
          </div>
          <div className="relative mt-[2em]">
            <label htmlFor="description" className="font-sans font-semibold">
              Description
            </label>
            <div className="relative mt-[1em]">
              <textarea
                id="description"
                name="description"
                className="mt-[0.5em] h-[15em] w-full rounded-lg border border-gray-300 p-[0.5em] font-sans shadow-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-fade"
                placeholder="enter description here"
              ></textarea>
            </div>
          </div>
          <div className="mt-[2em]">
            <label htmlFor="attachment" className="font-semibold">
              Attachment
            </label>
            <div>
              <input
                type="text"
                id="attachment"
                placeholder="upload a file"
                className="mt-[1em] h-12 w-full rounded-lg border-2 border-dashed border-text2 pl-4 font-semibold placeholder-text2 shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-fade"
              />
              {/* <FaFileUpload /> */}
            </div>
          </div>
          <section className="mt-[2em]">
            <button className="rounded-full bg-text2 px-[2.5em] py-[5px] font-sans text-text3">
              Submit
            </button>
          </section>
        </form>
      </div>
    </main>
  );
};
export default SubmitProposal;
