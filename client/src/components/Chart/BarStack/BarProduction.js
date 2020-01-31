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
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

const BarLossCode = props => {
  const Break = [
    "D_Break1",
    "D_Break2",
    "D_Break3",
    "D_Break4",
    "D_Break5",
    "N_Break1",
    "N_Break2",
    "N_Break3",
    "N_Break4",
    "N_Break5"
  ];
  const colors = scaleOrdinal(schemeCategory10).range();
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
          <Label value="Kpcs" offset={-20} position="insideTop" />
        </YAxis>
        <Tooltip />
        <Legend />
        {Break.map((data, index) => {
          return <Bar dataKey={data} stackId="a" fill={colors[index % 20]} />;
        })}
      </BarChart>
    </React.Fragment>
  );
};

export default BarLossCode;
