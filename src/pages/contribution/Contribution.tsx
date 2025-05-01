// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import contributionImg from "../../Assets/svg/dashboard/contribution/category-contribution.svg";
// import { motion } from "framer-motion";
// import {
//   IoIosArrowBack,
//   IoIosArrowForward,
//   IoIosArrowDown,
// } from "react-icons/io";
// import { Button, Typography } from "@material-tailwind/react";
// import { Check } from "lucide-react";
// import { useContributionBalance } from "../../shared/Hooks/useBalance";
// import { ROUTES } from "../../shared/routes";
// import { useUserContributionHistory } from "../../shared/Hooks/useUserProfile";
// import { SavingsPlan } from "../../components/dashboard/contribution/modals/SavingsPlan";
// import ToggleButton from "../../shared/utils/ToggleButton";
// import { DashboardHeader } from "../../components/common/DashboardHeader";
// import { ContributionListSkeleton } from "../../components/common/Loading";
// import { Flexibile, Lock, StrictLocak } from "../../Assets/svg";
// import FormInput from "../../components/common/FormInput";

// type Contribution = {
//   _id: string;
//   contributionId?: string;
//   savingsCategory: string;
//   balance: number;
//   contributionPlan?: string;
//   startDate?: string;
//   nextContributionDate?: string;
//   amount?: number;
// };

// const Contribution: React.FC = () => {
//   const navigate = useNavigate();
//   const { formattedBalance, isLoading: isBalanceLoading } =
//     useContributionBalance();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [savingsType, setSavingsType] = useState<"naira" | "crypto">("naira");
//   const [page, setPage] = useState(1);
//   const [contributionType, setContributionType] = useState<
//     "auto" | "one-time" | null
//   >(null);
//   const [hoveredSavingsType, setHoveredSavingsType] = useState<string | null>(
//     null,
//   );
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const limit = 10;

//   const {
//     getContributions,
//     isLoading: isContributionsLoading,
//     error,
//   } = useUserContributionHistory(page, limit, searchTerm);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//     setPage(1);
//   };

//   const [isContributionVisible, setIsContributionVisible] = useState(() => {
//     const storedVisibility = sessionStorage.getItem(
//       "contributionBalanceVisible",
//     );
//     return storedVisibility !== null ? storedVisibility === "true" : true;
//   });

//   const totalPages = getContributions?.totalPages || 1;
//   const currentPage = parseInt(getContributions?.currentPage || "1");
//   const contributions = getContributions?.contributions || [];

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setPage(currentPage + 1);
//     }
//   };

//   const navigateToContributionDetails = (contributionId: string) => {
//     if (!contributionId) return;
//     navigate(`/dashboard/contribution/contribution_details`, {
//       state: { contributionId },
//     });
//   };

//   const handleSavingsTypeChange = (type: "naira" | "crypto") => {
//     setSavingsType(type);
//     if (type === "crypto") {
//       navigate("/dashboard/contribution/main/crypto_contribution");
//     }
//     setIsModalOpen(false);
//   };

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   const formatCurrency = (amount: number) => {
//     if (!amount && amount !== 0) return "₦ 0";
//     return `₦ ${amount.toLocaleString()}`;
//   };

//   const handleContributionTypeChange = (type: "auto" | "one-time") => {
//     setContributionType(type);
//     if (type === "one-time") {
//       navigate(ROUTES.oneTimeContributionType, {
//         state: { contributionType: "one-time" },
//       });
//     }
//   };

//   return (
//     <motion.main
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="mb-2 min-h-screen w-full"
//     >
//       <DashboardHeader className="flex items-center justify-center text-2xl  md:text-3xl lg:mt-[2em] lg:text-xl">
//         Contribution Plan
//       </DashboardHeader>

//       <main>
//         <section className="mt-6 w-full md:mt-8 lg:mt-10">
//           <article className="text-center text-gray-700">
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="rounded-3xl border-[2px] border-gray-200 bg-white p-6 shadow-md"
//             >
//               <div className="mb-4 flex justify-end">
//                 <Button
//                   onClick={toggleModal}
//                   className="text-md flex transform  items-center gap-2 rounded-lg border-[3px] border-gray-200 bg-[#E3D9E6] py-2 font-semibold normal-case text-text2 transition-all duration-300 hover:scale-105
//                   active:scale-95"
//                 >
//                   Naira Savings
//                   <IoIosArrowDown />
//                 </Button>
//               </div>
//               <div className="flex items-center justify-center gap-4 ">
//                 <Typography
//                   variant="small"
//                   className="text-sm font-medium tracking-tight md:text-base"
//                 >
//                   Total Contribution Balance
//                 </Typography>
//                 <ToggleButton
//                   isVisible={isContributionVisible}
//                   onToggle={(newVisibility) => {
//                     setIsContributionVisible(newVisibility);
//                     sessionStorage.setItem(
//                       "contributionBalanceVisible",
//                       newVisibility.toString(),
//                     );
//                   }}
//                 />
//               </div>

//               <div className="mx-auto mt-[1.5em] w-[15em] rounded-md">
//                 {isBalanceLoading ? (
//                   <div className="h-8 animate-pulse rounded bg-gray-200"></div>
//                 ) : isContributionVisible ? (
//                   <Typography className="text-xl font-bold lg:text-xl">
//                     {formattedBalance}
//                   </Typography>
//                 ) : (
//                   <Typography className="text-2xl font-bold">
//                     *********
//                   </Typography>
//                 )}
//                 <hr className="mt-[1em] h-[1px] rounded-md bg-howtext" />
//               </div>
//             </motion.div>

//             <section className="py-8">
//               <div className="flex justify-between">
//                 <Button
//                   variant="text"
//                   onClick={() => handleContributionTypeChange("auto")}
//                   className={`flex w-fit items-center px-2 py-3 text-center normal-case transition-all duration-300 ${
//                     contributionType === "auto"
//                       ? "bg-text2 text-white hover:bg-text2"
//                       : "border border-gray-500 bg-inherit text-black hover:shadow-lg"
//                   }`}
//                 >
//                   {contributionType === "auto" && (
//                     <Check className="text-white" />
//                   )}{" "}
//                   <Typography
//                     className={`text-sm font-semibold ${
//                       contributionType === "auto" ? "text-white" : "text-black"
//                     }`}
//                   >
//                     Auto Savings
//                   </Typography>
//                 </Button>

//                 <Button
//                   variant="text"
//                   onClick={() => handleContributionTypeChange("one-time")}
//                   className={`flex w-fit items-center px-2 py-3 text-center normal-case transition-all duration-300 hover:shadow-lg sm:px-3 md:px-3.5 lg:px-4 xl:px-5 ${
//                     contributionType === "one-time"
//                       ? "bg-text2 text-white"
//                       : "border border-gray-500 bg-inherit text-black"
//                   }`}
//                 >
//                   <Typography
//                     className={`text-sm font-semibold ${
//                       contributionType === "one-time"
//                         ? "text-white"
//                         : "text-black"
//                     }`}
//                   >
//                     One-Time Savings
//                   </Typography>
//                 </Button>
//               </div>
//             </section>

//             {contributionType === "auto" && (
//               <section className="mb-8">
//                 <Typography className="mb-4 text-left font-medium">
//                   Choose savings type
//                 </Typography>

//                 <div className="flex flex-col gap-4">
//                   <Link
//                     to={ROUTES.flexibleContributionType}
//                     state={{
//                       savingsType: "Flexible",
//                       contributionType: "auto",
//                     }}
//                     className="w-full"
//                   >
//                     <motion.div
//                       whileHover={{ scale: 1.01 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="flex items-center justify-between rounded-lg border border-gray-400 bg-white p-4 shadow-md transition-all"
//                       onMouseEnter={() => setHoveredSavingsType("Flexible")}
//                       onMouseLeave={() => setHoveredSavingsType(null)}
//                     >
//                       <Flexibile />
//                       <Typography className="text-lg font-medium text-gray-800">
//                         Flexible Savings
//                       </Typography>
//                       <div
//                         className={`rounded border border-text2 px-8 py-2 text-sm font-medium
//                         transition-all duration-300 ease-in-out
//                         ${hoveredSavingsType === "Flexible" ? "scale-105 transform bg-text2 text-white shadow-md" : ""}
//                       `}
//                       >
//                         Select
//                       </div>
//                     </motion.div>
//                   </Link>

//                   <Link
//                     to={ROUTES.lockContributionType}
//                     state={{ savingsType: "Lock", contributionType: "auto" }}
//                     className="w-full"
//                   >
//                     <motion.div
//                       whileHover={{ scale: 1.01 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="flex items-center justify-between rounded-lg border border-gray-400 bg-white p-4 shadow-md transition-all"
//                       onMouseEnter={() => setHoveredSavingsType("Lock")}
//                       onMouseLeave={() => setHoveredSavingsType(null)}
//                     >
//                       <Lock />
//                       <Typography className="text-lg font-medium text-gray-800">
//                         Lock Savings
//                       </Typography>
//                       <div
//                         className={`rounded border border-text2 px-8 py-2 text-sm font-medium
//                         transition-all duration-300 ease-in-out
//                         ${hoveredSavingsType === "Lock" ? "scale-105 transform bg-text2 text-white shadow-md" : ""}
//                       `}
//                       >
//                         Select
//                       </div>
//                     </motion.div>
//                   </Link>

//                   <Link
//                     to={ROUTES.strictLockContributionType}
//                     state={{ savingsType: "Strict", contributionType: "auto" }}
//                     className="w-full"
//                   >
//                     <motion.div
//                       whileHover={{ scale: 1.01 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="flex items-center justify-between rounded-lg border border-gray-400 bg-white p-4 shadow-md transition-all"
//                       onMouseEnter={() => setHoveredSavingsType("Strict")}
//                       onMouseLeave={() => setHoveredSavingsType(null)}
//                     >
//                       <StrictLocak />
//                       <Typography className="text-lg font-medium text-gray-800">
//                         Strict Lock Savings
//                       </Typography>
//                       <div
//                         className={`rounded border  border-text2 px-8 py-2 text-sm font-medium
//         transition-all duration-300 ease-in-out
//         ${hoveredSavingsType === "Strict" ? "scale-105 transform bg-text2 text-white shadow-md" : ""}
//       `}
//                       >
//                         Select
//                       </div>
//                     </motion.div>
//                   </Link>
//                 </div>

//                 <hr className="mx-auto mt-8 w-full max-w-2xl" />
//               </section>
//             )}
//           </article>
//         </section>

//         <section className="mt-6 w-full md:mt-10">
//           <header className="flex items-center justify-between">
//             <Typography
//               variant="h1"
//               className="whitespace-nowrap text-xl font-bold tracking-tight md:text-2xl"
//             >
//               My Savings
//             </Typography>
//             <FormInput
//               placeholder="Search Contribution"
//               wrapperClassName="max-w-[400px]"
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//           </header>

//           {isContributionsLoading ? (
//             <ContributionListSkeleton />
//           ) : contributions?.length > 0 ? (
//             <div className="mb-3 mt-4 flex h-auto flex-col gap-4 rounded-lg bg-text2 p-4 text-center md:mt-6 md:p-6">
//               <div className="mb-3 flex items-center justify-between px-4">
//                 <span className="text-sm font-medium text-white md:text-base">
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <div className="flex gap-2 font-semibold">
//                   <button
//                     onClick={handlePrevPage}
//                     disabled={currentPage <= 1}
//                     className="rounded p-1 text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
//                   >
//                     <IoIosArrowBack size={20} />
//                   </button>
//                   <button
//                     onClick={handleNextPage}
//                     disabled={currentPage >= totalPages}
//                     className="rounded p-1 text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
//                   >
//                     <IoIosArrowForward size={20} />
//                   </button>
//                 </div>
//               </div>
//               <hr className="border-gray-500" />

//               {contributions.map((contribution: Contribution) => (
//                 <motion.div
//                   key={contribution._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   whileHover={{ scale: 1.02 }}
//                   onClick={() =>
//                     navigateToContributionDetails(contribution._id)
//                   }
//                   className="mx-auto flex w-full max-w-3xl cursor-pointer flex-col gap-2 rounded-full border-2 border-gray-500 bg-white px-4 transition-all hover:bg-gray-50 lg:px-6 "
//                 >
//                   <div className="flex justify-between text-sm font-medium text-gray-500 md:text-base">
//                     <Typography className="font-normal">
//                       Savings Name
//                     </Typography>
//                     <Typography className="font-normal">
//                       Savings Balance
//                     </Typography>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2 md:gap-3">
//                       <div className="w-8 md:w-10">
//                         <motion.img
//                           whileHover={{ rotate: 360 }}
//                           transition={{ duration: 0.5 }}
//                           src={contributionImg}
//                           alt="Contribution category icon"
//                           className="w-full"
//                         />
//                       </div>
//                       <Typography className="text-base font-semibold md:text-lg">
//                         {contribution?.savingsCategory}
//                       </Typography>
//                     </div>
//                     <div>
//                       <figure className="text-base font-semibold md:text-lg">
//                         {formatCurrency(contribution?.balance)}
//                       </figure>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="mt-4 flex h-[12em] w-full flex-col items-center justify-center gap-4 rounded-lg bg-text2 p-6 text-center md:mt-6 md:p-8"
//             >
//               <Typography
//                 variant="h2"
//                 className="text-xl font-bold text-how1 md:text-2xl"
//               >
//                 No Savings Yet
//               </Typography>
//             </motion.div>
//           )}
//         </section>
//       </main>

//       <SavingsPlan
//         open={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         savingsType={savingsType}
//         onSavingsTypeChange={handleSavingsTypeChange}
//       />
//     </motion.main>
//   );
// };

// export default Contribution;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import contributionImg from "../../Assets/svg/dashboard/contribution/category-contribution.svg";
import { motion } from "framer-motion";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import { Button, Typography, Select, Option } from "@material-tailwind/react";
import { Check, Filter } from "lucide-react";
import { useContributionBalance } from "../../shared/Hooks/useBalance";
import { ROUTES } from "../../shared/routes";
import { useUserContributionHistory } from "../../shared/Hooks/useUserProfile";
import { SavingsPlan } from "../../components/dashboard/contribution/modals/SavingsPlan";
import ToggleButton from "../../shared/utils/ToggleButton";
import { DashboardHeader } from "../../components/common/DashboardHeader";
import { ContributionListSkeleton } from "../../components/common/Loading";
import { Flexibile, Lock, StrictLocak } from "../../Assets/svg";
import FormInput from "../../components/common/FormInput";

type Contribution = {
  _id: string;
  contributionId?: string;
  savingsCategory: string;
  balance: number;
  contributionPlan?: string;
  startDate?: string;
  nextContributionDate?: string;
  amount?: number;
};

const Contribution: React.FC = () => {
  const navigate = useNavigate();
  const { formattedBalance, isLoading: isBalanceLoading } =
    useContributionBalance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savingsType, setSavingsType] = useState<"naira" | "crypto">("naira");
  const [page, setPage] = useState(1);
  const [contributionType, setContributionType] = useState<
    "auto" | "one-time" | null
  >(null);
  const [hoveredSavingsType, setHoveredSavingsType] = useState<string | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [filterType, setFilterType] = useState<string>("");
  const limit = 10;

  const {
    getContributions,
    isLoading: isContributionsLoading,
    error,
  } = useUserContributionHistory(
    page,
    limit,
    searchTerm,
    sortOrder,
    filterType,
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
    setPage(1);
  };

  const handleFilterChange = (value: string) => {
    setFilterType(value);
    setPage(1);
  };

  const [isContributionVisible, setIsContributionVisible] = useState(() => {
    const storedVisibility = sessionStorage.getItem(
      "contributionBalanceVisible",
    );
    return storedVisibility !== null ? storedVisibility === "true" : true;
  });

  const totalPages = getContributions?.totalPages || 1;
  const currentPage = parseInt(getContributions?.currentPage || "1");
  const contributions = getContributions?.contributions || [];

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  const navigateToContributionDetails = (contributionId: string) => {
    if (!contributionId) return;
    navigate(`/dashboard/contribution/contribution_details`, {
      state: { contributionId },
    });
  };

  const handleSavingsTypeChange = (type: "naira" | "crypto") => {
    setSavingsType(type);
    if (type === "crypto") {
      navigate("/dashboard/contribution/main/crypto_contribution");
    }
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const formatCurrency = (amount: number) => {
    if (!amount && amount !== 0) return "₦ 0";
    return `₦ ${amount.toLocaleString()}`;
  };

  const handleContributionTypeChange = (type: "auto" | "one-time") => {
    setContributionType(type);
    if (type === "one-time") {
      navigate(ROUTES.oneTimeContributionType, {
        state: { contributionType: "one-time" },
      });
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-2 min-h-screen w-full"
    >
      <DashboardHeader className="flex items-center justify-center text-2xl  md:text-3xl lg:mt-[2em] lg:text-xl">
        Contribution Plan
      </DashboardHeader>

      <main>
        <section className="mt-6 w-full md:mt-8 lg:mt-10">
          <article className="text-center text-gray-700">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border-[2px] border-gray-200 bg-white p-6 shadow-md"
            >
              <div className="mb-4 flex justify-end">
                <Button
                  onClick={toggleModal}
                  className="text-md flex transform  items-center gap-2 rounded-lg border-[3px] border-gray-200 bg-[#E3D9E6] py-2 font-semibold normal-case text-text2 transition-all duration-300 hover:scale-105
                  active:scale-95"
                >
                  Naira Savings
                  <IoIosArrowDown />
                </Button>
              </div>
              <div className="flex items-center justify-center gap-4 ">
                <Typography
                  variant="small"
                  className="text-sm font-medium tracking-tight md:text-base"
                >
                  Total Contribution Balance
                </Typography>
                <ToggleButton
                  isVisible={isContributionVisible}
                  onToggle={(newVisibility) => {
                    setIsContributionVisible(newVisibility);
                    sessionStorage.setItem(
                      "contributionBalanceVisible",
                      newVisibility.toString(),
                    );
                  }}
                />
              </div>

              <div className="mx-auto mt-[1.5em] w-[15em] rounded-md">
                {isBalanceLoading ? (
                  <div className="h-8 animate-pulse rounded bg-gray-200"></div>
                ) : isContributionVisible ? (
                  <Typography className="text-xl font-bold lg:text-xl">
                    {formattedBalance}
                  </Typography>
                ) : (
                  <Typography className="text-2xl font-bold">
                    *********
                  </Typography>
                )}
                <hr className="mt-[1em] h-[1px] rounded-md bg-howtext" />
              </div>
            </motion.div>

            <section className="py-8">
              <div className="flex justify-between">
                <Button
                  variant="text"
                  onClick={() => handleContributionTypeChange("auto")}
                  className={`flex w-fit items-center px-2 py-3 text-center normal-case transition-all duration-300 ${
                    contributionType === "auto"
                      ? "bg-text2 text-white hover:bg-text2"
                      : "border border-gray-500 bg-inherit text-black hover:shadow-lg"
                  }`}
                >
                  {contributionType === "auto" && (
                    <Check className="text-white" />
                  )}{" "}
                  <Typography
                    className={`text-sm font-semibold ${
                      contributionType === "auto" ? "text-white" : "text-black"
                    }`}
                  >
                    Auto Savings
                  </Typography>
                </Button>

                <Button
                  variant="text"
                  onClick={() => handleContributionTypeChange("one-time")}
                  className={`flex w-fit items-center px-2 py-3 text-center normal-case transition-all duration-300 hover:shadow-lg sm:px-3 md:px-3.5 lg:px-4 xl:px-5 ${
                    contributionType === "one-time"
                      ? "bg-text2 text-white"
                      : "border border-gray-500 bg-inherit text-black"
                  }`}
                >
                  <Typography
                    className={`text-sm font-semibold ${
                      contributionType === "one-time"
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    One-Time Savings
                  </Typography>
                </Button>
              </div>
            </section>

            {contributionType === "auto" && (
              <section className="mb-8">
                <Typography className="mb-4 text-left font-medium">
                  Choose savings type
                </Typography>

                <div className="flex flex-col gap-4">
                  <Link
                    to={ROUTES.flexibleContributionType}
                    state={{
                      savingsType: "Flexible",
                      contributionType: "auto",
                    }}
                    className="w-full"
                  >
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-between rounded-lg border border-gray-400 bg-white p-4 shadow-md transition-all"
                      onMouseEnter={() => setHoveredSavingsType("Flexible")}
                      onMouseLeave={() => setHoveredSavingsType(null)}
                    >
                      <Flexibile />
                      <Typography className="text-lg font-medium text-gray-800">
                        Flexible Savings
                      </Typography>
                      <div
                        className={`rounded border border-text2 px-8 py-2 text-sm font-medium
                        transition-all duration-300 ease-in-out
                        ${hoveredSavingsType === "Flexible" ? "scale-105 transform bg-text2 text-white shadow-md" : ""}
                      `}
                      >
                        Select
                      </div>
                    </motion.div>
                  </Link>

                  <Link
                    to={ROUTES.lockContributionType}
                    state={{ savingsType: "Lock", contributionType: "auto" }}
                    className="w-full"
                  >
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-between rounded-lg border border-gray-400 bg-white p-4 shadow-md transition-all"
                      onMouseEnter={() => setHoveredSavingsType("Lock")}
                      onMouseLeave={() => setHoveredSavingsType(null)}
                    >
                      <Lock />
                      <Typography className="text-lg font-medium text-gray-800">
                        Lock Savings
                      </Typography>
                      <div
                        className={`rounded border border-text2 px-8 py-2 text-sm font-medium
                        transition-all duration-300 ease-in-out
                        ${hoveredSavingsType === "Lock" ? "scale-105 transform bg-text2 text-white shadow-md" : ""}
                      `}
                      >
                        Select
                      </div>
                    </motion.div>
                  </Link>

                  <Link
                    to={ROUTES.strictLockContributionType}
                    state={{ savingsType: "Strict", contributionType: "auto" }}
                    className="w-full"
                  >
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-between rounded-lg border border-gray-400 bg-white p-4 shadow-md transition-all"
                      onMouseEnter={() => setHoveredSavingsType("Strict")}
                      onMouseLeave={() => setHoveredSavingsType(null)}
                    >
                      <StrictLocak />
                      <Typography className="text-lg font-medium text-gray-800">
                        Strict Lock Savings
                      </Typography>
                      <div
                        className={`rounded border  border-text2 px-8 py-2 text-sm font-medium
        transition-all duration-300 ease-in-out
        ${hoveredSavingsType === "Strict" ? "scale-105 transform bg-text2 text-white shadow-md" : ""}
      `}
                      >
                        Select
                      </div>
                    </motion.div>
                  </Link>
                </div>

                <hr className="mx-auto mt-8 w-full max-w-2xl" />
              </section>
            )}
          </article>
        </section>

        <section className="mt-6 w-full md:mt-10">
          <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col">
              <Typography
                variant="h1"
                className="text-lg font-bold tracking-tight sm:text-xl md:text-2xl"
              >
                My Savings
              </Typography>
            </div>

            <FormInput
              placeholder="Search Contribution"
              wrapperClassName="w-full max-w-full sm:max-w-[200px] md:max-w-[400px]"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </header>
          <div className="mt-8 flex w-fit items-end justify-end md:mt-16">
            <Select
              value={filterType}
              onChange={(value) => handleFilterChange(value || "")}
              label="Filter by"
              color="purple"
              className=" border border-gray-300 "
              placeholder="Select filter"
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <Option value="">All Savings</Option>
              <Option value="flexible">Flexible</Option>
              <Option value="lock">Lock</Option>
              <Option value="strict">Strict Lock</Option>
            </Select>
          </div>

          {isContributionsLoading ? (
            <ContributionListSkeleton />
          ) : contributions?.length > 0 ? (
            <div className="mb-3 mt-4 flex h-auto flex-col gap-4 rounded-lg bg-text2 p-4 text-center md:mt-6 md:p-6">
              <div className="mb-3 flex items-center justify-between px-4">
                <span className="text-sm font-medium text-white md:text-base">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex gap-2 font-semibold">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage <= 1}
                    className="rounded p-1 text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <IoIosArrowBack size={20} />
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages}
                    className="rounded p-1 text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <IoIosArrowForward size={20} />
                  </button>
                </div>
              </div>
              <hr className="border-gray-500" />

              {contributions.map((contribution: Contribution) => (
                <motion.div
                  key={contribution._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() =>
                    navigateToContributionDetails(contribution._id)
                  }
                  className="mx-auto flex w-full max-w-3xl cursor-pointer flex-col gap-2 rounded-full border-2 border-gray-500 bg-white px-4 transition-all hover:bg-gray-50 lg:px-6 "
                >
                  <div className="flex justify-between text-sm font-medium text-gray-500 md:text-base">
                    <Typography className="font-normal">
                      Savings Name
                    </Typography>
                    <Typography className="font-normal">
                      Savings Balance
                    </Typography>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 md:w-10">
                        <motion.img
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          src={contributionImg}
                          alt="Contribution category icon"
                          className="w-full"
                        />
                      </div>
                      <Typography className="text-base font-semibold md:text-lg">
                        {contribution?.savingsCategory}
                      </Typography>
                    </div>
                    <div>
                      <figure className="text-base font-semibold md:text-lg">
                        {formatCurrency(contribution?.balance)}
                      </figure>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex h-[12em] w-full flex-col items-center justify-center gap-4 rounded-lg bg-text2 p-6 text-center md:mt-6 md:p-8"
            >
              <Typography
                variant="h2"
                className="text-xl font-bold text-how1 md:text-2xl"
              >
                No Savings Yet
              </Typography>
            </motion.div>
          )}
        </section>
      </main>

      <SavingsPlan
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        savingsType={savingsType}
        onSavingsTypeChange={handleSavingsTypeChange}
      />
    </motion.main>
  );
};

export default Contribution;
