import { useState } from "react";
import React from "react";
import { AppDispatch } from "../../shared/redux/store";
import { useDispatch } from "react-redux";
import { CreateTransactionPin } from "../../shared/redux/slices/transaction.slices";
import Modal from "./Modal";
import OTPInput from "react-otp-input";
import { Primary } from "./Button";
import ReactLoading from "react-loading";

const PinSetup: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
  }> = ({ isOpen, onClose, onSuccess }) => {
    const [pin, setPin] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch: AppDispatch = useDispatch();
  
    const handlePinChange = (value: string) => {
      const numericValue = value.replace(/[^0-9]/g, '');
      setPin(numericValue);
      setError(null);
    };
  
    const handlePinSubmit = async () => {
      if (pin.length !== 4) {
        setError('Please enter a 4-digit PIN');
        return;
      }
  
      setIsLoading(true);
      try {
        await dispatch(CreateTransactionPin({ pin })).unwrap();
        localStorage.removeItem('pinSkippedAt');
        onSuccess();
        onClose();
      } catch (error) {
        console.error('Failed to create PIN:', error);
        setError('Failed to create PIN. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleSkip = () => {
      localStorage.setItem('pinSkippedAt', new Date().toISOString());
      onClose();
    };
  
    return (
      <Modal
      className="flex flex-col justify-center bg-white py-[3em] text-center"
      isOpen={isOpen} onClose={onClose}>
        <div className="text-center p-4">
          <h2 className="text-2xl font-semibold mb-2">Create a 4-digit Pin</h2>
          <p className="text-gray-600 mb-4">
            You'll use this Pin to authorize your transactions.
          </p>
          
          <div className="mb-6">
            <OTPInput
              value={pin}
              onChange={handlePinChange}
              numInputs={4}
              renderSeparator={<span className="mx-2">-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="!w-16 !h-16 text-center bg-gray-100 border-gray-200 rounded-md text-xl"
                  type="text"
                  inputMode="numeric"
                />
              )}
            />
            {error && (
              <p className="text-red-500 mt-2 text-sm">{error}</p>
            )}
          </div>
  
          <div className="space-y-3">
            <Primary
              onClick={handlePinSubmit}
              className="w-full py-2 rounded-full bg-text2 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <ReactLoading type="spin" height={20} width={20} color="#ffffff" />
                  <span className="ml-2">Creating PIN...</span>
                </div>
              ) : (
                'Create PIN'
              )}
            </Primary>
            
            <Primary
              onClick={handleSkip}
              className="w-full py-2 rounded-full bg-gray-200 text-gray-700"
            >
              Skip for now
            </Primary>
          </div>
        </div>
      </Modal>
    );
  };
  

  export default PinSetup;