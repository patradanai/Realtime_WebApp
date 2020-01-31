import React from "react";
import { Header, Icon } from "semantic-ui-react";
import TimeSeries from "../../components/Chart/TimeSeries/TimeSeries";

const Maintain = () => {
  return (
    <Header as="h2" icon>
      <Icon name="settings" />
      Maintanance
      <Header.Subheader>Manage your machine settings.</Header.Subheader>
      <TimeSeries />
    </Header>
  );
};

export default Maintain;
