import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datePicker.css";

const Picker = props => {
  return <DatePicker selected={props.selected} onChange={props.Change} />;
};

export default Picker;
