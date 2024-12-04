import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const VerifyContribution = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate("/dashboard/contribution");
    }, 2000);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg transition-all duration-300">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>

          <h1 className="text-xl font-semibold text-green-600">
            Transaction Successful
          </h1>

          <p className="text-center text-gray-600">
            Your transaction was successful. Redirecting to contribution page...
          </p>

          <div className="h-2 w-full rounded-full bg-gray-100">
            <div
              className="duration-2000 h-2 rounded-full bg-green-500 transition-all ease-out"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyContribution;
