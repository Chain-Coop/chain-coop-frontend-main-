import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../shared/redux/store";
import user from "../../../../Assets/png/dashboard/avatar.png";
import tier from "../../../../Assets/svg/dashboard/tier.svg";
import { RootState } from "../../../../shared/redux/rootReducer";
import {
  GetUserProfile,
  uploadAvatar,
} from "../../../../shared/redux/slices/landing.slices";

const Avatar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { getProfile, avatarUrl, isLoading } = useSelector(
    (state: RootState) => state.landing,
  );
  const [avatarLoading, setAvatarLoading] = useState(false);

  useEffect(() => {
    dispatch(GetUserProfile());
  }, [dispatch]);

  useEffect(() => {
    setAvatarLoading(isLoading);
  }, [isLoading]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setAvatarLoading(true);
      const formData = new FormData();
      formData.append("profilePicture", selectedFile);
      await dispatch(uploadAvatar(formData)).unwrap();
      await dispatch(GetUserProfile()).unwrap();
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
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-text2 border-t-transparent"></div>
                  </div>
                ) : (
                  <img
                    src={avatarUrl || getProfile?.profilePhoto?.url || user}
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
              {getProfile?.username || "user"}
            </span>
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
