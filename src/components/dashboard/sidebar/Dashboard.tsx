import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "../../../../src/App.css";
import DashboardNav from "../../common/DashboardNav";
import Sidebar from "./Sidebar";
import ContributionDetails from "../../../pages/contribution/ViewContribution";

import Right from "../rightbar/Right";
import Purpose from "../../../pages/contribution/naira/auto/Purpose";
import SavingsPlan from "../../../pages/contribution/naira/auto/SavingsPlan";
import StartDate from "../../../pages/contribution/naira/auto/StartDate";
import SavingsAmount from "../../../pages/contribution/naira/auto/SavingsAmount";
import WithdrawContribution from "../../../pages/contribution/withdrawContribution/WithdrawContribution";

import ConfirmWithdrawal from "../../../pages/contribution/withdrawContribution/ConfirmAmount";
import ContributionCurrencyType from "../../../pages/contribution/naira/auto/ContributionCurrencyType";
import OneTimeCurrencyType from "../../../pages/contribution/naira/oneTimePlan/ContributionCurrencyType";
import OneTimePurpose from "../../../pages/contribution/naira/oneTimePlan/Purpose";
import OneTimeAmount from "../../../pages/contribution/naira/oneTimePlan/SavingsAmount";
import OneTimeStartDate from "../../../pages/contribution/naira/oneTimePlan/StartDate";

import Preview from "../../../pages/contribution/naira/auto/Preview";
import Contribution from "../../../pages/contribution/Contribution";
import Notification from "../../../pages/notification/Notification";
import FundWallet from "../../../pages/wallet/fund/FundWallet";
import VerifyTransaction from "../../../pages/wallet/fund/VerifyTransaction";
import VerifyAccount from "../../../pages/wallet/withdraw/VerifyAccount";
import SelectAccount from "../../../pages/wallet/withdraw/SelectAccount";
import BankAccount from "../../../pages/wallet/withdraw/BankAccount";
import SelectBank from "../../../pages/wallet/withdraw/SelectBank";
import Withdraw from "../../../pages/wallet/withdraw/Withdraw";
import Profile from "../../../pages/profile/profile";
import Wallet from "../../../pages/wallet/Wallet";
import Home from "../../../pages/home/Home";
import ManageCards from "../../../pages/profile/ManageCards";

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col lg:flex-row lg:justify-between">
      <aside className="custom-scroll-bar hidden h-screen overflow-y-auto md:w-[22%] lg:block">
        <Sidebar />
      </aside>
      <section className="custom-scroll-bar h-screen w-full flex-1 overflow-y-auto px-4 md:px-14">
        <nav className="sm:block lg:hidden">
          <DashboardNav />
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="contribution" element={<Contribution />} />
          <Route
            path="contribution/contribution_details"
            element={<ContributionDetails />}
          />

          <Route
            path="contribution/contribution_curency_type"
            element={<ContributionCurrencyType />}
          />
          <Route path="contribution/purpose" element={<Purpose />} />
          <Route path="contribution/plan" element={<SavingsPlan />} />
          <Route path="contribution/date" element={<StartDate />} />
          <Route path="contribution/amount" element={<SavingsAmount />} />

          <Route path="wallet/*" element={<Wallet />} />
          <Route path="wallet/withdraw" element={<Withdraw />} />
          <Route path="wallet/select-bank" element={<SelectBank />} />
          <Route path="wallet/bank-account" element={<BankAccount />} />
          <Route path="wallet/select-account" element={<SelectAccount />} />
          <Route path="wallet/verify-account" element={<VerifyAccount />} />

          <Route
            path="contribution/one_time/contribution_curency_type"
            element={<OneTimeCurrencyType />}
          />
          <Route
            path="contribution/one_time/purpose"
            element={<OneTimePurpose />}
          />
          <Route
            path="contribution/one_time/amount"
            element={<OneTimeAmount />}
          />
          <Route
            path="contribution/one_time/date"
            element={<OneTimeStartDate />}
          />

          <Route path="/contribution/preview" element={<Preview />} />

          <Route
            path="/contribution/withdraw_contribution"
            element={<WithdrawContribution />}
          />

          <Route
            path="/contribution/withdraw_contribution/confirm-amount"
            element={<ConfirmWithdrawal />}
          />

          <Route path="wallet/fund" element={<FundWallet />} />
          <Route
            path="wallet/fund_wallet/verify_transaction"
            element={<VerifyTransaction />}
          />

          <Route path="profile" element={<Profile />} />

          <Route path="profile/manage-cards" element={<ManageCards />} />
          <Route path="notification" element={<Notification />} />
        </Routes>
      </section>
      <aside className="hidden h-screen overflow-y-auto lg:block lg:w-[35%]">
        <Right />
      </aside>
    </main>
  );
};

export default Dashboard;
