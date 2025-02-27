import React, { useEffect, useState } from "react";
import bell from "../../../../Assets/png/dashboard/notification.png";
import { useAllNotification } from "../../../../shared/Hooks/useUserProfile";
import { GoDotFill } from "react-icons/go";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import ViewNotificationDetailsRead from "../ViewNotificationDetails/ViewNotificationDetailsRead";
import { updateNotificationStatus } from "../../../../shared/redux/slices/notification.slices";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../shared/redux/store";
import { NotificationSkeleton } from "../../../common/Loading";
import { Typography } from "@material-tailwind/react";

const AllNotification = () => {
  const { updates, fetchNotification, currentPage, loading, totalPages } =
    useAllNotification();
  const dispatch: AppDispatch = useDispatch();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    const loadInitialData = async () => {
      await fetchNotification(1, itemsPerPage);
      setIsInitialLoad(false);
    };
    loadInitialData();
  }, [fetchNotification]);

  const groupByMonth = (notifications: any) => {
    const grouped = notifications.reduce((acc: any, notification: any) => {
      const date = new Date(notification?.createdAt);
      const month = date?.toLocaleString("default", { month: "long" });
      const year = date?.getFullYear();
      const key = `${month} ${year}`;

      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key]?.push(notification);
      return acc;
    }, {});

    return Object?.entries(grouped);
  };

  const handleOpenDialog = async (notification: any) => {
    setSelectedNotification(notification);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedNotification(null);
  };

  const handleDialogToggle = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleUpdateStatus = async (notification: any) => {
    if (!notification?._id) {
      console.error("No notification ID found");
      return;
    }

    try {
      await dispatch(updateNotificationStatus(notification._id));
      await fetchNotification(currentPage, itemsPerPage);
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to update notification status:", error);
    }
  };

  const handleViewAll = (monthYear: string) => {
    if (expandedMonth === monthYear) {
      setExpandedMonth(null);
    } else {
      setExpandedMonth(monthYear);
    }
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
      <section className="mt-8 md:mt-12 md:p-6 lg:mt-16 ">
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

  const groupedNotifications = groupByMonth(updates);

  return (
    <main className="h-auto space-y-4 font-sans">
      {groupedNotifications.map(([monthYear, monthNotifications]: any) => {
        const isExpanded = expandedMonth === monthYear;
        const displayNotifications = isExpanded
          ? monthNotifications
          : monthNotifications.slice(0, 3);

        return (
          <div key={monthYear} className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{monthYear}</h2>
              {monthNotifications.length > 3 && (
                <button
                  onClick={() => handleViewAll(monthYear)}
                  className="text-sm font-medium text-text2 hover:text-purple-700"
                >
                  {isExpanded ? (
                    <p className="font-semibold"></p>
                  ) : (
                    <p>View All</p>
                  )}
                </button>
              )}
            </div>
            <div className="space-y-4">
              {displayNotifications.map((notification: any) => (
                <section
                  key={notification?._id}
                  onClick={() => handleOpenDialog(notification)}
                  className="flex h-auto cursor-pointer flex-col gap-[1em] rounded-lg bg-gray-100 px-[1em] py-2"
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
                          className={`text-sm font-medium ${
                            notification?.isRead
                              ? "text-gray-700"
                              : "text-gray-800"
                          }`}
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
                      className={`italic ${
                        notification?.isRead ? "text-text2" : "text-gray-400"
                      }`}
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
                    <Typography
                      variant="small"
                      className={`font-normal italic ${
                        notification?.isRead
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {formatDate(notification?.createdAt)}
                    </Typography>
                  </div>
                </section>
              ))}
            </div>
          </div>
        );
      })}

      {selectedNotification && (
        <ViewNotificationDetailsRead
          notificationDetails={selectedNotification}
          handleUpdateStatus={handleUpdateStatus}
          open={isDialogOpen}
          handleOpen={handleDialogToggle}
        />
      )}
    </main>
  );
};

export default AllNotification;
