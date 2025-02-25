import { Collapse, Select, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ICustomer } from "./clientTypes";
import { useState } from "react";

const { Panel } = Collapse;

interface MembershipFormProps {
    formData: ICustomer;
    setFormData: (data: ICustomer) => void;
}

const Form = ({ formData, setFormData }: MembershipFormProps) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleChange = (field: keyof ICustomer, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleUpload = (info: any) => {
        const reader = new FileReader();
        reader.onload = (e) => setImageUrl(e.target?.result as string);
        reader.readAsDataURL(info.file);
    };

    return (
        <Collapse className="mt-4 border border-gray-200 rounded-md" expandIconPosition="right" defaultActiveKey={["1"]}>
            <Panel header="Membership Information" key="1">
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "Profile Note", value: "12-FEB-2025 : Match Shared only" },
                        { label: "Membership Type", options: ["Active Client", "Premium", "VIP"] },
                        { label: "Profile Made By", options: ["Self", "Parents", "Relative"] },
                        { label: "Registered On Date", options: ["12-FEB-2025", "15-MAR-2025", "20-APR-2025"] },
                        { label: "Special Notes About Profile", options: ["None", "Important", "Urgent"] },
                        { label: "Customer Service (Matchmaker)", options: ["Assigned", "Unassigned"] },
                        { label: "Registered By", options: ["Admin", "User", "Agent"] },
                        { label: "Amount & Currency", options: ["$100", "$500", "$1000"] },
                        { label: "Appearance", options: ["Hair-Cut", "Gursikh", "Clean Shaven"] },
                        { label: "Verified file", isFileUpload: true },
                    ].map((item, index) => (
                        <div key={index} className="flex">
                            <div className="w-1/2 px-4 py-2 text-gray-500">{item.label}</div>
                            <div className="w-1/2 px-4 py-2">
                                {item.options ? (
                                    <Select
                                        className="text-blue-500 w-full"
                                        defaultValue="Click to add"
                                        options={item.options.map((option) => ({ label: option, value: option }))}
                                        onChange={(value) => handleChange(item.label as keyof ICustomer, value)}
                                    />
                                ) : item.isFileUpload ? (
                                    <Upload
                                        showUploadList={false}
                                        beforeUpload={() => false} // Prevent auto-upload
                                        onChange={handleUpload}
                                        accept="image/*"
                                    >
                                        <Button icon={<UploadOutlined />}>Upload File</Button>
                                    </Upload>
                                ) : (
                                    <Input className="w-full" defaultValue={item.value} onChange={(e) => handleChange(item.label as keyof ICustomer, e.target.value)} />
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Image Preview */}
                    {imageUrl && (
                        <div className="col-span-2 flex justify-center mt-4">
                            <img src={imageUrl} alt="Uploaded" className="w-32 h-32 object-cover rounded-lg border" />
                        </div>
                    )}
                </div>
            </Panel>
            {/* Basic Information Panel */}
            <Panel header="Basic Information" key="2">
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "Gender", options: ["Male", "Female"] },
                        { label: "Religion", options: ["Sikh", "Hindu", "Jain"] },
                        { label: "Sub Caste", options: ["Jatt", "Arora", "Khatri"] },
                        { label: "Birthday(Age)", value: "28 Jan 1996 (29 years)" },
                        { label: "Time Of Birth", value: "Add" },
                        { label: "Marital Status", options: ["Divorced", "Never Married", "Widowed"] },
                        { label: "More about Marital status", value: "Got Married 2018 & legal Divorced 2019 (Living Together 1 Month)" },
                        { label: "Vegetarian", options: ["Yes", "No"] },
                        { label: "Do you Drink Alcohol?", options: ["Yes", "No"] },
                        { label: "Do you smoke?", options: ["Yes", "No"] },
                        { label: "Phone Number", value: "123456789" },
                        { label: "User code", value: "+61" },
                    ].map((item, index) => (
                        <div key={index} className="flex">
                            <div className="w-1/2 px-4 py-2 text-gray-500">{item.label}</div>
                            <div className="w-1/2 px-4 py-2">
                                {item.options ? (
                                    <Select
                                        className="text-blue-500 w-full"
                                        defaultValue="Click to add"
                                        options={item.options.map((option) => ({ label: option, value: option }))}
                                        onChange={(value) => handleChange(item.label as keyof ICustomer, value)}
                                    />
                                ) : (
                                    <Input className="w-full" defaultValue={item.value} onChange={(e) => handleChange(item.label as keyof ICustomer, e.target.value)} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Panel>

        </Collapse>
    );
};

export default Form;
