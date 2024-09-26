import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { VerifyFundWallet } from '../../../../../shared/redux/slices/transaction.slices';
import { AppDispatch } from '../../../../../shared/redux/store';

const VerifyTransaction = () => {
  const [verificationStatus, setVerificationStatus] = useState('verifying');
 const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const reference = urlParams.get('reference');

    if (reference) {
      dispatch(VerifyFundWallet({ reference: reference }))
        .unwrap()
        .then(() => {
          setVerificationStatus('success');
          setTimeout(() => navigate('/dashboard/wallet'), 3000);
        })
        .catch(() => {
          setVerificationStatus('error');
        });
    } else {
      setVerificationStatus('error');
    }
  }, [dispatch, location, navigate]);

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
            <p className="text-gray-600 mt-2">Redirecting to your wallet...</p>
          </>
        )}
        {verificationStatus === 'error' && (
          <>
            <svg className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p className="text-red-600 font-semibold">Verification failed</p>
            <p className="text-gray-600 mt-2">Please contact support if the issue persists.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyTransaction;