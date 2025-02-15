import { FaRegChartBar, FaUsers, FaMoneyBillAlt } from "react-icons/fa";
import CardComponent from "../../components/layout/CardComponent";
import RecentlyViewedClients from "../../components/layout/RecentlyViewedClients";
import ClientSubmissions from "../../components/layout/ClientSubmissions";
import RecentlySubmittedClients from "../../components/layout/RecentlySubmittedClients";

const cardData = [
  {
    title: "Clients Added Today",
    value: 12,
    icon: <FaRegChartBar />,
    chartColor: "#4CAF50",
    chartBackgroundColor: "rgba(76, 175, 80, 0.2)",
    gradientColorStart: "rgba(76, 175, 80, 0.6)",
    gradientColorEnd: "rgba(76, 175, 80, 0)",
    data: [{ value: 10 }, { value: 15 }, { value: 12 }, { value: 18 }, { value: 14 }, { value: 20 }],
  },
  {
    title: "Events Today",
    value: 10,
    icon: <FaUsers />,
    chartColor: "#2196F3",
    chartBackgroundColor: "rgba(33, 150, 243, 0.2)",
    gradientColorStart: "rgba(33, 150, 243, 0.6)",
    gradientColorEnd: "rgba(33, 150, 243, 0)",
    data: [{ value: 25 }, { value: 30 }, { value: 28 }, { value: 35 }, { value: 32 }, { value: 40 }],
  },
  {
    title: "Sent Emails Today",
    value: 10,
    icon: <FaMoneyBillAlt />,
    chartColor: "#FFC107",
    chartBackgroundColor: "rgba(255, 193, 7, 0.2)",
    gradientColorStart: "rgba(255, 193, 7, 0.6)",
    gradientColorEnd: "rgba(255, 193, 7, 0)",
    data: [{ value: 50 }, { value: 60 }, { value: 55 }, { value: 70 }, { value: 65 }, { value: 75 }],
  },
];

const recentlyViewedClientsData = [
  { name: "Imran", avatar: "", initials: "I" },
  { name: "Sohi", avatar: "", initials: "S" },
  { name: "Jeet", avatar: "", initials: "J" },
  { name: "Charn", avatar: "", initials: "C" },
  { name: "Taranjit", avatar: "", initials: "T" },
  { name: "Amarjit", avatar: "", initials: "A" },
  { name: "Smart", avatar: "", initials: "S" },
  { name: "Simran", avatar: "", initials: "S" },
  { name: "Krishn", avatar: "", initials: "K" },
  { name: "Alenri", avatar: "", initials: "A" },
  { name: "Mannik", avatar: "", initials: "M" },
  { name: "Mehak", avatar: "", initials: "M" },
];

const Overview = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <CardComponent key={index} {...card} />
        ))}
      </div>

      {/* Recently Viewed Clients */}
      <div className="mt-8">
        <RecentlyViewedClients clients={recentlyViewedClientsData} />
      </div>

      {/* Main Content Section */}
      <div className="mt-8 flex flex-col md:flex-row gap-6 items-stretch">
        <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-md">
          <ClientSubmissions />
        </div>
        <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-md">
          <RecentlySubmittedClients />
        </div>
      </div>
    </div>

  );
};

export default Overview;
