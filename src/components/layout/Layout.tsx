import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import NavHeader from "./Header";
import useIsMobile from "../../hooks/IsMobile";

const { Content } = Layout;

const App: React.FC = () => {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(isMobile);

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      {/* Fixed Header */}
      <NavHeader onClick={() => setCollapsed(!collapsed)} collapsed={collapsed} />

      <Layout style={{ paddingTop: "64px", display: "flex" }}>
        {/* Fixed Sidebar with 35% Width */}
        <div
          className={`fixed left-0 top-[64px] bg-white shadow-lg h-[calc(100vh-64px)] transition-all`}
          style={{
            width: collapsed ? "5%" : "18%",
            transition: "width 0.3s ease-in-out",
          }}
        >
          <Sidebar collapsed={collapsed} />
        </div>

        {/* Scrollable Content Area with 65% Width */}
        <div
          className="transition-all flex-1 overflow-y-auto p-6"
          style={{
            marginLeft: collapsed ? "5%" : "18%",
            width: collapsed ? "95%" : "72%",
            height: "calc(100vh - 64px)",
            overflowY: "auto",
            transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
          }}
        >
          <Content>
            <Outlet />
          </Content>
        </div>
      </Layout>
    </Layout>

  );
};

export default App;
