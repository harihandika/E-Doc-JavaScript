import React, { createContext, useContext, useEffect, useState } from "react";

const AppWidthContext = createContext(null);

export const useAppWidth = () => {
  return useContext(AppWidthContext);
};

const AppWidthProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <AppWidthContext.Provider
        value={{
          appWidth: windowWidth,
        }}
      >
        {children}
      </AppWidthContext.Provider>
    </>
  );
};

export default AppWidthProvider;
