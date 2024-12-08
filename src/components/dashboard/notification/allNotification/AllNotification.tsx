import React, { useEffect, useState } from "react";
import bell from "../../../../Assets/png/dashboard/notification.png";
import { useAllNotification } from "../../../../shared/Hooks/useUserProfile";
import { GoDotFill } from "react-icons/go";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import ViewNotificationDetailsRead from "../ViewNotificationDetails/ViewNotificationDetailsRead";
import Modal from "../../../common/Modal";
import { updateNotificationStatus } from "../../../../shared/redux/slices/notification.slices";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../shared/redux/store";

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

const AllNotification = () => {
  const { updates, fetchNotification, currentPage, loading, totalPages } =
    useAllNotification();
  const dispatch: AppDispatch = useDispatch();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isNewsModalOpen, setNewsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    const loadInitialData = async () => {
      await fetchNotification(1, itemsPerPage);
      setIsInitialLoad(false);
    };
    loadInitialData();
  }, [fetchNotification]);

  const handleOpenModal = async (notification: any) => {
    setSelectedNotification(notification);
    setNewsModalOpen(true);
  };
  const handleCloseModal = () => {
    setNewsModalOpen(false);
    setSelectedNotification(null);
  };

  const handleUpdateStatus = async (notification: any) => {
    if (!notification?._id) {
      console.error("No notification ID found");
      return;
    }

    try {
      await dispatch(updateNotificationStatus(notification._id));
      await fetchNotification(currentPage, itemsPerPage);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to update notification status:", error);
    }
  };

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

  if (loading && isInitialLoad) {
    return (
      <div className="space-y-4">
        {[...Array(3)]?.map((_, index) => <NotificationSkeleton key={index} />)}
      </div>
    );
  }

  if (!updates || updates?.length === 0) {
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
              Currently, no updates at this time!
            </h1>
          </header>
          <p className="max-w-md text-sm font-semibold text-gray-600 md:text-base lg:text-lg">
            You will see a notification here when something happens in your
            workspace.
          </p>
        </div>
      </section>
    );
  }

  return (
    <main className="h-auto space-y-4 font-sans">
      {updates.map((notification: any, index: number) => (
        <section
          key={notification?._id}
          onClick={() => handleOpenModal(notification)}
          className="flex cursor-pointer flex-col gap-[1em] rounded-lg bg-gray-100 px-[1em] py-[1em]"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-11 w-9 items-center justify-center rounded-full bg-white text-lg font-bold text-black">
                {getInitial(notification?.title)}
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex gap-2">
                {!notification?.isRead && (
                  <GoDotFill className="text-green-500" size={25} />
                )}
                <p
                  className={`text-sm  font-medium ${notification?.isRead ? "text-gray-700" : "text-gray-800"}`}
                >
                  {truncateText(
                    notification?.message?.replace(/<[^>]*>/g, ""),
                    100,
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <p
              className={`italic ${notification?.isRead ? "text-text2" : "text-gray-400"}`}
            >
              {notification?.isRead ? (
                <p className="flex items-center text-green-600">
                  <IoCheckmarkDoneSharp className="text-green-600" />
                  Read
                </p>
              ) : (
                <p className="flex items-center">
                  <IoCheckmarkDoneSharp />
                  UnRead
                </p>
              )}
            </p>
            <p
              className={`italic ${notification?.isRead ? "text-green-600" : "text-gray-400"}`}
            >
              {formatDate(notification?.createdAt)}
            </p>
          </div>
        </section>
      ))}

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {[...Array(totalPages)]?.map((_, index) => (
            <button
              key={index}
              onClick={() => fetchNotification(index + 1, itemsPerPage)}
              className={`h-8 w-8 rounded-full ${
                currentPage === index + 1
                  ? "bg-text2 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

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
      {selectedNotification && (
        <Modal
          isOpen={isNewsModalOpen}
          onClose={handleCloseModal}
          data-aos="zoom-in"
          className="bg-white"
        >
          <ViewNotificationDetailsRead
            notificationDetails={selectedNotification}
            handleUpdateStatus={handleUpdateStatus}
          />
        </Modal>
      )}
    </main>
  );
};

export default AllNotification;
