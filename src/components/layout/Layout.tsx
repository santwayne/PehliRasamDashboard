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

      <Layout style={{ paddingTop: "64px" }}>
        {/* Fixed Sidebar */}
        <div
          className={`fixed left-0 top-[64px] bg-white shadow-lg h-[calc(100vh-64px)] transition-all ${
            collapsed ? "w-16" : "w-60"
          }`}
        >
          <Sidebar collapsed={collapsed} />
        </div>

        {/* Scrollable Content Area */}
        <div
          className={`transition-all flex-1 overflow-y-auto p-6 ${
            collapsed ? "ml-16" : "ml-60"
          }`}
          style={{
            height: "calc(100vh - 64px)", // Ensure content fits without extra scroll
            overflowY: "auto", // Allows scrolling only in the content area
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
