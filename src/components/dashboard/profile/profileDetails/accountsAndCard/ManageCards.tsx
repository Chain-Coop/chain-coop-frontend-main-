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
import { useNavigate } from "react-router-dom";
import trash from "../../../../../Assets/svg/dashboard/contribution/trash.svg";
import setDefault from "../../../../../Assets/svg/dashboard/contribution/default.svg";
import { DashboardHeader } from "../../../../common/DashboardHeader";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../shared/redux/reduxHooks";
import { AppDispatch } from "../../../../../shared/redux/store";
import { deleteCard } from "../../../../../shared/redux/slices/transaction.slices";
import { toast } from "react-toastify";

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
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const walletData = useAppSelector(
    (state: any) => state?.transaction?.getWalletBalance,
  ) as WalletBalance;

  const cards = walletData?.allCards ?? [];

  const openDeleteConfirmation = (authCode: string) => {
    setCardToDelete(authCode);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCard = async () => {
    if (!cardToDelete) return;

    try {
      setIsDeleting(true);
      await dispatch(deleteCard({ cardId: cardToDelete })).unwrap();

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
          {cards.map((card, idx) => (
            <div
              key={card.authCode}
              className="flex items-center justify-between gap-4"
            >
              <div
                className={`flex-1 cursor-pointer rounded-lg p-6 transition-all
                ${cardColors[idx % cardColors.length].bg}
                ${cardColors[idx % cardColors.length].text}`}
              >
                <p>*** *** *** {card.number}</p>
                <p>MasterCard/Mar 2026</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openDeleteConfirmation(card.authCode)}
                  className="flex items-center gap-2 rounded-md border border-[#F24822] bg-[#FDEEEC] px-3 py-1 text-sm text-[#F24822]"
                >
                  <img src={trash} alt="trash_img" className="w-5" />
                  <span>Delete Card</span>
                </button>

                <button className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700">
                  <img src={setDefault} alt="default" className="w-5" />
                  <span>Set as Default</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MUI Deletion Confirmation Modal */}
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
