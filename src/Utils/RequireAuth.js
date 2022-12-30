import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const { token } = useSelector((state) => state.user);
  const location = useLocation();
  if (token) {
    return <div> {children} </div>;
  } else {
    toast.error('Access Denied, login required')
    return <Navigate to="/" state={{path:  location.pathname}} />;
  }
};
