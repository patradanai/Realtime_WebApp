import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label
} from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import "./barOverview.css";

const barOverview = props => {
  const Machine = [
    "NMPSC-401",
    "NMPSC-402",
    "NMPSC-403",
    "NMPSC-404",
    "NMPSC-405",
    "NMPSC-406",
    "NMPSC-407",
    "NMPSC-408",
    "NMPSC-409"
  ];
  const colors = scaleOrdinal(schemeCategory10).range();
  return (
    <React.Fragment>
      <div className="Title">
        <h4>Production History</h4>
      </div>
      <ResponsiveContainer width="100%" aspect={8.0 / 3.0}>
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
          <YAxis>
            <Label value="pcs" offset={-20} position="insideTop" />
          </YAxis>
          <Tooltip />
          <Legend />
          {Machine.map((data, index) => {
            return <Bar dataKey={data} stackId="a" fill={colors[index % 20]} />;
          })}
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default barOverview;
