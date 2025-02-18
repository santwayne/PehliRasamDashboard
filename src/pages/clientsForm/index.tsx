import { Form, Input, Button, Select, DatePicker, Row, Col, Card, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import apiClient from "../../config/apiClient";
import logo from "../../components/images/logo.png";
import schema from "../../schema/customer";
import { z } from "zod";

const { Option } = Select;

interface CountryOption {
    value: string;
    latlng: [number, number];
    label: string;
}

const fetchCountries = async (): Promise<CountryOption[]> => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data: any[] = await response.json();
        return data
            .map((country: { name: { common: string }; cca2: string; latlng?: [number, number] }) => ({
                value: country.cca2,
                label: country.name.common,
                latlng: country.latlng || [0, 0],
            }))
            .sort((a, b) => a.label.localeCompare(b.label));
    } catch (error) {
        message.error("Failed to fetch countries.");
        return [];
    }
};

const ClientSubmissionForm = () => {
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState<CountryOption[]>([]);

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        mode: "onBlur",
    });

    useEffect(() => {
        const loadCountries = async () => {
            const countryData = await fetchCountries();
            setCountries(countryData);
        };
        loadCountries();
    }, []);

    const onSubmit = async (data: z.infer<typeof schema>) => {
        console.log("🚀 Form submitted!", data);
        setLoading(true);
        try {
            await apiClient.post("/customer", data);
            message.success("Customer registered successfully!");
            reset();
        } catch (error) {
            message.error("Failed to submit form.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="text-center mb-6">
                <img src={logo} alt="Logo" className="w-32 mx-auto mb-3" />
                <h2 className="text-3xl font-bold text-[rgb(174,8,71)]">Client Submission Form</h2>
            </div>

            <Card className="shadow-lg rounded-xl border border-gray-200 p-6 bg-white">
                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    <h3 className="text-xl font-semibold text-[rgb(174,8,71)] mb-4">Personal Details</h3>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Full Name" validateStatus={errors.name ? "error" : ""} help={errors.name?.message}>
                                <Controller name="name" control={control} render={({ field }) => <Input {...field} placeholder="Enter your Name" />} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Email" validateStatus={errors.email ? "error" : ""} help={errors.email?.message}>
                                <Controller name="email" control={control} render={({ field }) => <Input {...field} placeholder="Enter your Email Address" />} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Contact Number">
                            <Controller
                                    name="contact"
                                    control={control}
                                    render={({ field }) => (
                                        <PhoneInput
                                        {...field}
                                        international
                                        placeholder="Enter your Contact Number"
                                        className="ant-input"
                                        defaultCountry={undefined}
                                    />
                                    
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Country">
                                <Controller
                                    name="countryCode"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            onChange={(value, option: any) => {
                                                setValue("countryCode", value);
                                                setValue("latlng", option.latlng);
                                            }}
                                            placeholder="Select country code"
                                        >
                                            {countries.map(({ value, label, latlng }) => (
                                                <Option key={value} value={value} latlng={latlng}>
                                                    {label} ({value})
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Location">
                        <Controller name="location" control={control} render={({ field }) => <Input {...field} placeholder="Enter your Lcation" />} />
                    </Form.Item>

                    <h3 className="text-xl font-semibold text-[rgb(174,8,71)] mt-6 mb-4">Basic Information</h3>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Gender">
                                <Controller name="gender" control={control} render={({ field }) => (
                                    <Select {...field} placeholder="Select your Gender">
                                        <Option value="Male">Male</Option>
                                        <Option value="Female">Female</Option>
                                    </Select>
                                )} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Religion">
                                <Controller name="religion" control={control} render={({ field }) => (
                                    <Select {...field} placeholder="Select your Religion">
                                        <Option value="Sikh">Sikh</Option>
                                        <Option value="Hindu">Hindu</Option>
                                        <Option value="Jain">Jain</Option>
                                        <Option value="Muslim">Muslim</Option>
                                        <Option value="Christian">Christian</Option>
                                    </Select>
                                )} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Marital Status" validateStatus={errors.maritalStatus ? "error" : ""} help={errors.maritalStatus?.message}>
                                <Controller name="maritalStatus" control={control} render={({ field }) => (
                                    <Select {...field} placeholder="Select marital status">
                                        {[
                                            "Never Married",
                                            "Divorced",
                                            "Windowed",
                                            "Separated",
                                            "Annulled",
                                            "Divorced(1 child , Living Together)",
                                            "Divorced(2 children , Living Together)",
                                            "Divorced(3 children , Living Together)",
                                            "Awaiting Divorce",
                                            "Widowed(1 child , Living Together)",
                                            "Divorced(Without child)",
                                        ].map(maritalStatus => (
                                            <Option key={maritalStatus} value={maritalStatus}>{maritalStatus}</Option>
                                        ))}
                                    </Select>
                                )} />

                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Birthdate" validateStatus={errors.birthdate ? "error" : ""} help={errors.birthdate?.message}>
                                <Controller
                                    name="birthdate"
                                    control={control}
                                    render={({ field }) => (
                                        <DatePicker
                                            {...field}
                                            className="w-full"
                                            format="YYYY-MM-DD"
                                            placeholder="Select birthdate"
                                            value={field.value ? dayjs(field.value) : null}
                                            onChange={(date) => field.onChange(date ? date.toDate() : null)}
                                        />
                                    )}
                                />

                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item className="flex justify-center">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="!bg-[rgb(174,8,71)] !border-none !hover:bg-[rgb(174,8,71)] !focus:bg-[rgb(174,8,71)] !active:bg-[rgb(174,8,71)]"
                        >
                            Submit Application
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ClientSubmissionForm;
