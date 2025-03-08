import { Mail, Phone, MapPin, Camera } from "lucide-react";

const Sidebar = () => {
    return (
        <div className="w-1/5 min-w-[250px] bg-white shadow-md p-4 flex flex-col items-center
            fixed md:relative md:h-screen h-screen overflow-y-auto z-50 transition-all">

            {/* Profile Image */}
            <div className="relative w-32 h-32 bg-yellow-500 rounded-md flex items-center justify-center">
                <Camera className="absolute bottom-2 right-2 bg-white p-1 rounded-full cursor-pointer" size={24} />
            </div>
            <h2 className="text-lg font-semibold mt-3">Lorence Chheena</h2>
            <p className="text-gray-500 text-sm">Middle Name Last Name</p>
            <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded mt-3">Actions ▼</button>

            {/* Contact Info */}
            <div className="mt-4 space-y-2 w-full text-gray-600">
                <div className="flex items-center space-x-2">
                    <Mail size={18} /> <span className="text-sm break-words">lorencechheena1234@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Phone size={18} /> <span className="text-sm">+1 123-456-7890</span>
                </div>
                <div className="flex items-center space-x-2">
                    <MapPin size={18} /> <span className="text-sm">Brampton, ON, Canada</span>
                </div>
            </div>

            <button className="bg-blue-500 text-white px-4 py-1 rounded mt-4">Set Location</button>
        </div>
    );
};

export default Sidebar;
