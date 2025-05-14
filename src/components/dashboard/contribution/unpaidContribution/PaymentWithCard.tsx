import { useState, useEffect } from "react";
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
import {
  CardBrandLogo,
  cardDesigns,
  Chip,
  formatCardNumber,
  formatExpiryDate,
  handleCardSelect,
  handleCloseError,
  handleNext,
  handlePrev,
} from "../../../../shared/utils/Helpers";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { ROUTES } from "../../../../shared/routes";
import { Card } from "../../../../shared/types/types";
import { IoMdClose } from "react-icons/io";

const PaymentWithCard = ({ contributionData, onClose, isOpen }: any) => {
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

  useEffect(() => {
    if (isOpen) {
      setSelectedCard(null);
      setError(null);
      setCurrentPage(0);
    }
  }, [isOpen]);

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

  return (
    <Dialog
      size="sm"
      open={isOpen}
      handler={onClose}
      className="bg-[#ECECF2] px-4 sm:px-6"
    >
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => handleCloseError(setError)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => handleCloseError(setError)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      <div className="flex flex-col">
        <DialogHeader className="flex items-center justify-between">
          <IconButton
            variant="text"
            color="gray"
            onClick={onClose}
            className="p-2"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <IoMdClose size={24} className="text-text2" />
          </IconButton>
          <h2 className="flex-grow text-center text-xl font-semibold text-text2">
            Fund Contribution
          </h2>
        </DialogHeader>

        <DialogBody>
          <section className="rounded-3xl bg-white p-4 sm:p-6">
            {" "}
            <div className="flex flex-col">
              <DialogHeader className="flex flex-col text-center">
                <Typography
                  variant="h2"
                  className="text-base font-bold text-black sm:text-lg"
                >
                  My Cards
                </Typography>
                <Typography variant="small" className="text-sm sm:text-base">
                  Securely manage all debit cards connected.
                </Typography>
              </DialogHeader>

              <div className="relative mt-4">
                {cards?.length > 0 ? (
                  <>
                    <div className="relative mx-auto w-full overflow-hidden sm:w-[25em] sm:px-6">
                      {currentPage > 0 && (
                        <button
                          onClick={() =>
                            handlePrev(currentPage, setCurrentPage)
                          }
                          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1.5 shadow-lg sm:p-2"
                        >
                          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      )}

                      {cards[currentPage] && (
                        <div
                          onClick={() =>
                            handleCardSelect(
                              cards[currentPage],
                              setSelectedCard,
                              setError,
                            )
                          }
                          className={`group relative aspect-[1.8/1] w-full cursor-pointer rounded-xl bg-gradient-to-r px-2 py-2 shadow-lg transition-all hover:shadow-xl sm:px-4
                                    ${
                                      cardDesigns[
                                        cards[
                                          currentPage
                                        ]?.brand?.toLowerCase() as keyof typeof cardDesigns
                                      ] || cardDesigns.default
                                    }
                                    ${
                                      selectedCard?.authorization_code ===
                                      cards[currentPage].authorization_code
                                        ? "ring-2 ring-white"
                                        : ""
                                    }`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity group-hover:opacity-100" />

                          <div className="mb-3 text-sm font-bold text-white/90 sm:mb-4 sm:text-base">
                            {cards[currentPage]?.bank?.toUpperCase()}
                          </div>

                          <Chip />

                          <div className="font-mono mt-2 text-sm text-white/90 sm:mt-3 sm:text-base">
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
                          onClick={() =>
                            handleNext(currentPage, cards, setCurrentPage)
                          }
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

              <DialogFooter className="mt-6 flex w-full flex-col gap-3">
                {selectedCard ? (
                  <Button
                    onClick={() => handlePayment("card")}
                    disabled={isLoading}
                    loading={isLoading}
                    className="flex w-full items-center justify-center rounded-lg bg-text2 px-4 py-2.5 text-sm font-bold normal-case text-white transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "Loading..." : "Pay Now"}
                  </Button>
                ) : (
                  <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row sm:gap-4">
                    <Link
                      to={ROUTES.manage_cards}
                      className="text-sm font-bold text-text2"
                    >
                      Manage Cards
                    </Link>
                    <Button
                      onClick={() => handlePayment("paystack")}
                      disabled={isLoading}
                      className="flex w-full items-center justify-center rounded-lg bg-text2 px-4 py-2.5 text-sm font-bold normal-case text-white transition-colors disabled:opacity-50 sm:w-auto"
                    >
                      Pay Direct
                    </Button>
                  </div>
                )}
              </DialogFooter>
            </div>
          </section>
        </DialogBody>
      </div>
    </Dialog>
  );
};

export default PaymentWithCard;
