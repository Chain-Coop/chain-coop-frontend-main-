// import React, { useEffect, useState } from "react";
// import { DashboardHeader } from "../../../common/DashboardHeader";
// import { IoIosArrowBack } from "react-icons/io";
// import { useNavigate } from "react-router";
// import bell from "../../../Assets/png/dashboard/notification.png";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../../shared/redux/store";
// import { useAllNotification } from "../../../../shared/Hooks/useUserProfile";

// const Notification = () => {
// const navigate = useNavigate();
// const dispatch: AppDispatch = useDispatch();
// const { updates, fetchNotification, currentPage, loading } =
//   useAllNotification();
// const [activeLink, setActiveLink] = useState("basicInfo");

// const [isInitialLoad, setIsInitialLoad] = useState(true);
// const itemsPerPage = 10;

// useEffect(() => {
//   const loadInitialData = async () => {
//     await fetchNotification(currentPage, itemsPerPage);
//     setIsInitialLoad(false);
//   };
//   loadInitialData();
// }, [fetchNotification, currentPage, itemsPerPage]);

// const handleBackClick = () => {
//   navigate(-1);
// };

//   return (
//     <main className="min-h-screen w-full font-sans">
// <DashboardHeader
//   className="relative cursor-pointer items-center md:mt-4 lg:mt-8"
//   onClick={handleBackClick}
// >
//   <IoIosArrowBack
//     size={25}
//     className="absolute left-0 cursor-pointer transition-opacity hover:opacity-75"
//   />
// <div className="flex flex-grow items-center justify-center">
//   <div className="text-2xl tracking-wide md:text-3xl lg:text-xl">
//     Notification
//   </div>
// </div>
// </DashboardHeader>

// <section className="mx-auto mt-8 max-w-4xl p-4 md:mt-12 md:p-6 lg:mt-16 lg:p-8">
//   <div className="flex flex-col items-center gap-4 px-4 text-center md:gap-6 lg:gap-8">
//     <div className="flex justify-center">
//       <img
//         src={bell}
//         className="h-32 w-32 object-contain md:h-40 md:w-40 lg:h-48 lg:w-48"
//         alt="notification bell"
//       />
//     </div>
//     <header>
//       <h1 className="text-lg font-bold md:text-xl lg:text-2xl">
//         Currently, no updates at this time!
//       </h1>
//     </header>
//     <p className="max-w-md text-sm font-semibold text-gray-600 md:text-base lg:text-lg">
//       You will see a notification here when something happens in your
//       workspace.
//     </p>
//   </div>
// </section>
//     </main>
//   );
// };

// export default Notification;

import React from "react";
import { useState } from "react";
import { DashboardHeader } from "../../../common/DashboardHeader";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import UnReadNotification from "../unReadNotification/UnReadNotification";
import AllNotification from "../allNotification/AllNotification";
import ReadNotification from "../readNotification/ReadNotification";

const Notification = () => {
  const [activeLink, setActiveLink] = useState("allNotification");
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const getButtonClasses = (linkName: string) => {
    return `${
      activeLink === linkName
        ? "text-purple-900 border-purple-900"
        : "text-gray-500 border-gray-300"
    } cursor-pointer rounded-lg border px-2 py-1.5 font-medium transition-colors hover:bg-gray-50`;
  };

  return (
    <main className="min-h-screen w-full font-sans">
      <DashboardHeader
        className="relative mt-2 cursor-pointer items-center px-4 md:mt-4 md:px-6 lg:mt-8"
        onClick={handleBackClick}
      >
        <IoIosArrowBack
          size={24}
          className="absolute left-4 cursor-pointer transition-opacity hover:opacity-75 md:left-6"
        />
        <div className="flex flex-grow items-center justify-center">
          <h1 className="text-xl font-medium tracking-wide md:text-2xl lg:text-3xl">
            Notifications
          </h1>
        </div>
      </DashboardHeader>

      <section className="font-outfit">
        <div className="mt-1 h-auto w-full rounded-lg bg-white px-4 py-3 pb-20 md:px-6">
          <div>
            <nav className="overflow-x-auto">
              <div className="flex gap-2 whitespace-nowrap border-b border-gray-100 py-4 text-sm md:gap-4 md:text-base">
                <div
                  className={getButtonClasses("allNotification")}
                  onClick={() => setActiveLink("allNotification")}
                >
                  <button className="flex justify-center gap-2 font-medium text-inherit">
                    All Notifications
                  </button>
                </div>

                <div
                  className={getButtonClasses("readNotification")}
                  onClick={() => setActiveLink("readNotification")}
                >
                  <button className="flex justify-center gap-2 font-medium text-inherit">
                    Read Notifications
                  </button>
                </div>

                <div
                  className={getButtonClasses("unReadNotification")}
                  onClick={() => setActiveLink("unReadNotification")}
                >
                  <button className="flex justify-center gap-2 font-medium text-inherit">
                    Unread Notifications
                  </button>
                </div>
              </div>
            </nav>
            <section>
              {activeLink === "allNotification" && <AllNotification />}
              {activeLink === "unReadNotification" && <UnReadNotification />}
              {activeLink === "readNotification" && <ReadNotification />}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Notification;
