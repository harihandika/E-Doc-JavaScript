import {
  DashboardOutlined,
  DatabaseOutlined,
  FolderOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export const menuItem = [
  {
    key: "m1",
    label: "Dashboard",
    icon: <DashboardOutlined />,
    show: true,
    path: "/dashboard",
    children: [
      {
        key: "m1s1",
        parentKey: "m1",
        label: "Greencard",
        icon: <DatabaseOutlined />,
        show: true,
        path: "/dashboard/greencard",
      },
    ],
  },
  {
    key: "m2",
    label: "Master Data",
    icon: <DatabaseOutlined />,
    show: true,
    path: "/masterData",
    children: [
      {
        key: "m2s1",
        parentKey: "m2",
        label: "Master User",
        icon: <DatabaseOutlined />,
        show: true,
        path: "/masterData/user",
      },
    ],
  },
  {
    key: "m3",
    label: "Files",
    icon: <FolderOutlined />,
    show: true,
    path: "/files",
  },
  {
    key: "m4",
    label: "Account Setting",
    icon: <SettingOutlined />,
    show: true,
    path: "/setting",
  },
];
