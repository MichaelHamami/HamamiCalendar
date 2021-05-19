import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Avatar,
} from "@material-ui/core/";
import Table from "react-bootstrap/Table";
import WeeklyCellTask from "./WeeklyCellTask/WeeklyCellTask";
import WeeklyTaskModal from "./WeeklyTaskModal/WeeklyTaskModal";
// eslint-disable-next-line
import ReactDOM from "react-dom";
import moment from "moment";
// eslint-disable-next-line
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line
import {
  getTasks,
  getWeekTasks,
  getWeekTasksOfUser,
} from "../../../actions/tasks";
import "bootstrap/dist/css/bootstrap.min.css";
import "./weeklycalendar2.css";
import useStyles from "./styles";

const WeeklyCalendar2 = () => {
  const dispatch = useDispatch();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const classes = useStyles();
  // var today = moment();
  // eslint-disable-next-line
  var current = moment().startOf("week").utc(true); //current position on calendar (first day of month)
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
  const hours = [
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
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    // "24:00",
  ];
  // moment() will be called everytime function rendered
  const [today, setToday] = useState(moment());
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line
  const [modalInfo, setModalInfo] = useState(null);

  // better version
  // const [today , setToday] = useState(() => moment());

  const tasks = useSelector((state) => state.tasks);
  const tasksEachDay = Array(days.length)
    .fill()
    .map(() => Array(hours.length));
  const renderHeader = (today) => {
    var start_day = today.startOf("week").toDate().getDate();
    var start_month = today.startOf("week").toDate().getMonth();
    var start_year = today.startOf("week").toDate().getFullYear();

    var end_day = today.endOf("week").toDate().getDate();
    var end_month = today.endOf("week").toDate().getMonth();
    var end_year = today.endOf("week").toDate().getFullYear();

    if (start_month !== end_month) {
      end_month = " - " + monthNames[end_month];
    } else {
      end_month = "";
    }
    if (end_year > start_year) {
      end_year = " - " + end_year;
    } else {
      end_year = "";
    }
    start_month = monthNames[start_month];
    var header =
      start_day +
      " - " +
      end_day +
      " " +
      start_month +
      end_month +
      " " +
      start_year +
      end_year;
    return header;
  };
  const appendTasksToCell = (day_index, hour_index) => {
    // console.log(`appendTasksToCell called with day_index: ${day_index} and hour ${hour_index}`);
    if (tasksEachDay.length !== 0) {
      var task = tasksEachDay[day_index][hour_index];
      if (task)
        return (
          <WeeklyCellTask
            key={task._id}
            task={task}
            click={() => {
              setShowModal(true);
              setModalInfo(task);
            }}
          />
        );
      else {
        return "";
      }
    } else {
      return "";
    }
  };

  useEffect(() => {
    // console.log("useEffect called");
    // dispatch(getWeekTasks(today));
    // console.log(today);

    // console.log(today.startof('weeks').format('YYYY-MM-DD'));
    // moment(moment().startOf("week").toDate()).format('YYYY-MM-DD')
    // just a check not for deployement
    // dispatch(getTasks()).then(
    //   orderTasksInArray()
    // );
    dispatch(
      getWeekTasksOfUser(
        moment(today.startOf("week").toDate()).format("YYYY-MM-DD")
      )
    ).then(orderTasksInArray());
    document.body.classList.add("background-none");
    return () => {
      document.body.classList.remove("background-none");
    };
    // eslint-disable-next-line
  }, [dispatch, today]);

  const orderTasksInArray = () => {
    // console.log("orderTasksInArray called");
    tasks.forEach((task) => {
      var day_task_index = moment(task.startDate).toDate().getUTCDay();
      // console.log(task.startDate);
      // console.log(day_task_index);

      var hour = `${task.startTime.substring(0, 2)}:00`;
      var hour_index = hours.indexOf(hour);
      tasksEachDay[day_task_index][hour_index] = task;
    });
  };
  const lastWeek = () => {
    // console.log("lastWeek called");
    setToday((prevToday) => prevToday.clone().subtract(1, "weeks"));
  };

  //sets current week to following week
  const nextWeek = () => {
    // console.log("nextWeek called");
    setToday((prevToday) => prevToday.clone().add(1, "weeks"));
  };
  // console.log("render");
  orderTasksInArray();
  return (
    <>
      {/* {console.log(tasks)} */}
      {modalInfo !== null ? (
        <WeeklyTaskModal
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setModalInfo(null);
          }}
          task={modalInfo}
        />
      ) : null}

      <div className="WeeklyCalendar">
        {/* start header */}
        <div className="calendar-header">
          <div className="calendar-navigate" onClick={() => lastWeek()}>
            {" "}
            &#10094;{" "}
          </div>
          <div>
            <h2 className="calendar-title">{renderHeader(today)}</h2>
          </div>
          <div className="calendar-navigate" onClick={() => nextWeek()}>
            &#10095;
          </div>
          {/* end of header */}
        </div>
        <Table bordered>
          {/* <thead className={classes.row_numbers}> */}
          <thead className="table_header_numbers_css">
            {/* <tr className={classes.row_numbers}> */}
            <tr className="table_header_numbers_css">
              {["Time", ...days].map((day, index) => (
                <th key={index}>
                  {/* {day} <Avatar rounded>{today.day(index)}</Avatar> */}
                  {day}
                  {/* <Avatar> */}
                  <Avatar classes={{ root: classes.table_header_numbers }}>
                    {index === 0 ? "T" : today.date() - 7 + index}
                  </Avatar>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour, hour_index) => (
              <tr key={hour_index}>
                {["Time", ...days].map((day, day_index) => (
                  <td
                    key={`${hour_index},${day_index}`}
                    id={`${hour}+${day_index}`}
                  >
                    {day_index === 0 ? hour : ""}
                    {day_index > 0 && tasks.length
                      ? appendTasksToCell(day_index - 1, hour_index)
                      : ""}
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

export default WeeklyCalendar2;
