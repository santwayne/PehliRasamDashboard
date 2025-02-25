import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Card, Modal, Spin } from "antd";
import { SearchOutlined, AppstoreOutlined, UserAddOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { getClient } from "./Actions";

const Clients: React.FC = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const response = await getClient(1, 10);
        const clientsData = response?.data?.data ?? response?.data;
        setClients(Array.isArray(clientsData) ? clientsData : []);
      } catch (error) {
        console.error("Error fetching clients:", error);
        setClients([]);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const openModal = (client: any) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Search & Filters */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <Input prefix={<SearchOutlined />} placeholder="Type name to search" className="w-full sm:w-1/3" />
        <div className="flex flex-wrap gap-2">
          <Button icon={<UserAddOutlined />} type="primary" onClick={() => navigate("/dashboard/add-client")}>
            + Client
          </Button>
          <Button icon={<AppstoreOutlined />} onClick={() => setView("grid")} />
        </div>
      </div>

      {/* Client Display */}
      {clients.length === 0 ? (
        <div className="text-center text-gray-500">No clients found</div>
      ) : (
        <div className={`grid ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" : "flex flex-col"} gap-4`}>
          {clients.map((client) => (
            <Card key={client._id} className="p-4 shadow-md flex flex-col items-center gap-3 text-center">
              {/* Image without background color */}
              {client.imgURL?.length > 0 ? (
                <img src={client.imgURL[0]} alt={client.name} className="w-24 h-24 object-cover rounded-full shadow-md" />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-full text-xl font-semibold">
                  {client.name.split(" ").map((n: string) => n[0]).join("")}
                </div>
              )}

              <h3 className="text-lg font-semibold">{client.name}</h3>
              <p className="text-gray-500">{client.location}</p>

              {/* Info Button to Open Modal */}
              <Button type="primary" icon={<InfoCircleOutlined />} onClick={() => openModal(client)}>
                View Details
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* Client Details Modal */}
      <Modal
        title={<h2 className="text-lg font-semibold text-center">{selectedClient?.name}</h2>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={350} // Decreased width for better UI
      >
        {selectedClient && (
          <div className="flex flex-col items-center text-center p-4">
            {/* Profile Image */}
            {selectedClient.imgURL?.length > 0 ? (
              <img src={selectedClient.imgURL[0]} alt="Profile" className="w-24 h-24 object-cover rounded-full shadow-md" />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-full text-3xl font-semibold shadow-md">
                {selectedClient.name.charAt(0)}
              </div>
            )}

            {/* Client Details */}
            <div className="mt-4 w-full space-y-2">
              <p className="text-gray-600 text-sm"><strong>📍 Location:</strong> {selectedClient.location}</p>
              <p className="text-gray-600 text-sm"><strong>📧 Email:</strong> {selectedClient.email}</p>
              <p className="text-gray-600 text-sm"><strong>📞 Phone:</strong> {selectedClient.contact || "N/A"}</p>
              <p className="text-gray-600 text-sm"><strong>📅 Registered:</strong> {new Date(selectedClient.registrationDate).toLocaleDateString()}</p>
            </div>

            {/* Profile Link */}
            <Button
              type="link"
              className="mt-4 text-blue-600 hover:underline text-sm"
              onClick={() => navigate("/dashboard/add-client", { state: { clientId: selectedClient._id } })}
            >
              🔗 View Full Profile
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Clients;
