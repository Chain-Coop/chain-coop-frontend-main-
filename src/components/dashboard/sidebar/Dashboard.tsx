import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "../../../../src/App.css";
import DashboardNav from "../../common/DashboardNav";
import Sidebar from "./Sidebar";
import ContributionDetails from "../../../pages/contribution/ViewContribution";
import CryptoContribution from "../../../pages/contribution/crypto/Contribution";
import Right from "../rightbar/Right";
import Purpose from "../../../pages/contribution/naira/flexiblePlan/Purpose";
import CryptoPurpose from "../../../pages/contribution/crypto/flexiblePlan/ContributionCurrencyType";
import StrictLockCryptoPurpose from "../../../pages/contribution/crypto/strictLockPlan/ContributionCurrencyType";
import LockPurpose from "../../../pages/contribution/naira/lockPlan/Purpose";
import SavingsPlan from "../../../pages/contribution/naira/flexiblePlan/SavingsPlan";
import LockPlan from "../../../pages/contribution/naira/lockPlan/SavingsPlan";
import StrictLockPurpose from "../../../pages/contribution/naira/strictLockPlan/Purpose";
import StartDate from "../../../pages/contribution/naira/flexiblePlan/StartDate";
import FlexibleCryptoStartDate from "../../../pages/contribution/crypto/flexiblePlan/StartDate";
import StrictLockCryptoStartDate from "../../../pages/contribution/crypto/strictLockPlan/StartDate";
import LockStartDate from "../../../pages/contribution/naira/lockPlan/StartDate";
import StrictLockStartDate from "../../../pages/contribution/naira/strictLockPlan/StartDate";
import SavingsAmount from "../../../pages/contribution/naira/flexiblePlan/SavingsAmount";
import LockSavingsAmount from "../../../pages/contribution/naira/lockPlan/SavingsAmount";
import StrictLockSavingsAmount from "../../../pages/contribution/naira/strictLockPlan/SavingsAmount";
import WithdrawContribution from "../../../pages/contribution/withdrawContribution/WithdrawContribution";
import ConfirmWithdrawal from "../../../pages/contribution/withdrawContribution/ConfirmAmount";
import ContributionCurrencyType from "../../../pages/contribution/naira/flexiblePlan/ContributionCurrencyType";
import LockContributionCurrencyType from "../../../pages/contribution/naira/lockPlan/ContributionCurrencyType";
import StrictLockContributionCurrencyType from "../../../pages/contribution/naira/strictLockPlan/ContributionCurrencyType";
import StrictLockPlan from "../../../pages/contribution/naira/strictLockPlan/SavingsPlan";
import OneTimeCurrencyType from "../../../pages/contribution/naira/oneTimePlan/ContributionCurrencyType";
import OneTimePurpose from "../../../pages/contribution/naira/oneTimePlan/Purpose";
import OneTimeAmount from "../../../pages/contribution/naira/oneTimePlan/SavingsAmount";
import OneTimeStartDate from "../../../pages/contribution/naira/oneTimePlan/StartDate";



//import CryptoMain from "../wallet/crypto/main/CryptoMain";
//import Preview from "../contribution/contributionType/naira/strictLockPlan/Preview";
import AjoPage from "../ajo/main/ajo";
import SavingsDetail from "../ajo/savings_detail/page";

import Preview from "../../../pages/contribution/naira/strictLockPlan/Preview";
import Contribution from "../../../pages/contribution/Contribution";
import Notification from "../../../pages/notification/Notification";
import CryptoMain from "../../../pages/wallet/crypto/CryptoMain";
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
      <aside className="custom-scroll-bar hidden h-screen overflow-y-auto lg:block lg:w-[22%]">
        <Sidebar />
      </aside>
      <section className="custom-scroll-bar container h-screen flex-1 overflow-y-auto">
        <nav className="sm:block px-4 lg:hidden">
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
            path="contribution/strict_lock/plan"
            element={<StrictLockPlan />}
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

          
          <Route path="ajo" element={<AjoPage />} />
          <Route path="ajo/:name" element={<SavingsDetail />} />


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
