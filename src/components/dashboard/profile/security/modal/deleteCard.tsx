import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Card } from "../../../../../shared/types/types";

interface DeleteCardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  selectedCard: Card | null;
}

const DeleteCard: React.FC<DeleteCardDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  selectedCard,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
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
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCard;
