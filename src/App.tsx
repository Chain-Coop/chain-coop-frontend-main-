import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/pages/entry/HomePage";
// import OurStory from "./components/pages/entry/OurStory";
import Membership from "./components/pages/entry/Membership";
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
import Team from "./components/pages/footer/team/Team";
import Blogs from "./components/pages/footer/blogs/Blogs";
import Story from "./components/pages/entry/Story";
import Career from "./components/pages/footer/careers/Career";
import Landing from "./components/pages/entry/Landing";
import AuthWrapper from "./components/pages/auth/AuthWrapper";
import MembershipType from "./components/pages/membershipFee/membershipType/MembershipType";
import PaymentPlanWrapper from "./components/pages/membershipFee/main/PaymentWrapper";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/why-chain-co-op" element={<Landing />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/our-story" element={<Story />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/sign-up" element={<CreateAccount />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/account-otp" element={<UserLoginOtp />} />
        <Route path="/membershipType" element={<MembershipType />} />

        <Route
          path="/verification-successfull"
          element={<VerificationSuccessfull />}
        />
        <Route
          path="/reset-successfull"
          element={<PaaswordRessetSuccessfull />}
        />

    <Route path="/set-payment-plan/*" element={<PaymentPlanWrapper />} />
    <Route path="/dashboard/*" element={<AuthWrapper><Dashboard /></AuthWrapper>} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />

        <Route path="/team" element={<Team />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/career" element={<Career />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
