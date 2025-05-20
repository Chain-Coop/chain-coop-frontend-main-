import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../Assets/svg/cooplogo.svg";
import { sidebarLinks } from "../../../data/Data";
import member from "../../../Assets/jpg/membership/customer.jpg";
import investor from "../../../Assets/jpg/membership/investor.jpg";
import { Typography } from "@material-tailwind/react";
import { useUserProfile } from "../../../shared/Hooks/useUserProfile";

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
    if (profileDetails?.membershipStatus === "inactive") {
      return { text: "Inactive", bgColor: "bg-yellow-500" };
    } else if (profileDetails?.membershipStatus === "active") {
      return { text: "Activated", bgColor: "bg-green-500" };
    }
    return { text: "Unknown", bgColor: "bg-gray-400" };
  };

  const { text, bgColor } = getButtonProps();

  return (
    <aside className="flex h-screen flex-col border-r border-bl bg-rec1 text-memt1 shadow-md">
      <div className="flex-shrink-0 px-[1em] py-[2em]" onClick={home}>
        <img src={logo} alt="ChainCoop-logo" className="cursor-pointer" />
      </div>

      <div className="custom-scroll-bar flex-grow overflow-y-auto">
        <nav className="mb-[3em] ml-5 flex flex-col">
          {sidebarLinks.map((link, index) => {
            const isActive =
              location.pathname === link.to ||
              (link.pathsToCheck &&
                link.pathsToCheck.some((p) => location.pathname === p));

            return (
              <Link
                key={index}
                to={link.to}
                className={`text flex items-center px-4 py-5 text-[16px] text-[#1E1E1E] hover:bg-Dh ${
                  isActive
                    ? "active !important border-l-2 border-text2 bg-Dh font-semibold"
                    : ""
                }`}
              >
                <img
                  src={link.img}
                  alt={`${link.text} icon`}
                  className="mr-3 h-5 w-5"
                />
                {link.text}
              </Link>
            );
          })}

          <section className="mt-[1em] px-4">
            <button
              className={`rounded-full ${bgColor} px-[2em] py-1 text-text3 shadow-md`}
            >
              {text}
            </button>
          </section>

          <section className="mt-[2em] w-[16em] px-1">
            <img
              src={getMembershipImage()}
              className=""
              alt="membership-card"
            />
          </section>

          <section className="mt-4 flex">
            <Typography
              variant="small"
              className="leading-snug tracking-tight text-howtext"
            >
              This card grants you access to the Chain Coop Chain Network
              ecosystem. Once activated, it becomes non-transferable.
            </Typography>
          </section>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;