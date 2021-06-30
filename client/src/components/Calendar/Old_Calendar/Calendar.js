// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import _ from "lodash";
import moment from "moment";
import "./calander.css";
// eslint-disable-next-line
import { TextField, Button } from '@material-ui/core';

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
   renderDays() {
    return this.state.days.map((x, i) => (
    // return days.map((x, i) => (
      <div className="day-name"
      key={"day-of-week-" + i}>
        {x}
      </div> 
      ));
  }
  
  renderDates(eventsEachDay) {
    var days = [...Array(this.state.current.daysInMonth() + 1).keys()].slice(1); // create array from 1 to number of days in month

    var dayOfWeek = this.state.current.day(); //get day of week of first day in the month

    var padDays = (((-this.state.current.daysInMonth() - this.state.current.day()) % 7) + 7) % 7; //number of days to fill out the last row    

    return [
      [...Array(dayOfWeek)].map((x, i) => (
        <div
          className="day"
          key={"empty-day-" + i}
          // css={_.get(this.props.styles, 'day', {})}
        ></div>
      )),
      days.map(x => {
        if (x === this.state.today.date() && this.state.current.isSame(this.state.today, "month")) {
          return (
            // The today block
            <div
              className="day"
              key={"day-" + x}
              // css={[_.get(this.props.styles, 'day', {}), _.get(this.props.styles, 'today', {})]}
            >
              <span
                css={{
                  paddingRight: '6px',
                }}
              >
                {x}
              </span>
              <div className="innerDay" id={"day-" + x}>

                {/* {eventsEachDay[x - 1]} */}
                </div>
            </div>
          );
        } else {
          // The not today block
          return (
            <div
              className="day"
              key={"day-" + x}
              // css={_.get(this.props.styles, 'day', {})}
            >
              <span
                css={{
                  paddingRight: '6px',
                }}
              >
                {x}
              </span>
              <div className="innerDay" id={"day-" + x}>
              <Button className="bdelete" variant="contained"    
              // style={{height: '10px', width : '1px'}}
              size="small">+</Button>

                {/* {eventsEachDay[x - 1]} */}
                </div>
            </div>
          );
        }
      }),
      [...Array(padDays)].map((x, i) => (
        <div
          className="day"
          key={"empty-day-2-" + i}
          css={_.get(this.props.styles, 'day', {})}
        ></div>
      ))
    ];
  }
  render() {
    return (
    // <div>
    //   Calander
    // </div>
    // calendar
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
      {/* start header */}
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
        {/* end of header */}
        </div>
        {/* start of body */}
        <div className="calendar-body">
          {this.renderDays()}
          {this.renderDates()}
        {/* end of body */}
        </div>
    {/* end of calender */}
    </div>
  );
}
}