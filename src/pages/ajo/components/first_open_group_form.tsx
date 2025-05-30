import React from "react";
import { firstOpenGroupType } from "../../../shared/types/types";
import FormInput from "../../../components/common/FormInput";

// Import currency icons
import bitcoinIcon from "../../../Assets/svg/dashboard/bitcoin.svg";
import usdcIcon from "../../../Assets/svg/dashboard/usd.svg";
import usdtIcon from "../../../Assets/svg/dashboard/usdt.svg";
import nairaIcon from "../../../Assets/svg/dashboard/ajo/naira_icon.svg";
import activeIcon from "../../../Assets/svg/dashboard/ajo/selectedIcon.svg";

export interface CurrencyOption {
  name: string;
  icon: string;
  value: string;
}

export interface FirstOpenGroupFormProps {
  // Required props
  data: firstOpenGroupType;
  setData: React.Dispatch<React.SetStateAction<firstOpenGroupType>>;

  // Optional props
  currencyOptions?: CurrencyOption[];

  // Customization props
  className?: string;
  formClassName?: string;
  titleInputClassName?: string;
  titleLabelClassName?: string;
  descriptionClassName?: string;
  descriptionLabelClassName?: string;
  descriptionTextareaClassName?: string;
  currencySectionClassName?: string;
  currencyLabelClassName?: string;
  currencyOptionsClassName?: string;
  currencyOptionClassName?: string;
  currencyOptionActiveClassName?: string;
  currencyIconClassName?: string;
  currencyTextClassName?: string;
  activeIconClassName?: string;

  // Custom callbacks
  onTitleChange?: (value: string) => void;
  onDescriptionChange?: (value: string) => void;
  onCurrencySelect?: (currency: string, icon: string) => void;
}

const defaultCurrencyOptions: CurrencyOption[] = [
  { name: "Bitcoin", icon: bitcoinIcon, value: "BTC" },
  { name: "USDC", icon: usdcIcon, value: "USDC" },
  { name: "USDT", icon: usdtIcon, value: "USDT" },
  { name: "Naira", icon: nairaIcon, value: "₦" },
];

const FirstOpenGroupForm: React.FC<FirstOpenGroupFormProps> = ({
  data,
  setData,
  currencyOptions = defaultCurrencyOptions,
  className = "",
  formClassName = "",
  titleInputClassName = "",
  titleLabelClassName = "",
  descriptionClassName = "",
  descriptionLabelClassName = "",
  descriptionTextareaClassName = "",
  currencySectionClassName = "",
  currencyLabelClassName = "",
  currencyOptionsClassName = "",
  currencyOptionClassName = "",
  currencyOptionActiveClassName = "",
  currencyIconClassName = "",
  currencyTextClassName = "",
  activeIconClassName = "",
  onTitleChange,
  onDescriptionChange,
  onCurrencySelect,
}) => {
  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });

    if (name === "savings_title") {
      onTitleChange?.(value);
    } else if (name === "savings_description") {
      onDescriptionChange?.(value);
    }
  };

  const handleButtonSelection = (
    event: React.MouseEvent<HTMLButtonElement>,
    choice: string,
    image: string,
  ) => {
    event.preventDefault();
    setData({ ...data, savings_currency: choice, currency_image: image });
    onCurrencySelect?.(choice, image);
  };

  return (
    <form
      className={`flex w-full flex-col items-center gap-6 ${formClassName} ${className}`}
    >
      <label htmlFor="savings_title" className="flex w-full flex-col gap-2">
        <FormInput
          label="Group Title"
          type="text"
          onChange={handleTextChange}
          value={data.savings_title}
          name="savings_title"
          className={`rounded-lg border-2 border-[#95949480] shadow-lg focus:shadow-xl ${titleInputClassName}`}
          labelClassName={`text-lg ${titleLabelClassName}`}
        />
      </label>

      <label
        htmlFor="savings_description"
        className={`flex w-full flex-col gap-2 ${descriptionClassName}`}
      >
        <span
          className={`text-lg font-semibold tracking-tighter ${descriptionLabelClassName}`}
        >
          Group Description <span className="text-[#1E1E1E66]">(Optional)</span>
        </span>
        <textarea
          rows={3}
          value={data.savings_description}
          onChange={handleTextChange}
          name="savings_description"
          id="savings_description"
          className={`rounded-lg border-2 border-[#95949480] px-4 py-2 text-[16px] font-[400] text-[#1E1E1E] shadow-lg outline-none focus:shadow-xl ${descriptionTextareaClassName}`}
        />
      </label>

      <section
        className={`flex w-full flex-col gap-4 ${currencySectionClassName}`}
      >
        <span
          className={`text-lg font-semibold tracking-tighter ${currencyLabelClassName}`}
        >
          What currency are you saving on?
        </span>
        <div
          className={`flex max-w-md justify-between gap-10 ${currencyOptionsClassName}`}
        >
          <div className="flex w-full flex-col gap-8">
            {currencyOptions.slice(0, 2).map((option) => (
              <button
                key={option.value}
                onClick={(event) =>
                  handleButtonSelection(event, option.value, option.icon)
                }
                className={`flex w-fit items-center justify-center gap-3 rounded-lg border-2 bg-[#ECE6F2] p-2 px-3 hover:border-[#440080] ${
                  data.savings_currency === option.value
                    ? `border-[#440080] ${currencyOptionActiveClassName}`
                    : `border-transparent ${currencyOptionClassName}`
                }`}
              >
                <img
                  src={option.icon}
                  alt={option.name}
                  className={`w-[20px] ${currencyIconClassName}`}
                />
                <span
                  className={`font-[600] tracking-tighter text-[#302B2B] ${currencyTextClassName}`}
                >
                  {option.name}
                </span>
                {data.savings_currency === option.value && (
                  <img
                    src={activeIcon}
                    alt="Selected"
                    className={`w-[20px] ${activeIconClassName}`}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex w-full flex-col gap-8">
            {currencyOptions.slice(2).map((option) => (
              <button
                key={option.value}
                onClick={(event) =>
                  handleButtonSelection(event, option.value, option.icon)
                }
                className={`flex w-fit items-center justify-center gap-3 rounded-lg border-2 bg-[#ECE6F2] p-2 px-3 hover:border-[#440080] ${
                  data.savings_currency === option.value
                    ? `border-[#440080] ${currencyOptionActiveClassName}`
                    : `border-transparent ${currencyOptionClassName}`
                }`}
              >
                <img
                  src={option.icon}
                  alt={option.name}
                  className={`w-[20px] ${currencyIconClassName}`}
                />
                <span
                  className={`font-[600] tracking-tighter text-[#302B2B] ${currencyTextClassName}`}
                >
                  {option.name}
                </span>
                {data.savings_currency === option.value && (
                  <img
                    src={activeIcon}
                    alt="Selected"
                    className={`w-[20px] ${activeIconClassName}`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>
    </form>
  );
};

export default FirstOpenGroupForm;
