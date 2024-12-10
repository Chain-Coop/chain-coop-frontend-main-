import React, { useState } from "react";
import { Primary } from "../../../../../common/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../shared/redux/store";
import { toast } from "react-toastify";
import { phoneNumberOtp } from "../../../../../../shared/redux/slices/kyc.slices";
import ReactLoading from "react-loading";
import { PhoneNumberInput } from "../../../../../../shared/utils/Helpers";

interface TierOneFirstModalProps {
  onClose: () => void;
}

const TeirOneSecondModal: React.FC<TierOneFirstModalProps> = ({ onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const getOtp = (e: any) => {
    e.preventDefault();
    if (!phoneNumber) {
      return;
    }

    setLoading(true);
    let body = {
      phoneNumber: phoneNumber,
    };

    dispatch(phoneNumberOtp(body))
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch((error: any) => {
        console.log("err", error);
        setLoading(false);
        toast.error(error);
      });
  };

  return (
    <main className="w-full max-w-[28em] px-2 font-sans md:px-5">
      <section className="flex flex-col gap-3 py-6 md:py-8">
        <div className="mt-[1em] flex flex-col gap-1">
          <header className="text-center sm:px-4">
            <h2 className="text-base font-bold leading-tight sm:text-lg md:text-lg">
              Update your phone number
            </h2>
          </header>
          <article className="px-2 text-center sm:px-3">
            <p className="text-sm font-medium text-gray-600">
              Upload your phone number for verification process
            </p>
          </article>
        </div>

        <div className="mt-[1em]">
          <label
            htmlFor="phoneNumber-input"
            className="mb-3 flex font-sans font-semibold text-text2"
          >
            Enter your Phone number
          </label>
          <PhoneNumberInput
            value={phoneNumber}
            onChange={setPhoneNumber}
            disabled={loading}
            onValidityChange={setIsPhoneValid}
          />
        </div>

        <div className="mt-[1em] flex justify-center">
          <Primary
            className="flex w-[70%] justify-center bg-text2 py-2 text-white"
            onClick={getOtp}
            type="submit"
            disabled={loading || !isPhoneValid}
          >
            {loading ? (
              <ReactLoading
                color="#FFFFFF"
                width={25}
                height={25}
                type="spin"
              />
            ) : (
              "Next"
            )}
          </Primary>
        </div>
      </section>
    </main>
  );
};

export default TeirOneSecondModal;
