import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import TaskCell from "../TaskCell/TaskCell";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import TaskModal from "../TaskModal/TaskModal";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getTasksBetweenDatesOfUser } from "../../../actions/tasks";
import "bootstrap/dist/css/bootstrap.min.css";
import useStyles from "./styles";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import {Col, Container } from "react-bootstrap";
const MonthlyCalendar = () => {
  const dispatch = useDispatch();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const classes = useStyles();
  
  // better version
  // const [today , setToday] = useState(() => moment());
  const [today, setToday] = useState(moment());

  const first_day = today.clone().startOf("month").startOf("week");
  const last_day = today.clone().endOf("month").endOf("week");
  const num_of_days = last_day.diff(first_day, "days");
  // console.log(num_of_days + 1);
   const next_mont = "next month custom";
  const num_of_weeks = last_day.diff(first_day, "weeks");
  const weeks = [...new Array(num_of_weeks + 1)].map(
    (i, index) => `week ${index}`
  );
  const renderTooltip = (props,text="next month") => (
    <Tooltip id="button-tooltip" {...props}>
      {text}
    </Tooltip>
  );
  var tasksEachDay = Array(num_of_days + 1)
    .fill()
    .map(() => []);
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
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);


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
      // var first_day = today.clone().startOf("month").startOf("week");
      // var last_day = today.clone().endOf("month").endOf("week");
      dispatch(
        getTasksBetweenDatesOfUser(
          first_day.format("YYYY-MM-DD"),
          last_day.format("YYYY-MM-DD")
      ));
    }
    // eslint-disable-next-line
  }, [dispatch, today]);

  const orderTasksInArray = () => {
    // console.log("orderTasksInArray called");
    // console.log(tasks);

    if (tasks.length > 0) {
      // console.log(tasks);
      tasks.forEach((task) => {
        // console.log(task);
        // console.log(tasksEachDay);

        // var day_task = moment(task.startDate).toDate().getDate();
        var moment_task = moment(task.startDate);
        // console.log(moment_task);
        const diff_task_from_first = moment_task.diff(first_day, "days");
        // console.log(moment_task);
        // console.log(first_day);
        // console.log(diff_task_from_first);
        if (diff_task_from_first >= 0 && diff_task_from_first<tasksEachDay.length)
          tasksEachDay[diff_task_from_first].push(task);
      });
      // console.log(tasksEachDay);
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
        {/* <Row className="justify-content-md-center align-items-center"> */}
        <Container >
        <Row className="justify-content-md-center align-items-center" xs={3}>
          <Col md={{span:1}}>
          <OverlayTrigger 
              placement="left"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip(null,"last month")}
            >
              <div onClick={() => lastMonth()}>
                &#10094;
              </div>
            </OverlayTrigger>
          </Col>
          <Col md={{span:1}}>
            <h2 >{renderHeader(today)}</h2>
          </Col>
          <Col md={{span:1}} >
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(null,"next month")}
          >
          <div className={classes.rightArrow} onClick={() => nextMonth()}>
            &#10095;
          </div>       
             </OverlayTrigger>
            </Col>

          {/* <div className="calendar-navigate" onClick={() => nextMonth()}>
            &#10095;
          </div> */}
          {/* end of header */}
          <Col md={{span:2, offset:2}}>
        <div>
        <Dropdown >
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Calender Types
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/weeklycalendar">Weekly Calendar</Dropdown.Item>
            <Dropdown.Item href="/calendar">Monthly Calendar </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
        </Col>
        </Row>
        </Container>




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
