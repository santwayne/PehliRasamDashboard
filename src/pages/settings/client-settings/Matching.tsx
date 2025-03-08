import React, { useState } from "react";
import { Table, Button, Switch, Modal, Form, Input, Select, Collapse } from "antd";
import { PlusOutlined, MoreOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const Matching: React.FC = () => {
    const [isFieldModalOpen, setIsFieldModalOpen] = useState(false);
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
    const [form] = Form.useForm();

    const matchPreferences = [
        { key: "1", label: "More about Partner Preference", profileField: "Long Text", weight: "Medium", choices: "", dealBreak: true },
        { key: "2", label: "Preferred Gender", profileField: "Gender", weight: "High", choices: "", dealBreak: true },
        { key: "3", label: "Preferred Age Range", profileField: "Birthday (Age)", weight: "Low", choices: "", dealBreak: false },
        { key: "4", label: "Preferred Religion", profileField: "Religion", weight: "High", choices: "", dealBreak: true },
    ];

    const matchGroups = [
        { key: "1", group: "Successful Matches" },
        { key: "2", group: "Active Introductions" },
        { key: "3", group: "Potential Introductions" },
        { key: "4", group: "Past Introductions" },
    ];

    const columns = [
        { title: "Label", dataIndex: "label", key: "label" },
        { title: "Profile Field", dataIndex: "profileField", key: "profileField" },
        { title: "Weight", dataIndex: "weight", key: "weight" },
        { title: "Use In Match", dataIndex: "useInMatch", key: "useInMatch", render: () => <Switch /> },
        { title: "Choices", dataIndex: "choices", key: "choices", render: (text: string) => text || "Add" },
        { title: "Deal Break", dataIndex: "dealBreak", key: "dealBreak", render: (value: boolean) => <Switch checked={value} /> },
        { title: "", key: "actions", render: () => <MoreOutlined /> },
    ];

    const groupColumns = [
        { title: "Match Groups", dataIndex: "group", key: "group" },
        { title: "Lists", key: "lists", render: () => <Button type="link">Add</Button> },
        { title: "", key: "actions", render: () => <MoreOutlined /> },
    ];

    const handleFieldSubmit = () => {
        form.validateFields().then(() => {
            setIsFieldModalOpen(false);
            form.resetFields();
        });
    };

    const handleGroupSubmit = () => {
        form.validateFields().then(() => {
            setIsGroupModalOpen(false);
            form.resetFields();
        });
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <Collapse defaultActiveKey={["1"]} expandIconPosition="left">
                <Panel header="Preferences Fields" key="1">
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold">Match Preferences</h2>
                            <Button icon={<PlusOutlined />} onClick={() => setIsFieldModalOpen(true)}>+ Field</Button>
                        </div>
                        <Table columns={columns} dataSource={matchPreferences} pagination={false} />
                    </div>
                </Panel>
            </Collapse>

            {/* Match Groups */}
            <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold">Match Groups</h2>
                    <Button icon={<PlusOutlined />} onClick={() => setIsGroupModalOpen(true)}>+ Match Group</Button>
                </div>
                <Table columns={groupColumns} dataSource={matchGroups} pagination={false} />
            </div>

            {/* Add/Edit Field Modal */}
            <Modal title="Add Field" open={isFieldModalOpen} onCancel={() => setIsFieldModalOpen(false)} onOk={handleFieldSubmit}>
                <Form form={form} layout="vertical">
                    <Form.Item label="Field Name" name="fieldName" rules={[{ required: true, message: "Field name is required" }]}>
                        <Input placeholder="Enter field name" />
                    </Form.Item>
                    <Form.Item label="Profile Field Type" name="profileField" rules={[{ required: true }]}>
                        <Select placeholder="Select field type">
                            <Select.Option value="Short Text">Short Text</Select.Option>
                            <Select.Option value="Long Text">Long Text</Select.Option>
                            <Select.Option value="Select">Select</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Add/Edit Group Modal */}
            <Modal title="Add Match Group" open={isGroupModalOpen} onCancel={() => setIsGroupModalOpen(false)} onOk={handleGroupSubmit}>
                <Form form={form} layout="vertical">
                    <Form.Item label="Group Name" name="groupName" rules={[{ required: true, message: "Group name is required" }]}>
                        <Input placeholder="Enter group name" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Matching;
