import React from "react";
import bell from "../../../../Assets/png/dashboard/notification.png";

const UnReadNotification = () => {
  return (
    <section className="mx-auto mt-8 max-w-4xl p-4 md:mt-12 md:p-6 lg:mt-16 lg:p-8">
      <div className="flex flex-col items-center gap-4 text-center md:gap-6 lg:gap-8">
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
};

export default UnReadNotification;
