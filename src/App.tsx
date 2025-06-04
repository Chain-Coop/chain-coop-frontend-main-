import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/entry/HomePage";
import ForgetPassword from "./pages/auth/ForgetPassword";
import CreateAccount from "./pages/auth/CreateAccount";
import VerificationSuccessfull from "./pages/auth/VerificationSuccessfull";
import PaaswordRessetSuccessfull from "./pages/auth/PaaswordRessetSuccessfull";
import Contact from "./pages/entry/Contact";
import ResetPassword from "./pages/auth/ResetPassword";
import NewPassword from "./pages/auth/NewPassword";
import UserLogin from "./pages/auth/UserLogin";
import Dashboard from "./components/dashboard/sidebar/Dashboard";
import NotFound from "./pages/NotFound";
import WhyChainCoop from "./pages/entry/WhyChainCoop";
import ProtectedRoutes from "./components/protected/ProtectedRoute";
import PartnerWithUs from "./pages/entry/PartnerWithUs";
import TermsOfService from "./pages/footer/TermsOfService";
import Team from "./pages/footer/Team";
import AboutUs from "./pages/footer/AboutUs";
import PrivacyPolicy from "./pages/footer/PrivacyPolicy";
import VerifyEmail from "./pages/auth/verifyEmail";
import VerifyPhoneNumber from "./pages/auth/verifyPhoneNumber";
import GoogleFormPage from "./pages/auth/googleFormPage";
import DashboardRoutes from "./adminPages/routes/dashboardRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/why-chain-co-op" element={<WhyChainCoop />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/partner-with-us" element={<PartnerWithUs />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/sign-up" element={<CreateAccount />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-phone-number" element={<VerifyPhoneNumber />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/team" element={<Team />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/verification-successfull"
          element={<VerificationSuccessfull />}
        />
        <Route
          path="/reset-successfull"
          element={<PaaswordRessetSuccessfull />}
        />
        <Route path="/form" element={<GoogleFormPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/admin/*" element={<DashboardRoutes />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
