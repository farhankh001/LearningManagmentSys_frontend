import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, hydrationCompleted } = useSelector(
    (state: RootState) => state.auth
  );
  const [toastShown, setToastShown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && hydrationCompleted && !toastShown && location.pathname !== "/logout") {
      toast.error("You must be logged in to access this page.");
      setToastShown(true);
    }
  }, [isAuthenticated, hydrationCompleted, toastShown, location.pathname]);

  useEffect(() => {
    if (
      isAuthenticated &&
      user &&
      allowedRoles &&
      !allowedRoles.includes(user.role) &&
      !toastShown
    ) {
      toast.error("You are not authorized to access this page.");
      setToastShown(true);
    }
  }, [isAuthenticated, user, allowedRoles, toastShown]);

  if (!hydrationCompleted) {
    return <Box sx={{width:"100%",height:"70vh",alignItems:"center",justifyContent:"center"}}><CircularProgress/></Box>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};


export default ProtectedRoute

