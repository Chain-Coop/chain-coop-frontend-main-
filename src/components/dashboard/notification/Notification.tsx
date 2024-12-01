import React from "react";
import { DashboardHeader } from "../../common/DashboardHeader";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import bell from "../../../Assets/png/dashboard/notification.png";

const Notification = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <main className="min-h-screen w-full font-sans">
      <DashboardHeader
        className="relative cursor-pointer items-center md:mt-4 lg:mt-8"
        onClick={handleBackClick}
      >
        <IoIosArrowBack
          size={25}
          className="absolute left-0 cursor-pointer transition-opacity hover:opacity-75"
        />
        <div className="flex flex-grow items-center justify-center">
          <div className="text-2xl tracking-wide md:text-3xl lg:text-xl">
            Notification
          </div>
        </div>
      </DashboardHeader>

      <section className="mx-auto mt-8 max-w-4xl p-4 md:mt-12 md:p-6 lg:mt-16 lg:p-8">
        <div className="flex flex-col items-center gap-4 px-4 text-center md:gap-6 lg:gap-8">
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
    </main>
  );
};

export default Notification;
