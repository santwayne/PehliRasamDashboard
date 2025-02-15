import React, { useState } from "react";
import { Input, Button, Select, Dropdown, Menu, Card, Avatar, Modal } from "antd";
import { SearchOutlined, AppstoreOutlined, BarsOutlined, UserAddOutlined, DownOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const clientData = [
  { 
    id: 1, name: "Gursimran Kaur", img: "/images/gursimran.jpg", tags: ["#9C27B0", "#4CAF50", "#F44336"],
    email: "baldevgill8055@gmail.com", phone: "0457 057 762", location: "Brisbane, QLD, Australia", 
    status: "Active", membership: "P.R Paid Member", submitted: "No", created: "11 Oct 2024 8:11 AM" 
  },
  { 
    id: 2, name: "Tarandeep Singh", img: "/images/tarandeep.jpg", tags: ["#E91E63", "#4CAF50", "#F44336"],
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
          <Button icon={<UserAddOutlined />} type="primary">+ Client</Button>
        </div>
        <div className="flex gap-2">
          <Button icon={<AppstoreOutlined />} onClick={() => setView("grid")} />
          <Button icon={<BarsOutlined />} onClick={() => setView("list")} />
          <span className="font-semibold text-gray-600">2198</span>
        </div>
      </div>

      {/* Client Display */}
      <div className={view === "grid" ? "grid grid-cols-5 gap-4" : "flex flex-col gap-2"}>
        {clientData.map((client) => (
          <Card key={client.id} className="p-2 shadow-md flex items-center gap-3">
            <Avatar shape="square" size={100} src={client.img || "/images/dummy.jpg"} />
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
          <div>
            <p><strong>📍 Location:</strong> {selectedClient.location}</p>
            <p><strong>🟢 Status:</strong> {selectedClient.status}</p>
            <p><strong>💳 Membership:</strong> {selectedClient.membership}</p>
            <p><strong>📧 Email:</strong> {selectedClient.email}</p>
            <p><strong>📞 Phone:</strong> {selectedClient.phone}</p>
            <p><strong>📂 Submitted:</strong> {selectedClient.submitted}</p>
            <p><strong>📅 Created:</strong> {selectedClient.created}</p>
            <a href={`/profile/${selectedClient.id}`} className="text-blue-500">🔗 Click for Profile</a>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Clients;
