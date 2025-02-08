import lagosStateLogo from "../Assets/jpg/home/lagos-state.jpg";
import ministryOfCommerce from "../Assets/jpg/home/ministry-work.jpg";
import aya from "../Assets/png/home/Aya_logo.png";
import lisk from "../Assets/svg/dashboard/token_lisk.svg";
import synWave from "../Assets/jpg/home/syn-wave.jpg";
import person1 from "../Assets/png/home/Co-op-PX1.png";
import person2 from "../Assets/png/home/Co-op-PX2.png";
import person3 from "../Assets/png/home/Co-op-PX3.png";
import wallet from "../Assets/svg/dashboard/wallet.svg";
import home from "../Assets/svg/dashboard/home.svg";
import contribution from "../Assets/svg/dashboard/contribution.svg";
import profile from "../Assets/svg/dashboard/Profile.svg";
import personA from "../Assets/png/footer/team/png/image1.png";

export const navBarLinks = [
  { to: "/why-chain-co-op", text: "Why Chain Coop" },
  { to: "/partner-with-us", text: "Partner with us" },
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
    img: profile,
    text: "Profile",
    to: "/dashboard/profile",
  },
];

export const becomeData = [
  {
    title: "Save in Naira",
    paragraph:
      "Build a culture of Saving and jon others in building communal wealth by saving in naira.",
  },

  {
    title: "Stay safe from inflation with USDT, USDC, LISK etc.",
    paragraph:
      "Beat inflation by saving in stable coins and other cryptos. Automate your savings from Naira to crypo.",
  },
  {
    title: "Save A % of your Naira to Crypto",
    paragraph:
      "Choose what portion of your savings you want to be converted into crypto.",
  },
  {
    title: "Save Together, Grow Together",
    paragraph:
      "Create savings cycles with friend and family you trust Our innovative.",
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
  { src: aya },
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

export const Company = [
  {
    text: "Team",
    to: "/team",
  },
];

export const Explore = [
  {
    text: "Why Chain Coop",
    to: "/why-chain-co-op",
  },
];

export const Legal = [
  {
    text: "Terms of service",
    to: "/terms",
  },
];

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

export const SavingOn = [
  { text: "House Rent" },
  { text: "School Fees" },
  { text: "Food" },
  { text: "Personal Need" },
  { text: "Car" },
];

export const Plan = [{ text: "Monthly" }, { text: "Daily" }];

export const Terms = [
  {
    title: "1. Introduction",
    content:
      "The website is operated by the cooperative 'Chain Co-op', a legal entity registered with the Lagos State Ministry of Commerce, Industry, and Cooperatives, Alausa, lagos with its registered office at 9, Ogunlana close, Alausa, Lagos. Chain Co-op provides an automated savings platform available on its website at chaincoop.org.",
  },
  {
    title: "2. Definitions",
    content: [
      {
        term: '"Privacy policy"',
        definition:
          "means the regulations established on the page (https://chaincoop.org/privacy-policy) operated by Chain Co-op, as well as all documents referred to within them.",
      },
      {
        term: '"Applicable law"',
        definition:
          "means any constitution, statute, law, rule, regulation, ordinance, judgment, order, decree of the Federal Republic of Nigeria, or any published directive, guideline, requirement or other governmental restriction that has the force of law, whether in effect as of the date hereof or as of any date thereafter in the Federal Republic of Nigeria.",
      },
      {
        term: '"Client", "Customer", "you", "your"',
        definition:
          "means a party using and utilising our Services through our Platform.",
      },
      {
        term: '"Chain co-op", "We", "us", "our"',
        definition:
          'means Chain Co-op and its successors, affiliates, and assignees. "Chain Co-op Account" means a Client or Customer\'s account with Chain Co-op for the Services we render.',
      },
      {
        term: '"Partner Program"',
        definition:
          "refers to contractual relationships entered into between Chain Co-op and third-party service providers to enhance or build on Chain co-op's product offerings.",
      },
      {
        term: '"Platform"',
        definition:
          "means collectively, Chain Co-op's website, mobile applications, and blog, including any updates or replacements as may be applicable.",
      },
      {
        term: '"Services"',
        definition:
          "refers to the management of a Client's savings and investments made through the Platform and/or other services as may be agreed between the parties but subject always to the terms of our license.",
      },
      {
        term: '"Terms of Use"',
        definition: "means these terms of use.",
      },
      {
        term: '"Members"',
        definition:
          "means the natural person who acquired the status of Member within Chain Co-op.",
      },
    ],
  },
  {
    title: "3. Membership",
    content:
      "Chain Co-op is a cooperative that allows users to save money online and convert it into stable cryptocurrencies like USDT. Becoming a member requires completing the necessary procedures, such as the successful completion of the Know Your Customer (KYC) procedure, along with any other methods outlined in the governing documents of Chain Co-op.",
  },
  {
    title: "4. Purposes",
    content: [
      "Chain Co-op provides an online platform where users can save money automatically and convert it into cryptocurrencies. As our Client, we will use our best efforts and reasonable care to manage your savings.",
      "In order to operate and make available the services and utilise the platform, Chain Co-op collects, uses and discloses certain personal information about you. We collect, use, disclose and protect that information as described in our privacy policy, which is hereby incorporated into these Terms of Use.",
      "Please read the privacy policy carefully before accessing the Platform or using the Services.",
      "References to 'you' or 'your' are references to any person accessing or using the Platform and/or Services by any means. Chain Co-op provides an online platform where users can save money and convert it into cryptocurrencies.",
      "The cooperative is governed using blockchain technology, ensuring transparency, security, and efficient management of member funds.",
    ],
  },
  {
    title: "5. Obligations",
    sections: [
      {
        title: "5.1 Eligibility",
        content:
          "Access to the Chain Co-op platform and services is strictly limited to:",
        list: [
          "Individuals possessing a valid Bank Verification Number (BVN);",
          "Nigerian citizens or legal residents;",
          "Businesses or entities duly registered and incorporated in Nigeria.",
        ],
        footer:
          "Use of the platform or services by any party not meeting these criteria is unauthorized and constitutes a violation of these Terms of Service.",
      },
      {
        title: "5.2 Your Access",
        content: [
          "To access certain features of our platform, you must register and create an account ('Member Account'). During registration, you will be required to set a password, which must be provided to access your account.",
          "Chain Co-op maintains robust security measures compliant with legal standards to protect your personal information (refer to our privacy policy). You are responsible for safeguarding your password and other account details. You must not share your password with anyone, and you must notify Chain Co-op immediately if your password is compromised or if you suspect unauthorized use of your account.",
          "As a Member, you are solely responsible for all activities conducted through your Chain Co-op account. Chain Co-op will act on instructions received under your account, which will be considered duly authorized by you.",
          "You must ensure that all information provided during account registration is accurate, complete, and kept up-to-date.",
          "If you are interested in developing enhancements or extensions to the services, such activity must proceed through our API as part of the Partner Program, which requires meeting specific eligibility criteria and a formal partnership agreement.",
          "If your account is inactive for a prolonged period, applicable laws may classify the funds as unclaimed property. We may attempt to contact you or your legally designated Next of Kin (NOK) using the last address in our records. Your NOK will not have access to transaction details or funds. If contact attempts fail, we may be required to surrender any funds in your account to the state as unclaimed property, in accordance with local regulations.",
          "In the event of a member's death, the disposition of funds or interests within the member's account will comply with applicable laws.",
        ],
      },
      {
        title: "5.3 Alerts, Notifications, and Service Communications",
        content: [
          "By creating a Member Account, you agree to receive various alerts and notifications via email and mobile notification.",
          "These messages will never contain your password but may include your name, email address, and portfolio information.",
          "These alerts are visible to anyone with access to your email or mobile device.",
          "You can opt out of non-essential communications at any time.",
        ],
      },
      {
        title: "5.4 Confidentiality",
        content: [
          "Chain Co-op and its employees, consultants, or agents will maintain the confidentiality of all non-public information and documents obtained while providing services.",
          "Confidential information will not be disclosed to third parties except as required by law or as necessary for legal advice.",
          "This confidentiality obligation persists beyond the termination of these Terms.",
        ],
      },
    ],
  },
  {
    title: "6. Savings Terms and Conditions",
    content: [
      "By utilizing our Services and Platform, you acknowledge and accept the following terms:",
      "The duration and commission rates of each savings plan on our Platform are specified within the plan details.",
      "Chain Co-op reserves the right to modify these terms as necessary, in accordance with applicable laws and prevailing market conditions.",
      "Chain Co-op may modify, without prior notice, the lock periods and commission rates of any savings plan.",
      "By agreeing to these terms, you release Chain Co-op and its directors, officers, employees, agents, successors, and assigns from all liabilities, losses, claims, damages, costs, and expenses, including reasonable attorney fees, that could arise from these changes.",
    ],
  },
  {
    title: "7. Fee Payment",
    content: [
      "By utilizing our Services, you authorize Chain Co-op to automatically deduct any applicable fees directly from your Chain Co-op account (referred to as 'Account Fees').",
      "Fee payments will typically be drawn first from liquid assets in your account, followed by the liquidation of cash equivalents, and, if necessary, by selling securities held in your account.",
      "By maintaining your account with us, you continuously reaffirm your consent for Chain Co-op to deduct these Account Fees as described.",
    ],
  },
  {
    title: "8. Other Fees",
    content: [
      "You acknowledge that using Chain Co-op's services may result in fees imposed by third-party financial institutions.",
      "These additional costs can include bank transfer fees, transfer taxes, and other similar expenses.",
      "Please be aware that these fees are not covered by the fees you pay to Chain Co-op.",
    ],
  },
  {
    title: "9. Anti-Money Laundering",
    content: [
      "You affirm and guarantee the following, and you agree to notify Chain Co-op promptly if any of these assurances no longer hold:",
      "To the best of your knowledge, after conducting thorough inquiries, no funds or assets under Chain Co-op management have been or will be derived from or involved in any illegal activities violating applicable laws.",
      "Your contributions or payments to Chain Co-op will not cause the cooperative to breach applicable laws.",
    ],
  },
  {
    title: "10. Intellectual Property",
    content: [
      "All materials, including text, images, logos, products, and services available on the Site and App, are owned by Chain Co-op or licensed.",
      "Any unauthorized use, reproduction, or distribution is prohibited.",
    ],
  },
  {
    title: "11. Amendments to Terms and Conditions",
    content: [
      "Chain Co-op reserves the right to modify these Terms and Conditions at any time, without prior notice.",
      "Updated versions will be posted on the Site. The latest version will include the date of the last update, allowing users to check for any changes.",
    ],
  },
  {
    title: "12. Privacy and Data Protection",
    content: [
      "By using the Site, you agree to our Privacy Policy and Cookie Policy, which outline how your data is collected, stored, and used.",
      "These documents are part of the overall Terms and Conditions.",
    ],
  },
  {
    title: "13. International Use",
    content: [
      "Chain Co-op is exclusively available within the borders of the Federal Republic of Nigeria.",
      "We do not claim that Chain Co-op is suitable or available outside of Nigeria.",
      "Additionally, we do not guarantee that accessing Chain Co-op from territories outside Nigeria complies with applicable laws.",
      "If you use Chain Co-op from outside Nigeria, you do so at your own risk and must ensure compliance with the laws of your location.",
    ],
  },
];

// src/data/teamData.js

export const teamMembers = [
  {
    id: 1,
    name: "Olajuwon Ogunseye",
    role: "Data Engineer/CCO",
    image: personA,
    description:
      "Olajuwon Ogunseye is a Data Engineer with 6+ years fintech and blockchain experience. He is focusing on cooperative and decentralized finance.",
    social: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    id: 2,
    name: "Rebecca Asseh",
    role: "Content Marketer",
    image: personA,
    description:
      "Rebecca Asseh is a Blockchain Content Marketer, crypto educator and board member of Black Women in Blockchain Council. She works on simplifying blockchain for end-users.",
    social: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    id: 3,
    name: "AbdulSamad Gobir",
    role: "Product Manager / CMO",
    image: personA,
    description:
      "Founder of jobhunteters and co-founder of Automation Affairs Ltd. a versatile product and project manager. A former Presidient of the gemstones Toast masters Club with contributions of over 200 applictaions and product with companies like Appcake and Routepay.G",
    social: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    id: 4,
    name: "Kalu Iwere Eyitemi",
    role: "Content Marketer",
    image: personA,
    description:
      "Eyitemi is a Product designer with over 3+years of experience.",
    social: {
      twitter: "#",
      linkedin: "#",
    },
  },
];
