import React, { useEffect, useState } from "react";
import { Container, Header, Grid, Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import "./Production.css";
import ReactdatePicker from "../../components/datePicker/datePicker";
import axios from "axios";
import BarLossCode from "../../components/Chart/BarStack/BarLossCode";
import PopupGent from "./Popup";
import DetailPeriod from "../../components/Table/TableTime/tablePeriod";
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

  // HandleLossCode Chart
  useEffect(() => {
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
    const setTime = setInterval(() => {
      const updateChart = () => {
        setPacket(packet => {
          return (
            { ...packet },
            MachineName.map((data, index) => {
              return {
                name: data,
                SU: msgPacket[index].SU ? msgPacket[index].SU / 60 : 0,
                WS3: msgPacket[index].WS3 ? msgPacket[index].WS3 / 60 : 0,
                WS4: msgPacket[index].WS4 ? msgPacket[index].WS4 / 60 : 0,
                WR3: msgPacket[index].WR3 ? msgPacket[index].WR3 / 60 : 0,
                WR4: msgPacket[index].WR4 ? msgPacket[index].WR4 / 60 : 0,
                BM: msgPacket[index].BM ? msgPacket[index].BM / 60 : 0,
                RW: msgPacket[index].RW ? msgPacket[index].RW / 60 : 0,
                ST: msgPacket[index].ST ? msgPacket[index].ST / 60 : 0,
                SS: msgPacket[index].SS ? msgPacket[index].SS / 60 : 0,
                WO: msgPacket[index].WO ? msgPacket[index].WO / 60 : 0,
                OJ: msgPacket[index].OJ ? msgPacket[index].OJ / 60 : 0,
                CL: msgPacket[index].CL ? msgPacket[index].CL / 60 : 0,
                UC: msgPacket[index].UC ? msgPacket[index].UC / 60 : 0,
                CM: msgPacket[index].CM ? msgPacket[index].CM / 60 : 0,
                WP: msgPacket[index].WP ? msgPacket[index].WP / 60 : 0,
                MS: msgPacket[index].MS ? msgPacket[index].MS / 60 : 0,
                PM: msgPacket[index].PM ? msgPacket[index].PM / 60 : 0,
                WT: msgPacket[index].WT ? msgPacket[index].WT / 60 : 0,
                NP: msgPacket[index].NP ? msgPacket[index].NP / 60 : 0,
                Unknown: msgPacket[index].Unknown
                  ? msgPacket[index].Unknown / 60
                  : 0
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
  }, [msgPacket]);

  // HandleProduction Chart
  useEffect(() => {
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
    const getData = async () => {
      const res = await axios.get("/api/production/");
      setProduction(production => {
        return (
          { ...production },
          MachineName.map((data, index) => {
            return {
              name: data,
              D_Break1: res.data.recordset[index]["7_9"] / 1000,
              D_Break2:
                res.data.recordset[index]["9_12"] > 0
                  ? (res.data.recordset[index]["9_12"] -
                      res.data.recordset[index]["7_9"]) /
                    1000
                  : null,
              D_Break3:
                res.data.recordset[index]["12_14"] > 0
                  ? (res.data.recordset[index]["12_14"] -
                      res.data.recordset[index]["9_12"]) /
                    1000
                  : null,
              D_Break4:
                res.data.recordset[index]["14_16"] > 0
                  ? (res.data.recordset[index]["14_16"] -
                      res.data.recordset[index]["12_14"]) /
                    1000
                  : null,
              D_Break5:
                res.data.recordset[index]["16_19"] > 0
                  ? (res.data.recordset[index]["16_19"] -
                      res.data.recordset[index]["12_14"]) /
                    1000
                  : null,
              N_Break1: res.data.recordset[index]["19_21"] / 1000,
              N_Break2:
                res.data.recordset[index]["21_0"] > 0
                  ? (res.data.recordset[index]["21_0"] -
                      res.data.recordset[index]["19_21"]) /
                    1000
                  : null,
              N_Break3:
                res.data.recordset[index]["0_2"] > 0
                  ? (res.data.recordset[index]["0_2"] -
                      res.data.recordset[index]["21_0"]) /
                    1000
                  : null,
              N_Break4:
                res.data.recordset[index]["2_4"] > 0
                  ? (res.data.recordset[index]["2_4"] -
                      res.data.recordset[index]["0_2"]) /
                    1000
                  : null,
              N_Break5:
                res.data.recordset[index]["4_7"] > 0
                  ? (res.data.recordset[index]["4_7"] -
                      res.data.recordset[index]["2_4"]) /
                    1000
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

  // HandleOverview Chart
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
    <React.Fragment>
      <div className="bodyProduction">
        <Container>
          <Header as="h2" icon>
            <Icon name="chart bar" />
            Production
            <Header.Subheader>Manage your production</Header.Subheader>
          </Header>
          <br />
          <Header
            as="h2"
            icon="plug"
            content="Live Production Index Monitoring"
          />
          <Grid container columns={2}>
            <Grid.Column>
              <BarProduction data={production} />
              <Grid columns={1}>
                <Grid.Column>
                  <div className="TableTime">
                    <DetailPeriod />
                  </div>
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <BarLossCode data={packet} />
              <PopupGent />
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
      </div>
    </React.Fragment>
  );
};

export default Production;
