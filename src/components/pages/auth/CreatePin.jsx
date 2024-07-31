import { Primary } from "../../common/Button";
import OTPInput from "react-otp-input";

const CreatePin = () => {
  return (
    <main className="flex h-screen items-center justify-center bg-log font-sans">
      <section className="text-center  md:w-[55%]">
        <div className="px-[2em]">
          <header>
            <h1 className="mb-4 text-3xl font-semibold text-text2">
              Create a 4 digit-pin
            </h1>
            <p className="font-medium text-howtext md:text-lg lg:text-base">
              {`you'll use this pin to Authorize your transaction`}
            </p>
          </header>
          <form className="flex justify-center rounded-lg border-gray-200  px-3 py-2 ">
            <div className="flex space-x-5" data-hs-pin-input="">
              <OTPInput
                skipDefaultStyles={true}
                containerStyle={"gap-3 my-5"}
                numInputs={4}
                inputStyle={
                  "block lg:h-[55px] lg:w-[55px] sm:h-[50px] sm:w-[35px] text-center border-gray-200 rounded-md text-sm placeholder:text-gray-300 focus:border-text2 focus:ring-text2 disabled:opacity-50 disabled:pointer-events-none  dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                }
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>
          </form>

          <Primary className="w-[10em] rounded-full bg-text2 py-3 font-medium text-text5 sm:text-lg lg:mt-[2em]">
            Create Pin
          </Primary>
        </div>
      </section>
    </main>
  );
};

export default CreatePin;
