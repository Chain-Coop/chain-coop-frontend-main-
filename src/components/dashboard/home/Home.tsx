import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useUserProfile, { useAllProjects } from "../../../shared/Hooks/useUserProfile";
import { ComingSoon } from "../../common/Button";
import { IoIosNotifications } from "react-icons/io";
import useWalletBalance from "../../../shared/Hooks/useBalance";
import ToggleButton from "../../../shared/utils/ToggleButton";


const Home = () => {
  const { isWalletVisible, setIsWalletVisible, formattedBalance } =
  useWalletBalance();
  const { profileDetails } = useUserProfile();
  const { useProjects, loading } = useAllProjects();
  console.log("usePro",useProjects)

  
  const navigate = useNavigate();
  
  const addFund = () => {
    navigate("/dashboard/wallet");
  };


  return (
    <main className="mx-auto mb-[2em] px-[2em] font-sans">
      <header className="flex justify-between sm:mt-[1em] lg:mt-[2.5em]">
        <div className="font-medium">
          <p>Welcome Back!</p>
          <p className="mt-1 font-semibold">
            {profileDetails?.username || "user"}
          </p>
        </div>
        <div>
          <IoIosNotifications className="cursor-pointer fill-text4" size={27} />
        </div>
      </header>
      
      <section className="text-center text-text4">
            <div className="mx-auto mt-[2em] rounded-3xl py-[2em] shadow-md">
              <div className="flex justify-center gap-4 font-sans">
                <p className="font-medium">Total Balance</p>
                <div>
                  <ToggleButton
                    isVisible={isWalletVisible}
                    onToggle={(newVisibility) => {
                      setIsWalletVisible(newVisibility);
                      sessionStorage.setItem(
                        "walletBalanceVisible",
                        newVisibility.toString(),
                      );
                    }}
                  />
                </div>
              </div>
              <div className="mx-auto mt-[1.5em] w-[15em] rounded-md">
                {isWalletVisible ? (
                  <p className="font-bold sm:text-xl lg:text-xl">
                    {formattedBalance}
                  </p>
                ) : (
                  <p className="text-2xl font-bold">*********</p>
                )}
                <hr className="mt-[1em] h-[1px] rounded-md bg-howtext font-normal" />
              </div>
            </div>
          </section>

      <div>
        <button
          onClick={addFund}
          className="mx-auto mt-[2em] w-full rounded-3xl bg-inherit py-[1em] text-center text-lg font-semibold text-text4 shadow-md"
        >
          + Add Fund
        </button>
      </div>

      <section className="mt-[2em] w-full">
        <header>
        </header>
        <div className="mt-4 gap-[1.5em] space-y-[1.5em] sm:flex-col lg:flex lg:flex-row">
          <article>
            <div className="flex h-auto flex-col gap-[2em] rounded-xl bg-dashboardHome bg-cover bg-no-repeat p-3">
              <h1 className="text-lg font-medium uppercase text-text3">
                automated ai <br /> learning Platform
              </h1>
              <div className="mt-[3em]">
                <ComingSoon className="bg-coming2">Coming Soon</ComingSoon>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Home;

