import React from "react";
import { Link } from "react-router-dom";
import { company, Contacts, Explore, Legal } from "../../data/Data";
import X from "../../Assets/png/home/twitterx.png";
import instagram from "../../Assets/png/home/instagram.png";
import facebook from "../../Assets/png/home/facebook.png";
import linkedin from "../../Assets/png/home/linkedin.png";
import { Primary } from "./Button";

const Footer = () => {
  return (
    <footer>
    <div className="relative z-[10px] mx-auto flex items-center w-full justify-center rounded-2xl bg-fbg font-sans sm:mb-[-70px] sm:mt-[2em] sm:h-[150px] lg:mb-[-100px] lg:h-[200px] lg:w-[90%]">
      <div>
        <h1 className="text-l mb-4 w-full text-center font-normal lg:text-3xl">
          Stay Updated with Our Latest Developments
        </h1>
        <div className="flex flex-col items-center justify-center gap-[9px] sm:flex-row sm:gap-2 lg:mx-auto lg:w-full">
          <input
            type="text"
            className="mb-2 h-12 rounded-md border border-gray-300 p-3  focus:border-primary focus:outline-none sm:mb-0 sm:w-[16em] lg:flex-1"
            placeholder="enter your e-mail"
          />
          <Primary className="rounded-md bg-text2 px-4 py-2 text-sm text-text5 lg:px-7 lg:py-2 lg:text-xl">
            Join Now
          </Primary>
        </div>
      </div>
    </div>
    <div className="w-full bg-text2  font-sans">
      <div className="mx-auto grid grid-cols-1 justify-between gap-y-6 px-3 sm:grid-cols-2 sm:gap-4 sm:pt-[100px] lg:flex lg:w-[83%] lg:grid-cols-5 lg:gap-8 lg:pb-[10px] lg:pt-[190px]">
        <section className="mb-4">
          <h3 className="font-bold text-text3">Chain Coop</h3>
          <p className="mb-4 mt-4 font-light text-text3">
            The first cooperative with digital membership <br /> in Nigeria.
            Earn fixed guaranteed returns <br />
            investing in business, all this via blockchain <br /> technology.
          </p>
          <div className="lg:w-[67%] w-full">
            <p className="font-medium text-text3">
              Statue of Chain Cooperative Constitution Act of the Chain
              Cooperative
            </p>
          </div>
        </section>

        <section className="mb-4">
          <h3 className="font-bold text-text3">Company</h3>
          <div className="mt-4">
            {company.map((data: any, index: number) => (
              <p className="mb-2 font-light text-text3" key={index}>
                <Link to={data.to}>{data.text}</Link>
              </p>
            ))}
          </div>
        </section>

        <section className="mb-4">
          <h3 className="font-bold text-text3">Explore</h3>
          <div className="mt-4">
            {Explore.map((data: any, index: number) => (
              <p className="mb-2 whitespace-nowrap font-light text-text3" key={index}>
                <Link to={data.to}>{data.text}</Link>
              </p>
            ))}
          </div>
        </section>

        <section className="mb-4">
          <h3 className="font-bold text-text3">Legal</h3>
          <div className="mt-4 whitespace-nowrap">
            {Legal.map((data: any, index: number) => (
              <p className="mb-2 font-light text-text3" key={index}>
                <Link to={data.to}>{data.text}</Link>
              </p>
            ))}
          </div>
        </section>

        <section className="mb-4">
          <h3 className="font-bold text-text3">Contacts</h3>
          <div className="mt-4 whitespace-nowrap">
            {Contacts.map((data: any, index: number) => (
              <p className="mb-2 font-light text-text3" key={index}>
                <Link to={data.to}>{data.text}</Link>
              </p>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-[1em] flex justify-center">
        <div className="h-[4em] w-[90%] border-b-2 text-text3"></div>
      </div>
      <section className="mt-[2em] lg:flex lg:justify-between lg:px-[5em]">
        <div className="sm:mb-[1.5em] flex justify-center">
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
    </div>
    </footer>
  );
};

export default Footer;
