import React, { useEffect, useState } from "react";
import bell from "../../../../Assets/png/dashboard/notification.png";
import { useAllNotification } from "../../../../shared/Hooks/useUserProfile";
import { GoDotFill } from "react-icons/go";

const NotificationSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="flex flex-col gap-[1em] rounded-lg bg-gray-100 px-[1em] py-[1em]">
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-gray-300"></div>
        <div className="h-4 w-3/4 rounded bg-gray-300"></div>
      </div>
      <div className="flex justify-between">
        <div className="h-3 w-16 rounded bg-gray-300"></div>
        <div className="h-3 w-24 rounded bg-gray-300"></div>
      </div>
    </div>
  </div>
);

const UnReadNotification = () => {
  const { updates, fetchNotification, currentPage, loading, totalPages } =
    useAllNotification();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadInitialData = async () => {
      await fetchNotification(1, itemsPerPage);
      setIsInitialLoad(false);
    };
    loadInitialData();
  }, [fetchNotification]);

  const handlePageChange = (page: number) => {
    fetchNotification(page, itemsPerPage);
    window.scrollTo(0, 0);
  };

  const getInitial = (title: string) => {
    return title.charAt(0).toUpperCase();
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  const unreadNotifications = updates?.filter(
    (notification: any) => !notification.isRead,
  );

  if (loading && isInitialLoad) {
    return (
      <div className="space-y-4">
        {[...Array(3)]?.map((_, index) => <NotificationSkeleton key={index} />)}
      </div>
    );
  }

  if (!unreadNotifications || unreadNotifications.length === 0) {
    return (
      <section className="mx-auto mt-8 max-w-4xl p-4 md:mt-12 md:p-6 lg:mt-16 lg:p-8">
        <div className="flex flex-col items-center gap-4 px-0 text-center md:gap-6 lg:gap-8">
          <div className="flex justify-center">
            <img
              src={bell}
              className="h-32 w-32 object-contain md:h-40 md:w-40 lg:h-48 lg:w-48"
              alt="notification bell"
            />
          </div>
          <header>
            <h1 className="text-lg font-bold md:text-xl lg:text-2xl">
              No unread notifications!
            </h1>
          </header>
          <p className="max-w-md text-sm font-semibold text-gray-600 md:text-base lg:text-lg">
            You're all caught up! Check back later for new notifications.
          </p>
        </div>
      </section>
    );
  }

  return (
    <main className="h-auto space-y-4 font-sans">
      {unreadNotifications.map((notification: any, index: number) => (
        <section
          key={notification?._id}
          className="flex flex-col gap-[1em] rounded-lg bg-gray-100 px-[1em] py-[1em]"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-11 w-9 items-center justify-center rounded-full bg-white text-lg font-bold text-black">
                {getInitial(notification?.title)}
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex gap-2">
                <GoDotFill className="text-green-500" size={25} />
                <p className="text-sm font-medium text-gray-800">
                  {truncateText(
                    notification?.message?.replace(/<[^>]*>/g, ""),
                    100,
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="italic text-gray-400">Unread</p>
            <p className="italic text-gray-400">
              {formatDate(notification?.createdAt)}
            </p>
          </div>
        </section>
      ))}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`rounded-lg px-4 py-2 ${
              currentPage === 1
                ? "cursor-not-allowed bg-gray-200 text-gray-500"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Previous
          </button>

          {[...Array(totalPages)]?.map((_, index) => {
            const pageNumber = index + 1;
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`h-8 w-8 rounded-lg ${
                    currentPage === pageNumber
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            }
            if (
              pageNumber === currentPage - 2 ||
              pageNumber === currentPage + 2
            ) {
              return <span key={pageNumber}>...</span>;
            }
            return null;
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`rounded-lg px-4 py-2 ${
              currentPage === totalPages
                ? "cursor-not-allowed bg-gray-200 text-gray-500"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
};

export default UnReadNotification;
