import React from "react";
import { useEffect } from "react";
import NavBar from "../../../common/NavBar";
import { brandPrimary } from "../../../common/Button";
import hero from "../../../../Assets/png/footer/career/image1.png";

const Career = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar />
      <main className="font-sans">
        <div className="flex h-full flex-wrap justify-between">
          <div className="flex w-full flex-col p-[2em] lg:w-1/2 lg:p-[4em]">
            <div className="m-auto flex flex-col ">
              <div className="lg:space-y-3">
                <h1 className="text-xl font-bold lg:text-4xl">
                  <span className="text-text2">Join Our</span> Worker-Owned
                </h1>
                <h1 className="text-xl font-bold lg:text-4xl">Team</h1>
              </div>
              <div className="mt-[10px] lg:mt-[1.5em]">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Voluptates numquam voluptatum vel sunt dolorem doloremque.
                </p>
              </div>
              <Primary className="mt-[1.5em] w-[50%] rounded-md bg-text2 px-2 py-3 text-text5 lg:w-[25%]">
                Join Us
              </Primary>
              <p className="mt-[1.5em] font-medium text-text2">
                +50 Open positions available for Job Openings
              </p>
            </div>
          </div>
          <div className="hidden w-full justify-end lg:flex lg:w-1/2">
            <img src={hero} alt="hero" className="h-full object-contain" />
          </div>
        </div>
      </main>
    </>
  );
};

export default Career;
