import React from "react";
import { withAdminLayout } from "@/layouts";
import { Navigate, Outlet } from "react-router-dom";

const Admin = (props) => {
  const { isExp, token } = props;
  if (isExp) return <Navigate to="/auth/login" />;
  if (!token) return <Navigate to="/auth/login" />;
  return <Outlet />;
};

const AdminRoute = withAdminLayout(Admin);
export default AdminRoute;
