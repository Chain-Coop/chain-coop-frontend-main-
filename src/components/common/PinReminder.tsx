import React from 'react';
import { Primary } from './Button';

interface PinReminderProps {
  onClose: () => void;
  onCreatePin: () => void;
}

const PinReminder: React.FC<PinReminderProps> = ({ onClose, onCreatePin }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Secure Your Account</h2>
        <p className="mb-6 text-gray-600">
          We noticed you haven't set up your PIN yet. A PIN helps secure your account and transactions. Would you like to set it up now?
        </p>
        <div className="flex justify-end space-x-4">
          <Primary onClick={onClose} className="rounded-full bg-gray-200 px-4 py-2 font-semibold text-gray-700">
            Remind me later
          </Primary>
          <Primary onClick={onCreatePin} className="rounded-full bg-text2 px-4 py-2 font-semibold text-white">
            Set up PIN
          </Primary>
        </div>
      </div>
    </div>
  );
};

export default PinReminder;