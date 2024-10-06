import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useUserProfile from '../../../shared/Hooks/useUserProfile';

// const AuthWrapper = ({ children }:any) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { profileDetails, loading } = useUserProfile();

//   useEffect(() => {
//     const checkUserStatus = () => {
//       if (!profileDetails) {
//         navigate('/login', { replace: true });
//       } else if (profileDetails.membershipPaymentStatus === "not_started") {
//         if (location.pathname !== '/membershipType') {
//           navigate('/membershipType', { replace: true });
//         }
//       } else if (location.pathname === '/membershipType') {
//         navigate('/dashboard', { replace: true });
//       }
//     };

//     if (!loading) {
//       checkUserStatus();
//     }
//   }, [profileDetails, loading, navigate, location]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return profileDetails && profileDetails.membershipPaymentStatus !== "not_started" ? children : null;
// };


const AuthWrapper = ({ children }:any) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { profileDetails, loading } = useUserProfile();
  
    useEffect(() => {
      if (!loading && profileDetails) {
        if (profileDetails.membershipPaymentStatus === 'not_started') {
          if (!location.pathname.startsWith('/set-payment-plan')) {
            navigate('/set-payment-plan', { replace: true });
          }
        } else if (location.pathname.startsWith('/set-payment-plan')) {
          navigate('/dashboard', { replace: true });
        }
      } else if (!loading && !profileDetails) {
        navigate('/login', { replace: true });
      }
    }, [profileDetails, loading, navigate, location]);
  
    if (loading) return <div>Loading...</div>;
  
    return profileDetails && profileDetails.membershipPaymentStatus !== 'not_started' ? children : null;
  };

export default AuthWrapper;
