import React, { useState, useEffect } from "react";
import { Header, Icon, Table, Pagination } from "semantic-ui-react";
import axios from "axios";
import "./index.css";
import moment from "moment";

const History = () => {
  const [handleText, sethandleText] = useState("");
  const [payload, setPayload] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [page, setPage] = useState(1);
  const [itempage, setItemPage] = useState(10);

  useEffect(() => {
    const updatePayload = [...payload];
    setFilterData(
      updatePayload.slice(
        (page - 1) * itempage,
        (page - 1) * itempage + itempage
      )
    );
  }, [payload]);

  useEffect(() => {
    const updatePayload = [...payload];
    setFilterData(
      updatePayload.slice(
        (page - 1) * itempage,
        (page - 1) * itempage + itempage
      )
    );
    console.log(filterData);
  }, [page]);

  const handleSearch = async e => {
    e.preventDefault();
    setPayload([]);
    try {
      const res = await axios.get("/api/history/", {
        params: {
          data: handleText
        }
      });
      setPayload([...res.data.recordset]);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePage = (event, activepage) => {
    event.preventDefault();
    setPage(activepage.activePage);
  };

  return (
    <React.Fragment>
      <Header as="h2" icon>
        <Icon name="history" />
        History
        <Header.Subheader>ค้นหา History จาก Lot, PartName</Header.Subheader>
      </Header>
      <div className="Input">
        <div className="ui huge action input">
          <input
            type="text"
            placeholder="Search..."
            onChange={e => sethandleText(e.target.value)}
            value={handleText}
          />
          <button
            className="ui button"
            onClick={e => handleSearch(e)}
            disabled={handleText.length > 0 ? false : true}
          >
            Search
          </button>
        </div>
      </div>
      <div className="Table">
        <Table color="red">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Lot No.</Table.HeaderCell>
              <Table.HeaderCell>Machine</Table.HeaderCell>
              <Table.HeaderCell>Block</Table.HeaderCell>
              <Table.HeaderCell>EmpCode</Table.HeaderCell>
              <Table.HeaderCell>OprCode</Table.HeaderCell>
              <Table.HeaderCell>Problem</Table.HeaderCell>
              <Table.HeaderCell>LossCode</Table.HeaderCell>
              <Table.HeaderCell>LossTime</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.HeaderCell>Details</Table.HeaderCell>
              <Table.HeaderCell>TimeDate</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filterData
              ? filterData.map((data, index) => {
                  return (
                    <Table.Row
                      key={index}
                      className={data.LossTime > 0 ? "error" : null}
                    >
                      <Table.Cell key={index + "Lot"}>{data.Lot}</Table.Cell>
                      <Table.Cell key={index + "Machine"}>
                        {data.Machine}
                      </Table.Cell>
                      <Table.Cell key={index + "Block"}>
                        {data.Block}
                      </Table.Cell>
                      <Table.Cell key={index + "Emp"}>
                        {data.EmpCode}
                      </Table.Cell>
                      <Table.Cell key={index + "Opr"}>
                        {data.OprCode}
                      </Table.Cell>
                      <Table.Cell key={index + "Problem"}>
                        {data.Problem}
                      </Table.Cell>
                      <Table.Cell key={index + "LossCode"}>
                        {data.LossCode}
                      </Table.Cell>
                      <Table.Cell key={index + "LossTime"}>
                        {data.LossTime > 0 ? Math.round(data.LossTime / 60) : 0}{" "}
                        นาที
                      </Table.Cell>
                      <Table.Cell key={index + "Action"}>
                        {data.Action}
                      </Table.Cell>
                      <Table.Cell key={index + "Details"}>
                        {data.Details}
                      </Table.Cell>
                      <Table.Cell key={index + "Timedate"}>
                        {moment(data.timedate).format("YYYY-MM-DD")}
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              : null}
          </Table.Body>
        </Table>
      </div>
      <div className="resultNav">
        Show {page * itempage - itempage} to {page * itempage} of{" "}
        {payload.length} entries
      </div>
      <div className="navigation">
        <Pagination
          boundaryRange={0}
          defaultActivePage={1}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          onPageChange={handlePage}
          totalPages={10}
        />
      </div>
    </React.Fragment>
  );
};

export default History;
