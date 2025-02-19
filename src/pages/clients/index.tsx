import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Select, Dropdown, Menu, Card, Avatar, Modal } from "antd";
import { SearchOutlined, AppstoreOutlined, UserAddOutlined, DownOutlined, InfoCircleOutlined } from "@ant-design/icons";
import apilient from "../../config/apiClient";

const { Option } = Select;

const clientData = [
  {
    id: 1, name: "Gursimran Kaur", initials: "I", tags: ["#9C27B0", "#4CAF50", "#F44336"],
    email: "baldevgill8055@gmail.com", phone: "0457 057 762", location: "Brisbane, QLD, Australia",
    status: "Active", membership: "P.R Paid Member", submitted: "No", created: "11 Oct 2024 8:11 AM"
  },
  {
    id: 2, name: "Tarandeep Singh", img: "", tags: ["#E91E63", "#4CAF50", "#F44336"],
    email: "tarandeep@gmail.com", phone: "0457 123 456", location: "Sydney, NSW, Australia",
    status: "Active", membership: "Free Member", submitted: "Yes", created: "12 Oct 2024 10:30 AM"
  },
  {
    id: 3, name: "Anuradha Ahluwalia", img: "", tags: ["#F44336"],
    email: "anuradha@gmail.com", phone: "0457 654 321", location: "Melbourne, VIC, Australia",
    status: "Inactive", membership: "Trial Member", submitted: "No", created: "09 Oct 2024 5:00 PM"
  },
];

const Clients: React.FC = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = (client: any) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Search & Filters */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <Input prefix={<SearchOutlined />} placeholder="Type name to search" className="w-1/3 min-w-[200px]" />
        <div className="flex gap-2">
          <Button icon={<DownOutlined />}>Lists</Button>
          <Dropdown overlay={<Menu><Menu.Item key="1">Default Search</Menu.Item><Menu.Item key="2">By Last Name</Menu.Item></Menu>}>
            <Button>Default Search</Button>
          </Dropdown>
          <Select defaultValue="First Name">
            <Option value="first">First Name</Option>
            <Option value="last">Last Name</Option>
          </Select>
          <Button icon={<UserAddOutlined />} type="primary" onClick={() => navigate("/dashboard/add-client")}>
            + Client
          </Button>
        </div>
        <div className="flex gap-2">
          <Button icon={<AppstoreOutlined />} onClick={() => setView("grid")} />
          <span className="font-semibold text-gray-600">2198</span>
        </div>
      </div>

      {/* Client Display */}
      <div className={view === "grid" ? "grid grid-cols-5 gap-4" : "flex flex-col gap-2"}>
        {clientData.map((client) => (
          <Card key={client.id} className="p-2 shadow-md flex items-center gap-3">
            <Avatar shape="square" size={100} style={{ backgroundColor: "#607D8B", color: "#fff", fontSize: "32px" }}>
              {client.img ? <img src={client.img} alt={client.name} /> : client.name.split(' ').map(n => n[0]).join('')}
            </Avatar>

            <div>
              <h3 className="text-lg font-semibold">{client.name}</h3>
              <div className="flex gap-2 mt-1">
                {client.tags.map((color, i) => (
                  <span key={i} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></span>
                ))}
              </div>
            </div>
            {/* Info Button to Open Modal */}
            <Button type="text" icon={<InfoCircleOutlined />} onClick={() => openModal(client)} />
          </Card>
        ))}
      </div>

      {/* Client Details Modal */}
      <Modal
        title={selectedClient?.name}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {selectedClient && (
          <div className="flex gap-6 items-start p-4">
            {/* Initial or Image */}
            <div className="w-1/3 flex justify-center items-center bg-blue-500 text-white rounded-full h-28 w-28 text-4xl shadow-md">
              {selectedClient.image ? (
                <img
                  src={selectedClient.image}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                selectedClient.name.charAt(0)
              )}
            </div>
            {/* Content */}
            <div className="w-2/3 space-y-2">
              <p className="text-gray-600"><strong>📍 Location:</strong> {selectedClient.location}</p>
              <p className="text-gray-600"><strong>💳 Membership:</strong> {selectedClient.membership}</p>
              <p className="text-gray-600"><strong>📧 Email:</strong> {selectedClient.email}</p>
              <p className="text-gray-600"><strong>📞 Phone:</strong> {selectedClient.phone}</p>
              <p className="text-gray-600"><strong>📅 Created:</strong> {selectedClient.created}</p>
              <a href={`/dashboard/add-client`} className="text-blue-600 hover:underline">🔗 Click for Profile</a>
            </div>
          </div>
        )}
      </Modal>


    </div>
  );
};

export default Clients;
