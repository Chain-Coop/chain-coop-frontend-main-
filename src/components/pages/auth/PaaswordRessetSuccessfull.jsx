import { useNavigate } from "react-router";
import success from "../../../Assets/svg/auth/sucess.svg";
import { Primary } from "../../common/Button";

const PaaswordRessetSuccessfull = () => {
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
  };
  return (
    <main className="flex h-screen items-center justify-center bg-log font-sans">
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

          <Primary
            className="w-[10em] rounded-full bg-text2 py-3 font-medium text-text5 sm:text-lg lg:mt-[2em]"
            onClick={login}
          >
            Continue
          </Primary>
        </div>
      </section>
    </main>
  );
};

export default PaaswordRessetSuccessfull;
