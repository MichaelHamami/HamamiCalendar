  
// import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/react'
import _ from "lodash";
import moment from "moment";
import "./calander.css";

// import { TextField, Button, Typography, Paper, requirePropFactory } from '@material-ui/core';
// import Task from '../Tasks/Task/task';
// import { Grid, CircularProgress } from '@material-ui/core';
// import { Grid } from '@material-ui/core';

// import useStyles from './styles';

// const Calendar = ( ) => {
  export default class Calendar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        monthNames: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        today: moment(),
        current: moment().startOf("month").utc(true), //current position on calendar (first day of month)
      };
      
      this.lastMonth = this.lastMonth.bind(this);
      this.nextMonth = this.nextMonth.bind(this);
    }
//   const [monthNames, setMonthNames] = useState([
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ]);
// const [days, setDays] = useState(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
// const [today, setToday] = useState(moment());
// const [current, setCurrent] = useState(moment().startOf("month").utc(true));
// console.log(current.month());

    //sets current month to previous month
     lastMonth() {
      this.setState({ current: this.state.current.subtract(1, "months") });

      // setCurrent(current.subtract(1, "months"));
    }
  
    //sets current month to following month
     nextMonth() {
      this.setState({ current: this.state.current.add(1, "months") });

      // setCurrent(current.add(1, "months")); 
    }
  // const classes = useStyles();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  // };
  // const daysInMonth = (month, year) => { // Use 1 for January, 2 for February, etc.
  //   return new Date(year, month, 0).getDate();
  // };
  // const tasks = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
  // console.log(daysInMonth(4, 2021));
  // console.log(daysInMonth(5, 2021));
  // console.log(daysInMonth(6, 2021));
  // const gridStyle = {
  //   grid-template-columns: requirePropFactory(7,1fr),
  //   gr
  // }
  //  renderDays() {
  //   return days.map((x, i) => (
  //   // return days.map((x, i) => (
  //     <div
  //       className="day-name"
  //       key={"day-of-week-" + i}
  //       css={[{ borderColor: "LightGray" },
  //        _.get(this.props.styles, 'day', {})]}
  //     >
  //       {x}
  //     </div>
  //   ));
  // }

  render() {
    return (
    // <div>
    //   Calander
    // </div>
    <div
    className="calendar"
    css={[{
      fontSize: "18px",
      border: "1px solid",
      minWidth: "300px",
      position: "relative",
      borderColor: "LightGray",
      color: "#51565d",
      style: 'calender'

    },
    // , _.get(this.props.styles, 'calendar', {})
  ]}
  >
        <div className="calendar-header">
          <div
            className="calendar-navigate"
            onClick={this.lastMonth}
            >
            &#10094;
          </div>
          <div>
            <h2 className="calendar-title">
            {this.state.monthNames[this.state.current.month()] + " " + this.state.current.year()}
              {/* {monthNames[current.month()] + " " + current.year()} */}
            </h2>
          </div>
          <div
            className="calendar-navigate"
            onClick={this.nextMonth}
             >
            &#10095;
          </div>
        </div>
    </div>
  );
}
}