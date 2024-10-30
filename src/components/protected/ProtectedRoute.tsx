import React, { useEffect } from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import { IdleTimerProvider } from "react-idle-timer";
import { toast } from "react-toastify";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  
  const userData = sessionStorage.getItem("userData");
  
  const handleOnIdle = () => {
    sessionStorage.removeItem("userData");
    toast.warning("You have been logged out due to inactivity.");
    navigate("/login");
  };

  const isValidToken = () => {
    try {
      if (!userData) return false;
            
      return true;
    } catch (error) {
      console.error("Invalid token format:", error);
      return false;
    }
  };

  useEffect(() => {
    const validateSession = () => {
      if (!isValidToken()) {
        sessionStorage.removeItem("userData");
        toast.error("Session expired. Please login again.");
        navigate("/login");
      }
    };

    const intervalId = setInterval(validateSession, 10000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  if (!isValidToken()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <IdleTimerProvider
      timeout={60 * 1000} 
      onIdle={handleOnIdle}
      debounce={250}
    >
      <Outlet />
    </IdleTimerProvider>
  );
};

export default ProtectedRoutes;