import { Menu, Typography, type MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import type { UserRole } from "../../../app/types";
import { UserOutlined } from "@ant-design/icons";
import { clearAuth } from "../../../features/auth/authSlice";
// import viteLogo from "@/assets/vite.svg";

type NavItem = Required<MenuProps>["items"][number] & {
  roleType?: UserRole;
};

const DefaultNav: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const role: UserRole = "USER" as const;
  const items: NavItem[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "onboarding",
      label: "Onboarding Application",
      onClick: () => navigate("/onboarding"),
      roleType: "USER" as const,
    },
    {
      key: "visa",
      label: "My Visa Status",
      onClick: () => navigate("/visa/me"),
      roleType: "USER" as const,
    },
    {
      key: "profiles_admin",
      label: "Manage Employees",
      onClick: () => navigate("/hr/profiles"),
      roleType: "ADMIN" as const,
    },
    {
      key: "visa_admin",
      label: "Manage Visa Status",
      onClick: () => navigate("/hr/visas"),
      roleType: "ADMIN" as const,
    },
    {
      key: "hiring_admin",
      label: "Manage Hiring",
      onClick: () => navigate("/hr/hiring"),
      roleType: "ADMIN" as const,
    },
  ];

  const profileItem: Required<MenuProps>["items"][number][] = [{
    key: "user",
    label: currentUser?.name ?? "User",
    icon: <UserOutlined />,
    // TODO?: Shall I use dropdown insted?
    children: [
      {
        key: "profile",
        label: "Profile",
        onClick: () => navigate("/profile/me"),
      },
      { key: "logout", label: "Logout", onClick: () => dispatch(clearAuth()) },
    ],
  }];

  const visibleItems: Required<MenuProps>["items"][number][] = items
    .filter((item) => {
      if (!item.roleType) return true;
      return item.roleType === role;
      // return item.roleType === currentUser?.role;
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ roleType, ...menuItem }) => menuItem);

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {/* <img src={viteLogo} className="logo vite" alt="Vite logo" /> */}
        <Typography.Text
          style={{ color: "#fff", cursor: "pointer", fontWeight: 600 }}
          onClick={() => navigate("/dashboard")}
        >
          Pathflow EMS
        </Typography.Text>

        <Menu
          theme="dark"
          mode="horizontal"
          items={visibleItems}
          style={{ flex: 1, minWidth: 0 }}
        />
      </div>

      <div>
        <Menu theme="dark" mode="horizontal" items={profileItem} />
      </div>
    </Header>
  );
};

export default DefaultNav;
