import {
  firstOpenGroupType,
  secondOpenGroupType,
  thirdOpenGroupType,
} from "../../../shared/types/types";

// Types for validation results
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface ValidationOptions {
  customRules?: {
    [key: string]: (value: any) => boolean;
  };
  customMessages?: {
    [key: string]: string;
  };
}

// Utility functions for common validations
const isNotEmpty = (value: string): boolean => value.trim().length > 0;
const isValidDate = (date: string): boolean => !isNaN(new Date(date).getTime());
const isDateBefore = (date1: string, date2: string): boolean =>
  new Date(date1) <= new Date(date2);
const isPositiveNumber = (value: number): boolean => value > 0;

// First form validation
export const validateFirstForm = (
  data: firstOpenGroupType,
  options?: ValidationOptions,
): ValidationResult => {
  const errors: string[] = [];

  if (!isNotEmpty(data.savings_title)) {
    errors.push(
      options?.customMessages?.savings_title || "Savings title is required",
    );
  }

  if (!isNotEmpty(data.savings_currency)) {
    errors.push(
      options?.customMessages?.savings_currency ||
        "Savings currency is required",
    );
  }

  // Apply custom rules if provided
  if (options?.customRules) {
    Object.entries(options.customRules).forEach(([field, rule]) => {
      if (!rule(data[field as keyof firstOpenGroupType])) {
        errors.push(
          options.customMessages?.[field] || `${field} validation failed`,
        );
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Second form validation
export const validateSecondForm = (
  data: secondOpenGroupType,
  options?: ValidationOptions,
): ValidationResult => {
  const errors: string[] = [];

  if (data.total_saving_amount === "0" || !data.total_saving_amount) {
    errors.push(
      options?.customMessages?.total_saving_amount ||
        "Total saving amount must be greater than 0",
    );
  }

  if (!isNotEmpty(data.savings_frequency)) {
    errors.push(
      options?.customMessages?.savings_frequency ||
        "Savings frequency is required",
    );
  }

  if (!isValidDate(data.start_date) || data.start_date === "Start date") {
    errors.push(
      options?.customMessages?.start_date || "Valid start date is required",
    );
  }

  if (!isValidDate(data.end_date) || data.end_date === "End date") {
    errors.push(
      options?.customMessages?.end_date || "Valid end date is required",
    );
  }

  if (
    isValidDate(data.start_date) &&
    isValidDate(data.end_date) &&
    !isDateBefore(data.start_date, data.end_date)
  ) {
    errors.push(
      options?.customMessages?.date_range ||
        "End date must be after start date",
    );
  }

  // Apply custom rules if provided
  if (options?.customRules) {
    Object.entries(options.customRules).forEach(([field, rule]) => {
      if (!rule(data[field as keyof secondOpenGroupType])) {
        errors.push(
          options.customMessages?.[field] || `${field} validation failed`,
        );
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Third form validation
export const validateThirdForm = (
  data: thirdOpenGroupType,
  options?: ValidationOptions,
): ValidationResult => {
  const errors: string[] = [];

  if (!isPositiveNumber(data.depositAmount)) {
    errors.push(
      options?.customMessages?.depositAmount ||
        "Deposit amount must be greater than 0",
    );
  }

  if (data.agree !== true) {
    errors.push(
      options?.customMessages?.agree ||
        "You must agree to the terms and conditions",
    );
  }

  // Apply custom rules if provided
  if (options?.customRules) {
    Object.entries(options.customRules).forEach(([field, rule]) => {
      if (!rule(data[field as keyof thirdOpenGroupType])) {
        errors.push(
          options.customMessages?.[field] || `${field} validation failed`,
        );
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Combined validation for all forms
export const validateAllForms = (
  firstFormData: firstOpenGroupType,
  secondFormData: secondOpenGroupType,
  thirdFormData: thirdOpenGroupType,
  options?: ValidationOptions,
): ValidationResult => {
  const firstFormResult = validateFirstForm(firstFormData, options);
  const secondFormResult = validateSecondForm(secondFormData, options);
  const thirdFormResult = validateThirdForm(thirdFormData, options);

  const allErrors = [
    ...firstFormResult.errors,
    ...secondFormResult.errors,
    ...thirdFormResult.errors,
  ];

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  };
};

// const validateFormData = (firstFormData: firstOpenGroupType, secondFormData: secondOpenGroupType, thirdFormData: thirdOpenGroupType) => {
//     const errors: string[] = [];

//     if (!validateFirstForm(firstFormData)) {
//         errors.push("Please fill in all fields in the first form.");
//     }
//     if (!validateSecondForm(secondFormData)) {
//         errors.push("Please fill in all fields in the second form.");
//     }
//     if (!validateThirdForm(thirdFormData)) {
//         errors.push("Please fill in all fields in the third form.");
//     }

//     return { errors, isValid: errors.length === 0 };
// }
// export default validateFormData;
