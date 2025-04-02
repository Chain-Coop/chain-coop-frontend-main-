import { MdOutlineArrowBackIos } from "react-icons/md"
import { Link } from "react-router-dom"
import { FaAngleLeft } from "react-icons/fa6";


import createImage from "../../../../Assets/png/dashboard/ajo/open_group_image.png"
import rightArrow from "../../../../Assets/svg/dashboard/ajo/right_arrow.svg"
import FirstOpenGroupForm from "../components/first_open_group_form"
import prevFormIcon from "../../../../Assets/svg/dashboard/ajo/prev_form.svg"
import { useState } from "react"
import { formToJSON } from "axios";
import SecondOpenGroupForm from "../components/second_open_group_form";


const CreateOpenGroup = () => {
    // list of the various forms
    const formSteps = [
        <FirstOpenGroupForm />,
        <SecondOpenGroupForm />
    ]

    // this state controls which form is rendered
    const [formStepsIndex, setFormStepsIndex] = useState<number>(0)
    return (
        <main  className="flex flex-col font-sans mb-[20px] gap-10">
            <div className="flex h-[55px] w-full items-center justify-center relative px-4 lg:px-8 bg-text2 font-sans text-xl font-semibold text-text5 lg:mt-[2em]">
                <Link to={'/dashboard/ajo'} className="absolute left-8">
                    <MdOutlineArrowBackIos className="w-[20px] h-[30px]" />
                </Link>
                <h1 className="font-[600] text-[22px] lg:text-[24px]">
                    Create Open Group
                </h1>
            </div>

            {/* OPEN SAVINGS INTRO IMAGE */}
            <section className="w-[100%] flex mt-12 items-center justify-center">
                <img src={rightArrow} alt="create new savings group" className="w-[100px] h-[80px] self-end translate-x-10" />
                <img src={createImage} alt="create new savings group" className="w-[300px] h-[215px]" />
                <img src={rightArrow} alt="create new savings group" className="w-[100px] h-[80px] self-start -translate-x-10" />
            </section>

            {/* ACTIVE FORM */}
            {
                formSteps[formStepsIndex]
            }

            <div className={ `w-[100%] flex ${formStepsIndex > 0 ? 'justify-between' : 'justify-end'} items-center mt-[20px]`}>
                {
                    formStepsIndex > 0 && (
                        <button onClick={() => {setFormStepsIndex( formStepsIndex - 1 )}} className="">
                            <img src={prevFormIcon} alt="Previous form" className="w-[40px]" />
                        </button>
                    )
                }
                <button className="bg-[#440080] rounded-lg text-white text-[20px] font-[500] tracking-tighter w-[121px] h-[47px]"  onClick={() => {setFormStepsIndex( formStepsIndex + 1 )}}>
                    Next
                </button>
            </div>
        </main>
    )
}

export default CreateOpenGroup