import { firstOpenGroupType, secondOpenGroupType, thirdOpenGroupType } from "../../../shared/types/types";
import blobToBase64 from "../../../shared/utils/convert_to_base64";

interface Prop {
    first: firstOpenGroupType;
    second: secondOpenGroupType;
    third: thirdOpenGroupType;
    groupType: string;
}

const PrepareData = ({ first, second, third, groupType }: Prop) => {
    const formData = {
        name: first.savings_title,
        description: first.savings_description === "" ? first.savings_description : null,
        currency: first.savings_currency,
        goalAmount: Number(second.total_saving_amount),
        savingFrequency: second.savings_frequency,
        startDate: second.start_date,
        endDate: second.end_date,
        depositAmount: Number(third.depositAmount),
        groupType,
        image: third.savings_image ? blobToBase64(third.savings_image as Blob) : null,
        userId: localStorage.getItem("userId") || "",
      };
     


    return formData;
}

export default PrepareData;