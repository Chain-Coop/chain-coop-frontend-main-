import React from "react";
import { useNavigate } from "react-router";

const SuccessfulModal = () => {
  const navigate = useNavigate();
  const handleProposalPage = () => {
    navigate("/dashboard/proposal");
  };
  return (
    <main className="py-[2em] sm:mt-3 font-sans">
      <header>
        <h1 className="flex justify-center text-lg font-bold text-memt1">
          Your Proposal was submitted
        </h1>
      </header>
      <article className="mt-[1em] font-medium">
        Your proposal has been successfully submitted Chain Coop for review
        before the voting process begins. Decicion making is free for all and
        outcome will be determined by other memebers of your DOA. Stay tunded
        for more updates!
      </article>
      <button
        type="button"
        onClick={handleProposalPage}
        className="m-auto mt-[2em] flex w-[50%] justify-center rounded-full bg-text2 px-[3em] py-[10px] font-sans text-text3 shadow-lg"
      >
        Continue
      </button>
    </main>
  );
};

export default SuccessfulModal;
