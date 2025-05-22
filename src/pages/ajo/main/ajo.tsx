import ToggleButton from "../../../shared/utils/ToggleButton";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import { HiOutlinePlus } from "react-icons/hi";
import { groupSavingsOptions } from "../../../data/Data";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useUserProfile } from "../../../shared/Hooks/useUserProfile";
import otherIcon from "../../../Assets/svg/dashboard/ajo/other_group_saving_icon.svg";
import otherImage from "../../../Assets/png/dashboard/ajo/other_group_saving_image.png";
import GroupCard from "../components/group_card";
import GroupHistoryTemplate from "../components/group_history_template";
import { useWalletBalance } from "../../../shared/Hooks/useBalance";

interface CircleMember {
  progress: number;
  userId: string;
  contribution: number;
  status: string;
  failures: number;
  _id: string;
}

interface CircleFromAPI {
  _id: string;
  name: string;
  icon: string;
  image: string;
  description: string;
  status: string;
  groupType: string;
  createdBy: string;
  members: CircleMember[];
  invitedUsers: any[];
  currency: string;
  balance: number;
  depositAmount: number;
  progress: number;
  startDate: string;
  endDate: string;
  goalAmount: number;
  currentIndividualTotal: number;
  nextContributionDate: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const AjoPage = () => {
  const { isWalletVisible, setIsWalletVisible, formattedBalance } =
    useWalletBalance();

  const [groupOption, setGroupOption] = useState(0);
  const [groupHistory, setGroupHistory] = useState("ongoing");

  const {
    userCircles,
    circlesLoading,
    circlesError,
    fetchUserCircles,
    publicCircles,
    publicCirclesLoading,
    publicCirclesError,
    fetchPublicCircles,
  } = useUserProfile();

  useEffect(() => {
    fetchUserCircles();
    fetchPublicCircles();
  }, [fetchUserCircles, fetchPublicCircles]);

  const processCircleData = (
    circle: CircleFromAPI,
    isPublic: boolean = false,
  ) => {
    return {
      name: circle.name || "Unnamed Group",
      icon: circle.icon || otherIcon,
      image: circle.image || otherImage,
      members: Array.isArray(circle.members) ? circle.members.length : 0,
      amount: `${circle.currency}${circle.depositAmount.toLocaleString()}`,
      goal: `${circle.currency}${circle.goalAmount.toLocaleString()}`,
      balance: `${circle.currency}${circle.balance.toLocaleString()}`,
      progress: circle.progress || 0,
      buttonText: isPublic ? "Join" : "Withdraw",
      onClick: () => {}, // Add your join logic here
      // Additional data that might be useful
      description: circle.description,
      groupType: circle.groupType,
      status: circle.status,
      startDate: new Date(circle.startDate).toLocaleDateString(),
      endDate: new Date(circle.endDate).toLocaleDateString(),
      currentIndividualTotal: `${circle.currency}${circle.currentIndividualTotal.toLocaleString()}`,
      isPublicGroup: isPublic,
      circleData: circle,
    };
  };

  const ongoingGroups = userCircles
    .map((circle) => processCircleData(circle, false))
    .filter((item) => item.progress < 100);

  const completedGroups = userCircles
    .map((circle) => processCircleData(circle, false))
    .filter((item) => item.progress === 100);

  const processedPublicCircles = publicCircles.map((circle) =>
    processCircleData(circle, true),
  );

  return (
    <main className="mb-[40px] flex flex-col  gap-8 font-asap">
      <DashboardHeader className="flex items-center justify-center text-2xl  md:text-3xl lg:mt-[2em] lg:text-xl">
        Group Savings
      </DashboardHeader>

      <section className="mb-[20px] flex  flex-col   gap-8 font-asap">
        <section className="w-[95%] self-center rounded-3xl border-[2px] border-gray-200 bg-white p-8 shadow-md sm:p-16 lg:w-[100%]">
          <div className="flex justify-center gap-4  font-asap ">
            <p className="font-medium">Total group fund</p>
            <div>
              <ToggleButton
                isVisible={isWalletVisible}
                onToggle={(newVisibility) => {
                  setIsWalletVisible(newVisibility);
                  sessionStorage.setItem(
                    "totalGroupFund",
                    newVisibility.toString(),
                  );
                }}
              />
            </div>
          </div>
          <div className="mx-auto mt-6 flex w-60 flex-col rounded-md">
            {isWalletVisible ? (
              <p className="self-center text-xl font-bold lg:text-xl">
                {formattedBalance}
              </p>
            ) : (
              <p className="self-center text-2xl font-bold">*********</p>
            )}
            <hr className="mt-4 h-px rounded-md bg-howtext" />
          </div>
        </section>

        {/* START GROUP SAVING */}
        <section className="flex w-[100%] flex-col gap-4">
          <div className="flex w-[100%] items-center gap-4">
            <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#ECE6F2]">
              <HiOutlinePlus className="h-[16px] w-[16px] text-[#3D0073]" />
            </div>
            <h2 className="text-[16px] font-[600] tracking-tight lg:text-[18px] xl:text-[20px]">
              Start Group Saving
            </h2>
          </div>
          <Typography className="tracking-medium font-asap text-[14px] font-[400] text-[#302B2BC7] xl:text-[16px]">
            Select any of the saving option to begin your contribution with
            others
          </Typography>
          <div className="flex w-[100%] flex-wrap justify-between gap-y-4 xl:flex-nowrap 2xl:justify-center 2xl:gap-6">
            {groupSavingsOptions.map((group, index) => (
              <Link
                className={`flex h-[150px] w-[100%] flex-col items-center gap-2 rounded-lg p-2 hover:ring-2  hover:ring-[#440080] md:h-fit md:w-[49%] lg:w-[100%] xl:w-[49%] xxl:w-[240px] ${groupOption === index && "ring-2 ring-[#440080]"}`}
                style={{ backgroundColor: group.backgroundColor }}
                key={group.header}
                to={group.link}
              >
                <img
                  src={group.icon}
                  alt={group.header}
                  className="h-[40px] w-[40px]"
                />
                <h3 className="font-[600] text-[#1E1E1E] md:text-[16px] lg:text-[20px]">
                  {group.header}
                </h3>
                <Typography className="w-[100%] text-center font-asap text-[13px] font-[400] text-[#565454] md:text-[14px] lg:text-[15px]">
                  {group.text}
                </Typography>
              </Link>
            ))}
          </div>
        </section>

        {/* OTHER SAVING DATA */}
        <section className="flex flex-col gap-3 ">
          <h3 className="w-[100%] border-b-[1.5px] border-b-[#DDD8D8B2] pb-3 text-[20px] font-[600] lg:text-[22px]">
            Other Saving Groups
          </h3>
          <section className="scrollbar-hide flex w-[100%] gap-4 overflow-x-auto py-2">
            {publicCirclesLoading ? (
              <Typography className="p-4 text-center">
                Loading public groups...
              </Typography>
            ) : publicCirclesError ? (
              <Typography className="p-4 text-center" color="red">
                Error: {publicCirclesError}
              </Typography>
            ) : processedPublicCircles.length > 0 ? (
              processedPublicCircles.map((group, index) => (
                <div key={index} className="min-w-[280px] flex-shrink-0">
                  <GroupCard {...group} circleData={publicCircles[index]} />
                </div>
              ))
            ) : (
              <Typography className="p-4 text-center">
                No public groups available.
              </Typography>
            )}
          </section>
        </section>

        {/* GROUP HISTORY */}
        <section className="flex w-[100%] flex-col gap-5 overflow-x-auto">
          <h4 className="w-[100%] text-[20px] font-[600] lg:text-[22px] ">
            Group History
          </h4>
          <div className="px-4 lg:px-6">
            <div className="flex w-[100%] justify-between border-b-[1.5px] border-b-[#DDD8D8B2]">
              <button
                className={`pb-5 font-asap text-[16px] font-[500]  text-[#1E1E1E]  lg:text-[18px] ${groupHistory === "ongoing" ? "border-b-[2.5px] border-b-[#440080] font-[600] opacity-100" : "opacity-50"}`}
                onClick={() => setGroupHistory("ongoing")}
              >
                Ongoing
              </button>
              <button
                className={`pb-5 font-asap text-[16px] font-[500]  text-[#1E1E1E]  lg:text-[18px] ${groupHistory === "completed" ? "border-b-[2.5px] border-b-[#440080] font-[600] opacity-100" : "opacity-50"}`}
                onClick={() => setGroupHistory("completed")}
              >
                Completed
              </button>
            </div>
          </div>
          <section className="w-[100%] flex-shrink-0 rounded-xl bg-[#C5B0D833] px-2 pt-3">
            {circlesLoading ? (
              <Typography className="p-4 text-center">
                Loading group history...
              </Typography>
            ) : circlesError ? (
              <Typography className="p-4 text-center" color="red">
                Error fetching group history: {circlesError}
              </Typography>
            ) : groupHistory === "ongoing" ? (
              ongoingGroups.length > 0 ? (
                <GroupHistoryTemplate
                  description="This are the list of active groups you created"
                  historyList={ongoingGroups}
                  length={`My groups (${ongoingGroups.length})`}
                  title="Active groups"
                  key={1}
                  buttonText="Withdraw"
                  onClick={() => {}}
                />
              ) : (
                <Typography className="p-4 text-center">
                  No ongoing groups available.
                </Typography>
              )
            ) : completedGroups.length > 0 ? (
              <GroupHistoryTemplate
                description="This are the list of past groups you created or joined."
                historyList={completedGroups}
                length={`My previous groups (${completedGroups.length})`}
                title="Previous Groups"
                key={2}
                buttonText="Withdraw"
                onClick={() => {}}
              />
            ) : (
              <Typography className="p-4 text-center">
                No completed groups available.
              </Typography>
            )}
          </section>
        </section>
      </section>
    </main>
  );
};

export default AjoPage;
