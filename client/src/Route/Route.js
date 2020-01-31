import React from "react";
import { Switch, Route } from "react-router-dom";
import Todo from "../../src/containers/Todo";
import Maintain from "../containers/Maintanance/Maintain";
import History from "../containers/History";
import Production from "../../src/containers/Production/Production";
import Monitor from "../../src/containers/Monitor/Monitor";

const RoutePart = () => {
  return (
    <Switch>
      <Route path="/" component={Monitor} exact></Route>
      <Route path="/monitor" component={Monitor}></Route>
      <Route path="/brt" component={Todo}></Route>
      <Route path="/production" component={Production}></Route>
      <Route path="/maintain" component={Maintain}></Route>
      <Route path="/history" component={History}></Route>
    </Switch>
  );
};

export default RoutePart;
