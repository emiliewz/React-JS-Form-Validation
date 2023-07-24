import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React from "react";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();

  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : // replace the login in their navigation history with the location they came from
  auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
  // without this attributes, they can not come back to where they came from
  // <Navigate to="/login" />
};

export default RequireAuth;
