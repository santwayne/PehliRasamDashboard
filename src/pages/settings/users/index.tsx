import React, { useEffect, useState } from "react";
import { Table, Button, Tag, Modal, Form, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import apiClient from "../../../config/apiClient"; // Import API Client

interface User {
    key: string;
    name: string;
    email: string;
    password: string;
    status: string;
    lastLogin: string;
}

const UserManagement: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [form] = Form.useForm();

    // Fetch Users (Assuming an endpoint exists)
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await apiClient.get("/admin/list"); // Adjust endpoint as needed
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            message.error("Failed to fetch users");
        }
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            const newUser = {
                fistName: values.firstName, // Fix spelling if necessary
                lastName: values.lastName,
                email: values.email,
                password: values.password, // If empty, backend will set default
            };

            // Send request to backend
            const response = await apiClient.post("/admin/adminCreation", newUser);

            message.success("Admin created successfully!");

            setIsModalVisible(false);
            form.resetFields();

            // Refresh users list
            fetchUsers();
        } catch (error: any) {
            console.error("Error creating admin:", error.response?.data || error);
            message.error(error.response?.data?.error || "Failed to create admin");
        }
    };

    const columns = [
        { title: "Name", dataIndex: "name" },
        { title: "Email", dataIndex: "email" },
        { title: "Status", dataIndex: "status", render: (status: string) => <Tag color="blue">{status}</Tag> },
        { title: "Last Login", dataIndex: "lastLogin" },
    ];

    return (
        <div style={{ padding: 20, background: "#fff", borderRadius: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <h2>Users</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                    New Admin
                </Button>
            </div>

            <Table columns={columns} dataSource={users} pagination={false} />

            {/* New Admin Modal */}
            <Modal title="Add New Admin" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={handleOk}>
                <Form form={form} layout="vertical">
                    <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "Enter first name" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Enter last name" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Enter valid email" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input.Password placeholder="Leave empty for default (123456789)" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserManagement;
