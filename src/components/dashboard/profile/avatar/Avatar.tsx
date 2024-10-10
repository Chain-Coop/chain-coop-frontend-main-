import React, { useState, useEffect } from "react";
import useUserProfile from "../../../../shared/Hooks/useUserProfile";
import user from "../../../../Assets/png/dashboard/avatar.png";
import { IoIosArrowForward } from "react-icons/io";
import ReactLoading from "react-loading";

const Avatar = () => {
  const { profileDetails, uploadUserAvatar, loading: initialLoading, fetchUserProfile } = useUserProfile();
  const [avatarLoading, setAvatarLoading] = useState(initialLoading);

  useEffect(() => {
    setAvatarLoading(initialLoading);
  }, [initialLoading]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setAvatarLoading(true);
      await uploadUserAvatar(selectedFile);
      await fetchUserProfile();
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
                    src={profileDetails?.profilePhoto?.url || user}
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
          </div>
        </div>
        <IoIosArrowForward size={25} className="mt-4 text-text2 sm:mt-0" />
      </div>
    </main>
  );
};

export default Avatar;