import React, { useState, useCallback } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import useUserProfile from "../../../../shared/Hooks/useUserProfile";
import MembershipType from "../membershipType/MembershipType";
import SelectPaymentType from "../selectPaymentType/SelectPaymentType";
import VerifyPayment from "../verifyPayment/VerifyPayment";

const PaymentPlanWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [membershipType, setMembershipType] = useState(null);
  const { profileDetails } = useUserProfile();

  const handleNext = useCallback((selectedType = null) => {
    if (selectedType) {
      setMembershipType(selectedType);
    }
    const nextStep = location.pathname.includes('step1') ? 'step2' : 'step3';
    navigate(`/set-payment-plan/${nextStep}`, { replace: true });
  }, [navigate, location.pathname]);

  const handlePrev = useCallback(() => {
    const prevStep = location.pathname.includes('step3') ? 'step2' : 'step1';
    navigate(`/set-payment-plan/${prevStep}`, { replace: true });
  }, [navigate, location.pathname]);

  if (profileDetails && profileDetails.membershipPaymentStatus !== 'not_started') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Routes>
      <Route 
        path="step1" 
        element={<MembershipType onNext={handleNext} />} 
      />
      <Route 
        path="step2" 
        element={<SelectPaymentType onNext={handleNext} onPrev={handlePrev} membershipType={membershipType} />}
      />
      <Route 
        path="step3" 
        element={<VerifyPayment />} 
      />
      <Route 
        path="*" 
        element={
          location.search.includes('reference') 
            ? <VerifyPayment />  
            : <Navigate to="step1" replace />
        } 
      />
    </Routes>
  );
};

export default PaymentPlanWrapper;