import PropTypes from "prop-types";

export const DashboardHeader = ({ children, className }) => {
  return (
    <header
      className={`${className} flex h-[2.5em] w-full bg-text2 font-sans text-xl font-semibold text-text5`}
    >
      {children}
    </header>
  );
};

DashboardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
