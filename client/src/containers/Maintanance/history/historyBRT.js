import React, { useState } from "react";
import { Icon, Table } from "semantic-ui-react";
import ReactdatePicker from "../../../components/datePicker/datePicker";
import "./historyBRT.css";

const HistoryBRT = props => {
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setfinishDate] = useState(new Date());
  const [hoverMouse, sethoverMouse] = useState(false);
  return (
    <React.Fragment>
      <div className="datePick">
        <h4>
          <span>From</span>
          <ReactdatePicker
            selected={startDate}
            Change={data => setStartDate(data)}
          />
          <span>To</span>
          <ReactdatePicker
            selected={finishDate}
            Change={data => setfinishDate(data)}
          />
          <span className="Icon">
            <Icon
              name="refresh"
              className={hoverMouse ? "loading" : "null"}
              size="big"
              onMouseEnter={() => sethoverMouse(true)}
              onMouseLeave={() => sethoverMouse(false)}
            />
          </span>
        </h4>
      </div>
      <div className="Table">
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Notes</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row negative>
              <Table.Cell>Jill</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>None</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default HistoryBRT;
