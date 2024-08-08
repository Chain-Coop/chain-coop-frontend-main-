import { useNavigate } from "react-router";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { IoIosArrowBack } from "react-icons/io";
import withdraw from "../../../../Assets/svg/dashboard/wallet/withdraw.svg";
import xlamation from "../../../../Assets/svg/dashboard/wallet/xclamation.svg";

const SelectBank = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  const BankAccount = () => {
    navigate("/dashboard/wallet/bank-account");
  };

  return (
    <main className="items-center font-sans">
      <header className="mt-[2em]">
<<<<<<< HEAD
        <DashboardHeader className="cursor-pointer" onClick={handleBackClick}>
          <div className="flex w-[55%] items-center justify-between">
            <IoIosArrowBack size={25} className="cursor-pointer" />
=======
        <DashboardHeader>
          <div className="flex w-[55%] items-center justify-between">
            <IoIosArrowBack
              size={25}
              className="cursor-pointer"
              onClick={handleBackClick}
            />
>>>>>>> 10cf39ba59df1c53433ab269595f99f4750d01bf
            <div className="tracking-wide">
              <h1>Select Bank</h1>
            </div>
          </div>
        </DashboardHeader>
      </header>
      <article>
        <div className="px-[1em]">
          <div className="mt-[2em] flex w-full gap-[1em] rounded-lg bg-Dh px-[1.5em] py-[1em] font-medium">
            <img src={xlamation} alt="" />
            <p>
              Withdraws can only be made to bank account that match the name of
              your Chain Coop account
            </p>
          </div>
          <div className="mt-[2em] text-center">
            <div className="flex justify-center">
              <img src={withdraw} alt="withdraw" />
            </div>
            <p className="mt-[1em] text-howtext">{`You haven't added any bank yet`}</p>
          </div>
          <button
            className="mt-[2em] flex w-full justify-center gap-[1em] rounded-lg bg-Dh px-[1.5em] py-[1em] font-semibold text-text2"
            onClick={BankAccount}
          >
            <p>Add a new bank account</p>
          </button>
        </div>
      </article>
    </main>
  );
};

export default SelectBank;
