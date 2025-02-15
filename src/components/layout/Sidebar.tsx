import { Menu, Layout } from "antd";
import { sidebarLinks } from "../../utils/SidebarLinks";
import { useNavigate } from "react-router-dom";

type SidebarProps = {
  collapsed: boolean;
};

const { Sider } = Layout;

const Sidebar = ({ collapsed }: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={collapsed ? 70 : 250}
      style={{
        height: "100vh",
        overflow: "hidden",
        background: "#ffffff",
        transition: "width 0.3s ease-in-out",
        borderRight: "none",
        boxShadow: collapsed ? "none" : "3px 0 10px rgba(0,0,0,0.1)",
        position: "fixed",
        left: 0,
        top: 64,
        zIndex: 1000,
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["/dashboard"]}
        onClick={(e) => navigate(e.key)}
        style={{
          fontSize: collapsed ? "18px" : "20px",
          fontWeight: "600",
          padding: "12px 0",
        }}
      >
        {sidebarLinks.map((link) =>
          link.children ? (
            <Menu.SubMenu key={link.key} icon={link.icon} title={collapsed ? "" : link.label}>
              {link.children.map((child) => (
                <Menu.Item key={child.key} style={{ fontSize: "18px", paddingLeft: "28px" }}>
                  {child.label}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              key={link.key}
              icon={link.icon}
              style={{
                fontSize: collapsed ? "18px" : "20px",
                padding: collapsed ? "12px" : "16px",
              }}
            >
              {collapsed ? "" : link.label}
            </Menu.Item>
          )
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
