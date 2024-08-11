import PropTypes from "prop-types";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";

const ToggleButton = ({ isVisible, onToggle }: any) => {
  const toggleVisibility = (e: any) => {
    e.preventDefault();
    const newVisibility = !isVisible;
    onToggle(newVisibility);
  };

  return (
    <button type="button" className="bg-inherit" onClick={toggleVisibility}>
      {isVisible ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
    </button>
  );
};

ToggleButton.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ToggleButton;
