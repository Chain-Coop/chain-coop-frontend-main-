import React from "react";
import user from "../../../../Assets/png/dashboard/avatar.png";
import useUserProfile from "../../../../shared/Hooks/useUserProfile";
import { IoIosArrowForward } from "react-icons/io";

const Avatar = () => {
  const { profileDetails } = useUserProfile();

  return (
    <main className="font-sans">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-full bg-gray-200 sm:h-24 sm:w-24">
            <img
              src={user}
              alt="profile"
              className="h-full w-full object-cover"
            />
            <input
              type="file"
              id="file-input"
              className="hidden"
              accept="image/*"
            />
          </div>
          <div className="flex flex-col items-center gap-2 sm:items-start sm:gap-4">
            <span className="text-lg font-semibold">
              {profileDetails?.username || "user"}
            </span>
            <button className="w-full rounded-full bg-primary px-2 py-1 text-sm font-medium shadow-md sm:w-auto sm:px-6 sm:text-base">
              Edit Profile
            </button>
          </div>
        </div>
        <IoIosArrowForward size={25} className="mt-4 text-text2 sm:mt-0" />
      </div>
    </main>
  );
};

export default Avatar;
