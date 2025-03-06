import { Collapse, Input, Button, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCustomerProfile } from "./Actions";

const { Panel } = Collapse;

interface IField {
    fieldId: string;
    fieldName: string;
    value: string;
}

interface IGroup {
    groupId: string;
    groupName: string;
    fields: IField[];
}

interface ICustomerProfile {
    dynamicFields: IGroup[];
}

const Form = () => {
    const { setValue, handleSubmit } = useForm(); // Removed 'register' since it's unused
    const [formData, setFormData] = useState<ICustomerProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const customerId = "your-customer-id"; // ✅ Replace this with actual customerId (from context, props, or state)

    useEffect(() => {
        if (!customerId) {
            message.error("Customer ID is required.");
            return;
        }
    
        setLoading(true);
        getCustomerProfile(customerId)
            .then((data) => {
                if (data) {
                    setFormData(data);
                    data.dynamicFields.forEach((group: IGroup) => {
                        group.fields.forEach((field) => {
                            setValue(field.fieldId, field.value);
                        });
                    });
                }
            })
            .catch((error) => {
                console.error("API Error:", error);
                message.error("Failed to fetch customer details. Please try again.");
            })
            .finally(() => setLoading(false));
    }, [setValue, customerId]);
    

    const handleFieldChange = (groupId: string, fieldId: string, value: string) => {
        setFormData((prevData) => {
            if (!prevData) return null;
            return {
                ...prevData,
                dynamicFields: prevData.dynamicFields.map((group) =>
                    group.groupId === groupId
                        ? {
                              ...group,
                              fields: group.fields.map((field) =>
                                  field.fieldId === fieldId ? { ...field, value } : field
                              ),
                          }
                        : group
                ),
            };
        });
    };

    const onSubmit = async () => {
        setLoading(true);
        console.log("Form submitted");
        setLoading(false);
    };

    if (loading) return <Spin size="large" className="flex justify-center mt-10" />;
    if (!formData) return <div>No data found</div>;

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Customer Profile</h2>
                <Button type="primary" onClick={handleSubmit(onSubmit)} loading={loading}>
                    Save
                </Button>
            </div>

            <Collapse className="border border-gray-200 rounded-md" expandIconPosition="right" defaultActiveKey={["1"]}>
                {formData.dynamicFields.map((group, index) => (
                    <Panel header={group.groupName} key={group.groupId || index}>
                        {group.fields.map((field) => (
                            <div key={field.fieldId} className="flex mb-3">
                                <label className="w-1/3 text-gray-600">{field.fieldName}</label>
                                <Input
                                    className="w-2/3"
                                    value={field.value}
                                    onChange={(e) => handleFieldChange(group.groupId, field.fieldId, e.target.value)}
                                />
                            </div>
                        ))}
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default Form;
