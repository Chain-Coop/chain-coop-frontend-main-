import { firstOpenGroupType, secondOpenGroupType, thirdOpenGroupType } from "../../../shared/types/types";

interface Prop {
    first: firstOpenGroupType;
    second: secondOpenGroupType;
    third: thirdOpenGroupType;
    groupType: string;
    userId: string
}

const PrepareData = ({ first, second, third, groupType, userId }: Prop) => {    
    const formData = {
        name: first.savings_title,
        description: first.savings_description !== "" ? first.savings_description : null,
        currency: first.savings_currency,
        goalAmount: Number(second.total_saving_amount),
        savingFrequency: second.savings_frequency,
        startDate: second.start_date,
        endDate: second.end_date,
        depositAmount: Number(third.depositAmount),
        groupType,
        image: third.savings_image ? third.savings_image : null,
        userId,
    };
     
    return formData;
}

export default PrepareData;