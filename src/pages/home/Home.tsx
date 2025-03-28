import React, { useState } from "react";
import { useNavigate } from "react-router";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { Helmet } from "react-helmet-async";
import "react-lazy-load-image-component/src/effects/blur.css";
import useWalletBalance from "../../shared/Hooks/useBalance";
import useUserProfile, {
  useAllNotification,
  useAllProjects,
} from "../../shared/Hooks/useUserProfile";
import { ROUTES } from "../../shared/routes";
import ToggleButton from "../../shared/utils/ToggleButton";
import { LoanModal } from "../../components/dashboard/home/modals/LoanModal";
import { ProjectsSkeleton } from "../../components/common/Loading";

interface Project {
  _id: string;
  title: string;
  status: string;
  documentUrl: string;
  createdAt: string;
}

const Home = () => {
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const { isWalletVisible, setIsWalletVisible, formattedBalance } =
    useWalletBalance();
  const { totalCount } = useAllNotification();
  const { profileDetails } = useUserProfile();
  const { useProjects, loading } = useAllProjects();
  const navigate = useNavigate();

  const addFund = () => {
    navigate("/dashboard/wallet");
  };

  const handleLoanClick = () => {
    setIsLoanModalOpen(true);
  };

  const closeLoanModal = () => {
    setIsLoanModalOpen(false);
  };

  const latestProjects = React.useMemo(() => {
    if (!useProjects) return [];
    return [...useProjects]
      .sort(
        (a: Project, b: Project) =>
          new Date(b?.createdAt)?.getTime() - new Date(a?.createdAt)?.getTime(),
      )
      .slice(0, 2);
  }, [useProjects]);

  const renderProjects = () => {
    if (loading) {
      return <ProjectsSkeleton />;
    }

    if (!latestProjects?.length) {
      return null;
    }

    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {latestProjects?.map((project: Project) => (
          <article key={project?._id}>
            <div
              className="flex h-48 flex-col gap-8 rounded-xl bg-cover bg-center bg-no-repeat p-3 transition-transform hover:scale-[1.02]"
              style={{
                backgroundImage: `url(${project?.documentUrl})`,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backgroundBlendMode: "overlay",
              }}
              role="img"
              aria-label={`Project: ${project?.title}`}
            >
              <Typography
                variant="small"
                className="text-md font-medium uppercase text-text3"
              >
                {project?.title}
              </Typography>
              <div className="mt-auto">
                <Button className="bg-coming2 normal-case">
                  <Typography className="text-sm font-medium text-black">
                    {project?.status}
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
      <main className="mb-8 px-4 lg:px-6">
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
          <div className="mt-6 rounded-3xl border-[2px] border-gray-200 bg-white p-10 shadow-md">
            <div className="flex justify-center gap-4 font-sans">
              <p className="font-medium">Total Balance</p>
              <div>
                <ToggleButton
                  isVisible={isWalletVisible}
                  onToggle={(newVisibility) => {
                    setIsWalletVisible(newVisibility);
                    sessionStorage.setItem(
                      "walletBalanceVisible",
                      newVisibility?.toString(),
                    );
                  }}
                />
              </div>
            </div>
            <div className="mx-auto mt-6 w-full max-w-xs rounded-md">
              {isWalletVisible ? (
                <p className="font-bold sm:text-xl lg:text-xl">
                  {formattedBalance}
                </p>
              ) : (
                <p className="text-2xl font-bold">*********</p>
              )}
              <hr className="mt-4 h-px rounded-md bg-howtext font-normal" />
            </div>
          </div>
        </section>

        <div className="mt-8 flex w-full flex-col gap-[1.5em]">
          <Button
            onClick={addFund}
            variant="text"
            className="text-md mx-auto w-full rounded-3xl bg-inherit py-4 text-center font-semibold text-text4 shadow-md transition-colors hover:bg-gray-50"
            aria-label="Add Fund"
          >
            + Add Fund
          </Button>
          <Button
            onClick={handleLoanClick}
            variant="text"
            className="text-md mx-auto w-full rounded-3xl bg-[#ECE6F2] py-4 text-center font-semibold text-text4 shadow-md transition-colors hover:bg-gray-50"
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
