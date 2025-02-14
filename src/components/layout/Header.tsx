import { useState } from "react";
import { Button, Input } from "antd";
import {
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiSearchLine,
  RiQuestionLine,
  RiSettings3Line,
  RiUserLine,
  RiNotification3Line,
  RiLogoutBoxLine,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Modal from "../atoms/Modal";

type Props = {
  onClick: () => void;
  collapsed: boolean;
};

const NavHeader = ({ onClick, collapsed }: Props) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => setIsModalOpen(true);
  const confirmLogout = () => navigate("/auth/login");

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "64px",
        backgroundColor: "white", // Equivalent to bg-gray-100
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Equivalent to shadow-md
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        zIndex: 50,
      }}
    >
      {/* Left Section: Sidebar Toggle & Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Button
          type="text"
          icon={collapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
          onClick={onClick}
          style={{ fontSize: "24px", color: "#4b5563", cursor: "pointer" }}
        />
        <h1 style={{ fontSize: "20px", fontWeight: 500 }}>Pehli Rasam</h1>
      </div>

      {/* Right Section: Search Bar & Icons */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Search Input */}
        <div style={{ width: "256px" }}>
          <Input
            placeholder="Search..."
            prefix={<RiSearchLine style={{ color: "#9ca3af" }} />}
            style={{
              borderRadius: "999px", // Rounded-full effect
              width: "100%",
            }}
          />
        </div>

        {/* Icons */}
        <RiSettings3Line style={{ fontSize: "20px", color: "#6b7280", cursor: "pointer" }} />
        <RiUserLine style={{ fontSize: "20px", color: "#3b82f6", cursor: "pointer" }} />
        <div style={{ position: "relative" }}>
          <RiNotification3Line style={{ fontSize: "20px", color: "#6b7280", cursor: "pointer" }} />
          <span
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              height: "8px",
              width: "8px",
              backgroundColor: "#ef4444",
              borderRadius: "50%",
            }}
          ></span>
        </div>
        <RiLogoutBoxLine
          style={{ fontSize: "20px", color: "#6b7280", cursor: "pointer" }}
          onClick={handleLogout}
        />
      </div>

      {/* Logout Confirmation Modal */}
      <Modal title="Confirm Logout" isModalOpen={isModalOpen} handleCancel={() => setIsModalOpen(false)}>
        <p>Are you sure you want to log out?</p>
        <div style={{ display: "flex", justifyContent: "end", gap: "12px", marginTop: "16px" }}>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button type="primary" danger onClick={confirmLogout}>
            Logout
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default NavHeader;
