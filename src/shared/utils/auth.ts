import { useNavigate } from "react-router";
import { resetAuthState } from "../redux/slices/landing.slices";
import { useDispatch } from "react-redux";

export const handleLoggout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("userData");
  dispatch(resetAuthState());
  navigate("/login");
};
