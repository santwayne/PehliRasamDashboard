import { useState } from "react";
import { Modal } from "antd";

interface Client {
  name: string;
  location: string;
  time: string;
  initials: string;
  avatar?: string;
}

const clients: Client[] = [
  { name: "Imran", location: "Sharjah saja", time: "4 hours, 50 minutes", initials: "I" },
  { name: "Amarjit Singh", location: "Winnipeg", time: "2 days, 1 hour", initials: "A" },
  { name: "Anuradha Ahuja", location: "Hicksville Newyork", time: "3 days, 5 hours", initials: "A", avatar: "red" },
  { name: "Jagdeep Singh", location: "Brampton", time: "4 days, 7 hours", initials: "J" },
  { name: "Mohammed Rahbar Alam", location: "Kuwait", time: "4 days, 9 hours", initials: "M" },
  { name: "Satnam Chheena", location: "Brampton ON", time: "4 days, 9 hours", initials: "S", avatar: "yellow" },
  { name: "Dilpreet Singh", location: "Ontario", time: "4 days, 23 hours", initials: "D" },
  { name: "Jagjit Singh", location: "Brampton", time: "5 days, 8 hours", initials: "J" },
];

const RecentlySubmittedClients = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const showModal = (client: Client) => {
    setSelectedClient(client);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedClient(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recently Submitted Clients</h2>
        <a href="#" className="text-blue-500 text-sm">View All &gt;</a>
      </div>
      <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-72">
        {clients.map((client, index) => (
          <div key={index} className="flex items-center gap-4">
            {client.avatar ? (
              <div className={`w-12 h-12 rounded-full flex items-center justify-center`} style={{ backgroundColor: client.avatar }}></div>
            ) : (
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-900 text-white text-lg font-bold">
                {client.initials}
              </div>
            )}
            <div>
              <p className="text-md font-medium">{client.name}
                <button className="ml-1 text-gray-500" onClick={() => showModal(client)}>ℹ</button>
              </p>
              <p className="text-xs text-gray-500">{client.location}</p>
              <p className="text-xs text-gray-400">{client.time}</p>
            </div>
          </div>
        ))}
      </div>

      <Modal title="Client Information" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        {selectedClient && (
          <div>
            <p><strong>Name:</strong> {selectedClient.name}</p>
            <p><strong>Location:</strong> {selectedClient.location}</p>
            <p><strong>Submitted:</strong> {selectedClient.time}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RecentlySubmittedClients;
