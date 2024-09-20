import React from "react";
import { useEffect } from "react";
import NavBar from "../../../common/NavBar";
import Footer from "../../../common/Footer";
import background from "../../../../Assets/png/footer/team/png/background.png";
import background2 from "../../../../Assets/png/footer/team/png/background.png";
import image1 from "../../../../Assets/png/footer/team/png/image1.png";
import image2 from "../../../../Assets/png/footer/team/png/image2.png";
import tweeter from "../../../../Assets/svg/footer/team/tweeter.svg";
import linkdln from "../../../../Assets/svg/footer/team/linkedln.svg";
import medium from "../../../../Assets/svg/footer/team/medium.svg";

const teamMembers = [
  {
    name: "JANE DOE",
    role: "LEAD DESIGNER",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo earum totam quaerat pariatur! Ipsa, laborum.",
    image: image1,
    socials: [
      { src: tweeter, alt: "tweeter" },
      { src: linkdln, alt: "linkedln" },
      { src: medium, alt: "medium" },
    ],
  },
  {
    name: "JOHN DOE",
    role: "LEAD DESIGNER",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo earum totam quaerat pariatur! Ipsa, laborum.",
    image: image2,
    socials: [
      { src: tweeter, alt: "tweeter" },
      { src: linkdln, alt: "linkedln" },
      { src: medium, alt: "medium" },
    ],
  },
];

const Team = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar />
      <div className="font-sans">
        <div className="flex items-center justify-center">
          <img
            src={background}
            className="relative z-[10px] mb-[-300px] w-full  object-cover"
            alt="back-ground image"
          />
        </div>
        <div className="absolute inset-0 mx-auto w-[86%]">
          <div className="mx-auto text-center sm:mt-[2em] lg:mt-[9em] lg:w-[70%]">
            <h1 className="font-semibold sm:text-[2em] lg:text-[2.5em]">
              Our Team
            </h1>
            <p className="text-sm">
              Meet our Chain Coop, our business-oriented community designed into
              a cooperative with open membership, through Chain Wallet Simple,
              Safe and transparent way
            </p>
          </div>
          <div className="mt-[7em] flex justify-center gap-[5em]">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <img src={member.image} alt={`${member.name} image`} />
                <div className="mt-[2.5em] flex w-[50%] flex-col items-center gap-[2em] text-center">
                  <header>
                    <h1 className="text-2xl font-bold text-text1">
                      {member.name}
                    </h1>
                  </header>
                  <article>
                    <p className="text-2xl font-semibold text-text2">
                      {member.role}
                    </p>
                  </article>
                  <article>
                    <p className="text-center">{member.description}</p>
                  </article>
                  <article>
                    <div className="flex justify-between gap-[3em]">
                      {member.socials.map((social, i) => (
                        <img key={i} src={social.src} alt={social.alt} />
                      ))}
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img
            src={background2}
            className="w-full object-cover"
            alt="back-ground image"
          />
          <div className="absolute inset-0 flex ">
            <div className="mt-[2em] flex justify-center gap-[5em]">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img src={member.image} alt={`${member.name} image`} />
                  <div className="mt-[2.5em] flex w-[50%] flex-col items-center gap-[2em] text-center">
                    <header>
                      <h1 className="text-2xl font-bold text-text1">
                        {member.name}
                      </h1>
                    </header>
                    <article>
                      <p className="text-2xl font-semibold text-text2">
                        {member.role}
                      </p>
                    </article>
                    <article>
                      <p className="text-center">{member.description}</p>
                    </article>
                    <article>
                      <div className="flex justify-between gap-[3em]">
                        {member.socials.map((social, i) => (
                          <img key={i} src={social.src} alt={social.alt} />
                        ))}
                      </div>
                    </article>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Team;
