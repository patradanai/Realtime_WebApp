import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label
} from "recharts";

const BarLossCode = props => {
  return (
    <React.Fragment>
      <h4>Production by Break</h4>
      <BarChart
        width={500}
        height={330}
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
        <YAxis>
          <Label value="pcs" offset={-22} position="insideTop" />
        </YAxis>
        <Tooltip />
        <Legend />
        <Bar dataKey="D_Break1" stackId="a" fill="#8884d8" />
        <Bar dataKey="D_Break2" stackId="a" fill="#0088FE" />
        <Bar dataKey="D_Break3" stackId="a" fill="#00C49F" />
        <Bar dataKey="D_Break4" stackId="a" fill="#FFBB28" />
        <Bar dataKey="D_Break5" stackId="a" fill="blue" />
        <Bar dataKey="N_Break1" stackId="a" fill="#ff9933" />
        <Bar dataKey="N_Break2" stackId="a" fill="#669900" />
        <Bar dataKey="N_Break3" stackId="a" fill="#4d4dff" />
        <Bar dataKey="N_Break4" stackId="a" fill="#4d4dff" />
        <Bar dataKey="N_Break5" stackId="a" fill="#4d4dff" />
      </BarChart>
    </React.Fragment>
  );
};

export default BarLossCode;
