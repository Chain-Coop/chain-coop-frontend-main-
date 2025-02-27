// import React, { useState } from "react";
// import { Loader2 } from "lucide-react";
// import { Dialog } from "@material-tailwind/react";

// interface NotificationDetails {
//   title: string;
//   message: string;
//   isRead: boolean;
// }

// interface ViewNotificationDetailsReadProps {
//   notificationDetails: NotificationDetails;
//   handleUpdateStatus?: (notification: NotificationDetails) => Promise<void>;
// }

// const ViewNotificationDetailsRead = ({
//   notificationDetails,
//   handleUpdateStatus,
// }: ViewNotificationDetailsReadProps) => {
//   const [isUpdating, setIsUpdating] = useState(false);

//   const handleMarkAsRead = async () => {
//     if (!handleUpdateStatus) return;

//     setIsUpdating(true);
//     try {
//       await handleUpdateStatus(notificationDetails);
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   return (
//     <Dialog className="py-6 font-sans sm:px-6 md:py-8">
//       <div className="relative rounded-lg bg-white p-4 shadow-lg sm:p-6">
//         <header className="mb-4">
//           <h1 className="text-lg font-bold text-gray-900 sm:text-xl">
//             {notificationDetails.title}
//           </h1>
//         </header>

//         <article className="space-y-4">
//           <p className="whitespace-pre-wrap text-sm font-medium text-gray-700 sm:text-base">
//             {notificationDetails.message?.replace(/<[^>]*>/g, "")}
//           </p>

//           {!notificationDetails.isRead && handleUpdateStatus && (
//             <div className="flex items-center justify-end space-x-4 pt-4">
//               <button
//                 onClick={handleMarkAsRead}
//                 disabled={isUpdating}
//                 className="flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-green-700 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 {isUpdating ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     <span>Updating...</span>
//                   </>
//                 ) : (
//                   "Mark as read"
//                 )}
//               </button>
//             </div>
//           )}
//         </article>
//       </div>
//     </Dialog>
//   );
// };

// export default ViewNotificationDetailsRead;

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

interface NotificationDetails {
  title: string;
  message: string;
  isRead: boolean;
}

interface ViewNotificationDetailsReadProps {
  notificationDetails: NotificationDetails;
  handleUpdateStatus?: (notification: NotificationDetails) => Promise<void>;
  open: boolean;
  handleOpen: () => void;
}

const ViewNotificationDetailsRead = ({
  notificationDetails,
  handleUpdateStatus,
  open,
  handleOpen,
}: ViewNotificationDetailsReadProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleMarkAsRead = async () => {
    if (!handleUpdateStatus) return;

    setIsUpdating(true);
    try {
      await handleUpdateStatus(notificationDetails);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={open} handler={handleOpen} className="font-sans">
      <DialogHeader className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
        {notificationDetails.title}
      </DialogHeader>

      <DialogBody>
        <Typography className="whitespace-pre-wrap text-sm font-medium text-black">
          {notificationDetails.message?.replace(/<[^>]*>/g, "")}
        </Typography>
      </DialogBody>

      {!notificationDetails.isRead && handleUpdateStatus && (
        <DialogFooter className="flex items-center justify-end space-x-4 pt-4">
          <button
            onClick={handleMarkAsRead}
            disabled={isUpdating}
            className="flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-green-700 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              "Mark as read"
            )}
          </button>
        </DialogFooter>
      )}
    </Dialog>
  );
};

export default ViewNotificationDetailsRead;
