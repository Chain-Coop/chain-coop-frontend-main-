import demologo from "../Assets/png/home/demologo.png";
import person1 from "../Assets/jpg/home/person1.jpg";
import person2 from "../Assets/jpg/home/person2.jpg";
import person3 from "../Assets/jpg/home/person3.jpg";
import { GoHome } from "react-icons/go";
import { GoProject } from "react-icons/go";
import { FaDropbox } from "react-icons/fa6";
import { IoWalletSharp } from "react-icons/io5";
import { IoPersonCircleOutline } from "react-icons/io5";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import wallet from "../Assets/svg/dashboard/wallet.svg";
import home from "../Assets/svg/dashboard/home.svg";
import contribution from "../Assets/svg/dashboard/contribution.svg";
import project from "../Assets/svg/dashboard/project.svg";
import profile from "../Assets/svg/dashboard/Profile.svg";
import proposal from "../Assets/svg/dashboard/proposal.svg";

export const navBarLinks = [
  { to: "/", text: "Why Chain Coop" },
  { to: "/our-story", text: "Our Story" },
  { to: "/membership", text: "Membership" },
  { to: "/contact", text: "Contact" },
];

export const sidebarLinks = [
  {
    img: home,
    text: "Home",
    to: "/dashboard",
    pathsToCheck: ["/dashboard/home"],
  },
  {
    img: contribution,
    text: "Contribution",
    to: "/dashboard/contribution",
    pathsToCheck: ["/dashboard/contribution"],
  },
  {
    img: wallet,
    text: "Wallet",
    to: "/dashboard/wallet",
    pathsToCheck: ["/dashboard/wallet"],
  },
  {
    img: project,
    text: "Project",
    to: "/dashboard/project",
    pathsToCheck: ["/dashboard/project"],
  },
  {
    img: proposal,
    text: "Proposal",
    to: "/dashboard/proposal",
    pathsToCheck: ["/dashboard/proposal"],
  },
  {
    img: profile,
    text: "Profile",
    to: "/dashboard/profile",
    pathsToCheck: ["/dashboard/profile"],
  },
];

export const dashboardNav = [
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

export const becomeData = [
  {
    title: "Legally Guaranteed Returns",
    paragraph:
      "Enjoy Annual Co-op Dividends Based on Your Membership Contribution",
  },

  {
    title: "Access Exclusive Investment Rounds",
    paragraph: "Develop Strategies Build Your Portfolio, and Track Success",
  },
  {
    title: "Expand Your Network",
    paragraph:
      "Participate in Members Meeting Online Chats, and Live Social Events with investors & Entrepreneurs",
  },
  {
    title: "Vote and Engage with Chain Coop Network",
    paragraph: "Contribute ideas and Commit to collective Growth",
  },
];

export const meetImage = [
  {
    src: person1,
  },
  {
    src: person2,
  },
  {
    src: person3,
  },
];

export const trustedPartners = [
  { src: demologo },
  { src: demologo },
  { src: demologo },
  { src: demologo },
  { src: demologo },
  { src: demologo },
  { src: demologo },
  { src: demologo },
  { src: demologo },
  { src: demologo },
];

export const customerCardData = [
  {
    paragraph: "Vote & get involved in the Coop Network",
  },
  {
    paragraph: "Invest in the Coop Network business",
  },
];

export const investorCardData = [
  {
    paragraph: "Vote & get involved in the Coop Network",
  },
  {
    paragraph: "Invest in the Coop Network business",
  },
  {
    paragraph: "Early access to first investment rounds",
  },
  {
    paragraph: "Discounted The Coop Network products & services",
  },
];

export const employeeCardData = [
  {
    paragraph: "Vote & get involved in the Coop Network",
  },
  {
    paragraph: "Invest in the Coop Network business",
  },
  {
    paragraph: "Early access to first investment rounds",
  },
  {
    paragraph: "Discounted The Coop Network products & services",
  },
];

//Footer Links
export const company = [
  {
    text: "About Us",
    to: "/our-story",
  },
  // {
  //   text: "Team",
  //   to: "/team",
  // },
  {
    text: "Careers",
    to: "/career",
  },
  {
    text: "Support",
  },
];

export const Explore = [
  {
    text: "Why Chain Coop",
    to: "/",
  },
  {
    text: "Membership Cards",
    to: "/membership",
  },
  {
    text: "Projects",
    to: "/membership",
  },
  {
    text: "Blog",
  },
];

export const Legal = [
  {
    text: "Privacy Policy",
  },
  {
    text: "Terms & Condition",
  },
  {
    text: "Disclaimer",
  },
];

export const Contacts = [
  {
    text: "Privacy Policy",
  },
  {
    text: "Ikosi Ketu, Lagos, Nigeria",
  },
  {
    text: "info@chainerative.com.ng",
  },
  {
    text: "+234 809 322 7696",
  },
];
