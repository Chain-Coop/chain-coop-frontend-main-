import React from "react";
import { meetImage } from "../../../data/Data";

const Meet = () => {
  return (
    <main className="mx-auto grid items-center justify-center font-sans sm:-mt-[1em] sm:px-[1em] lg:mt-[7em] lg:w-[90%] lg:px-[0]">
      <div>
        <header className="text-center text-text4">
          <h1 className="mb-2 gap-1 font-bold sm:text-2xl lg:text-3xl">
            Meet Your
            <span className="ml-1 font-sans text-text2  sm:text-2xl lg:text-3xl">
              Co-op Community
            </span>
          </h1>
        </header>
        <div className="mt-[2em] grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-3">
          {meetImage.map((item, index) => (
            <img
              key={index}
              src={item.src}
              alt={`Person ${index + 1}`}
              className="rounded-md"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Meet;
