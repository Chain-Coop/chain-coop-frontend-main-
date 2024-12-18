import React from "react";
import kyc from "../../../../../../../Assets/png/kyc/teir-one.png";

interface TierOneFirstModalProps {
  onClose: () => void;
  onStepOneClick: () => void;
  isVerified: boolean;
}

const TierOneFirstModal: React.FC<TierOneFirstModalProps> = ({
  onClose,
  onStepOneClick,
  isVerified,
}) => {
  return (
    <main className="w-full max-w-[28em] px-2 font-sans md:px-5">
      <section className="flex flex-col gap-3 py-6 md:py-8">
        <div className="flex justify-center">
          <img
            src={kyc}
            alt="kyc"
            className="h-[8em] w-[8em] object-contain sm:h-[10em] sm:w-[10em] md:h-[12em] md:w-[12em]"
          />
        </div>

        <div className="mt-[1em] flex flex-col gap-1">
          <header className="text-center sm:px-4">
            <h2 className="text-base font-bold leading-tight sm:text-lg md:text-lg">
              Complete the Tier 0 for KYC Verification
            </h2>
          </header>
          <article className="px-2 text-center sm:px-3">
            <p className="text-sm font-medium text-gray-600">
              Please submit these documents to verify your profile
            </p>
          </article>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-bold text-gray-900">Manage Limit</h3>
              <p className="text-xs text-gray-500">
                Daily Transaction Limit: N0.00
              </p>
            </div>
            <button className="rounded bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600">
              Upgrade
            </button>
          </div>

          <div
            className={`flex w-full items-center justify-between rounded-lg border border-gray-200 p-4 shadow-sm ${
              !isVerified ? "cursor-pointer" : ""
            }`}
            onClick={!isVerified ? onStepOneClick : undefined}
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-bold text-gray-900">Step 1</h3>
              <p className="text-xs text-gray-500">Upload your Phone number</p>
            </div>
            {isVerified ? (
              <button className="rounded bg-green-500  px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600">
                Done
              </button>
            ) : (
              <button className="rounded-full bg-gray-100 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* BVN Step */}
          <div
            className={`flex w-full items-center justify-between rounded-lg border border-gray-200 p-4 shadow-sm ${
              !isVerified ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-bold text-gray-900">Step 3</h3>
              <p className="text-xs text-gray-500">Upload your BVN</p>
            </div>
            <button className="rounded-full bg-gray-100 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TierOneFirstModal;
