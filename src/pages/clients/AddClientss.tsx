import { Mail, Phone, MapPin, Camera } from "lucide-react";
import { Collapse, Select, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Panel } = Collapse;

const AddClient = () => {

    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleUpload = (info: any) => {
        if (info.file.status === "done") {
            const fileUrl = URL.createObjectURL(info.file.originFileObj);
            setImageUrl(fileUrl);
        }
    };

    const handleSave = () => {
        console.log("Saving all form data...");
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Left Sidebar */}
            <div className="w-1/5 bg-white shadow-md p-4 flex flex-col items-center fixed h-screen">
                {/* Profile Image */}
                <div className="relative w-32 h-32 bg-yellow-500 rounded-md flex items-center justify-center">
                    <Camera className="absolute bottom-2 right-2 bg-white p-1 rounded-full cursor-pointer" size={24} />
                </div>
                <h2 className="text-lg font-semibold mt-3">Lorence Chheena</h2>
                <p className="text-gray-500 text-sm">Middle Name Last Name</p>
                <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded mt-3">Actions ▼</button>
                {/* Contact Info */}
                <div className="mt-4 space-y-2 w-full text-gray-600">
                    <div className="flex items-center space-x-2">
                        <Mail size={18} /> <span className="text-sm">lorencechheena1234@gmail.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Phone size={18} /> <span className="text-sm">+1 123-456-7890</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <MapPin size={18} /> <span className="text-sm">Brampton, ON, Canada</span>
                    </div>
                </div>
                <button className="bg-blue-500 text-white px-4 py-1 rounded mt-4">Set Location</button>
            </div>

            {/* Right Content */}
            <div className="pl-[27%] flex-1 overflow-y-auto">
                {/* Professional Header */}
                <div className="sticky top-0 bg-white shadow-md py-6 px-6 flex flex-col justify-between items-center z-10 border-b border-gray-200">
                    {/* Top Row */}
                    <div className="flex gap-6 text-gray-700 font-semibold">
                        {["Timeline", "Profile", "Matching", "Photos", "Events"].map((tab, index) => (
                            <div key={index} className="cursor-pointer hover:text-blue-600 transition">
                                {tab}
                            </div>
                        ))}
                    </div>

                    {/* Bottom Row */}
                    <div className="flex gap-6 text-gray-700 font-semibold mt-4">
                        {["Communication", "Videos", "Finances", "Files", "Reminders", "Tasks", "Surveys", "Notes"].map((tab, index) => (
                            <div key={index} className="cursor-pointer hover:text-blue-600 transition">
                                {tab}
                            </div>
                        ))}
                    </div>
                </div>


                {/* Right Side Content */}
                <div className="pl-[0%] flex-1 bg-gray-100 h-screen p-6">
                    <div className="bg-white p-6 shadow-md rounded-md flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Profile</h2>
                        <Button type="primary" onClick={handleSave}>Save</Button>
                    </div>


                    {/* Accordion Section */}
                    <Collapse
                        className="mt-4 border border-gray-200 rounded-md"
                        expandIconPosition="right"
                        defaultActiveKey={["1"]}
                    >

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
                                                <Input className="w-full" defaultValue={item.value} />
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
                                                />
                                            ) : (
                                                <Input className="w-full" defaultValue={item.value} />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Panel>

                        {/* Education & Profession Panel */}
                        <Panel header="Education & Profession" key="3">
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Name of High School", value: "High School ( India )" },
                                    { label: "Education", value: "Bachelor of Commerce.Masters in Accounting.Diploma in Financial Services." },
                                    { label: "Employment", value: "Private Sector" },
                                    { label: "Income", value: "123456" },
                                    { label: "Profession", value: "Staff" }
                                ].map((item, index) => (
                                    <div key={index} className="flex">
                                        <div className="w-1/2 px-4 py-2 text-gray-500">{item.label}</div>
                                        <div className="w-1/2 px-4 py-2">
                                            <Input className="w-full" defaultValue={item.value} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Panel>

                        {/* Family Details Panel */}
                        <Panel header="Family Details" key="4">
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Family Affluence Level", value: "Mr. John" },
                                    { label: "Father's Employment", value: "Retired (Govt Teacher)" },
                                    { label: "Mother's Employment", value: "Retired" },
                                    { label: "Father's Name", value: "John" },
                                    { label: "Mother's Name", value: "Liza" },
                                    { label: "Other Family Details", value: "1 Elder Brother & 1 Sister Both are Married (Australia) Family Belongs to Amritsar, Punjab, India." },
                                ].map((item, index) => (
                                    <div key={index} className="flex">
                                        <div className="w-1/2 px-4 py-2 text-gray-500">{item.label}</div>
                                        <div className="w-1/2 px-4 py-2">
                                            <Input className="w-full" defaultValue={item.value} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Panel>

                        {/* Location Details Panel */}
                        <Panel header="Location Details" key="5">
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Residency Status", value: "Work Permit" },
                                    { label: "Living in Since (year)", value: "Birthplace India, Living in Australia, Migrated to Australia 2018" },
                                    { label: "Country Living", value: "Australia" },
                                    { label: "Country Grew Up In", value: "India" },
                                ].map((item, index) => (
                                    <div key={index} className="flex">
                                        <div className="w-1/2 px-4 py-2 text-gray-500">{item.label}</div>
                                        <div className="w-1/2 px-4 py-2">
                                            <Input className="w-full" defaultValue={item.value} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Panel>

                        {/* About Me Panel */}
                        <Panel header="About Me" key="6">
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Property Details", value: "ABC" },
                                    { label: "Image", value: "Upload" },
                                ].map((item, index) => (
                                    <div key={index} className="flex">
                                        <div className="w-1/2 px-4 py-2 text-gray-500">{item.label}</div>
                                        <div className="w-1/2 px-4 py-2">
                                            {item.label === "Image" ? (
                                                <Upload
                                                    showUploadList={false}
                                                    beforeUpload={() => false} // Prevent auto upload
                                                    onChange={handleUpload}
                                                    accept="image/*"
                                                >
                                                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                                                </Upload>
                                            ) : (
                                                <Input className="w-full" defaultValue={item.value} />
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
                    </Collapse>
                </div>
            </div>
        </div>
    );
};

export default AddClient;
