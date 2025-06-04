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
import SavingsPlan from "../../../pages/contribution/naira/auto/SavingsPlan";
import StartDate from "../../../pages/contribution/naira/auto/StartDate";
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
import FundCryptoWallet from "../../../pages/wallet/fund/FundCryptoWallet";
import FundCryptoWalletPreview from "../../../pages/wallet/fund/FundCryptoWalletPreview";
import FundCryptoWalletSuccess from "../../../pages/wallet/fund/FundCryptoWalletSuccess";
import DepositCryptoPage from "../../../pages/wallet/deposit/depositCrypto";

import AjoPage from "../../../pages/ajo/main/ajo";
import SavingsDetail from "../../../pages/ajo/savings_detail/page";
import OtherGroupDetails from "../../../pages/ajo/details/other_group_details";

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
import PaymentCallback from "../../../pages/payment-callback/page";

import UnifiedContributionCurrencyType from "../../../pages/contribution/crypto/auto/ContributionCurrencyType";
import UnifiedStartDate from "../../../pages/contribution/crypto/auto/StartDate";
import UnifiedSourceFunds from "../../../pages/contribution/crypto/auto/SourceFunds";
import UnifiedPreviewSavings from "../../../pages/contribution/crypto/auto/PreviewSavings";

const UNIFIED_CRYPTO_PURPOSE_PATH =
  "/contribution/crypto/unified-crypto-purpose";
const UNIFIED_START_DATE_PATH = "/contribution/crypto/unified-start-date";
const UNIFIED_SOURCE_FUNDS_PATH = "/contribution/crypto/unified-source-funds";
const UNIFIED_PREVIEW_SAVINGS_PATH =
  "/contribution/crypto/unified-preview-savings";

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
            path={UNIFIED_CRYPTO_PURPOSE_PATH}
            element={<UnifiedContributionCurrencyType />}
          />
          <Route
            path={UNIFIED_START_DATE_PATH}
            element={<UnifiedStartDate />}
          />
          <Route
            path={UNIFIED_SOURCE_FUNDS_PATH}
            element={<UnifiedSourceFunds />}
          />
          <Route
            path={UNIFIED_PREVIEW_SAVINGS_PATH}
            element={<UnifiedPreviewSavings />}
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
            path="/contribution/withdraw_crypto_contribution"
            element={<WithdrawCryptoContribution />}
          />

          <Route
            path="/contribution/withdraw_contribution/confirm_crypto_amount"
            element={<ConfirmCryptoWithdrawal />}
          />

          <Route
            path="/wallet/deposit/crypto"
            element={<DepositCryptoPage />}
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
          <Route path="ajo/other/:name" element={<OtherGroupDetails />} />
          <Route path="payment-callback" element={<PaymentCallback />} />

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
