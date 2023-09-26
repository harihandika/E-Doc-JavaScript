import React, { useEffect } from "react";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ActionMasterUserPage, MasterUserPage } from "@/pages";

const MasterDataRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathName = location.pathname.split("/").join("");
    if (pathName !== "masterData") return;
    navigate("/masterData/user");
  }, [navigate, location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="user" element={<MasterUserPage />} exact />
          <Route path="user/create" element={<ActionMasterUserPage />} exact />
        </Route>
      </Routes>
    </>
  );
};

export default MasterDataRoute;
