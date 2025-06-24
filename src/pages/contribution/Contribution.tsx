import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Typography } from "@material-tailwind/react";
import { Check } from "lucide-react";
import { ROUTES } from "../../shared/routes";
import { DashboardHeader } from "../../components/common/DashboardHeader";
import { Flexibile, Lock, Strict } from "../../Assets/svg";
import { Alert } from "@mui/material";
import BalanceDisplay from "../../components/dashboard/contribution/balanceDisplay/balanceDisplay";
import AutoSavings from "../../components/dashboard/contribution/autoSavings/autoSavings";
import { useContribution } from "../../shared/Hooks/useUserProfile";
import FilterContributions, {
  ContributionFilters,
} from "../../components/dashboard/contribution/modals/filterContributions";

interface Contribution {
  _id: string;
  savingsCategory: string;
  balance: number;
  savingsType: "Flexible" | "Lock" | "Strict";
  contributionType: "auto" | "one-time";
  endDate: string;
  contributionPlan?: string;
  amount?: number;
  currency?: string;
  startDate?: string;
  nextContributionDate?: string;
  lastContributionDate?: string;
  withdrawalDate?: string;
  status?: string;
}

const Contribution: React.FC = () => {
  const navigate = useNavigate();
  const [contributionType, setContributionType] = useState<
    "auto" | "one-time" | null
  >(null);
  const [hoveredSavingsType, setHoveredSavingsType] = useState<string | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<ContributionFilters>({
    contributionType: "all",
    lockType: "all",
    status: "active",
  });

  const [isContributionVisible, setIsContributionVisible] = useState(() => {
    const storedVisibility = sessionStorage.getItem(
      "contributionBalanceVisible",
    );
    return storedVisibility !== null ? storedVisibility === "true" : true;
  });

  const { contributionBalance, usersContributionHistory, isLoading, error } =
    useContribution({
      search: searchTerm,
    });

  const formatCurrency = (amount: number | undefined) => {
    if (!amount && amount !== 0) return "₦ 0";
    return `₦ ${amount.toLocaleString()}`;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleApplyFilters = (newFilters: ContributionFilters) => {
    setFilters(newFilters);
    setIsFilterOpen(false);
  };

  const navigateToContributionDetails = (contributionId: string) => {
    if (!contributionId) return;
    navigate(`/dashboard/contribution/contribution_details`, {
      state: { contributionId },
    });
  };

  const handleContributionTypeChange = (type: "auto" | "one-time") => {
    setContributionType(type);
  };

  const filteredContributions = useMemo(() => {
    const contributions = usersContributionHistory?.contributions || [];
    const currentDate = new Date();

    return contributions.filter((contribution: Contribution) => {
      const matchesSearch = contribution.savingsCategory
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const contributionMatch =
        filters.contributionType === "all" ||
        contribution.contributionType === filters.contributionType;

      const lockMatch =
        filters.lockType === "all" ||
        contribution.savingsType === filters.lockType;

      const isInactive =
        contribution.withdrawalDate &&
        new Date(contribution.withdrawalDate) < currentDate &&
        contribution.balance === 0;

      const statusMatch =
        filters.status === "all" ||
        (filters.status === "active" && !isInactive) ||
        (filters.status === "inactive" && isInactive);

      return matchesSearch && contributionMatch && lockMatch && statusMatch;
    });
  }, [usersContributionHistory, searchTerm, filters]);

  const savingsOptions = [
    {
      type: "Flexible",
      icon: <Flexibile />,
      route:
        contributionType === "auto"
          ? ROUTES.flexibleContributionType
          : ROUTES.oneTimeContributionType,
    },
    {
      type: "Lock",
      icon: <Lock />,
      route:
        contributionType === "auto"
          ? ROUTES.flexibleContributionType
          : ROUTES.oneTimeContributionType,
    },
    {
      type: "Strict",
      icon: <Strict />,
      route:
        contributionType === "auto"
          ? ROUTES.flexibleContributionType
          : ROUTES.oneTimeContributionType,
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-2 min-h-screen w-full"
    >
      <DashboardHeader className="flex items-center justify-center text-2xl md:text-3xl lg:mt-[2em] lg:text-xl">
        Contribution Plan
      </DashboardHeader>

      <main>
        <section className="mt-6 w-full md:mt-8">
          <article className="text-center text-gray-700">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border-[2px] border-gray-200 bg-white p-8 shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A] sm:p-16"
            >
              <BalanceDisplay
                title="Total Contribution Balance"
                balance={contributionBalance?.totalBalance}
                isLoading={isLoading}
                isVisible={isContributionVisible}
                onToggle={(newVisibility) => {
                  setIsContributionVisible(newVisibility);
                  sessionStorage.setItem(
                    "contributionBalanceVisible",
                    newVisibility.toString(),
                  );
                }}
                formatCurrency={formatCurrency}
              />
            </motion.div>

            {error && (
              <Alert severity="error" className="mt-4">
                {error}
              </Alert>
            )}

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

            {(contributionType === "auto" ||
              contributionType === "one-time") && (
              <section className="mb-8">
                <Typography className="mb-4 text-left font-medium">
                  Choose savings type
                </Typography>

                <div className="flex flex-col gap-4">
                  {savingsOptions.map((option) => (
                    <Link
                      key={option.type}
                      to={option.route}
                      state={{
                        savingsType: option.type,
                        contributionType,
                      }}
                      className="w-full"
                    >
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-between rounded-lg border border-gray-400 bg-white p-4 shadow-md transition-all"
                        onMouseEnter={() => setHoveredSavingsType(option.type)}
                        onMouseLeave={() => setHoveredSavingsType(null)}
                      >
                        {option.icon}
                        <Typography className="text-lg font-medium text-gray-800">
                          {option.type} Savings
                        </Typography>
                        <div
                          className={`rounded border border-text2 px-8 py-2 text-sm font-medium transition-all duration-300 ease-in-out ${
                            hoveredSavingsType === option.type
                              ? "scale-105 transform bg-text2 text-white shadow-md"
                              : ""
                          }`}
                        >
                          Select
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                <hr className="mx-auto mt-8 w-full max-w-2xl" />
              </section>
            )}
          </article>
        </section>

        <AutoSavings
          contributions={filteredContributions}
          isLoading={isLoading}
          error={error}
          searchTerm={searchTerm}
          filterType={filters.contributionType}
          onSearchChange={handleSearchChange}
          onFilterChange={() => {}}
          onNavigateToDetails={navigateToContributionDetails}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />

        <FilterContributions
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          currentFilters={filters}
          onApplyFilters={handleApplyFilters}
        />
      </main>
    </motion.main>
  );
};

export default Contribution;
