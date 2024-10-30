import React from "react";
import { useNavigate } from "react-router";
import useUserProfile, { useAllProjects } from "../../../shared/Hooks/useUserProfile";
import { ComingSoon } from "../../common/Button";
import { IoIosNotifications } from "react-icons/io";
import useWalletBalance from "../../../shared/Hooks/useBalance";
import ToggleButton from "../../../shared/utils/ToggleButton";

interface Project {
  _id: string;
  title: string;
  status: string;
  documentUrl: string;
  createdAt: string;
}

const ProjectsSkeleton = () => (
  <div className="mt-4 gap-6 space-y-6 sm:flex-col lg:flex lg:flex-row lg:space-y-0">
    <div className="animate-pulse flex-1">
      <div className="h-48 bg-gray-200 rounded-xl"></div>
    </div>
    <div className="animate-pulse flex-1">
      <div className="h-48 bg-gray-200 rounded-xl"></div>
    </div>
  </div>
);

const Home = () => {
  const { isWalletVisible, setIsWalletVisible, formattedBalance } =
    useWalletBalance();
  const { profileDetails } = useUserProfile();
  const { useProjects, loading } = useAllProjects();

  const handleProjectClick = (projectId: string) => {
    navigate(`/dashboard/project/project_over-view/${projectId}`);
  };
  
  const navigate = useNavigate();
  
  const addFund = () => {
    navigate("/dashboard/wallet");
  };

  const latestProjects = React?.useMemo(() => {
    if (!useProjects) return [];
    
    return [...useProjects]
      .sort((a: Project, b: Project) => 
        new Date(b?.createdAt)?.getTime() - new Date(a?.createdAt)?.getTime()
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
      <div className="mt-4 gap-6 space-y-6 sm:flex-col lg:flex lg:flex-row lg:space-y-0">
        {latestProjects.map((project: Project) => (
          <article key={project?._id} className="flex-1">
            <div 
              className="flex cursor-pointer h-auto min-h-48 flex-col gap-8 rounded-xl p-3 bg-cover bg-center bg-no-repeat transition-transform hover:scale-[1.02]"
              style={{ 
                backgroundImage: `url(${project?.documentUrl})`,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backgroundBlendMode: 'overlay'
              }}
              onClick={() => handleProjectClick(project._id)}  
            >
              <h1 className="text-lg font-medium uppercase text-text3">
                {project?.title}
              </h1>
              <div className="mt-12">
                <ComingSoon className="bg-coming2">{project?.status}</ComingSoon>
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  };

  return (
    <main className="mx-auto mb-8 px-8 font-sans">
      <header className="flex justify-between sm:mt-4 lg:mt-10">
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
        <div className="mx-auto mt-8 rounded-3xl py-8 shadow-md">
          <div className="flex justify-center gap-4 font-sans">
            <p className="font-medium">Total Balance</p>
            <div>
              <ToggleButton
                isVisible={isWalletVisible}
                onToggle={(newVisibility) => {
                  setIsWalletVisible(newVisibility);
                  sessionStorage.setItem(
                    "walletBalanceVisible",
                    newVisibility?.toString()
                  );
                }}
              />
            </div>
          </div>
          <div className="mx-auto mt-6 w-60 rounded-md">
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

      <div>
        <button
          onClick={addFund}
          className="mx-auto mt-8 w-full rounded-3xl bg-inherit py-4 text-center text-lg font-semibold text-text4 shadow-md hover:bg-gray-50 transition-colors"
        >
          + Add Fund
        </button>
      </div>

      <section className="mt-8 w-full">
        {renderProjects()}
      </section>
    </main>
  );
};

export default Home;