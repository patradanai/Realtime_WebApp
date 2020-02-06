import React, { useState, useEffect } from "react";
import { Icon, Segment, Input, Pagination, Table } from "semantic-ui-react";
import axios from "axios";
import moment from "moment";
import ReactdatePicker from "../../../components/datePicker/datePicker";
import "./historyBRT.css";

const HistoryBRT = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setfinishDate] = useState(new Date());
  const [hoverMouse, sethoverMouse] = useState(false);
  const [packet, setPacket] = useState([]);
  const [eventSearch, setEventSearch] = useState("");
  const [filterSearch, setfilterSearch] = useState([]);
  const [page, setPage] = useState(1);
  const [itemPage, setItemPage] = useState([]);
  // eslint-disable-next-line
  const [perPage, setPerpage] = useState(5);

  useEffect(() => {
    const result = packet.filter(data => {
      return data.Machine.includes(eventSearch);
    });
    setfilterSearch([...result]);
  }, [eventSearch, packet]);

  useEffect(() => {
    const result = filterSearch.slice(
      (page - 1) * perPage,
      (page - 1) * perPage + perPage
    );
    setItemPage([...result]);
  }, [filterSearch, page, perPage]);

  const callBackHistory = async () => {
    const res = await axios.get("/api/maintain/", {
      params: {
        startDate: moment(startDate).format("YYYY-MM-DD"),
        finishDate: moment(finishDate)
          .add(1, "days")
          .format("YYYY-MM-DD")
      }
    });
    setPacket(() => {
      // eslint-disable-next-line
      return { ...packet }, res.data.recordset;
    });
  };

  const handlePage = (event, active) => {
    event.preventDefault();
    setPage(active.activePage);
  };

  const handleSearch = event => {
    setEventSearch(event.target.value);
  };

  return (
    <React.Fragment>
      <div className="datePick">
        <span>
          <h4>From</h4>
        </span>
        <ReactdatePicker
          selected={startDate}
          Change={data => setStartDate(data)}
        />
        <span>
          <h4>To</h4>
        </span>
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
            onClick={callBackHistory}
          />
        </span>
      </div>
      <div className="Table">
        <Segment.Group>
          <Segment>
            <div className="search">
              <Input
                placeholder="Input Machine No. ( 401 )"
                onChange
                value={eventSearch}
                // eslint-disable-next-line
                onChange={handleSearch}
              />
            </div>
          </Segment>
          <Segment secondary>
            <div className="listProblem">
              <Table unstackable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>เวลาหยุด</Table.HeaderCell>
                    <Table.HeaderCell>เครื่อง</Table.HeaderCell>
                    <Table.HeaderCell>ปัญหา</Table.HeaderCell>
                    <Table.HeaderCell>Code</Table.HeaderCell>
                    <Table.HeaderCell>เวลาหยุด</Table.HeaderCell>
                    <Table.HeaderCell>แก้ไข</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {itemPage.map((data, index) => {
                    return (
                      <Table.Row key={index}>
                        <Table.Cell key={index + "timestop"}>
                          {moment(data.timedate, "YYYY-MM-DD hh:mm:ss")
                            .subtract(data.LossTime, "seconds")
                            .format("hh:mm A")}
                        </Table.Cell>
                        <Table.Cell key={index + "Machine"}>
                          {data.Machine}
                        </Table.Cell>
                        <Table.Cell key={index + "Problem"}>
                          {data.Problem ? data.Problem : "ไม่มีการบันทึกข้อมูล"}
                        </Table.Cell>
                        <Table.Cell key={index + "LossCode"}>
                          {data.LossCode}
                        </Table.Cell>
                        <Table.Cell key={index + "duration"}>
                          {moment
                            .utc(
                              moment
                                .duration(parseInt(data.LossTime), "second")
                                .asMilliseconds()
                            )
                            .format("mm:ss")}
                        </Table.Cell>
                        <Table.Cell key={index + "Action"}>
                          {data.Action ? data.Action : "ไม่มีการบันทึกข้อมูล"}
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
              {/* <pre>
                {itemPage.map((data, index) => {
                  return (
                    <div key={index}>
                      เวลา{" "}
                      {moment(data.timedate, "YYYY-MM-DD hh:mm:ss").format(
                        "hh:mm A"
                      )}{" "}
                      เครื่อง {data.Machine} ปัญหา{" "}
                      {data.Problem ? data.Problem : "ไม่มีการบันทึกข้อมูล"}{" "}
                      <p>
                        Code {data.LossCode} เวลาหยุด{" "}
                        {moment
                          .utc(
                            moment
                              .duration(parseInt(data.LossTime), "second")
                              .asMilliseconds()
                          )
                          .format("mm:ss")}{" "}
                        แก้ไข{" "}
                        {data.Action ? data.Action : "ไม่มีการบันทึกข้อมูล"}
                      </p>
                      <hr />
                    </div>
                  );
                })}
              </pre> */}
            </div>
            <div className="pagination">
              <Pagination
                defaultActivePage={1}
                firstItem={null}
                lastItem={null}
                pointing
                secondary
                totalPages={Math.ceil(filterSearch.length / perPage)}
                onPageChange={handlePage}
              />
            </div>
          </Segment>
        </Segment.Group>
      </div>
    </React.Fragment>
  );
};

export default HistoryBRT;
