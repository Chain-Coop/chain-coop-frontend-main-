import { useRef, useState } from "react";
import { CgCalendarDates } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";
import { secondOpenGroupType } from "../../../shared/types/types";
import activeIcon from "../../../Assets/svg/dashboard/ajo/selectedIcon.svg";
import formatAmountWithCommas from "../../../shared/utils/format_amount_with_commas";

export interface FrequencyOption {
  label: string;
  value: string;
}

export interface SecondOpenGroupFormProps {
  // Required props
  data: secondOpenGroupType;
  setData: React.Dispatch<React.SetStateAction<secondOpenGroupType>>;

  // Optional props
  frequencyOptions?: FrequencyOption[];
  maxMembers?: number;

  // Customization props
  className?: string;
  formClassName?: string;
  amountSectionClassName?: string;
  amountLabelClassName?: string;
  amountInputClassName?: string;
  frequencySectionClassName?: string;
  frequencyLabelClassName?: string;
  frequencyOptionsClassName?: string;
  frequencyOptionClassName?: string;
  frequencyOptionActiveClassName?: string;
  frequencyTextClassName?: string;
  activeIconClassName?: string;
  durationSectionClassName?: string;
  durationLabelClassName?: string;
  dateInputClassName?: string;
  dateInputWrapperClassName?: string;
  dateIconClassName?: string;
  dateTextClassName?: string;
  membersSectionClassName?: string;
  membersLabelClassName?: string;
  memberItemClassName?: string;
  memberTextClassName?: string;
  removeButtonClassName?: string;
  addMemberInputClassName?: string;
  addMemberButtonClassName?: string;

  // Custom callbacks
  onAmountChange?: (value: string) => void;
  onFrequencyChange?: (frequency: string) => void;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
  onMemberAdd?: (member: string) => void;
  onMemberRemove?: (index: number) => void;
}

const defaultFrequencyOptions: FrequencyOption[] = [
  { label: "Daily", value: "Daily" },
  { label: "Weekly", value: "Weekly" },
  { label: "Monthly", value: "Monthly" },
  { label: "Quarterly", value: "Quarterly" },
];

const SecondOpenGroupForm: React.FC<SecondOpenGroupFormProps> = ({
  data,
  setData,
  frequencyOptions = defaultFrequencyOptions,
  maxMembers,
  className = "",
  formClassName = "",
  amountSectionClassName = "",
  amountLabelClassName = "",
  amountInputClassName = "",
  frequencySectionClassName = "",
  frequencyLabelClassName = "",
  frequencyOptionsClassName = "",
  frequencyOptionClassName = "",
  frequencyOptionActiveClassName = "",
  frequencyTextClassName = "",
  activeIconClassName = "",
  durationSectionClassName = "",
  durationLabelClassName = "",
  dateInputClassName = "",
  dateInputWrapperClassName = "",
  dateIconClassName = "",
  dateTextClassName = "",
  membersSectionClassName = "",
  membersLabelClassName = "",
  memberItemClassName = "",
  memberTextClassName = "",
  removeButtonClassName = "",
  addMemberInputClassName = "",
  addMemberButtonClassName = "",
  onAmountChange,
  onFrequencyChange,
  onStartDateChange,
  onEndDateChange,
  onMemberAdd,
  onMemberRemove,
}) => {
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const [memberInput, setMemberInput] = useState("");
  const [showMemberInput, setShowMemberInput] = useState(false);

  const openStartDate = () => {
    startDateRef.current?.showPicker();
  };

  const openEndDate = () => {
    endDateRef.current?.showPicker();
  };

  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = event.target.value.replace(/,/g, "");
    if (!/^\d*$/.test(rawValue)) return;

    setData((prev) => ({
      ...prev,
      total_saving_amount: rawValue,
    }));
    onAmountChange?.(rawValue);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });

    if (name === "start_date") {
      onStartDateChange?.(value);
    } else if (name === "end_date") {
      onEndDateChange?.(value);
    }
  };

  const handleButtonSelection = (
    event: React.MouseEvent<HTMLButtonElement>,
    choice: string,
  ) => {
    event.preventDefault();
    setData({ ...data, savings_frequency: choice });
    onFrequencyChange?.(choice);
  };

  const handleAddMember = () => {
    if (memberInput.trim()) {
      if (maxMembers && data.members?.length >= maxMembers) {
        return;
      }
      setData((prev) => ({
        ...prev,
        members: [...(prev.members || []), memberInput.trim()],
      }));
      onMemberAdd?.(memberInput.trim());
      setMemberInput("");
      setShowMemberInput(false);
    }
  };

  const handleRemoveMember = (index: number) => {
    setData((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }));
    onMemberRemove?.(index);
  };

  return (
    <form
      className={`flex w-full flex-col items-center gap-6 ${formClassName} ${className}`}
    >
      <label
        htmlFor="total_saving_amount"
        className={`flex w-full flex-col gap-2 ${amountSectionClassName}`}
      >
        <span
          className={`text-lg font-semibold tracking-tighter ${amountLabelClassName}`}
        >
          Total Saving Amount
        </span>
        <input
          autoFocus
          type="text"
          onChange={handleAmount}
          value={formatAmountWithCommas(data.total_saving_amount)}
          name="total_saving_amount"
          id="total_saving_amount"
          className={`rounded-lg border-2 border-[#95949480] px-4 py-2 text-[16px] font-[400] text-[#1E1E1E] shadow-lg outline-none focus:shadow-xl ${amountInputClassName}`}
        />
      </label>

      <div
        className={`flex w-full flex-col gap-2 ${frequencySectionClassName}`}
      >
        <span
          className={`text-lg font-semibold tracking-tighter ${frequencyLabelClassName}`}
        >
          Select Savings Frequency
        </span>
        <div
          className={`flex w-full flex-wrap justify-between gap-1 gap-y-3 ${frequencyOptionsClassName}`}
        >
          {frequencyOptions.map((option) => (
            <button
              key={option.value}
              onClick={(event) => handleButtonSelection(event, option.value)}
              className={`flex w-[48%] items-center justify-between rounded-lg border-2 bg-[#ECE6F2] p-2 hover:border-[#440080] sm:w-[150px] ${
                data.savings_frequency === option.value
                  ? `border-[#440080] ${frequencyOptionActiveClassName}`
                  : `border-transparent ${frequencyOptionClassName}`
              }`}
            >
              <span
                className={`font-[600] capitalize tracking-tighter text-[#302B2B] ${frequencyTextClassName}`}
              >
                {option.label}
              </span>
              {data.savings_frequency === option.value && (
                <img
                  src={activeIcon}
                  alt={`${option.label} savings`}
                  className={`w-[20px] ${activeIconClassName}`}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className={`flex w-full flex-col gap-2 ${durationSectionClassName}`}>
        <span
          className={`text-lg font-semibold tracking-tighter ${durationLabelClassName}`}
        >
          Daily Duration
        </span>
        <div className="flex flex-col gap-4">
          <div
            className={`relative flex w-full items-center justify-between rounded-lg border-2 border-[#95949480] p-2 shadow-lg outline-none focus:shadow-xl ${dateInputWrapperClassName}`}
            onClick={openStartDate}
          >
            <span
              className={`text-[18px] font-[400] text-[#1E1E1E] opacity-60 ${dateTextClassName}`}
            >
              {data.start_date || "Start date"}
            </span>
            <CgCalendarDates
              className={`h-[16px] w-[16px] text-[#440080] ${dateIconClassName}`}
            />
            <input
              type="date"
              name="start_date"
              onChange={handleChange}
              value={data.start_date}
              max={data.end_date}
              ref={startDateRef}
              id="start_date"
              className={`absolute opacity-0 ${dateInputClassName}`}
            />
          </div>
          <div
            className={`relative flex w-full items-center justify-between rounded-lg border-2 border-[#95949480] p-2 shadow-lg outline-none focus:shadow-xl ${dateInputWrapperClassName}`}
            onClick={openEndDate}
          >
            <span
              className={`text-[18px] font-[400] text-[#1E1E1E] opacity-60 ${dateTextClassName}`}
            >
              {data.end_date || "End date"}
            </span>
            <CgCalendarDates
              className={`h-[16px] w-[16px] text-[#440080] ${dateIconClassName}`}
            />
            <input
              type="date"
              ref={endDateRef}
              onChange={handleChange}
              value={data.end_date}
              min={data.start_date}
              name="end_date"
              id="end_date"
              className={`absolute opacity-0 ${dateInputClassName}`}
            />
          </div>
        </div>
        <span className="text-[14px] font-[400] text-[#1E1E1E] opacity-60">
          Set until this savings group last
        </span>
      </div>

      <div className={`flex w-full flex-col gap-2 ${membersSectionClassName}`}>
        <span
          className={`text-lg font-semibold tracking-tighter ${membersLabelClassName}`}
        >
          Add Members
        </span>
        <div className="flex flex-col gap-4">
          {data.members?.map((member, index) => (
            <div
              key={index}
              className={`flex items-center justify-between rounded-lg border-2 border-[#95949480] p-2 ${memberItemClassName}`}
            >
              <span
                className={`text-[16px] text-[#1E1E1E] ${memberTextClassName}`}
              >
                {member}
              </span>
              <button
                onClick={() => handleRemoveMember(index)}
                className={`text-red-500 hover:text-red-700 ${removeButtonClassName}`}
              >
                Remove
              </button>
            </div>
          ))}
          {showMemberInput ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={memberInput}
                onChange={(e) => setMemberInput(e.target.value)}
                placeholder="Enter username or email"
                className={`flex-1 rounded-lg border-2 border-[#95949480] px-4 py-2 text-[16px] font-[400] text-[#1E1E1E] shadow-lg outline-none focus:shadow-xl ${addMemberInputClassName}`}
              />
              <button
                onClick={handleAddMember}
                className={`rounded-lg bg-[#440080] px-4 py-2 text-white ${addMemberButtonClassName}`}
              >
                Add
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowMemberInput(true)}
              className={`flex items-center gap-2 rounded-lg bg-[#ECE6F2] px-4 py-2 text-[#440080] ${addMemberButtonClassName}`}
            >
              <FaPlus /> Add Member
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default SecondOpenGroupForm;
