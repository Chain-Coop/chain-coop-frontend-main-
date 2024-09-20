import { Primary } from "../../../../common/Button";
import upload from "../../../../../Assets/svg/dashboard/wallet/upload.svg";
import wallet from "../../../../../Assets/svg/dashboard/wallet/wallet.svg";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { UploadPaymentReceipt } from "../../../../../shared/redux/slices/transaction.slices";
import { toast } from "react-toastify";
import { AppDispatch } from "../../../../../shared/redux/store";
import { useAppDispatch } from "../../../../../shared/redux/reduxHooks";
import ReactLoading from "react-loading";

const UploadReceiptModal = ({ onContinue }: any) => {
  const [receipt, setReceipt] = useState<File | null>(null); 
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useAppDispatch();

  const handleDocumentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDocument = e.target.files ? e.target.files[0] : null;
    setReceipt(selectedDocument);
  };

  const submitReceipt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!receipt) {
      toast.error("Please select a document before submitting.");
      return;
    }
    
    setLoading(true);

    const formData = new FormData();
    formData.append("receipt", receipt);

    try {
      await dispatch(UploadPaymentReceipt(formData)).unwrap();
      setLoading(false);
      onContinue(); 
    } catch (error) {
      setLoading(false);
      const errorMessage =
        (error as any).message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <main className="py-6 text-center font-sans">
      <header>
        <h1 className="text-xl font-semibold">Payment Confirmation</h1>
      </header>
      <div className="mt-[1em] flex justify-center">
        <img src={wallet} alt="wallet" />
        <p>Payment to wallet</p>
      </div>
      
      <div className="mt-[1em] flex justify-center">
        <label htmlFor="file-upload" className="cursor-pointer">
          <img src={upload} alt="upload" />
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".png, .jpg, .pdf"
          onChange={handleDocumentChange}
          className="hidden" 
        />
      </div>
      
      <div className="mt-[1em]">
        <h1 className="font-medium">
          {receipt ? receipt.name : "Upload your payment receipt for confirmation"}
        </h1>
      </div>

      <Primary
        className="mt-[2em] w-full bg-text2 py-3 text-white"
        onClick={submitReceipt}
        disblae={loading}
      >
        {loading ? (
          <div className="mr-auto flex px-2">
            <ReactLoading
              color="#FFFFFF"
              width={25}
              height={25}
              type="spin"
            />
          </div>
        ) : (
          "Continue"
        )}
      </Primary>

      <div className="mt-[1em] text-center">
        <p className="text-sm font-medium text-howtext">
          Note: Images can be in png, jpg, pdf not less than 2MB
        </p>
      </div>
    </main>
  );
};

export default UploadReceiptModal;
