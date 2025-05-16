// import { useEffect, useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
//   Typography,
//   IconButton,
// } from "@material-tailwind/react";
// import FormInput from "../../../../common/FormInput";
// import { IoMdClose } from "react-icons/io";
// import {
//   RESEND_LOGIN_OTP,
//   RESEND_VERIFY_OTP,
// } from "../../../../../shared/redux/services/landing.services";
// import { toast } from "react-toastify";
// import { RootState } from "../../../../../shared/redux/rootReducer";
// import { useAppSelector } from "../../../../../shared/redux/reduxHooks";
// import { MoveRight } from "lucide-react";
// import { useUserProfile } from "../../../../../shared/Hooks/useUserProfile";

// interface ChangePhoneNumberProps {
//   email: string;
//   setEmail: (email: string) => void;
//   onEmailSent: () => void;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const ChangePhoneNumber = ({
//   email,
//   setEmail,
//   onEmailSent,
//   isOpen,
//   onClose,
// }: ChangePhoneNumberProps) => {
//   const { profileDetails } = useUserProfile();
//   const phoneNumber = profileDetails?.phoneNumber;
//   const [error, setError] = useState("");

//   const GetOtp = async () => {
//     if (!phoneNumber) {
//       setError("Email is required");
//       return;
//     }

//     try {
//       const response = await RESEND_VERIFY_OTP({ phoneNumber });
//       toast.success(response.data.msg || "OTP sent to your email");
//       onEmailSent();
//     } catch (error: any) {
//       toast.error(error || "Failed to send OTP");
//     } finally {
//     }
//   };

//   return (
//     <Dialog
//       animate={{
//         mount: { scale: 1, y: 0 },
//         unmount: { scale: 0.9, y: -100 },
//       }}
//       open={isOpen}
//       handler={onClose}
//       size="sm"
//       className="overflow-y-auto py-3 "
//       dismiss={{ enabled: false }}
//     >
//       <DialogHeader className="relative flex justify-center px-2 text-center sm:px-4">
//         <div className="absolute left-2 top-2">
//           <IconButton
//             variant="text"
//             color="gray"
//             onClick={onClose}
//             className="h-10 w-10 p-0 hover:bg-gray-100"
//           >
//             <IoMdClose size={24} className="text-text2" />
//           </IconButton>
//         </div>
//         <Typography variant="h1" className="text-2xl font-semibold">
//           Update Phone number
//         </Typography>
//       </DialogHeader>
//       <DialogBody className="overflow-y-auto text-center text-black">
//         <Typography className="font-normal">
//           Have you forgotten or lost your PIN?
//         </Typography>
//         <Typography className="font-normal">
//           Click on the link below to generate an OTP to this whatsapp number
//           {phoneNumber}
//         </Typography>
//       </DialogBody>
//       <DialogFooter className="flex justify-center">
//         <Button
//           // onClick={handleGenerateOTP}
//           // disabled={isLoading}
//           // loading={isLoading}
//           className="flex items-center gap-2 bg-transparent text-lg font-semibold normal-case text-text2 shadow-none"
//         >
//           Generate OTP
//           <MoveRight className="text-text2" />
//         </Button>
//       </DialogFooter>
//     </Dialog>
//   );
// };

// export default ChangePhoneNumber;

import React from "react";

const ChangePhoneNumber = () => {
  return <div></div>;
};

export default ChangePhoneNumber;
