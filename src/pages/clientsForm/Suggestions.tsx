import { useState } from "react";
import { Card, Button, Avatar, Modal } from "antd";

const suggestionsData = [
    {
        id: 530137,
        name: "Benveer",
        gender: "Female",
        height: "5ft 4in",
        age: 26,
        country: "L******, Punjab , India",
        education: "Doctorate - PhD",
        job: "Government Job",
        image: "src/assets/images/IMG_9831.jpeg",
    },
    {
        id: 530138,
        name: "Manpreet",
        gender: "Female",
        height: "5ft 2in",
        age: 24,
        country: "J******, Rajasthan , India",
        education: "Post Graduation",
        job: "Freelancer",
        image: "src/assets/images/IMG_9830.jpeg",
    },
    {
        id: 530139,
        name: "Harpreet Arora",
        gender: "Male",
        height: "5ft 11in",
        age: 30,
        country: "L******, Punjab , India",
        education: "B.Tech",
        job: "Mechanical Engineer - Canada",
        image: "src/assets/images/IMG_9808.jpeg",
    },
    {
        id: 530140,
        name: "Riya Verma",
        gender: "Female",
        height: "5ft 4in",
        age: 27,
        country: "L******, Punjab , India",
        education: "Ph.D",
        job: "Professor - UK",
        image: "src/assets/images/IMG_9808.jpeg",
    },
];

const Suggestions = () => {
    const [visibleCount, setVisibleCount] = useState(4);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const loadMore = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 4, suggestionsData.length));
    };

    return (
        <div className="flex flex-col items-center bg-gray-50 min-h-screen p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Profile Suggestions</h2>

            {/* Profile Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {suggestionsData.slice(0, visibleCount).map((person) => (
                    <Card
                        key={person.id}
                        className="w-full max-w-lg shadow-md rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-all"
                        bodyStyle={{ padding: 0 }}
                    >
                        <div className="flex items-center p-4 pr-10">
                            {/* Profile Image - Click to Enlarge */}
                            <Avatar
                                size={100}
                                src={person.image}
                                className="border border-gray-300 shadow-sm rounded-full cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
                                onClick={() => setSelectedImage(person.image)}
                            />

                            {/* Profile Details */}
                            <div className="flex flex-col space-y-1 pl-5 pr-8 w-full">
                                <h3 className="text-lg font-bold text-gray-900">{person.name}</h3>
                                <p className="text-gray-600 text-xs">👤 {person.gender} | {person.height} | {person.age} yrs</p>
                                <p className="text-gray-500 text-xs">🎓 {person.education}</p>
                                <p className="text-gray-700 text-sm font-medium">💼 {person.job}</p>
                                <p className="text-gray-500 text-xs">📍 {person.country}</p>

                                {/* Unlock Button - Styled */}
                                <Button className="mt-3 px-5 py-2 rounded-md shadow-md text-xs font-medium">
                                    Unlock
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Load More Button */}
            {visibleCount < suggestionsData.length && (
                <div className="mt-6">
                    <Button type="primary" size="large" onClick={loadMore} className="px-5 rounded-md shadow-md hover:shadow-lg transition-all">
                        Load More
                    </Button>
                </div>
            )}

            {/* Image Full-Screen Modal */}
            <Modal
                open={!!selectedImage}
                footer={null}
                centered
                onCancel={() => setSelectedImage(null)}
                className="flex items-center justify-center"
            >
                {selectedImage && (
                    <img src={selectedImage} alt="Profile" className="w-full h-auto rounded-lg" />
                )}
            </Modal>
        </div>
    );
};

export default Suggestions;
