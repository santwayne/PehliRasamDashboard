const Header = () => {
    const topTabs = ["Timeline", "Profile", "Matching", "Photos", "Events"];
    const bottomTabs = ["Communication", "Videos", "Finances", "Files", "Reminders", "Tasks", "Surveys", "Notes"];

    return (
        <div className="sticky top-0 bg-white shadow-md py-6 px-6 flex flex-col justify-between items-center z-10 border-b border-gray-200">
            {/* Top Row */}
            <div className="flex gap-6 text-gray-700 font-semibold">
                {topTabs.map((tab, index) => (
                    <div key={index} className="cursor-pointer hover:text-blue-600 transition">
                        {tab}
                    </div>
                ))}
            </div>

            {/* Bottom Row */}
            <div className="flex gap-6 text-gray-700 font-semibold mt-4">
                {bottomTabs.map((tab, index) => (
                    <div key={index} className="cursor-pointer hover:text-blue-600 transition">
                        {tab}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Header;
