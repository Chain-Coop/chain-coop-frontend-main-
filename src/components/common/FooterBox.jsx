import { Join } from "./Button";

const FooterBox = () => {
  return (
    <div className="relative z-[10px] mx-auto flex lg:w-[90%] items-center justify-center rounded-2xl bg-fbg font-sans sm:mb-[-70px] sm:mt-[2em] sm:h-[150px] lg:mb-[-100px] lg:h-[200px]">
      <div className="max-w-2lg">
        <h1 className="mb-4 whitespace-nowrap font-medium sm:text-base lg:text-3xl">
          Stay Updated with Our Latest Developments
        </h1>
        <div className="flex flex-col items-center justify-center sm:flex-row">
          <input
            type="text"
            className="mb-2 mr-0 h-12 rounded-md border border-gray-300 px-2 py-2 focus:border-primary focus:outline-none sm:mb-0 sm:mr-2 sm:w-40 lg:mr-2 lg:w-full"
            placeholder="enter your e-mail"
          />
          <Join text="Join now" className="text-lg" />
        </div>
      </div>
    </div>
  );
};

export default FooterBox;
