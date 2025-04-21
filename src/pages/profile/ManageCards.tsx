import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import noCard from "../../Assets/png/dashboard/noCard.png";
import arrow from "../../Assets/svg/dashboard/wallet/transfer-arrow.svg";
import { useUserCard } from "../../shared/Hooks/useUserProfile";
import { AppDispatch } from "../../shared/redux/store";
import { useAppDispatch } from "../../shared/redux/reduxHooks";
import { DashboardHeader } from "../../components/common/DashboardHeader";
import {
  deleteCard,
  GetWalletCard,
} from "../../shared/redux/slices/transaction.slices";
import { CardBrandLogo, cardDesigns, Chip } from "../../shared/utils/Helpers";
import DeleteCard from "../../components/dashboard/profile/security/modal/deleteCard";
import { Button } from "@material-tailwind/react";
import { TrashIcon } from "../../Assets/svg";
import { Card } from "../../shared/types/types";

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
    <main className="pb-6">
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

      <section className="mt-8 px-4 lg:px-6">
        <header>
          <h1 className="mb-2 text-2xl font-semibold text-gray-800">
            My Saved Cards
          </h1>
          <hr className="h-2" />
        </header>

        <div className="mt-4 flex flex-col gap-6">
          {useWalletCards?.cards?.length > 0 ? (
            useWalletCards?.cards?.map((card: Card) => (
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

                    <div className="font-mono mt-4 text-lg text-white/90 sm:text-xl">
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
                  <Button
                    onClick={() => openDeleteConfirmation(card)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-500 bg-red-50 px-4 py-2 text-sm text-red-500 transition-colors hover:bg-red-100 sm:flex-none"
                  >
                    <TrashIcon />
                    Delete Card
                  </Button>
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

      <DeleteCard
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteCard}
        isDeleting={isDeleting}
        selectedCard={selectedCard}
      />
    </main>
  );
};

export default ManageCards;
