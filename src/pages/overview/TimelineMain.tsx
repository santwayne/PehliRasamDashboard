import { FaRegEdit } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { date: "4 Dec", value: 5 },
  { date: "7 Dec", value: 8 },
  { date: "10 Dec", value: 4 },
  { date: "13 Dec", value: 6 },
  { date: "16 Dec", value: 2 },
  { date: "19 Dec", value: 9 },
  { date: "22 Dec", value: 3 },
  { date: "25 Dec", value: 5 },
  { date: "28 Dec", value: 11 },
  { date: "31 Dec", value: 18 },
  { date: "3 Jan", value: 12 },
  { date: "6 Jan", value: 5 },
  { date: "9 Jan", value: 7 },
  { date: "12 Jan", value: 4 },
  { date: "15 Jan", value: 6 },
  { date: "18 Jan", value: 3 },
  { date: "21 Jan", value: 8 },
];

const TimelineMain = () => {
  const timelineData = [
    {
      time: "9:52 PM",
      text: "Pehl Rasam.com changed Profile Note to Amit +1 (438) 458-5288 warehouse 28-FEB-2025 : he sayig mea proceed krna meanu 15 days da time dedo he saying ea nri marriage beru ch invest kita c hun me toohde to karwana kamm HOT",
      link: "Amit",
      icon: <FaRegEdit className="text-pink-500 text-lg" />,
    },
    {
      time: "8:18 PM",
      text: "SmartMatchApp Client submitted",
      link: "Amit",
      icon: <IoInformationCircleOutline className="text-blue-500 text-lg" />,
    },
    {
      time: "8:18 PM",
      text: "Amit changed Marital Status to Separated on",
      link: "Amit",
      icon: <FaRegEdit className="text-pink-500 text-lg" />,
    },
    {
      time: "8:18 PM",
      text: "Amit changed Birthday (Age) to 01 Sep 2001 (23 years) on",
      link: "Amit",
      icon: <FaRegEdit className="text-pink-500 text-lg" />,
    },
    {
      time: "8:18 PM",
      text: "Amit changed Religion to Hindu on",
      link: "Amit",
      icon: <FaRegEdit className="text-pink-500 text-lg" />,
    },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-semibold">Timeline</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-gray-200 rounded text-gray-600 hover:bg-gray-300">{"<"}</button>
          <button className="px-3 py-1 bg-gray-200 rounded text-gray-600 hover:bg-gray-300">{">"}</button>
        </div>
      </div>

      {/* Graph Section */}
      <div className="w-full h-48 mt-4 bg-gray-50 p-4 rounded-lg shadow-md">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="date" stroke="#666" tick={{ fontSize: 12 }} />
            <YAxis stroke="#666" tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #ddd" }} />
            <Bar dataKey="value" fill="#007BFF" radius={[6, 6, 0, 0]} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          placeholder="Type to Search"
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Advanced Search</button>
      </div>

      {/* Client Name Badge */}
      <div className="mt-4">
        <span className="bg-gray-200 px-3 py-1 rounded-md text-gray-700 text-sm">Client: Amit</span>
      </div>

      {/* Timeline Date */}
      <h3 className="text-lg font-semibold mt-6">February 28, 2025</h3>

      {/* Timeline List */}
      <div className="mt-4 space-y-4">
        {timelineData.map((event, index) => (
          <div key={index} className="flex items-start gap-4">
            {event.icon}
            <p className="text-gray-700 text-sm">
              {event.text} <a href="#" className="text-blue-500 hover:underline">{event.link}</a>
            </p>
            <span className="text-gray-500 text-xs">{event.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineMain;
