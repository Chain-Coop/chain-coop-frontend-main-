import React, { useState } from "react";
import useUserProfile from "../../../../shared/Hooks/useUserProfile";
import ReactLoading from "react-loading";
import user from "../../../../Assets/png/dashboard/avatar.png";
import { IoIosArrowForward } from "react-icons/io";

const Avatar = () => {
  const { profileDetails, uploadUserAvatar, loading: initialLoading } = useUserProfile();
  const [avatarLoading, setAvatarLoading] = useState(initialLoading);

  const handleFileChange = async (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setAvatarLoading(true);
      await uploadUserAvatar(selectedFile); 
      setAvatarLoading(false);
    }
  };

  return (
    <main className="font-sans">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
        <div className="flex items-center gap-4 sm:gap-6">
          <div>
            <label htmlFor="file-input">
              <div className="relative h-24 w-24 cursor-pointer overflow-hidden rounded-full bg-gray-200">
                {avatarLoading ? (
                  <ReactLoading
                    color="#ffffff"
                    width={50}
                    height={50}
                    type="spin"
                    className="absolute inset-0 m-auto"
                  />
                ) : (
                  <img
                    src={profileDetails?.profilePhoto?.url ||user}
                    alt="profile"
                    className="h-full w-full object-cover"
                  />
                )}
                <input
                  type="file"
                  id="file-input"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={avatarLoading}
                />
              </div>
            </label>
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
