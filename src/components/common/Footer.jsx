import { Link } from "react-router-dom";
import { company, Contacts, Explore, Legal } from "../../data/Data";
import X from "../../Assets/png/home/twitterx.png";
import instagram from "../../Assets/png/home/instagram.png";
import facebook from "../../Assets/png/home/facebook.png";
import linkedin from "../../Assets/png/home/linkedin.png";

const Footer = () => {
  return (
    <footer className="w-full  bg-text2 pb-[1.5em] font-sans">
      <div className="mx-auto grid grid-cols-1 justify-between gap-2 px-4 sm:grid-cols-2 sm:pt-[100px] lg:flex lg:w-[83%] lg:grid-cols-5 lg:gap-8 lg:pb-[10px] lg:pt-[200px]">
        <section>
          <h3 className="font-bold text-text3">Chain Coop</h3>
          <p className="mb-4 mt-4 font-light text-text3">
            The first cooperative with digital membership <br /> in Nigeria.
            Earn fixed guaranteed returns <br />
            investing in business, all this via blockchain <br /> technology.
          </p>
          <div className="w-[67%]">
            <p className="font-medium text-text3">
              Statue of Chain Cooperative Constitution Act of the Chain
              Cooperative
            </p>
          </div>
        </section>
        
        <section>
          <h3 className="font-bold text-text3">Company</h3>
          <div className="mt-4">
            {company.map((data, index) => (
              <>
                <p className="mb-2 font-light text-text3">
                  <Link to={data.to} key={index}>
                    {data.text}
                  </Link>
                </p>
              </>
            ))}
          </div>
        </section>

        <section>
          <h3 className=" font-bold text-text3">Explore</h3>
          <div className="mt-4">
            {Explore.map((data, index) => (
              <>
                <p className="mb-2 whitespace-nowrap font-light text-text3">
                  <Link to={data.to} key={index}>
                    {data.text}
                  </Link>
                </p>
              </>
            ))}
          </div>
        </section>

        <section>
          <h3 className=" font-bold text-text3">Legal</h3>
          <div className="mt-4 whitespace-nowrap">
            {Legal.map((data, index) => (
              <>
                <p className="mb-2 font-light text-text3">
                  <Link to={data.to} key={index}>
                    {data.text}
                  </Link>
                </p>
              </>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-bold text-text3">Contacts</h3>
          <div className="mt-4 whitespace-nowrap">
            {Contacts.map((data, index) => (
              <>
                <p className="mb-2 font-light text-text3">
                  <Link to={data.to} key={index}>
                    {data.text}
                  </Link>
                </p>
              </>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-[1em] flex justify-center">
        <div className="h-[4em] w-[90%] border-b-2 text-text3"></div>
      </div>
      <section className="mt-[2em] lg:flex lg:justify-between  lg:px-[5em]">
        <div className="sm:mb-[1.5em flex justify-center">
          <span className="text-text3">
            @ 2024 Chain Cooperative. All rights reserved
          </span>
        </div>
        <div className="flex cursor-pointer justify-center text-center sm:mt-[1em] sm:gap-6 lg:mt-[0] lg:justify-between lg:gap-6">
          <a target="_blank" rel="noopener noreferrer">
            <img src={facebook} alt="facebook" />
          </a>
          <a target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="instagram" />
          </a>
          <a
            href="https://twitter.com/ChainCoop"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img width="24" height="24" src={X} alt="twitterx" />
          </a>
          <a
            href="https://www.linkedin.com/company/chain-coop/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin} alt="linkedin" />
          </a>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
