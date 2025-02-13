import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import NavHeader from './Header';
import useIsMobile from '../../hooks/IsMobile';

const { Content } = Layout;

const App: React.FC = () => {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(isMobile);

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  return (
    <Layout className="h-screen">
      {/* Fixed Header */}
      <NavHeader onClick={() => setCollapsed(!collapsed)} collapsed={collapsed} />

      {/* Sidebar & Content Layout */}
      <Layout className="flex pt-[64px] h-full">
        {/* Sidebar (30%) */}
        <div className={`transition-all fixed left-0 top-[64px] bg-white shadow-lg h-[calc(100vh-64px)] ${
          collapsed ? 'w-16' : 'w-3/10'
        }`}>
          <Sidebar collapsed={collapsed} />
        </div>

        {/* Content (70%) */}
        <div className={`transition-all flex-1 overflow-auto p-6 ${collapsed ? 'ml-16' : 'ml-3/10'}`}>

          <Content>
            <Outlet />
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default App;
