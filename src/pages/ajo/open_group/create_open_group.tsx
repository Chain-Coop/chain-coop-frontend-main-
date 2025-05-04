import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

import createImage from "../../../Assets/png/dashboard/ajo/open_group_image.png";
import rightArrow from "../../../Assets/svg/dashboard/ajo/right_arrow.svg";
import FirstOpenGroupForm from "../components/first_open_group_form";
import prevFormIcon from "../../../Assets/svg/dashboard/ajo/prev_form.svg";
import { useEffect, useState } from "react";
import SecondOpenGroupForm from "../components/second_open_group_form";
import ThirdOpenGroupForm from "../components/third_open_group_form";
import {
  firstOpenGroupType,
  secondOpenGroupType,
  thirdOpenGroupType,
} from "../../../shared/types/types";
import {
  validateFirstForm,
  validateSecondForm,
  validateThirdForm,
} from "../components/form_validation";
import ReviewOpenGroupForm from "../components/review_open_group_form";
import SuccessModal from "../components/success_modal";
import { IoIosArrowBack } from "react-icons/io";
import { DashboardHeader } from "../../../components/common/DashboardHeader";
import PrepareData from "./prepare_data";
import createSavingsCircle from "../../../shared/redux/services/web_savings_group.services";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../shared/redux/store";
import { toast } from "react-toastify";



const CreateOpenGroup = () => {
  const profileDetails = useSelector(
    (state: any) => state?.landing?.getProfile,
  );

  const [firstFormData, setFirstFormData] = useState<firstOpenGroupType>({
    savings_title: "",
    savings_description: "",
    savings_currency: "",
    currency_image: "",
  });

  const [secondFormData, setSecondFormData] = useState<secondOpenGroupType>({
    total_saving_amount: "",
    savings_frequency: "",
    start_date: "Start date",
    end_date: "End date",
  });

  const [thirdFormData, setThirdFormData] = useState<thirdOpenGroupType>({
    depositAmount: 30,
    savings_image: null,
    agree: false,
  });

  const dispatch: AppDispatch = useDispatch();

  // state to manage loading
  const [loading, setLoading] = useState<boolean>(false);

  // state to toggle whether the next button is disabled or not
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);

  // state to open modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

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
      currency={firstFormData.savings_currency}
      total_saving_amount={secondFormData.total_saving_amount}
      savings_frequency={secondFormData.savings_frequency}
      setData={setThirdFormData}
      key={2}
    />,
    <ReviewOpenGroupForm
      firstForm={firstFormData}
      secondForm={secondFormData}
      thirdForm={thirdFormData}
      key={3}
    />,
  ];

  // this state controls which form is rendered
  const [formStepsIndex, setFormStepsIndex] = useState<number>(0);

  const validateInputs = () => {
    // perform different validation checks based on the current form step
    if (formStepsIndex === 0) {
      setIsNextDisabled(validateFirstForm(firstFormData));
    } else if (formStepsIndex === 1) {
      setIsNextDisabled(validateSecondForm(secondFormData));
    } else if (formStepsIndex === 2) {
      setIsNextDisabled(validateThirdForm(thirdFormData));
    }
  };

  useEffect(() => {
    validateInputs();
  }, [firstFormData, secondFormData, thirdFormData]);

  const nextForm = () => {
    setFormStepsIndex((prev) => prev + 1);
    validateInputs();
  };

  const createCircle = () => {
    setLoading(true);

    const formData = PrepareData({
      first: firstFormData,
      second: secondFormData,
      third: thirdFormData,
      groupType: "open",
      userId: profileDetails?.userId,
    });

    dispatch(createSavingsCircle(formData))
      .unwrap()
      .then((response: any) => {
          setLoading(false);
          if (response?.status === 200) {
            console.log(response?.data)
            toast.success(response?.data?.msg);
            setIsModalOpen(true);
          } else if (response?.status === 400) {
            console.log(response?.data)
          }
        })
        .catch((error: any) => {
          setLoading(false);
          const errorMessage = error;
          toast.error(errorMessage);
        });
  }


  // function to navigate back to ajo page
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <main className="mb-[20px] flex  font-asap  flex-col gap-10">
      <DashboardHeader
        className="relative cursor-pointer items-center lg:mt-[2em]"
        onClick={handleBackClick}
      >
        <IoIosArrowBack size={25} className="absolute left-0 cursor-pointer" />
        <div className="flex flex-grow items-center justify-center">
          <div className="tracking-wide">Create Open Group</div>
        </div>
      </DashboardHeader>

      <section className="mb-[20px] flex  flex-col gap-10">
        {/* OPEN SAVINGS INTRO IMAGE */}
        <section className="mt-12 flex w-[100%] items-center justify-center">
          <img
            src={rightArrow}
            alt="create new savings group"
            className="h-[80px]  hidden sm:block w-[100px] translate-x-10 self-end"
          />
          <img
            src={createImage}
            alt="create new savings group"
            className="h-[215px] w-[100%] sm:w-[300px]"
          />
          <img
            src={rightArrow}
            alt="create new savings group"
            className="h-[80px]  hidden sm:block w-[100px] -translate-x-10 self-start"
          />
        </section>

        {/* ACTIVE FORM */}
        {formSteps[formStepsIndex]}

        <div
          className={`flex w-[100%] 2xl:w-[80%] self-center ${formStepsIndex > 0 ? "justify-between" : "justify-end"} mt-[20px] items-center`}
        >
          {formStepsIndex > 0 && (
            <Button
              onClick={() => {
                setFormStepsIndex(formStepsIndex - 1);
              }}
              className="bg-transparent shadow-none"
            >
              <img
                src={prevFormIcon}
                alt="Previous form"
                className="w-[40px]"
              />
            </Button>
          )}
          {formStepsIndex > 2 ? (
            <Button
              className={`h-[47px] w-fit rounded-lg bg-[#440080] text-[18px] font-[500] capitalize tracking-tighter font-asap text-white `}
              onClick={createCircle}
              loading={loading}
            >
              Create group
            </Button>
          ) : (
            <Button
              className={`h-[47px] w-[121px] rounded-lg bg-[#440080] text-[20px] font-[500] capitalize tracking-tighter text-white font-asap ${isNextDisabled ? "cursor-not-allowed opacity-70" : ""}`}
              onClick={nextForm}
              disabled={isNextDisabled}
            >
              Next
            </Button>
          )}
        </div>
      </section>
      {isModalOpen && <SuccessModal />}
    </main>
  );
};

export default CreateOpenGroup;
