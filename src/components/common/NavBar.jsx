import { HiOutlineBars3 } from "react-icons/hi2";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../public/images/svg/home/chain-logo.svg";
import PropTypes from "prop-types";
import { Modal, ModalBody } from "reactstrap";
import { LoginButton } from "./Button";
import { AiOutlineClose } from "react-icons/ai";

const navLinksData = [
  { to: "/", text: "Why Chain Coop" },
  { to: "/our-story", text: "Our Story" },
  { to: "/membership", text: "Membership" },
  { to: "/contact", text: "Contact" },
];

const NavBar = () => {
  const [modal, setModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggle = () => {
    setModal(!modal);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className="left-0 relative top-0 flex  h-[75px] w-full items-center border-b border-text5 bg-white font-sans">
      <div className="mx-auto flex w-[92%] items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Chain Co-op Logo" />
        </Link>
        <div className="flex items-center">
          <div className="mr-8 hidden flex-grow justify-center space-x-12 lg:flex">
            {navLinksData.map((link, index) => (
              <NavLink
                key={index}
                isActive={location.pathname === link.to}
                to={link.to}
              >
                {link.text}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="flex flex-grow justify-end lg:hidden">
          <HiOutlineBars3
            className="cursor-pointer"
            size={30}
            onClick={toggleModal}
          />
        </div>
        <Modal
          className="block h-screen w-screen lg:hidden"
          isOpen={modal}
          toggle={toggleModal}
          fullscreen
        >
          <ModalBody className="flex h-screen w-screen flex-col items-center justify-center bg-white p-7 text-center">
            <div className="absolute right-8 top-12">
              <AiOutlineClose
                onClick={toggle}
                className="text-text cursor-pointer"
                size={40}
              />
            </div>
            {navLinksData.map((item, index) => (
              <Link
                key={index}
                className="mb-4 cursor-pointer font-sans text-xl font-bold text-text4"
                to={item.to}
                onClick={toggleModal}
              >
                {item.text}
              </Link>
            ))}
            <div className="block font-bold lg:hidden">
              <LoginButton className="bg-primary" onClick={handleLoginClick}>
                Login
              </LoginButton>
            </div>
          </ModalBody>
        </Modal>
        <div className="hidden lg:block">
          <LoginButton className="bg-primary" onClick={handleLoginClick}>
            Login
          </LoginButton>
        </div>
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  position: PropTypes.string,
};
const NavLink = ({ to, children, isActive }) => {
  return (
    <Link
      to={to}
      className={`mr-8 cursor-pointer font-sans lg:ml-8 lg:mr-0 ${isActive ? "font-semibold text-text2" : ""}`}
    >
      {children}
    </Link>
  );
};

export default NavBar;

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired,
};
