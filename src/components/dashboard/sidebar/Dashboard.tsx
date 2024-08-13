import React from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "../../../../src/App.css";
import DashboardNav from "../../common/DashboardNav";
import Sidebar from "./Sidebar";
import Home from "../home/Home";
import Contribution from "../contribution/Contribution";
import Wallet from "../wallet/Wallet";
import Project from "../nestedproject/Project";
import Proposal from "../proposal/Proposal";
import SubmitProposal from "../proposal/SubmitProposal";
import Profile from "../profile/Profile";
import Right from "../rightbar/Right";
import Withdraw from "../wallet/withdraw/Withdraw";
import SelectBank from "../wallet/withdraw/SelectBank";
import BankAccount from "../wallet/withdraw/BankAccount";
import SelectAccount from "../wallet/withdraw/SelectAccount";
import VerifyAccount from "../wallet/withdraw/VerifyAccount";
import FundWallet from "../wallet/fund/FundWallet";
import TransferWallet from "../wallet/transfer/main/Transfer";
import AddFund from "../wallet/transfer/fundProject/AddFund";
import ConfirmAmount from "../wallet/transfer/confirmAmount/Confirm";

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex h-screen justify-between">
      <aside className="custom-scrollbar hidden overflow-y-auto lg:block">
        <Sidebar />
      </aside>
      <section className="custom-scrollbar overflow-y-auto sm:w-full lg:w-[55%]">
        <nav className="sm:block lg:hidden">
          <DashboardNav />
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="contribution" element={<Contribution />} />

          <Route path="wallet/*" element={<Wallet />} />
          <Route path="wallet/withdraw" element={<Withdraw />} />
          <Route path="wallet/select-bank" element={<SelectBank />} />
          <Route path="wallet/bank-account" element={<BankAccount />} />
          <Route path="wallet/select-account" element={<SelectAccount />} />
          <Route path="wallet/verify-account" element={<VerifyAccount />} />

          <Route path="wallet/fund" element={<FundWallet />} />

          <Route path="wallet/transfer" element={<TransferWallet />} />
          <Route path="wallet/transfer/fund-project" element={<AddFund />} />
          <Route
            path="wallet/transfer/confirm-amount"
            element={<ConfirmAmount />}
          />

          <Route path="project" element={<Project />} />

          <Route path="proposal/*" element={<Proposal />} />
          <Route path="proposal/submit-proposal" element={<SubmitProposal />} />

          <Route path="profile" element={<Profile />} />
        </Routes>
      </section>
      <aside className="h-vh hidden w-[45%] overflow-y-auto lg:block ">
        <Right />
      </aside>
    </main>
  );
};

export default Dashboard;
