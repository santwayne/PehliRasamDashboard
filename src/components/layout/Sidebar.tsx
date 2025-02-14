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
      width={collapsed ? 80 : 300}
      style={{
        height: "100vh",
        overflowY: "auto",
        background: "#ffffff",
        transition: "width 0.3s ease-in-out",
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["/dashboard"]}
        onClick={(e) => navigate(e.key)}
        style={{
          fontSize: "16px",
        }}
      >
        {sidebarLinks.map((link) =>
          link.children ? (
            <Menu.SubMenu key={link.key} icon={link.icon} title={link.label}>
              {link.children.map((child) => (
                <Menu.Item key={child.key} style={{ fontSize: "16px" }}>
                  {child.label}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={link.key} icon={link.icon} style={{ fontSize: "16px" }}>
              {link.label}
            </Menu.Item>
          )
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
