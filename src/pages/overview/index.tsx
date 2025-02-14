import { FaRegChartBar, FaUsers, FaMoneyBillAlt } from "react-icons/fa";
import CardComponent from "../../components/layout/CardComponent";

const cardData = [
  {
    title: "Number of Sales",
    value: 12,
    icon: <FaRegChartBar />,
    chartColor: "#4CAF50",
    chartBackgroundColor: "rgba(76, 175, 80, 0.2)",
    gradientColorStart: "rgba(76, 175, 80, 0.6)",
    gradientColorEnd: "rgba(76, 175, 80, 0)",
    data: [{ value: 10 }, { value: 15 }, { value: 12 }, { value: 18 }, { value: 14 }, { value: 20 }],
  },
  {
    title: "Number of Clients",
    value: 10,
    icon: <FaUsers />,
    chartColor: "#2196F3",
    chartBackgroundColor: "rgba(33, 150, 243, 0.2)",
    gradientColorStart: "rgba(33, 150, 243, 0.6)",
    gradientColorEnd: "rgba(33, 150, 243, 0)",
    data: [{ value: 25 }, { value: 30 }, { value: 28 }, { value: 35 }, { value: 32 }, { value: 40 }],
  },
  {
    title: "Yearly Revenue",
    value: 10,
    icon: <FaMoneyBillAlt />,
    chartColor: "#FFC107",
    chartBackgroundColor: "rgba(255, 193, 7, 0.2)",
    gradientColorStart: "rgba(255, 193, 7, 0.6)",
    gradientColorEnd: "rgba(255, 193, 7, 0)",
    data: [{ value: 50 }, { value: 60 }, { value: 55 }, { value: 70 }, { value: 65 }, { value: 75 }],
  },
];

const Overview = () => {
  return (
    <div className="p-6 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <CardComponent key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Overview;
