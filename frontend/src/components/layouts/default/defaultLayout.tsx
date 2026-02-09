import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import backgroundImage from "@/assets/background.jpg";
import { Footer } from "antd/es/layout/layout";
import DefaultNav from "./DefaultNavbar";

const { Content } = Layout;

const DefaultLayout: React.FC = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <DefaultNav />

      <Content style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
        <Outlet />
      </Content>

      <Footer style={{ textAlign: "center" }}>
        &copy; {new Date().getFullYear()} All rights reserved.
      </Footer>
    </Layout>
  );
};

export default DefaultLayout;
