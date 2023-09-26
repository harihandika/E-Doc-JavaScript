import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { getAccessToken, removeAccessToken } from "@/utils";
import { useJwt } from "react-jwt";
import { App } from "antd";

import AuthRoute from "./AuthRoute";
import AdminRoute from "./AdminRoute"
import MasterDataRoute from "./MasterDataRoute";
import DashboardRoute from "./DashboardRoute";

const AppRoutes = () => {
  const { message } = App.useApp();
  const token = getAccessToken();
  const location = useLocation();
  const { decodedToken, isExpired } = useJwt(token || "");
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    if (decodedToken === null) {
      setIsTokenExpired(false);
    } else if (decodedToken !== null && isExpired) {
      setIsTokenExpired(true);
      removeAccessToken();
      message.error("Your session has expired!");
    } else {
      setIsTokenExpired(false);
    }

    // check exp token every 10 minutes (this timer only active when user has login access)
    if (decodedToken !== null) {
      const timer = setInterval(() => {
        const currentTime = Math.floor(Date.now() / 1000);
        const newIsExpired = decodedToken?.exp;
        if (newIsExpired && newIsExpired < currentTime) {
          setIsTokenExpired(true);
          removeAccessToken();
          message.error("Your session has expired!");
        }
      }, 600000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [decodedToken, isExpired, location.pathname]);

  useEffect(() => {
    // check exp token every location path change (this function only active when user has login access)
    if (decodedToken === null) return;
    const currentTime = Math.floor(Date.now() / 1000);
    const newIsExpired = decodedToken?.exp;
    if (newIsExpired && newIsExpired < currentTime) {
      setIsTokenExpired(true);
      removeAccessToken();
      message.error("Your session has expired!");
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<BaseRoute token={token} isExp={isTokenExpired} />}
        />

        {/* auth route */}
        <Route element={<WithoutAuth token={token} isExp={isTokenExpired} />}>
          <Route path="/auth/*" element={<AuthRoute />} exact />
        </Route>

        {/* protected route */}
        <Route element={<AdminRoute token={token} isExp={isTokenExpired} />}>
          <Route path="/dashboard/*" element={<DashboardRoute />} exact />
          <Route path="/masterData/*" element={<MasterDataRoute />} exact />
        </Route>
      </Routes>
    </>
  );
};

const BaseRoute = ({ token, isExp }) => {
  if (isExp) return <Navigate to="/auth/login" />;
  if (!token) return <Navigate to="/auth/login" />;
  return <Navigate to="/dashboard" />;
};

const WithoutAuth = ({ token, isExp }) => {
  if (isExp) return <Outlet />;
  if (token) return <Navigate to="/" />;
  return <Outlet />;
};

export default AppRoutes;
