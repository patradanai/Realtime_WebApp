import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Grid,
  Icon,
  Dimmer,
  Segment,
  Loader,
  Image
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import "./Production.css";
import ReactdatePicker from "../../components/datePicker/datePicker";
import axios from "axios";
import BarLossCode from "../../components/Chart/BarStack/BarLossCode";
import BarProduction from "../../components/Chart/BarStack/BarProduction";
import BarOverview from "../../components/Chart/barOverview/barOverview";
import moment from "moment";
import {
  ws_connect,
  ws_connected,
  ws_disconnect,
  ws_disconnected,
  ws_onProduction
} from "../../store/Actions";

const Production = () => {
  const dispatch = useDispatch();
  const msgPacket = useSelector(state => state.MQTT.msgProduction);
  const [packet, setPacket] = useState([]);
  const [production, setProduction] = useState([]);
  const [overview, setOverView] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setfinishDate] = useState(new Date());
  const [hoverMouse, sethoverMouse] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const MachineName = [
    "C401",
    "C402",
    "C403",
    "C404",
    "C405",
    "C406",
    "C407",
    "C408",
    "C409"
  ];
  useEffect(() => {
    setTimeout(() => {
      dispatch(ws_connect());
      dispatch(ws_connected());
      dispatch(ws_onProduction());
    }, 2000);
    return () => {
      dispatch(ws_disconnect());
      dispatch(ws_disconnected());
    };
  }, [dispatch]);

  useEffect(() => {
    const setTime = setInterval(() => {
      const updateChart = () => {
        setPacket(packet => {
          return (
            { ...packet },
            MachineName.map((data, index) => {
              return {
                name: data,
                SU: msgPacket[index].SU,
                WS3: msgPacket[index].WS3,
                WS4: msgPacket[index].WS4,
                WR3: msgPacket[index].WR3,
                WR4: msgPacket[index].WR4,
                BM: msgPacket[index].BM,
                RW: msgPacket[index].RW,
                ST: msgPacket[index].ST,
                SS: msgPacket[index].SS,
                WO: msgPacket[index].WO,
                OJ: msgPacket[index].OJ,
                CL: msgPacket[index].CL,
                UC: msgPacket[index].UC,
                CM: msgPacket[index].CM,
                WP: msgPacket[index].WP,
                MS: msgPacket[index].MS,
                PM: msgPacket[index].PM,
                WT: msgPacket[index].WT,
                NP: msgPacket[index].NP,
                Unknown: msgPacket[index].Unknown
              };
            })
          );
        });
      };
      updateChart();
    }, 2000);
    return () => {
      clearInterval(setTime);
    };
  }, [MachineName, msgPacket]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/production/");
      setProduction(production => {
        return (
          { ...production },
          MachineName.map((data, index) => {
            return {
              name: data,
              D_Break1: res.data.recordset[index]["7_9"],
              D_Break2:
                res.data.recordset[index]["9_12"] > 0
                  ? res.data.recordset[index]["9_12"] -
                    res.data.recordset[index]["7_9"]
                  : null,
              D_Break3:
                res.data.recordset[index]["12_14"] > 0
                  ? res.data.recordset[index]["12_14"] -
                    res.data.recordset[index]["9_12"]
                  : null,
              D_Break4:
                res.data.recordset[index]["14_16"] > 0
                  ? res.data.recordset[index]["14_16"] -
                    res.data.recordset[index]["12_14"]
                  : null,
              D_Break5:
                res.data.recordset[index]["16_19"] > 0
                  ? res.data.recordset[index]["16_19"] -
                    res.data.recordset[index]["12_14"]
                  : null,
              N_Break1: res.data.recordset[index]["19_21"],
              N_Break2:
                res.data.recordset[index]["21_0"] > 0
                  ? res.data.recordset[index]["21_0"] -
                    res.data.recordset[index]["19_21"]
                  : null,
              N_Break3:
                res.data.recordset[index]["0_2"] > 0
                  ? res.data.recordset[index]["0_2"] -
                    res.data.recordset[index]["21_0"]
                  : null,
              N_Break4:
                res.data.recordset[index]["2_4"] > 0
                  ? res.data.recordset[index]["2_4"] -
                    res.data.recordset[index]["0_2"]
                  : null,
              N_Break5:
                res.data.recordset[index]["4_7"] > 0
                  ? res.data.recordset[index]["4_7"] -
                    res.data.recordset[index]["2_4"]
                  : null
            };
          })
        );
      });
    };

    const setIntervalTime = setInterval(() => {
      getData();
    }, 5000);
    return () => {
      clearInterval(setIntervalTime);
    };
  }, []);

  const handleOverview = async () => {
    try {
      const res = await axios.get("/api/production/overview/", {
        params: {
          startDate: moment(startDate).format("YYYY-MM-DD"),
          finishDate: moment(finishDate).format("YYYY-MM-DD")
        }
      });
      setOverView(res.data);
      setShowOverview(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <br />
      <Header as="h2" icon="plug" content="Live Production Index Monitoring" />
      <Grid container columns={2}>
        <Grid.Column>
          <BarLossCode data={packet} />
        </Grid.Column>
        <Grid.Column>
          <BarProduction data={production} />
          <Grid columns={1}>
            <Grid.Column>
              <h5>รายละเอียด</h5>
              <h6>D = Day , N = Night</h6>
              <ul>
                <li>Break1 : 7:00 - 9:00, 19:00 - 21:00</li>
                <li>Break2 : 9:00 - 12:00. 21:00 - 00:00</li>
                <li>Break3 : 12:00 - 14:00, 00:00 - 02:00</li>
                <li>Break4 : 14:00 - 16:00, 02:00 - 04:00</li>
                <li>Break5 : 16:00 - 19:00, 04:00 - 07:00</li>
              </ul>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
      <br />
      <hr />
      <Header as="h2" icon="settings" content="Production Index History" />
      <br />
      <div className="datePicker">
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
              onClick={handleOverview}
            />
          </span>
        </h4>
      </div>
      <div className="barOverview">
        {showOverview ? <BarOverview data={overview} /> : null}
      </div>
    </Container>
  );
};

export default Production;
