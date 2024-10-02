
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfile, uploadAvatar } from "../redux/slices/landing.slices";
import { AppDispatch } from "../redux/store";
import { setMessage } from "../redux/slices/message.slices";
import { GetAllBanks, GetAllProject, GetProposal } from "../redux/slices/transaction.slices";

enum UploadFields {
  ProfilePicture = "profilePicture", 
}

export const useUserProfile = () => {
  const dispatch: AppDispatch = useDispatch();
  const profileDetails = useSelector((state: any) => state.landing.getProfile);
  const userToken = sessionStorage.getItem("userData");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(GetUserProfile())
      .unwrap()
      .catch((error) => {
        console.error("Profile fetch error:", error);
      });
  }, [dispatch]);

  const uploadUserAvatar = async (selectedFile: File) => {
    if (userToken && selectedFile) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append(UploadFields.ProfilePicture, selectedFile); 
        await dispatch(uploadAvatar(formData)).unwrap();
        await dispatch(GetUserProfile()).unwrap();
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
  };
};



export const useProposalLength = () => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const useLength = useSelector(
    (state: any) => state.transaction.userProposal,
  );
  const userToken = sessionStorage.getItem("userData");
  useEffect(() => {
    if (userToken) {
      setLoading(true);
      dispatch(GetProposal())
        .unwrap()
        .then(() => setLoading(false))
        .catch((error: any) => {
          const errorMessage = error.message;
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
  const [loading, setLoading] = useState(false);

  const useProjects = useSelector(
    (state: any) => state.transaction.allProjects,
  );

  const userToken = sessionStorage.getItem("userData");
  useEffect(() => {
    if (userToken) {
      setLoading(true);
      dispatch(GetAllProject())
        .unwrap()
        .then(() => setLoading(false))
        .catch((error: any) => {
          const errorMessage = error.message;
          dispatch(setMessage(errorMessage));
          setLoading(false);
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

  const useBanks = useSelector(
    (state: any) => state.transaction.allBanks,
  );
  const userToken = sessionStorage.getItem("userData");
  useEffect(() => {
    if (userToken) {
      setLoading(true);
      dispatch(GetAllBanks())
        .unwrap()
        .then(() => setLoading(false))
        .catch((error: any) => {
          const errorMessage = error.message;
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
      const pinSkippedAt = localStorage.getItem('pinSkippedAt');
      
      if (!pinSkippedAt) {
        setShowPinSetup(true);
      } else {
        const skippedTime = new Date(pinSkippedAt).getTime();
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - skippedTime;
        
        if (timeDifference >=  60 * 1000) { 
          setShowReminder(true);
        } else {
          const timeoutId = setTimeout(() => setShowReminder(true), 2 * 60 * 1000 - timeDifference);
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
    setShowSuccessModal
  };
};