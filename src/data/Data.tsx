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
import ajo from "../Assets/svg/dashboard/ajo.svg";
import profile from "../Assets/svg/dashboard/Profile.svg";
import temi from "../Assets/png/footer/team/png/temi.png";
import heather from "../Assets/png/footer/team/png/Heather.png";
import juwon from "../Assets/png/home/juwon.png";
import samad from "../Assets/png/home/abdulSamad.png";
import rebecca from "../Assets/png/home/rebecca.png";
import awoyinfa from "../Assets/png/footer/team/png/awoyinfa.png";
import seane from "../Assets/png/footer/team/png/tshegofatso.png";
import taiwo from "../Assets/png/footer/team/png/taiwo.png";
import open_group from "../Assets/svg/dashboard/ajo/open_group.svg";
import closed_group from "../Assets/svg/dashboard/ajo/closed_group.svg";

export const navBarLinks = [
  { to: "/why-chain-co-op", text: "Why Chain Co-op" },
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
    img: ajo,
    text: "Ajo",
    to: "/dashboard/ajo",
    pathsToCheck: ["/dashboard/ajo"],
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
    img: ajo,
    text: "Ajo",
    to: "/dashboard/ajo",
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
      "Build a culture of saving and join others in building communal wealth by saving in Naira.",
  },
  {
    title: "Stay Safe from Inflation with USDT, USDC, LISK, etc.",
    paragraph:
      "Beat inflation by saving in stablecoins and other cryptos. Automate your savings from Naira to Crypto.",
  },
  {
    title: "Save a Percentage of Your Naira in Crypto",
    paragraph:
      "Choose what portion of your savings you want to be converted into crypto.",
  },
  {
    title: "Save Together, Grow Together",
    paragraph:
      "Create savings cycles with friends and family you trust. Our innovative platform makes it seamless.",
  },
];

export const groupSavingsOptions = [
  {
    icon: open_group,
    header: "Create Open Group",
    text: "This clearly implies that anyone can join",
    backgroundColor: "#ECE6F2",
    link: "/dashboard/ajo/create/open-group",
  },
  {
    icon: closed_group,
    header: "Create Closed Group",
    text: "This group entry requires an invitation privately",
    backgroundColor: "#F5F0F0D4",
    link: "/dashboard/ajo/create/closed-group",
  },
];

export const membersBriefData = [
  {
    name: "John Doe",
    amount: "$20",
    userType: "member",
    status: "Joined",
    funded: "$20",
    time: "4 minutes ago",
    progress: 10,
  },
  {
    name: "Jane Doe",
    amount: "$30",
    userType: "member",
    status: "Joined",
    progress: 0,
  },
  {
    name: "Mark Doe",
    amount: "$0",
    userType: "member",
    status: "Joined",
    progress: 30,
  },
];

export const membersData = [
  {
    name: "Janet Mark",
    userType: "Admin",
    total: "$100",
    joined: "2023-12-01T09:15:00",
    next_deposit: "2025-04-15T18:30:00",
    last_deposit: "2025-03-10T17:00:00",
    progress: 20,
  },
  {
    name: "Michael Chen",
    userType: "Member",
    total: "$200",
    joined: "2023-11-20T10:45:00",
    next_deposit: "2025-04-18T14:00:00",
    last_deposit: "2025-03-18T13:45:00",
    progress: 45,
  },
  {
    name: "Sarah Johnson",
    userType: "Member",
    total: "$150",
    joined: "2024-01-05T08:30:00",
    next_deposit: "2025-04-20T11:15:00",
    last_deposit: "2025-03-20T10:30:00",
    progress: 35,
  },
  {
    name: "David Kim",
    userType: "Admin",
    total: "$300",
    joined: "2023-10-12T12:00:00",
    next_deposit: "2025-04-22T09:00:00",
    last_deposit: "2025-03-22T08:45:00",
    progress: 60,
  },
  {
    name: "Angela White",
    userType: "Member",
    total: "$250",
    joined: "2023-09-28T14:20:00",
    next_deposit: "2025-04-25T17:30:00",
    last_deposit: "2025-03-25T17:00:00",
    progress: 50,
  },
  {
    name: "Chris Evans",
    userType: "Member",
    total: "$120",
    joined: "2024-02-01T16:00:00",
    next_deposit: "2025-04-28T19:00:00",
    last_deposit: "2025-03-28T18:30:00",
    progress: 25,
  },
  {
    name: "Emily Davis",
    userType: "Admin",
    total: "$400",
    joined: "2023-08-15T11:45:00",
    next_deposit: "2025-05-01T08:00:00",
    last_deposit: "2025-04-01T07:30:00",
    progress: 80,
  },
  {
    name: "Samuel Lee",
    userType: "Member",
    total: "$180",
    joined: "2023-10-10T13:15:00",
    next_deposit: "2025-05-03T15:00:00",
    last_deposit: "2025-04-03T14:30:00",
    progress: 40,
  },
  {
    name: "Patricia Brown",
    userType: "Member",
    total: "$90",
    joined: "2024-01-20T07:30:00",
    next_deposit: "2025-05-06T10:00:00",
    last_deposit: "2025-04-06T09:15:00",
    progress: 15,
  },
  {
    name: "Daniel Lee",
    userType: "Admin",
    total: "$350",
    joined: "2023-11-05T17:45:00",
    next_deposit: "2025-05-10T13:45:00",
    last_deposit: "2025-04-10T13:00:00",
    progress: 70,
  },
];

export const transactionData = [
  {
    name: "Agro Tech Savings",
    user: "Jane Smith",
    deposit: "$25",
    total: "$2500",
    date: "2023-10-05T09:15:00",
  },
  {
    name: "Agro Tech Savings",
    user: "Samuel Johnson",
    deposit: "$40",
    total: "$400",
    date: "2023-10-10T14:45:00",
  },
  {
    name: "Agro Tech Savings",
    user: "Mary Lee",
    deposit: "$15",
    total: "$150",
    date: "2023-10-12T11:30:00",
  },
  {
    name: "Agro Tech Savings",
    user: "David Kim",
    deposit: "$30",
    total: "$300",
    date: "2023-10-15T16:10:00",
  },
  {
    name: "Agro Tech Savings",
    user: "Patricia Brown",
    deposit: "$20",
    total: "$200",
    date: "2023-10-18T08:05:00",
  },
  {
    name: "Agro Tech Savings",
    user: "Chris Evans",
    deposit: "$35",
    total: "$350",
    date: "2023-10-20T18:50:00",
  },
  {
    name: "Agro Tech Savings",
    user: "Angela White",
    deposit: "$50",
    total: "$500",
    date: "2023-10-22T15:30:00",
  },
  {
    name: "Agro Tech Savings",
    user: "Michael Clark",
    deposit: "$45",
    total: "$450",
    date: "2023-10-25T10:20:00",
  },
  {
    name: "Agro Tech Savings",
    user: "Emily Davis",
    deposit: "$60",
    total: "$600",
    date: "2023-10-27T19:00:00",
  },
  {
    name: "Agro Tech Savings",
    user: "Daniel Lee",
    deposit: "$55",
    total: "$550",
    date: "2023-10-30T13:00:00",
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
    paragraph: "Vote and get involved in the Co-op Network.",
  },
  {
    paragraph: "Invest in the Co-op Network business.",
  },
  {
    paragraph: "Mint an NFT after six months of saving.",
  },
  {
    paragraph: "Access individual, group, BREAD, BTC, and other saving cycles.",
  },
];
export const investorCardData = [
  {
    paragraph: "Vote and get involved in the Co-op Network.",
  },
  {
    paragraph: "Invest in the Co-op Network business.",
  },
  {
    paragraph: "Early access to first investment rounds.",
  },
  {
    paragraph: "Discounted products and services.",
  },
  {
    paragraph: "Mint an NFT after six months of saving.",
  },
  {
    paragraph:
      "Access individual savings cycles, group savings, Dollar, BREAD, BTC, and more.",
  },
];

export const employeeCardData = [
  {
    paragraph: "Vote and get involved in the Co-op Network.",
  },
  {
    paragraph: "Invest in the Co-op Network business.",
  },
  {
    paragraph: "Early access to first investment rounds.",
  },
  {
    paragraph: "Discounted products and services.",
  },
  {
    paragraph: "Mint an NFT after six months of saving.",
  },
  {
    paragraph: "Earn dividends on all Co-op businesses.",
  },
  {
    paragraph: "Access all savings features and receive yields on savings.",
  },
  {
    paragraph: "Access microcredit with a 0% interest rate.",
  },
];

export const membershipFeePioneerCardData = [
  {
    paragraph: "Installment payment is allowed until the fee is completed.",
  },
  {
    paragraph: "Vote and engage with the Co-op Network.",
  },
  {
    paragraph: "Invest in the Co-op Network business.",
  },
  {
    paragraph: "Early access to the first investment rounds.",
  },
  {
    paragraph: "Discounted Co-op Network products and services.",
  },
];

export const customerFeeExplorerCardData = [
  {
    paragraph: "Installment payment is allowed until the fee is completed.",
  },
  {
    paragraph: "Vote and engage with the Co-op Network.",
  },
  {
    paragraph: "Invest in the Co-op Network business.",
  },
];

export const Company = [
  {
    text: "Team",
    to: "/team",
  },
  {
    text: "About Us",
    to: "/about-us",
  },
];

export const Explore = [
  {
    text: "Why Chain Co-op",
    to: "/why-chain-co-op",
  },
  {
    text: "Partnership",
    to: "/partner-with-us",
  },
];

export const Legal = [
  {
    text: "Terms of service",
    to: "/terms",
  },
  {
    text: "Privacy Policy",
    to: "/privacy-policy",
  },
];
export const Contacts = [
  {
    text: "Let's build a better future together!",
  },
  {
    text: "Visit us at No. 9 Ogunlana Street, Ikosi.",
  },
  {
    text: "Ketu, Lagos, Nigeria.",
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
      "The website is operated by the Co-operative 'Chain Co-op', a legal entity registered with the Lagos State Ministry of Commerce, Industry, and Co-operatives, Alausa, Lagos, with its registered office at 9, Ogunlana Close, Alausa, Lagos. Chain Co-op provides an automated savings platform available on its website at chaincoop.org.",
  },
  {
    title: "2. Definitions",
    content: [
      {
        term: '"Privacy Policy"',
        definition:
          "means the regulations established on chaincoop.org/privacy-policy operated by Chain Co-op, as well as all documents referred to within them.",
      },
      {
        term: '"Applicable Law"',
        definition:
          "means any constitution, statute, law, rule, regulation, ordinance, judgment, order, decree of the Federal Republic of Nigeria, or any published directive, guideline, requirement, or other governmental restriction that has the force of law, whether in effect as of the date hereof or as of any date thereafter in the Federal Republic of Nigeria.",
      },
      {
        term: '"Client", "Customer", "You", "Your"',
        definition:
          "means a party using and utilizing our Services through our Platform.",
      },
      {
        term: '"Chain Co-op", "We", "Us", "Our"',
        definition:
          'means Chain Co-op and its successors, affiliates, and assignees. "Chain Co-op Account" means a Client or Customer\'s account with Chain Co-op for the Services we render.',
      },
      {
        term: '"Partner Program"',
        definition:
          "refers to contractual relationships entered into between Chain Co-op and third-party service providers to enhance or build on Chain Co-op's product offerings.",
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
        definition: "means these Terms of Use.",
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
      "Chain Co-op is a Co-operative that allows users to save money online and convert it into stable cryptocurrencies like USDT. Becoming a member requires completing the necessary procedures, such as the successful completion of the Know Your Customer (KYC) procedure, along with any other methods outlined in the governing documents of Chain Co-op.",
  },
  {
    title: "4. Purposes",
    content: [
      "Chain Co-op provides an online platform where users can save money automatically and convert it into cryptocurrencies. As our Client, we will use our best efforts and reasonable care to manage your savings.",
      "In order to operate and make available the Services and utilize the Platform, Chain Co-op collects, uses, and discloses certain personal information about you. We collect, use, disclose, and protect that information as described in our Privacy Policy, which is hereby incorporated into these Terms of Use.",
      "Please read the Privacy Policy carefully before accessing the Platform or using the Services.",
      "References to 'You' or 'Your' are references to any person accessing or using the Platform and/or Services by any means. Chain Co-op provides an online platform where users can save money and convert it into cryptocurrencies.",
      "The Co-operative is governed using blockchain technology, ensuring transparency, security, and efficient management of member funds.",
    ],
  },
  {
    title: "5. Obligations",
    sections: [
      {
        title: "5.1 Eligibility",
        content:
          "Access to the Chain Co-op Platform and Services is strictly limited to:",
        list: [
          "Individuals possessing a valid Bank Verification Number (BVN);",
          "Nigerian citizens or legal residents;",
          "Businesses or entities duly registered and incorporated in Nigeria.",
        ],
        footer:
          "Use of the Platform or Services by any party not meeting these criteria is unauthorized and constitutes a violation of these Terms of Service.",
      },
      {
        title: "5.2 Your Access",
        content: [
          "To access certain features of our Platform, you must register and create an account ('Member Account'). During registration, you will be required to set a password, which must be provided to access your account.",
          "Chain Co-op maintains robust security measures compliant with legal standards to protect your personal information (refer to our Privacy Policy). You are responsible for safeguarding your password and other account details. You must not share your password with anyone, and you must notify Chain Co-op immediately if your password is compromised or if you suspect unauthorized use of your account.",
          "As a Member, you are solely responsible for all activities conducted through your Chain Co-op account. Chain Co-op will act on instructions received under your account, which will be considered duly authorized by you.",
          "You must ensure that all information provided during account registration is accurate, complete, and kept up-to-date.",
          "If you are interested in developing enhancements or extensions to the Services, such activity must proceed through our API as part of the Partner Program, which requires meeting specific eligibility criteria and a formal partnership agreement.",
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
          "Chain Co-op and its employees, consultants, or agents will maintain the confidentiality of all non-public information and documents obtained while providing Services.",
          "Confidential information will not be disclosed to third parties except as required by law or as necessary for legal advice.",
          "This confidentiality obligation persists beyond the termination of these Terms.",
        ],
      },
    ],
  },
  {
    title: "6. User Responsibilities",
    content: [
      "Chain Co-op provides an online platform where users can save automatically and convert it to cryptocurrencies. As our Client, we will use our best efforts and reasonable care to manage your savings.",
      "In order to operate and make available the Services and utilize the Platform, Chain Co-op collects, uses, and discloses certain personal information about you. We collect, use, disclose, and protect that information as described in our Privacy Policy, which is hereby incorporated into these Terms of Use.",
      "Chain Co-op reserves the right to modify these Terms as necessary, in accordance with applicable laws and prevailing market conditions.",
      "Please read the Privacy Policy carefully before accessing the Platform or using the Services.",
      "References to 'You' or 'Your' are references to any person accessing or using the Platform and/or Services by any means. Chain Co-op provides an online platform where users can save money and convert it into cryptocurrencies.",
      "The Co-operative is governed by using blockchain technology, ensuring transparency, security, and efficient management of member funds.",
    ],
  },
  {
    title: "7. Savings Terms and Conditions",
    content: [
      "By utilizing our Services and Platform, you acknowledge and accept the following terms:",
      "The duration and commission rates of each savings plan on our Platform are specified within the plan details.",
      "Chain Co-op reserves the right to modify these terms as necessary, in accordance with applicable laws and prevailing market conditions.",
      "Chain Co-op may modify, without prior notice, the lock periods and commission rates of any savings plan.",
      "By agreeing to these terms, you release Chain Co-op and its directors, officers, employees, agents, successors, and assigns from all liabilities, losses, claims, damages, costs, and expenses, including reasonable attorney fees, that could arise from these changes.",
    ],
  },
  {
    title: "8. Fee Payment",
    content: [
      "By utilizing our Services, you authorize Chain Co-op to automatically deduct any applicable fees directly from your Chain Co-op account (referred to as 'Account Fees').",
      "Fee payments will typically be drawn first from liquid assets in your account, followed by the liquidation of cash equivalents, and, if necessary, by selling securities held in your account.",
      "By maintaining your account with us, you continuously reaffirm your consent for Chain Co-op to deduct these Account Fees as described.",
    ],
  },
  {
    title: "9. Other Fees",
    content: [
      "You acknowledge that using Chain Co-op's Services may result in fees imposed by third-party financial institutions.",
      "These additional costs can include bank transfer fees, transfer taxes, and other similar expenses.",
      "Please be aware that these fees are not covered by the fees you pay to Chain Co-op.",
    ],
  },
  {
    title: "10. Anti-Money Laundering",
    content: [
      "You affirm and guarantee the following, and you agree to notify Chain Co-op promptly if any of these assurances no longer hold:",
      "To the best of your knowledge, after conducting thorough inquiries, no funds or assets under Chain Co-op management have been or will be derived from or involved in any illegal activities violating applicable laws.",
      "Your contributions or payments to Chain Co-op will not cause the Co-operative to breach applicable laws.",
    ],
  },
  {
    title: "11. Intellectual Property",
    content: [
      "All materials, including text, images, logos, products, and services available on the Site and App, are owned by Chain Co-op or licensed.",
      "Any unauthorized use, reproduction, or distribution is prohibited.",
    ],
  },
  {
    title: "12. Amendments to Terms and Conditions",
    content: [
      "Chain Co-op reserves the right to modify these Terms and Conditions at any time, without prior notice.",
      "Updated versions will be posted on the Site. The latest version will include the date of the last update, allowing users to check for any changes.",
    ],
  },
  {
    title: "13. Privacy and Data Protection",
    content: [
      "By using the Site, you agree to our Privacy Policy and Cookie Policy, which outline how your data is collected, stored, and used.",
      "These documents are part of the overall Terms and Conditions.",
    ],
  },
  {
    title: "14. International Use",
    content: [
      "Chain Co-op is exclusively available within the borders of the Federal Republic of Nigeria.",
      "We do not claim that Chain Co-op is suitable or available outside of Nigeria.",
      "Additionally, we do not guarantee that accessing Chain Co-op from territories outside Nigeria complies with applicable laws.",
      "If you use Chain Co-op from outside Nigeria, you do so at your own risk and must ensure compliance with the laws of your location.",
    ],
  },
  {
    title: "15. Liability",
    content: [
      "Chain Co-op is exclusively available within the borders of the Federal Republic of Nigeria. We do not claim that Chain Co-op is suitable or available outside of Nigeria. Additionally, we do not guarantee that accessing Chain Co-op from territories outside Nigeria complies with applicable laws. If you use Chain Co-op from outside Nigeria, you do so at your own risk and must ensure compliance with the laws of your location.",
    ],
  },
  {
    title: "16. Termination of Membership",
    content: [
      "Chain Co-op reserves the right to suspend or terminate any user account for failure to comply with these Terms and Conditions.",
    ],
  },
];

export const PrivacyData = [
  {
    title: "1. Introduction",
    content: [
      "Welcome to Chain Co-op. This Privacy Policy ('Policy') explains how we collect, use, share, and protect your personal data when you access and use our services. We understand the importance of privacy and are committed to safeguarding the personal information you entrust to us. This policy applies to all users of Chain Co-op's website and other digital platforms (collectively, the 'Services').",
      "By using our Services, you agree to the collection and use of your information as described in this Policy. We may update this Policy from time to time to reflect changes in our practices or legal obligations. When we update the Policy, we will revise the date at the top and notify you accordingly, including through our website or via email, where appropriate.",
    ],
  },
  {
    title: "2. Consent",
    content: [
      "By accessing and using our Services, you acknowledge and accept the terms of this Privacy Policy. If you provide us with any personal data, you consent to our processing and use of that data in accordance with the terms of this Policy. You have the right to withdraw your consent at any time, although doing so may limit your ability to fully use some aspects of our Services.",
    ],
  },
  {
    title: "3. Information We Collect",
    content:
      "At Chain Co-op, we collect various types of personal data to ensure the smooth and secure operation of our platform. This data is divided into two main categories: information you provide directly and information we collect automatically.",
    sections: [
      {
        title: "3.1 Information You Provide",
        content:
          "When you interact with our platform, such as by creating an account, making a transaction, or contacting customer support, we may collect the following information:",
        list: [
          "Account Details: Name, email address, phone number, residential address, date of birth, and any other information you provide when creating your Chain Co-op account.",
          "Payment Information: Bank account details, cryptocurrency wallet addresses, payment history, and transaction records.",
          "Profile Information: This may include personal preferences, interests, and other details you choose to share with us to improve your experience.",
          "Communication Data: Information you provide when you contact us through email, support requests, or feedback forms, such as your queries, complaints, and requests for assistance.",
        ],
      },
      {
        title: "3.2 Information From Transactions",
        content:
          "As you use Chain Co-op's services, particularly in relation to crypto saving, trading, or borrowing, we collect transaction-related data, including:",
        list: [
          "Transaction Details: The amount, type of asset (BTC, ETH, stablecoins, etc.), and transaction history.",
          "Transaction Metadata: Time, date, merchant or partner details, and any notes or memos attached to a transaction.",
        ],
      },
      {
        title: "3.3 Automatically Collected Information",
        content: "We may collect data automatically when you use our platform:",
        list: [
          "Device and Usage Data: Information about the device you're using, including hardware model, operating system version, browser type, and the pages you visit. We also collect information about how you interact with our website or mobile apps, such as session time, navigation patterns, and search queries.",
          "IP Address: We log your IP address to help identify your device, prevent fraud, and improve platform performance.",
          "Cookies and Tracking Technologies: We use cookies and similar technologies (like pixels and web beacons) to collect information on how you use our platform. This data helps us personalize your experience, analyze traffic, and improve the platform's performance. For more information on how to manage cookies, refer to the 'Your Choices' section.",
        ],
      },
      {
        title: "3.4 Third-Party Information",
        content:
          "To verify your identity and enhance security, we may receive personal data from third-party service providers:",
        list: [
          "Verification and Fraud Prevention: We work with third-party services that help us verify your identity (e.g., identity verification services, credit bureaus) and prevent fraud.",
          "Partner Data: We may receive data from our business partners (e.g., banks, crypto exchanges) to facilitate your transactions and ensure smooth processing of services.",
        ],
      },
    ],
  },
  {
    title: "4. How We Use Your Information",
    sections: [
      {
        title: "4.1 Service Delivery and Improvement",
        list: [
          "Account Management: To create, maintain, and manage your Chain Co-op account.",
          "Transaction Processing: To process and confirm your transactions, both financial and non-financial (such as crypto savings or loan requests).",
          "Platform Improvement: To enhance our Services, such as optimizing website functionality, improving user experience, and adding new features.",
        ],
      },
      {
        title: "4.2 Communication",
        list: [
          "Account-related Messages: To send you important updates related to your account, such as confirmations, security alerts, and support communications.",
          "Promotions and News: With your consent, to send you promotional messages about new services, features, offers, or events that may interest you.",
          "Customer Support: To respond to your queries and provide customer support via email, chat, or other communication channels.",
        ],
      },
      {
        title: "4.3 Legal Compliance and Security",
        list: [
          "Fraud Prevention and Compliance: To comply with regulatory requirements, prevent fraud, and protect our platform and users.",
          "Data Protection: To safeguard the personal data we collect and ensure it is used in compliance with data protection laws and regulations.",
        ],
      },
    ],
  },
  {
    title: "5. Information Sharing",
    sections: [
      {
        title: "5.1 Service Providers",
        content:
          "We work with trusted third-party service providers to deliver our Services, such as payment processors, hosting services, and customer support tools. These providers only have access to your information as necessary to perform their services.",
      },
      {
        title: "5.2 Legal and Regulatory Obligations",
        content: "We may disclose your personal data in response to:",
        list: [
          "Legal requests, such as subpoenas or court orders.",
          "Compliance with financial regulations or anti-money laundering laws.",
          "Protecting the rights, property, or safety of Chain Co-op, its users, or the public.",
        ],
      },
      {
        title: "5.3 Business Transfers",
        content:
          "In the event of a merger, acquisition, or sale of assets, your personal data may be transferred to the acquiring party, but we will notify you before this happens.",
      },
      {
        title: "5.4 Aggregated or Anonymized Data",
        content:
          "We may share aggregated or de-identified data with third parties for research, analysis, or marketing purposes. This data cannot reasonably be used to identify you.",
      },
    ],
  },
  {
    title: "6. Security Measures",
    content:
      "At Chain Co-op, we prioritize the security of your personal information. We implement various technical, physical, and administrative safeguards, including:",
    list: [
      "Data Encryption: Sensitive data, such as payment information and transaction details, is encrypted during transmission and storage.",
      "Access Control: We limit access to your personal data to authorized personnel who require it for legitimate business purposes.",
      "Regular Audits: We regularly conduct internal audits to monitor our security systems and ensure compliance with industry standards.",
    ],
    footer:
      "Despite these efforts, no security measure is entirely foolproof. While we take all reasonable steps to protect your data, we cannot guarantee the absolute security of your information.",
  },
  {
    title: "7. Your Rights",
    content:
      "Under applicable data protection laws, you have several rights regarding your personal information:",
    sections: [
      {
        title: "7.1 Access and Correction",
        content:
          "You have the right to access the personal data we hold about you and request corrections to any inaccurate or incomplete data.",
      },
      {
        title: "7.2 Deletion",
        content:
          "You can request the deletion of your personal data, subject to our legal obligations and business requirements.",
      },
      {
        title: "7.3 Withdrawal of Consent",
        content:
          "You may withdraw your consent for us to process your data at any time. However, this may affect your ability to use some of our Services.",
      },
      {
        title: "7.4 Data Portability",
        content:
          "You have the right to receive your data in a structured, commonly used, and machine-readable format, and to transfer it to another service provider.",
      },
      {
        title: "7.5 Complaints",
        content:
          "If you believe your data has been mishandled, you have the right to lodge a complaint with the relevant data protection authority.",
      },
    ],
  },
  {
    title: "8. Data Retention",
    content: [
      "We retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law. Once your data is no longer needed, we securely delete or anonymize it.",
    ],
  },
  {
    title: "9. International Data Transfers",
    content: [
      "Personal data may be transferred to and stored in locations outside your country of residence, including countries that may not have the same level of data protection laws. In such cases, we ensure that appropriate safeguards are in place to protect your data, as required by applicable laws.",
    ],
  },
  {
    title: "10. Cookies and Tracking Technologies",
    content: [
      "We use cookies and similar technologies to enhance our services and improve your experience. You can manage your cookie preferences through your browser settings, but please note that blocking cookies may impact the functionality of our services.",
    ],
  },
  {
    title: "11. Changes to This Policy",
    content: [
      "We reserve the right to update or change this Privacy Policy at any time. Any changes will be posted on this page, and the updated date will be reflected at the top of the document. We encourage you to review this policy periodically to stay informed about how we protect your data.",
    ],
  },
  {
    title: "12. Contact Us",
    content: [
      "If you have any questions or concerns about this Privacy Policy or how we handle your personal data, please contact us.",
      "Email: info@chainco-op.com",
      "Address: 9 Ogunlana Street, Oregun, Alausa, Lagos",
      "Phone Number: +234 809 322 7696",
      "We are committed to ensuring your privacy is respected and protected.",
    ],
  },
];

export const teamMembers = [
  {
    id: 1,
    name: "Oluwajuwon Ogunseye",
    role: "CCO/Data Engineer",
    image: juwon,
    description:
      "Oluwajuwon Ogunseye is a Data Engineer with 6+ years of fintech and blockchain experience. He focuses on co-operative and decentralized finance.",
    social: {
      twitter: "https://x.com/juwon_ogunseye?t=ZAuheRFCskhkB6NeNITdUA&s=09",
      linkedin:
        "https://www.linkedin.com/in/oluwajuwon-micheal?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  {
    id: 2,
    name: "AbdulSamad Gobir",
    role: "CMO/Product Manager",
    image: samad,
    description:
      "Founder of Jobhunters and co-founder of Automation Affairs Ltd., AbdulSamad is a versatile product and project manager. A former President of the Gemstones Toastmasters Club, he has contributed to over 200 applications and products with companies like Appcake and Routepay.",
    social: {
      twitter: "https://x.com/abdulsamad_ag",
      linkedin:
        "https://www.linkedin.com/in/abdulsamadgobir?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  {
    id: 3,
    name: "Yixuan Heather (李依轩) Li",
    role: "Advisor and Consultant",
    image: heather,
    description:
      "Heather Li is a seasoned entrepreneur and community builder with extensive experience in big data, AI, and public relations. She has held key roles as the General Manager of Big Data and AI Lab Nigeria and as a Venture Fellow at Dream VC. With a strong background in business strategy and community development, her expertise spans partnership building, business growth, and innovation. Heather is a passionate advocate for Africa's growth, dedicated to fostering connections and collaborations that drive impact and progress.",
    social: {
      twitter: "https://x.com/HeatherleePSU?t=d7stL0XIBrRafaWLbUYe1Q&s=09",
      linkedin:
        "https://www.linkedin.com/in/thedotconnector?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  {
    id: 4,
    name: "Taiwo Odunowo",
    role: "Financial Analyst",
    image: taiwo,
    description:
      "Taiwo Odunowo is currently the Head of Programs & Strategy at Bridging Horizons, leading high-impact initiatives and partnerships that engage the African diaspora in transformative development. At WTI, he serves as an Investment Analyst, working with the investment team on due diligence, deal analysis, investment calculations, data analysis, market research, and contributing to investment decisions. An alum of Stanford University, he combines a strong foundation in finance and strategy with a passion for global impact.",
    social: {
      linkedin: "http://www.linkedin.com/in/taiwo-o-odunowo",
    },
  },
  {
    id: 5,
    name: "Oluwasegun Awoyinfa",
    role: "Lawyer",
    image: awoyinfa,
    description:
      "Strategic Legal Professional with over 7 years of experience specializing in Corporate Law, project management, and venture support for startups in the finance and technology sectors. Adept at providing legal advisory, ensuring compliance with international regulations, and optimizing operations for fintech and decentralized ventures. Skilled in drafting legal documentation, managing KYC-AML processes, conducting due diligence, and fostering cross-functional collaboration to drive business growth. Business-minded with a passion for blockchain, DeFi, artificial intelligence, and emerging technologies.",
    social: {
      // twitter: "https://x.com/RebeccaAsseh",
      linkedin: "https://www.linkedin.com/in/awoyinfa/",
    },
  },
  {
    id: 6,
    name: "Rebecca Asseh",
    role: "Content Marketer",
    image: rebecca,
    description:
      "Rebecca Asseh is a Blockchain Content Marketer, crypto educator, and board member of Black Women in Blockchain Council. She works on simplifying blockchain for end-users.",
    social: {
      twitter: "https://x.com/RebeccaAsseh",
      linkedin: "https://www.linkedin.com/in/rebeccaasseh/",
    },
  },
  {
    id: 7,
    name: "Tshegofatso Seane",
    role: "Backend Developer",
    image: seane,
    description:
      "Software Engineer | Backend developer with 5+ years of experience in Python, Node.js, AWS & databases. Built scalable APIs, optimized backend systems & automated CI/CD pipelines",
    social: {
      twitter: "https://x.com/the_tshegoseane",
      linkedin: "https://www.linkedin.com/in/tshegofatsoseane/",
    },
  },
  {
    id: 8,
    name: "Kalu Iwere Eyitemi",
    role: "UI/UX Designer",
    image: temi,
    description:
      "Eyitemi is a  skilled product designer with over 3+years experience. She has also volunteered as a designer for Justproject. Holding a UX design degree from Coursera and Ingressive for Good, her expertise spans user research, visual design, interaction design, Figma, prototyping, and motion design Eyitemi is a strong communicator and collaborator, dedicated to creating innovative and impactful products that improve people's lives.",
    social: {
      linkedin:
        "https://www.linkedin.com/in/eyitemi-onorume-849a50211?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
];
