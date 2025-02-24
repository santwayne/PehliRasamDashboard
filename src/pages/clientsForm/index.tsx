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
import { useNavigate } from "react-router-dom";

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


const ClientSubmissionForm = () => {

    const navigate = useNavigate();
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
        if (fileList.length === 0) {
            message.error("Please upload at least one image.");
            return;
        }

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

            const response = await apiClient.post("/customer", { ...values, imgURL: imgUrls });

            message.success(response.data.message);

            localStorage.setItem("isRegistered", "true");
            localStorage.setItem("registeredGender", values.preferredGender);

            reset();
            setFileList([]);

            setTimeout(() => {
                navigate(`/suggestions`);
            }, 2000);
        } catch (error: any) {
            console.error("Error saving client:", error);

            const errorMessage = error.response?.data?.message || "Error saving client.";
            message.error(errorMessage);
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
                            <Form.Item
                                label={
                                    <>
                                        Full Name <span style={{ color: "red" }}>*</span>
                                    </>
                                }
                                validateStatus={errors.name ? "error" : ""}
                                help={errors.name?.message}
                            >
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{ required: "Full Name is required" }}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="Enter your Name" />
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={
                                    <>
                                        Email <span style={{ color: "red" }}>*</span>
                                    </>
                                }
                                validateStatus={errors.email ? "error" : ""}
                                help={errors.email?.message}
                            >
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{ required: "Email is required" }}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="Enter your Email Address" />
                                    )}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label={
                                    <>
                                        Contact Number <span style={{ color: "red" }}>*</span>
                                    </>
                                }
                                validateStatus={errors.contact ? "error" : ""}
                                help={errors.contact?.message}
                            >
                                <Controller
                                    name="contact"
                                    control={control}
                                    rules={{ required: "Contact Number is required" }}
                                    render={({ field: { onChange, value } }) => (
                                        <PhoneInput
                                            value={value}
                                            onChange={onChange}
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
                            <Form.Item
                                label={
                                    <>
                                        Country <span style={{ color: "red" }}>*</span>
                                    </>
                                }
                                validateStatus={errors.countryCode ? "error" : ""}
                                help={errors.countryCode?.message}
                            >
                                <Controller
                                    name="countryCode"
                                    control={control}
                                    rules={{ required: "Country is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            onChange={(value, option: any) => {
                                                field.onChange(value);
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
                    <Form.Item
                        label={
                            <>
                                Location/ Town City/ Village <span style={{ color: "red" }}>*</span>
                            </>
                        }
                        validateStatus={errors.location ? "error" : ""}
                        help={errors.location?.message}
                    >
                        <Controller
                            name="location"
                            control={control}
                            rules={{ required: "Location is required" }}
                            render={({ field }) => (
                                <TextArea {...field} placeholder="Enter your Location" />
                            )}
                        />
                    </Form.Item>


                    <h3 className="text-xl font-semibold text-[rgb(174,8,71)] mt-6 mb-4">Basic Information</h3>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label={<>Gender <span style={{ color: "red" }}>*</span></>}
                                validateStatus={errors.gender ? "error" : ""}
                                help={errors.gender?.message}
                            >
                                <Controller
                                    name="gender"
                                    control={control}
                                    rules={{ required: "Gender is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            placeholder="Select your Gender"
                                            onChange={(value) => field.onChange(value)}
                                        >
                                            <Option value="Male">Male</Option>
                                            <Option value="Female">Female</Option>
                                        </Select>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<>Religion <span style={{ color: "red" }}>*</span></>}
                                validateStatus={errors.religion ? "error" : ""}
                                help={errors.religion?.message}
                            >
                                <Controller
                                    name="religion"
                                    control={control}
                                    rules={{ required: "Religion is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            placeholder="Select Religion"
                                            onChange={(value) => field.onChange(value)}
                                        >
                                            {[
                                                'Sikh', 'Hindu', 'Jain', 'Buddhist', 'Spiritual', 'Muslim', 'Christain', 'Other'
                                            ].map((religion) => (
                                                <Option key={religion} value={religion}>
                                                    {religion}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label={<>Marital Status <span style={{ color: "red" }}>*</span></>}
                                validateStatus={errors.maritalStatus ? "error" : ""}
                                help={errors.maritalStatus?.message}
                            >
                                <Controller
                                    name="maritalStatus"
                                    control={control}
                                    rules={{ required: "Marital Status is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            placeholder="Select marital status"
                                            onChange={(value) => field.onChange(value)}
                                        >
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
                                            ].map((status) => (
                                                <Option key={status} value={status}>
                                                    {status}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<>Birthdate <span style={{ color: "red" }}>*</span></>}
                                validateStatus={errors.birthDate ? "error" : ""}
                                help={errors.birthDate?.message}
                            >
                                <Controller
                                    name="birthDate"
                                    control={control}
                                    rules={{ required: "Birthdate is required" }}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <DatePicker
                                            className="w-full"
                                            format="YYYY-MM-DD"
                                            placeholder="Select birthdate"
                                            value={value ? dayjs(value) : null}
                                            onChange={(date) => onChange(date ? date.toDate() : null)}
                                            ref={ref}
                                        />
                                    )}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Caste"
                                validateStatus={errors.subcaste ? "error" : ""}
                                help={errors.subcaste?.message}
                            >
                                <Controller
                                    name="subcaste"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            placeholder="Select caste"
                                            onChange={(value) => field.onChange(value)}
                                        >
                                            {[
                                                "Ad Dharmi",
                                                "Ahluwalia",
                                                "Arora",
                                                "Baazigar",
                                                "Bhatia",
                                                "Bhatra",
                                                "Brahmin",
                                                "Baniya",
                                                "Chimba",
                                                "Ghumar",
                                                "Gujjar",
                                                "Sunyar (Gold Smith)",
                                                "Hindu Punjabi",
                                                "Intercaste",
                                                "Jatt (Sikh)",
                                                "Julahe",
                                                "Jain",
                                                "Jaat (Hindu)",
                                                "Kabir Panthi",
                                                "Kamboj",
                                                "Kashyap Rajput",
                                                "Khatri",
                                                "Kshatriya",
                                                "Lubana",
                                                "Mahajan",
                                                "Maid Rajput",
                                                "Mair Rajput",
                                                "Majabi",
                                                "Nai",
                                                "Parjapat",
                                                "Rai",
                                                "Rajput",
                                                "Ramdasia",
                                                "Ramgharia",
                                                "Ravidasia",
                                                "Saini",
                                                "Tonk Khatriya",
                                                "Other",
                                            ].map((subcaste) => (
                                                <Option key={subcaste} value={subcaste}>
                                                    {subcaste}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Height (ft & in)"
                                validateStatus={errors.height ? "error" : ""}
                                help={errors.height?.message}
                            >
                                <Controller
                                    name="height"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            placeholder="Select height"
                                            onChange={(value) => field.onChange(value)}
                                        >
                                            {Array.from({ length: 48 }, (_, i) => {
                                                const totalInches = i + 48;
                                                const feet = Math.floor(totalInches / 12);
                                                const inches = totalInches % 12;
                                                const height = `${feet}'${inches}"`;
                                                return (
                                                    <Option key={height} value={height}>
                                                        {height}
                                                    </Option>
                                                );
                                            })}
                                        </Select>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3 className="text-xl font-semibold text-[rgb(174,8,71)] mb-4">Education & Profession</h3>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Employment/ Job"
                                validateStatus={errors.employment ? "error" : ""}
                                help={errors.employment?.message}
                            >
                                <Controller
                                    name="employment"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            onChange={onChange}
                                            value={value}
                                            placeholder="Enter your employment"
                                        />
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Education"
                                validateStatus={errors.education ? "error" : ""}
                                help={errors.education?.message}
                            >
                                <Controller
                                    name="education"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            onChange={onChange}
                                            value={value}
                                            placeholder="Enter your education"
                                        />
                                    )}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3 className="text-xl font-semibold text-[rgb(174,8,71)] mb-4">Family Details</h3>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Father's Name"
                                validateStatus={errors.fatherName ? "error" : ""}
                                help={errors.fatherName?.message}
                            >
                                <Controller
                                    name="fatherName"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            onChange={onChange}
                                            value={value}
                                            placeholder="Enter your Father's Name"
                                        />
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Mother's Name"
                                validateStatus={errors.motherName ? "error" : ""}
                                help={errors.motherName?.message}
                            >
                                <Controller
                                    name="motherName"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            onChange={onChange}
                                            value={value}
                                            placeholder="Enter your Mother's Name"
                                        />
                                    )}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3 className="text-xl font-semibold text-[rgb(174,8,71)] mb-4">About Me</h3>
                    <Form.Item
                        label={<span>Upload Images <span style={{ color: "red" }}>*</span></span>}
                        validateStatus={fileList.length === 0 ? "error" : ""}
                        help={fileList.length === 0 ? "Please upload at least one image" : ""}
                    >
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            beforeUpload={() => false}
                            onChange={(info) => handleImageUpload(info)}
                            multiple
                        >
                            {fileList.length < 5 && <Button icon={<UploadOutlined />}>Upload</Button>}
                        </Upload>
                    </Form.Item>

                    <h3 className="text-xl font-semibold text-[rgb(174,8,71)] mt-6 mb-4">Match Preferences</h3>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label={<span>Preferred Gender <span style={{ color: "red" }}>*</span></span>}
                                validateStatus={errors.preferredGender ? "error" : ""}
                                help={errors.preferredGender?.message}
                            >
                                <Controller
                                    name="preferredGender"
                                    control={control}
                                    rules={{ required: "Preferred Gender is required" }}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            placeholder="Select your Gender"
                                            onChange={onChange}
                                            value={value}
                                        >
                                            <Option value="Male">Male</Option>
                                            <Option value="Female">Female</Option>
                                        </Select>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<span>Preferred Religion <span style={{ color: "red" }}>*</span></span>}
                                validateStatus={errors.preferredReligion ? "error" : ""}
                                help={errors.preferredReligion?.message}
                            >
                                <Controller
                                    name="preferredReligion"
                                    control={control}
                                    rules={{ required: "Preferred Religion is required" }}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            placeholder="Select your Religion"
                                            onChange={onChange}
                                            value={value}
                                        >
                                            {[
                                                'Sikh', 'Hindu', 'Jain', 'Buddhist', 'Spiritual', 'Muslim', 'Christain', 'Other'
                                            ].map((preferredReligion) => (
                                                <Option key={preferredReligion} value={preferredReligion}>
                                                    {preferredReligion}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />

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
                            </Form.Item>
                        </Col>


                        {/* Preferred Height */}
                        <Col span={12}>
                            <Form.Item label="Preferred Height">
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
                                    <Col span={2} className="text-center">
                                        to
                                    </Col>
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
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Caste"
                                validateStatus={errors.preferredSubcaste ? "error" : ""}
                                help={errors.preferredSubcaste?.message}
                            >
                                <Controller
                                    name="preferredSubcaste"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            placeholder="Select caste"
                                            onChange={onChange}
                                            value={value}
                                        >
                                            {[
                                                "Ad Dharmi",
                                                "Ahluwalia",
                                                "Arora",
                                                "Baazigar",
                                                "Bhatia",
                                                "Bhatra",
                                                "Brahmin",
                                                "Baniya",
                                                "Chimba",
                                                "Ghumar",
                                                "Gujjar",
                                                "Sunyar (Gold Smith)",
                                                "Hindu Punjabi",
                                                "Intercaste",
                                                "Jatt (Sikh)",
                                                "Julahe",
                                                "Jain",
                                                "Jaat (Hindu)",
                                                "Kabir Panthi",
                                                "Kamboj",
                                                "Kashyap Rajput",
                                                "Khatri",
                                                "Kshatriya",
                                                "Lubana",
                                                "Mahajan",
                                                "Maid Rajput",
                                                "Mair Rajput",
                                                "Majabi",
                                                "Nai",
                                                "Parjapat",
                                                "Rai",
                                                "Rajput",
                                                "Ramdasia",
                                                "Ramgharia",
                                                "Ravidasia",
                                                "Saini",
                                                "Tonk Khatriya",
                                                "Other",
                                            ].map((preferredSubcaste) => (
                                                <Option
                                                    key={preferredSubcaste}
                                                    value={preferredSubcaste}
                                                >
                                                    {preferredSubcaste}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="City Preferred"
                                validateStatus={errors.cityPreferred ? "error" : ""}
                                help={errors.cityPreferred?.message}
                            >
                                <Controller
                                    name="cityPreferred"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            placeholder="Select City Preferred"
                                            onChange={onChange}
                                            value={value}
                                        >
                                            {[
                                                "Amritsar",
                                                "Barnala",
                                                "Bathinda",
                                                "Dera Bassi",
                                                "Delhi",
                                                "Chandigarh",
                                                "Faridkot",
                                                "Fatehgarh Sahib",
                                                "Firozpur",
                                                "Gurdaspur",
                                                "Gujarat",
                                                "Hoshiarpur",
                                                "Himachal Pradesh",
                                                "Haryana",
                                                "Jalandhar",
                                                "Jammu and Kashmir",
                                                "Kapurthala",
                                                "Khanna",
                                                "Ludhiana",
                                                "Mansa",
                                                "Moga",
                                                "Muktsar(Sri Muktsar Sahib)",
                                                "Nakodar",
                                                "Patiala",
                                                "Phagwara",
                                                "Rupnagar",
                                                "Rajasthan",
                                                "(Mohali)Sahibzada Ajit Singh Nagar",
                                                "Sangrur",
                                                "(Nawanshahr)Shahid Bhagat Singh Nagar",
                                                "Tarn Taran",
                                                "Uttarakhand",
                                                "Uttar Pradesh",
                                                "Zirakpur",
                                            ].map((cityPreferred) => (
                                                <Option key={cityPreferred} value={cityPreferred}>
                                                    {cityPreferred}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Preferred Appearance"
                                validateStatus={errors.preferredAppearance ? "error" : ""}
                                help={errors.preferredAppearance?.message}
                            >
                                <Controller
                                    name="preferredAppearance"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            placeholder="Select Preferred Appearance"
                                            onChange={onChange}
                                            value={value}
                                        >
                                            {[
                                                "Hair-cut",
                                                "Turbaned (with trimmed beard)",
                                                "Gursikh",
                                                "Clean Shaven",
                                                "Amrit-Dhari",
                                                "Female Profile",
                                            ].map((appearance) => (
                                                <Option key={appearance} value={appearance}>
                                                    {appearance}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Marital Status Preference"
                                validateStatus={errors.maritalStatusPreference ? "error" : ""}
                                help={errors.maritalStatusPreference?.message}
                            >
                                <Controller
                                    name="maritalStatusPreference"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            placeholder="Select Marital Status Preference"
                                            onChange={onChange}
                                            value={value}
                                        >
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
                                                "Divorced(Without child)"
                                            ].map((status) => (
                                                <Option key={status} value={status}>
                                                    {status}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Education Preference"
                                validateStatus={errors.educationPreferrence ? "error" : ""}
                                help={errors.educationPreferrence?.message}
                            >
                                <Controller
                                    name="educationPreferrence"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            placeholder="Select Education Preference"
                                            onChange={onChange}
                                            value={value}
                                        >
                                            {[
                                                "High School",
                                                "Senior Secondary School",
                                                "Graduation - Bachelor’s degree, BA, BSc, BCom etc.",
                                                "Post-Graduation - Master’s degree, MA, MSc, MCom etc.",
                                                "Doctorate - PhD",
                                            ].map((education) => (
                                                <Option key={education} value={education}>
                                                    {education}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Employment Preference"
                                validateStatus={errors.employmentPreferrence ? "error" : ""}
                                help={errors.employmentPreferrence?.message}
                            >
                                <Controller
                                    name="employmentPreferrence"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            placeholder="Select Employment Preference"
                                            onChange={onChange}
                                            value={value}
                                        >
                                            {[
                                                "Private Sector",
                                                "Government Job",
                                                "Businessman",
                                                "Self-Employed",
                                                "Freelancer",
                                                "Student",
                                                "Retired",
                                                "Homemaker",
                                                "Consultant",
                                                "Part-Time Worker",
                                            ].map((employment) => (
                                                <Option key={employment} value={employment}>
                                                    {employment}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Vegetarian Preference"
                                validateStatus={errors.vegetarianPreferrence ? "error" : ""}
                                help={errors.vegetarianPreferrence?.message}
                            >
                                <Controller
                                    name="vegetarianPreferrence"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            placeholder="Select Vegetarian Preference"
                                            onChange={onChange}
                                            value={value}
                                        >
                                            {["Yes", "No"].map((option) => (
                                                <Option key={option} value={option}>
                                                    {option}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Drink Alcohol"
                                validateStatus={errors.drinkAlcoholPreferrence ? "error" : ""}
                                help={errors.drinkAlcoholPreferrence?.message}
                            >
                                <Controller
                                    name="drinkAlcoholPreferrence"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            placeholder="Select Drink Alcohol"
                                            onChange={onChange}
                                            value={value}
                                        >
                                            {['Yes,occasionally', 'yes,regularly', 'No'].map((option) => (
                                                <Option key={option} value={option}>
                                                    {option}
                                                </Option>
                                            ))}
                                        </Select>
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
