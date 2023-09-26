import React, { useEffect } from "react";
import { useAppTitle, useAdminLayout } from "@/contexts";

const DashboardGreencardPage = (props) => {
  const { setAppTitle } = useAppTitle();
  const { setLayoutTitle } = useAdminLayout();

  useEffect(() => {
    setAppTitle("Dashboard Greencard");
    setLayoutTitle("Dashboard Greencard");
  }, []);

  return (
    <>
      <h1>DashboardGreencard</h1>
    </>
  );
};

export default DashboardGreencardPage;
