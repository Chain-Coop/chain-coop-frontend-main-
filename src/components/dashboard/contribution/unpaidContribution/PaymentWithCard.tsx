import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../shared/redux/reduxHooks";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { AppDispatch } from "../../../../shared/redux/store";
import {
  GetWalletCard,
  PayUnPaidContribution,
} from "../../../../shared/redux/slices/transaction.slices";
import { Alert, Snackbar } from "@mui/material";
import { useUserCard } from "../../../../shared/Hooks/useUserProfile";
import { CardBrandLogo } from "../../../../shared/utils/Helpers";

interface Card {
  authorization_code: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  card_type: string;
  bank: string;
  brand: string;
}

const cardDesigns = {
  visa: "from-blue-600 to-blue-800",
  mastercard: "from-red-600 to-orange-600",
  verve: "from-green-600 to-emerald-800",
  default: "from-purple-600 to-purple-800",
};

const Chip = () => (
  <div className="relative h-8 w-11">
    <div className="absolute h-full w-full rounded-md bg-gradient-to-br from-yellow-600 to-yellow-700">
      <div className="absolute left-1 top-1 h-6 w-9 rounded-md border-2 border-yellow-800/30">
        <div className="grid h-full w-full grid-cols-4 grid-rows-4 gap-[1px]">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="bg-yellow-800/20" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const PaymentWithCard = ({ contributionData, onClose }: any) => {
  const { useWalletCards } = useUserCard();
  const contributionId = contributionData;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(GetWalletCard());
  }, [dispatch]);

  const cards = useWalletCards?.cards ?? [];

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

  const handleCloseError = () => setError(null);

  const handleCardSelect = (card: Card) => setSelectedCard(card);

  const handleNext = () =>
    currentPage < cards.length - 1 && setCurrentPage((prev) => prev + 1);

  const handlePrev = () =>
    currentPage > 0 && setCurrentPage((prev) => prev - 1);

  const formatCardNumber = (last4: string) => `**** **** **** ${last4}`;

  const formatExpiryDate = (month: string, year: string) =>
    `${month.padStart(2, "0")}/${year.slice(-2)}`;

  return (
    <main className="mx-auto w-full max-w-md px-4 font-sans sm:px-6">
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

      <div className="flex flex-col gap-4 py-4">
        <header className="text-center">
          <h1 className="text-lg font-bold text-gray-800 sm:text-xl">
            Fund Contribution
          </h1>
        </header>

        <section className="rounded-xl bg-white p-4">
          <div className="flex flex-col gap-4">
            <header className="text-center">
              <h2 className="text-base font-bold sm:text-lg">
                Select Payment Card
              </h2>
              <p className="text-xs text-gray-600 sm:text-sm">
                Choose a card to process your payment
              </p>
            </header>

            <div className="relative">
              {cards.length > 0 ? (
                <>
                  <div className="relative mx-auto w-full overflow-hidden px-4 sm:w-[25em] sm:px-6">
                    {currentPage > 0 && (
                      <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1.5 shadow-lg sm:p-2"
                      >
                        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    )}

                    {cards[currentPage] && (
                      <div
                        onClick={() => handleCardSelect(cards[currentPage])}
                        className={`group relative aspect-[1.6/1] w-full cursor-pointer rounded-xl bg-gradient-to-r px-3 py-2 shadow-lg transition-all hover:shadow-xl sm:px-4
                          ${cardDesigns[cards[currentPage].brand.toLowerCase() as keyof typeof cardDesigns] || cardDesigns.default}
                          ${selectedCard?.authorization_code === cards[currentPage].authorization_code ? "ring-2 ring-white" : ""}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity group-hover:opacity-100" />

                        <div className="mb-3 text-sm font-bold text-white/90 sm:mb-4 sm:text-base">
                          {cards[currentPage].bank.toUpperCase()}
                        </div>

                        <Chip />

                        <div className="mt-2 font-mono text-sm text-white/90 sm:mt-3 sm:text-base">
                          {formatCardNumber(cards[currentPage].last4)}
                        </div>

                        <div className="mt-1 flex items-end justify-between">
                          <div className="text-white/80">
                            <div className="text-xs uppercase">Expires</div>
                            <div className="font-mono text-xs sm:text-sm">
                              {formatExpiryDate(
                                cards[currentPage].exp_month,
                                cards[currentPage].exp_year,
                              )}
                            </div>
                          </div>
                          <CardBrandLogo brand={cards[currentPage].brand} />
                        </div>
                      </div>
                    )}

                    {currentPage < cards.length - 1 && (
                      <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1.5 shadow-lg sm:p-2"
                      >
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    )}
                  </div>

                  <div className="mt-4 flex justify-center gap-1">
                    {cards.map((_: any, idx: number) => (
                      <div
                        key={idx}
                        className={`h-1.5 w-1.5 rounded-full transition-all ${
                          currentPage === idx
                            ? "w-3 bg-purple-600"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center text-sm text-gray-600">
                  No saved cards found.
                </div>
              )}
            </div>

            <div className="flex w-full flex-col gap-3">
              {selectedCard ? (
                <button
                  onClick={() => handlePayment("card")}
                  disabled={isLoading}
                  className="flex w-full items-center justify-center rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Pay Now"
                  )}
                </button>
              ) : (
                <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row sm:gap-4">
                  <Link
                    to="/dashboard/profile/manage-cards"
                    className="text-sm font-bold text-purple-600"
                  >
                    Manage Cards
                  </Link>
                  <button
                    onClick={() => handlePayment("paystack")}
                    disabled={isLoading}
                    className="flex w-full items-center justify-center rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-purple-700 disabled:opacity-50 sm:w-auto"
                  >
                    {isLoading ? (
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
