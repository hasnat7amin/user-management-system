import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetProfileQuery } from "../redux/apis/userSlice";
import { isPermitted } from "../helpers/isPermitted";


const ProtectedRoute = ({ requiredPermission }: { requiredPermission?: string }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  
  // Fetch user profile (skip if token doesn't exist)
  const { data: userProfileData, isLoading } = useGetProfileQuery({}, { skip: !token });

  // While fetching, show loading state
  if (isLoading) return <div className="text-center text-white">Loading...</div>;

  // Redirect to login if no token
  if (!token) return <Navigate to="/login" replace />;

  // Redirect to unauthorized page if permission is required but user doesn't have it
  if (requiredPermission && !isPermitted(userProfileData, requiredPermission)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
