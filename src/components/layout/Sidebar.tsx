import { Menu, Layout } from "antd";
import { sidebarLinks } from "../../utils/SidebarLinks";
import { useNavigate } from "react-router-dom";

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
      style={{
        height: "100vh",
        overflowY: "auto",
        background: "#ffffff",
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["/dashboard"]}
        onClick={(e) => navigate(e.key)}
      >
        {sidebarLinks.map((link) =>
          link.children ? (
            <Menu.SubMenu key={link.key} icon={link.icon} title={link.label}>
              {link.children.map((child) => (
                <Menu.Item key={child.key}>{child.label}</Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={link.key} icon={link.icon}>
              {link.label}
            </Menu.Item>
          )
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
