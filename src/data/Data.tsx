import lagosStateLogo from "../Assets/jpg/home/lagos-state.jpg";
import ministryOfCommerce from "../Assets/jpg/home/ministry-work.jpg";
import lisk from "../Assets/svg/dashboard/token_lisk.svg";
import synWave from "../Assets/jpg/home/syn-wave.jpg";
import person1 from "../Assets/png/home/Co-op-PX1.png";
import person2 from "../Assets/png/home/Co-op-PX2.png";
import person3 from "../Assets/png/home/Co-op-PX3.png";
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
  // {
  //   img: project,
  //   text: "Project",
  //   to: "/dashboard/project",
  //   pathsToCheck: ["/dashboard/project"],
  // },
  // {
  //   img: shares,
  //   text: "My Shares",
  //   to: "/dashboard/shares",
  //   pathsToCheck: ["/dashboard/shares"],
  // },
  // {
  //   img: proposal,
  //   text: "Proposal",
  //   to: "/dashboard/proposal",
  //   pathsToCheck: ["/dashboard/proposal"],
  // },
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
  // {
  //   img: project,
  //   text: "Project",
  //   to: "/dashboard/project",
  // },
  // {
  //   img: shares,
  //   text: "My Shares",
  //   to: "/dashboard/shares",
  // },
  // {
  //   img: proposal,
  //   text: "Proposal",
  //   to: "/dashboard/proposal",
  // },
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
      "As a Chain Co-op member, your savings are protected under cooperative laws giving you financial security. Save in Naira, Dollars, Gold, or BTC and more. All within the framework of legally backed cooperative policies.",
  },

  {
    title: "Access Exclusive Investment Rounds",
    paragraph: "Develop Strategies Build Your Portfolio, and Track Success.",
  },
  {
    title: "Unlock Your Financial Power with Effortless Savings Circle",
    paragraph:
      "Enjoy effortless growth and access to loans, all while your savings are securely protected.",
  },
  {
    title: "Shape the Future of Chain Co-op",
    paragraph:
      "Vote on critical decisions, share your insights, and help guide growth of our worker-owned cooperative.",
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
  { src: synWave },
  { src: ministryOfCommerce },
  { src: lisk },
  { src: lagosStateLogo },
  { src: synWave },
  { src: ministryOfCommerce },
  { src: lisk },
  { src: lagosStateLogo },
  { src: synWave },
  { src: ministryOfCommerce },
  { src: lisk },
  { src: lagosStateLogo },
  { src: synWave },
  { src: ministryOfCommerce },
  { src: lisk },
  { src: lagosStateLogo },
  { src: synWave },
  { src: ministryOfCommerce },
  { src: lisk },
  { src: synWave },
  { src: lagosStateLogo },
  { src: synWave },
  { src: ministryOfCommerce },
  { src: lisk },
  { src: lagosStateLogo },
  { src: synWave },
  { src: ministryOfCommerce },
  { src: lisk },
  { src: lagosStateLogo },
  { src: synWave },
  { src: ministryOfCommerce },
  { src: lisk },
  { src: lagosStateLogo },
  { src: synWave },
  { src: ministryOfCommerce },
  { src: lisk },
  { src: lagosStateLogo },
  { src: synWave },
  { src: ministryOfCommerce },
  { src: lisk },
  { src: synWave },
];

export const customerCardData = [
  {
    paragraph: "Vote & get involved in the Coop Network",
  },
  {
    paragraph: "Invest in the Coop Network business",
  },
  {
    paragraph: "Mint NFT after 6 months of saving",
  },
  {
    paragraph:
      "Access to individual, group, BREAD, BTC, and other saving cycles.",
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
    paragraph: "Discounted products & services",
  },
  {
    paragraph: " Mint NFT after 6 months of saving",
  },
  {
    paragraph:
      "Access to savings individual savings Cycles, Group saving Dollar, BREAD, BTC and more.",
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
    paragraph: "Discounted products & services",
  },
  {
    paragraph: " Mint NFT after 6 months of saving",
  },
  {
    paragraph: "Eacr dividend on all Co-op business",
  },
  {
    paragraph: "Access to all savings features and Receive Yeilds on savings",
  },
  {
    paragraph: "Access to microcredit with 0% interest rate",
  },
];

//MEMBERSHIP FEE CARD DATA
export const MembershipFeePioneerCardData = [
  {
    paragraph: "Installmentall payment is allowed till fee is completed",
  },
  {
    paragraph: "Vote and engage with the coop network",
  },
  {
    paragraph: "Invest in the coop network business",
  },
  {
    paragraph: "Early access to the first investment rounds",
  },
  {
    paragraph: "Discounted the coop network product and services",
  },
];

export const CustomerFeeExplorerCardData = [
  {
    paragraph: "Installmentall payment is allowed till fee is completed",
  },
  {
    paragraph: "Vote and engage with the coop network",
  },
  {
    paragraph: "Invest in the coop network business",
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
  // {
  //   text: "Careers",
  //   to: "/career",
  // },
  // {
  //   text: "Support",
  // },
];

export const Explore = [
  {
    text: "Why Chain Coop",
    to: "/why-chain-co-op",
  },
  {
    text: "Membership Cards",
    to: "/membership",
  },
  // {
  //   text: "Projects",
  //   to: "/membership",
  // },
];

// export const Legal = [
//   {
//     text: "Privacy Policy",
//   },
//   {
//     text: "Terms & Condition",
//   },
//   {
//     text: "Disclaimer",
//   },
// ];

export const Contacts = [
  {
    text: "Lets build a better future together!",
  },
  {
    text: "Visit us at No. 9 Ogunlana Street, Ikosi",
  },
  {
    text: "Ketu, Lagos, Nigeria",
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
  PaymentPlan = "PaymentPlan",
  ContributionPlan = "ContributionPlan",
}

export const steps = [
  { label: "January", status: "Completed", comment: "Payment Made" },
  { label: "February", status: "Completedd", comment: "Payment Made" },
  { label: "March", status: "Completed", comment: "Payment Made" },
  { label: "April", status: "Completed", comment: "Payment Made" },
  { label: "May", status: "Completed", comment: "Payment Made" },
  { label: "June", status: "Completed", comment: "Payment Made" },
  { label: "July", status: "Completed", comment: "Payment Made" },
  { label: "August", status: "Completed", comment: "Payment Made" },
  { label: "September", status: "In Progress", comment: "Payment Pending" },
  { label: "October", status: "In Progress", comment: "Payment Pending" },
  { label: "November", status: "In Progress", comment: "Payment Pending" },
  { label: "December", status: "In Progress", comment: "Payment Pending" },
];

export const earlyMemberCircleText = {
  firstBox: {
    title: "Legally Guaranteed Returns",
    p: "Receive legally guanteed annual dividends based on your membership contribution",
    p2: "Chain Co-op ensures your returns are protected by cooperative law,offering peace of mind and long-term financial growth ",
  },
  secondBox: {
    title: "Access Exclusive Investment Rounds",
    p: "Access Exclusive Savings: Build a stable inflation-protected savings portfolio",
    p2: "Track your contributions, monitor your financial security progress, and prepare for potential loan opportunities with regular updates on your savings growth.",
  },
  thirdBox: {
    title: "Vote and Engage with Chain Coop Network",
    p: "Vote and Shape Savings Policies: influence decisions on Chain Co-op savings-focused initiatives.",
    p2: "Share your ideas on loadn eligibility, inflation protection, and asset classes to support a financial secure",
  },
  fourthBox: {
    title: "Your Financial Power with Effortless Savings Cycles:",
    p: "with Chain Co-op group savings cycles, you can effortlessly boost your funds in Dollars, BTC, and more.",
    p2: "Enjoy effortless growth, inflation protection and access to loan all while your savings are securely protected.",
  },
};

export const SavingOn = [
  { text: "House Rent" },
  { text: "School Fees" },
  { text: "Food" },
  { text: "Personal Need" },
  { text: "Car" },
];

export const Plan = [{ text: "Monthly" }, { text: "Daily" }];
