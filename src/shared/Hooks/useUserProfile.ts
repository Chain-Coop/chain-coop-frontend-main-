import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfile } from "../redux/slices/landing.slices";
import { AppDispatch } from "../redux/store";

export const useUserProfile = () => {
  const dispatch: AppDispatch = useDispatch();
  const profileDetails = useSelector((state: any) => state.landing.getProfile);

  useEffect(() => {
    dispatch(GetUserProfile())
      .unwrap()
      .catch((error) => {
        console.error("Profile fetch error:", error);
      });
  }, [dispatch]);

  return {
    profileDetails,
  };
};

export default useUserProfile;
