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
import trash from "../../../../Assets/svg/dashboard/contribution/trash.svg";
import setDefault from "../../../../Assets/svg/dashboard/contribution/default.svg";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../../shared/redux/reduxHooks";
import { AppDispatch } from "../../../../shared/redux/store";
import {
  deleteCard,
  GetWalletBalance,
} from "../../../../shared/redux/slices/transaction.slices";
import { DashboardHeader } from "../../../common/DashboardHeader";
import useWalletBalance from "../../../../shared/Hooks/useBalance";
import noCard from "../../../../Assets/png/dashboard/noCard.png";
import arrow from "../../../../Assets/svg/dashboard/wallet/transfer-arrow.svg";

interface Card {
  number: string;
  authCode: string;
  isPreferred: boolean;
  failedAttempts: number;
}

interface WalletBalance {
  allCards: Card[];
}

const cardColors = [
  { bg: "bg-gradient-to-r from-purple-500 to-purple-700", text: "text-white" },
  { bg: "bg-gradient-to-r from-pink-500 to-rose-500", text: "text-white" },
  { bg: "bg-gradient-to-r from-blue-500 to-cyan-500", text: "text-white" },
  { bg: "bg-gradient-to-r from-emerald-500 to-teal-500", text: "text-white" },
];

const ManageCards = () => {
  const { cards } = useWalletBalance();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const openDeleteConfirmation = (authCode: string) => {
    setCardToDelete(authCode);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCard = async () => {
    if (!cardToDelete) return;

    try {
      setIsDeleting(true);
      await dispatch(deleteCard({ cardId: cardToDelete })).unwrap();

      await dispatch(GetWalletBalance());

      toast.success("Card deleted successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete card:", error);
      toast.error("Failed to delete card", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsDeleting(false);
      setCardToDelete(null);
    }
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
          {cards && cards.length > 0 ? (
            cards.map((card: Card, idx: number) => (
              <div
                key={card.authCode}
                className="flex items-center gap-4 sm:gap-6"
              >
                <div
                  className={`w-[50%] cursor-pointer rounded-lg p-6 transition-all
              ${cardColors[idx % cardColors.length].bg}
              ${cardColors[idx % cardColors.length].text}`}
                >
                  <p className="text-sm sm:text-base">
                    *** *** *** {card.number}
                  </p>
                  <p className="whitespace-nowrap text-xs sm:text-sm">
                    MasterCard/Mar 2026
                  </p>
                </div>

                <div className="flex gap-2 sm:gap-4">
                  <button
                    onClick={() => openDeleteConfirmation(card.authCode)}
                    className="flex items-center gap-2 rounded-md border border-[#F24822] bg-[#FDEEEC] px-3 py-1 text-xs text-[#F24822] sm:text-sm"
                  >
                    <img src={trash} alt="trash_img" className="w-4 sm:w-5" />
                    <span>Delete Card</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center">
              <img
                src={noCard}
                alt="no-card"
                className="h-64 w-64 object-cover"
              />
              <div className="mt-4 flex flex-col items-center gap-4">
                <p className="font-medium text-gray-600">
                  There are no active cards saved yet.
                </p>
                <Link to="/dashboard/contribution/purpose">
                  <div className="flex gap-2">
                    <p className="text-lg font-semibold text-text2">
                      Start Contribution
                    </p>
                    <img src={arrow} alt="arrow" className="w-4 sm:w-5" />
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
            Are you sure you want to delete this card? This action cannot be
            undone.
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
            {isDeleting ? "Deleting..." : "Confirm Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
};

export default ManageCards;
