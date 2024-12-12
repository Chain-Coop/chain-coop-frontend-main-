import React from "react";
import { CheckCircle } from "lucide-react";
import success from "../../../../../../../Assets/png/dashboard/success.png";

const SuccessModal = ({ onClose }: any) => {
  return (
    <main className="w-full max-w-[30em] px-3 py-6 font-sans md:px-8 md:py-8">
      <section className="flex flex-col items-center gap-6 text-center">
        <div>
          <img src={success} alt="success" className="h-[7em] w-[7em]" />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-600">
            Your phone number has now been verified you are now in Teir 0.
          </p>
        </div>
      </section>
    </main>
  );
};

export default SuccessModal;
