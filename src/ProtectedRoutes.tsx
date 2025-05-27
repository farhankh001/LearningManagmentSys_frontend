// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { useLoggedInUserInofQuery } from "./app/api/userApi";
import LoadingScreen from "./components/other/Loading";
import toast from "react-hot-toast";
import { current } from "@reduxjs/toolkit";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  // Get the loading state from the same query that Layout is using
  const {data:CurrentUserData, isLoading, isFetching,isError,isSuccess,error } = useLoggedInUserInofQuery();
  const authState = useSelector((state: RootState) => state.auth);
  
  // Wait for Layout to finish its authentication check
  const authInitializing = isLoading || isFetching;
  
  console.log("ProtectedRoute status:", {
    authInitializing,
    isAuthenticated: authState.isAuthenticated,
    user: authState.user?.role,
    isLoading,
    isFetching
  });

  // Show loading while Layout is still checking authentication
  if (authInitializing) {
    return <LoadingScreen />;
  }

  // Only after auth check is complete, redirect if not authenticated
  if (isError||!isSuccess||!CurrentUserData) {
    toast.error("Something went wrong. Try Logging in again.")
    console.log(error)
    return <Navigate to="/login" replace />;
  }

  // Check role permissions
  if (CurrentUserData && CurrentUserData.role && allowedRoles&&!allowedRoles.includes(CurrentUserData.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;