import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/pages/entry/HomePage";
import ForgetPassword from "./components/pages/auth/ForgetPassword";
import CreateAccount from "./components/pages/auth/CreateAccount";
import UserLoginOtp from "./components/pages/auth/UserLoginOtp";
import VerificationSuccessfull from "./components/pages/auth/VerificationSuccessfull";
import PaaswordRessetSuccessfull from "./components/pages/auth/PaaswordRessetSuccessfull";
import Contact from "./components/pages/entry/Contact";
import ResetPassword from "./components/pages/auth/ResetPassword";
import NewPassword from "./components/pages/auth/NewPassword";
import UserLogin from "./components/pages/auth/UserLogin";
import Dashboard from "./components/dashboard/sidebar/Dashboard";
import NotFound from "./components/pages/NotFound";
import WhyChainCoop from "./components/pages/entry/WhyChainCoop";
import ProtectedRoutes from "./components/protected/ProtectedRoute";
import PartnerWithUs from "./components/pages/entry/PartnerWithUs";
import TermsOfService from "./components/pages/footer/TermsOfService";

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
        <Route path="/account-otp" element={<UserLoginOtp />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route
          path="/verification-successfull"
          element={<VerificationSuccessfull />}
        />
        <Route
          path="/reset-successfull"
          element={<PaaswordRessetSuccessfull />}
        />

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
