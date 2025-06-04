import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import FormInput from "../../../common/FormInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "../../../../shared/redux/store";
import {
  createBlogCategory,
  fetchAllBlogsCategories,
} from "../../../../shared/redux/slices/adminSlices/adminSlices";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateCategoryModal({ isOpen, onClose }: CategoryModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [categoryName, setCategoryName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateCategory = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name is required.");
      return;
    }

    setLoading(true);
    try {
      await dispatch(createBlogCategory({ name: categoryName })).unwrap();
      toast.success("Category created successfully!");
      await dispatch(fetchAllBlogsCategories()).unwrap();
      setCategoryName("");
      onClose();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : "Failed to create category. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
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
            Create New Category
          </Typography>
          <FormInput
            label="Category Name"
            className="w-full text-text2"
            labelClassName="text-text2"
            paddingY="3"
            value={categoryName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCategoryName(e.target.value)
            }
            disabled={loading}
          />
        </DialogBody>

        <DialogFooter className="mt-10 flex w-full items-center justify-center gap-5 p-0">
          <Button
            onClick={handleCreateCategory}
            className="text-md flex flex-1 justify-center rounded-lg border border-[#D0D5DD66] bg-text2 font-medium normal-case text-white"
            disabled={loading}
            loading={loading}
          >
            Create
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
}
