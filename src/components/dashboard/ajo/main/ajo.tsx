import ToggleButton from "../../../../shared/utils/ToggleButton";
import { DashboardHeader } from "../../../common/DashboardHeader";
import useWalletBalance from "../../../../shared/Hooks/useBalance";
import { HiOutlinePlus } from "react-icons/hi";
import { groupSavingsOptions } from "../../../../data/Data";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";


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
        <main className="flex flex-col font-sans  gap-8 mb-[20px]">
            <DashboardHeader className="flex items-center justify-center text-2xl  md:text-3xl lg:mt-[2em] lg:text-xl">
              Group Savings
            </DashboardHeader>

            <section className="rounded-3xl border-[2px] border-gray-200 bg-white p-8 shadow-md sm:p-16 w-[100%]">
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
                <div className="mx-auto mt-6 w-60 rounded-md flex flex-col">
                {isWalletVisible ? (
                    <p className="text-xl font-bold lg:text-xl self-center">
                    {formattedBalance}
                    </p>
                ) : (
                    <p className="text-2xl font-bold self-center">*********</p>
                )}
                <hr className="mt-4 h-px rounded-md bg-howtext" />
                </div>
            </section>

            {/* START GROUP SAVING */}
            <section className="flex w-[100%] flex-col gap-4">
                <div className="w-[100%] flex items-center gap-4">
                    <div className="bg-[#ECE6F2] w-[24px] h-[24px] flex items-center justify-center rounded-full">
                        <HiOutlinePlus className="text-[#3D0073] w-[16px] h-[16px]" />
                    </div>
                    <h2 className="font-[600] text-[16px] lg:text-[18px] xl:text-[20px] tracking-tight">
                        Start Group Saving
                    </h2>
                </div>
                <Typography className="text-[#302B2BC7] text-[14px] xl:text-[16px] font-[400] tracking-medium">
                    Select any of the saving option to begin your contribution with others
                </Typography>
                <div className="flex w-[100%] justify-between 2xl:justify-center 2xl:gap-6 flex-wrap gap-y-4">
                    {
                        groupSavingsOptions.map((group, index) => (
                            <Link 
                                className={`flex flex-col gap-2 items-center w-[100%] md:w-[240px] p-2 rounded-lg hover:ring-2 hover:ring-[#440080] ${groupOption === index && 'ring-2 ring-[#440080]'}`}
                                style={{ backgroundColor: group.backgroundColor }}
                                key={group.header}
                                to={group.link}>
                                <img src={group.icon} alt={group.header} className="w-[40px] h-[40px]" />
                                <h3 className="text-[18px] lg:text-[20px] font-[600] text-[#1E1E1E]">
                                    {group.header}
                                </h3>
                                <Typography className="text-[13px] lg:text-[15px] text-[#565454] font-[400] w-[100%] text-center">
                                    {group.text}
                                </Typography>
                            </Link>
                        ))
                    }
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
            <section className="w-[100%] flex flex-col gap-3">
                <h4 className="text-[20px] lg:text-[22px] font-[600] w-[100%]">
                    Group History
                </h4>
                <div className="flex w-[100%] justify-between border-b-[1.5px] border-b-[#DDD8D8B2]">
                    <button className={`font-[500] text-[#1E1E1E] text-[16px] lg:text-[18px] font-sans pb-5 ${groupHistory === 'ongoing' ? 'opacity-100 border-b-[2.5px] border-b-[#440080]' : 'opacity-50'}`} onClick={() => setGroupHistory('ongoing')}>
                        Ongoing
                    </button>
                    <button className={`font-[500] text-[#1E1E1E] text-[16px] lg:text-[18px] font-sans pb-5 ${groupHistory === 'completed' ? 'opacity-100 border-b-[2.5px] border-b-[#440080]' : 'opacity-50'}`} onClick={() => setGroupHistory('completed')}>
                        Completed
                    </button>
                </div>
                <section className="w-[100%] bg-[#C5B0D833] pt-3 px-4 rounded-xl">
                    {
                        groupHistory === 'ongoing' 
                            ? 
                        <GroupHistoryTemplate description="This are the list of active groups you created" historyList={otherGroupSavings.filter(item => item.progress < 100)} length={`My groups (${otherGroupSavings.filter(item => item.progress < 100).length})`} title="Active groups" key={1} /> 
                            : 
                        <GroupHistoryTemplate description="This are the list of past groups you created or joined." historyList={otherGroupSavings.filter(item => item.progress === 100)} length={`My previous groups (${otherGroupSavings.filter(item => item.progress === 100).length})`} title="Previous Groups" key={2} />
                    }
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
            <section className="w-[100%] flex flex-col mt-12 items-center justify-center gap-4">
                <img src={createImage} alt="create new savings group" className="w-[150px] h-[100px]" />
                <p className="text-[#6E6C6C] text-[16px] lg:text-[18px] font-[400] text-center">
                    Everyday is a good day to save some money
                </p>
                <Link to={"/dashboard/ajo/create_open_group"}  className="bg-[#440080] text-[16px] lg:text-[18px] font-medium w-fit px-6 h-[45px] rounded-md flex items-center justify-center text-white hover:bg-[#3D0073]">
                    Create a new group
                </Link>
            </section>
        </main>
    )
}

export default AjoPage;
