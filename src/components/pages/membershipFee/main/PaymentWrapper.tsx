import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import useUserProfile from "../../../../shared/Hooks/useUserProfile";
import MembershipType from "../membershipType/MembershipType";
import SelectPaymentType from "../selectPaymentType/SelectPaymentType";
import VerifyPayment from "../verifyPayment/VerifyPayment";

const PaymentPlanWrapper = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [membershipType, setMembershipType] = useState(null);  
  const { profileDetails } = useUserProfile();

  const handleNext = (selectedType = null) => {
    if (selectedType) {
      setMembershipType(selectedType);  
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    navigate(`/set-payment-plan/step${currentStep}`, { replace: true });
  }, [currentStep, navigate]);

  useEffect(() => {
    if (profileDetails && profileDetails.membershipPaymentStatus !== 'not_started') {
      navigate('/dashboard', { replace: true });
    }
  }, [profileDetails, navigate]);

  return (
    <Routes>
      <Route 
        path="step1" 
        element={<MembershipType onNext={handleNext} />} 
      />
      <Route 
        path="step2" 
        element={<SelectPaymentType onNext={handleNext} onPrev={handlePrev} membershipType={membershipType} />}  // Pass membershipType to step 2
      />
       <Route 
        path="step3" 
        element={<VerifyPayment onNext={handleNext} />}
      />
      <Route path="*" element={<Navigate to="step1" replace />} />
    </Routes>
  );
};

export default PaymentPlanWrapper;
