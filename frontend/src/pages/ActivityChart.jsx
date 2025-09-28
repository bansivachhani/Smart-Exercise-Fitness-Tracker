import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ActivityChart({ data }) {
  const chartData = data.map((item) => ({
    day: item.date,       // use date for X-axis
    activity: item.ratio || 0, // ratio of task completion
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData} barSize={30}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="activity" fill="#6366f1" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
