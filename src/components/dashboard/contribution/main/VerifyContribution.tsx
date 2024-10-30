import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { AppDispatch } from '../../../../shared/redux/store';
import { VerifyFundContribution } from '../../../../shared/redux/slices/transaction.slices';

type VerificationStatus = 'idle' | 'verifying' | 'success' | 'error';

interface StatusConfig {
  icon: JSX.Element;
  title: string;
  message: string;
  color: string;
}

const VerifyContribution = () => {
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const statusConfig: Record<VerificationStatus, StatusConfig> = {
    idle: {
      icon: <AlertCircle className="h-12 w-12 text-gray-400" />,
      title: 'Initializing Verification',
      message: 'Please wait...',
      color: 'text-gray-600'
    },
    verifying: {
      icon: <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />,
      title: 'Verifying Transaction',
      message: 'Please wait while we verify your payment...',
      color: 'text-blue-600'
    },
    success: {
      icon: <CheckCircle2 className="h-12 w-12 text-green-500" />,
      title: 'Verification Successful',
      message: 'Your payment has been verified. Redirecting...',
      color: 'text-green-600'
    },
    error: {
      icon: <XCircle className="h-12 w-12 text-red-500" />,
      title: 'Verification Failed',
      message: 'An error occurred during verification.',
      color: 'text-red-600'
    }
  };

  useEffect(() => {
    const verifyTransaction = async () => {
      const urlParams = new URLSearchParams(location.search);
      const reference = urlParams.get('reference');

      if (!reference) {
        setVerificationStatus('error');
        setErrorMessage('No reference code found in URL');
        return;
      }

      try {
        setVerificationStatus('verifying');
        await dispatch(VerifyFundContribution({ reference })).unwrap();
        setVerificationStatus('success');
        
        const redirectTimer = setTimeout(() => {
          navigate('/dashboard/contribution');
        }, 2000);

        return () => clearTimeout(redirectTimer);
      } catch (error) {
        setVerificationStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Verification failed');
      }
    };

    verifyTransaction();
  }, [dispatch, location.search, navigate]);

  const currentStatus = statusConfig[verificationStatus];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 transition-all duration-300">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex justify-center">
            {currentStatus.icon}
          </div>
          
          <h1 className={`text-xl font-semibold ${currentStatus.color}`}>
            {currentStatus.title}
          </h1>
          
          <p className="text-gray-600 text-center">
            {errorMessage || currentStatus?.message}
          </p>

          {verificationStatus === 'error' && (
            <div className="space-y-4 w-full">
              <p className="text-sm text-gray-500 text-center">
                If this issue persists, please contact our support team or try again.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {verificationStatus === 'success' && (
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-2000 ease-out"
                style={{ width: '100%' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyContribution;