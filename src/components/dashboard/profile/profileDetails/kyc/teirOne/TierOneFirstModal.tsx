import React from "react";
import kyc from "../../../../../../Assets/png/kyc/teir-one.png";

interface TierOneFirstModalProps {
  onClose: () => void;
}

const TierOneFirstModal: React.FC<TierOneFirstModalProps> = ({ onClose }) => {
  return (
    <main className="w-full max-w-[28em] px-2 text-center font-sans md:px-5">
      <section className="gap- md:gap- flex flex-col py-6 md:py-8">
        <div className="flex justify-center">
          <img
            src={kyc}
            alt="kyc"
            className="h-[8em] w-[8em] object-contain sm:h-[10em] sm:w-[10em] md:h-[12em] md:w-[12em]"
          />
        </div>
        <header className="sm:px-4">
          <h2 className="text-base font-bold leading-tight sm:text-lg md:text-lg">
            Complete the Tier 0 for KYC Verification
          </h2>
        </header>
        <article className="mt-2 px-2 sm:px-4">
          <p className="text-sm font-medium">
            Please submit this documents to verify your profile
          </p>
        </article>
      </section>
    </main>
  );
};

export default TierOneFirstModal;
