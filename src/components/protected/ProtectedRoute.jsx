import { useRef } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IdleTimerProvider } from "react-idle-timer";

const ProtectedRoutes = () => {
  const idleTimerRef = useRef(null);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("userData");

  const handleOnIdle = () => {
    sessionStorage.removeItem("userData");
    toast("You have been logged out due to inactivity.");
    navigate("/login");
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <IdleTimerProvider
      ref={idleTimerRef}
      timeout={2 * 60 * 1000}
      onIdle={handleOnIdle}
    >
      <Outlet />
    </IdleTimerProvider>
  );
};

export default ProtectedRoutes;
