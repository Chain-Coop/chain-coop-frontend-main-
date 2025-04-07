import React, { useState, useEffect } from "react";
import useUserProfile from "../../../../shared/Hooks/useUserProfile";
import user from "../../../../Assets/png/dashboard/avatar.png";
import tier from "../../../../Assets/svg/dashboard/tier.svg";

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
    <main>
      <div className="flex flex-row items-center justify-between gap-4 lg:flex-row">
        <div className="flex items-center gap-4 sm:gap-6">
          <div>
            <label htmlFor="file-input">
              <div className="relative h-24 w-24 cursor-pointer overflow-hidden rounded-full bg-gray-200">
                {avatarLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-text2 border-t-transparent rounded-full animate-spin"></div>
                  </div>
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
              <p className="font-bold">Tier {profileDetails?.Tier || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Avatar;