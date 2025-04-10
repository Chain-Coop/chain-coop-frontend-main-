import { GroupCardProps } from './group_card'
import GroupCard from './group_card'
import { Typography } from "@material-tailwind/react";


interface GroupHistoryTemplateTypes {
    title: string
    description: string
    length: string
    buttonText: string;
    onClick: () => void;
    historyList: GroupCardProps[]
}

const GroupHistoryTemplate = (props: GroupHistoryTemplateTypes) => {
    return (
        <div className='flex flex-col gap-0 w-[100%] h-[500px] overflow-y-auto scrollbar-hide'>
            <h5 className='text-[#1E1E1E] font-[500] text-[20px] lg:text-[22px]'>
                {props.title}
            </h5>
            <Typography className='font-asap font-[400] text-[16px] text-[#6E6C6C] mb-3'>
                {props.description}
            </Typography>
            <h5 className='text-[#1E1E1E] font-[500] text-[16px] mb-3'>
                {props.length}
            </h5>
            <div className='flex flex-wrap justify-between gap-4 pb-8'>
                {
                    props.historyList.map((group: GroupCardProps, index: number) => (
                        <GroupCard key={index} amount={group.amount} goal={group.goal} icon={group.icon} image={group.image} members={group.members} name={group.name} progress={group.progress} totalSaved={group.totalSaved} buttonText={props.buttonText} onClick={props.onClick} />
                    ))
                }
            </div>
        </div>
    )
}

export default GroupHistoryTemplate