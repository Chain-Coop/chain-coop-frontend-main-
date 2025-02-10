import {
  Dialog,
  DialogHeader,
  DialogBody,
  Radio,
} from "@material-tailwind/react";

interface SavingsPlanProps {
  open: boolean;
  onClose: () => void;
  savingsType: "naira" | "crypto";
  onSavingsTypeChange: (type: "naira" | "crypto") => void;
}

export function SavingsPlan({
  open,
  onClose,
  savingsType,
  onSavingsTypeChange,
}: SavingsPlanProps) {
  return (
    <Dialog size="xs" open={open} handler={onClose}>
      <DialogHeader className="flex w-full justify-center text-center text-lg font-semibold text-gray-500 sm:text-xl">
        Choose Savings Plan
      </DialogHeader>
      <DialogBody>
        <div className="w-full px-4 sm:px-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex justify-center text-center">
                <label htmlFor="naira" className="font-semibold text-text2">
                  Naira Savings
                </label>
              </div>
              <Radio
                name="type"
                id="naira"
                value="naira"
                checked={savingsType === "naira"}
                onChange={() => onSavingsTypeChange("naira")}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
            <hr className="border-gray-200" />
            <div className="flex items-center justify-between">
              <label htmlFor="crypto" className="font-semibold text-text2">
                Crypto Savings
              </label>
              <Radio
                id="crypto"
                name="type"
                value="crypto"
                checked={savingsType === "crypto"}
                onChange={() => onSavingsTypeChange("crypto")}
                crossOrigin=""
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
