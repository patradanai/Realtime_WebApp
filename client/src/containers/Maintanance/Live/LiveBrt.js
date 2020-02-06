import React, { useState, useEffect } from "react";
import { Segment, Input, Button, Pagination } from "semantic-ui-react";
import axios from "axios";
import moment from "moment";

const Livebrt = () => {
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

  useEffect(() => {
    setTimeout(() => {
      callBackHistory();
    }, 10000);
    // eslint-disable-next-line
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
    setPacket(() => {
      // eslint-disable-next-line
      return { ...packet }, res.data.recordset;
    });
  };

  const handleSearch = e => {
    setEventSearch(e.target.value);
  };

  const handlePage = (event, active) => {
    event.preventDefault();
    setPage(active.activePage);
  };
  return (
    <React.Fragment>
      <Segment.Group>
        <Segment>
          <div className="resync">
            <Button compact size="big" floated="left" onClick={callBackHistory}>
              Sync
            </Button>
          </div>
          <div className="label">
            <div className="search">
              <Input
                placeholder="Input Machine No. ( 401 )"
                onChange
                value={eventSearch}
                // eslint-disable-next-line
                onChange={handleSearch}
              />
            </div>
          </div>
        </Segment>
        <Segment secondary>
          <div className="listProblem">
            <pre>
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
                      แก้ไข {data.Action ? data.Action : "ไม่มีการบันทึกข้อมูล"}
                    </p>
                    <hr />
                  </div>
                );
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
    </React.Fragment>
  );
};

export default Livebrt;
