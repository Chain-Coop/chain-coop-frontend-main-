import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetWalletBalance } from "../../../../shared/redux/slices/transaction.slices";
import { DashboardHeader } from "../../../common/DashboardHeader";
import Modal from "../../../common/Modal";
import TransferModal from "./modal/TransferModal";
import UploadReceiptModal from "./modal/UploadReceiptModal";
import PaymentSuccessfull from "./modal/PaymentSuccessfull";
import EmailAmountModal from "./modal/paystack/EmailAmountModal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import fund from "../../../../Assets/svg/dashboard/wallet/withdraw.svg";
import debit from "../../../../Assets/svg/dashboard/wallet/debit.svg";

const FundWallet = () => {
  const [modalType, setModalType] = useState(null);
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBackClick = () => {
    navigate(-1);
  };

  const openModal = (type) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  const handleTransferContinue = () => {
    closeModal();
    openModal("upload");
  };

  const handleUploadContinue = () => {
    closeModal();
    openModal("final");
  };

  const handlePaystackPayment = (e) => {
    e.preventDefault();

    const handler = window.PaystackPop.setup({
      key: "pk_test_23c84d5c89c5b18982c60e27e917a498d8f76dd9",
      email: email,
      amount: amount * 100,
      currency: "NGN",
      ref: `REF-${Math.floor(Math.random() * 1000000)}`,
      onClose: function () {},
      callback: function (response) {
        console.log("paystack response", response);
        handlePaymentSuccess(response.reference);
        setEmail("");
        setAmount();
      },
    });
    handler.openIframe();
    closeModal();
  };

  const handlePaymentSuccess = (reference) => {
    console.log("Payment reference:", reference);
    fetch("https://chain-coop-backend.onrender.com/api/v1/wallet/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reference }),
    })
      .then((response) => {
        console.log("Webhook response status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Webhook response:", data);
        dispatch(GetWalletBalance());
      })
      .catch((error) => {
        console.error("Error calling webhook:", error);
      });
  };

  return (
    <main className="font-sans">
      <header className="mt-[2em]">
        <DashboardHeader>
          <div className="flex w-[55%] items-center justify-between">
            <IoIosArrowBack
              size={25}
              className="cursor-pointer"
              onClick={handleBackClick}
            />
            <h1 className="tracking-wide">Fund Wallet</h1>
          </div>
        </DashboardHeader>
      </header>
      <section className="m-auto mt-[1.5em] h-full w-full px-[1em]">
        <div
          className="flex items-center justify-between"
          onClick={() => openModal("transfer")}
        >
          <div className="flex cursor-pointer items-center gap-4">
            <img src={fund} alt="Withdraw" />
            <div>
              <h2 className="font-medium">Bank Transfer</h2>
              <p className="text-sm font-medium text-howtext">
                Transfer to your wallet account number
              </p>
            </div>
          </div>
          <IoIosArrowForward
            size={25}
            className="hidden cursor-pointer lg:block"
          />
        </div>
        <hr className="mt-3 h-[1px] rounded-md" />
        <article className="mt-[1em] flex items-center justify-between">
          <div
            className="flex cursor-pointer items-center gap-4"
            onClick={() => openModal("paystack")}
          >
            <img src={debit} alt="Withdraw" />
            <div>
              <h2 className="font-medium">Debit / Credit Card</h2>
              <p className="text-sm font-medium text-howtext">
                Fund with Naira cards
              </p>
            </div>
          </div>
          <IoIosArrowForward
            size={25}
            className="cursor-pointer sm:hidden lg:block"
          />
        </article>
      </section>

      <Modal
        isOpen={modalType === "transfer"}
        onClose={closeModal}
        className="bg-white"
      >
        <TransferModal onContinue={handleTransferContinue} />
      </Modal>

      <Modal
        isOpen={modalType === "upload"}
        onClose={closeModal}
        className="bg-white"
      >
        <UploadReceiptModal onContinue={handleUploadContinue} />
      </Modal>

      <Modal
        isOpen={modalType === "final"}
        onClose={closeModal}
        className="bg-white"
      >
        <PaymentSuccessfull />
      </Modal>

      <Modal
        isOpen={modalType === "paystack"}
        onClose={closeModal}
        className="bg-white"
      >
        <EmailAmountModal
          email={email}
          setEmail={setEmail}
          amount={amount}
          setAmount={(value) => setAmount(Number(value))}
          handlePaystackPayment={handlePaystackPayment}
          closeModal={closeModal}
        />
      </Modal>
    </main>
  );
};

export default FundWallet;
