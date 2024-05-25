import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import OurStory from "./components/pages/OurStory";
import Membership from "./components/pages/Membership";
import CreatePin from "./components/pages/CreatePin";
import CreatedPin from "./components/pages/CreatedPin";
import ForgetPassword from "./components/pages/ForgetPassword";
import CreateAccount from "./components/pages/CreateAccount";
import UserLoginOtp from "./components/pages/UserLoginOtp";
import VerificationSuccessfull from "./components/pages/VerificationSuccessfull";
import PaaswordRessetSuccessfull from "./components/pages/PaaswordRessetSuccessfull";
import Contact from "./components/pages/entry/Contact";
import ResetPassword from "./components/pages/ResetPassword";
import NewPassword from "./components/pages/NewPassword";
import UserLogin from "./components/pages/UserLogin";
import Dashboard from "./components/dashboard/sidebar/Dashboard";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/sign-up" element={<CreateAccount />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/account-otp" element={<UserLoginOtp />} />

        <Route
          path="/verification-successfull"
          element={<VerificationSuccessfull />}
        />
        <Route
          path="/reset-successfull"
          element={<PaaswordRessetSuccessfull />}
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>

        <Route path="/create-pin" element={<CreatePin />} />
        <Route path="/created-pin" element={<CreatedPin />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
