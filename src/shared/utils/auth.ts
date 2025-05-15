import { resetAuthState } from "../redux/slices/landing.slices";
import { AppDispatch } from "../redux/store";

export const handleLoggout = (
  dispatch: AppDispatch,
  navigate: (path: string) => void,
) => {
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("userData");
  dispatch(resetAuthState());
  navigate("/login");
};
