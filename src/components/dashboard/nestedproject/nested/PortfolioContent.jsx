import { ComingSoon } from "../../../common/Button";

const PortfolioContent = () => {
  return (
    <main className="font-sans">
      <div className="sm:px-[1.5em] lg:px-0 ">
        <div>
          <p className="text-medium font-bold">Your Portfolio</p>
          <p className="mt-[1em] text-sm">
            You have not created any portfolio yet. Click on any of the cards to
            create your portfolio
          </p>
        </div>
        <div className="mt-[1.5em] justify-between sm:flex-col lg:flex lg:flex-row">
          <article>
            <div className="rounded-lg bg-rec1  p-[1.5em] text-center shadow-md sm:w-full lg:w-[14em] ">
              <p className="text-xl font-medium text-fade">Net Worth Asset</p>
              <h2 className="text-2xl font-bold text-text4 ">N500,000.000</h2>
            </div>
          </article>
          <article className="sm:mt-[1.5em] sm:text-center lg:mt-0">
            <div className="rounded-lg bg-rec1  p-[1.5em] shadow-md sm:w-full lg:w-[14em]">
              <p className="text-xl font-medium text-fade">Asset type</p>
              <h2 className="text-2xl font-bold text-text4 ">1</h2>
            </div>
          </article>
        </div>
        <article className="mb-[2em] mt-[4em] sm:w-full lg:w-[300px]">
          <div className="rounded-xl bg-explore2 bg-cover bg-center bg-no-repeat p-[1em]">
            <h1 className="p-[1em] font-sans text-lg font-medium uppercase text-text3">
              automated ai <br /> learning Platform
            </h1>
            <ComingSoon className="mt-[7em] bg-coming2">Coming Soon</ComingSoon>
          </div>
        </article>
      </div>
    </main>
  );
};

export default PortfolioContent;
