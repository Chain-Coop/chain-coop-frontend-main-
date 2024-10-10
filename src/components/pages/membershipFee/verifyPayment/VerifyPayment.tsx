import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { AppDispatch } from '../../../../shared/redux/store';
import { VerifyMembershipSubscription } from '../../../../shared/redux/slices/transaction.slices';

interface VerifyPaymentProps {
  onComplete?: () => void;  
}

const VerifyPayment: React.FC<VerifyPaymentProps> = ({ onComplete }) => {
  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const reference = urlParams.get('reference');
    const trxref = urlParams.get('trxref');

    const verifyTransaction = async () => {
      if (!reference || !trxref) {
        setVerificationStatus('error');
        console.error('Missing required parameters:', { reference, trxref });
        return;
      }
      try {
        const verificationParams = { trxref, reference };

        const response = await dispatch(VerifyMembershipSubscription(verificationParams)).unwrap();

        setVerificationStatus('success');
        setTimeout(() => {
          if (onComplete) {
            onComplete();
          } else {
            navigate('/dashboard/home');  
          }
        }, 2000);
      } catch (error) {
        console.error('Verification failed:', error);
        setVerificationStatus('error');
      }
    };

    verifyTransaction();
  }, [dispatch, location.search, onComplete, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Transaction Verification</h1>
        {verificationStatus === 'verifying' && (
          <>
            <Loader2 className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600">Please wait while we verify your transaction...</p>
          </>
        )}
        {verificationStatus === 'success' && (
          <>
            <svg className="h-12 w-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-600 font-semibold">Transaction verified successfully!</p>
            <p className="text-gray-600 mt-2">Redirecting to dashboard...</p>
          </>
        )}
        {verificationStatus === 'error' && (
          <>
            <svg className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p className="text-red-600 font-semibold">Verification failed</p>
            <p className="text-gray-600 mt-2">Some required parameters are missing or invalid. Please try again or contact support.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyPayment;
