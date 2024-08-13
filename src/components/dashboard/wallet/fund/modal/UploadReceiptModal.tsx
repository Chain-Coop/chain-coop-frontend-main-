import PropTypes from "prop-types";
import { Primary } from "../../../../common/Button";
import upload from "../../../../../Assets/svg/dashboard/wallet/upload.svg";
import wallet from "../../../../../Assets/svg/../svg/dashboard/wallet/wallet.svg";
import React from "react";


const UploadReceiptModal = ({ onContinue }:any) => {
  return (
    <main className="py-6 text-center font-sans">
      <header>
        <h1 className="text-xl font-semibold">Payment Confirmation</h1>
      </header>
      <div className="mt-[1em] flex justify-center">
        <img src={wallet} alt="wallet" />
        <p>.Payment to wallet</p>
      </div>
      <div className="mt-[1em] flex justify-center">
        <img src={upload} alt="upload" />
      </div>
      <div className="mt-[1em]">
        <h1 className="font-medium">
          Upload your payment receipt for confirmation
        </h1>
      </div>
      <Primary
        className="mt-[2em] w-full bg-text2 py-3 text-white"
        onClick={onContinue}
      >
        Continue
      </Primary>
      <div className="mt-[1em] text-center">
        <p className="text-sm font-medium text-howtext">
          Note: Images can be in png,jpg,pdf not less than 2mb
        </p>
      </div>
    </main>
  );
};

UploadReceiptModal.propTypes = {
  onContinue: PropTypes.func.isRequired,
};

export default UploadReceiptModal;
