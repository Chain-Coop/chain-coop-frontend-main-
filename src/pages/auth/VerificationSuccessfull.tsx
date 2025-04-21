import { useNavigate, useLocation } from "react-router-dom";
import success from "../../Assets/svg/auth/sucess.svg";
import { Button, Typography } from "@material-tailwind/react";

const VerificationSuccessfull = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const navigate = useNavigate();

  const goToReset = () => {
    navigate(`/reset-password?email=${email}`);
  };

  return (
    <main className="flex h-screen items-center justify-center bg-log ">
      <section className="text-center lg:w-[35%]">
        <div>
          <img
            src={success}
            alt="Logo"
            className="mx-auto mb-4 sm:w-[6em] lg:w-[8em]"
          />
          <div className="sm:px-1">
            <Typography className="text- textPrimary font-medium sm:text-lg">
              We've sent a verification code to your email. Use it to securely
              reset your password.
            </Typography>
          </div>
          <div>
            <Button
              onClick={goToReset}
              className="mt-[1em] w-[10em] rounded-full bg-text2 py-3 font-medium text-text5 sm:text-lg  lg:mt-[2em]"
            >
              Continue
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VerificationSuccessfull;
