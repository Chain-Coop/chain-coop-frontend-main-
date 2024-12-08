import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfile, uploadAvatar } from "../redux/slices/landing.slices";
import { AppDispatch } from "../redux/store";
import { setMessage } from "../redux/slices/message.slices";
import {
  GetAllBanks,
  GetAllProject,
  GetAllUserFundedProject,
  GetProposal,
  GetUsersContributionHistory,
  GetWalletCard,
} from "../redux/slices/transaction.slices";
import { getAllNotification } from "../redux/slices/notification.slices";

enum UploadFields {
  ProfilePicture = "profilePicture",
}

export const useUserProfile = () => {
  const dispatch: AppDispatch = useDispatch();
  const profileDetails = useSelector(
    (state: any) => state?.landing?.getProfile,
  );
  const userToken = sessionStorage.getItem("userData");
  const [loading, setLoading] = useState(false);

  const fetchUserProfile = useCallback(() => {
    return dispatch(GetUserProfile()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    fetchUserProfile().catch((error) => {});
  }, [fetchUserProfile]);

  const uploadUserAvatar = async (selectedFile: File) => {
    if (userToken && selectedFile) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append(UploadFields.ProfilePicture, selectedFile);
        await dispatch(uploadAvatar(formData)).unwrap();
        await fetchUserProfile();
      } catch (error: any) {
        const errorMessage = error.message || "Failed to upload avatar";
        dispatch(setMessage(errorMessage));
      } finally {
        setLoading(false);
      }
    } else {
      const errorMessage = "Token not found or file not selected";
      dispatch(setMessage(errorMessage));
    }
  };

  return {
    profileDetails,
    loading,
    uploadUserAvatar,
    fetchUserProfile,
  };
};

export const useProposalLength = () => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const useLength = useSelector(
    (state: any) => state?.transaction?.userProposal,
  );
  const userToken = sessionStorage.getItem("userData");
  useEffect(() => {
    if (userToken) {
      setLoading(true);
      dispatch(GetProposal())
        .unwrap()
        .then(() => setLoading(false))
        .catch((error: any) => {
          const errorMessage = error?.message;
          dispatch(setMessage(errorMessage));
          setLoading(false);
        });
    } else {
      dispatch(setMessage("Token not found"));
    }
  }, [dispatch, userToken]);

  return { useLength, loading };
};

export const useAllProjects = () => {
  const dispatch: AppDispatch = useDispatch();

  const useProjects = useSelector(
    (state: any) => state?.transaction?.allProjects,
  );

  const loading = useSelector((state: any) => state?.transaction?.loading);

  const userToken = sessionStorage.getItem("userData");

  useEffect(() => {
    if (userToken) {
      dispatch(GetAllProject())
        .unwrap()
        .catch((error: any) => {
          const errorMessage = error.message;
          dispatch(setMessage(errorMessage));
        });
    } else {
      dispatch(setMessage("Token not found"));
    }
  }, [dispatch, userToken]);

  return { useProjects, loading };
};

export const useAllBanks = () => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const useBanks = useSelector((state: any) => state?.transaction?.allBanks);
  const userToken = sessionStorage.getItem("userData");
  useEffect(() => {
    if (userToken) {
      setLoading(true);
      dispatch(GetAllBanks())
        .unwrap()
        .then(() => setLoading(false))
        .catch((error: any) => {
          const errorMessage = error?.message;
          dispatch(setMessage(errorMessage));
          setLoading(false);
        });
    } else {
      dispatch(setMessage("Token not found"));
    }
  }, [dispatch, userToken]);

  return { useBanks, loading };
};

export default useUserProfile;

export const usePinSetup = (isPinCreated: boolean) => {
  const [showPinSetup, setShowPinSetup] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (!isPinCreated) {
      const pinSkippedAt = localStorage.getItem("pinSkippedAt");

      if (!pinSkippedAt) {
        setShowPinSetup(true);
      } else {
        const skippedTime = new Date(pinSkippedAt)?.getTime();
        const currentTime = new Date()?.getTime();
        const timeDifference = currentTime - skippedTime;

        if (timeDifference >= 60 * 1000) {
          setShowReminder(true);
        } else {
          const timeoutId = setTimeout(
            () => setShowReminder(true),
            2 * 60 * 1000 - timeDifference,
          );
          return () => clearTimeout(timeoutId);
        }
      }
    }
  }, [isPinCreated]);

  return {
    showPinSetup,
    setShowPinSetup,
    showReminder,
    setShowReminder,
    showSuccessModal,
    setShowSuccessModal,
  };
};
export const useAllUserFundedProjects = () => {
  const dispatch: AppDispatch = useDispatch();

  const { allFundedProjects, loading } = useSelector(
    (state: any) => state.transaction,
  );
  const userToken = sessionStorage.getItem("userData");

  useEffect(() => {
    if (!allFundedProjects && userToken) {
      dispatch(GetAllUserFundedProject())
        .unwrap()
        .catch((error: any) => {
          dispatch(setMessage(error.message));
        });
    }
  }, [dispatch, userToken, allFundedProjects]);

  return {
    useUserProjects: allFundedProjects,
    loading,
  };
};

export const useUserContributionHistory = (page: number, limit: number) => {
  const dispatch: AppDispatch = useDispatch();

  const getContributions = useSelector(
    (state: any) => state?.transaction?.getUsersContribution,
  );

  const loading = useSelector((state: any) => state?.transaction?.loading);

  const error = useSelector((state: any) => state?.transaction?.error);

  useEffect(() => {
    const userToken = sessionStorage.getItem("userData");
    if (userToken) {
      dispatch(GetUsersContributionHistory({ page, limit }))
        .unwrap()
        .catch((err: any) => {
          dispatch(setMessage(err.message || "Failed to fetch contributions"));
        });
    } else {
      dispatch(setMessage("User token not found"));
    }
  }, [dispatch, page, limit]);

  return {
    getContributions,
    isLoading: loading,
    error,
  };
};

export const useUserCard = () => {
  const dispatch: AppDispatch = useDispatch();

  const useWalletCards = useSelector(
    (state: any) => state?.transaction?.getWalletCard,
  );

  const loading = useSelector((state: any) => state?.transaction?.loading);

  const userToken = sessionStorage.getItem("userData");

  useEffect(() => {
    if (userToken) {
      dispatch(GetWalletCard())
        .unwrap()
        .catch((error: any) => {
          const errorMessage = error.message;
          dispatch(setMessage(errorMessage));
        });
    } else {
      dispatch(setMessage("Token not found"));
    }
  }, [dispatch, userToken]);

  return { useWalletCards, loading };
};

export const useAllNotification = () => {
  const dispatch: AppDispatch = useDispatch();
  const updates = useSelector(
    (state: any) =>
      state?.notificationApplication?.allNotification?.notifications,
  );
  const totalPages = useSelector(
    (state: any) => state?.notificationApplication?.allNotification?.totalPages,
  );
  const currentPage = useSelector(
    (state: any) =>
      state?.notificationApplication?.allNotification?.currentPage,
  );
  const loading = useSelector(
    (state: any) => state?.notificationApplication?.loading,
  );
  const error = useSelector(
    (state: any) => state?.notificationApplication?.error,
  );

  const fetchNotification = useCallback(
    (page: number, limit: number) => {
      dispatch(getAllNotification({ page, limit }));
    },
    [dispatch],
  );

  return {
    updates,
    totalPages,
    currentPage,
    loading,
    error,
    fetchNotification,
  };
};
