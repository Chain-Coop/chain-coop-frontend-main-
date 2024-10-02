import React from 'react';
import { Primary } from './Button';
import Modal from './Modal';

const PinReminder: React.FC<{ onClose: () => void; onCreatePin: () => void }> = ({ 
    onClose, 
    onCreatePin 
  }) => (
    <Modal 
    className="flex flex-col justify-center bg-white py-[3em] text-center"
    isOpen={true} onClose={onClose}>
      <div className="text-center p-4">
        <h2 className="text-xl font-semibold mb-2">Secure Your Account</h2>
        <p className="text-gray-600 mb-4">
          We noticed you haven't set up your PIN yet. A PIN helps secure your account and transactions.
        </p>
        <div className="flex justify-center gap-4">
          <Primary onClick={onClose} className="bg-gray-200 py-1 px-3 text-gray-700">
            Remind me later
          </Primary>
          <Primary onClick={onCreatePin} className="bg-text2 py-1 px-3 text-white">
            Set up PIN
          </Primary>
        </div>
      </div>
    </Modal>
  );

export default PinReminder;