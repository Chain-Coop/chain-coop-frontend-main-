import PropTypes from "prop-types";

const Card = ({ children, className }) => {
  return (
    <div
      className={`p-[2em] px-16 py-14 rounded-lg m-[1em] shadow-md bg-card ${className}`}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Card;
