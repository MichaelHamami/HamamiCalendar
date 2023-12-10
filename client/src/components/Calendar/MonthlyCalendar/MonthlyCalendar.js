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
import Dropdown from "react-bootstrap/Dropdown";
import * as S from './style';

const MonthlyCalendar = () => {
  const dispatch = useDispatch();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const classes = useStyles();

  const [today, setToday] = useState(moment());

  const first_day = today.clone().startOf("month").startOf("week");
  const last_day = today.clone().endOf("month").endOf("week");

  const num_of_days = last_day.diff(first_day, "days");
  const num_of_weeks = last_day.diff(first_day, "weeks");

  const weeks = [...new Array(num_of_weeks + 1)].map(
    (i, index) => `week ${index}`
  );

  const renderTooltip = (props, text = "next month") => (
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


  const tasks = useSelector((state) => state.tasks);

  const renderHeader = (today) => {
    const start_month = today.startOf("week").toDate().getMonth();
    return monthNames[start_month];
  };

  const appendTasksToCell = (day_index) => {
    if (tasksEachDay.length !== 0) {
      var daysTakes = tasksEachDay[day_index];
      if (daysTakes.length !== 0) {
        return daysTakes.map((task) => {
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
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user) {
      dispatch(
        getTasksBetweenDatesOfUser(
          first_day.format("YYYY-MM-DD"),
          last_day.format("YYYY-MM-DD")
        ));
    }
  }, [dispatch, today]);

  const orderTasksInArray = () => {
    if (tasks.length > 0) {
      tasks.forEach((task) => {
        var moment_task = moment(task.startDate);
        const diff_task_from_first = moment_task.diff(first_day, "days");
        if (diff_task_from_first >= 0 && diff_task_from_first < tasksEachDay.length)
          tasksEachDay[diff_task_from_first].push(task);
      });
    }
  };

  const lastMonth = () => {
    setToday((prevToday) => prevToday.clone().subtract(1, "months"));
  };

  //sets current week to following week
  const nextMonth = () => {
    setToday((prevToday) => prevToday.clone().add(1, "months"));
  };

  orderTasksInArray();
  return (
    <>
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

      <S.HeaderCalendar>
        <S.ClendarTitle>

          <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(null, "last month")}
          >
            <div onClick={() => lastMonth()}>
              &#10094;
            </div>
          </OverlayTrigger>
          <S.CalendarMonth>{renderHeader(today)} </S.CalendarMonth>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(null, "next month")}
          >
            <div className={classes.rightArrow} onClick={() => nextMonth()}>
              &#10095;
            </div>
          </OverlayTrigger>
        </S.ClendarTitle>
        <S.CalendarTypes>

          <div>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Calender Types
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/weeklycalendar">Weekly Calendar</Dropdown.Item>
              <Dropdown.Item href="/calendar">Monthly Calendar </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
        </S.CalendarTypes>
      </S.HeaderCalendar>

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
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default MonthlyCalendar;
