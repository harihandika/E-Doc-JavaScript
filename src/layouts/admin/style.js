import styled from "styled-components";
import { colors } from "@/constants";

export const SiderHead = styled.div`
  width: 100%;
  height: 64px;
  background-color: transparent;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  & > img {
    width: 90%;
    max-height: 80%;
    object-fit: contain;
  }
`;

export const siderStyle = () => ({
  boxShadow: "0 1px 4px rgba(146, 161, 176, 0.25)",
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  zIndex: 200,
});

export const layoutStyle = (props) => ({
  marginLeft: props.mobileSize
    ? 0
    : props.collapsed
    ? props.siderMinWidth
    : props.siderWidth,
  transition: "0.2s all",
});

export const headerStyle = (props) => ({
  padding: "0 5px",
  background: `${colors.primary}`,
  color: `${colors.text1}`,
  position: "fixed",
  width: `calc(100% - ${
    props.mobileSize
      ? 0
      : props.collapsed
      ? props.siderMinWidth
      : props.siderWidth
  }px)`,
  display: "flex",
  alignItems: "center",
  boxShadow: "0 1px 4px rgba(146, 161, 176, 0.25)",
  transition: "all 0.2s",
  zIndex: 100,
});

export const buttonCollapseStyle = (props) => {
  const baseStyle = {
    fontSize: "16px",
    marginRight: 5,
    width: 46,
    height: 46,
    borderRadius: "100%",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    color: `${colors.text1}`,
  };

  if (props.mobileSize) {
    return {
      ...baseStyle,
      position: props.collapsed ? "initial" : "fixed",
      left: props.collapsed ? props.siderMinWidth + 5 : props.siderWidth + 5,
    };
  } else {
    return baseStyle;
  }
};

export const contentStyle = () => ({
  margin: "20px 16px",
  marginTop: "84px",
  minHeight: "calc(100vh - 104px)",
  background: `${colors.bgColor0}`,
});

export const HeaderContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.h1`
  font-size: 1.25rem;
`;

export const HeaderMenuContainer = styled.div`
  width: auto;
  height: 100%;
  display: ${({ $mobileSize, $collapsed }) =>
    $mobileSize && !$collapsed ? "none" : "flex"};
  gap: 8px;
  align-items: center;
  margin-right: 5px;
`;

export const UserName = styled.p`
  font-size: 15px;
  font-weight: 400;
`;
