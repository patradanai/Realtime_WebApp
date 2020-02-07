import React from "react";
import { Table } from "semantic-ui-react";
import "./Monitor.css";

const Live = props => {
  return (
    <Table.Row className="Table">
      <Table.Cell className="">{props.Name}</Table.Cell>
      <Table.Cell
        className={
          props.Status === "PRODUCTION"
            ? "normal"
            : props.Status === "STOP"
            ? "alert"
            : ""
        }
      >
        {props.Status}
      </Table.Cell>
      <Table.Cell className="">{props.Target}</Table.Cell>
      <Table.Cell className="">{props.Result}</Table.Cell>
      <Table.Cell className="">{props.Good}</Table.Cell>
      <Table.Cell className="">{props.NG}</Table.Cell>
      <Table.Cell
        className={props.Diff <= 0 ? "alert" : props.Diff > 0 ? "normal" : ""}
      >
        {props.Diff}
      </Table.Cell>
      <Table.Cell className="">{props.LossCode}</Table.Cell>
      <Table.Cell className="">{props.Elasp}</Table.Cell>
      <Table.Cell className="">{props.Details}</Table.Cell>
      <Table.Cell className="">{props.Operator}</Table.Cell>
      <Table.Cell className="">{props.Maintanance}</Table.Cell>
    </Table.Row>
  );
};

export default Live;
