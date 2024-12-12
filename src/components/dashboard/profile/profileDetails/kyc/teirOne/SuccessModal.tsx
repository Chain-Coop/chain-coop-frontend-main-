import React from "react";

const SuccessModal = () => {
  return (
    <main className="w-full max-w-[28em] px-4 py-6 font-sans md:px-8 md:py-8">
      <section className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col gap-2">
          <header className="text-center">
            <h2 className="text-lg font-bold leading-tight md:text-xl">
              Enter OTP Verification Code
            </h2>
          </header>
        </div>
      </section>
    </main>
  );
};

export default SuccessModal;
