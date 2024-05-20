import subicon from "../../../public/images/png/subicon.png";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";

export const LoginButton = ({ onClick }) => {
  return (
    <button
      className="top-[26px] h-[50px] w-[150px] gap-[16px] rounded-md bg-primary p-[8px] text-center font-sans text-[20px] font-medium leading-6 text-text1 sm:hidden lg:block"
      onClick={onClick}
    >
      Login
    </button>
  );
};
export const GetStarted = () => {
  return (
    <button className="h-[45px] w-[140px] rounded-md bg-text2 p-[8px] text-center  font-sans text-[20px] font-medium leading-6 text-text3 outline-none focus:outline-none">
      Get Started
    </button>
  );
};

export const Join = () => {
  return (
    <button className="h-[45px] w-[140px] gap-[16px] rounded-md bg-text2 p-[8px] text-center font-sans text-[20px] font-medium leading-6 text-text3 outline-none focus:outline-none">
      Join
    </button>
  );
};

export const Subscribe = () => {
  return (
    <button className="bg-#FFFFFF flex h-[45px] w-[178px] cursor-default justify-center rounded-md p-2 font-sans font-medium text-text2 shadow-xl outline-none focus:outline-none">
      <img src={subicon} className="mr-2 h-[25px] " alt="" />
      50+ Subscribes
    </button>
  );
};

export const ComingSoonA = () => {
  return (
    <button className="font-base rounded-xl bg-coming1 px-[15px] py-[6px] font-sans font-semibold">
      Coming Soon
    </button>
  );
};

export const ComingSoonB = () => {
  return (
    <button className="font-base cursor-not-allowed rounded-xl bg-coming2 px-[15px] py-[6px] font-sans font-semibold">
      Coming Soon
    </button>
  );
};

export const EnterButton = ({ type, text, loading, disabled, className }) => {
  return (
    <div className="relative mb-[1em]">
      <button
        type={type || "submit"}
        className={`relative w-full rounded-full bg-text2 p-[15px] font-medium text-text5 ${className} ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={loading || disabled}
        style={{ opacity: loading ? 0.5 : 1 }}
        title={disabled ? "Fill in all input fields" : ""}
      >
        <span className={loading ? "invisible" : ""}>{text}</span>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <ReactLoading color="white" width={25} height={25} type="spin" />
          </div>
        )}
      </button>
    </div>
  );
};

export const Send = ({ text, className }) => {
  return (
    <button
      className={`h-[45px] w-[140px] rounded-md bg-text2 p-[8px] text-center  font-sans text-[20px] font-medium leading-6 text-text3 outline-none focus:outline-none ${className}`}
    >
      {text}
    </button>
  );
};

EnterButton.propTypes = {
  type: PropTypes.oneOf(["submit", "button"]),
  text: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};

export const Pin = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`w-55px lg:mt-[2em]text-text5 rounded-full bg-text2 px-14 py-3 font-sans font-semibold text-text5 ${className}`}
    >
      {text}
    </button>
  );
};

EnterButton.propTypes = {
  type: PropTypes.oneOf(["submit", "button"]),
  loading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};
LoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
Pin.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Send.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};
