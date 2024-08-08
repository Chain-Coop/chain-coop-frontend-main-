import PropTypes from "prop-types";

<<<<<<< HEAD
export const DashboardHeader = ({ children, className, onClick }) => {
  return (
    <header
      className={`${className} flex h-[2.5em] w-full bg-text2 font-sans text-xl font-semibold text-text5`}
      onClick={onClick}
=======
export const DashboardHeader = ({ children, className }) => {
  return (
    <header
      className={`${className} flex h-[2.5em] w-full bg-text2 font-sans text-xl font-semibold text-text5`}
>>>>>>> 10cf39ba59df1c53433ab269595f99f4750d01bf
    >
      {children}
    </header>
  );
};

DashboardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
<<<<<<< HEAD
  onClick: PropTypes.func,
=======
>>>>>>> 10cf39ba59df1c53433ab269595f99f4750d01bf
};
