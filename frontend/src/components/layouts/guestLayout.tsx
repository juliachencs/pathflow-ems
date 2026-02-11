import { Layout, Button, Space } from "antd";
import viteLogo from "@/assets/vite.svg";
import { Outlet, useNavigate } from "react-router-dom";
// import backgroundImage from "@/assets/background.jpg"

const { Header, Content } = Layout;

const GuestLayout = () => {
    const navigate = useNavigate();
  return (
    <Layout
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        // backgroundImage: `url(${backgroundImage})`,
        background: "linear-gradient(135deg, #FFF9C4 0%, #FFFFFF 100%)",
      }}
    >
      {/* Top Bar */}
      <Header
        style={{
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
        }}
      >
        {/* Logo */}
        <div>
          <img src={viteLogo} className="logo vite" alt="Vite logo" />
        </div>

        {/* Auth Buttons */}
        <Space>
          <Button type="text" style={{ color: "#333" }} onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button ghost style={{ color: "#333", borderColor: "#333" }} onClick={() => navigate('/signup')}>
            Register
          </Button>
        </Space>
      </Header>

      {/* Main Content */}
      <Content
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default GuestLayout;
