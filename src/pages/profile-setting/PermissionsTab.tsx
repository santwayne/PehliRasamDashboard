import React, { useState, useEffect } from "react";
import { Card, Table, Switch, Button, message, Spin } from "antd";
import apiClient from "../../config/apiClient"; // Adjust path if needed

interface NotificationSettings {
  [key: string]: boolean;
}

const NotificationSettingsTab: React.FC = () => {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("admin") || "{}");
    if (storedData.notification) {
      setNotificationSettings(storedData.notification);
    }
  }, []);

  const handleToggle = (key: string) => {
    setNotificationSettings((prev) => {
      const updatedSettings = { ...prev, [key]: !prev[key] };

      // Save to localStorage
      const storedData = JSON.parse(localStorage.getItem("admin") || "{}");
      storedData.notification = updatedSettings;
      localStorage.setItem("admin", JSON.stringify(storedData));

      return updatedSettings;
    });
  };

  const handleUpdateNotifications = async () => {
    setLoading(true);
    try {
      const storedData = JSON.parse(localStorage.getItem("admin") || "{}");
      const userId: string | undefined = storedData.id;

      if (!userId) {
        message.error("User ID is missing. Please log in again.");
        return;
      }

      const payload = { userId, notification: notificationSettings };
      const response = await apiClient.post("/admin/updateAdminNotification", payload);
      message.success(response.data.message || "Notification settings updated successfully");
    } catch (error: unknown) {
      message.error(error instanceof Error ? error.message : "Failed to update notifications");
    } finally {
      setLoading(false);
    }
  };

  const data = Object.keys(notificationSettings).map((key) => ({
    key,
    type: key.replace(/([A-Z])/g, " $1").trim(), // Format key to readable text
    switch: (
      <Switch key={key} checked={Boolean(notificationSettings[key])} onChange={() => handleToggle(key)} />
    ),
  }));

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string) => <span className="font-semibold">{text}</span>,
    },
    {
      title: "Enabled",
      dataIndex: "switch",
      key: "switch",
    },
  ];

  return (
    <Spin spinning={loading}>
      <div className="p-6">
        <Card title="Notification Settings" className="mb-4">
          <Table columns={columns} dataSource={data} pagination={false} bordered />
        </Card>
        <Button type="primary" className="mt-4" onClick={handleUpdateNotifications}>
          Save Changes
        </Button>
      </div>
    </Spin>
  );
};

export default NotificationSettingsTab;
