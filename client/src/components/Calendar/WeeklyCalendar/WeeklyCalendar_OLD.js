  
// import React, { useState, useEffect } from 'react';
import React from 'react';
import moment from "moment";
import "./weeklycalander_old.css";
// eslint-disable-next-line
import { TextField, Button } from '@material-ui/core';
import * as api from '../../../api/index';
import WeeklyCellTask from './WeeklyCellTask/WeeklyCellTask';
import WeeklyTaskModal from './WeeklyTaskModal/WeeklyTaskModal';
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
      ],
      tasks: this.getWeekTasks(moment(moment().startOf("week").toDate()).format('YYYY-MM-DD')),
      tasks0:[],tasks1:[],tasks2:[],tasks3:[],tasks4:[], tasks5:[],tasks6:[],tasks7:[],
      tasksArray:{},
      modalOpened:"asdasdas"
    };
      
      this.lastWeek = this.lastWeek.bind(this);
      this.nextWeek = this.nextWeek.bind(this);
      this.getWeekTasks = this.getWeekTasks.bind(this);
      this.orderTasksByDaysToEachArray = this.orderTasksByDaysToEachArray.bind(this);
      this.check = this.check.bind(this);


    }
     toggleModal(){
      this.setState(prevState => ({ modalOpened: !prevState.modalOpened }));
    }
    getWeekTasks(start_week) {
      // var start_week = this.state.today.startOf("week").toDate();
      console.log(start_week);
      api.getWeekTasks(start_week).then((result) => {
        this.setState({ tasks: result.data });
        this.orderTasksByDaysToEachArray(result.data);
      });
    }
    orderTasksByDaysToEachArray(tasks) {
      var tasks_days = {
        tasks1:[],
        tasks2:[],
        tasks3:[],
        tasks4:[],
        tasks5:[],
        tasks6:[],
        tasks7:[],
      };
      tasks.forEach((task)=>{
        var day = moment(task.startDate).toDate().getUTCDay();

        if(day === 1) tasks_days.tasks1.push(task);
        if(day === 2) tasks_days.tasks2.push(task);
        if(day === 3) tasks_days.tasks3.push(task);
        if(day === 4) tasks_days.tasks4.push(task);
        if(day === 5) tasks_days.tasks5.push(task);
        if(day === 6) tasks_days.tasks6.push(task);
        if(day === 7) tasks_days.tasks7.push(task);
      });
      console.log(tasks_days);
      // id={day_index + " "+hour_index}
      if(tasks.length !== 0)
      {
        var day_index = moment(tasks[0].startDate).toDate().getUTCDay();
        // var id = day_index+" "+"01:00";
        var id =`${day_index} 01:00`;
        console.log(id);
        var div = document.getElementById(id);
        console.log(div);
        // removing elements but not text
        // while (div.lastElementChild) {
        //   div.removeChild(div.lastElementChild);
        // }
      }



    }
    renderModal()
    {
      console.log("render Modal called");
      // eslint-disable-next-line
    {/* this.state.modalOpened ? <WeeklyTaskModal toggle={this.togglePop} /> : null */}
      if(this.state.tasks?.length)
      {
        console.log("trying to open modal");
        return <WeeklyTaskModal task={this.state.tasks[0]} />;
      }
      else
      {
        return null;
      }
    }
      //sets current week to previous week
    lastWeek() {
      console.log(this.state.tasks);

      this.setState({ today: this.state.today.subtract(1, "week") });
      this.getWeekTasks(this.state.today.format('YYYY-MM-DD'));

    }
    //sets current week to following week
    nextWeek() {
      console.log(this.state.tasks);
      this.setState({ today: this.state.today.add(1, "week") });
      this.getWeekTasks(this.state.today.format('YYYY-MM-DD'));
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
    return [
    <div className="day-name-header" key="s">"Time"</div>, 
    this.state.days.map((x, i) => (
      <div className="day-name-header"
        key={"day-of-week-" + i}>
        {x}
      </div>
    ))
  ];
  }
  check(id) {
    console.log("check called id:"+id);
  }
  renderCells(tasksEachHourAndDay) {
    return [
      this.state.hours.map((hour,hour_index) => (
        [<div className="hour"
            key={"hour"}>
            {hour}
        </div>,
      this.state.days.map((day,day_index) => (
        <div
        className="cell"
        // id={day_index + " "+hour}
        id={`${day_index} ${hour}`}
        key={"cell-" + day_index +" "+ hour}
        // onClick={this.check}
        // onClick="click(shalom)"
        // onClick= {() => this.check(day_index+" "+hour)}
        onClick= {() => this.check(`${day_index} ${hour}`)}


        // onClick={this.check("cell-" + day_index +" "+ hour)}
        >
        {/* day: {day} day_index:{day_index}
        hour: {hour} hour_index:{hour_index} */}
        {this.state.tasks?.length? <WeeklyCellTask task={this.state.tasks[0]}/> : "No Task"}
        {/* day: {day} <br></br>
        hour: {hour} */}
        {/* <div className="text cell">
        day: {day} <br></br>
        hour: {hour}
        </div> */}
      </div>
      ))
      ]))
    ];
  }
  // renderHours() {
  //   return [
  //   // this.state.days.map((day,day_index) => (
  //   //   this.state.hours.map((hour,hour_index) => (
  //     this.state.hours.map((hour,hour_index) => (
  //       <div className="hour-list"
  //       key={"hour "+ hour_index}>
  //       hour: {hour}
  //     </div>
  //   ))
  //   ];
  // }
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
          {this.renderModal()}

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
          {/* {this.state.modalOpened ? <WeeklyTaskModal toggle={this.togglePop} /> : null} */}

        {/* end of body */}
        </div>
        {/* {this.renderModal()} */}

    {/* end of calender */}
    </div>
  );
}
}