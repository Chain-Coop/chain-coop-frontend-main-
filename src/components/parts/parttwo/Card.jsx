import member from "../../../Assets/jpg/membership/customer.jpg";
import investor from "../../../Assets/jpg/membership/investor.jpg";
import employee from "../../../Assets/jpg/membership/employee.jpg";
import dot from "../../../Assets/svg/membership/radio-button.svg";

const Card = () => {
  return (
    <main className="mx-auto font-sans sm:px-[1.5em] lg:mt-[3em] lg:w-[86%]">
      <section className="mt-8 flex flex-col justify-between lg:flex-row lg:space-x-8">
        <div className="flex-1 sm:mt-[1em] lg:mt-[0px]">
          <div className="relative">
            <img src={member} alt="card1" className="w-full" />
            <div className="mt-[1.5em] flex flex-col">
              <h1 className="text-xl font-semibold text-howtext">
                Customer Membership Card
              </h1>
              <div className="mt-2">
                <ul className="space-y-3 text-text1">
                  <li className="flex items-center gap-1">
                    <img src={dot} alt="" />
                    <span>Vote & get involved in the Coop Network</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <img src={dot} alt="" />
                    <span>Invest in the Coop Network business</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 sm:mt-[1em] lg:mt-[0px]">
          <div className="relative">
            <img src={investor} alt="card1" className="w-full" />
            <div className="mt-[1.5em] flex flex-col">
              <h1 className="text-start text-xl font-semibold text-howtext">
                Investor Membership Card
              </h1>
              <div className="mt-2">
                <h2 className="font-bold lg:text-center">{`Member's Contribution: N100k`}</h2>
                <ul className="space-y-3 text-text1">
                  <li className="flex items-center gap-1">
                    <img src={dot} alt="" />
                    <span>Vote & get involved in the Coop Network</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <img src={dot} alt="" />
                    <span>Invest in the Coop Network business</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <img src={dot} alt="" />
                    <span>Early access to first investment rounds</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <img src={dot} alt="" />
                    <span>Discounted The Coop Network products & services</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 sm:mt-[1em] lg:mt-[0px]">
          <div className="relative">
            <img src={employee} alt="card1" className="w-full" />
            <div className="mt-[1.5em] flex flex-col">
              <h1 className="text-start text-xl font-semibold text-howtext">
                Investors Membership Card
              </h1>
              <div className="mt-2">
                <h2 className="font-bold lg:text-center">{`Member's Contribution: N100k`}</h2>
                <ul className="space-y-3 text-text1">
                  <li className="flex items-center gap-1">
                    <img src={dot} alt="" />
                    <span>Vote & get involved in the Coop Network</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <img src={dot} alt="" />
                    <span>Invest in the Coop Network business</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <img src={dot} alt="" />
                    <span>Early access to first investment rounds</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <img src={dot} alt="" />
                    <span>Discounted The Coop Network products & services</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Card;
