import React from "react";
import { Button } from "antd";
import { CameraOutlined } from "@ant-design/icons";

const Index = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Profile Header */}
            <div className="bg-white shadow p-6">
                <h2 className="text-lg font-semibold text-gray-700">
                    johndoe@gmail.com’s Profile
                </h2>
            </div>

            {/* Profile Content */}
            <div className="p-6">
                {/* Profile Image */}
                <div className="flex items-center space-x-4">
                    <div className="relative w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                        GS
                        <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow">
                            <CameraOutlined className="text-gray-600" />
                        </div>
                    </div>
                    <div className="text-gray-600">Click to change profile photo</div>
                </div>

                {/* Profile Details */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileField label="Name" value="" placeholder="click to add" />
                    <ProfileField label="Phone" value="" placeholder="click to add" />
                    <ProfileField label="Email" value="johndoe@gmail.com">
                        <Button size="small" className="ml-2">Change Email</Button>
                    </ProfileField>
                    <ProfileField label="Password" value="********">
                        <Button size="small" className="ml-2">Change</Button>
                    </ProfileField>
                </div>

                {/* Status */}
                <div className="border-t mt-6 pt-4">
                    <p className="text-sm font-medium text-gray-700">Status</p>
                    <p className="text-sm text-gray-600">Active: Yes</p>
                    <p className="text-xs text-gray-500">Last login: 08 Mar 2025 8:54 AM</p>
                </div>
            </div>
        </div>
    );
};

// Reusable Component for Profile Fields
const ProfileField = ({ label, value, placeholder = "", children }: { label: string; value: string; placeholder?: string; children?: React.ReactNode }) => {
    return (
        <div className="pb-2 border-b">
            <p className="text-sm font-medium text-gray-700">{label}</p>
            <p className={`text-sm ${value ? "text-gray-900" : "text-gray-400 italic"}`}>
                {value || placeholder}
            </p>
            {children}
        </div>
    );
};

export default Index;
