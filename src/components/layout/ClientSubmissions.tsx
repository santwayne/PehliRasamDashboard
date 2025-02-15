import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "5 Feb", value: 0 },
  { date: "7 Feb", value: 1 },
  { date: "9 Feb", value: 3 },
  { date: "11 Feb", value: 2 },
  { date: "13 Feb", value: 4 },
  { date: "15 Feb", value: 2.5 }
];

const ClientSubmissions = () => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Client Submissions</h2>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <defs>
            <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="green" stopOpacity={0.8} />
              <stop offset="95%" stopColor="green" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="value" stroke="green" fillOpacity={1} fill="url(#colorGreen)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClientSubmissions;
