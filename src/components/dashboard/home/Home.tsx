import React, { useState } from "react";
import { useNavigate } from "react-router";
import useUserProfile, {
  useAllProjects,
} from "../../../shared/Hooks/useUserProfile";
import { ComingSoon } from "../../common/Button";
import { IoIosNotifications } from "react-icons/io";
import useWalletBalance from "../../../shared/Hooks/useBalance";
import ToggleButton from "../../../shared/utils/ToggleButton";
import { Modal, Box, IconButton } from "@mui/material";
import loan from "../../../Assets/svg/dashboard/loan.svg";

interface Project {
  _id: string;
  title: string;
  status: string;
  documentUrl: string;
  createdAt: string;
}

const ProjectsSkeleton = () => (
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
    <div className="animate-pulse">
      <div className="h-48 rounded-xl bg-gray-200"></div>
    </div>
    <div className="animate-pulse">
      <div className="h-48 rounded-xl bg-gray-200"></div>
    </div>
  </div>
);

const Home = () => {
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const { isWalletVisible, setIsWalletVisible, formattedBalance } =
    useWalletBalance();
  const { profileDetails } = useUserProfile();
  const { useProjects, loading } = useAllProjects();
  const navigate = useNavigate();

  const handleProjectClick = (projectId: any) => {
    navigate(`/dashboard/project/project_over-view`, {
      state: { projectId },
    });
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

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: "450px" },
    bgcolor: "background.paper",
    borderRadius: "16px",
    boxShadow: 24,
    p: 4,
    outline: "none",
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
        {latestProjects.map((project: Project) => (
          <article key={project?._id}>
            <div
              className="flex h-48 cursor-pointer flex-col gap-8 rounded-xl bg-cover bg-center bg-no-repeat p-3 transition-transform hover:scale-[1.02]"
              style={{
                backgroundImage: `url(${project?.documentUrl})`,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backgroundBlendMode: "overlay",
              }}
              onClick={() => handleProjectClick(project._id)}
            >
              <h1 className="text-lg font-medium uppercase text-text3">
                {project?.title}
              </h1>
              <div className="mt-auto">
                <ComingSoon className="bg-coming2">
                  {project?.status}
                </ComingSoon>
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  };

  return (
    <main className="mx-auto mb-8 w-full max-w-7xl px-4 font-sans lg:px-8">
      <header className="flex items-center justify-between py-4 sm:mt-4 lg:mt-10">
        <div className="font-medium">
          <p>Welcome Back!</p>
          <p className="mt-1 font-semibold">
            {profileDetails?.username || "user"}
          </p>
        </div>
        <div>
          <IoIosNotifications className="cursor-pointer fill-text4" size={27} />
        </div>
      </header>

      <section className="text-center text-text4">
        <div className="mx-auto mt-8 rounded-3xl px-4 py-8 shadow-md sm:px-8">
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

      <div className="mt-8 flex w-full flex-col gap-[1.5em] lg:px-4">
        <button
          onClick={addFund}
          className="mx-auto w-full rounded-3xl bg-inherit py-4 text-center text-lg font-semibold text-text4 shadow-md transition-colors hover:bg-gray-50"
        >
          + Add Fund
        </button>
        <button
          onClick={handleLoanClick}
          className="mx-auto w-full rounded-3xl bg-[#ECE6F2] py-4 text-center text-lg font-semibold text-text4 shadow-md transition-colors hover:bg-gray-50"
        >
          + Get a loan
        </button>
      </div>

      <section className="mt-8 w-full px-4 sm:px-0">{renderProjects()}</section>

      <Modal
        open={isLoanModalOpen}
        onClose={closeLoanModal}
        aria-labelledby="loan-modal"
        aria-describedby="loan-modal-description"
      >
        <Box sx={modalStyle}>
          <IconButton
            aria-label="close"
            onClick={closeLoanModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "text.secondary",
            }}
          ></IconButton>
          <div className="py-[1.5em]">
            <div className="lg:max-w-lg">
              <header className="mb-3 flex items-center justify-center gap-2 text-center">
                <h2 className="text-xl font-bold text-text2">Loan Notice</h2>
                <img src={loan} alt="loan" />
              </header>
              <section className="mt-4">
                <p className="text-center font-medium">
                  You don't have any active loan yet.
                </p>
                <p className="mt-2 text-center font-medium">
                  We'll let you know when you're available for one.
                </p>
              </section>
            </div>
          </div>
        </Box>
      </Modal>
    </main>
  );
};

export default Home;
