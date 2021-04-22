  
// import React, { useState, useEffect } from 'react';
import React from 'react';
import { css, jsx } from '@emotion/react'
import moment from "moment";
import "./weeklycalander.css";
// eslint-disable-next-line
import { TextField, Button } from '@material-ui/core';

// import { TextField, Button, Typography, Paper, requirePropFactory } from '@material-ui/core';
// import Task from '../Tasks/Task/task';
// import { Grid, CircularProgress } from '@material-ui/core';
// import { Grid } from '@material-ui/core';

// import useStyles from './styles';

  export default class WeeklyCalendar extends React.Component {
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
        current: moment().startOf("week").utc(true), //current position on calendar (first day of month)
      hours:[
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
      ]
      };
      
      this.lastWeek = this.lastWeek.bind(this);
      this.nextWeek = this.nextWeek.bind(this);
    }
    //sets current week to previous week
    lastWeek() {
      this.setState({ today: this.state.today.subtract(1, "week") });
    }
  
    //sets current week to following week
    nextWeek() {
      this.setState({ today: this.state.today.add(1, "week") });
    }
    renderHeader()
    {
      let start_day = this.state.today.startOf("week").toDate().getDate();
      let start_month = this.state.today.startOf("week").toDate().getMonth();
      let start_year = this.state.today.startOf("week").toDate().getFullYear();


      let end_day = this.state.today.endOf("week").toDate().getDate();
      let end_month = this.state.today.endOf("week").toDate().getMonth();
      let end_year = this.state.today.endOf("week").toDate().getFullYear();

      if(start_month !== end_month)
      {
        end_month = " - "+this.state.monthNames[end_month];
      }
      else{
        end_month ="";
      }
      if(end_year > start_year)
      {
        end_year = " - "+end_year;
      }
      else
      {
        end_year="";
      }
      start_month = this.state.monthNames[start_month];
      let header = start_day + " - " + end_day +" "+ start_month + end_month +" "+ start_year + end_year;
      return header;
    }

   renderDays() {
    return [<div className="day-name-header"> "Time"</div>, this.state.days.map((x, i) => (
    // return days.map((x, i) => (
      <div className="day-name-header"
        key={"day-of-week-" + i}>
        {x}
      </div>
    ))];
  }
  renderCells() {
    return [
      this.state.hours.map((hour,hour_index) => (
        [<div className="hour">
            {hour}
        </div>,
      this.state.days.map((day,day_index) => (
        <div
        className="cell"
        key={"cell " + day_index +" "+ hour_index}>
        day: {day} day_index:{day_index}
        <br></br>
        hour: {hour} hour_index:{hour_index}
      </div>
      ))
      ]))
    ];
  }
  renderHours() {
    return [
    // this.state.days.map((day,day_index) => (
    //   this.state.hours.map((hour,hour_index) => (
      this.state.hours.map((hour,hour_index) => (
        <div className="hour-list"
        key={"hour "+ hour_index}>
        hour: {hour}
      </div>
    ))
    ];
  }
  render() {
    return (
    <div
    className="weekly-calendar"
    css={[{
      fontSize: "18px",
      border: "1px solid",
      minWidth: "300px",
      position: "relative",
      borderColor: "LightGray",
      color: "#51565d",
    },
  ]}>  
      {/* start header */}
        <div className="calendar-header">
          <div
            className="calendar-navigate"
            onClick={this.lastWeek}
            >
            &#10094;
          </div>
          <div>
            <h2 className="calendar-title">
              {this.renderHeader()}
            </h2>
          </div>
          <div
            className="calendar-navigate"
            onClick={this.nextWeek}
             >
            &#10095;
          </div>
        {/* end of header */}
        </div>
        {/* <div className="hour-list">
          {this.renderHours()}
        </div>
        <div className="day-name-header">
          {this.renderDays()}
        </div> */}
        {/* start of body */}
        <div className="calendar-body">
          {this.renderDays()}
          {/* {this.renderHours()} */}
          {this.renderCells()}
        {/* end of body */}
        </div>
    {/* end of calender */}
    </div>
  );
}
}