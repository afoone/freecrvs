import React from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const randomColors = ["#8884d8", "#82ca9d", "#ffc658", "green", "lightblue"];

const StackedAreaChart = ({ data, differentVaccines }) => {
  if (!data || data.length < 1) return <div>loading</div>;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {differentVaccines.map((v, index) => (
          <Area
            key={index}
            type="monotone"
            dataKey={v}
            stackId="1"
            stroke={randomColors[index]}
            fill={randomColors[index]}
          />
        ))}

        <Legend></Legend>
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StackedAreaChart;
