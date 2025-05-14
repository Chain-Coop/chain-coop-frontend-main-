import {
  firstOpenGroupType,
  secondOpenGroupType,
  thirdOpenGroupType,
} from "../../../shared/types/types";

interface Prop {
  first: firstOpenGroupType;
  second: secondOpenGroupType;
  third: thirdOpenGroupType;
  groupType: string;
  userId: string;
}

const PrepareData = ({ first, second, third, groupType, userId }: Prop) => {
  // Convert dates to ISO format
  const startDate = new Date(second.start_date).toISOString();
  const endDate = new Date(second.end_date).toISOString();

  const formData = {
    name: first.savings_title,
    description: first.savings_description,
    currency: first.savings_currency,
    goalAmount: Number(second.total_saving_amount),
    savingFrequency: second.savings_frequency,
    startDate,
    endDate,
    depositAmount: Number(third.depositAmount),
    groupType,
    image: third.savings_image || null,
    userId,
  };

  return formData;
};

export default PrepareData;
