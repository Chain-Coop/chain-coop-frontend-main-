import React, { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  inputWrapperClassName?: string;
  rightElement?: React.ReactNode;
  helperText?: React.ReactNode;
  customInput?: React.ReactNode;
}

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
      helperText,
      customInput,
      type = "text",
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={`w-full ${wrapperClassName}`}>
        {label && (
          <label
            htmlFor={props.id}
            className={`text-textPrimary mb-2 flex text-base font-semibold ${labelClassName}`}
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
            <input
              ref={ref}
              type={type}
              disabled={disabled}
              className={`
                h-[4em] w-full rounded-full border-[1px] 
                px-4 text-sm shadow-md 
                focus:border-text2 focus:outline-none focus:ring-text2
                disabled:cursor-not-allowed disabled:opacity-50
                ${error ? "border-red-500" : "border-gray-200"}
                ${rightElement ? "pr-12" : "pr-4"}
                ${className}
              `}
              {...props}
            />
            {rightElement && (
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
