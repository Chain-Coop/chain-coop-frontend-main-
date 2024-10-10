import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../Assets/svg/cooplogo.svg";
import { sidebarLinks } from "../../../data/Data";
import member from "../../../Assets/jpg/membership/customer.jpg";
import investor from "../../../Assets/jpg/membership/investor.jpg";
import useUserProfile from "../../../shared/Hooks/useUserProfile";

const Sidebar = () => {
  const location = useLocation();  
  const navigate = useNavigate();
  const { profileDetails } = useUserProfile();

  const home = () => {
    navigate("/dashboard");
  };

  const getMembershipImage = () => {
    if (profileDetails?.membershipType === "Explorer") {
      return member;
    } else if (profileDetails?.membershipType === "Pioneer") {
      return investor;
    }
    return member;
  };

  const getButtonProps = () => {
    if (profileDetails?.membershipStatus === "pending") {
      return { text: "Pending", bgColor: "bg-yellow-500" }; 
    } else if (profileDetails?.membershipStatus === "activated") {
      return { text: "Activated", bgColor: "bg-green-500" }; 
    }
    return { text: "Unknown", bgColor: "bg-gray-400" }; 
  };

  const { text, bgColor } = getButtonProps();

  return (
    <aside className="h-vh flex w-[23em] flex-col border-r border-bl bg-rec1 py-[2em] font-sans text-memt1 shadow-md">
      <div onClick={home}>
        <img src={logo} alt="ChainCoop-logo" className="ml-[1em] cursor-pointer" />
      </div>
      <nav className="mb-[3em] ml-5 mt-[2em] flex flex-grow flex-col">
        {sidebarLinks.map((link, index) => {
          const isActive =
            link.pathsToCheck?.some((path) =>
              location.pathname.startsWith(path),
            ) || location.pathname === link.to;

          return (
            <Link
              key={index}
              to={link.to}
              className={`text flex items-center px-4 py-3 font-sans text-lg hover:bg-Dh ${
                isActive
                  ? "active !important border-l-2 border-text2 bg-Dh font-semibold"
                  : ""
              }`}
            >
              <img src={link.img} alt={`${link.text} icon`} className="mr-3 h-6 w-6" />
              {link.text}
            </Link>
          );
        })}
        <section className="mt-[1em] px-4">
          <button className={`rounded-full ${bgColor} px-[2em] py-1 text-text3 shadow-md`}>
            {text}
          </button>
        </section>
        <section className="mt-[2em] w-[16em] px-1">
          <img src={getMembershipImage()} className="" alt="membership-card" />
        </section>
        <section className="mt-4 flex w-[16em]">
          <p className="text-sm text-howtext">
            This card grants you access to the Chain Coop Chain Network ecosystem. Once activated, it becomes non-transferable.
          </p>
        </section>
      </nav>
    </aside>
  );
};

export default Sidebar;
