import { GroupCardProps } from "./group_card";
import GroupCard from "./group_card";
import { Typography } from "@material-tailwind/react";

interface GroupHistoryTemplateTypes {
  title: string;
  description: string;
  length: string;
  buttonText: string;
  onClick: () => void;
  historyList: GroupCardProps[];
}

const GroupHistoryTemplate = (props: GroupHistoryTemplateTypes) => {
  return (
    <div className="scrollbar-hide flex h-[600px] w-[100%] flex-shrink-0 flex-col gap-0 overflow-auto whitespace-nowrap">
      <h5 className="text-[20px] font-[500] text-[#1E1E1E] lg:text-[22px]">
        {props.title}
      </h5>
      <Typography className="mb-3 font-asap text-[16px] font-[400] text-[#6E6C6C]">
        {props.description}
      </Typography>
      <h5 className="mb-3 text-[16px] font-[500] text-[#1E1E1E]">
        {props.length}
      </h5>
      <div className="flex flex-shrink-0 flex-wrap justify-between gap-4  pb-8">
        {props.historyList.map((group: GroupCardProps, index: number) => (
          <GroupCard
            key={index}
            amount={group.amount}
            goal={group.goal}
            icon={group.icon}
            image={group.image}
            members={group.members}
            name={group.name}
            progress={group.progress}
            balance={group.balance}
            buttonText={props.buttonText}
            onClick={props.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupHistoryTemplate;
