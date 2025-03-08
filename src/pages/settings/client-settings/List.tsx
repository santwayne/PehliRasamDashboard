import { Table, Button, Modal, Form, Input } from "antd";
import { PlusOutlined, MoreOutlined, MenuOutlined } from "@ant-design/icons";
import { useState } from "react";

interface ListItem {
    key: string;
    name: string;
    color: string;
}

const List = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const data: ListItem[] = [
        { key: "1", name: "manish", color: "#464C51" },
        { key: "2", name: "POTENTIAL MEMBER", color: "#EC34D6" },
        { key: "3", name: "Paid Member", color: "#26E911" },
        { key: "4", name: "Free Member", color: "#E6E60C" },
        { key: "5", name: "New Lead", color: "#E69708" },
        { key: "6", name: "Sale Profile", color: "#428BCA" },
        { key: "7", name: "Australia", color: "#9C46DB" },
        { key: "8", name: "Import Paid Client", color: "#0000FF" },
    ];

    const columns = [
        {
            title: "List name",
            dataIndex: "name",
            key: "name",
            render: (text: string) => (
                <div className="flex items-center">
                    <MenuOutlined className="mr-2 text-gray-400 cursor-pointer" />
                    {text}
                </div>
            ),
        },
        {
            title: "Color",
            dataIndex: "color",
            key: "color",
            render: (color: string) => (
                <div className="flex items-center">
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></span>
                    <span className="ml-2">{color}</span>
                </div>
            ),
        },
        {
            render: () => <MoreOutlined className="cursor-pointer text-gray-500" />,
        },
    ];

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);
    const handleOk = () => {
        form.validateFields().then(() => {
            setIsModalOpen(false);
            form.resetFields();
        });
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-xl font-semibold">Client Lists</h2>
                    <p className="text-gray-500 text-sm">
                        Use lists to divide clients by different groups. A client can be added to multiple lists.
                    </p>
                </div>
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                    List
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                className="shadow-sm rounded-md"
            />

            <Modal title="Add New List" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item label="List Name" name="name" rules={[{ required: true, message: "Please enter a list name" }]}>
                        <Input placeholder="Enter list name" />
                    </Form.Item>
                    <Form.Item label="Color Code" name="color" rules={[{ required: true, message: "Please enter a color code" }]}>
                        <Input placeholder="Enter color code (e.g., #428BCA)" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default List;
