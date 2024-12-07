import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../shared/redux/reduxHooks";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { AppDispatch } from "../../../../shared/redux/store";
import {
  GetWalletCard,
  PayUnPaidContribution,
} from "../../../../shared/redux/slices/transaction.slices";
import { Alert, Snackbar } from "@mui/material";
import { useUserCard } from "../../../../shared/Hooks/useUserProfile";

interface Card {
  number: string;
  authCode: string;
  isPreferred: boolean;
  failedAttempts: number;
  authorization_code: string;
  last4: number;
}

const cardColors = [
  { bg: "bg-gradient-to-r from-purple-500 to-purple-700", text: "text-white" },
  { bg: "bg-gradient-to-r from-pink-500 to-rose-500", text: "text-white" },
  { bg: "bg-gradient-to-r from-blue-500 to-cyan-500", text: "text-white" },
  { bg: "bg-gradient-to-r from-emerald-500 to-teal-500", text: "text-white" },
];

const PaymentWithCard = ({ contributionData, onClose }: any) => {
  const { useWalletCards } = useUserCard();
  const contributionId = contributionData;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const cardsPerPage = window.innerWidth >= 640 ? 2 : 1;

  useEffect(() => {
    dispatch(GetWalletCard());
  }, [dispatch]);

  const cards = useWalletCards?.cards ?? [];
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const handlePayment = async (paymentType: "card" | "paystack") => {
    setError(null);
    setIsLoading(true);

    try {
      const basePayload = {
        contributionId,
        paymentType,
      };

      let paymentResponse;
      if (paymentType === "card" && selectedCard) {
        paymentResponse = await dispatch(
          PayUnPaidContribution({
            ...basePayload,
            cardData: selectedCard.authorization_code,
          }),
        ).unwrap();
        onClose();
        navigate("/dashboard/contribution");
      } else {
        paymentResponse = await dispatch(
          PayUnPaidContribution(basePayload),
        ).unwrap();
        if (paymentResponse.landing?.charge?.info?.data?.authorization_url) {
          window.location.href =
            paymentResponse.landing?.charge?.info?.data?.authorization_url;
        } else {
          throw new Error("Failed to initiate payment. Please try again.");
        }
      }
    } catch (error: any) {
      setError(error || "An error occurred during payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleCardSelect = (card: Card) => {
    setSelectedCard(card);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      setTranslateX(-100 * (currentPage + 1));
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setTranslateX(-100 * (currentPage - 1));
    }
  };

  const formatCardNumber = (last4: string) => {
    return `**** **** **** ${last4}`;
  };

  const formatExpiryDate = (month: string, year: string) => {
    return `${month.padStart(2, "0")}/${year.slice(-2)}`;
  };

  return (
    <main className="mx-auto max-w-2xl font-sans">
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <div className="sm:p- flex flex-col gap-3 p-3 sm:gap-6">
        <header className="text-center">
          <h1 className="text-base font-bold text-text2 sm:text-lg">
            Fund Contribution
          </h1>
        </header>

        <section
          className="rounded-2xl bg-white 
        p-4 sm:rounded-3xl lg:p-4"
        >
          <div className="flex flex-col gap-4">
            <header className="flex flex-col gap-1 text-center sm:gap-1">
              <h2 className="text-base font-bold sm:text-lg">My Cards</h2>
              <p className="text-xs text-gray-600 sm:text-sm">
                Securely manage all debit cards connected.
              </p>
            </header>

            <div className="w-full">
              <h2 className="mb-1 px-3 text-base font-bold sm:mb-2 sm:text-lg">
                Select Card
              </h2>
              <hr />

              <div className="relative mt-2">
                <div className="mx-auto overflow-hidden px-8">
                  {currentPage > 0 && (
                    <button
                      onClick={handlePrev}
                      className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all hover:bg-gray-50"
                    >
                      <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
                    </button>
                  )}

                  <div className="relative overflow-hidden">
                    <div
                      className="flex transition-transform duration-300 ease-in-out"
                      style={{ transform: `translateX(${translateX}%)` }}
                    >
                      {cards.map((card: any, idx: number) => (
                        <div
                          key={card.authCode}
                          className="w-full px-2 sm:w-1/2"
                          style={{
                            width: window.innerWidth >= 640 ? "50%" : "100%",
                            flexShrink: 0,
                          }}
                        >
                          <div
                            className={`h-full cursor-pointer rounded-lg p-3 transition-all sm:p-5
                            ${cardColors[idx % cardColors.length].bg}
                            ${cardColors[idx % cardColors.length].text}
                            ${selectedCard?.authCode === card.authCode ? "ring-2 ring-white" : ""}
                          `}
                            onClick={() => handleCardSelect(card)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex flex-col gap-2 sm:gap-3">
                                <p className="text-sm sm:text-base">
                                  {formatCardNumber(card?.last4)}
                                </p>
                                <div className="mt-2 flex items-center justify-between">
                                  <p className="text-xs sm:text-sm">
                                    {card.brand.toUpperCase()} • {card?.bank}
                                  </p>
                                  {/* <p className="text-xs sm:text-sm">
                                    Expires{" "}
                                    {formatExpiryDate(
                                      card?.exp_month,
                                      card?.exp_year,
                                    )}
                                  </p> */}
                                </div>
                              </div>
                              <div
                                className={`flex h-3 w-3 items-center justify-center rounded-full border-2 border-white sm:h-4 sm:w-4
                                ${selectedCard?.authorization_code === card.authorization_code ? "bg-white" : "bg-transparent"}
                              `}
                              >
                                {selectedCard?.authCode ===
                                  card.authorization_code && (
                                  <div className="h-1.5 w-1.5 rounded-full bg-current sm:h-2 sm:w-2" />
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
                      className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
                    >
                      <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:gap-4">
              {selectedCard ? (
                <div className="flex w-full flex-col gap-2">
                  <p className="text-center text-xs text-gray-600 sm:text-sm">
                    Selected card ending in {selectedCard.last4}
                  </p>
                  <button
                    onClick={() => handlePayment("card")}
                    disabled={isLoading}
                    className="flex w-full items-center justify-center rounded-lg bg-purple-600 px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-purple-700 disabled:opacity-50 sm:px-4 sm:text-base"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" />
                    ) : (
                      "Proceed with Card Payment"
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex w-full items-center justify-between">
                  <Link
                    to="/dashboard/contribution/manage_cards"
                    className="text-xs font-bold text-text2 sm:text-sm"
                  >
                    Manage Cards
                  </Link>
                  <button
                    onClick={() => handlePayment("paystack")}
                    disabled={isLoading}
                    className="flex items-center justify-center rounded-lg bg-purple-600 px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-purple-700 disabled:opacity-50 sm:px-4 sm:text-base"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" />
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
