import React, { useEffect } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { DashboardGreencardPage } from "@/pages";

const DashboardRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard/greencard");
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="greencard" element={<DashboardGreencardPage />} exact />
        </Route>
      </Routes>
    </>
  );
};

export default DashboardRoute;
