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
      width={250}
      style={{
        height: "100vh",
        background: "#fff",
        transition: "width 0.3s ease-in-out",
        boxShadow: collapsed ? "none" : "2px 0 10px rgba(0,0,0,0.1)",
        position: "fixed",
        left: 0,
        top: 64,
        zIndex: 1000,
        borderRight: "1px solid #e0e0e0",
        overflowY: "auto",
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["/dashboard"]}
        onClick={(e) => navigate(e.key)}
        style={{
          fontSize: "16px",
          fontWeight: 500,
          padding: "12px 0",
        }}
      >
        {sidebarLinks.map((link) =>
          link.children ? (
            <Menu.SubMenu
              key={link.key}
              icon={link.icon}
              title={!collapsed && link.label}
              style={{ marginBottom: 5 }}
            >
              {link.children.map((child) => (
                <Menu.Item
                  key={child.key}
                  style={{
                    fontSize: "15px",
                    paddingLeft: collapsed ? "16px" : "30px",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  {child.label}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              key={link.key}
              icon={link.icon}
              style={{
                fontSize: "16px",
                padding: "14px",
                transition: "all 0.3s",
                borderRadius: "4px",
                margin: "5px 10px",
              }}
            >
              {!collapsed && link.label}
            </Menu.Item>
          )
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
