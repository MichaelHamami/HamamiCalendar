// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import Collapse from "react-bootstrap/Collapse";
// eslint-disable-next-line
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
// eslint-disable-next-line
import { createtask, createRepeatedTasks } from "../../actions/tasks";
// import moment from 'moment';
// import 'react-modern-calendar-datepicker/lib/DatePicker.css';

// import {DatePicker, utils } from 'react-modern-calendar-datepicker';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
// import "./form.css";
import OutlinedDiv from "./OutlinedDiv";
import moment from "moment";
// import {createRepeatedTasks, deleteRepeatedTasks} from '../../api/index';

const TaskForm = () => {
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    startDate: new Date(),
    group_id: 0,
    startTime: "00:00",
    repeat_days: 0,
    endDate: new Date(),
    email_remainder: false,
  });
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const handleChange = (e) =>
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  const clear = () => {
    setTaskData({
      name: "",
      description: "",
      startTime: "00:00",
      startDate: new Date(),
      group_id: 0,
      endDate: new Date(),
      repeat_days: 0,
      email_remainder: false,
    });
  };
  // console.log(taskData);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("handleSubmit called in Form.js");
    let user_ID = "";
    if (!user?.result?._id) {
      user_ID = user.result.googleId;
    } else {
      user_ID = user.result._id;
    }
    var single_task = {
      startDate: new Date(taskData.startDate),
      name: taskData.name,
      description: taskData.description,
      startTime: taskData.startTime,
      group: taskData.group_id,
      creator: user_ID,
      email_remainder: taskData.email_remainder,
      sms_remainder: false,

    };

    if (taskData.repeat_days > 0 && taskData.endDate > taskData.startDate) {
      console.log("create repeated should called");
      var moment_start_date = moment(taskData.startDate);
      var moment_end_date = moment(taskData.endDate);
      var diff_days = moment_end_date.diff(moment_start_date, "days");
      // let amount = taskData.endDate.diff(taskData.startDate, "days");
      // console.log(diff_days);
      var tasks = [];
      tasks.push(single_task);
      var currentDate = taskData.startDate;
      var repeat_days = taskData.repeat_days;
      // console.log(currentDate);
      var task = {};
      var current = currentDate.setDate(
        currentDate.getDate() + Number(repeat_days)
      );
      while (currentDate <= taskData.endDate) {
        // console.log(currentDate);
        task = {
          startDate: new Date(current),
          name: taskData.name,
          description: taskData.description,
          startTime: taskData.startTime,
          group: taskData.group_id,
          creator: user_ID,
          email_remainder: taskData.email_remainder,
          sms_remainder: false,
        };
        current = currentDate.setDate(
          currentDate.getDate() + Number(repeat_days)
        );
        tasks.push(task);
      }
      console.log(tasks);
      dispatch(createRepeatedTasks(tasks));
    } else {
      console.log("create single task called");
      dispatch(createtask(single_task));
    }
  };

  if (!user?.result?._id && !user?.result?.googleId) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create Tasks.
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Creating a Task</Typography>
        <TextField
          name="name"
          variant="outlined"
          label="Name"
          fullWidth
          value={taskData.name}
          onChange={handleChange}
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={taskData.description}
          onChange={handleChange}
        />
        <TextField
          name="startTime"
          variant="outlined"
          label="Time"
          type="time"
          fullWidth
          value={taskData.startTime || "00:00"}
          onChange={handleChange}
        />
        <OutlinedDiv label="Start Date">
          <DatePicker
            className={classes.datepicker_form}
            // className="datepicker_form"
            variant="outlined"
            label="Start Date"
            name="startDate"
            selected={taskData.startDate}
            onChange={(date) => setTaskData({ ...taskData, startDate: date })}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
          />
        </OutlinedDiv>
        <FormControlLabel
          className={classes.checkbox_form}
          control={
            <Checkbox
              checked={taskData.email_remainder}
              onChange={(e) =>
                setTaskData({ ...taskData, email_remainder: e.target.checked })
              }
              name="email_remainder"
            />
          }
          label="Email Remainder"
        />

        <Button
          className={classes.buttonAdvanced}
          onClick={() => setOpen(!open)}
          // aria-controls="example-fade-text"
          aria-expanded={open}
        >
          Advanced Options
        </Button>
        <Collapse in={open}>
          <div id="example-collapse-text">
            <TextField
              name="group_id"
              fullWidth
              variant="outlined"
              id="standard-number"
              label="Group id Tasks"
              value={taskData.group_id}
              type="number"
              // selected={taskData.group}
              InputLabelProps={{
                shrink: true,
              }}
              // value={taskData.group}
              // onChange={(number) => setTaskData({ ...taskData, group: number })}
              onChange={handleChange}
            />
            <TextField
              name="repeat_days"
              fullWidth
              variant="outlined"
              id="standard-number"
              label="Repeat task every number of days"
              value={taskData.repeat_days}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              // value={taskData.group}
              // onChange={(number) => setTaskData({ ...taskData, group: number })}
              onChange={handleChange}
            />
            <OutlinedDiv label="End Date">
              <DatePicker
                // className={classes.datepicker}
                className="datepicker_form"
                variant="outlined"
                label="End Date"
                name="endDate"
                selected={taskData.endDate}
                onChange={(date) => setTaskData({ ...taskData, endDate: date })}
                dateFormat="dd/MM/yyyy"
                // minDate={new Date()}
                minDate={taskData.startDate}
              />
            </OutlinedDiv>
          </div>
        </Collapse>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default TaskForm;
