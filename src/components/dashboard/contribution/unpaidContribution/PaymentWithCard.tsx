import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../shared/redux/reduxHooks";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { AppDispatch } from "../../../../shared/redux/store";
import {
  GetWalletBalance,
  PayUnPaidContribution,
  VerifyFundContribution,
  verifyUnpaidContribution,
} from "../../../../shared/redux/slices/transaction.slices";

interface Card {
  number: string;
  authCode: string;
  isPreferred: boolean;
  failedAttempts: number;
}

interface WalletBalance {
  hasWithdrawnBefore: boolean;
  _id: string;
  balance: number;
  pin: string;
  user: string;
  isPinCreated: boolean;
  bankAccounts: any[];
  fundedProjects: any[];
  allCards: Card[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const cardColors = [
  { bg: "bg-gradient-to-r from-purple-500 to-purple-700", text: "text-white" },
  { bg: "bg-gradient-to-r from-pink-500 to-rose-500", text: "text-white" },
  { bg: "bg-gradient-to-r from-blue-500 to-cyan-500", text: "text-white" },
  { bg: "bg-gradient-to-r from-emerald-500 to-teal-500", text: "text-white" },
];

const PaymentWithCard = ({ contributionData }: any) => {
  const contributionId = contributionData;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const [translateX, setTranslateX] = useState(0);
  const cardsPerPage = 2;

  const isProcessing = useAppSelector(
    (state: any) => state?.transaction?.loading,
  );

  useEffect(() => {
    dispatch(GetWalletBalance());
  }, [dispatch]);

  const walletData = useAppSelector(
    (state: any) => state?.transaction?.getWalletBalance,
  ) as WalletBalance;

  const cards = walletData?.allCards ?? [];
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const handlePayment = async (paymentType: "card" | "paystack") => {
    try {
      const basePayload = {
        contributionId,
        paymentType,
      };

      let paymentResponse, verificationResponse;
      if (paymentType === "card" && selectedCard) {
        paymentResponse = await dispatch(
          PayUnPaidContribution({
            ...basePayload,
            cardData: selectedCard.authCode,
          }),
        ).unwrap();
        console.log("re", paymentResponse);
        verificationResponse = await dispatch(
          verifyUnpaidContribution({
            reference: paymentResponse.landing.charge.reference,
          }),
        ).unwrap();

        if (verificationResponse?.transaction?.statusCode === 200) {
          navigate("/dashboard/contribution");
        } else {
        }
      } else {
        paymentResponse = await dispatch(
          PayUnPaidContribution(basePayload),
        ).unwrap();
        if (paymentResponse.landing?.charge?.info?.data?.authorization_url) {
          window.location.href =
            paymentResponse.landing?.charge?.info?.data?.authorization_url;
        } else {
        }
      }
    } catch (error) {}
  };

  const handleCardSelect = (card: Card) => {
    setSelectedCard(card);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      setTranslateX((currentPage + 1) * -100);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setTranslateX((currentPage - 1) * -100);
    }
  };

  const getCurrentPageCards = () => {
    const startIndex = currentPage * cardsPerPage;
    return cards.slice(startIndex, startIndex + cardsPerPage);
  };

  return (
    <main className="mx-auto max-w-2xl font-sans">
      <div className="flex flex-col gap-6 p-6">
        <header className="text-center">
          <h1 className="text-lg font-bold text-text2">Fund Contribution</h1>
        </header>

        <section className="rounded-3xl bg-white p-6">
          <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-2 text-center">
              <h2 className="font-bold">My Cards</h2>
              <p className="text-sm text-gray-600">
                Securely manage all debit cards connected. Tap a card for more
                options.
              </p>
            </header>

            <div className="relative w-full overflow-hidden">
              <h2 className="mb-2 text-lg font-bold">Select Card</h2>
              <hr />
              <div className="relative mt-2">
                {currentPage > 0 && (
                  <button
                    onClick={handlePrev}
                    className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all hover:bg-gray-50"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                )}

                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(${translateX}%)` }}
                  >
                    {getCurrentPageCards().map((card, idx) => (
                      <div
                        key={card.authCode}
                        className={`min-w-[50%] flex-shrink-0 p-2
                    ${idx === getCurrentPageCards().length - 1 ? "pr-4" : ""}
                  `}
                      >
                        <div
                          className={`cursor-pointer rounded-lg p-5 transition-all
                      ${cardColors[idx % cardColors.length].bg}
                      ${cardColors[idx % cardColors.length].text}
                      ${selectedCard?.authCode === card.authCode ? "ring-2 ring-white" : ""}
                    `}
                          onClick={() => handleCardSelect(card)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex flex-col gap-3">
                              <p>*** *** *** {card.number}</p>
                              <p>MasterCard/Mar 2026</p>
                            </div>
                            <div
                              className={`flex h-4 w-4 items-center justify-center rounded-full border-2 border-white
                          ${selectedCard?.authCode === card.authCode ? "bg-white" : "bg-transparent"}
                        `}
                            >
                              {selectedCard?.authCode === card.authCode && (
                                <div className="h-2 w-2 rounded-full bg-current" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {currentPage < totalPages - 1 && (
                  <button
                    onClick={handleNext}
                    className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all hover:bg-gray-50"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex w-full flex-col gap-4">
              {selectedCard ? (
                <div className="flex w-full flex-col gap-2">
                  <p className="text-center text-sm text-gray-600">
                    Selected card ending in {selectedCard.number}
                  </p>
                  <button
                    onClick={() => handlePayment("card")}
                    disabled={isProcessing}
                    className="flex w-full items-center justify-center rounded-lg bg-purple-600 px-4 py-2 font-bold text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Proceed with Card Payment"
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex w-full items-center justify-between">
                  <Link
                    to="/dashboard/contribution/manage_cards"
                    className="text-sm font-bold text-text2"
                  >
                    Manage Cards
                  </Link>
                  <button
                    onClick={() => handlePayment("paystack")}
                    disabled={isProcessing}
                    className="flex items-center justify-center rounded-lg bg-purple-600 px-4 py-2 font-bold text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Pay Direct"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PaymentWithCard;
