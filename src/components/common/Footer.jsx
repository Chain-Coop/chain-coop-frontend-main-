import X from "../../../public/images/png/home/twitterx.png";
import instagram from "../../../public/images/png/home/instagram.png";
import facebook from "../../../public/images/png/home/facebook.png";
import linkedin from "../../../public/images/png/home/linkedin.png";

const Footer = () => {
  return (
    <footer className="w-full bg-text2 pb-[1.5em] font-sans">
      <div className="mx-auto grid w-[86%] grid-cols-1 justify-between gap-2 sm:grid-cols-2 sm:pt-[100px] lg:flex lg:grid-cols-5 lg:gap-8 lg:pb-[10px] lg:pt-[200px]">
        <div className="box1">
          <h3 className=" font-bold text-text3">Chain Coop</h3>
          <p className="mb-4 mt-4  font-light text-text3">
            The first cooperative with digital membership <br /> in Nigeria.
            Earn fixed guaranteed returns <br />
            investing in business, all this via blockchain <br /> technology.
          </p>
          <div className="mt-4">
            <p className="mb-2  font-medium text-text3">
              Statue of Chain Cooperative
            </p>
            <p className="mb-2  font-medium text-text3">
              Constitution Act of the Chain Cooperative
            </p>
          </div>
        </div>
        <div className="box2">
          <h3 className=" font-bold text-text3">Company</h3>
          <div className="mt-4">
            <p className="mb-2 font-light text-text3">About Us</p>
            <p className="mb-2 font-light text-text3">Team</p>
            <p className="mb-2 font-light text-text3">Support</p>
          </div>
        </div>
        <div className="box3">
          <h3 className=" font-bold text-text3">Explore</h3>
          <div className="mt-4">
            <p className="mb-2 font-light text-text3">Why Chain Coop</p>
            <p className="mb-2 font-light text-text3">Membership Cards</p>
            <p className="mb-2 font-light text-text3">Projects</p>
            <p className="mb-2 font-light text-text3">Blog</p>
          </div>
        </div>
        <div className="box4">
          <h3 className=" font-bold text-text3">Legal</h3>
          <div className="mt-4">
            <p className="mb-2 font-light text-text3">Privacy Policy</p>
            <p className="mb-2 font-light text-text3">Terms & Conditions</p>
            <p className="mb-2 font-light text-text3">Disclaimer</p>
          </div>
        </div>
        <div className="box5">
          <h3 className="  font-bold text-text3">Contacts</h3>
          <div className="mt-4">
            <p className="mb-2 font-light text-text3">Privacy Policy</p>
            <p className="mb-2 font-light text-text3">
              Ikosi Ketu, Lagos, Nigeria
            </p>
            <p className="mb-2 font-light text-text3">
              info@chainerative.com.ng
            </p>
            <p className="mb-2 font-light text-text3">+234 809 322 7696</p>
          </div>
        </div>
      </div>

      <div className="mt-[1em] flex justify-center">
        <div className="h-[4em] w-[90%] border-b-2 text-text3"></div>
      </div>
      <div className="mt-[2em] lg:flex lg:justify-between  lg:px-[5em]">
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
      </div>
    </footer>
  );
};

export default Footer;
