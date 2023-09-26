import React from "react";
import { ConfigProvider } from "antd";
import { colors } from "@/constants";

const AntdProvider = ({ children }) => {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: colors.primary,
              algorithm: true,
              primaryShadow: "none",
              colorPrimaryBorderHover: "none",
            },
            Input: {
              colorPrimary: colors.primary,
              algorithm: true,
              activeShadow: "0 0 0 1.5px rgba(56, 71, 125, 0.3)",
            },
            Menu: {
              itemSelectedBg: "rgba(33, 48, 113, 0.3)",
              itemActiveBg: "rgba(33, 48, 113, 0.3)",
              itemSelectedColor: colors.primary,
              itemHoverBg: "rgba(33, 48, 113, 0.15)",
            },
            Select: {
              colorPrimary: colors.primary,
              algorithm: true,
              controlItemBgActive: "rgba(33, 48, 113, 0.2)",
              // boxShadow: "0 0 0 1.5px rgba(56, 71, 125, 0.3)",
            },
            Radio: {
              colorPrimary: colors.primary,
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </>
  );
};

export default AntdProvider;
