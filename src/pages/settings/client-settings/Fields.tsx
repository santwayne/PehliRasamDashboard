import { useState, useEffect } from "react";
import {
    Table, Button, Collapse, Space, Typography, Modal, Input, Select, Form, Switch, message
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import apiClient from "../../../config/apiClient";

const { Panel } = Collapse;
const { Option } = Select;

type FormField = {
    _id: string;
    attributeName: string;
    attributeType: string;
    attributeState: boolean;
    attributePlaceHolder: string;
    attributeEnum?: string[];
    attributeOption?: { label: string; value: string }[];
};

type FormGroup = {
    _id: string;
    name: string;
    formFields?: FormField[];
};

const Fields = () => {
    const [loading, setLoading] = useState(false);
    const [isGroupModalVisible, setGroupModalVisible] = useState(false);
    const [isFieldModalVisible, setFieldModalVisible] = useState(false);
    const [newGroup, setNewGroup] = useState("");
    const [newField, setNewField] = useState({
        name: "",
        kind: "",
        group: "",
        status: true,
        placeholder: "",
        enumValues: "",
        options: ""
    });
    const [groups, setGroups] = useState<FormGroup[]>([]);
    const [fields, setFields] = useState<Record<string, FormField[]>>({});

    useEffect(() => {
        fetchGroupsAndFields();
    }, []);

    const fetchGroupsAndFields = async () => {
        setLoading(true);
        try {
            const { data } = await apiClient.get<FormGroup[]>("/admin/getFromGroupList");
            setGroups(data);
            const mappedFields: Record<string, FormField[]> = {};
            data.forEach((group: FormGroup) => {
                mappedFields[group.name] = group.formFields || [];
            });
            setFields(mappedFields);
        } catch (error) {
            message.error("Failed to fetch form groups.");
        }
        setLoading(false);
    };
    const handleAddGroup = async () => {
        if (!newGroup.trim()) {
            message.error("Group name cannot be empty!");
            return;
        }
        try {
            const { data } = await apiClient.post("/admin/createFromGroup", { name: newGroup });
            setGroups([...groups, data]);
            setFields({ ...fields, [data.name]: [] });
            setNewGroup("");
            message.success("Group added successfully!");
            setGroupModalVisible(false);
        } catch (error) {
            message.error("Failed to add group.");
        }
    };

    const handleAddField = async () => {
        if (!newField.name || !newField.kind || !newField.group) {
            message.error("All field details must be filled!");
            return;
        }

        const selectedGroup = groups.find(group => group.name === newField.group);
        if (!selectedGroup) {
            message.error("Selected group not found.");
            return;
        }

        try {
            const { data } = await apiClient.post<FormField>("/admin/createFromField", {
                attributeName: newField.name,
                attributeType: newField.kind,
                attributeState: newField.status,
                attributePlaceHolder: newField.placeholder,
                attributeEnum: newField.enumValues ? newField.enumValues.split(",") : [],
                attributeOption: newField.options
                    ? newField.options.split(",").map(opt => ({ label: opt, value: opt }))
                    : [],
                form_group_id: selectedGroup._id,
            });

            setFields(prev => ({
                ...prev,
                [newField.group]: [...(prev[newField.group] || []), data],
            }));

            setNewField({ name: "", kind: "", group: "", status: true, placeholder: "", enumValues: "", options: "" });
            message.success("Field added successfully!");
            setFieldModalVisible(false);
        } catch (error) {
            message.error("Failed to add field.");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <Space style={{ width: "100%", justifyContent: "space-between", marginBottom: 16 }}>
                <Typography.Title level={4}>Client Fields</Typography.Title>
                <Space>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setFieldModalVisible(true)}>Field</Button>
                    <Button icon={<PlusOutlined />} onClick={() => setGroupModalVisible(true)}>Group</Button>
                </Space>
            </Space>

            <Collapse accordion>
                {groups.map(group => (
                    <Panel header={group.name} key={group._id}>
                        <Table
                            columns={[
                                { title: "Label", dataIndex: "attributeName", key: "attributeName" },
                                { title: "Type", dataIndex: "attributeType", key: "attributeType" },
                                { title: "Placeholder", dataIndex: "attributePlaceHolder", key: "attributePlaceHolder" },
                                { title: "Status", dataIndex: "attributeState", key: "attributeState", render: (status: boolean) => (status ? "Active" : "Deactive") },
                            ]}
                            dataSource={fields[group.name]}
                            pagination={false}
                            rowKey="_id"
                        />
                    </Panel>
                ))}
            </Collapse>

            <Modal title="Create Group" visible={isGroupModalVisible} onCancel={() => setGroupModalVisible(false)} onOk={handleAddGroup}>
                <Form layout="vertical">
                    <Form.Item label="Group Name">
                        <Input value={newGroup} onChange={(e) => setNewGroup(e.target.value)} placeholder="Enter group name" />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Create Field" visible={isFieldModalVisible} onCancel={() => setFieldModalVisible(false)} onOk={handleAddField}>
                <Form layout="vertical">
                    <Form.Item label="Field Name">
                        <Input value={newField.name} onChange={(e) => setNewField({ ...newField, name: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Kind">
                        <Select value={newField.kind} onChange={(value) => setNewField({ ...newField, kind: value })}>
                            <Option value="text">Text</Option>
                            <Option value="select">Select</Option>
                            <Option value="number">Number</Option>
                            <Option value="date">Date</Option>
                            <Option value="radio">Radio</Option>
                            <Option value="checkbox">Checkbox</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Group">
                        <Select value={newField.group} onChange={(value) => setNewField({ ...newField, group: value })}>
                            {groups.map(group => <Option key={group._id} value={group.name}>{group.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Placeholder">
                        <Input value={newField.placeholder} onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Status">
                        <Switch checked={newField.status} onChange={(checked) => setNewField({ ...newField, status: checked })} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Fields;



