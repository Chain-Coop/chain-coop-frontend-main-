import ToggleButton from "../../../../shared/utils/ToggleButton";
import { DashboardHeader } from "../../../common/DashboardHeader";
import useWalletBalance from "../../../../shared/Hooks/useBalance";
import { HiOutlinePlus } from "react-icons/hi";
import { groupSavingsOptions } from "../../../../data/Data";
import { useState } from "react";
import { Link } from "react-router-dom";

import createImage from "../../../../Assets/png/dashboard/ajo/create_new_group.png";
import otherIcon from "../../../../Assets/svg/dashboard/ajo/other_group_saving_icon.svg";
import otherImage from "../../../../Assets/png/dashboard/ajo/other_group_saving_image.png";
import GroupCard from "../components/group_card";
import GroupHistoryTemplate from "../components/group_history_template";

const AjoPage = () => {
  const { isWalletVisible, setIsWalletVisible, formattedBalance } =
    useWalletBalance();

  // state to select active group saving option
  const [groupOption, setGroupOption] = useState(0);

  // state to control the group history selected
  const [groupHistory, setGroupHistory] = useState("ongoing");

  // fetched data from server
  const otherGroupSavings = [
    {
      icon: otherIcon,
      image: otherImage,
      name: "Tech Achievers",
      members: 10,
      progress: 1,
      amount: "$10 daily",
      goal: "$100k per member",
      totalSaved: "$100.5m",
    },
    {
      icon: otherIcon,
      image: otherImage,
      name: "Tech Achievers",
      members: 10,
      progress: 19,
      amount: "$10 daily",
      goal: "$100k per member",
      totalSaved: "$100.5m",
    },
    {
      icon: otherIcon,
      image: otherImage,
      name: "Tech Achievers",
      members: 10,
      progress: 90,
      amount: "$10 daily",
      goal: "$100k per member",
      totalSaved: "$100.5m",
    },
    {
      icon: otherIcon,
      image: otherImage,
      name: "Tech Achievers",
      members: 10,
      progress: 70,
      amount: "$10 daily",
      goal: "$100k per member",
      totalSaved: "$100.5m",
    },
    {
      icon: otherIcon,
      image: otherImage,
      name: "Tech Achievers",
      members: 10,
      progress: 100,
      amount: "$10 daily",
      goal: "$100k per member",
      totalSaved: "$100.5m",
    },
    {
      icon: otherIcon,
      image: otherImage,
      name: "Tech Achievers",
      members: 10,
      progress: 0,
      amount: "$10 daily",
      goal: "$100k per member",
      totalSaved: "$100.5m",
    },
    {
      icon: otherIcon,
      image: otherImage,
      name: "Tech Achievers",
      members: 10,
      progress: 10,
      amount: "$10 daily",
      goal: "$100k per member",
      totalSaved: "$100.5m",
    },
  ];

  return (
    <main className="mb-[20px] flex flex-col gap-8 font-sans">
      <DashboardHeader className="flex items-center justify-center text-2xl  md:text-3xl lg:mt-[2em] lg:text-xl">
        Group Savings
      </DashboardHeader>

      <section className="flex items-center justify-center">
        <div className="w-[80%] rounded-3xl border-[2px] border-gray-200  bg-white p-8 shadow-md sm:p-16 lg:w-[95%] lg:px-6">
          <div className="flex justify-center gap-4 font-sans">
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
        <p className="tracking-medium text-[14px] font-[400] text-[#302B2BC7] xl:text-[16px]">
          Select any of the saving option to begin your contribution with others
        </p>
        <div className="flex w-[100%] flex-wrap justify-between gap-y-4">
          {groupSavingsOptions.map((group, index) => (
            <Link
              className={`flex w-[100%] flex-col items-center gap-2 rounded-lg p-2 hover:ring-2 hover:ring-[#440080] md:w-[240px] ${groupOption === index && "ring-2 ring-[#440080]"}`}
              style={{ backgroundColor: group.backgroundColor }}
              key={group.header}
              to={group.link}
            >
              <img
                src={group.icon}
                alt={group.header}
                className="h-[40px] w-[40px]"
              />
              <h3 className="text-[18px] font-[600] text-[#1E1E1E] lg:text-[20px]">
                {group.header}
              </h3>
              <p className="w-[100%] text-center text-[13px] font-[400] text-[#565454] lg:text-[15px]">
                {group.text}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* OTHER SAVING DATA */}
      <section className="flex flex-col gap-3 px-10 lg:px-6">
        <h3 className="w-[100%] border-b-[1.5px] border-b-[#DDD8D8B2] pb-3 text-[20px] font-[600] lg:text-[22px]">
          Other Saving Groups
        </h3>
        <section className="scrollbar-hide flex w-[100%] gap-4 overflow-x-auto py-2">
          {otherGroupSavings.map((group, index) => (
            <GroupCard
              key={index}
              amount={group.amount}
              goal={group.goal}
              icon={group.icon}
              image={group.image}
              members={group.members}
              name={group.name}
              progress={group.progress}
              totalSaved={group.totalSaved}
            />
          ))}
        </section>
      </section>

      {/* GROUP HISTORY */}
      <section className="flex w-[100%] flex-col gap-3 px-10  lg:px-6">
        <h4 className="w-[100%] text-[20px] font-[600] lg:text-[22px]">
          Group History
        </h4>
        <div className="flex w-[100%] justify-between border-b-[1.5px] border-b-[#DDD8D8B2]">
          <button
            className={`pb-5 font-sans text-[16px] font-[500] text-[#1E1E1E] lg:text-[18px] ${groupHistory === "ongoing" ? "border-b-[2.5px] border-b-[#440080] opacity-100" : "opacity-50"}`}
            onClick={() => setGroupHistory("ongoing")}
          >
            Ongoing
          </button>
          <button
            className={`pb-5 font-sans text-[16px] font-[500] text-[#1E1E1E] lg:text-[18px] ${groupHistory === "completed" ? "border-b-[2.5px] border-b-[#440080] opacity-100" : "opacity-50"}`}
            onClick={() => setGroupHistory("completed")}
          >
            Completed
          </button>
        </div>
        <section className="w-[100%] rounded-xl bg-[#C5B0D833]  px-4 pt-3">
          {groupHistory === "ongoing" ? (
            <GroupHistoryTemplate
              description="This are the list of active groups you created"
              historyList={otherGroupSavings.filter(
                (item) => item.progress < 100,
              )}
              length={`My groups (${otherGroupSavings.filter((item) => item.progress < 100).length})`}
              title="Active groups"
              key={1}
            />
          ) : (
            <GroupHistoryTemplate
              description="This are the list of past groups you created or joined."
              historyList={otherGroupSavings.filter(
                (item) => item.progress === 100,
              )}
              length={`My previous groups (${otherGroupSavings.filter((item) => item.progress === 100).length})`}
              title="Previous Groups"
              key={2}
            />
          )}
        </section>
      </section>

      {/* JOINT SAVINGS GROUP */}
      <section className="mt-12 flex w-[100%] flex-col px-10 lg:px-6">
        <GroupHistoryTemplate
          description="This are the list of active groups you joined."
          historyList={otherGroupSavings}
          length={`Savings groups (${otherGroupSavings.length})`}
          title="Joint Saving Groups"
          key={2}
        />
      </section>

      {/* CREATE NEW SAVINGS GROUP */}
      <section className="mt-12 flex w-[100%] flex-col items-center justify-center gap-4 px-4 lg:px-6">
        <img
          src={createImage}
          alt="create new savings group"
          className="h-[100px] w-[150px]"
        />
        <p className="text-center text-[16px] font-[400] text-[#6E6C6C] lg:text-[18px]">
          Everyday is a good day to save some money
        </p>
        <button className="flex h-[45px] w-fit items-center justify-center rounded-md bg-[#440080] px-6 text-[16px] font-medium text-white hover:bg-[#3D0073] lg:text-[18px]">
          Create a new group
        </button>
      </section>
    </main>
  );
};

export default AjoPage;
