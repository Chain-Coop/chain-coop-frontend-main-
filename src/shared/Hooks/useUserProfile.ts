import { useCallback, useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfile, uploadAvatar } from "../redux/slices/landing.slices";
import { AppDispatch } from "../redux/store";
import { setMessage } from "../redux/slices/message.slices";
import {
  GetAllBanks,
  GetAllProject,
  GetContributionBalance,
  GetUnPaidBalance,
  GetUsersContributionHistory,
  GetUsersTransaction,
  GetWalletBalance,
  GetWalletCard,
} from "../redux/slices/transaction.slices";
import { getAllNotification } from "../redux/slices/notification.slices";
import { GetAllUserPools } from "../redux/slices/web3.slices";
import {
  GetSavingCircleByUser,
  GetPublicSavingCircles,
} from "../redux/slices/web_savings_groups.slices";

enum UploadFields {
  ProfilePicture = "profilePicture",
}
import { Project } from "../types";
import { RootState } from "../redux/rootReducer";

export const useUserProfile = (onProfileFetched?: () => void) => {
  const dispatch = useDispatch<AppDispatch>();
  const profileDetails = useSelector(
    (state: RootState) => state.landing.getProfile,
  );
  const userToken = sessionStorage.getItem("userData");
  const [loading, setLoading] = useState(false);

  const [userCircles, setUserCircles] = useState<any[]>([]);
  const [circlesLoading, setCirclesLoading] = useState(false);
  const [circlesError, setCirclesError] = useState<string | null>(null);

  const [publicCircles, setPublicCircles] = useState<any[]>([]);
  const [publicCirclesLoading, setPublicCirclesLoading] = useState(false);
  const [publicCirclesError, setPublicCirclesError] = useState<string | null>(
    null,
  );

  const fetchUserProfile = useCallback(async () => {
    const result = await dispatch(GetUserProfile()).unwrap();
    if (onProfileFetched) onProfileFetched();
    return result;
  }, [dispatch, onProfileFetched]);

  const fetchUserCircles = useCallback(async () => {
    if (profileDetails?._id) {
      setCirclesLoading(true);
      setCirclesError(null);
      try {
        const result = await dispatch(
          GetSavingCircleByUser(profileDetails._id),
        ).unwrap();

        setUserCircles(result?.web_group_savings?.data || []);
      } catch (error: any) {
        const errorMessage =
          error?.message || error?.error || "Failed to fetch user circles";
        setCirclesError(errorMessage);
        dispatch(setMessage(errorMessage));
      } finally {
        setCirclesLoading(false);
      }
    }
  }, [dispatch, profileDetails?._id]);

  const fetchPublicCircles = useCallback(async () => {
    setPublicCirclesLoading(true);
    setPublicCirclesError(null);
    try {
      const result = await dispatch(GetPublicSavingCircles()).unwrap();
      setPublicCircles(result || []);
      //console.log("Public Circles:", result);
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.error || "Failed to fetch public circles";
      setPublicCirclesError(errorMessage);
      dispatch(setMessage(errorMessage));
    } finally {
      setPublicCirclesLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!profileDetails) {
      fetchUserProfile().catch((error) => {
        console.error("Failed to fetch user profile:", error);
      });
    }
  }, [fetchUserProfile, profileDetails]);

  return {
    profileDetails,
    fetchUserProfile,
    userCircles,
    circlesLoading,
    circlesError,
    fetchUserCircles,
    publicCircles,
    publicCirclesLoading,
    publicCirclesError,
    fetchPublicCircles,
  };
};

export const useWallet = () => {
  const dispatch = useDispatch<AppDispatch>();

  const walletBalance = useSelector(
    (state: RootState) => state.transaction.walletBalance,
  );
  const usersTransaction = useSelector(
    (state: RootState) => state.transaction.usersTransaction,
  );
  const walletCard = useSelector(
    (state: RootState) => state.transaction.walletCard,
  );
  const isLoading = useSelector(
    (state: RootState) => state.transaction.isLoading,
  );
  const error = useSelector((state: RootState) => state.transaction.error);

  useEffect(() => {
    dispatch(GetWalletBalance());
    dispatch(GetUsersTransaction());
    dispatch(GetWalletCard());
  }, [dispatch]);

  return {
    walletBalance,
    usersTransaction,
    walletCard,
    isLoading,
    error,
  };
};

export const useContribution = ({
  search,
  contributionId,
}: {
  search: string;
  contributionId?: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const contributionBalance = useSelector(
    (state: RootState) => state.transaction.contributionBalance,
  );
  const usersContributionHistory = useSelector(
    (state: RootState) => state.transaction.usersContributionHistory,
  );
  const unpaidBalance = useSelector(
    (state: RootState) => state.transaction.unpaidBalance,
  );
  const isLoading = useSelector(
    (state: RootState) => state.transaction.isLoading,
  );
  const error = useSelector((state: RootState) => state.transaction.error);

  useEffect(() => {
    dispatch(GetContributionBalance());
    dispatch(
      GetUsersContributionHistory({
        search,
      }),
    );
    if (contributionId) {
      dispatch(GetUnPaidBalance(contributionId));
    }
  }, [dispatch, search, contributionId]);

  return {
    contributionBalance,
    usersContributionHistory,
    unpaidBalance,
    isLoading,
    error,
  };
};

export const useAllProjects = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allProjects = useSelector(
    (state: RootState) => state.transaction.allProjects,
  );
  const isLoading = useSelector(
    (state: RootState) => state.transaction.isLoading,
  );

  const userToken = sessionStorage.getItem("userData");

  useEffect(() => {
    if (userToken) {
      dispatch(GetAllProject())
        .unwrap()
        .catch((error: any) => {
          const errorMessage = error.message || "Failed to fetch projects";
          dispatch(setMessage(errorMessage));
        });
    } else {
      dispatch(setMessage("Token not found"));
    }
  }, [dispatch, userToken]);

  const latestProjects = useMemo(() => {
    if (!allProjects || !Array.isArray(allProjects)) return [];

    return [...allProjects]
      .sort(
        (a: Project, b: Project) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 2);
  }, [allProjects]);

  return { allProjects, latestProjects, isLoading };
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
  const totalCount = useSelector(
    (state: any) => state?.notificationApplication?.allNotification?.totalCount,
  );
  const loading = useSelector(
    (state: any) => state?.notificationApplication?.loading,
  );
  const error = useSelector(
    (state: any) => state?.notificationApplication?.error,
  );

  const fetchNotification = useCallback(
    (page: number = 1, limit: number = 10) => {
      dispatch(getAllNotification({ page, limit }));
    },
    [dispatch],
  );

  return {
    updates,
    totalPages,
    currentPage,
    totalCount,
    loading,
    error,
    fetchNotification,
  };
};

export const useAllUserPools = () => {
  const dispatch = useDispatch<AppDispatch>();

  const userPools = useSelector((state: any) => state?.web3?.userPools);
  const loading = useSelector((state: any) => state?.web3?.loading);

  const isWalletActivated = useSelector(
    (state: any) => state?.landing?.getProfile?.isWalletActivated || false,
  );
  const hasFetchedForActiveWallet = useRef(false);

  useEffect(() => {
    if (isWalletActivated && !hasFetchedForActiveWallet.current) {
      dispatch(GetAllUserPools());
      hasFetchedForActiveWallet.current = true;
    }
  }, [dispatch, isWalletActivated]);

  return {
    loading,
    userPools: isWalletActivated ? userPools || [] : [],
    isWalletActivated,
  };
};
