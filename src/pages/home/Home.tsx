import React, { useState } from "react";
import { useNavigate } from "react-router";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { Helmet } from "react-helmet-async";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  useAllNotification,
  useAllProjects,
  useUserProfile,
  useWallet,
} from "../../shared/Hooks/useUserProfile";
import { ROUTES } from "../../shared/routes";
import { LoanModal } from "../../components/dashboard/home/modals/LoanModal";
import { ProjectsSkeleton } from "../../components/common/Loading";
import { useAppSelector } from "../../shared/redux/reduxHooks";
import BalanceDisplay from "../../components/dashboard/contribution/balanceDisplay/balanceDisplay";
import { RootState } from "../../shared/redux/rootReducer";

const Home = () => {
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const { walletBalance, isLoading } = useWallet();
  const { latestProjects } = useAllProjects();
  const { totalCount } = useAllNotification();
  const { profileDetails } = useUserProfile();
  const navigate = useNavigate();

  const formatCurrency = (amount: number | undefined) => {
    if (!amount && amount !== 0) return "₦ 0";
    return `₦ ${amount.toLocaleString()}`;
  };

  const addFund = () => {
    navigate("/dashboard/wallet");
  };

  const handleLoanClick = () => {
    setIsLoanModalOpen(true);
  };

  const closeLoanModal = () => {
    setIsLoanModalOpen(false);
  };

  const [isWalletVisible, setIsWalletVisible] = useState<boolean>(() => {
    const saved = sessionStorage.getItem("walletBalanceVisible");
    return saved ? JSON.parse(saved) : true;
  });

  const renderProjects = () => {
    if (isLoading) {
      return <ProjectsSkeleton />;
    }

    if (!latestProjects?.length) {
      return (
        <div className="mt-4 rounded-xl bg-gray-50 p-6 text-center shadow-sm">
          <Typography variant="h6" className="text-gray-600">
            No projects available
          </Typography>
          <Typography variant="small" className="mt-2 text-gray-500">
            Your projects will appear here once created or joined.
          </Typography>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {latestProjects.map((project) => (
          <article key={project._id}>
            <div
              className="flex h-48 flex-col gap-8 rounded-xl bg-cover bg-center bg-no-repeat p-3 shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A] transition-transform hover:scale-[1.02]"
              style={{
                backgroundImage: `url(${project.documentUrl || "/api/placeholder/400/320"})`,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backgroundBlendMode: "overlay",
              }}
              role="img"
              aria-label={`Project: ${project.title}`}
            >
              <Typography
                variant="small"
                className="text-md font-medium uppercase text-text3"
              >
                {project.title}
              </Typography>
              <div className="mt-auto">
                <Button className="bg-coming2 normal-case">
                  <Typography className="text-sm font-medium text-black">
                    {project.status}
                  </Typography>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Home - Chain Co-op</title>
        <meta
          name="description"
          content="Welcome to your dashboard. Manage your projects, wallet, and notifications."
        />
      </Helmet>
      <main>
        <header className="flex items-center justify-between py-4 sm:mt-4 lg:mt-10">
          <div className="font-medium">
            <Typography className="font-normal">Welcome Back!</Typography>
            <Typography className="mt-1 font-semibold">
              {profileDetails?.username || "user"}
            </Typography>
          </div>
          <Link to={ROUTES.notification}>
            <button
              className="relative inline-flex items-center"
              aria-label={`View notifications (${totalCount} unread)`}
            >
              <IoIosNotifications
                className="cursor-pointer"
                size={27}
                aria-hidden="true"
              />
              {totalCount > 0 && (
                <span className="absolute -right-2 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {totalCount > 99 ? "99+" : totalCount}
                </span>
              )}
            </button>
          </Link>
        </header>

        <section className="text-center text-text4">
          <div className="mt-6 rounded-3xl border-[2px] border-gray-200 bg-white p-10 shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A]">
            <BalanceDisplay
              title="Total Balance"
              balance={walletBalance?.balance}
              isLoading={isLoading}
              isVisible={isWalletVisible}
              onToggle={(newVisibility: boolean) => {
                setIsWalletVisible(newVisibility);
                sessionStorage.setItem(
                  "walletBalanceVisible",
                  newVisibility.toString(),
                );
              }}
              formatCurrency={formatCurrency}
            />
          </div>
        </section>

        <div className="mt-8 flex w-full flex-col gap-[1.5em]">
          <Button
            onClick={addFund}
            variant="text"
            className="text-md mx-auto w-full rounded-3xl bg-inherit py-4 text-center font-semibold text-text4 shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A] transition-colors hover:bg-gray-50"
            aria-label="Add Fund"
          >
            + Add Fund
          </Button>
          <Button
            onClick={handleLoanClick}
            variant="text"
            className="text-md mx-auto w-full rounded-3xl bg-[#ECE6F2] py-4 text-center font-semibold text-text4 shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A] transition-colors hover:bg-gray-50"
            aria-label="Get a loan"
          >
            + Get a loan
          </Button>
        </div>

        <section className="mt-8 w-full">{renderProjects()}</section>
        <React.Suspense fallback={<div>Loading...</div>}>
          <LoanModal open={isLoanModalOpen} onClose={closeLoanModal} />
        </React.Suspense>
      </main>
    </>
  );
};

export default Home;
