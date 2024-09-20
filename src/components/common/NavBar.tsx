import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navBarLinks } from "../../data/Data";
import { LoginButton } from "./Button";
import { Modal, ModalBody } from "reactstrap";
import logo from "../../Assets/svg/home/chain-logo.svg";
import { HiOutlineBars3 } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";

const NavBar = () => {
  const [modal, setModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className="relative left-0 top-0 flex h-[75px] w-full items-center border-b border-text5 bg-white font-sans">
      <div className="mx-auto flex w-[92%] items-center justify-between">
        <Link to="/why-chain-coop">
          <img src={logo} className="w-[9em]" alt="Chain Co-op Logo" />
        </Link>
        <div className="flex items-center">
          <div className="mr-8 hidden  flex-grow justify-center space-x-12 lg:flex">
            {navBarLinks.map((link, index) => (
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
          className="block lg:hidden"
          isOpen={modal}
          toggle={toggleModal}
          fullscreen
        >
          <ModalBody className="flex h-screen w-screen flex-col items-center justify-center bg-white p-7 text-center">
            <div className="absolute right-8 top-12">
              <AiOutlineClose
                onClick={toggleModal}
                className="text-text cursor-pointer"
                size={40}
              />
            </div>
            {navBarLinks.map((item, index) => (
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

const NavLink = ({ to, children, isActive }: any) => {
  return (
    <Link
      to={to}
      className={`mr-8 cursor-pointer py-6 font-sans lg:ml-8 lg:mr-0 ${
        isActive ? "border-b-[3px] border-b-text2 font-bold text-text2" : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default NavBar;
