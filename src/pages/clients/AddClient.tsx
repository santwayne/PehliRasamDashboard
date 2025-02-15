import { Mail, Phone, MapPin, Camera } from "lucide-react";
import { Collapse, Select } from "antd";

const { Panel } = Collapse;

const AddClient = () => {
    return (
        <div className="flex h-screen">
            {/* Left Fixed Sidebar (Scrollable) */}
            <div className="w-1/5 bg-white shadow-md p-4 flex flex-col items-center fixed h-screen">
                {/* Profile Image */}
                <div className="relative w-32 h-32 bg-yellow-500 rounded-md flex items-center justify-center">
                    <Camera className="absolute bottom-2 right-2 bg-white p-1 rounded-full cursor-pointer" size={24} />
                </div>

                {/* User Info */}
                <h2 className="text-lg font-semibold mt-3">Lorence Chheena</h2>
                <p className="text-gray-500 text-sm">Middle Name Last Name</p>

                {/* Actions Button */}
                <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded mt-3">Actions ▼</button>

                {/* Contact Info */}
                <div className="mt-4 space-y-2 w-full">
                    <div className="flex items-center space-x-2 text-gray-600">
                        <Mail size={18} />
                        <span className="text-sm">lorencechheena1234@gmail.com</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                        <Phone size={18} />
                        <span className="text-sm">+1 123-456-7890</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin size={18} />
                        <span className="text-sm">Brampton, ON, Canada</span>
                    </div>
                </div>

                {/* Location Button */}
                <button className="bg-blue-500 text-white px-4 py-1 rounded mt-4">Set Location</button>
            </div>

            {/* Right Side Content with Accordion */}
            <div className="pl-[28%] flex-1 overflow-y-auto bg-gray-100 h-screen">
                <div className="bg-white p-6 shadow-md rounded-md">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200">
                        <button className="text-blue-600 font-semibold pb-2 border-b-2 border-blue-600 px-4">
                            Profile
                        </button>
                        <button className="text-gray-500 pb-2 px-4">Match Preferences</button>
                    </div>

                    {/* Accordion Section */}
                    <Collapse
                        className="mt-4 border border-gray-200 rounded-md"
                        expandIconPosition="right"
                        defaultActiveKey={["1"]}
                    >
                        {/* Membership Information Panel */}
                        <Panel header="Membership Information" key="1">
                            <table className="w-full text-left border-collapse">
                                <tbody>
                                    {[
                                        { label: "Profile Note", value: "12-FEB-2025 : Match Shared only" },
                                        { label: "Membership Type", options: ["Free", "Premium", "VIP"] },
                                        { label: "Profile Made By", options: ["Self", "Parents", "Relative"] },
                                        { label: "Registered On Date", options: ["12-FEB-2025", "15-MAR-2025", "20-APR-2025"] },
                                        { label: "Special Notes About Profile", options: ["None", "Important", "Urgent"] },
                                        { label: "Customer Service (Matchmaker)", options: ["Assigned", "Unassigned"] },
                                        { label: "Registered By", options: ["Admin", "User", "Agent"] },
                                        { label: "Amount & Currency", options: ["$100", "$500", "$1000"] },
                                    ].map((item, index) => (
                                        <tr key={index} className="border-b border-gray-200">
                                            <td className="px-4 py-2 text-gray-500">{item.label}</td>
                                            <td className="px-4 py-2">
                                                {item.options ? (
                                                    <Select
                                                        className="text-blue-500 w-full"
                                                        defaultValue="Click to add"
                                                        options={item.options.map((option) => ({ label: option, value: option }))}
                                                    />
                                                ) : (
                                                    <span className="text-gray-800 font-medium">{item.value}</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Panel>

                        {/* Basic Information Panel */}
                        <Panel header="Basic Information" key="2">
                            <table className="w-full text-left border-collapse">
                                <tbody>
                                    {[
                                        { label: "Full Name", value: "Lorence Chheena" },
                                        { label: "Age", value: "28" },
                                        { label: "Gender", value: "Male" },
                                        { label: "Marital Status", value: "Single" },
                                    ].map((item, index) => (
                                        <tr key={index} className="border-b border-gray-200">
                                            <td className="px-4 py-2 text-gray-500">{item.label}</td>
                                            <td className="px-4 py-2 text-gray-800 font-medium">{item.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Panel>

                        {/* Education & Profession Panel */}
                        <Panel header="Education & Profession" key="3">
                            <table className="w-full text-left border-collapse">
                                <tbody>
                                    {[
                                        { label: "Highest Qualification", value: "MBA in Finance" },
                                        { label: "University", value: "University of Toronto" },
                                        { label: "Occupation", value: "Financial Analyst" },
                                        { label: "Company", value: "RBC Bank" },
                                    ].map((item, index) => (
                                        <tr key={index} className="border-b border-gray-200">
                                            <td className="px-4 py-2 text-gray-500">{item.label}</td>
                                            <td className="px-4 py-2 text-gray-800 font-medium">{item.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Panel>

                        {/* Family Details Panel */}
                        <Panel header="Family Details" key="4">
                            <table className="w-full text-left border-collapse">
                                <tbody>
                                    {[
                                        { label: "Father's Name", value: "Mr. John Chheena" },
                                        { label: "Mother's Name", value: "Mrs. Chheena" },
                                        { label: "Siblings", value: "One elder sister" },
                                        { label: "Family Type", value: "Nuclear Family" },
                                    ].map((item, index) => (
                                        <tr key={index} className="border-b border-gray-200">
                                            <td className="px-4 py-2 text-gray-500">{item.label}</td>
                                            <td className="px-4 py-2 text-gray-800 font-medium">{item.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Panel>

                        {/* Location Details Panel */}
                        <Panel header="Location Details" key="5">
                            <table className="w-full text-left border-collapse">
                                <tbody>
                                    {[
                                        { label: "Current Location", value: "Brampton, ON, Canada" },
                                        { label: "Hometown", value: "Vancouver, BC, Canada" },
                                        { label: "Preferred Locations", value: "Toronto, Calgary, Montreal" },
                                    ].map((item, index) => (
                                        <tr key={index} className="border-b border-gray-200">
                                            <td className="px-4 py-2 text-gray-500">{item.label}</td>
                                            <td className="px-4 py-2 text-gray-800 font-medium">{item.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        </div>
    );
};

export default AddClient;
