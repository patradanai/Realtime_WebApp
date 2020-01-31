import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer
} from "recharts";

const TimeSeries = props => {
  return (
    <React.Fragment>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
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
            <Label value="" offset={-20} position="insideTop" />
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="SU" stackId="a" fill="#8884d8" />
          <Bar dataKey="WS3" stackId="a" fill="#0088FE" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default TimeSeries;
