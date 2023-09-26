import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { App, Badge, Button, Dropdown, Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCog, FaBell, FaSignOutAlt } from "react-icons/fa";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { acsetLogo } from "@/assets";
import { LetterAvatar } from "@/components";
import { getAccessToken, removeAccessToken } from "@/utils";
import { useAdminLayout, useAppWidth } from "@/contexts";
import { generateMenuItems } from "./generateMenuItems";
import { menuItem } from "./menuItem";
import {
  HeaderContent,
  HeaderMenuContainer,
  HeaderTitle,
  SiderHead,
  UserName,
  buttonCollapseStyle,
  contentStyle,
  headerStyle,
  layoutStyle,
  siderStyle,
} from "./style";

const { Header, Sider, Content } = Layout;

const withAdminLayout = (WrappedComponent) => {
  return function AdminLayout(props) {
    const accessToken = getAccessToken();
    const { decodedToken } = useJwt(accessToken || "");

    const navigate = useNavigate();
    const { message } = App.useApp();
    const { appWidth } = useAppWidth();
    const { adminMenu, setAdminMenu, layoutTitle } = useAdminLayout();

    const [collapsed, setCollapsed] = useState(false);
    const [siderWidth] = useState(240);
    const [siderMinWidth, setSiderMinWidth] = useState(80);
    const [selectedKeyMenu, setSelectedKeyMenu] = useState("");
    const [openKeyMenu, setOpenKeyMeny] = useState(null);
    const [mobileSize, setMobileSize] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [userData, setUserData] = useState({});
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleCollapsed = () => {
      setCollapsed(!collapsed);
    };

    const handleClickMenu = (value) => {
      navigate(getSelectedPath(value.key));
    };

    const getSelectedPath = (key) => {
      let selectedPath = "/";

      const getChildren = (item) => {
        // eslint-disable-next-line no-prototype-builtins
        if (item.hasOwnProperty("children")) {
          item.children.forEach((child) => {
            getChildren(child);
          });
        }
        if (item.key === key) selectedPath = item.path;
      };

      adminMenu.forEach((item) => {
        getChildren(item);
      });
      return selectedPath;
    };

    const getSelectedKey = (pathname) => {
      let selectedKey = "";
      let selectedParentKey = "";

      const getChildren = (item) => {
        // eslint-disable-next-line no-prototype-builtins
        if (item.hasOwnProperty("children")) {
          item.children.forEach((child) => {
            getChildren(child);
          });
        }
        if (item.path === pathname) {
          selectedKey = item.key;
          selectedParentKey = item.parentKey;
        }
      };

      adminMenu.forEach((item) => {
        getChildren(item);
      });
      setSelectedKeyMenu(selectedKey);
      setOpenKeyMeny(selectedParentKey);
    };

    const handleLogOut = (event) => {
      event.preventDefault();
      setLogoutLoading(true);
      setTimeout(() => {
        setLogoutLoading(false);
        removeAccessToken();
        navigate("/");
      }, 1000);
    };

    useEffect(() => {
      setAdminMenu(menuItem);
    }, []);

    useEffect(() => {
      if (appWidth <= 768) {
        // 768px is general tablet size
        setSiderMinWidth(0);
        setMobileSize(true);
        setCollapsed(true);
      } else {
        setSiderMinWidth(80);
        setMobileSize(false);
        setCollapsed(false);
      }
    }, [appWidth]);

    useEffect(() => {
      if (adminMenu.length > 0) {
        getSelectedKey(location.pathname);
      }
    }, [location.pathname, adminMenu]);

    useEffect(() => {
      if (logoutLoading) {
        message.loading("Logging out...", logoutLoading, () =>
          message.success("Success")
        );
      }
    }, [logoutLoading]);

    useEffect(() => {
      if (decodedToken) {
        setUserData(decodedToken);
      }
    }, [decodedToken]);

    return (
      <>
        <Layout hasSider>
          <Sider
            theme="light"
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={siderWidth}
            collapsedWidth={siderMinWidth}
            style={siderStyle()}
          >
            <SiderHead>
              <img src={acsetLogo} alt="acset-logo" />
            </SiderHead>

            {openKeyMenu !== null && (
              <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={[selectedKeyMenu]}
                defaultOpenKeys={[openKeyMenu]}
                selectedKeys={[selectedKeyMenu]}
                onClick={handleClickMenu}
                items={generateMenuItems(adminMenu)}
              />
            )}
          </Sider>

          <Layout
            style={layoutStyle({
              mobileSize,
              collapsed,
              siderMinWidth,
              siderWidth,
            })}
          >
            <Header
              style={headerStyle({
                mobileSize,
                collapsed,
                siderMinWidth,
                siderWidth,
              })}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={handleCollapsed}
                style={buttonCollapseStyle({
                  mobileSize,
                  collapsed,
                  siderMinWidth,
                  siderWidth,
                })}
              />

              <HeaderContent>
                <HeaderTitle>{layoutTitle}</HeaderTitle>

                <HeaderMenuContainer
                  $mobileSize={mobileSize}
                  $collapsed={collapsed}
                >
                  {!mobileSize && !isDropdownOpen && (
                    <UserName>Hi, {userData.fullName}</UserName>
                  )}

                  <Dropdown
                    trigger={["click"]}
                    onOpenChange={(value) => setIsDropdownOpen(value)}
                    menu={{
                      items: [
                        {
                          key: "-1",
                          label: (
                            <UserName style={{ textAlign: "center" }}>
                              Hi, {userData.fullName}
                            </UserName>
                          ),
                          type: "group",
                        },
                        {
                          type: "divider",
                        },
                        {
                          key: "0",
                          label: <Link to="/storage">Account Setting</Link>,
                          icon: <FaUserCog />,
                        },
                        {
                          key: "1",
                          label: (
                            <Link to="/dashboard">
                              <Badge count={27} offset={[-4, 7]}>
                                <p style={{ width: 120 }}>Notification</p>
                              </Badge>
                            </Link>
                          ),
                          icon: <FaBell />,
                        },
                        {
                          type: "divider",
                        },
                        {
                          key: "2",
                          label: <a onClick={handleLogOut}>Log Out</a>,
                          icon: <FaSignOutAlt />,
                        },
                      ],
                    }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <LetterAvatar
                        badgeActive={true}
                        shape="circle"
                        size="large"
                      />
                    </a>
                  </Dropdown>
                </HeaderMenuContainer>
              </HeaderContent>
            </Header>

            <Content style={contentStyle()}>
              <WrappedComponent {...props} />
            </Content>
          </Layout>
        </Layout>
      </>
    );
  };
};

export default withAdminLayout;
