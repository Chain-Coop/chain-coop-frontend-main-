import { Primary } from "./Button";

const FooterBox = () => {
  return (
    <div className="relative z-[10px] mx-auto flex items-center justify-center rounded-2xl bg-fbg font-sans sm:mb-[-70px] sm:mt-[2em] sm:h-[150px] lg:mb-[-100px] lg:h-[200px] lg:w-[90%]">
      <div>
        <h1 className="mb-4 text-center text-lg font-normal leading-10 lg:text-3xl">
          Stay Updated with Our Latest Developments
        </h1>
        <div className="flex flex-col items-center justify-center gap-[9px] sm:flex-row sm:gap-2 lg:mx-auto lg:w-full">
          <input
            type="text"
            className="mb-2 h-12 rounded-md border border-gray-300 p-4  focus:border-primary focus:outline-none sm:mb-0 sm:w-auto lg:flex-1"
            placeholder="enter your e-mail"
          />
          <Primary className="rounded-md bg-text2 px-4 py-2 text-text5 lg:px-7 lg:py-2">
            Join Now
          </Primary>
        </div>
      </div>
    </div>
  );
};

export default FooterBox;
