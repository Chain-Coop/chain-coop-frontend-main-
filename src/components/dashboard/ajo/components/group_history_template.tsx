import { GroupCardProps } from './group_card'
import GroupCard from './group_card'

interface GroupHistoryTemplateTypes {
    title: string
    description: string
    length: string
    historyList: GroupCardProps[]
}

const GroupHistoryTemplate = (props: GroupHistoryTemplateTypes) => {
    return (
        <div className='flex flex-col gap-0 w-[100%] h-[500px] overflow-y-auto scrollbar-hide'>
            <h5 className='text-[#1E1E1E] font-[500] text-[20px] lg:text-[22px]'>
                {props.title}
            </h5>
            <p className='font-[400] text-[16px] lg:text-[18px] text-[#6E6C6C] mb-3'>
                {props.description}
            </p>
            <h5 className='text-[#1E1E1E] font-[500] text-[16px] lg:text-[18px] mb-3'>
                {props.length}
            </h5>
            <div className='flex flex-col gap-4 pb-8 '>
                {
                    props.historyList.map((group: GroupCardProps, index: number) => (
                        <GroupCard key={index} amount={group.amount} goal={group.goal} icon={group.icon} image={group.image} members={group.members} name={group.name} progress={group.progress} totalSaved={group.totalSaved} />
                    ))
                }
            </div>
        </div>
    )
}

export default GroupHistoryTemplate