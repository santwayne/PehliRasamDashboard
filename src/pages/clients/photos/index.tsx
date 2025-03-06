import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaTimes } from "react-icons/fa";

const index = () => {
    const [images, setImages] = useState<string[]>([
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    // Handle image selection
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setSelectedImages(filesArray);
        }
    };

    // Save selected images
    const handleSaveImages = () => {
        const newImages = selectedImages.map((file) =>
            URL.createObjectURL(file)
        );
        setImages((prev) => [...prev, ...newImages].slice(0, 10));
        setIsModalOpen(false);
        setSelectedImages([]);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-gray-700">Photos</h2>
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    onClick={() => setIsModalOpen(true)}
                >
                    <IoMdAdd size={20} /> Add Photos
                </button>
            </div>

            {/* Image Grid */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((src, index) => (
                    <div key={index} className="relative">
                        <img
                            src={src}
                            alt={`Uploaded ${index}`}
                            className="w-full h-32 object-cover rounded-lg shadow"
                        />
                    </div>
                ))}
            </div>

            {/* Upload Modal */}
            {isModalOpen && (
                <div className="fixed inset-0  bg-white/10 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Upload Images</h3>
                            <button onClick={() => setIsModalOpen(false)}>
                                <FaTimes className="text-gray-500 hover:text-gray-700" />
                            </button>
                        </div>

                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full p-2 border rounded"
                        />

                        {/* Preview Selected Images */}
                        {selectedImages.length > 0 && (
                            <div className="mt-4 grid grid-cols-3 gap-2">
                                {selectedImages.map((file, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(file)}
                                        alt={`Preview ${index}`}
                                        className="w-full h-20 object-cover rounded-lg"
                                    />
                                ))}
                            </div>
                        )}

                        <button
                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                            onClick={handleSaveImages}
                        >
                            Save Images
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default index;
