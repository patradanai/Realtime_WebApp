import React, { useEffect } from "react";
import { Header, Icon, Grid, Image } from "semantic-ui-react";
import Historymaintain from "./history/historyBRT";
import LiveBrt from "./Live/LiveBrt";
import "./Maintain.css";
import image from "../../Construction.png";
import { ws_disconnect } from "../../store/Actions";
import { useDispatch } from "react-redux";

const Maintain = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ws_disconnect());
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <div className="bodyContainer">
        <Header as="h2" icon>
          <Icon name="settings" />
          Maintanance
          <Header.Subheader>Manage your machine settings.</Header.Subheader>
        </Header>
        <div className="live">
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <h2>Live Chart</h2>
                <Image
                  src={image}
                  centered
                  verticalAlign="middle"
                  size="small"
                />
              </Grid.Column>
              <Grid.Column>
                <h2>BRT Problem</h2>
                <LiveBrt />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <hr />
        <Header as="h2" icon="plug" content="BRT History" />
        <Historymaintain />
      </div>
    </React.Fragment>
  );
};

export default Maintain;
