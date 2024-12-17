import React from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "../../../../src/App.css";
import DashboardNav from "../../common/DashboardNav";
import Sidebar from "./Sidebar";
import Home from "../home/Home";
import Contribution from "../contribution/main/Contribution";
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
import ProjectContentOverView from "../nestedproject/nested/ProjectContentOverView";
import Purpose from "../contribution/naira/purpose/Purpose";
import CryptoPurpose from "../contribution/crypto/purpose/Purpose";
import SavingsPlan from "../contribution/naira/savingsPlan/SavingsPlan";
import CryptoSavingsPlan from "../contribution/crypto/savingsPlan/SavingsPlan";
import StartDate from "../contribution/naira/startDate/StartDate";
import CryptoStartDate from "../contribution/crypto/startDatte/StartDate";
import SavingsAmount from "../contribution/naira/savingsAmount/SavingsAmount";
import SavingsCryptoAmount from "../contribution/crypto/savingsAmount/SavingsAmount";
import VerifyContribution from "../contribution/main/VerifyContribution";
import ViewContribution from "../contribution/viewContribution/ViewContribution";
import WithdrawContribution from "../contribution/naira/withdrawContribution/WithdrawContribution";
import ConfirmWithdrawal from "../contribution/naira/withdrawContribution/ConfirmAmount";
import ManageAccountCards from "../profile/profileDetails/accountsAndCard/ManageCards";
import Notification from "../notification/main/Notification";
import ContributionCurrencyType from "../contribution/main/contributionType/ContributionCurrencyType";
import CryptoMain from "../wallet/crypto/main/CryptoMain";
import CryproSavings from "../contribution/crypto/main/CryproSavings";
import WithdrawCrypto from "../contribution/crypto/withdrawCrypto/WithdrawCrypto";

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
          <Route path="contribution/crypto" element={<CryproSavings />} />
          <Route path="contribution/purpose" element={<Purpose />} />
          <Route
            path="contribution/crypto/purpose"
            element={<CryptoPurpose />}
          />
          <Route path="contribution/plan" element={<SavingsPlan />} />
          <Route
            path="contribution/crypto/plan"
            element={<CryptoSavingsPlan />}
          />
          <Route path="contribution/date" element={<StartDate />} />
          <Route
            path="contribution/crypto/date"
            element={<CryptoStartDate />}
          />
          <Route path="contribution/amount" element={<SavingsAmount />} />
          <Route
            path="contribution/crypto/amount"
            element={<SavingsCryptoAmount />}
          />
          <Route
            path="contribution/contribution_cuurency_type"
            element={<ContributionCurrencyType />}
          />
          <Route
            path="contribution/fund_contribution/verify_transaction"
            element={<VerifyContribution />}
          />

          <Route
            path="/contribution/contribution_details"
            element={<ViewContribution />}
          />
          <Route
            path="/contribution/withdraw_contribution"
            element={<WithdrawContribution />}
          />
          <Route
            path="/contribution/withdraw_crypto"
            element={<WithdrawCrypto />}
          />
          <Route
            path="/contribution/withdraw_contribution/confirm-amount"
            element={<ConfirmWithdrawal />}
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

          <Route path="project" element={<Project />} />
          <Route
            path="project/project_over-view"
            element={<ProjectContentOverView />}
          />

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
