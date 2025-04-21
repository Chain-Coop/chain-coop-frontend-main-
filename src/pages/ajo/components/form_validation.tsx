import { firstOpenGroupType, secondOpenGroupType, thirdOpenGroupType } from "../../../shared/types/types";

const validateFirstForm = (data: firstOpenGroupType): boolean => {
    return !(data.savings_title.trim() && data.savings_currency.trim());
};

const validateSecondForm = (data: secondOpenGroupType): boolean => {
    return !(
        (data.total_saving_amount !== "0") &&
        data.savings_frequency.trim() &&
        (data.start_date !== "Start date" && !isNaN(new Date(data.start_date).getTime())) &&
        (data.end_date !== "End date" && !isNaN(new Date(data.end_date).getTime())) &&
        new Date(data.start_date) <= new Date(data.end_date)
    );
};

const validateThirdForm = (data: thirdOpenGroupType): boolean => {
    return !(data.daily_deposit > 0  && (data.agree === true));
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

export  {
    validateFirstForm,
    validateSecondForm,
    validateThirdForm
} 