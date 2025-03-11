import React, { useEffect, useState } from "react";
import { Table, Switch, message, Spin } from "antd";
import apiClient from "../../config/apiClient"; // Adjust path if needed

const NotificationSettingsTab: React.FC = () => {
  const [notificationSettings, setNotificationSettings] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  // Fetch user ID from localStorage
  const storedData = JSON.parse(localStorage.getItem("admin") || "{}");
  const userId: string | undefined = storedData.id;

  useEffect(() => {
    if (!userId) {
      message.error("User ID is missing. Please log in again.");
      return;
    }
    fetchNotificationSettings();
  }, [userId]);

  // Fetch current notification settings
  const fetchNotificationSettings = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/admin/getAdminNotification/${userId}`);
      setNotificationSettings(response.data.notification || {});
    } catch (error) {
      message.error("Failed to load notification settings.");
    } finally {
      setLoading(false);
    }
  };

  // Handle notification toggle
  const handleToggle = async (key: string, value: boolean) => {
    try {
      setLoading(true);
      const updatedSettings = { ...notificationSettings, [key]: value };

      await apiClient.put("/admin/updateAdminNotification", {
        userId,
        notification: updatedSettings,
      });

      setNotificationSettings(updatedSettings);

      // Update localStorage
      const storedData = JSON.parse(localStorage.getItem("admin") || "{}");
      storedData.notification = updatedSettings;
      localStorage.setItem("admin", JSON.stringify(storedData));

      message.success("Notification settings updated successfully.");
    } catch (error) {
      message.error("Failed to update notification settings.");
    } finally {
      setLoading(false);
    }
  };

  // Table columns
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      className: "font-medium text-gray-700",
    },
    {
      title: "Delivery by",
      dataIndex: "key",
      key: "delivery",
      render: (key: string) => (
        <Switch
          checked={notificationSettings[key] || false}
          onChange={(checked) => handleToggle(key, checked)}
        />
      ),
    },
  ];

  // Notification options
  const data = [
    { key: "birthdayReminder", type: "Birthday Reminder" },
    { key: "newSubmittedClient", type: "New Submitted Client" },
    { key: "reminder", type: "Reminder" },
    { key: "incomingTextMessage", type: "Incoming Text Message" },
    { key: "systemMessage", type: "System Message" },
    { key: "systemError", type: "System Error" },
    { key: "newTaskAssigned", type: "New Task Assigned" },
    { key: "clientProfileUpdate", type: "Client Profile Update" },
    { key: "mentions", type: "Mentions" },
  ];

  return (
    <Spin spinning={loading}>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Notification Settings</h2>
        <Table columns={columns} dataSource={data} pagination={false} rowKey="key" bordered />
      </div>
    </Spin>
  );
};

export default NotificationSettingsTab;
