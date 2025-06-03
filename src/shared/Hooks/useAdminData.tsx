import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo } from "react";
import { setMessage } from "../redux/slices/message.slices";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/rootReducer";
import {
  fetchAllBlogs,
  fetchAllBlogsCategories,
  fetchAllWithdrawals,
} from "../redux/slices/adminSlices/adminSlices";

export const useAllWithdrawals = () => {
  const dispatch: AppDispatch = useDispatch();
  const allUserWithdrawals = useSelector(
    (state: RootState) => state.admin.withdrawals,
  );
  const loading = useSelector((state: RootState) => state.admin.isLoading);
  const error = useSelector((state: RootState) => state.admin.error);

  const userToken = sessionStorage.getItem("userData");

  useEffect(() => {
    if (userToken) {
      dispatch(fetchAllWithdrawals())
        .unwrap()
        .catch((err: string) => {
          dispatch(setMessage(err));
        });
    } else {
      dispatch(setMessage("Token not found"));
    }
  }, [dispatch, userToken]);

  return { allUserWithdrawals, loading, error };
};

export const useAllBlogCategories = () => {
  const dispatch: AppDispatch = useDispatch();
  const blogCategories = useSelector(
    (state: RootState) => state.admin.categories,
  );
  const loading = useSelector((state: RootState) => state.admin.isLoading);
  const error = useSelector((state: RootState) => state.admin.error);

  const userToken = sessionStorage.getItem("userData");

  useEffect(() => {
    if (userToken) {
      dispatch(fetchAllBlogsCategories())
        .unwrap()
        .catch((err: string) => {
          dispatch(setMessage(err));
        });
    } else {
      dispatch(setMessage("Token not found"));
    }
  }, [dispatch, userToken]);

  return { blogCategories, loading, error };
};

export const useAllBlogs = () => {
  const dispatch: AppDispatch = useDispatch();
  const blogs = useSelector((state: RootState) => state.admin.blogPosts);
  const loading = useSelector((state: RootState) => state.admin.isLoading);
  const error = useSelector((state: RootState) => state.admin.error);

  const userToken = sessionStorage.getItem("userData");

  useEffect(() => {
    if (userToken) {
      dispatch(fetchAllBlogs())
        .unwrap()
        .catch((err: string) => {
          dispatch(setMessage(err));
        });
    } else {
      dispatch(setMessage("Token not found"));
    }
  }, [dispatch, userToken]);

  return { blogs, loading, error };
};
