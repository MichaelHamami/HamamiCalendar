import React, { useState, useEffect } from "react";
// eslint-disable-next-line
// import {
//   Card,
//   CardActions,
//   CardContent,
//   Button,
//   Typography,
//   Avatar,
// } from "@material-ui/core/";
import Table from "react-bootstrap/Table";
// import WeeklyCellTask from "../WeeklyCalendar/WeeklyCellTask/WeeklyCellTask";
import TaskCell from "../TaskCell/TaskCell";

import TaskModal from "../TaskModal/TaskModal";
// eslint-disable-next-line
// import ReactDOM from "react-dom";
import moment from "moment";
// eslint-disable-next-line
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line
import { getTasksBetweenDatesOfUser } from "../../../actions/tasks";
import "bootstrap/dist/css/bootstrap.min.css";
import useStyles from "./styles";

const MonthlyCalendar = () => {
  const dispatch = useDispatch();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const classes = useStyles();
  //   var today = moment();
  // eslint-disable-next-line
  const [today, setToday] = useState(moment());

  const first_day = today.clone().startOf("month").startOf("week");
  const last_day = today.clone().endOf("month").endOf("week");
  const num_of_days = last_day.diff(first_day, "days");
  // console.log(num_of_days + 1);

  const num_of_weeks = last_day.diff(first_day, "weeks");
  //   const weeks = Array(num_of_weeks + 1);
  const weeks = [...new Array(num_of_weeks + 1)].map(
    (i, index) => `week ${index}`
  );

  const tasksEachDay = Array(num_of_days + 1)
    .fill()
    .map(() => []);

  // .map(() => Array());
  // console.log(tasksEachDay);
  // weeks.forEach((week) => {
  //   tasksEachDay[0].push(week);
  // });
  // console.log(tasksEachDay);

  // console.log(weeks);

  //   const last_day = first_day.clone().add(34, "days");
  const monthNames = [
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
  ];
  //   const weeks = ["week1", "week2", "week3", "week4", "week5"];
  // moment() will be called everytime function rendered
  const [showModal, setShowModal] = useState(false);
  //   // eslint-disable-next-line
  const [modalInfo, setModalInfo] = useState(null);
  //   const user = JSON.parse(localStorage.getItem("profile"));

  // better version
  // const [today , setToday] = useState(() => moment());

  var tasks = useSelector((state) => state.tasks);

  const renderHeader = (today) => {
    var start_month = today.startOf("week").toDate().getMonth();
    start_month = monthNames[start_month];
    var header = start_month;
    return header;
  };
  const appendTasksToCell = (day_index) => {
    // console.log(`appendTasksToCell called with day_index: ${day_index}`);
    if (tasksEachDay.length !== 0) {
      var tasks = tasksEachDay[day_index];
      if (tasks.length !== 0) {
        return tasks.map((task) => {
          return (
            <TaskCell
              key={task._id}
              task={task}
              click={() => {
                setShowModal(true);
                setModalInfo(task);
              }}
              hour={true}
            />
          );
        });
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  useEffect(() => {
    // console.log("useEffect called");
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user) {
      // console.log(first_day.format("YYYY-MM-DD"));
      // console.log(last_day.format("YYYY-MM-DD")); getTasksBetweenDatesOfUser
      dispatch(
        getTasksBetweenDatesOfUser(
          first_day.format("YYYY-MM-DD"),
          last_day.format("YYYY-MM-DD")
        )
      );
    }
    // eslint-disable-next-line
  }, [dispatch, today]);

  const orderTasksInArray = () => {
    console.log("orderTasksInArray called");
    // console.log(tasks);

    if (tasks.length > 0) {
      tasks.forEach((task) => {
        // console.log(task);
        // var day_task = moment(task.startDate).toDate().getDate();
        var moment_task = moment(task.startDate);
        // console.log(moment_task);
        const diff_task_from_first = moment_task.diff(first_day, "days");
        // console.log(diff_task_from_first);

        // console.log(task.startDate);
        // console.log(day_task_index);

        // var hour = `${task.startTime.substring(0, 2)}:00`;
        // var hour_index = hours.indexOf(hour);
        if (diff_task_from_first >= 0)
          tasksEachDay[diff_task_from_first].push(task);
      });
      console.log(tasksEachDay);
    }
  };
  const lastMonth = () => {
    // console.log("lastWeek called");
    setToday((prevToday) => prevToday.clone().subtract(1, "months"));
  };

  //sets current week to following week
  const nextMonth = () => {
    // console.log("nextWeek called");
    setToday((prevToday) => prevToday.clone().add(1, "months"));
  };
  // console.log("render");
  orderTasksInArray();
  return (
    <>
      {/* {console.log(tasks)} */}
      {modalInfo !== null ? (
        <TaskModal
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setModalInfo(null);
          }}
          task={modalInfo}
        />
      ) : null}
      {/* {console.log(first_day)}
      {console.log(last_day)}
      {console.log(num_of_weeks + 1)} */}

      {/* {moment.startOf("month")} */}
      <div className={classes.WeeklyCalendar}>
        {/* <div className="WeeklyCalendar"> */}
        {/* start header */}
        {/* <div className="calendar-header"> */}
        <div className={classes.calendarHeader}>
          <div className="calendar-navigate" onClick={() => lastMonth()}>
            &#10094;
          </div>
          <div>
            <h2 className="calendar-title">{renderHeader(today)}</h2>
          </div>
          <div className="calendar-navigate" onClick={() => nextMonth()}>
            &#10095;
          </div>
          {/* end of header */}
        </div>
        <Table bordered>
          {/* <thead className={classes.row_numbers}> */}
          <thead className="table_header">
            {/* <tr className={classes.row_numbers}> */}
            <tr className={classes.table_header}>
              {days.map((day, index) => (
                <th key={index}>
                  {/* {day} <Avatar rounded>{today.day(index)}</Avatar> */}
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, week_index) => (
              <tr key={week_index}>
                {days.map((day, day_index) => (
                  <td
                    className={classes.cell}
                    key={`${week_index},${day_index}`}
                    id={`${week}+${day_index}`}
                  >
                    {/* {`${week} ${day_index}`} */}
                    {/* const last_day = first_day.clone().add(34, "days"); */}

                    {first_day
                      .clone()
                      .add(day_index + week_index * 7, "days")
                      .format("D") === "1"
                      ? first_day
                          .clone()
                          .add(day_index + week_index * 7, "days")
                          .format("D MMM")
                      : first_day
                          .clone()
                          .add(day_index + week_index * 7, "days")
                          .format("D")}
                    {appendTasksToCell(day_index + week_index * 7)}
                    {/* {day_index === 0 ? hour : ""}
                    {day_index > 0 && tasks.length
                      ? appendTasksToCell(day_index - 1, week_index)
                      : ""} */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default MonthlyCalendar;
