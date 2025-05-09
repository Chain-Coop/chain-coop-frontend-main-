import { Props } from "react-select";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GroupHistoryTemplate from "../components/group_history_template";
import { useUserProfile } from "../../../shared/Hooks/useUserProfile";
import { Typography } from "@material-tailwind/react";

import createImage from "../../../Assets/png/dashboard/ajo/create_new_group.png";
import otherIcon from "../../../Assets/svg/dashboard/ajo/other_group_saving_icon.svg";
import otherImage from "../../../Assets/png/dashboard/ajo/other_group_saving_image.png";

const GroupHistoryPage = (props: Props) => {
  const [groupHistory, setGroupHistory] = useState("ongoing");

  const {
    profileDetails,
    userCircles,
    circlesLoading,
    circlesError,
    fetchUserCircles,
  } = useUserProfile();

  const ongoingGroups = userCircles
    ? userCircles
        .map((circle: any) => ({
          ...circle,
          icon: circle.icon || otherIcon,
          image: circle.image || otherImage,
        }))
        .filter((item: any) => item.progress < 100)
    : [];

  console.log("GROUP HISTORY PAGE - Processed ongoingGroups:", ongoingGroups);

  const completedGroups = userCircles
    ? userCircles
        .map((circle: any) => ({
          ...circle,
          icon: circle.icon || otherIcon,
          image: circle.image || otherImage,
        }))
        .filter((item: any) => item.progress === 100)
    : [];

  const allUserGroups = userCircles
    ? userCircles.map((circle: any) => ({
        ...circle,
        icon: circle.icon || otherIcon,
        image: circle.image || otherImage,
      }))
    : [];

  if (circlesLoading) {
    return (
      <main className="mb-[40px] flex min-h-[50vh] flex-col items-center justify-center gap-8 font-asap">
        <DashboardHeader className="flex items-center justify-center text-2xl  md:text-3xl lg:mt-[2em] lg:text-xl">
          Group History
        </DashboardHeader>
        <Typography>Loading group history...</Typography>
      </main>
    );
  }

  if (circlesError) {
    return (
      <main className="mb-[40px] flex min-h-[50vh] flex-col items-center justify-center gap-8 font-asap">
        <DashboardHeader className="flex items-center justify-center text-2xl  md:text-3xl lg:mt-[2em] lg:text-xl">
          Group History
        </DashboardHeader>
        <Typography color="red">
          Error fetching group history: {circlesError}
        </Typography>
      </main>
    );
  }

  return (
    <main className="mb-[40px] flex flex-col gap-8 font-asap">
      <DashboardHeader className="flex items-center justify-center text-2xl  md:text-3xl lg:mt-[2em] lg:text-xl">
        Group History
      </DashboardHeader>

      <section className="flex w-[100%] flex-col gap-8">
        <section className="flex w-[100%] flex-col gap-3">
          <div className=" px-4 lg:px-6">
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
          <section className="w-[100%] rounded-xl bg-[#C5B0D833] px-4 pt-3">
            {groupHistory === "ongoing" ? (
              <>
                {ongoingGroups.length > 0 ? (
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
                  <Typography>No ongoing groups available.</Typography>
                )}
              </>
            ) : (
              <>
                {completedGroups.length > 0 ? (
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
                  <Typography>No completed groups available.</Typography>
                )}
              </>
            )}
          </section>
        </section>

        {/* JOINT SAVINGS GROUP */}
        <section className="mt-12 flex w-[100%] flex-col  px-4 lg:px-6">
          {allUserGroups.length > 0 ? (
            <GroupHistoryTemplate
              description="This are the list of active groups you joined."
              historyList={allUserGroups}
              length={`Savings groups (${allUserGroups.length})`}
              title="Joint Saving Groups"
              key={3}
              buttonText="Joined"
              onClick={() => {}}
            />
          ) : (
            <Typography>No joint savings groups available.</Typography>
          )}
        </section>

        {/* CREATE NEW SAVINGS GROUP */}
        <section className="mt-12 flex w-[100%] flex-col items-center justify-center gap-4  px-4 lg:px-6">
          <img
            src={createImage}
            alt="create new savings group"
            className="h-[100px] w-[150px]"
          />
          <p className="text-center text-[16px] font-[400] text-[#6E6C6C] lg:text-[18px]">
            Everyday is a good day to save some money
          </p>
          <Link
            to={"/dashboard/ajo/open-group"}
            className="flex h-[45px] w-fit items-center justify-center rounded-md bg-[#440080] px-6 text-[16px] font-medium text-white hover:bg-[#3D0073] lg:text-[18px]"
          >
            Create a new group
          </Link>
        </section>
      </section>
    </main>
  );
};

export default GroupHistoryPage;
