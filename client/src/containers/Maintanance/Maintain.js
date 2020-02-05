import React, { useState, useEffect } from "react";
import {
  Header,
  Icon,
  Grid,
  Segment,
  Input,
  Button,
  Pagination
} from "semantic-ui-react";
import Historymaintain from "./history/historyBRT";
import axios from "axios";
import moment from "moment";
import LiveBrt from "./Live/LiveBrt";
import "./Maintain.css";

const Maintain = () => {
  const [packet, setPacket] = useState([]);
  const [eventSearch, setEventSearch] = useState("");
  const [filterSearch, setfilterSearch] = useState([]);
  const [page, setPage] = useState(1);
  const [itemPage, setItemPage] = useState([]);
  const [perPage, setPerpage] = useState(10);

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
  }, [filterSearch, page]);

  useEffect(() => {
    // const timer = setInterval(() => {
    //   callBackHistory();
    // }, 5000);
    // return () => {
    //   clearInterval(timer);
    // };
  }, []);

  const callBackHistory = async () => {
    const res = await axios.get("/api/maintain/", {
      params: {
        startDate: moment(Date.now()).format("YYYY-MM-DD"),
        finishDate: moment(Date.now())
          .add(1, "days")
          .format("YYYY-MM-DD")
      }
    });
    setPacket([...res.data.recordset]);
    console.log(res);
  };

  const handlePage = (event, active) => {
    event.preventDefault();
    setPage(active.activePage);
  };

  return (
    <React.Fragment>
      <div className="bodyContainer">
        <Header as="h2" icon>
          <Icon name="settings" />
          Maintanance
          <Header.Subheader>Manage your machine settings.</Header.Subheader>
        </Header>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <h2>Live Chart</h2>
            </Grid.Column>
            <Grid.Column>
              <h2>BRT Problem</h2>
              <Segment.Group>
                <Segment>
                  <div className="resync">
                    <Button
                      compact
                      size="big"
                      floated="left"
                      onClick={callBackHistory}
                    >
                      Sync
                    </Button>
                  </div>
                  <div className="label">
                    <div className="search">
                      <Input
                        placeholder="Input Machine No. ( 401 )"
                        onChange
                        value={eventSearch}
                        onChange={event => setEventSearch(event.target.value)}
                      />
                    </div>
                  </div>
                </Segment>
                <Segment secondary>
                  <div className="listProblem">
                    <pre>
                      {itemPage.map((data, index) => {
                        {
                          return (
                            <div key={index}>
                              เวลา{" "}
                              {moment(
                                data.timedate,
                                "YYYY-MM-DD hh:mm:ss"
                              ).format("hh:mm A")}{" "}
                              เครื่อง {data.Machine} ปัญหา{" "}
                              {data.Problem
                                ? data.Problem
                                : "ไม่มีการบันทึกข้อมูล"}{" "}
                              <p>
                                Code {data.LossCode} เวลาหยุด{" "}
                                {moment
                                  .utc(
                                    moment
                                      .duration(
                                        parseInt(data.LossTime),
                                        "second"
                                      )
                                      .asMilliseconds()
                                  )
                                  .format("mm:ss")}{" "}
                                แก้ไข{" "}
                                {data.Action
                                  ? data.Action
                                  : "ไม่มีการบันทึกข้อมูล"}
                              </p>
                              <hr />
                            </div>
                          );
                        }
                      })}
                    </pre>
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
                  </div>
                </Segment>
              </Segment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <hr />
        <Historymaintain />
      </div>
    </React.Fragment>
  );
};

export default Maintain;
