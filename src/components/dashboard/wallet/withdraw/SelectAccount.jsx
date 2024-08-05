import { useNavigate } from "react-router";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { Primary } from "../../../common/Button";
import { IoIosArrowBack } from "react-icons/io";

const SelectAccount = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const verifyAccount = () => {
    navigate("/dashboard/wallet/verify-account");
  };

  return (
    <main className="font-sans">
      <header className="mt-[2em]">
        <DashboardHeader className="cursor-pointer" onClick={handleBackClick}>
          <div className="flex w-[65%] items-center justify-between">
            <IoIosArrowBack size={25} className="cursor-pointer" />
            <div className="tracking-wide">
              <h1>Select Account</h1>
            </div>
          </div>
        </DashboardHeader>
      </header>
      <Primary
        className="mt-[2em] w-full bg-text2 py-3 text-white"
        onClick={verifyAccount}
      >
        Submit
      </Primary>
    </main>
  );
};

export default SelectAccount;
