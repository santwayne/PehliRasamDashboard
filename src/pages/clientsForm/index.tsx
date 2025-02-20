import { Form, Input, Button, Select, DatePicker, Row, Col, Card, message, Upload, InputNumber } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import apiClient from "../../config/apiClient";
import logo from "../../components/images/logo.png";
import schema from "../../schema/customer";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { UploadFile } from "antd/es/upload/interface";

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
    const [fileList, setFileList] = useState<UploadFile[]>([]);

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

    const handleImageUpload = ({ fileList }: { fileList: UploadFile[] }) => {
        if (fileList.length > 5) {
            message.error("You can only upload a maximum of 5 images.");
            return;
        }
        setFileList(fileList);
    };

    const getBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (reader.result) {
                    resolve(reader.result.toString().split(",")[1]);
                } else {
                    reject("Failed to convert file to base64.");
                }
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const onSubmit = async (values: any) => {
        setLoading(true);
        try {
            let imgUrls: string[] = [];
            if (fileList.length > 0) {
                const imagesData = await Promise.all(
                    fileList.map(async (file, index) => ({
                        base64: await getBase64(file.originFileObj as File),
                        filename: `image_${index}.jpg`,
                        format: file.type?.split("/")[1],
                    }))
                );

                const res = await apiClient.post("/customer/upload-image", {
                    clientName: values.name,
                    images: imagesData,
                });
                imgUrls = res.data.data.urls;
            }

            await apiClient.post("/customer", { ...values, imgURL: imgUrls });
            message.success("Client added successfully!");
            reset();
            setFileList([]);
        } catch (error) {
            console.error("Error saving client:", error);
            message.error("Error saving client.");
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
                                            className="ant-input border border-gray-300 rounded-md p-2"
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
                        <Controller name="location" control={control} render={({ field }) => <TextArea {...field} placeholder="Enter your Lcation" />} />
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
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Caste" validateStatus={errors.subcaste ? "error" : ""} help={errors.subcaste?.message}>
                                <Controller name="subcaste" control={control} render={({ field }) => <Input {...field} placeholder="Enter your Caste" />} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Height (ft & in)" validateStatus={errors.height ? "error" : ""} help={errors.height?.message}>
                                <Controller name="height" control={control} render={({ field }) => (
                                    <Select {...field} placeholder="Select height">
                                        {Array.from({ length: 48 }, (_, i) => {
                                            const feet = Math.floor((i + 48) / 12);
                                            const inches = (i + 48) % 12;
                                            const height = `${feet}'${inches}"`;
                                            return (
                                                <Option key={height} value={height}>
                                                    {height}
                                                </Option>
                                            );
                                        })}
                                    </Select>

                                )} />

                            </Form.Item>
                        </Col>
                    </Row>
                    <h3 className="text-xl font-semibold text-[rgb(174,8,71)] mb-4">Education & Profession</h3>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Employment" validateStatus={errors.employment ? "error" : ""} help={errors.employment?.message}>
                                <Controller name="employment" control={control} render={({ field }) => <Input {...field} placeholder="Enter your employment" />} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Profession" validateStatus={errors.profession ? "error" : ""} help={errors.profession?.message}>
                                <Controller name="profession" control={control} render={({ field }) => <Input {...field} placeholder="Enter your profession" />} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Education" validateStatus={errors.education ? "error" : ""} help={errors.education?.message}>
                        <Controller name="education" control={control} render={({ field }) => <TextArea {...field} placeholder="Enter your education" />} />
                    </Form.Item>

                    <h3 className="text-xl font-semibold text-[rgb(174,8,71)] mb-4">Family Details</h3>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Father's Name" validateStatus={errors.fatherName ? "error" : ""} help={errors.fatherName?.message}>
                                <Controller name="fatherName" control={control} render={({ field }) => <Input {...field} placeholder="Enter your Father's Name" />} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Mother's Name" validateStatus={errors.motherName ? "error" : ""} help={errors.motherName?.message}>
                                <Controller name="motherName" control={control} render={({ field }) => <Input {...field} placeholder="Enter your Mother's Name" />} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h3 className="text-xl font-semibold text-[rgb(174,8,71)] mb-4">About Me</h3>
                    <Form.Item label="Upload Images">
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            beforeUpload={() => false}
                            onChange={handleImageUpload}
                            multiple
                        >
                            {fileList.length < 5 && <Button icon={<UploadOutlined />}>Upload</Button>}
                        </Upload>
                    </Form.Item>

                    <h3 className="text-xl font-semibold text-[rgb(174,8,71)] mt-6 mb-4">Match Preferences</h3>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Preferred Gender">
                                <Controller name="preferredGender" control={control} render={({ field }) => (
                                    <Select {...field} placeholder="Select your Gender">
                                        <Option value="Male">Male</Option>
                                        <Option value="Female">Female</Option>
                                    </Select>
                                )} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Preferred Religion">
                                <Controller name="preferredReligion" control={control} render={({ field }) => (
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
                        {/* Preferred Age Range */}
                        <Col span={12}>
                            <Form.Item label="Preferred Age Range">
                                <Row gutter={8}>
                                    <Col span={11}>
                                        <Controller
                                            name="preferredAge.min"
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber {...field} min={18} placeholder="Min Age" className="w-full" />
                                            )}
                                        />
                                    </Col>
                                    <Col span={2} className="text-center">to</Col>
                                    <Col span={11}>
                                        <Controller
                                            name="preferredAge.max"
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber {...field} min={18} placeholder="Max Age" className="w-full" />
                                            )}
                                        />
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Col>

                        {/* Preferred Height Range */}
                        <Col span={12}>
                            <Form.Item label="Preferred Height (in inches)">
                                <Row gutter={8}>
                                    <Col span={11}>
                                        <Controller
                                            name="preferredHeight.min"
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber {...field} min={49} placeholder="Min Height" className="w-full" />
                                            )}
                                        />
                                    </Col>
                                    <Col span={2} className="text-center">to</Col>
                                    <Col span={11}>
                                        <Controller
                                            name="preferredHeight.max"
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber {...field} min={49} placeholder="Max Height" className="w-full" />
                                            )}
                                        />
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Caste" validateStatus={errors.preferredSubcaste ? "error" : ""} help={errors.preferredSubcaste?.message}>
                                <Controller name="preferredSubcaste" control={control} render={({ field }) => <Input {...field} placeholder="Enter your Caste" />} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="City Preferred" validateStatus={errors.cityPreferred ? "error" : ""} help={errors.cityPreferred?.message}>
                                <Controller name="cityPreferred" control={control} render={({ field }) => <Input {...field} placeholder="Enter your City Preferrence" />} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Preferred Appearance" validateStatus={errors.preferredAppearance ? "error" : ""} help={errors.preferredAppearance?.message}>
                                <Controller name="preferredAppearance" control={control} render={({ field }) => (
                                    <Select {...field} placeholder="Select Preferred Appearance">
                                        {[
                                            'Hair-cut', 'Turbaned(with trimmed beard)', 'Gursikh', 'Clean Shaven', 'Amrit-Dhari', 'Female Profile',
                                        ].map(maritalStatus => (
                                            <Option key={maritalStatus} value={maritalStatus}>{maritalStatus}</Option>
                                        ))}
                                    </Select>
                                )} />

                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Marital Status Preferrence" validateStatus={errors.maritalStatusPreference ? "error" : ""} help={errors.maritalStatusPreference?.message}>
                                <Controller name="maritalStatusPreference" control={control} render={({ field }) => (
                                    <Select {...field} placeholder="Select marital status Preferrence">
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
