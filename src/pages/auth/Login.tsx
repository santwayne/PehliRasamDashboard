import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const validateForm = () => {
        let valid = true;
        let newErrors = { email: "", password: "" };

        if (!formData.email) {
            newErrors.email = "Email is required.";
            valid = false;
        }
        if (!formData.password) {
            newErrors.password = "Password is required.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            const user = users.find((u: any) => u.email === formData.email && u.password === formData.password);

            if (user) {
                message.success(`Welcome, ${user.name}!`);
                navigate("/");
            } else {
                message.error("Invalid email or password");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl border border-gray-300">
                <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-black to-gray-700 text-transparent bg-clip-text">
                    Pehli Rasam
                </h1>
                <p className="text-sm text-gray-600 text-center mt-1">Welcome! Please log in to continue.</p>

                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-800 font-medium">Email Address</label>
                        <input
                            type="email"
                            className={`w-full p-3 mt-1 border rounded-lg focus:ring ${errors.email ? "border-red-500 ring-red-300" : "border-gray-400 focus:ring-black"}`}
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-800 font-medium">Password</label>
                        <input
                            type="password"
                            className={`w-full p-3 mt-1 border rounded-lg focus:ring ${errors.password ? "border-red-500 ring-red-300" : "border-gray-400 focus:ring-black"}`}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                    </div>

                    <button className="w-full mt-4 p-3 text-white bg-gradient-to-r from-black to-gray-700 rounded-lg hover:opacity-90 shadow-lg transition">
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
