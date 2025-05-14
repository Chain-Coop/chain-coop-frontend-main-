import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "../../../../src/App.css";
import DashboardNav from "../../common/DashboardNav";
import Sidebar from "./Sidebar";
import ContributionDetails from "../../../pages/contribution/ViewContribution";
import CryptoContributionDetails from "../../../pages/contribution/crypto/ViewContribution";
import CryptoContribution from "../../../pages/contribution/crypto/main/Contribution";
import Right from "../rightbar/Right";
import Purpose from "../../../pages/contribution/naira/auto/Purpose";
import CryptoPurpose from "../../../pages/contribution/crypto/flexiblePlan/ContributionCurrencyType";
import LockCryptoPurpose from "../../../pages/contribution/crypto/lockPlan/ContributionCurrencyType";
import LockCryptoStartDate from "../../../pages/contribution/crypto/lockPlan/StartDate";
import LockCryptoPreviewSavings from "../../../pages/contribution/crypto/lockPlan/PreviewSavings";
import StrictLockCryptoPurpose from "../../../pages/contribution/crypto/strictLockPlan/ContributionCurrencyType";
import LockCryptoSourceFunds from "../../../pages/contribution/crypto/lockPlan/SourceFunds";
import SavingsPlan from "../../../pages/contribution/naira/auto/SavingsPlan";
import StartDate from "../../../pages/contribution/naira/auto/StartDate";
import FlexibleCryptoStartDate from "../../../pages/contribution/crypto/flexiblePlan/StartDate";
import FlexibleCryptoSourceFunds from "../../../pages/contribution/crypto/flexiblePlan/SourceFunds";
import FlexibleCryptoPreviewSavings from "../../../pages/contribution/crypto/flexiblePlan/PreviewSavings";
import StrictLockCryptoStartDate from "../../../pages/contribution/crypto/strictLockPlan/StartDate";
import StrictLockCryptoSourceFunds from "../../../pages/contribution/crypto/strictLockPlan/SourceFunds";
import StrictLockCryptoPreviewSavings from "../../../pages/contribution/crypto/strictLockPlan/PreviewSavings";
import SavingsAmount from "../../../pages/contribution/naira/auto/SavingsAmount";
import WithdrawContribution from "../../../pages/contribution/withdrawContribution/WithdrawContribution";
import WithdrawCryptoContribution from "../../../pages/contribution/withdrawContribution/WithdrawCryptoContribution";
import WithdrawCryptoWallet from "../../../pages/wallet/crypto/withdraw";
import WithdrawToBank from "../../../pages/wallet/crypto/WithdrawToBank";
import WithdrawCryptoPreview from "../../../pages/wallet/crypto/WithdrawCryptoPreview";
import ConfirmWithdrawal from "../../../pages/contribution/withdrawContribution/ConfirmAmount";
import ConfirmCryptoWithdrawal from "../../../pages/contribution/withdrawContribution/ConfirmCryptoAmount";
import ContributionCurrencyType from "../../../pages/contribution/naira/auto/ContributionCurrencyType";
import OneTimeCurrencyType from "../../../pages/contribution/naira/oneTimePlan/ContributionCurrencyType";
import OneTimePurpose from "../../../pages/contribution/naira/oneTimePlan/Purpose";
import OneTimeAmount from "../../../pages/contribution/naira/oneTimePlan/SavingsAmount";
import OneTimeStartDate from "../../../pages/contribution/naira/oneTimePlan/StartDate";
import OneTimeFlexibleCryptoPurpose from "../../../pages/contribution/crypto/oneTimePlan/flexiblePlan/ContributionCurrencyType";
import OneTimeFlexibleCryptoStartDate from "../../../pages/contribution/crypto/oneTimePlan/flexiblePlan/StartDate";
import OneTimeFlexibleCryptoSourceFunds from "../../../pages/contribution/crypto/oneTimePlan/flexiblePlan/SourceFunds";
import OneTimeFlexibleCryptoPreviewSavings from "../../../pages/contribution/crypto/oneTimePlan/flexiblePlan/PreviewSavings";
import OneTimeLockCryptoPurpose from "../../../pages/contribution/crypto/oneTimePlan/lockPlan/ContributionCurrencyType";
import OneTimeLockCryptoStartDate from "../../../pages/contribution/crypto/oneTimePlan/lockPlan/StartDate";
import OneTimeLockCryptoSourceFunds from "../../../pages/contribution/crypto/oneTimePlan/lockPlan/SourceFunds";
import OneTimeLockCryptoPreviewSavings from "../../../pages/contribution/crypto/oneTimePlan/lockPlan/PreviewSavings";
import OneTimeStrictLockCryptoPurpose from "../../../pages/contribution/crypto/oneTimePlan/strictLockPlan/ContributionCurrencyType";
import OneTimeStrictLockCryptoStartDate from "../../../pages/contribution/crypto/oneTimePlan/strictLockPlan/StartDate";
import OneTimeStrictLockCryptoSourceFunds from "../../../pages/contribution/crypto/oneTimePlan/strictLockPlan/SourceFunds";
import OneTimeStrictLockCryptoPreviewSavings from "../../../pages/contribution/crypto/oneTimePlan/strictLockPlan/PreviewSavings";
import FundCryptoWallet from "../../../pages/wallet/fund/FundCryptoWallet";
import FundCryptoWalletPreview from "../../../pages/wallet/fund/FundCryptoWalletPreview";
import FundCryptoWalletSuccess from "../../../pages/wallet/fund/FundCryptoWalletSuccess";

import AjoPage from "../../../pages/ajo/main/ajo";
import SavingsDetail from "../../../pages/ajo/savings_detail/page";

import Preview from "../../../pages/contribution/naira/auto/Preview";
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
import CreateOpenGroup from "../../../pages/ajo/open_group/create_open_group";
import GroupHistoryPage from "../../../pages/ajo/group_history/page";
import InviteMembersPage from "../../../pages/ajo/invite_members/page";
import TransactionHistoryPage from "../../../pages/ajo/transaction_history/page";
import MembersPage from "../../../pages/ajo/members/page";

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
        <nav className="px-4 sm:block lg:hidden">
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
          <Route path="wallet/crypto_wallet" element={<CryptoMain />} />
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

          <Route
            path="contribution/main/crypto_contribution"
            element={<CryptoContribution />}
          />
          <Route
            path="contribution/crypto_contribution_details"
            element={<CryptoContributionDetails />}
          />
          <Route
            path="contribution/flexible/crypto_purpose"
            element={<CryptoPurpose />}
          />
          <Route
            path="contribution/lock/crypto_purpose"
            element={<LockCryptoPurpose />}
          />
          <Route
            path="contribution/lock/cryoto_date"
            element={<LockCryptoStartDate />}
          />
          <Route
            path="contribution/lock/source_funds"
            element={<LockCryptoSourceFunds />}
          />
          <Route
            path="contribution/lock/preview_savings"
            element={<LockCryptoPreviewSavings />}
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
            path="contribution/flexible/source_funds"
            element={<FlexibleCryptoSourceFunds />}
          />

          <Route
            path="contribution/flexible/preview_savings"
            element={<FlexibleCryptoPreviewSavings />}
          />

          <Route
            path="contribution/strict_lock/date"
            element={<StrictLockCryptoStartDate />}
          />

          <Route
            path="contribution/strict_lock/source_funds"
            element={<StrictLockCryptoSourceFunds />}
          />

          <Route
            path="/dashboard/contribution/strict_lock/preview"
            element={<StrictLockCryptoPreviewSavings />}
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

          <Route
            path="contribution/strict_lock/preview_savings"
            element={<StrictLockCryptoPreviewSavings />}
          />

          <Route
            path="/contribution/withdraw_crypto_contribution"
            element={<WithdrawCryptoContribution />}
          />

          <Route
            path="/contribution/withdraw_contribution/confirm_crypto_amount"
            element={<ConfirmCryptoWithdrawal />}
          />

          {/* One-Time Flexible Plan Routes */}
          <Route
            path="contribution/one_time_plan/flexible/crypto_purpose"
            element={<OneTimeFlexibleCryptoPurpose />}
          />
          <Route
            path="contribution/one_time_plan/flexible/date"
            element={<OneTimeFlexibleCryptoStartDate />}
          />
          <Route
            path="contribution/one_time_plan/flexible/source_funds"
            element={<OneTimeFlexibleCryptoSourceFunds />}
          />
          <Route
            path="contribution/one_time_plan/flexible/preview_savings"
            element={<OneTimeFlexibleCryptoPreviewSavings />}
          />

          {/* One-Time Lock Plan Routes */}
          <Route
            path="contribution/one_time_plan/lock/crypto_purpose"
            element={<OneTimeLockCryptoPurpose />}
          />
          <Route
            path="contribution/one_time_plan/lock/date"
            element={<OneTimeLockCryptoStartDate />}
          />
          <Route
            path="contribution/one_time_plan/lock/source_funds"
            element={<OneTimeLockCryptoSourceFunds />}
          />
          <Route
            path="contribution/one_time_plan/lock/preview_savings"
            element={<OneTimeLockCryptoPreviewSavings />}
          />

          {/* One-Time Strict Lock Plan Routes */}
          <Route
            path="contribution/one_time_plan/strict_lock/crypto_purpose"
            element={<OneTimeStrictLockCryptoPurpose />}
          />
          <Route
            path="contribution/one_time_plan/strict_lock/date"
            element={<OneTimeStrictLockCryptoStartDate />}
          />
          <Route
            path="contribution/one_time_plan/strict_lock/source_funds"
            element={<OneTimeStrictLockCryptoSourceFunds />}
          />
          <Route
            path="contribution/one_time_plan/strict_lock/preview_savings"
            element={<OneTimeStrictLockCryptoPreviewSavings />}
          />

          <Route path="ajo" element={<AjoPage />} />
          <Route path="ajo/create/open-group" element={<CreateOpenGroup />} />
          <Route path="ajo/create/closed-group" element={<CreateOpenGroup />} />
          <Route path="ajo/history" element={<GroupHistoryPage />} />
          <Route
            path="ajo/open-group/members"
            element={<InviteMembersPage />}
          />
          <Route
            path="ajo/:name/transactions"
            element={<TransactionHistoryPage />}
          />
          <Route path="ajo/:name/members" element={<MembersPage />} />
          <Route path="ajo/:name" element={<SavingsDetail />} />

          <Route
            path="wallet/fund/fund_crypto_wallet"
            element={<FundCryptoWallet />}
          />
          <Route
            path="wallet/fund/fund_crypto_wallet_preview"
            element={<FundCryptoWalletPreview />}
          />
          <Route
            path="wallet/fund/success"
            element={<FundCryptoWalletSuccess />}
          />

          <Route
            path="wallet/crypto/withdraw"
            element={<WithdrawCryptoWallet />}
          />
          <Route
            path="wallet/crypto/withdraw/bank"
            element={<WithdrawToBank />}
          />
          <Route
            path="wallet/crypto/withdraw/preview"
            element={<WithdrawCryptoPreview />}
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
