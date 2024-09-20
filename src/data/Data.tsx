import lagosStateLogo from "../Assets/png/home/lagos-state-logo.jpg"
import ministryOfCommerce from "../Assets/png/home/ministry-of-commerce.jpg"
import synWave from "../Assets/png/home/syn-wave.jpg"
import person1 from "../Assets/jpg/home/person1.jpg";
import person2 from "../Assets/jpg/home/person2.jpg";
import person3 from "../Assets/jpg/home/person3.jpg";
import wallet from "../Assets/svg/dashboard/wallet.svg";
import home from "../Assets/svg/dashboard/home.svg";
import contribution from "../Assets/svg/dashboard/contribution.svg";
import project from "../Assets/svg/dashboard/project.svg";
import shares from "../Assets/svg/dashboard/shares.svg";
import profile from "../Assets/svg/dashboard/Profile.svg";
import proposal from "../Assets/svg/dashboard/proposal.svg";

export const navBarLinks = [
  { to: "/why-chain-co-op", text: "Why Chain Coop" },
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
    img: shares,
    text: "My Shares",
    to: "/dashboard/shares",
    pathsToCheck: ["/dashboard/shares"],
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
    img: wallet,
    text: "Home",
    to: "/dashboard",
  },
  {
    img: contribution,
    text: "Contribution",
    to: "/dashboard/contribution",
  },
  {
    img: wallet,
    text: "Wallet",
    to: "/dashboard/wallet",
  },
  {
    img: project,
    text: "Project",
    to: "/dashboard/project",
  },
  {
    img: shares,
    text: "My Shares",
    to: "/dashboard/shares",
  },
  {
    img: proposal,
    text: "Proposal",
    to: "/dashboard/proposal",
  },
  {
    img: profile,
    text: "Profile",
    to: "/dashboard/profile",
  },
];

export const becomeData = [
  {
    title: "Legally Guaranteed Returns",
    paragraph:
      "As a Chain Co-op member, your investment are protected by cooperative laws giving you peace of mind with annual dividends based on your contributions",
  },

  {
    title: "Access Exclusive Investment Rounds",
    paragraph: "Develop Strategies Build Your Portfolio, and Track Success",
  },
  {
    title: "Grow Your Network with Industry Experts",
    paragraph:
      "Meet fellow tech professionals investors, and extrepreneur through virtual meetups and exclusive events",
  },
  {
    title: "Shape the Future of Chain Co-op",
    paragraph: "Vote on critical decisions, share your insights, and help guide growth of our worker-owned cooperative",
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
  { src: lagosStateLogo },
  {src: synWave},
  { src: ministryOfCommerce },
  { src: lagosStateLogo },
  {src: synWave},
  { src: ministryOfCommerce },
  { src: lagosStateLogo },
  {src: synWave},
  { src: ministryOfCommerce },
  { src: lagosStateLogo },
  {src: synWave},
  { src: ministryOfCommerce },
  { src: lagosStateLogo },
  {src: synWave},
  { src: ministryOfCommerce },
  {src: synWave},
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

export enum ModalTypes {
  Transfer = "transfer",
  Upload = "upload",
  Final = "final",
  Paystack = "paystack",
  PaymentPlan="PaymentPlan",
  ContributionPlan="ContributionPlan"
}

export const steps = [
  { label: 'January',status:"Completed",comment:"Payment Made" },
  { label: 'February',status:"Completedd",comment:"Payment Made" },
  { label: 'March',status:"Completed",comment:"Payment Made" },
  { label: 'April',status:"Completed",comment:"Payment Made" },
  { label: 'May',status:"Completed",comment:"Payment Made" },
  { label: 'June',status:"Completed",comment:"Payment Made" },
  { label: 'July',status:"Completed",comment:"Payment Made" },
  { label: 'August',status:"Completed",comment:"Payment Made" },
  { label: 'September',status:"In Progress",comment:"Payment Pending" },
  { label: 'October',status:"In Progress",comment:"Payment Pending" },
  { label: 'November',status:"In Progress",comment:"Payment Pending" },
  { label: 'December',status:"In Progress",comment:"Payment Pending" }
];

export const earlyMemberCircleText = {
  firstBox: {
    title: "Legally Guaranteed Returns",
    p: "Enjoy Annual Co-op Dividends Based on Your Membership Contribution",
  },
  secondBox: {
    title: "Access Exclusive Investment Rounds",
    p: "Develop Strategies, Build Your Portfolio, and Track Success",
  },
  thirdBox: {
    title: "Vote and Engage with Chain Coop Network",
    p: "Contribute ideas and Commit to collective Growth",
  },
  fourthBox: {
    title: "Expand Your Network",
    p: "Participate in Members Meetings, Online Chats and live social Events with Investors and Entrepreneurs",
  },
};
