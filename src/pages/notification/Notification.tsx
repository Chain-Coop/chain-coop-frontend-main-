import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { DashboardHeader } from "../../components/common/DashboardHeader";
import AllNotification from "../../components/dashboard/notification/allNotification/AllNotification";
import UnReadNotification from "../../components/dashboard/notification/unReadNotification/UnReadNotification";
import ReadNotification from "../../components/dashboard/notification/readNotification/ReadNotification";

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
          <div className="text-2xl tracking-wide md:text-3xl lg:text-xl">
            Notification
          </div>
        </div>
      </DashboardHeader>

      <section className="font-outfit">
        <div className="mt-1 h-auto w-full rounded-lg bg-white py-3 pb-20">
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
            <section className="mt-6">
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
