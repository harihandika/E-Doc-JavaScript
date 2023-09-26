import React, { createContext, useContext, useState } from "react";

const menuItem = [];

const AdminLayoutContext = createContext(null);

export const useAdminLayout = () => {
  return useContext(AdminLayoutContext);
};

const AdminLayoutProvider = ({ children }) => {
  const [menu, setMenu] = useState(menuItem);
  const [title, setTitle] = useState("");

  const setAdminMenu = (value) => {
    setMenu(value);
  };

  const setLayoutTitle = (value) => {
    setTitle(value);
  };

  return (
    <>
      <AdminLayoutContext.Provider
        value={{
          adminMenu: menu,
          setAdminMenu,
          layoutTitle: title,
          setLayoutTitle,
        }}
      >
        {children}
      </AdminLayoutContext.Provider>
    </>
  );
};

export default AdminLayoutProvider;
