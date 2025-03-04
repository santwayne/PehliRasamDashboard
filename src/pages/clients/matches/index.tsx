import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaUserPlus, FaList } from "react-icons/fa";

const index = () => {
  const [activeTab, setActiveTab] = useState("matches");
  const [expandedSections, setExpandedSections] = useState(["active"]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Tabs Navigation */}
      <div className="flex border-b mb-6 bg-white p-4 rounded-lg shadow">
        {[
          { name: "Matches", icon: <FaList /> },
          { name: "Suggestions", icon: <FaUserPlus /> }
        ].map((tab) => (
          <button
            key={tab.name}
            className={`flex items-center gap-2 px-6 py-2 text-sm font-medium rounded-lg transition ${
              activeTab === tab.name.toLowerCase()
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab.name.toLowerCase())}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </div>

      {/* Page Content */}
      {activeTab === "matches" && (
        <MatchesPage
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        />
      )}
      {activeTab === "suggestions" && <SuggestionsPage />}
    </div>
  );
};

// Matches Page
const MatchesPage = ({ expandedSections, toggleSection }: any) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Successful Matches */}
      <div className="border-b pb-3">
        <h3 className="text-gray-600 text-lg font-semibold">
          Successful Matches (0)
        </h3>
        <p className="text-gray-400 text-sm">No matches yet</p>
      </div>

      {/* Active Introductions */}
      <ExpandableSection
        title="Active Introductions"
        count={1}
        isExpanded={expandedSections.includes("active")}
        onToggle={() => toggleSection("active")}
      >
        <MatchCard name="Gagan" date="27 Feb 2025 8:15 AM" addedBy="Pehli Rasam.com" />
      </ExpandableSection>

      {/* Other Sections */}
      {["Potential Introductions", "Past Introductions"].map((section) => (
        <ExpandableSection
          key={section}
          title={section}
          count={0}
          isExpanded={expandedSections.includes(section)}
          onToggle={() => toggleSection(section)}
        >
          <p className="text-gray-500 text-sm">No matches</p>
        </ExpandableSection>
      ))}
    </div>
  );
};

// Suggestions Page
const SuggestionsPage = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow text-gray-700">
      <h2 className="text-xl font-semibold mb-4">Suggestions</h2>
      <p>Here you will see suggested matches based on preferences.</p>
    </div>
  );
};


// Expandable Section Component
const ExpandableSection = ({ title, count, isExpanded, onToggle, children }: any) => {
  return (
    <div className="mt-4">
      <button
        className="w-full flex justify-between items-center p-3 text-left bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        onClick={onToggle}
      >
        <span className="font-semibold text-gray-700">{title} ({count})</span>
        {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>

      {isExpanded && <div className="p-4 bg-white border rounded">{children}</div>}
    </div>
  );
};

// Match Card Component
const MatchCard = ({ name, date, addedBy }: any) => {
  return (
    <div className="mt-3 p-4 bg-gray-50 rounded-lg border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full border"
          />
          <span className="text-blue-600 font-semibold">{name}</span>
        </div>
        <span className="text-gray-400 text-sm">Match Details</span>
      </div>

      <div className="mt-3 text-sm text-gray-600">
        <div className="flex justify-between border-b py-2">
          <span>Match Status:</span>
          <span className="text-blue-500">No Status</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span>Due Date:</span>
          <span className="text-blue-500 cursor-pointer">Click to add</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span>Client Status:</span>
          <span className="text-blue-500">No Status</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span>Match Priority:</span>
          <span className="text-blue-500 cursor-pointer">Click to add</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span>Added:</span>
          <span>{date}</span>
        </div>
        <div className="flex justify-between py-2">
          <span>Added By:</span>
          <span>{addedBy}</span>
        </div>
      </div>
    </div>
  );
};

export default index;
