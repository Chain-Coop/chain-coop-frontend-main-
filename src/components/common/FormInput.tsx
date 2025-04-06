import React, { InputHTMLAttributes } from "react";
import { FormInputProps } from "../../shared/types/types";

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      error,
      className = "",
      wrapperClassName = "",
      labelClassName = "",
      inputWrapperClassName = "",
      rightElement,
      elementPosition = "right",
      helperText,
      customInput,
      type = "text",
      disabled,
      paddingY = "4",
      ...props
    },
    ref,
  ) => {
    return (
      <div className={`w-full ${wrapperClassName}`}>
        {label && (
          <label
            htmlFor={props.id}
            className={`text-textPrimary mb-2 flex font-asap text-base font-semibold ${labelClassName}`}
          >
            {label}
          </label>
        )}

        {customInput ? (
          customInput
        ) : (
          <div
            className={`relative flex items-center ${inputWrapperClassName}`}
          >
            {rightElement && elementPosition === "left" && (
              <div className="absolute left-4 self-center">{rightElement}</div>
            )}
            <input
              ref={ref}
              type={type}
              disabled={disabled}
              className={`
                w-full rounded-full border-[1px] 
                px-4 py-${paddingY} text-sm shadow-md 
                focus:border-text2 focus:outline-none focus:ring-text2
                disabled:cursor-not-allowed disabled:opacity-50
                ${error ? "border-red-500" : "border-gray-200"}
                ${rightElement && elementPosition === "right" ? "pr-12" : ""}
                ${rightElement && elementPosition === "left" ? "pl-12" : ""}
                ${className}
              `}
              {...props}
            />
            {rightElement && elementPosition === "right" && (
              <div className="absolute right-4 self-center">{rightElement}</div>
            )}
          </div>
        )}

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        {helperText && !error && <div className="mt-2">{helperText}</div>}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export default FormInput;
