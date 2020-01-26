import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const barOverview = props => {
  return (
    <React.Fragment>
      <BarChart
        width={800}
        height={350}
        data={props.data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="NMPSC-401" stackId="a" fill="#8884d8" />
        <Bar dataKey="NMPSC-402" stackId="a" fill="#8884d8" />
        <Bar dataKey="NMPSC-403" stackId="a" fill="#8884d8" />
        <Bar dataKey="NMPSC-404" stackId="a" fill="#8884d8" />
        <Bar dataKey="NMPSC-405" stackId="a" fill="#8884d8" />
        <Bar dataKey="NMPSC-406" stackId="a" fill="#8884d8" />
        <Bar dataKey="NMPSC-407" stackId="a" fill="#8884d8" />
        <Bar dataKey="NMPSC-408" stackId="a" fill="#8884d8" />
        <Bar dataKey="NMPSC-409" stackId="a" fill="#8884d8" />
      </BarChart>
    </React.Fragment>
  );
};

export default barOverview;
