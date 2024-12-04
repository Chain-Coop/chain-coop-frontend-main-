import React, { useState, useEffect } from "react";
import useUserProfile from "../../../../shared/Hooks/useUserProfile";
import user from "../../../../Assets/png/dashboard/avatar.png";
import tier from "../../../../Assets/svg/dashboard/tier.svg";
import ReactLoading from "react-loading";

const Avatar = () => {
  const {
    profileDetails,
    uploadUserAvatar,
    loading: initialLoading,
    fetchUserProfile,
  } = useUserProfile();
  const [avatarLoading, setAvatarLoading] = useState(initialLoading);

  useEffect(() => {
    setAvatarLoading(initialLoading);
  }, [initialLoading]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
      <div className="flex flex-row items-center justify-between gap-4 lg:flex-row">
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
            <span className="text-lg font-bold">
              {profileDetails?.username || "user"}
            </span>
            <div className="flex items-center gap-1">
              <div>
                <img src={tier} alt="tier" className="w-5" />
              </div>
              <p className="font-bold">Tier 0</p>
            </div>
          </div>
        </div>
        {/* <IoIosArrowForward
          size={25}
          className="mt-4 hidden text-text2 sm:mt-0 lg:block"
        /> */}
      </div>
    </main>
  );
};

export default Avatar;
