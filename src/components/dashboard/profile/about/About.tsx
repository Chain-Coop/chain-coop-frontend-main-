import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const About = () => {
  const sections = [
    { title: "Terms & Condition" },
    { title: "Privacy Policy" },
    { title: "FAQs" },
    { title: "Contact Us", link: "/dashboard/contact_us" },
    { title: "Visit Our Blog" },
    { title: "Join Our Community" },
  ];

  return (
    <main className="mt-4 ">
      <header>
        <h2 className="font-semibold text-howtext">About Chain Coop</h2>
      </header>
      <section className="mt-[1.2em]">
        {sections.map((section, index) => (
          <div key={index} className="mb-2 flex flex-col">
            <hr className="h-[1px] rounded-full bg-gray-200" />
            <div className="flex items-center justify-between py-1">
              {section.link ? (
                <Link
                  to={section.link}
                  className="flex w-full items-center justify-between"
                >
                  <span className="font-semibold">{section.title}</span>
                  <IoIosArrowForward size={15} className="text-text2" />
                </Link>
              ) : (
                <div className="flex w-full items-center justify-between">
                  <span className="font-semibold">{section.title}</span>
                  <IoIosArrowForward size={15} className="text-text2" />
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default About;
