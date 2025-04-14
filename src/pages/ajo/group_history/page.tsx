import { Props } from "react-select"
import { DashboardHeader } from "../../../components/common/DashboardHeader"
import { useState } from "react";
import { Link } from "react-router-dom";
import GroupHistoryTemplate from "../components/group_history_template";


import createImage from "../../../Assets/png/dashboard/ajo/create_new_group.png";
import otherIcon from "../../../Assets/svg/dashboard/ajo/other_group_saving_icon.svg";
import otherImage from "../../../Assets/png/dashboard/ajo/other_group_saving_image.png";


const GroupHistoryPage = (props: Props) => {
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
        <main className="flex flex-col font-asap gap-8 mb-[40px]">
            <DashboardHeader className="flex items-center justify-center text-2xl  md:text-3xl lg:mt-[2em] lg:text-xl">
                Group History
            </DashboardHeader>

           <section className="flex flex-col gap-8 w-[100%]">
                <section className="w-[100%] flex flex-col gap-3">
                    <div className=" px-4 lg:px-6">
                        <div className="flex w-[100%] justify-between border-b-[1.5px] border-b-[#DDD8D8B2]">
                            <button className={`font-[500] text-[#1E1E1E] text-[16px] lg:text-[18px]  font-asap  pb-5 ${groupHistory === 'ongoing' ? 'opacity-100 font-[600] border-b-[2.5px] border-b-[#440080]' : 'opacity-50'}`} onClick={() => setGroupHistory('ongoing')}>
                                Ongoing
                            </button>
                            <button className={`font-[500] text-[#1E1E1E] text-[16px] lg:text-[18px]  font-asap  pb-5 ${groupHistory === 'completed' ? 'opacity-100 font-[600] border-b-[2.5px] border-b-[#440080]' : 'opacity-50'}`} onClick={() => setGroupHistory('completed')}>
                                Completed
                            </button>
                        </div>
                    </div>
                    <section className="w-[100%] bg-[#C5B0D833] pt-3 px-4 rounded-xl">
                        {
                            groupHistory === 'ongoing' 
                                ? 
                            <GroupHistoryTemplate description="This are the list of active groups you created" historyList={otherGroupSavings.filter(item => item.progress < 100)} length={`My groups (${otherGroupSavings.filter(item => item.progress < 100).length})`} title="Active groups" key={1} buttonText="Withdraw" onClick={() => {}} /> 
                                : 
                            <GroupHistoryTemplate description="This are the list of past groups you created or joined." historyList={otherGroupSavings.filter(item => item.progress === 100)} length={`My previous groups (${otherGroupSavings.filter(item => item.progress === 100).length})`} title="Previous Groups" key={2} buttonText="Withdraw" onClick={() => {}} />
                        }
                    </section>
                </section>

                {/* JOINT SAVINGS GROUP */}
                <section className="mt-12 flex w-[100%] flex-col  px-4 lg:px-6">
                <GroupHistoryTemplate
                    description="This are the list of active groups you joined."
                    historyList={otherGroupSavings}
                    length={`Savings groups (${otherGroupSavings.length})`}
                    title="Joint Saving Groups"
                    key={2}
                    buttonText="Joined" 
                    onClick={() => {}}
                />
                </section>

                    {/* CREATE NEW SAVINGS GROUP */}
                <section className="w-[100%] flex flex-col mt-12 items-center justify-center gap-4  px-4 lg:px-6">
                    <img src={createImage} alt="create new savings group" className="w-[150px] h-[100px]" />
                    <p className="text-[#6E6C6C] text-[16px] lg:text-[18px] font-[400] text-center">
                        Everyday is a good day to save some money
                    </p>
                    <Link to={"/dashboard/ajo/open-group"}  className="bg-[#440080] text-[16px] lg:text-[18px] font-medium w-fit px-6 h-[45px] rounded-md flex items-center justify-center text-white hover:bg-[#3D0073]">
                        Create a new group
                    </Link>
                </section>
           </section>
        </main>
    )
}

export default GroupHistoryPage