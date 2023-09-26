import React from "react";
import { App as AntdApp } from "antd";
import AppRoutes from "@/routes";
import { MultiProvider } from "@/contexts";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AntdApp>
          <MultiProvider>
            <AppRoutes />
          </MultiProvider>
        </AntdApp>
      </BrowserRouter>
    </>
  );
};

export default App;
