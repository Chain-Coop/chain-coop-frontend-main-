import React from "react";
import PropTypes from "prop-types";
import { Primary } from "../../../../common/Button";

const TransferModal = ({ onContinue }: any) => {
  return (
    <main className="lg:p-4">
      <article className="mt-[2.5em]">
        <header>
          <h1 className="text-center text-[1.5em] font-bold text-text2">
            Bank Transfer
          </h1>
        </header>
        <section className="mt-[2em]">
          <div className="mt-3 flex justify-between">
            <p className="font-medium text-howtext">Bank</p>
            <p className="font-medium">Guranty Trust Bank</p>
          </div>
          <hr className="mt-3 h-[1px] rounded-md" />
          <div className="mt-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="whitespace-nowrap text-sm font-medium text-howtext sm:text-base">
              Account Name
            </p>
            <p className="whitespace-nowrap text-sm font-medium sm:ml-4 sm:text-base">
              Chain Cooperative Limited
            </p>
          </div>

          <hr className="mt-3 h-[1px] rounded-md" />
          <div className="mt-5 flex justify-between">
            <p className="font-medium text-howtext">Account Number</p>
            <p className="font-medium">0165350081</p>
          </div>
          <hr className="mt-3 h-[1px] rounded-md" />
        </section>

        <div className="mt-[1em] text-center">
          <p className="text-sm font-medium text-howtext">
            Note: Transfer exact money to the account details above
          </p>
        </div>
        <Primary
          className="mt-[1em] w-full bg-text2 py-3 text-white"
          onClick={onContinue}
        >
          Click here after transfer
        </Primary>
      </article>
    </main>
  );
};

TransferModal.propTypes = {
  onContinue: PropTypes.func.isRequired,
};

export default TransferModal;
