import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../../../shared/redux/reduxHooks";
import { AppDispatch } from "../../../../../shared/redux/store";
import {
  deleteCard,
  GetWalletCard,
} from "../../../../../shared/redux/slices/transaction.slices";
import { useUserCard } from "../../../../../shared/Hooks/useUserProfile";
import { DashboardHeader } from "../../../../common/DashboardHeader";
import noCard from "../../../../../Assets/png/dashboard/noCard.png";
import arrow from "../../../../../Assets/svg/dashboard/wallet/transfer-arrow.svg";
import { CardBrandLogo } from "../../../../../shared/utils/Helpers";

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
  <div className="relative h-10 w-14">
    <div className="absolute h-full w-full rounded-md bg-gradient-to-br from-yellow-600 to-yellow-700">
      <div className="absolute left-1 top-1 h-8 w-12 rounded-md border-2 border-yellow-800/30">
        <div className="grid h-full w-full grid-cols-4 grid-rows-4 gap-[1px]">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="bg-yellow-800/20" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ManageCards = () => {
  const { useWalletCards } = useUserCard();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const openDeleteConfirmation = (card: Card) => {
    setSelectedCard(card);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCard = async () => {
    if (!selectedCard?.authorization_code) return;

    try {
      setIsDeleting(true);
      await dispatch(
        deleteCard({ cardId: selectedCard.authorization_code }),
      ).unwrap();
      await dispatch(GetWalletCard());
      toast.success("Card deleted successfully");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete card");
    } finally {
      setIsDeleting(false);
      setSelectedCard(null);
    }
  };

  const formatCardNumber = (last4: string) => {
    return `**** **** **** ${last4}`;
  };

  const formatExpiryDate = (month: string, year: string) => {
    return `${month.padStart(2, "0")}/${year.slice(-2)}`;
  };

  return (
    <main className="pb-6 font-sans">
      <header className="lg:mt-8">
        <DashboardHeader
          className="relative cursor-pointer items-center"
          onClick={handleBackClick}
        >
          <IoIosArrowBack
            size={25}
            className="absolute left-0 cursor-pointer"
          />
          <div className="flex flex-grow items-center justify-center">
            <div className="tracking-wide">Manage Cards</div>
          </div>
        </DashboardHeader>
      </header>

      <section className="mt-8 px-3">
        <header>
          <h1 className="mb-2 text-2xl font-semibold text-gray-800">
            My Saved Cards
          </h1>
          <hr className="h-2" />
        </header>

        <div className="mt-4 flex flex-col gap-6">
          {useWalletCards?.cards?.length > 0 ? (
            useWalletCards.cards.map((card: Card) => (
              <div
                key={card.authorization_code}
                className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"
              >
                <div
                  className={`relative w-full overflow-hidden sm:w-[65%] md:w-[50%]`}
                >
                  <div
                    className={`group relative aspect-[1.6/1] w-full cursor-pointer rounded-xl bg-gradient-to-r p-5 shadow-lg transition-all hover:shadow-xl
                      ${cardDesigns[card.brand.toLowerCase() as keyof typeof cardDesigns] || cardDesigns.default}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity group-hover:opacity-100" />

                    <div className="mb-6 text-lg font-bold text-white/90">
                      {card.bank.toUpperCase()}
                    </div>

                    <Chip />

                    <div className="mt-4 font-mono text-lg text-white/90 sm:text-xl">
                      {formatCardNumber(card.last4)}
                    </div>

                    <div className="mt-2 flex items-end justify-between">
                      <div className="text-white/80">
                        <div className="text-xs uppercase">Expires</div>
                        <div className="font-mono text-sm">
                          {formatExpiryDate(card.exp_month, card.exp_year)}
                        </div>
                      </div>
                      <CardBrandLogo brand={card.brand} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 lg:flex-row">
                  <button
                    onClick={() => openDeleteConfirmation(card)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-500 bg-red-50 px-4 py-2 text-sm text-red-500 transition-colors hover:bg-red-100 sm:flex-none"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete Card
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-blue-500 bg-blue-50 px-4 py-2 text-sm text-blue-500 transition-colors hover:bg-blue-100 sm:flex-none">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Set Default
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center">
              <img
                src={noCard}
                alt="No cards"
                className="h-64 w-64 object-cover"
              />
              <div className="mt-4 flex flex-col items-center gap-4">
                <p className="font-medium text-gray-600">
                  No saved cards found.
                </p>
                <Link to="/dashboard/contribution/purpose">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold text-text2">
                      Add a Card
                    </p>
                    <img src={arrow} alt="Arrow" className="w-4 sm:w-5" />
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        aria-labelledby="delete-card-dialog-title"
      >
        <DialogTitle id="delete-card-dialog-title">Delete Card</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the card ending in{" "}
            {selectedCard?.last4}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteCard}
            color="error"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
};

export default ManageCards;
