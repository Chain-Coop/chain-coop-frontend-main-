import React, { useState } from "react";
import { Link } from "react-router-dom";
import { company, Contacts, Explore } from "../../data/Data";
import X from "../../Assets/png/home/twitterx.png";
// import instagram from "../../Assets/png/home/instagram.png";
// import facebook from "../../Assets/png/home/facebook.png";
import linkedin from "../../Assets/png/home/linkedin.png";
// import { Primary } from "./Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../shared/redux/store";
import { toast } from "react-toastify";
import { JoinNewsLetter } from "../../shared/redux/slices/landing.slices";
import ReactLoading from "react-loading";

const Footer = () => {
  const [email, setEmail] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const joinNews = (e: any) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    let body = {
      email: email,
    };

    dispatch(JoinNewsLetter(body))
      .unwrap()
      .then((response: any) => {
        setLoading(false);
        if (response?.status === 201) {
          toast.success(response?.data?.msg);
          setEmail("");
        }
      })
      .catch((error: any) => {
        setLoading(false);
        const errorMessage = error;
        toast.error(errorMessage);
      });
  };

  return (
    <footer className="w-full overflow-hidden">
      <div className="relative z-10 mx-auto mb-[-50px] flex   w-full items-center justify-center rounded-2xl bg-[#CCA3BC] p-4   font-sans sm:mb-[-60px] sm:mt-[2em] sm:py-6 lg:mb-[-115px] lg:w-[90%] lg:p-8">
        <div className="w-full px-4 text-center">
          <h1 className="mb-1 text-sm font-semibold lg:text-2xl">
            Stay Ahead with Chain Co-op
          </h1>
          <h1 className="m-auto mb-4 w-full text-sm font-semibold sm:px-4 lg:w-[73%] lg:text-2xl">
            Subscribe to the latest tech in tech-driven cooperative innovations
            and investment opportunities.
          </h1>
          <form
            onSubmit={joinNews}
            className="mx-auto flex w-full flex-col items-center justify-center gap-4 lg:max-w-[60%] lg:flex-row"
          >
            <input
              type="email"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-primary focus:outline-none lg:p-4"
              placeholder="Enter your e-mail"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-text2 px-4 py-2 text-center text-lg text-text5 lg:w-[30%] lg:text-xl"
            >
              {loading ? (
                <ReactLoading
                  color="#FFFFFF"
                  width={25}
                  height={25}
                  type="spin"
                />
              ) : (
                "Join Now"
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="w-full bg-text2 font-sans">
        <div className="mx-auto px-6 pt-[120px] lg:w-[90%] lg:pb-[10px] lg:pt-[190px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <section className="w-full space-y-4">
              <h3 className="font-bold text-text3">
                Nigeria's First Blockchain Powered Cooperative
              </h3>
              <p className="font-light text-text3">
                Chain Co-op is a tech-driven worker-owned cooperative that
                guarantees returns through cutting-edge blockchain technology
                and sustainable business investments.
              </p>
              <div>
                <p className="font-medium text-text3">
                  Chain Co-op Statute & Legal Structure
                </p>
                <p className="mt-1 font-medium text-text3">
                  Understand the legal framework and cooperative governance that
                  protect your investment.
                </p>
              </div>
            </section>

            <section className="w-full space-y-4">
              <h3 className="font-bold text-text3">Company</h3>
              <div>
                {company.map((data, index) => (
                  <p className="mb-2 font-light text-text3" key={index}>
                    <Link to={data.to}>{data.text}</Link>
                  </p>
                ))}
              </div>
            </section>

            <section className="w-full space-y-4">
              <h3 className="font-bold text-text3">Explore</h3>
              <div>
                {Explore.map((data, index) => (
                  <p className="mb-2 font-light text-text3" key={index}>
                    <Link to={data.to}>{data.text}</Link>
                  </p>
                ))}
              </div>
            </section>

            <section className="w-full space-y-4">
              <h3 className="font-bold text-text3">Contact</h3>
              <div>
                <p className="font-light text-text3">
                  Let's build a better future together! Ketu, Lagos, or reach
                  out via email or phone. Join Chain Coop today!
                </p>
                <p className="font-light text-text3">
                  info@chaincooperative.com
                </p>
                <p className="font-light text-text3">+234 809 322 7696</p>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-8 flex justify-center px-6">
          <div className="w-full border-b-2 text-text3"></div>
        </div>

        <div className="flex flex-col items-center px-6 py-8 lg:flex-row lg:justify-between lg:px-[5em]">
          <div className="mb-4 lg:mb-0">
            <span className="text-text3">
              @ 2024 Chain Cooperative. All rights reserved
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com/ChainCoop"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2"
            >
              <img width="24" height="24" src={X} alt="twitterx" />
            </a>
            <a
              href="https://www.linkedin.com/company/chain-coop/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2"
            >
              <img width="24" height="24" src={linkedin} alt="linkedin" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
