import React, { useEffect, useState } from "react";
import { Table, Button, Tag, Modal, Form, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

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

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        setUsers(storedUsers);
    }, []);

    const handleOk = () => {
        form.validateFields().then((values) => {
            const newUser: User = {
                key: (users.length + 1).toString(),
                name: values.name,
                email: values.email,
                password: values.password,
                status: "Active",
                lastLogin: "Never",
            };
            const updatedUsers = [...users, newUser];
            setUsers(updatedUsers);
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            form.resetFields();
            setIsModalVisible(false);
            message.success("User added successfully!");
        });
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
                    New User
                </Button>
            </div>

            <Table columns={columns} dataSource={users} pagination={false} />

            {/* New User Modal */}
            <Modal title="Add New User" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={handleOk}>
                <Form form={form} layout="vertical">
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: "Enter name" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Enter valid email" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: "Enter password" }]}>
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserManagement;
