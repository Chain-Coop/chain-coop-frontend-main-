import React from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "../../../../src/App.css";
import DashboardNav from "../../common/DashboardNav";
import Sidebar from "./Sidebar";
import Home from "../home/Home";
import Contribution from "../contribution/main/Contribution";
import ContributionDetails from "../contribution/viewContribution/ViewContribution";
import CryptoContribution from "../contribution/contributionType/crypto/main/Contribution";
import Wallet from "../wallet/Wallet";
import Project from "../nestedproject/Project";
import Proposal from "../proposal/Proposal";
import SubmitProposal from "../proposal/SubmitProposal";
import Profile from "../profile/main/Profile";
import Right from "../rightbar/Right";
import Withdraw from "../wallet/withdraw/Withdraw";
import SelectBank from "../wallet/withdraw/SelectBank";
import BankAccount from "../wallet/withdraw/BankAccount";
import SelectAccount from "../wallet/withdraw/SelectAccount";
import VerifyAccount from "../wallet/withdraw/VerifyAccount";
import FundWallet from "../wallet/fund/FundWallet";
import TransferWallet from "../wallet/transfer/main/Transfer";
import AddFund from "../wallet/transfer/fundProject/AddFund";
import ProfileTransactions from "../profile/profileDetails/transactions/Transactions";
import Shares from "../shares/main/Shares";
import VerifyTransaction from "../wallet/fund/verifyTransaction/VerifyTransaction";
import ConfirmTransaction from "../wallet/transfer/fundContribution/confirmTransaction";
// import ProjectContentOverView from "../nestedproject/nested/ProjectContentOverView";
import Purpose from "../contribution/contributionType/naira/flexiblePlan/Purpose";
import CryptoPurpose from "../contribution/contributionType/crypto/flexiblePlan/ContributionCurrencyType";
import StrictLockCryptoPurpose from "../contribution/contributionType/crypto/strictLockPlan/ContributionCurrencyType";
import LockPurpose from "../contribution/contributionType/naira/lockPlan/Purpose";
import SavingsPlan from "../contribution/contributionType/naira/flexiblePlan/SavingsPlan";
import LockPlan from "../contribution/contributionType/naira/lockPlan/SavingsPlan";
import StrictLockPurpose from "../contribution/contributionType/naira/strictLockPlan/Purpose";
import StartDate from "../contribution/contributionType/naira/flexiblePlan/StartDate";
import FlexibleCryptoStartDate from "../contribution/contributionType/crypto/flexiblePlan/StartDate";
import StrictLockCryptoStartDate from "../contribution/contributionType/crypto/strictLockPlan/StartDate";
import LockStartDate from "../contribution/contributionType/naira/lockPlan/StartDate";
import StrictLockStartDate from "../contribution/contributionType/naira/strictLockPlan/StartDate";
import SavingsAmount from "../contribution/contributionType/naira/flexiblePlan/SavingsAmount";
import LockSavingsAmount from "../contribution/contributionType/naira/lockPlan/SavingsAmount";
import StrictLockSavingsAmount from "../contribution/contributionType/naira/strictLockPlan/SavingsAmount";
import WithdrawContribution from "../contribution/withdrawContribution/WithdrawContribution";
import ConfirmWithdrawal from "../contribution/withdrawContribution/ConfirmAmount";
import ManageAccountCards from "../profile/profileDetails/accountsAndCard/ManageCards";
import Notification from "../notification/main/Notification";
import ContributionCurrencyType from "../contribution/contributionType/naira/flexiblePlan/ContributionCurrencyType";
import LockContributionCurrencyType from "../contribution/contributionType/naira/lockPlan/ContributionCurrencyType";
import StrictLockContributionCurrencyType from "../contribution/contributionType/naira/strictLockPlan/ContributionCurrencyType";

import CryptoMain from "../wallet/crypto/main/CryptoMain";
import Preview from "../contribution/contributionType/naira/strictLockPlan/Preview";

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col lg:flex-row lg:justify-between">
      <aside className="custom-scroll-bar hidden h-screen overflow-y-auto lg:block lg:w-[22%]">
        <Sidebar />
      </aside>
      <section className="custom-scroll-bar h-screen flex-1 overflow-y-auto sm:w-full lg:w-[55%]">
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
            path="contribution/crypto_contribution"
            element={<CryptoContribution />}
          />
          <Route
            path="contribution/flexible/crypto_purpose"
            element={<CryptoPurpose />}
          />
          <Route
            path="contribution/strict_lock/crypto_purpose"
            element={<StrictLockCryptoPurpose />}
          />
          <Route
            path="contribution/flexible_crypto/date"
            element={<FlexibleCryptoStartDate />}
          />
          <Route
            path="contribution/strict_lock_crypto/date"
            element={<StrictLockCryptoStartDate />}
          />

          <Route path="contribution/purpose" element={<Purpose />} />
          <Route path="contribution/plan" element={<SavingsPlan />} />
          <Route path="contribution/date" element={<StartDate />} />
          <Route path="contribution/amount" element={<SavingsAmount />} />
          <Route
            path="contribution/contribution_curency_type"
            element={<ContributionCurrencyType />}
          />

          <Route
            path="/contribution/withdraw_contribution"
            element={<WithdrawContribution />}
          />

          <Route
            path="/contribution/withdraw_contribution/confirm-amount"
            element={<ConfirmWithdrawal />}
          />

          <Route
            path="contribution/lock/contribution_curency_type"
            element={<LockContributionCurrencyType />}
          />
          <Route path="contribution/lock/purpose" element={<LockPurpose />} />
          <Route path="contribution/lock_plan" element={<LockPlan />} />
          <Route
            path="contribution/lock/amount"
            element={<LockSavingsAmount />}
          />
          <Route path="contribution/lock/date" element={<LockStartDate />} />

          <Route
            path="contribution/strict_lock/contribution_curency_type"
            element={<StrictLockContributionCurrencyType />}
          />
          <Route
            path="contribution/strict_lock/purpose"
            element={<StrictLockPurpose />}
          />
          <Route
            path="contribution/strict_lock/amount"
            element={<StrictLockSavingsAmount />}
          />
          <Route
            path="contribution/strict_lock/date"
            element={<StrictLockStartDate />}
          />
          <Route
            path="contribution/strict_lock/preview"
            element={<Preview />}
          />

          <Route path="wallet/*" element={<Wallet />} />
          <Route path="wallet/crypto_wallet" element={<CryptoMain />} />
          <Route path="wallet/withdraw" element={<Withdraw />} />
          <Route path="wallet/select-bank" element={<SelectBank />} />
          <Route path="wallet/bank-account" element={<BankAccount />} />
          <Route path="wallet/select-account" element={<SelectAccount />} />
          <Route path="wallet/verify-account" element={<VerifyAccount />} />

          <Route path="wallet/fund" element={<FundWallet />} />
          <Route
            path="wallet/fund_wallet/verify_transaction"
            element={<VerifyTransaction />}
          />

          <Route path="wallet/transfer" element={<TransferWallet />} />
          <Route path="wallet/transfer/fund-project" element={<AddFund />} />
          <Route
            path="wallet/transfer/confirm-amount"
            element={<ConfirmTransaction />}
          />
          {/* 
          <Route path="project" element={<Project />} />
          <Route
            path="project/project_over-view"
            element={<ProjectContentOverView />}
          /> */}

          <Route path="proposal/*" element={<Proposal />} />
          <Route path="proposal/submit-proposal" element={<SubmitProposal />} />

          <Route path="shares" element={<Shares />} />

          <Route path="profile" element={<Profile />} />
          <Route
            path="profile/transactions"
            element={<ProfileTransactions />}
          />
          <Route path="profile/manage-cards" element={<ManageAccountCards />} />
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
