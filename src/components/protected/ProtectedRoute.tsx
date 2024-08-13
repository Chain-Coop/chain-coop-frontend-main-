import React from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import { IdleTimerProvider } from "react-idle-timer";
import { toast } from "react-toastify";

const ProtectedRoutes = () => {
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
    <IdleTimerProvider timeout={10 * 60 * 1000} onIdle={handleOnIdle}>
      <Outlet />
    </IdleTimerProvider>
  );
};

export default ProtectedRoutes;
