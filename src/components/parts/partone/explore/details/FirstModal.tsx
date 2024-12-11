import React from "react";
import explore1 from "../../../../../Assets/jpg/home/automated-mini.jpg";
import { Primary } from "../../../../common/Button";

const FirstModal = () => {
  return (
    <main className="w-full max-w-[43em] px-2 font-sans sm:px-3 md:px-5">
      <section className="flex flex-col gap-3 py-3 md:py-8">
        <div className="flex flex-col gap-3">
          <header className="flex flex-col gap-2 px-2 text-center sm:px-4">
            <h3 className="text-sm font-semibold leading-tight text-gray-400 sm:text-base md:text-lg">
              OverView
            </h3>
            <h1 className="font-bold leading-tight text-text2 sm:text-lg md:text-2xl lg:text-xl">
              AUTOMATED AI LEARNING PLATFORM
            </h1>
          </header>

          <article className="px-2 sm:px-3">
            <p className="text-xs font-medium text-gray-600 sm:text-sm">
              AI Learning Platform is an innovative platform designed to
              transform education. Teachers can create automated systems
              tailored to their needs, while students enjoy personalized
              learning experiences powered by advance AI.
            </p>
            <p className="mt-2 text-xs font-medium text-gray-600 sm:text-sm">
              This platform adapts to various curriculums and teaching styles,
              providing a customized approach that helps students achieve their
              full potentials.
            </p>
            <p className="mt-2 text-xs font-medium text-gray-600 sm:text-sm">
              With its automated systems, AI Learning Hub enhances efficiency
              for educators, allowing them to focus on impactful teaching.
              Students benefit from a highly personalized learning journey,
              driven by cutting-edge AI to meet their unique educational goals.
            </p>
          </article>

          <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <div className="w-full sm:w-auto">
              <img
                src={explore1}
                alt="automated-ai-learning-platform"
                className="h-[8em] w-full object-cover sm:h-[10em] sm:w-[10em]"
              />
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <p className="text-xs font-medium text-gray-600 sm:text-sm">
                Experience the future of education with AI Learning Hub. Stay
                tuned for its launch and unlock the power of automation,
                personalization and advanced learning.
              </p>
              <Primary className="w-full rounded-lg bg-text2 px-4 py-2 font-semibold text-white transition-transform duration-300 hover:scale-110 sm:w-[11em]">
                Coming soon
              </Primary>
            </div>
          </div>

          <div className="mt-3 flex flex-col justify-between gap-2 sm:flex-row sm:gap-0">
            <h2 className="text-center text-base font-semibold text-red-600 sm:text-left sm:text-lg">
              Annual Percentage Rate: 30%
            </h2>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FirstModal;
