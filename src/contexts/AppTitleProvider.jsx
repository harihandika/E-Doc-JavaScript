import React, { createContext, useContext, useEffect, useState } from "react";

const AppTitleContext = createContext(null);

export const useAppTitle = () => {
  return useContext(AppTitleContext);
};

const AppTitleProvider = ({ children }) => {
  const [title, setTitle] = useState("SHE Mobile");

  const setAppTitle = (value) => {
    if (typeof value !== "string") return;
    const defaultTitle = "SHE Mobile";
    if (value.length > 0) {
      setTitle(`${value} | ${defaultTitle}`);
    } else {
      setTitle(defaultTitle);
    }
  };

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <AppTitleContext.Provider
        value={{
          appTitle: title,
          setAppTitle,
        }}
      >
        {children}
      </AppTitleContext.Provider>
    </>
  );
};

export default AppTitleProvider;
