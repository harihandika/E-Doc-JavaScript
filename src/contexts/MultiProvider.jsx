import React from "react";
import AntdProvider from "./AntdProvider";
import AppTitleProvider from "./AppTitleProvider";
import AdminLayoutProvider from "./AdminLayoutProvider";
import AppWidthProvider from "./AppWidthProvider";

const MultiProvider = ({ children }) => {
  const providers = [
    AntdProvider,
    AppTitleProvider,
    AdminLayoutProvider,
    AppWidthProvider,
  ];

  return providers.reduceRight((child, Provider) => {
    return <Provider>{child}</Provider>;
  }, children);
};

export default MultiProvider;
