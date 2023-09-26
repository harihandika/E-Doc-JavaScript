import React, { useEffect } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { LoginPage } from "@/pages";

const AuthRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth/login");
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="login" element={<LoginPage />} exact />
        </Route>
      </Routes>
    </>
  );
};

export default AuthRoute;
