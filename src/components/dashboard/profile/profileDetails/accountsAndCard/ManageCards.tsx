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

import trash from "../../../../../Assets/svg/dashboard/contribution/trash.svg";
import noCard from "../../../../../Assets/png/dashboard/noCard.png";
import arrow from "../../../../../Assets/svg/dashboard/wallet/transfer-arrow.svg";

interface Card {
  authorization_code: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  card_type: string;
  bank: string;
  brand: string;
}

const cardColors = [
  { bg: "bg-gradient-to-r from-purple-500 to-purple-700", text: "text-white" },
  { bg: "bg-gradient-to-r from-blue-500 to-cyan-500", text: "text-white" },
  { bg: "bg-gradient-to-r from-emerald-500 to-teal-500", text: "text-white" },
];

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

      <section className="mt-8 px-4">
        <header>
          <h1 className="mb-2 text-2xl font-semibold text-gray-800">
            My Saved Cards
          </h1>
          <hr className="h-2" />
        </header>

        <div className="mt-4 flex flex-col gap-6">
          {useWalletCards?.cards?.length > 0 ? (
            useWalletCards.cards.map((card: Card, idx: number) => (
              <div
                key={card.authorization_code}
                className="flex items-center gap-4 sm:gap-6"
              >
                <div
                  className={`w-[50%] cursor-pointer rounded-lg p-6 transition-all
                    ${cardColors[idx % cardColors.length].bg}
                    ${cardColors[idx % cardColors.length].text}`}
                >
                  <p className="text-sm sm:text-base">
                    {formatCardNumber(card.last4)}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs sm:text-sm">
                      {card.brand.toUpperCase()} • {card.bank}
                    </p>
                    <p className="text-xs sm:text-sm">
                      Expires {formatExpiryDate(card.exp_month, card.exp_year)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => openDeleteConfirmation(card)}
                  className="flex items-center gap-2 rounded-md border border-[#F24822] bg-[#FDEEEC] px-3 py-1 text-xs text-[#F24822] sm:text-sm"
                >
                  <img src={trash} alt="Delete" className="w-4 sm:w-5" />
                  <span>Delete Card</span>
                </button>
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
