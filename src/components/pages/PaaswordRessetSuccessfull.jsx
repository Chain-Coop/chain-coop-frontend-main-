import success from "../../../public/images/svg/sucess.svg";
import { Pin } from "../common/Button";

const PaaswordRessetSuccessfull = () => {
  return (
    <main className="flex font-sans h-screen items-center justify-center bg-log">
      <section className="text-center lg:w-[25%]">
        <div>
          <img
            src={success}
            alt="Logo"
            className="mx-auto mb-4 sm:w-[6em] lg:w-[8em]"
          />
          <div>
            <p className="font-medium text-text1 sm:text-lg lg:text-xl">
              Password Reset Successful
            </p>
          </div>
          <div className="mt-[2em]">
            <Pin text="Continue" className="sm:text-lg" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default PaaswordRessetSuccessfull;
