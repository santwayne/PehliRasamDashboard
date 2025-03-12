import { Modal, Form, Input, Select, Button, message, Switch } from "antd";
import { useEffect, useState } from "react";
import apiClient from "../../../../config/apiClient";

const { Option } = Select;

interface Field {
    _id: string;
    attributeName: string;
    attributeType: string;
    attributePlaceHolder?: string;
    attributeState: boolean;
    attributeOption?: string[];
    attributeEnum?: string; // Added for database purpose
    form_group_id: string;
}

interface Group {
    _id: string;
    name: string;
}

interface FieldModalProps {
    visible: boolean;
    onClose: () => void;
    editingField: Field | null;
}

const FieldModal: React.FC<FieldModalProps> = ({ visible, onClose, editingField }) => {
    const [form] = Form.useForm();
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedType, setSelectedType] = useState<string | undefined>("");

    useEffect(() => {
        if (visible) {
            fetchGroups();
            if (editingField) {
                setSelectedType(editingField.attributeType);
                form.setFieldsValue({
                    attributeName: editingField.attributeName,
                    attributeType: editingField.attributeType,
                    attributePlaceHolder: editingField.attributePlaceHolder || "",
                    attributeState: editingField.attributeState ?? false,
                    attributeOption: editingField.attributeOption?.join(", ") || "",
                    attributeEnum: editingField.attributeEnum || "",
                    form_group_id: editingField.form_group_id,
                });
            } else {
                form.resetFields();
                setSelectedType("");
            }
        }
    }, [visible, editingField, form]);

    const fetchGroups = async () => {
        try {
            const response = await apiClient.get("/admin/allFromGroupList");
            setGroups(response.data.formGroup || []);
        } catch (error) {
            message.error("Failed to fetch groups.");
        }
    };

    const handleFinish = async (values: any) => {
        try {
            setLoading(true);
            const payload = {
                attributeName: values.attributeName,
                attributeType: values.attributeType,
                attributePlaceHolder: values.attributePlaceHolder,
                attributeOption: values.attributeOption
                    ? values.attributeOption.split(",").map((item: string) => item.trim())
                    : [],
                attributeEnum: values.attributeEnum,
                attributeState: values.attributeState,
                form_group_id: values.form_group_id,
            };

            if (editingField) {
                await apiClient.post("/admin/updateFromField", { fieldId: editingField._id, ...payload });
                message.success("Field updated successfully!");
            } else {
                await apiClient.post("/admin/createFromField", payload);
                message.success("Field created successfully!");
            }
            onClose();
        } catch (error) {
            message.error(error.response?.data?.error || "Failed to process request.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title={editingField ? "Edit Field" : "Create Field"} open={visible} onCancel={onClose} footer={null}>
            <Form form={form} onFinish={handleFinish} layout="vertical">
                <Form.Item name="form_group_id" label="Group" rules={[{ required: true, message: "Please select a group" }]}>
                    <Select placeholder="Select a group" disabled={!!editingField} loading={groups.length === 0}>
                        {groups.length > 0 ? (
                            groups.map((group) => (
                                <Option key={group._id} value={group._id}>{group.name}</Option>
                            ))
                        ) : (
                            <Option disabled value="">No Groups Available</Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item name="attributeName" label="Field Name" rules={[{ required: true, message: "Please enter a field name" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="attributeType" label="Field Type" rules={[{ required: true, message: "Please select a field type" }]}>
                    <Select onChange={(value) => setSelectedType(value)}>
                        <Option value="text">Text</Option>
                        <Option value="number">Number</Option>
                        <Option value="date">Date</Option>
                        <Option value="select">Select</Option>
                        <Option value="radio">Radio</Option>
                        <Option value="checkbox">Checkbox</Option>
                        <Option value="heading">Heading</Option>
                    </Select>
                </Form.Item>
                
                {/* Hide placeholder for 'heading' type */}
                {selectedType !== "heading" && (
                    <Form.Item name="attributePlaceHolder" label="Placeholder">
                        <Input placeholder="Enter placeholder text" />
                    </Form.Item>
                )}

                <Form.Item name="attributeState" label="Status" valuePropName="checked">
                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                </Form.Item>

                {/* Show options only for 'select', 'radio', or 'checkbox' */}
                {(selectedType === "select" || selectedType === "radio" || selectedType === "checkbox") && (
                    <Form.Item name="attributeOption" label="Options (comma-separated)">
                        <Input placeholder="Enter options separated by commas" />
                    </Form.Item>
                )}

                {/* Attribute Enum for Database Purpose */}
                <Form.Item name="attributeEnum" label="Enum (for Database)">
                    <Input placeholder="Enter enum values" />
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={loading} style={{ marginTop: "10px" }}>
                    {editingField ? "Update" : "Create"}
                </Button>
            </Form>
        </Modal>
    );
};

export default FieldModal;
