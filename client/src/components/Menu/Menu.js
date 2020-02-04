import React, { Component } from "react";
import { Menu, Container, Icon } from "semantic-ui-react";
import logo from "../../MyIcon.png";
import { Link } from "react-router-dom";
import "./Menu.css";

export default class MenuExampleStackable extends Component {
  render() {
    return (
      <Container>
        <div className="headerName">
          <h1>Production Realtime Management System</h1>
          <p></p>
        </div>
        <div className="MenuBar">
          <Menu stackable>
            <Menu.Item>
              <h2>MT700</h2>
            </Menu.Item>

            <Menu.Item name="Live Monitor">
              <Icon name="clipboard" />
              <Link to="/monitor">Live Monitor</Link>
            </Menu.Item>

            <Menu.Item name="Production">
              <Icon name="chart bar outline" />
              <Link to="/production">Production</Link>
            </Menu.Item>

            <Menu.Item name="BRT Management">
              <Icon name="edit" />
              <Link to="/brt">BRT Management</Link>
            </Menu.Item>

            <Menu.Item name="Maintanance">
              <Icon name="pencil alternate" />
              <Link to="/maintain">Maintanance</Link>
            </Menu.Item>

            <Menu.Item name="History">
              <Icon name="history" />
              <Link to="/history">History</Link>
            </Menu.Item>
          </Menu>
        </div>
      </Container>
    );
  }
}
