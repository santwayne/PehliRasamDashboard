import { useState } from "react";
import { Button, Input, Layout } from "antd";
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

const { Header } = Layout;

const NavHeader = ({ onClick, collapsed }: Props) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => setIsModalOpen(true);
  const confirmLogout = () => navigate("/auth/login");

  return (
    <Header className="!fixed !top-0 !left-0 !w-full !h-16 !bg-gray-100 !shadow-md !flex !items-center !px-6 !z-50">
      {/* Left: Sidebar Toggle & Title */}
      <div className="flex items-center gap-3">
        <Button
          type="text"
          icon={collapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
          onClick={onClick}
          className="text-2xl text-gray-600 cursor-pointer"
        />
        <h1 className="text-xl font-medium">Pehli Rasam</h1>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 flex justify-center">
        <Input
          placeholder="Search..."
          prefix={<RiSearchLine className="text-gray-400" />}
          className="rounded-full w-[300px]"
        />
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-4">
        <RiQuestionLine className="text-xl text-gray-500 cursor-pointer" />
        <RiSettings3Line className="text-xl text-gray-500 cursor-pointer" />
        <RiUserLine className="text-xl text-blue-500 cursor-pointer" />
        <RiNotification3Line className="text-xl text-gray-500 cursor-pointer relative">
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </RiNotification3Line>
        <RiLogoutBoxLine className="text-xl text-gray-500 cursor-pointer" onClick={handleLogout} />
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        title="Confirm Logout"
        isModalOpen={isModalOpen}
        handleCancel={() => setIsModalOpen(false)}
      >
        <p>Are you sure you want to log out?</p>
        <div className="flex justify-end gap-3 mt-4">
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button type="primary" danger onClick={confirmLogout}>
            Logout
          </Button>
        </div>
      </Modal>
    </Header>
  );
};

export default NavHeader;
