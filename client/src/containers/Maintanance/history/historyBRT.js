import React, { useState } from "react";
import { Icon, Table, Segment } from "semantic-ui-react";
import axios from "axios";
import ReactdatePicker from "../../../components/datePicker/datePicker";
import "./historyBRT.css";

const HistoryBRT = props => {
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setfinishDate] = useState(new Date());
  const [hoverMouse, sethoverMouse] = useState(false);
  const [datahistory, setdataHistory] = useState([]);

  const Requesthistory = async () => {
    try {
      const res = await axios.get("/api/maintain/", {
        params: {
          stateDate: startDate,
          finishDate: finishDate
        }
      });
      console.log(res);
      setdataHistory([...res.data.recordset]);
    } catch (err) {
      console.log(err);
    }
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
              onClick={Requesthistory}
            />
          </span>
        </h4>
      </div>
      <div className="Table">
        <Segment.Group>
          <Segment>
            <h1>TEST</h1>
          </Segment>
          <Segment secondary>
            <h1>TEST</h1>
          </Segment>
        </Segment.Group>
      </div>
    </React.Fragment>
  );
};

export default HistoryBRT;
