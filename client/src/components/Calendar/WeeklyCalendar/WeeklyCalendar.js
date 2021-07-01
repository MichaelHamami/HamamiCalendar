import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core/";
import Table from "react-bootstrap/Table";
import WeeklyCellTask from "./WeeklyCellTask/WeeklyCellTask";
import WeeklyTaskModal from "./WeeklyTaskModal/WeeklyTaskModal";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getWeekTasksOfUser } from "../../../actions/tasks";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./weeklycalendar.css";
import useStyles from "./styles";

const WeeklyCalendar2 = () => {
  const dispatch = useDispatch();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const classes = useStyles();
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
  ];
  // moment() will be called everytime function rendered
  const [today, setToday] = useState(moment());
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));

  // better version
  // const [today , setToday] = useState(() => moment());
  const renderTooltip = (props,text="next month") => (
    <Tooltip id="button-tooltip" {...props}>
      {text}
    </Tooltip>
  );
  var tasks = useSelector((state) => state.tasks);

  const tasksEachDayAndHour = Array(days.length)
    .fill()
    .map(() => Array(hours.length).fill().map(() =>[]));

    console.log("tasks_each_hour_and_day");
    console.log(tasksEachDayAndHour);

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
    // console.log(tasksEachDayAndHour);
    // console.log(tasks);
    if (tasksEachDayAndHour.length !== 0) {
      if(tasksEachDayAndHour[day_index][hour_index].length !== 0)
      {
        console.log("we get here");
        return tasksEachDayAndHour[day_index][hour_index].map(task =>{
          console.log("here do we get??????ASDASDASD import");
          console.log(task);
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
        });
        
      }
      // var task = tasksEachDayAndHour[day_index][hour_index];
    } else {
      return "";
    }
  };

  useEffect(() => {
    // console.log("useEffect called");
    // dispatch(getWeekTasks(today));
    // console.log(today);
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user) {
      dispatch(
        getWeekTasksOfUser(
          moment(today.startOf("week").toDate()).format("YYYY-MM-DD")
        )
      );
    } else {
      // maybe create toast to make the user known he need to login
      tasks = [];
    }
    document.body.classList.add("background-none");
    return () => {
      document.body.classList.remove("background-none");
    };
  }, [dispatch, today]);

  const orderTasksInArray = () => {
    // console.log("orderTasksInArray called");
    tasks.forEach((task) => {
      var day_task_index = moment(task.startDate).toDate().getUTCDay();
      // console.log(task.startDate);
      // console.log(day_task_index);

      var hour = `${task.startTime.substring(0, 2)}:00`;
      var hour_index = hours.indexOf(hour);
      // tasksEachDay[day_task_index][hour_index] = task;
      tasksEachDayAndHour[day_task_index][hour_index].push(task);

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
      {console.log(tasks)}
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
        <OverlayTrigger 
              placement="left"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip(null,"last month")}
            >
          <div className="calendar-navigate" onClick={() => lastWeek()}>
            &#10094;
          </div>
          </OverlayTrigger>

          <div>
            <h2 className="calendar-title">{renderHeader(today)}</h2>
          </div>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(null,"next month")}
          >
          <div className="calendar-navigate" onClick={() => nextWeek()}>
            &#10095;
          </div>
          </OverlayTrigger>

          {/* end of header */}
        </div>
        <Dropdown >
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Calender Types
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/weeklycalendar">Weekly Calendar</Dropdown.Item>
            <Dropdown.Item href="/calendar">Monthly Calendar </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Table bordered className="mt-2">
          <thead className="table_header_numbers_css">
            <tr className="table_header_numbers_css">
              {["Time", ...days].map((day, index) => (
                <th key={index}>
                  {day}
                  <Avatar classes={{ root: classes.table_header_numbers }}>
                    {index === 0 ? "T" : today.clone().subtract(7-index, "days").date()}
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
        {console.log(tasksEachDayAndHour)}
      </div>
    </>
    
  );
};

export default WeeklyCalendar2;
