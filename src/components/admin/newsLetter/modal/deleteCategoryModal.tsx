import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { Trash2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "../../../../shared/redux/store";
import { deleteBlogCategory } from "../../../../shared/redux/slices/adminSlices/adminSlices";
import { RootState } from "../../../../shared/redux/rootReducer";

interface DeleteCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteCategoryModal({
  isOpen,
  onClose,
}: DeleteCategoryModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const adminState = useSelector((state: RootState) => state.admin);
  const categories = Array.isArray(adminState.categories)
    ? adminState.categories
    : [];

  const [loading, setLoading] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleDeleteCategory = async (categoryId: string) => {
    if (confirmDeleteId === categoryId) {
      setLoading(categoryId);
      try {
        await dispatch(deleteBlogCategory(categoryId)).unwrap();
        toast.success("Category deleted successfully!");
        setConfirmDeleteId(null);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : typeof error === "string"
              ? error
              : "Failed to delete category. Please try again.";
        toast.error(errorMessage);
      } finally {
        setLoading(null);
      }
    } else {
      setConfirmDeleteId(categoryId);
    }
  };

  const handleCancelConfirm = () => {
    setConfirmDeleteId(null);
  };

  return (
    <Dialog
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="sm"
      open={isOpen}
      handler={onClose}
      className="relative p-0"
    >
      <div className="p-10">
        <DialogBody className="flex flex-col items-center space-y-4 p-0 text-center">
          <div className="flex w-full justify-end">
            <IconButton
              variant="text"
              className="!absolute right-3.5"
              onClick={onClose}
              color="gray"
              size="sm"
            >
              <X className="h-5 w-5" />
            </IconButton>
          </div>
          <Typography className="mt-5 text-xl font-semibold text-text2">
            Manage Categories
          </Typography>
          {categories.length === 0 ? (
            <Typography className="text-gray-500">
              No categories available.
            </Typography>
          ) : (
            <ul className="w-full space-y-2">
              {categories.map((category: any) => (
                <li
                  key={category._id}
                  className="flex items-center justify-between rounded-md border p-2"
                >
                  <span>{category.name}</span>
                  <Button
                    variant="text"
                    color={confirmDeleteId === category._id ? "red" : "gray"}
                    size="sm"
                    onClick={() => handleDeleteCategory(category._id)}
                    disabled={loading === category._id}
                    className="flex items-center gap-2"
                  >
                    {loading === category._id ? (
                      "Deleting..."
                    ) : confirmDeleteId === category._id ? (
                      <>
                        <Trash2 className="h-4 w-4" /> Confirm Delete
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4" /> Delete
                      </>
                    )}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </DialogBody>
        <DialogFooter className="mt-10 flex w-full items-center justify-center gap-5 p-0">
          {confirmDeleteId && (
            <Button
              variant="outlined"
              color="gray"
              onClick={handleCancelConfirm}
              className="flex-1"
            >
              Cancel
            </Button>
          )}
          <Button
            variant="filled"
            onClick={onClose}
            className="flex-1 bg-text2 text-sm normal-case"
          >
            Done
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
}
