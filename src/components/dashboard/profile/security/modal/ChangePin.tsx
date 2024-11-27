// import React, { useState, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../../../shared/redux/store";
// import { CreateTransactionPin } from "../../../../../shared/redux/slices/transaction.slices";
// import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
// import usePasswordToggle from "../../../../../shared/utils/usePasswordToggle";
// import ReactLoading from "react-loading";
// import { Alert } from "@mui/material";

// interface ChangePinProps {
//   otp: string;
//   onClose: () => void;
// }

// type InputRef = React.RefObject<HTMLInputElement>;

// const ChangePin: React.FC<ChangePinProps> = ({ otp, onClose }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const inputRefs: InputRef[] = Array(4)
//     .fill(null)
//     .map(() => useRef<HTMLInputElement>(null));

//   const confirmInputRefs: InputRef[] = Array(4)
//     .fill(null)
//     .map(() => useRef<HTMLInputElement>(null));

//   const [pinValues, setPinValues] = useState<string[]>(["", "", "", ""]);
//   const [confirmPinValues, setConfirmPinValues] = useState<string[]>([
//     "",
//     "",
//     "",
//     "",
//   ]);

//   const [passwordType, togglePasswordType] = usePasswordToggle();
//   const [confirmPasswordType, toggleConfirmPasswordType] = usePasswordToggle();

//   const handlePinChange = (index: number, value: string, isPrimary = true) => {
//     const newValues = isPrimary ? [...pinValues] : [...confirmPinValues];
//     const refs = isPrimary ? inputRefs : confirmInputRefs;

//     if (!/^\d*$/.test(value)) return;

//     newValues[index] = value;

//     if (isPrimary) {
//       setPinValues(newValues);
//     } else {
//       setConfirmPinValues(newValues);
//     }

//     // Auto-focus next input with proper null check
//     if (value && index < 3) {
//       const nextRef = refs[index + 1]?.current;
//       if (nextRef) {
//         nextRef.focus();
//       }
//     }
//   };

//   const handleKeyDown = (
//     e: React.KeyboardEvent<HTMLInputElement>,
//     index: number,
//     isPrimary = true,
//   ) => {
//     const refs = isPrimary ? inputRefs : confirmInputRefs;

//     if (e.key === "Backspace") {
//       if (index > 0 && !e.currentTarget.value) {
//         const prevRef = refs[index - 1]?.current;
//         if (prevRef) {
//           prevRef.focus();
//         }
//       }
//     }
//   };
//   const handleSubmit = () => {
//     const newPin = pinValues.join("");
//     const confirmPin = confirmPinValues.join("");

//     if (newPin !== confirmPin) {
//       setError("PINs do not match");
//       return;
//     }

//     if (newPin.length !== 4) {
//       setError("PIN must be 4 digits");
//       return;
//     }

//     setLoading(true);

//     dispatch(
//       CreateTransactionPin({
//         otp: parseInt(otp),
//         newpin: newPin,
//       }),
//     )
//       .unwrap()
//       .then(() => {
//         onClose();
//       })
//       .catch((error: Error) => {
//         setError(error.message || "Failed to create PIN");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   const renderPinInputs = (
//     refs: InputRef[],
//     values: string[],
//     handleChange: (index: number, value: string, isPrimary: boolean) => void,
//     isConfirm = false,
//   ) => (
//     <div className="flex justify-center gap-4">
//       {[0, 1, 2, 3].map((index) => (
//         <input
//           key={index}
//           ref={refs[index]}
//           type={isConfirm ? confirmPasswordType : passwordType}
//           value={values[index]}
//           onChange={(e) => handleChange(index, e.target.value, !isConfirm)}
//           onKeyDown={(e) => handleKeyDown(e, index, !isConfirm)}
//           maxLength={1}
//           className="h-12 w-12 rounded-md border text-center text-lg shadow-sm
//                      focus:border-text2 focus:outline-none focus:ring-1 focus:ring-text2"
//         />
//       ))}
//     </div>
//   );

//   return (
//     <main className="font-sans lg:w-[25em]">
//       <section className="flex flex-col gap-[1em] py-[1.5em]">
//         <div className="flex flex-col text-center">
//           <header>
//             <h1 className="text-2xl font-semibold">Create New PIN</h1>
//           </header>

//           <div className="mt-[1.7em] flex flex-col gap-[1em]">
//             <div>
//               <label className="mb-3 flex justify-center font-semibold text-text2">
//                 Enter New PIN
//               </label>
//               <div className="relative mb-5">
//                 {renderPinInputs(inputRefs, pinValues, handlePinChange)}
//                 <button
//                   type="button"
//                   onClick={togglePasswordType}
//                   className="absolute right-0 top-1/2 -translate-x-4 -translate-y-1/2"
//                 >
//                   {passwordType === "password" ? (
//                     <MdOutlineVisibilityOff />
//                   ) : (
//                     <MdOutlineVisibility />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label className="mb-3 flex justify-center font-semibold text-text2">
//                 Re-enter PIN
//               </label>
//               <div className="relative mb-5">
//                 {renderPinInputs(
//                   confirmInputRefs,
//                   confirmPinValues,
//                   handlePinChange,
//                   true,
//                 )}
//                 <button
//                   type="button"
//                   onClick={toggleConfirmPasswordType}
//                   className="absolute right-0 top-1/2 -translate-x-4 -translate-y-1/2"
//                 >
//                   {confirmPasswordType === "password" ? (
//                     <MdOutlineVisibilityOff />
//                   ) : (
//                     <MdOutlineVisibility />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {error && <Alert severity="error">{error}</Alert>}

//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className={`relative m-auto mt-[1em] flex w-[55%] justify-center
//                          rounded-full p-[10px] font-medium
//                          ${
//                            loading
//                              ? "cursor-not-allowed bg-text2 text-white"
//                              : "bg-text2 text-text5"
//                          }`}
//             >
//               {loading ? (
//                 <ReactLoading
//                   color="#FFFFFF"
//                   width={25}
//                   height={25}
//                   type="spin"
//                   className="inline-block"
//                 />
//               ) : (
//                 "Create PIN"
//               )}
//             </button>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default ChangePin;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../shared/redux/store";
import { CreateTransactionPin } from "../../../../../shared/redux/slices/transaction.slices";
import ReactLoading from "react-loading";
import { Alert } from "@mui/material";
import OtpInput from "../../../../../shared/utils/OtpInput";

interface ChangePinProps {
  otp: string;
  onClose: () => void;
}

const ChangePin: React.FC<ChangePinProps> = ({ otp, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const handleSubmit = () => {
    if (pin !== confirmPin) {
      setError("PINs do not match");
      return;
    }

    if (pin.length !== 4) {
      setError("PIN must be 4 digits");
      return;
    }

    setLoading(true);

    dispatch(
      CreateTransactionPin({
        otp: parseInt(otp),
        newpin: pin,
      }),
    )
      .unwrap()
      .then(() => {
        onClose();
      })
      .catch((error: Error) => {
        setError(error.message || "Failed to create PIN");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main className="font-sans lg:w-[25em]">
      <section className="flex flex-col gap-[1em] py-[1.5em]">
        <div className="flex flex-col text-center">
          <header>
            <h1 className="text-2xl font-semibold">Create New PIN</h1>
          </header>

          <div className="mt-[1.7em] flex flex-col gap-[1em]">
            <OtpInput
              value={pin}
              onChange={setPin}
              showVisibilityToggle
              label="Enter New PIN"
            />

            <OtpInput
              value={confirmPin}
              onChange={setConfirmPin}
              showVisibilityToggle
              label="Re-enter PIN"
            />

            {error && <Alert severity="error">{error}</Alert>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`relative m-auto mt-[1em] flex w-[55%] justify-center 
                         rounded-full p-[10px] font-medium
                         ${
                           loading
                             ? "cursor-not-allowed bg-text2 text-white"
                             : "bg-text2 text-text5"
                         }`}
            >
              {loading ? (
                <ReactLoading
                  color="#FFFFFF"
                  width={25}
                  height={25}
                  type="spin"
                  className="inline-block"
                />
              ) : (
                "Create PIN"
              )}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ChangePin;
