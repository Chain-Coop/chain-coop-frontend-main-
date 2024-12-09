import React from "react";
import kyc from "../../../../../../Assets/png/kyc/teir-one.png";

const TierOneFirstModal = ({ onClose }: any) => {
  return (
    <main className="font-sans">
      <section className="flex flex-col gap-[1em] py-[2em]">
        <img src={kyc} alt="" />
      </section>
    </main>
  );
};

export default TierOneFirstModal;
