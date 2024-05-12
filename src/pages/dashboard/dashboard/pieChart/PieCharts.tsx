import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import Container from "../../../../components/ui/Container";

const PieCharts = () => {
  <h1 className="text-xl">asjfdksadjfksdjk</h1>;
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <div className="items-center flex ">
        <h1>Hello Chart</h1>
        {/* <ResponsiveContainer width="100%" height="100%"> */}
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="200"
            cy="200"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          {/* <Pie
            dataKey="value"
            data={data02}
            cx={500}
            cy={200}
            innerRadius={40}
            outerRadius={80}
            fill="#82ca9d"
          /> */}
          <Tooltip />
        </PieChart>
        {/* </ResponsiveContainer> */}

        {/* <ResponsiveContainer width="100%" height="100%"> */}
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
        {/* </ResponsiveContainer> */}
      </div>
    </div>
  );
};

export default PieCharts;
