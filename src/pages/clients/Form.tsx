import { Collapse, Select, Input, Upload, Button, message, Row, Col, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { addClient, updateClient, getClient } from "./Actions";
import { ICustomer } from "./clientTypes";

const { Panel } = Collapse;

const generateHeightOptions = () => {
    const options = [];
    for (let inches = 48; inches <= 96; inches++) {
        const feet = Math.floor(inches / 12);
        const remainingInches = inches % 12;
        options.push({
            value: inches,
            label: `${feet}'${remainingInches}"`,
        });
    }
    return options;
};

const heightOptions = generateHeightOptions();

const defaultClientData: ICustomer = {
    name: "",
    email: "",
    contact: "",
    countryCode: "",
    location: "",
    latlng: [],
    gender: "Male",
    birthdate: "",
    maritalStatus: "Never Married",
    profileNote: "",
    profileMadeBy: "Self",
    memberShipType: "Active Client",
    registeredBy: "Admin",
    amount: "100",
    appearance: "Hair-cut",
    religion: "Sikh",
    height: "",
    moreAboutMartialStatus: "",
    vegetarian: "Yes",
    doYouDrinkAlcohol: "No",
    doYouSmoke: "No",
    phoneNumber: "",
    userCode: "",
    nameOfHighSchool: "",
    education: "",
    employment: "",
    income: "",
    profession: "",
    familyAffluenceLevel: "",
    fatherEmployment: "",
    motherEmployment: "",
    otherFamilyDetails: "",
    fatherName: "",
    motherName: "",
    residencyStatus: "",
    livingInSince: "",
    countryLiving: "",
    countryGrewUpIn: "",
    propertyDetails: "",
};

interface MembershipFormProps {
    clientId?: string;
}

const Form = ({ clientId }: MembershipFormProps) => {
    const { control } = useForm();
    const [formData, setFormData] = useState<ICustomer>({ ...defaultClientData });
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (clientId) {
            setLoading(true);
            getClient(Number(clientId), 1)
                .then((response) => setFormData((prevData) => ({ ...prevData, ...response?.data })))
                .catch(() => message.error("Failed to fetch client details"))
                .finally(() => setLoading(false));
        }
    }, [clientId]);

    const handleChange = (field: keyof ICustomer, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleUpload = (info: any) => {
        const reader = new FileReader();
        reader.onload = (e) => setImageUrl(e.target?.result as string);
        reader.readAsDataURL(info.file);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            clientId ? await updateClient(clientId, formData) : await addClient(formData);
            message.success(clientId ? "Client updated successfully!" : "Client added successfully!");
        } catch (error) {
            message.error("Error saving client data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{clientId ? "Update Client" : "Add Client"}</h2>
                <Button type="primary" onClick={handleSave} loading={loading}>
                    {clientId ? "Update" : "Save"}
                </Button>
            </div>
            <Collapse className="mt-4 border border-gray-200 rounded-md" expandIconPosition="right" defaultActiveKey={["1"]}>

                {/* Membership Information */}
                <Panel header="Membership Information" key="1">
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "Profile Note", value: "12-FEB-2025 : Match Shared only" },
                            { label: "Membership Type", options: ["Active Client", "Free Member", "Inactive", "Deactivated", "Refund", "Old Paid Member", "Profile on Hold"] },
                            { label: "Profile Made By", options: ["Self", "Father", "Mother", "Brother", "Sister", "Cousin", "Friend", "Relative", "Uncle", "Aunty", "Other"] },
                            { label: "Registered On Date", options: ["12-FEB-2025", "15-MAR-2025", "20-APR-2025"] },
                            { label: "Special Notes About Profile", value: ["something"] },
                            { label: "Customer Service (Matchmaker)", options: ["employee1", "employee2"] },
                            { label: "Registered By", options: ["Admin", "User", "Agent"] },
                            { label: "Amount & Currency", value: ["1*****"] },
                            { label: "Appearance", options: ["Hair-cut", "Turbaned(with trimmed beard)", "Gursikh", "Clean Shaven", "Amrit-Dhari", "Female Profile"] },
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
                            { label: "Religion", options: ['Sikh', 'Hindu', 'Jain', 'Muslim', 'Christain', 'Buddhist', 'Spiritual', 'Other'] },
                            {
                                label: "Sub Caste", options: ['Ad Dharmi', 'Ahluwalia', 'Arora', 'Baazigar',
                                    'Bhatia', 'Bhatra', 'Brahmin', 'Baniya', 'Chimba', 'Ghumar', 'Gujjar', 'Sunyar (Gold Smith)',
                                    'Hindu Punjabi', 'Intercaste', 'Jatt (Sikh)', 'Julahe', 'Jain', 'Jaat (Hindu)', 'Kabir Panthi',
                                    'Kamboj', 'Kashyap Rajput', 'Khatri', 'Kshatriya', 'Lubana', 'Mahajan', 'Maid Rajput',
                                    'Mair Rajput', 'Majabi', 'Nai', 'Parjapat', 'Rai', 'Rajput', 'Ramdasia', 'Ramgharia',
                                    'Ravidasia', 'Saini', 'Tonk Khatriya', 'Other']
                            },
                            { label: "Birthday(Age)", value: "28 Jan 1996 (29 years)" },
                            { label: "Time Of Birth", value: "Add" },
                            {
                                label: "Marital Status", options: ["Never Married", "Divorced", "Windowed", "Separated",
                                    "Annulled", "Divorced(1 child , Living Together)", "Divorced(2 children , Living Together)",
                                    "Divorced(3 children , Living Together)", "Awaiting Divorce",
                                    "Widowed(1 child , Living Together)", "Divorced(Without child)"]
                            },
                            { label: "More about Marital status", value: "Got Married 2018 & legal Divorced 2019 (Living Together 1 Month)" },
                            { label: "Vegetarian", options: ["Yes", "No"] },
                            { label: "Do you Drink Alcohol?", options: ['Yes,occasionally', 'yes,regularly', 'No'] },
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
                                    <Input className="w-full" defaultValue={item.value} onChange={(e) => handleChange(item.label as keyof ICustomer, e.target.value)} />
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
                                    <Input className="w-full" defaultValue={item.value} onChange={(e) => handleChange(item.label as keyof ICustomer, e.target.value)} />
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
                                    <Input className="w-full" defaultValue={item.value} onChange={(e) => handleChange(item.label as keyof ICustomer, e.target.value)} />
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
                            { label: "Image", isFileUpload: true }
                        ].map((item, index) => (
                            <div key={index} className="flex">
                                <div className="w-1/2 px-4 py-2 text-gray-500">{item.label}</div>
                                <div className="w-1/2 px-4 py-2">
                                    {item.isFileUpload ? (
                                        <Upload
                                            showUploadList={false}
                                            beforeUpload={() => false}
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

                {/*Match Preferences */}
                <Panel header="Match Preferences" key="7">
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "More About Partner Preference", value: ["something"] },
                            { label: "Member Status", value: ["type"] },
                            { label: "Preferred Gender", options: ["Male", "Female"] },
                            { label: "Preferred Reigion", options: ['Sikh', 'Hindu', 'Jain', 'Muslim', 'Christain', 'Buddhist', 'Spiritual', 'Other'] },
                            {
                                label: "Preferred Caste", options: ['Ad Dharmi', 'Ahluwalia', 'Arora', 'Baazigar',
                                    'Bhatia', 'Bhatra', 'Brahmin', 'Baniya', 'Chimba', 'Ghumar', 'Gujjar', 'Sunyar (Gold Smith)',
                                    'Hindu Punjabi', 'Intercaste', 'Jatt (Sikh)', 'Julahe', 'Jain', 'Jaat (Hindu)', 'Kabir Panthi',
                                    'Kamboj', 'Kashyap Rajput', 'Khatri', 'Kshatriya', 'Lubana', 'Mahajan', 'Maid Rajput',
                                    'Mair Rajput', 'Majabi', 'Nai', 'Parjapat', 'Rai', 'Rajput', 'Ramdasia', 'Ramgharia',
                                    'Ravidasia', 'Saini', 'Tonk Khatriya', 'Other']
                            },

                            { label: "Residency Preferrence", value: "India" },
                            { label: "Country Preferrnce ", value: "India" },
                            {
                                label: "City Preferrence"
                                , options: ['Amritsar', 'Barnala', 'Bathinda', 'Dera Bassi', 'Delhi', 'Chandigarh',
                                    'Faridkot', 'Fatehgarh Sahib', 'Firozpur', 'Gurdaspur', 'Gujarat', 'Hoshiarpur',
                                    'Himachal Pradesh', 'Haryana', 'Jalandhar', 'Jammu and Kashmir', 'Kapurthala',
                                    'Khanna', 'Ludhiana', 'Mansa', 'Moga', 'Muktsar(Sri Muktsar Sahib)',
                                    'Nakodar', 'Patiala', 'Phagwara', 'Rupnagar', 'Rajasthan',
                                    '(Mohali)Sahibzada Ajit Singh Nagar', 'Sangrur', '(Nawanshahr)Shahid Bhagat Singh Nagar',
                                    'Tarn Taran', 'Uttarakhand', 'Uttar Pradesh', 'Zirakpur']
                            },
                            { label: "Preferred Appearance", options: ["Hair-cut", "Turbaned(with trimmed beard)", "Gursikh", "Clean Shaven", "Amrit-Dhari", "Female Profile"] },
                            { label: "Preferred Marital Status", options: ["Never Married", "Divorced", "Windowed", "Separated", "Annulled", "Divorced(1 child , Living Together)", "Divorced(2 children , Living Together)", "Divorced(3 children , Living Together)", "Awaiting Divorce", "Widowed(1 child , Living Together)", "Divorced(Without child)"] },
                            {
                                label: "Education Preference", options: ['High School', 'Senior Secondary School',
                                    'Graduation - Bachelor’s degree, BA, BSc, BCom etc.',
                                    'Post-Graduation - Master’s degree, MA, MSc, MCom etc.',
                                    'Doctorate - PhD']
                            },
                            {
                                label: "Employment Preferrence", options: ['Private Sector', 'Government Job',
                                    'Businessman', 'Self-Employed', 'Freelancer', 'Student', 'Retired',
                                    'Homemaker', 'Consultant', 'Part-Time Worker']
                            },

                            { label: "Vegetarian Preferrence", options: ["Yes", "No"] },
                            { label: "Drink Alcohol Preferrence", options: ['Yes,occasionally', 'yes,regularly', 'No'] },
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

                        {/* Preferred Age Range */}
                        <div className="flex w-full">
                            <div className="w-1/2 px-4 py-2 text-gray-500">Preferred Age Range</div>
                            <div className="w-1/2 px-4 py-2">
                                <Row gutter={8}>
                                    <Col span={11}>
                                        <Controller
                                            name="preferredAge.min"
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <InputNumber
                                                    min={18}
                                                    placeholder="Min Age"
                                                    className="w-full"
                                                    value={value !== undefined ? Number(value) : undefined}
                                                    onChange={(val) => onChange(val || 0)}
                                                />
                                            )}
                                        />
                                    </Col>
                                    <Col span={2} className="text-center">to</Col>
                                    <Col span={11}>
                                        <Controller
                                            name="preferredAge.max"
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <InputNumber
                                                    min={18}
                                                    placeholder="Max Age"
                                                    className="w-full"
                                                    value={value !== undefined ? Number(value) : undefined}
                                                    onChange={(val) => onChange(val || 0)}
                                                />
                                            )}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        {/* Preferred Height */}
                        <div className="flex w-full">
                            <div className="w-1/2 px-4 py-2 text-gray-500">Preferred Height</div>
                            <div className="w-1/2 px-4 py-2">
                                <Row gutter={8}>
                                    <Col span={11}>
                                        <Controller
                                            name="preferredHeight.min"
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    options={heightOptions}
                                                    placeholder="Min Height"
                                                    className="w-full"
                                                    onChange={onChange}
                                                    value={value || null}
                                                />
                                            )}
                                        />
                                    </Col>
                                    <Col span={2} className="text-center">to</Col>
                                    <Col span={11}>
                                        <Controller
                                            name="preferredHeight.max"
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    options={heightOptions}
                                                    placeholder="Max Height"
                                                    className="w-full"
                                                    onChange={onChange}
                                                    value={value || null}
                                                />
                                            )}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </Panel>

            </Collapse>
        </div>
    );
};

export default Form;