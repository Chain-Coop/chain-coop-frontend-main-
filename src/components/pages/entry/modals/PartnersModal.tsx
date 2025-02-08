//@ts-nocheck
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import FormInput from "../../../common/FormInput";

interface PartnerModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

const PartnerModal = ({ isOpen, onClose }: PartnerModalProps) => {
  return (
    <Dialog
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      open={isOpen}
      handler={onClose}
      size="xs"
      className="max-h-[90vh] overflow-y-auto p-7"
    >
      <DialogHeader className="flex flex-col gap-2 px-2 text-center sm:px-4">
        <Typography
          variant="h3"
          className="text-lg font-bold leading-tight md:text-2xl lg:text-2xl"
        >
          Partner with us
        </Typography>
      </DialogHeader>
      <DialogBody className="overflow-y-auto">
        <form className="flex flex-col gap-4">
          <FormInput
            label="First name"
            id="firstName"
            name="firstName"
            type="text"
            required
            placeholder="Enter your first name"
            labelClassName="font-medium text-black"
            className="!h-[3.5em] rounded-lg"
            wrapperClassName="mb-0"
          />

          <FormInput
            label="Last name"
            id="lastName"
            name="lastName"
            type="text"
            required
            placeholder="Enter your last name"
            labelClassName="font-medium text-black"
            className="!h-[3.5em] rounded-lg"
            wrapperClassName="mb-0"
          />

          <FormInput
            label="Email Address"
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email address"
            labelClassName="font-medium text-black"
            className="!h-[3.5em] rounded-lg"
            wrapperClassName="mb-0"
          />

          <FormInput
            label="Phone Number"
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="Enter your phone number"
            labelClassName="font-medium text-black"
            className="!h-[3.5em] rounded-lg"
            wrapperClassName="mb-0"
          />

          <div>
            <label
              htmlFor="reason"
              className="mb-3 flex font-medium text-black"
            >
              Why do you want to be Partner
            </label>
            <textarea
              id="reason"
              required
              rows={4}
              placeholder="Tell us why you want to partner with us"
              className="w-full rounded-lg border-[1px] p-4 text-sm shadow-md focus:border-text2 focus:outline-none focus:ring-text2"
            />
          </div>

          <p className="text-sm font-normal text-[#1E1E1E]">
            <span className="mr-2 font-bold text-black">Note:</span>A follow-up
            link will be sent to your email for further process
          </p>
        </form>

        <Button type="submit" className="mt-4 bg-text2 text-white">
          Submit
        </Button>
      </DialogBody>
    </Dialog>
  );
};

export default PartnerModal;
