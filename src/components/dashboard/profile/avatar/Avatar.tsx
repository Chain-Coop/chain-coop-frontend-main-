import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../shared/redux/store";
import user from "../../../../Assets/png/dashboard/avatar.png";
import tier from "../../../../Assets/svg/dashboard/tier.svg";
import { RootState } from "../../../../shared/redux/rootReducer";
import { uploadAvatar } from "../../../../shared/redux/slices/landing.slices";

const Avatar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { getProfile, avatarUrl } = useSelector(
    (state: RootState) => state.landing,
  );
  const [avatarLoading, setAvatarLoading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setAvatarLoading(true);
      const formData = new FormData();
      formData.append("profilePicture", selectedFile);
      try {
        await dispatch(uploadAvatar(formData)).unwrap();
      } catch (error) {
        console.error("Failed to upload avatar:", error);
      } finally {
        setAvatarLoading(false);
      }
    }
  };

  const avatarSource = avatarUrl || getProfile?.profilePhoto?.url || user;

  return (
    <main>
      <div className="flex flex-row items-center justify-between gap-4 lg:flex-row">
        <div className="flex items-center gap-4 sm:gap-6">
          <div>
            <label htmlFor="file-input">
              <div className="relative h-24 w-24 cursor-pointer overflow-hidden rounded-full bg-gray-200">
                {avatarLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-text2 border-t-transparent"></div>
                  </div>
                ) : (
                  <img
                    src={avatarSource}
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
            <div className="flex items-center gap-2">
              <span className="flex gap-2 text-lg font-bold">
                {getProfile?.firstName || "User"}
              </span>
              <span className="flex gap-2 text-lg font-bold">
                {getProfile?.lastName || ""}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div>
                <img src={tier} alt="tier" className="w-5" />
              </div>
              <p className="font-bold">Tier {getProfile?.Tier || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Avatar;
