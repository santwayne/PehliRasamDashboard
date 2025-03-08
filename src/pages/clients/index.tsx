import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Card, Modal, Form } from "antd";
import { SearchOutlined, AppstoreOutlined, UserAddOutlined, InfoCircleOutlined } from "@ant-design/icons";

const staticClients = [
  {
    _id: "1",
    name: "John Doe",
    location: "New York, USA",
    email: "johndoe@example.com",
    contact: "123-456-7890",
    registrationDate: "2024-01-10",
    imgURL: ["https://via.placeholder.com/150"],
  },
  {
    _id: "2",
    name: "Jane Smith",
    location: "Los Angeles, USA",
    email: "janesmith@example.com",
    contact: "987-654-3210",
    registrationDate: "2023-11-22",
    imgURL: [],
  },
];

const Clients: React.FC = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const openClientModal = (client: any) => {
    setSelectedClient(client);
    setIsClientModalOpen(true);
  };

  const openAddClientModal = () => {
    setIsAddClientModalOpen(true);
  };

  const handleSaveClient = () => {
    form.validateFields().then((values) => {
      setIsAddClientModalOpen(false);
      navigate("/dashboard/add-client", { state: values });
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Search & Filters */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <Input prefix={<SearchOutlined />} placeholder="Type name to search" className="w-full sm:w-1/3" />
        <div className="flex flex-wrap gap-2">
          <Button icon={<UserAddOutlined />} type="primary" onClick={openAddClientModal}>
            + Client
          </Button>
          <Button icon={<AppstoreOutlined />} onClick={() => setView("grid")} />
        </div>
      </div>

      {/* Client Display */}
      <div className={`grid ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "flex flex-col"} gap-4`}>
        {staticClients.map((client) => (
          <Card key={client._id} className="p-4 shadow-md flex flex-col items-center gap-3 text-center">
            {client.imgURL.length > 0 ? (
              <img src={client.imgURL[0]} alt={client.name} className="w-24 h-24 object-cover rounded-full shadow-md" />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-full text-xl font-semibold">
                {client.name.split(" ").map((n) => n[0]).join("")}
              </div>
            )}
            <h3 className="text-lg font-semibold">{client.name}</h3>
            <p className="text-gray-500">{client.location}</p>
            <Button type="primary" icon={<InfoCircleOutlined />} onClick={() => openClientModal(client)}>
              View Details
            </Button>
          </Card>
        ))}
      </div>

      {/* Client Details Modal */}
      <Modal
        title={<h2 className="text-lg font-semibold text-center">{selectedClient?.name}</h2>}
        open={isClientModalOpen}
        onCancel={() => setIsClientModalOpen(false)}
        footer={null}
        centered
        width={350}
      >
        {selectedClient && (
          <div className="flex flex-col items-center text-center p-4">
            {selectedClient.imgURL.length > 0 ? (
              <img src={selectedClient.imgURL[0]} alt="Profile" className="w-24 h-24 object-cover rounded-full shadow-md" />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-full text-3xl font-semibold shadow-md">
                {selectedClient.name.charAt(0)}
              </div>
            )}
            <div className="mt-4 w-full space-y-2">
              <p className="text-gray-600 text-sm"><strong>📍 Location:</strong> {selectedClient.location}</p>
              <p className="text-gray-600 text-sm"><strong>📧 Email:</strong> {selectedClient.email}</p>
              <p className="text-gray-600 text-sm"><strong>📞 Phone:</strong> {selectedClient.contact || "N/A"}</p>
              <p className="text-gray-600 text-sm"><strong>📅 Registered:</strong> {new Date(selectedClient.registrationDate).toLocaleDateString()}</p>
            </div>
            <Button type="link" className="mt-4 text-blue-600 hover:underline text-sm" onClick={() => navigate("/dashboard/add-client", { state: { clientId: selectedClient._id } })}>
              🔗 View Full Profile
            </Button>
          </div>
        )}
      </Modal>

      {/* Add Client Modal */}
      <Modal
        title="Add New Client"
        open={isAddClientModalOpen}
        onCancel={() => setIsAddClientModalOpen(false)}
        onOk={handleSaveClient}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "First name is required" }]}>
            <Input placeholder="Enter first name" />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Last name is required" }]}>
            <Input placeholder="Enter last name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Enter a valid email" }]}>
            <Input placeholder="Enter email" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Clients;
