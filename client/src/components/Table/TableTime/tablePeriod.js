import React from "react";
import { Table } from "semantic-ui-react";

const tablePeriod = () => {
  return (
    <React.Fragment>
      <Table striped size="small" collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Break1</Table.HeaderCell>
            <Table.HeaderCell>Break2</Table.HeaderCell>
            <Table.HeaderCell>Break3</Table.HeaderCell>
            <Table.HeaderCell>Break4</Table.HeaderCell>
            <Table.HeaderCell>Break5</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Time Period</Table.Cell>
            <Table.Cell>
              07:00 - 09:00
              <br />
              19:00 - 21:00
              <br />
            </Table.Cell>
            <Table.Cell>
              9:00 - 12:00
              <br />
              21:00 - 00:00
              <br />
            </Table.Cell>
            <Table.Cell>
              12:00 - 14:00
              <br />
              21:00 - 00:00
              <br />
            </Table.Cell>
            <Table.Cell>
              14:00 - 16:00
              <br />
              02:00 - 04:00
              <br />
            </Table.Cell>
            <Table.Cell>
              16:00 - 19:00
              <br />
              04:00 - 07:00
              <br />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell colSpan="6" warning textAlign="center">
              D = Day , N = Night
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </React.Fragment>
  );
};

export default tablePeriod;
