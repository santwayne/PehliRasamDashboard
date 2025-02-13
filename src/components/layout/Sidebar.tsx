import { Menu, Layout } from 'antd';
import { sidebarLinks } from '../../utils/SidebarLinks';
import { useNavigate } from 'react-router-dom';

type Props = {
  collapsed: boolean;
};

const { Sider } = Layout;

const Sidebar = ({ collapsed }: Props) => {
  const navigate = useNavigate();

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="bg-white"
      style={{ 
        height: '100vh', 
        overflowY: 'auto', 
        background: '#ffffff'  // Ensures no black background
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['/dashboard']}
        onClick={(e) => navigate(e.key)}
        items={sidebarLinks.map((link) => ({
          key: link.key,
          icon: link.icon,
          label: link.label,
        }))}
      />
    </Sider>
  );
};

export default Sidebar;
