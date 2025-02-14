import { useState } from "react";
import { Button, Input } from "antd";
import {
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiSearchLine,
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
    <div className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center justify-between px-6 z-50">
      {/* Left Section: Sidebar Toggle & Title */}
      <div className="flex items-center gap-3">
        <Button
          type="text"
          icon={collapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
          onClick={onClick}
          className="text-gray-600 text-2xl cursor-pointer"
        />
        <h1 className="text-lg font-medium">Pehli Rasam</h1>
      </div>

      {/* Right Section: Search Bar & Icons */}
      <div className="flex items-center gap-4">
        <div className="w-64">
          <Input
            placeholder="Search..."
            prefix={<RiSearchLine className="text-gray-400" />}
            className="rounded-full w-full"
          />
        </div>

        {/* Icons */}
        <RiSettings3Line className="text-xl text-gray-500 cursor-pointer" />
        <RiUserLine className="text-xl text-blue-500 cursor-pointer" />
        <div className="relative">
          <RiNotification3Line className="text-xl text-gray-500 cursor-pointer" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </div>
        <RiLogoutBoxLine className="text-xl text-gray-500 cursor-pointer" onClick={handleLogout} />
      </div>

      {/* Logout Confirmation Modal */}
      <Modal title="Confirm Logout" isModalOpen={isModalOpen} handleCancel={() => setIsModalOpen(false)}>
        <p>Are you sure you want to log out?</p>
        <div className="flex justify-end gap-3 mt-4">
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
