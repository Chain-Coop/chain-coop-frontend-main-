import PropTypes from "prop-types";

export const DashboardHeader = ({ text }) => {
  return (
    <header className="w-full h-[2.5em] flex justify-center items-center font-sans text-xl bg-text2 text-text5 font-semibold">
      {text}
    </header>
  );
};

DashboardHeader.propTypes = {
  text: PropTypes.string.isRequired,
};
