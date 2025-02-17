import { Form, Input, Button, Select, DatePicker, Row, Col, Card } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import logo from "../../components/images/logo.png";

const { Option } = Select;

// Validation Schema using Zod
const schema = z.object({
    name: z.string().min(2, "Please enter your full name"),
    email: z.string().email("Enter a valid email"),
    contactNumber: z.string().min(10, "Enter a valid contact number"),
    location: z.string().min(2, "Location is required"),
    country: z.string().min(2, "Country is required"),
    gender: z.string(),
    religion: z.string(),
    birthdate: z.string().nonempty("Select your birthdate"),
    maritalStatus: z.string(),
    contactCode: z.string(), // Add the contactCode to the schema
});

// Define the country codes type and list
type CountryCode = { code: string; country: string };

const countryCodes: CountryCode[] = [
    { code: "+91", country: "India" },
    { code: "+1", country: "USA" },
    { code: "+44", country: "UK" },
    { code: "+61", country: "Australia" },
    { code: "+81", country: "Japan" },
    { code: "+49", country: "Germany" },
    { code: "+33", country: "France" },
    { code: "+34", country: "Spain" },
    { code: "+1", country: "Canada" },
    { code: "+86", country: "China" },
    { code: "+7", country: "Russia" },
    { code: "+971", country: "UAE" },
    { code: "+1", country: "Other" }, // Option for other countries
];

const ClientSubmissionForm = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        mode: "onBlur",
    });

    const onSubmit = (data: any) => {
        console.log("Form Submitted:", data);
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            {/* Logo & Header */}
            <div className="text-center mb-6">
                <img src={logo} alt="Pehli Rasam Logo" className="w-32 mx-auto mb-3" />
                <h2 className="text-3xl font-bold" style={{ color: "rgb(164,8,65)" }}>Client Submission Form</h2>
            </div>

            <Card className="shadow-lg rounded-lg border border-gray-200">
                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    {/* Details Section */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold border-b pb-2 mb-4" style={{ color: "rgb(164,8,65)" }}>Personal Details</h3>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Full Name" validateStatus={errors.name ? "error" : ""} help={errors.name?.message}>
                                    <Controller name="name" control={control} render={({ field }) => <Input {...field} placeholder="Enter your full name" />} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Email" validateStatus={errors.email ? "error" : ""} help={errors.email?.message}>
                                    <Controller name="email" control={control} render={({ field }) => <Input {...field} placeholder="Enter your email" />} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Contact Number" validateStatus={errors.contactNumber ? "error" : ""} help={errors.contactNumber?.message}>
                                    <Row gutter={8}>
                                        <Col span={6}>
                                            <Controller
                                                name="contactCode"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select {...field} placeholder="Country Code">
                                                        {countryCodes.map(({ code, country }) => (
                                                            <Option key={code} value={code}>{`${country} (${code})`}</Option>
                                                        ))}
                                                    </Select>
                                                )}
                                            />
                                        </Col>
                                        <Col span={18}>
                                            <Controller
                                                name="contactNumber"
                                                control={control}
                                                render={({ field }) => <Input {...field} placeholder="Enter your contact number" />}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Location" validateStatus={errors.location ? "error" : ""} help={errors.location?.message}>
                                    <Controller
                                        name="location"
                                        control={control}
                                        render={({ field }) => (
                                            <Input {...field} placeholder="Enter your location" />
                                        )}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Country" validateStatus={errors.country ? "error" : ""} help={errors.country?.message}>
                                    <Controller
                                        name="country"
                                        control={control}
                                        render={({ field }) => (
                                            <Select {...field} placeholder="Select country">
                                                {countryCodes.map(({ country }) => (
                                                    <Option key={country} value={country}>{country}</Option>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>

                    {/* Basic Information Section */}
                    <div>
                        <h3 className="text-lg font-semibold border-b pb-2 mb-4" style={{ color: "rgb(164,8,65)" }}>Basic Information</h3>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Gender" validateStatus={errors.gender ? "error" : ""} help={errors.gender?.message}>
                                    <Controller
                                        name="gender"
                                        control={control}
                                        render={({ field }) => (
                                            <Select {...field} placeholder="Select gender">
                                                <Option value="Male">Male</Option>
                                                <Option value="Female">Female</Option>
                                                <Option value="Other">Other</Option>
                                            </Select>
                                        )}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Religion" validateStatus={errors.religion ? "error" : ""} help={errors.religion?.message}>
                                    <Controller
                                        name="religion"
                                        control={control}
                                        render={({ field }) => (
                                            <Select {...field} placeholder="Select religion">
                                                <Option value="Sikh">Sikh</Option>
                                                <Option value="Hindu">Hindu</Option>
                                                <Option value="Muslim">Muslim</Option>
                                                <Option value="Christian">Christian</Option>
                                                <Option value="Jain">Jain</Option>
                                            </Select>
                                        )}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Birthdate" validateStatus={errors.birthdate ? "error" : ""} help={errors.birthdate?.message}>
                                    <Controller
                                        name="birthdate"
                                        control={control}
                                        render={({ field }) => <DatePicker {...field} className="w-full" format="DD-MM-YYYY" placeholder="Select birthdate" />}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Marital Status" validateStatus={errors.maritalStatus ? "error" : ""} help={errors.maritalStatus?.message}>
                                    <Controller
                                        name="maritalStatus"
                                        control={control}
                                        render={({ field }) => (
                                            <Select {...field} placeholder="Select marital status">
                                                <Option value="Single">Single</Option>
                                                <Option value="Married">Married</Option>
                                                <Option value="Divorced">Divorced</Option>
                                                <Option value="Widowed">Widowed</Option>
                                            </Select>
                                        )}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>

                    {/* Submit Button */}
                    <Form.Item className="mt-6">
                        <div className="flex justify-center">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="text-lg font-medium w-2/5"
                                style={{ backgroundColor: "rgb(164,8,65)", borderColor: "rgb(164,8,65)" }}
                            >
                                Submit Application
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ClientSubmissionForm;
