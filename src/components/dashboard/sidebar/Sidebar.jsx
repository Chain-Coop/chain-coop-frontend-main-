import { Link, useLocation } from "react-router-dom";
import { GoHome } from "react-icons/go";
import logo from "../../../Assets/svg/cooplogo.svg";
import { FaDropbox } from "react-icons/fa6";
import { IoWalletSharp } from "react-icons/io5";
import { GoProject } from "react-icons/go";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { IoPersonCircleOutline } from "react-icons/io5";
import membership from "../../../Assets/jpg/membership/customer.jpg";

const sidebarLinks = [
  {
    icon: <GoHome className="mr-2" size={20} />,
    text: "Home",
    to: "/dashboard",
  },
  {
    icon: <FaDropbox className="mr-2" size={20} />,
    text: "Contribution",
    to: "/dashboard/contribution",
  },
  {
    icon: <IoWalletSharp className="mr-2" size={20} />,
    text: "Wallet",
    to: "/dashboard/wallet",
  },
  {
    icon: <GoProject className="mr-2" size={20} />,
    text: "Project",
    to: "/dashboard/project",
  },
  {
    icon: <VscGitPullRequestGoToChanges className="mr-2" size={20} />,
    text: "Proposal",
    to: "/dashboard/proposal",
  },
  {
    icon: <IoPersonCircleOutline className="mr-2" size={20} />,
    text: "Profile",
    to: "/dashboard/profile",
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="h-vh flex w-[23em] flex-col border-r border-bl bg-rec1 py-[2em] font-sans text-memt1 shadow-md">
      <div>
        <img src={logo} alt="ChainCoop-logo" className=" ml-[1em]" />
      </div>
      <nav className="mb-[3em] ml-5 mt-[2em] flex flex-grow flex-col">
        {sidebarLinks.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className={`text flex items-center px-4 py-3 font-sans text-lg hover:bg-Dh ${
              (link.to === "/dashboard/proposal" &&
                location.pathname.startsWith(link.to)) ||
              location.pathname === link.to
                ? "active !important border-l-2 border-text2 bg-Dh font-semibold"
                : ""
            }`}
          >
            {link.icon}
            {link.text}
          </Link>
        ))}

        <section className="mt-[1em] px-4">
          <button className="cursor-not-allowed rounded-full bg-act px-[2em] py-1 text-text3 shadow-md">
            Activated
          </button>
        </section>
        <section className="mt-[2em] w-[16em] px-1">
          <img src={membership} className="" alt="membership-card" />
        </section>
        <section className="mt-4 flex w-[16em]">
          <p className="text-sm text-howtext">
            This card grant you access to the chain Coop Chain Network
            ecosystem. Once Activated, it becomes non-transferable
          </p>
        </section>
      </nav>
    </aside>
  );
};

export default Sidebar;
