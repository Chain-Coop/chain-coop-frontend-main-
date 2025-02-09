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
import temi from "../Assets/png/footer/team/png/image1.png";
import juwon from "../Assets/png/home/juwon.png";
import samad from "../Assets/png/home/abdulSamad.png";
import rebecca from "../Assets/png/home/rebecca.png";

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
      "Build a culture of Saving and join others in building communal wealth by saving in naira.",
  },

  {
    title: "Stay safe from inflation with USDT, USDC, LISK etc.",
    paragraph:
      "Beat inflation by saving in stable coins and other Cryptos. Automate your savings from Naira to Crypo.",
  },
  {
    title: "Save A % of your Naira to Crypto",
    paragraph:
      "Choose what portion of your savings you want to be converted into Crypto.",
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
    paragraph: "Vote & get involved in the Co-op Network",
  },
  {
    paragraph: "Invest in the Co-op Network business",
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
    paragraph: "Vote & get involved in the Co-op Network",
  },
  {
    paragraph: "Invest in the Co-op Network business",
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
    paragraph: "Vote & get involved in the Co-op Network",
  },
  {
    paragraph: "Invest in the Co-op Network business",
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
    paragraph: "Vote and engage with the Co-op network",
  },
  {
    paragraph: "Invest in the Co-op network business",
  },
  {
    paragraph: "Early access to the first investment rounds",
  },
  {
    paragraph: "Discounted the Co-op network product and services",
  },
];

export const CustomerFeeExplorerCardData = [
  {
    paragraph: "Installmentall payment is allowed till fee is completed",
  },
  {
    paragraph: "Vote and engage with the Co-op network",
  },
  {
    paragraph: "Invest in the Co-op network business",
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
      "The website is operated by the Co-operative 'Chain Co-op', a legal entity registered with the Lagos State Ministry of Commerce, Industry, and Co-operatives, Alausa, lagos with its registered office at 9, Ogunlana close, Alausa, Lagos. Chain Co-op provides an automated savings platform available on its website at chainCo-op.org.",
  },
  {
    title: "2. Definitions",
    content: [
      {
        term: '"Privacy policy"',
        definition:
          "means the regulations established on the page (https://chainCo-op.org/privacy-policy) operated by Chain Co-op, as well as all documents referred to within them.",
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
      "Chain Co-op is a Co-operative that allows users to save money online and convert it into stable cryptocurrencies like USDT. Becoming a member requires completing the necessary procedures, such as the successful completion of the Know Your Customer (KYC) procedure, along with any other methods outlined in the governing documents of Chain Co-op.",
  },
  {
    title: "4. Purposes",
    content: [
      "Chain Co-op provides an online platform where users can save money automatically and convert it into cryptocurrencies. As our Client, we will use our best efforts and reasonable care to manage your savings.",
      "In order to operate and make available the services and utilise the platform, Chain Co-op collects, uses and discloses certain personal information about you. We collect, use, disclose and protect that information as described in our privacy policy, which is hereby incorporated into these Terms of Use.",
      "Please read the privacy policy carefully before accessing the Platform or using the Services.",
      "References to 'you' or 'your' are references to any person accessing or using the Platform and/or Services by any means. Chain Co-op provides an online platform where users can save money and convert it into cryptocurrencies.",
      "The Co-operative is governed using blockchain technology, ensuring transparency, security, and efficient management of member funds.",
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
    title: "6. User Responsibilities",
    content: [
      "Chain Co-op of provides an online platform where users can save automatically and convert it to cryptocurrences. As our client We will use our best efforts and reasonable care to manage your savings.",
      "In order to operate and make available the services and utilise the platform Chain Co-op collect uses and discloses certain personal information About you, we collect, use, disclose and protect that information as described in our privacy policy and which is hereby incorporated into these terms of use.",
      "Chain Co-op reserves the right to modify these terms as necessary, in accordance with applicable laws and prevailing market conditions.",
      "Please read the privacy policy carefully before accessing the platform or using the services.",
      "Refrences to you or your are refrences to any person Accessing or using the platform and/all services by any means Chain Co-op Provide an online platform where users can save money and convert into cryptocurrencies",
      "The cooperative is governed by using blockchain technology, ensuring transparency, security and efficient management of members funds",
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
      "You acknowledge that using Chain Co-op's services may result in fees imposed by third-party financial institutions.",
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
      "Chain Co-op is Exclusively available within the borders of Federal Republic of Nigeria. We do not claim that Chain-Co-op is suitable or available outside of Nigeria. Additionally, we do not guarantee that accessing chain code from territory Nigeria complies with applicable laws. If you use change from outside Nigeria you do not you do so at your own risk and must ensure compliance with the laws of your location",
    ],
  },
  {
    title: "16. Termination of Membership",
    content: [
      "Chain Co-op reserves the right to suspend or terminate any user account sor failure to comply with these Terms and Conditions",
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
          "Cookies and Tracking Technologies: We use cookies and similar technologies (like pixels and web beacons) to collect information on how you use our platform. This data helps us personalize your experience, analyse traffic, and improve the platform's performance. For more information on how to manage cookies, refer to the 'Your Choices' section.",
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
          "If you believe your data has been mishandled, you have the right to lodge a complaint with the relevant data protection authority authorities",
      },
    ],
  },
  {
    title: "8. Data Retention",
    content: [
      "We retain your personal data for as long as necessaryto fulfill the proposed outlined in this privacy policy or as required by law. Once your data is no longer needed. we securely delete to annonymize it.",
    ],
  },
  {
    title: "9. International Data Transfers",
    content: [
      "Personal data may be transferred to and stored in locations outside your country of residence Including countries that may not have the Same level of data protection laws. In such cases, we ensure that appropriate safeguards are in place to protect your data, as required by applicable laws.",
    ],
  },
  {
    title: "10. Cookies and Tracking Technologies",
    content: [
      "Our services and improve your experience. You can manage your cookie preferences through your browser settings but Please note that blocking cookies may impact the functionality of our services.",
    ],
  },
  {
    title: "11. Changes to This Policy",
    content: [
      "We reserve the right to update or change this privacy policy at any time.Any changes will be posted on this page and updated dates will be reflected at the top of the document.We encourage you to review this policy periodically to stay informed about how we protect your data.The last one",
    ],
  },
  {
    title: "12. Contact Us",
    content: [
      "If you have any questions or concerns about this privacy policy or how we handle your personal data please contact us.",
      "Email: info@chainCo-opeartive.com",
      "Address: 9 Ogulana street, Oregun Alausa",
      "Phone number +234 809 322 7696",
      "We are commited to ensuring your privacy is respected and protected.",
    ],
  },
];

export const teamMembers = [
  {
    id: 1,
    name: "Olawajuwon Ogunseye",
    role: "Data Engineer/CCO",
    image: juwon,
    description:
      "Olawajuwon Ogunseye is a Data Engineer with 6+ years fintech and blockchain experience. He is focusing on Co-operative and decentralized finance.",
    social: {
      twitter: "https://x.com/juwon_ogunseye?t=ZAuheRFCskhkB6NeNITdUA&s=09",
      linkedin:
        "https://www.linkedin.com/in/oluwajuwon-micheal?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  {
    id: 2,
    name: "Rebecca Asseh",
    role: "Content Marketer",
    image: rebecca,
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
    image: samad,
    description:
      "Founder of jobhunteters and co-founder of Automation Affairs Ltd. a versatile product and project manager. A former Presidient of the gemstones Toast masters Club with contributions of over 200 applictaions and product with companies like Appcake and Routepay.G",
    social: {
      twitter: "#",
      linkedin:
        "https://www.linkedin.com/in/abdulsamadgobir?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  {
    id: 4,
    name: "Kalu Iwere Eyitemi",
    role: "Content Marketer",
    image: temi,
    description:
      "Eyitemi is a Product designer with over 3+years of experience.",
    social: {
      twitter: "https://x.com/IEyitemi?t=bY1T63NaxbAtd0nJbLRLIQ&s=08",
      linkedin: "#",
    },
  },
];
