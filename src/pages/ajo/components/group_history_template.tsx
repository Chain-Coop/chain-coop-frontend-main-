import { GroupCardProps } from "./group_card";
import GroupCard from "./group_card";

export interface GroupHistoryTemplateProps {
  // Required props
  title: string;
  description: string;
  length: string;
  buttonText: string;
  onClick: () => void;
  historyList: GroupCardProps[];

  // Optional props
  emptyStateMessage?: string;
  loading?: boolean;
  error?: string;

  // Customization props
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  lengthClassName?: string;
  listContainerClassName?: string;
  cardContainerClassName?: string;

  // Custom callbacks
  onCardClick?: (group: GroupCardProps) => void;
  onError?: (error: string) => void;
}

const GroupHistoryTemplate: React.FC<GroupHistoryTemplateProps> = ({
  title,
  description,
  length,
  buttonText,
  onClick,
  historyList,
  emptyStateMessage = "No history available",
  loading = false,
  error,
  className = "",
  containerClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  lengthClassName = "",
  listContainerClassName = "",
  cardContainerClassName = "",
  onCardClick,
  onError,
}) => {
  if (loading) {
    return (
      <div
        className={`flex h-[600px] w-full items-center justify-center ${className}`}
      >
        <div className="text-lg font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    onError?.(error);
    return (
      <div
        className={`flex h-[600px] w-full items-center justify-center ${className}`}
      >
        <div className="text-lg font-medium text-red-600">{error}</div>
      </div>
    );
  }

  if (!historyList.length) {
    return (
      <div
        className={`flex h-[600px] w-full items-center justify-center ${className}`}
      >
        <div className="text-lg font-medium text-gray-600">
          {emptyStateMessage}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`scrollbar-hide flex h-[600px] w-full flex-shrink-0 flex-col gap-0 overflow-auto whitespace-nowrap ${containerClassName} ${className}`}
    >
      <h5
        className={`text-xl font-medium text-[#1E1E1E] lg:text-2xl ${titleClassName}`}
      >
        {title}
      </h5>
      <p
        className={`mb-3 text-base font-normal text-[#6E6C6C] ${descriptionClassName}`}
      >
        {description}
      </p>
      <h5
        className={`mb-3 text-base font-medium text-[#1E1E1E] ${lengthClassName}`}
      >
        {length}
      </h5>
      <div
        className={`flex flex-shrink-0 flex-wrap justify-between gap-4 pb-8 ${listContainerClassName}`}
      >
        {historyList.map((group: GroupCardProps, index: number) => (
          <div key={index} className={cardContainerClassName}>
            <GroupCard
              amount={group.amount}
              goal={group.goal}
              icon={group.icon}
              image={group.image}
              members={group.members}
              name={group.name}
              progress={group.progress}
              balance={group.balance}
              buttonText={buttonText}
              onClick={() => {
                onClick();
                onCardClick?.(group);
              }}
              circleData={group.circleData}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupHistoryTemplate;
