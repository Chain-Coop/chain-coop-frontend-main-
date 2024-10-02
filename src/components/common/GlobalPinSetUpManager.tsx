import React from 'react';
import PinReminder from '../common/PinReminder';
import PinSetup from '../common/PinSetUp';
import PinSuccess from '../common/PinSuccess';
import useUserProfile, { usePinSetup } from '../../shared/Hooks/useUserProfile';

const GlobalPinSetupManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profileDetails } = useUserProfile();
  const isPinCreated = profileDetails?.isPinCreated ?? false;

  const {
    showPinSetup,
    setShowPinSetup,
    showReminder,
    setShowReminder,
    showSuccessModal,
    setShowSuccessModal
  } = usePinSetup(isPinCreated);

  return (
    <>
      {children}
      
      {showReminder && (
        <PinReminder
          onClose={() => setShowReminder(false)}
          onCreatePin={() => {
            setShowReminder(false);
            setShowPinSetup(true);
          }}
        />
      )}
      
      {showPinSetup && (
        <PinSetup
          isOpen={showPinSetup}
          onClose={() => setShowPinSetup(false)}
          onSuccess={() => setShowSuccessModal(true)}
        />
      )}
      
      {showSuccessModal && (
        <PinSuccess
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </>
  );
};

export default GlobalPinSetupManager;