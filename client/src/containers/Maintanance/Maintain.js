import React, { useState, useEffect } from "react";
import { Header, Icon, Grid } from "semantic-ui-react";
import Historymaintain from "./history/historyBRT";
import LiveBrt from "./Live/LiveBrt";
import "./Maintain.css";

const Maintain = () => {
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
              <LiveBrt />
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
