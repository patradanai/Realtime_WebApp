import React, { useState, useEffect } from "react";
import { Icon, Segment, Input, Pagination } from "semantic-ui-react";
import axios from "axios";
import moment from "moment";
import ReactdatePicker from "../../../components/datePicker/datePicker";
import "./historyBRT.css";

const HistoryBRT = props => {
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setfinishDate] = useState(new Date());
  const [hoverMouse, sethoverMouse] = useState(false);
  const [packet, setPacket] = useState([]);
  const [eventSearch, setEventSearch] = useState("");
  const [filterSearch, setfilterSearch] = useState([]);
  const [page, setPage] = useState(1);
  const [itemPage, setItemPage] = useState([]);
  const [perPage, setPerpage] = useState(10);

  useEffect(() => {
    console.log(packet);
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
      return { ...packet }, res.data.recordset;
    });
  };

  const handlePage = (event, active) => {
    event.preventDefault();
    setPage(active.activePage);
  };

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
              onClick={callBackHistory}
            />
          </span>
        </h4>
      </div>
      <div className="Table">
        <Segment.Group>
          <Segment>
            <div className="search">
              <Input
                placeholder="Input Machine No. ( 401 )"
                onChange
                value={eventSearch}
                onChange={event => setEventSearch(event.target.value)}
              />
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
                  }
                })}
              </pre>
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
