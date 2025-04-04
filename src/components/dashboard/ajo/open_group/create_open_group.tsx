import { MdOutlineArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";

import createImage from "../../../../Assets/png/dashboard/ajo/open_group_image.png";
import rightArrow from "../../../../Assets/svg/dashboard/ajo/right_arrow.svg";
import FirstOpenGroupForm from "../components/first_open_group_form";
import prevFormIcon from "../../../../Assets/svg/dashboard/ajo/prev_form.svg";
import { useEffect, useState } from "react";
import SecondOpenGroupForm from "../components/second_open_group_form";
import ThirdOpenGroupForm from "../components/third_open_group_form";
import {
  firstOpenGroupType,
  secondOpenGroupType,
  thirdOpenGroupType,
} from "../../../../shared/types/types";
import {
  validateFirstForm,
  validateSecondForm,
  validateThirdForm,
} from "../components/form_validation";

const CreateOpenGroup = () => {
  const [firstFormData, setFirstFormData] = useState<firstOpenGroupType>({
    savings_title: "",
    savings_description: "",
    savings_currency: "",
  });

  const [secondFormData, setSecondFormData] = useState<secondOpenGroupType>({
    total_saving_amount: "",
    savings_frequency: "",
    start_date: "Start date",
    end_date: "End date",
  });

  const [thirdFormData, setThirdFormData] = useState<thirdOpenGroupType>({
    daily_deposit: 30,
    savings_image: null,
    agree: false,
  });

  // state to toggle whether the next button is disabled or not
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);

  // list of the various forms
  const formSteps = [
    <FirstOpenGroupForm
      data={firstFormData}
      setData={setFirstFormData}
      key={0}
    />,
    <SecondOpenGroupForm
      data={secondFormData}
      setData={setSecondFormData}
      key={1}
    />,
    <ThirdOpenGroupForm
      data={thirdFormData}
      setData={setThirdFormData}
      key={2}
    />,
  ];

  // this state controls which form is rendered
  const [formStepsIndex, setFormStepsIndex] = useState<number>(2);

  useEffect(() => {
    // perform different validation checks based on the current form step
    if (formStepsIndex === 0) {
      setIsNextDisabled(validateFirstForm(firstFormData));
    } else if (formStepsIndex === 1) {
      setIsNextDisabled(validateSecondForm(secondFormData));
    } else if (formStepsIndex === 2) {
      setIsNextDisabled(validateThirdForm(thirdFormData));
    }
  }, [firstFormData, secondFormData, thirdFormData]);

  const nextForm = () => {
    setFormStepsIndex((prev) => prev + 1);
    setIsNextDisabled(true);
  };

  return (
    <main className="mb-[20px] flex flex-col gap-10 font-sans">
      <div className="relative flex h-[55px] w-full items-center justify-center bg-text2 px-4 font-sans text-xl font-semibold text-text5 lg:mt-[2em] lg:px-8">
        <Link to={"/dashboard/ajo"} className="absolute left-8">
          <MdOutlineArrowBackIos className="h-[30px] w-[20px]" />
        </Link>
        <h1 className="text-[22px] font-[600] lg:text-[24px]">
          Create Open Group
        </h1>
      </div>

      {/* OPEN SAVINGS INTRO IMAGE */}
      <section className="mt-12 flex w-[100%] items-center justify-center">
        <img
          src={rightArrow}
          alt="create new savings group"
          className="h-[80px] w-[100px] translate-x-10 self-end"
        />
        <img
          src={createImage}
          alt="create new savings group"
          className="h-[215px] w-[300px]"
        />
        <img
          src={rightArrow}
          alt="create new savings group"
          className="h-[80px] w-[100px] -translate-x-10 self-start"
        />
      </section>

      {/* ACTIVE FORM */}
      {formSteps[formStepsIndex]}

      <div
        className={`flex w-[100%] ${formStepsIndex > 0 ? "justify-between" : "justify-end"} mt-[20px] items-center`}
      >
        {formStepsIndex > 0 && (
          <button
            onClick={() => {
              setFormStepsIndex(formStepsIndex - 1);
            }}
            className=""
          >
            <img src={prevFormIcon} alt="Previous form" className="w-[40px]" />
          </button>
        )}
        <button
          className={`h-[47px] w-[121px] rounded-lg bg-[#440080] text-[20px] font-[500] tracking-tighter text-white ${isNextDisabled ? "cursor-not-allowed opacity-70" : ""}`}
          onClick={nextForm}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default CreateOpenGroup;
