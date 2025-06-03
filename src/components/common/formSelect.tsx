import { iSelect } from "../../shared/types";

const FormSelect = ({
  label,
  options,
  value,
  error,
  placeholder,
  onSelect,
  name,
  className,
  bgColor,
  borderWidth,
  borderColor,
  color,
  required,
  optional,
  icon,
  readOnly,
  paddingX,
  paddingY,
  fontSize,
  labelPosition = "block",
  requiredColor = "text-red-400",
  labelGap = "gap-4",
  ...rest
}: iSelect) => {
  return (
    <div
      className={`${
        labelPosition === "flex" ? `flex items-center ${labelGap}` : ""
      }`}
    >
      {label && (
        <label
          style={{ color: color }}
          className={`${
            labelPosition === "flex" ? "whitespace-nowrap" : "mb-2 block"
          } text-${fontSize} font-normal `}
        >
          {label}{" "}
          {required && <span className={`pl-1 ${requiredColor}`}>*</span>}
          {optional && <span className="pl-1 text-[#787486] ">(Optional)</span>}
        </label>
      )}
      <div className="relative flex-1">
        {icon && (
          <span
            className={`absolute bottom-0 left-0 flex h-full cursor-pointer items-center justify-center px-3`}
          >
            {icon}
          </span>
        )}
        <select
          value={value}
          onChange={onSelect}
          name={name}
          disabled={readOnly}
          className={`block px-${paddingX ? paddingX : "4"} py-${
            paddingY ? paddingY : "2"
          } w-full rounded-md ${
            error
              ? "border-red_pry"
              : value
                ? "border-[#FFD68F]"
                : "dark:border-borderDark border-borderLight"
          } dark:text-gray_3 text-gray_4 ${className} text-gray_3 ${
            icon && "pl-8"
          }`}
          style={{
            backgroundColor: bgColor ? bgColor : "#F9FAFB",
            borderWidth: borderWidth || 1,
            borderColor: borderColor,
          }}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options?.map((option, ind) => (
            <option key={ind} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FormSelect;
