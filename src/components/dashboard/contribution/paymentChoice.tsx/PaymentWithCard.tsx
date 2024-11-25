// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   useAppSelector,
//   useAppDispatch,
// } from "../../../../shared/redux/reduxHooks";
// import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
// import { AppDispatch } from "../../../../shared/redux/store";
// import {
//   GetWalletBalance,
//   PayContribution,
//   VerifyFundContribution,
// } from "../../../../shared/redux/slices/transaction.slices";
// import { Alert, Snackbar } from "@mui/material";

// interface Card {
//   number: string;
//   authCode: string;
//   isPreferred: boolean;
//   failedAttempts: number;
// }

// interface WalletBalance {
//   hasWithdrawnBefore: boolean;
//   _id: string;
//   balance: number;
//   pin: string;
//   user: string;
//   isPinCreated: boolean;
//   bankAccounts: any[];
//   fundedProjects: any[];
//   allCards: Card[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// interface PaymentWithCardProps {
//   contributionData: any;
//   onClose: () => void;
// }

// const cardColors = [
//   { bg: "bg-gradient-to-r from-purple-500 to-purple-700", text: "text-white" },
//   { bg: "bg-gradient-to-r from-pink-500 to-rose-500", text: "text-white" },
//   { bg: "bg-gradient-to-r from-blue-500 to-cyan-500", text: "text-white" },
//   { bg: "bg-gradient-to-r from-emerald-500 to-teal-500", text: "text-white" },
// ];

// const PaymentWithCard: React.FC<PaymentWithCardProps> = ({
//   contributionData,
//   onClose,
// }) => {
//   const contributionId = contributionData.contributionId;
//   const navigate = useNavigate();
//   const dispatch: AppDispatch = useAppDispatch();
//   const [selectedCard, setSelectedCard] = useState<Card | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [translateX, setTranslateX] = useState(0);
//   const cardsPerPage = 2;

//   useEffect(() => {
//     dispatch(GetWalletBalance());
//     return () => {
//       setIsLoading(false);
//       setError(null);
//       setSelectedCard(null);
//     };
//   }, [dispatch]);

//   const walletData = useAppSelector(
//     (state: any) => state?.transaction?.getWalletBalance,
//   ) as WalletBalance;

//   const cards = walletData?.allCards ?? [];
//   const totalPages = Math.ceil(cards.length / cardsPerPage);

//   const handlePayment = async (paymentType: "card" | "paystack") => {
//     setError(null);
//     setIsLoading(true);

//     try {
//       const basePayload = {
//         contributionId,
//         paymentType,
//       };

//       let paymentResponse, verificationResponse;

//       if (paymentType === "card" && selectedCard) {
//         paymentResponse = await dispatch(
//           PayContribution({
//             ...basePayload,
//             cardData: selectedCard.authCode,
//             userId: walletData?.user,
//           }),
//         ).unwrap();

//         verificationResponse = await dispatch(
//           VerifyFundContribution({
//             reference: paymentResponse.landing.payment.reference,
//           }),
//         ).unwrap();

//         if (verificationResponse?.transaction?.statusCode === 200) {
//           onClose();
//           navigate("/dashboard/contribution");
//         }
//       } else {
//         paymentResponse = await dispatch(PayContribution(basePayload)).unwrap();

//         if (paymentResponse?.landing?.payment?.info?.data) {
//           onClose();
//           window.location.href =
//             paymentResponse.landing.payment.info.data.authorization_url;
//         }
//       }
//     } catch (error: any) {
//       setError(
//         error?.message || "An error occurred during payment. Please try again.",
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCardSelect = (card: Card) => {
//     setError(null);
//     setSelectedCard(card);
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages - 1) {
//       setCurrentPage(currentPage + 1);
//       setTranslateX((currentPage + 1) * -100);
//     }
//   };

//   const handlePrev = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//       setTranslateX((currentPage - 1) * -100);
//     }
//   };

//   const getCurrentPageCards = () => {
//     const startIndex = currentPage * cardsPerPage;
//     return cards.slice(startIndex, startIndex + cardsPerPage);
//   };

//   const handleCloseError = () => {
//     setError(null);
//   };

//   return (
//     <main className="mx-auto max-w-2xl font-sans">
//       <Snackbar
//         open={!!error}
//         autoHideDuration={6000}
//         onClose={handleCloseError}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleCloseError}
//           severity="error"
//           variant="filled"
//           sx={{ width: "100%" }}
//         >
//           {error}
//         </Alert>
//       </Snackbar>
//       <div className="flex flex-col gap-6 p-6">
//         <header className="text-center">
//           <h1 className="text-lg font-bold text-text2">Fund Contribution</h1>
//         </header>

//         <section className="rounded-3xl bg-white p-6">
//           <div className="flex flex-col gap-6">
//             <header className="flex flex-col gap-2 text-center">
//               <h2 className="font-bold">My Cards</h2>
//               <p className="text-sm text-gray-600">
//                 Securely manage all debit cards connected. Tap a card for more
//                 options.
//               </p>
//             </header>

//             <div className="relative w-full overflow-hidden">
//               <h2 className="mb-2 text-lg font-bold">Select Card</h2>
//               <hr />
//               <div className="relative mt-2">
//                 {currentPage > 0 && (
//                   <button
//                     onClick={handlePrev}
//                     className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all hover:bg-gray-50"
//                   >
//                     <ChevronLeft className="h-6 w-6" />
//                   </button>
//                 )}

//                 <div className="overflow-hidden">
//                   <div
//                     className="flex transition-transform duration-300 ease-in-out"
//                     style={{ transform: `translateX(${translateX}%)` }}
//                   >
//                     {getCurrentPageCards().map((card, idx) => (
//                       <div
//                         key={card.authCode}
//                         className={`min-w-[50%] flex-shrink-0 p-2
//                     ${idx === getCurrentPageCards().length - 1 ? "pr-4" : ""}
//                   `}
//                       >
//                         <div
//                           className={`cursor-pointer rounded-lg p-5 transition-all
//                       ${cardColors[idx % cardColors.length].bg}
//                       ${cardColors[idx % cardColors.length].text}
//                       ${selectedCard?.authCode === card.authCode ? "ring-2 ring-white" : ""}
//                     `}
//                           onClick={() => handleCardSelect(card)}
//                         >
//                           <div className="flex items-start justify-between">
//                             <div className="flex flex-col gap-3">
//                               <p>*** *** *** {card.number}</p>
//                               <p>MasterCard/Mar 2026</p>
//                             </div>
//                             <div
//                               className={`flex h-4 w-4 items-center justify-center rounded-full border-2 border-white
//                           ${selectedCard?.authCode === card.authCode ? "bg-white" : "bg-transparent"}
//                         `}
//                             >
//                               {selectedCard?.authCode === card.authCode && (
//                                 <div className="h-2 w-2 rounded-full bg-current" />
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {currentPage < totalPages - 1 && (
//                   <button
//                     onClick={handleNext}
//                     className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all hover:bg-gray-50"
//                   >
//                     <ChevronRight className="h-6 w-6" />
//                   </button>
//                 )}
//               </div>
//             </div>

//             <div className="flex w-full flex-col gap-4">
//               {selectedCard ? (
//                 <div className="flex w-full flex-col gap-2">
//                   <p className="text-center text-sm text-gray-600">
//                     Selected card ending in {selectedCard.number}
//                   </p>
//                   <button
//                     onClick={() => handlePayment("card")}
//                     disabled={isLoading}
//                     className="flex w-full items-center justify-center rounded-lg bg-purple-600 px-4 py-2 font-bold text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
//                   >
//                     {isLoading ? (
//                       <Loader2 className="h-5 w-5 animate-spin" />
//                     ) : (
//                       "Proceed with Card Payment"
//                     )}
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex w-full items-center justify-between">
//                   <Link
//                     to="/dashboard/contribution/manage_cards"
//                     className="text-sm font-bold text-text2"
//                   >
//                     Manage Cards
//                   </Link>
//                   <button
//                     onClick={() => handlePayment("paystack")}
//                     disabled={isLoading}
//                     className="flex items-center justify-center rounded-lg bg-purple-600 px-4 py-2 font-bold text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
//                   >
//                     {isLoading ? (
//                       <Loader2 className="h-5 w-5 animate-spin" />
//                     ) : (
//                       "Pay Direct"
//                     )}
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// };

// export default PaymentWithCard;

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
  PayContribution,
  VerifyFundContribution,
} from "../../../../shared/redux/slices/transaction.slices";
import { Alert, Snackbar } from "@mui/material";

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

interface PaymentWithCardProps {
  contributionData: any;
  onClose: () => void;
}

const cardColors = [
  { bg: "bg-gradient-to-r from-purple-500 to-purple-700", text: "text-white" },
  { bg: "bg-gradient-to-r from-pink-500 to-rose-500", text: "text-white" },
  { bg: "bg-gradient-to-r from-blue-500 to-cyan-500", text: "text-white" },
  { bg: "bg-gradient-to-r from-emerald-500 to-teal-500", text: "text-white" },
];

const PaymentWithCard: React.FC<PaymentWithCardProps> = ({
  contributionData,
  onClose,
}) => {
  const contributionId = contributionData.contributionId;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const cardsPerPage = 2;

  useEffect(() => {
    dispatch(GetWalletBalance());
    return () => {
      setIsLoading(false);
      setError(null);
      setSelectedCard(null);
    };
  }, [dispatch]);

  const walletData = useAppSelector(
    (state: any) => state?.transaction?.getWalletBalance,
  ) as WalletBalance;

  const cards = walletData?.allCards ?? [];
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const handlePayment = async (paymentType: "card" | "paystack") => {
    setError(null);
    setIsLoading(true);

    try {
      const basePayload = {
        contributionId,
        paymentType,
      };

      let paymentResponse, verificationResponse;

      if (paymentType === "card" && selectedCard) {
        paymentResponse = await dispatch(
          PayContribution({
            ...basePayload,
            cardData: selectedCard.authCode,
            userId: walletData?.user,
          }),
        ).unwrap();

        verificationResponse = await dispatch(
          VerifyFundContribution({
            reference: paymentResponse.landing.payment.reference,
          }),
        ).unwrap();

        if (verificationResponse?.transaction?.statusCode === 200) {
          onClose();
          navigate("/dashboard/contribution");
        }
      } else {
        paymentResponse = await dispatch(PayContribution(basePayload)).unwrap();

        if (paymentResponse?.landing?.payment?.info?.data) {
          onClose();
          window.location.href =
            paymentResponse.landing.payment.info.data.authorization_url;
        }
      }
    } catch (error: any) {
      setError(
        error?.message || "An error occurred during payment. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardSelect = (card: Card) => {
    setError(null);
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

  const handleCloseError = () => {
    setError(null);
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
        sm:rounded-3xl sm:p-2 lg:p-4"
        >
          <div className="flex flex-col gap-4">
            <header className="flex flex-col gap-1 text-center sm:gap-1">
              <h2 className="text-base font-bold sm:text-lg">My Cards</h2>
              <p className="text-xs text-gray-600 sm:text-sm">
                Securely manage all debit cards connected.
              </p>
            </header>

            <div className="relative w-full overflow-hidden">
              <h2 className="mb-1 text-base font-bold sm:mb-2 sm:text-lg">
                Select Card
              </h2>
              <hr />
              <div className="relative mt-2">
                {currentPage > 0 && (
                  <button
                    onClick={handlePrev}
                    className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1 shadow-lg transition-all hover:bg-gray-50 sm:-left-4 sm:p-2"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
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
                        className={`min-w-[100%] flex-shrink-0 p-1 sm:min-w-[50%] sm:p-2
                        ${idx === getCurrentPageCards().length - 1 ? "pr-2 sm:pr-4" : ""}
                      `}
                      >
                        <div
                          className={`cursor-pointer rounded-lg p-3 transition-all sm:p-5
                          ${cardColors[idx % cardColors.length].bg}
                          ${cardColors[idx % cardColors.length].text}
                          ${selectedCard?.authCode === card.authCode ? "ring-2 ring-white" : ""}
                        `}
                          onClick={() => handleCardSelect(card)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex flex-col gap-2 sm:gap-3">
                              <p className="text-sm sm:text-base">
                                *** *** *** {card.number}
                              </p>
                              <p className="text-sm sm:text-base">
                                MasterCard/Mar 2026
                              </p>
                            </div>
                            <div
                              className={`flex h-3 w-3 items-center justify-center rounded-full border-2 border-white sm:h-4 sm:w-4
                              ${selectedCard?.authCode === card.authCode ? "bg-white" : "bg-transparent"}
                            `}
                            >
                              {selectedCard?.authCode === card.authCode && (
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
                    className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1 shadow-lg transition-all hover:bg-gray-50 sm:-right-4 sm:p-2"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:gap-4">
              {selectedCard ? (
                <div className="flex w-full flex-col gap-2">
                  <p className="text-center text-xs text-gray-600 sm:text-sm">
                    Selected card ending in {selectedCard.number}
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
