import PropTypes from "prop-types";
import ReactLoading from "react-loading";

export const LoginButton = ({ onClick, children, className }) => {
  return (
    <button
      className={`${className} top-[26px] h-[50px] w-[150px] gap-[16px] rounded-md  p-[8px] text-center font-sans text-[20px] leading-6 text-text1  lg:block`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const Primary = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`text-center font-sans text-[20px] font-medium leading-6 outline-none focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
};

export const ComingSoon = ({ children, className }) => {
  return (
    <button
      className={`font-base cursor-not-allowed rounded-xl  px-[15px] py-[6px] font-sans font-semibold ${className}`}
    >
      {children}
    </button>
  );
};

export const Blog = ({ children, className }) => {
  return (
    <button className={`font-base cursor-not-allowed ${className}`}>
      {children}
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

LoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

Primary.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

ComingSoon.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

EnterButton.propTypes = {
  type: PropTypes.oneOf(["submit", "button"]),
  loading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Blog.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
