// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
// eslint-disable-next-line
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
// eslint-disable-next-line
import { createtask, updateTask, createRepeatedTasks, deleteRepeatedTasks} from '../../actions/tasks';
// import moment from 'moment';
// import 'react-modern-calendar-datepicker/lib/DatePicker.css';

// import {DatePicker, utils } from 'react-modern-calendar-datepicker';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
// import {createRepeatedTasks, deleteRepeatedTasks} from '../../api/index';


const TaskForm = () => {
  const [taskData, setTaskData] = useState({ name: '', description: '', startDate: new Date(),group:0,startTime:'00:00'});
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const handleChange = (e) => setTaskData({ ...taskData, [e.target.name]: e.target.value });
  const clear = () => {
    setTaskData({ name: '', description: '',startTime:'', startDate: '',group:0});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit called in Form.js");

    let user_ID = ''
    if(!user?.result?._id)
    {
      user_ID = user.result.googleId
    }
    else{
      user_ID = user.result._id
    }
      console.log(taskData);
      console.log("we calling createtask");
      dispatch(createtask({ ...taskData, creator:user_ID}));
      clear();
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("handleSubmit called in Form.js");
  //   let user_ID = ''
  //   if(!user?.result?._id)
  //   {
  //     user_ID = user.result.googleId
  //   }
  //   else{
  //     user_ID = user.result._id
  //   }

    // Create reapeted

    // var reapeted = 2;
    // var startDate = new Date(2013, 1, 12);
    // var endDate = new Date(2013, 1, 15);
    // let tasks = [];
    // // startDateMoment.diff(endDateMoment, 'days')
    // let i;
    // for (i=0; i<8; i++)
    // {
    //   let repeated_task = {
    //     name: 'number: '+i,
    //     description: 'desc',
    //     startTime: '1'+i+':00',
    //     // startDate: "1"+i+"/04/2021",
    //     startDate: new Date(2021,4,i),
    //     creator: user,
    //     group:i
    //   }
    //   tasks.push(repeated_task);
    // }
    // dispatch(createRepeatedTasks(tasks));
    
    // const { data } = await createRepeatedTasks(tasks);
    // console.log(data);

    // console.log(tasks);
    // end reapeted

    // Delete reapeted
    // const { data } = await deleteRepeatedTasks(5);
    // console.log(data);

    // dispatch(deleteRepeatedTasks(5));


  // };
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
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">Creating a Task</Typography>
        <TextField name="name" variant="outlined" label="Name" fullWidth value={taskData.name} onChange={handleChange} />
        <TextField name="description" variant="outlined" label="Description" fullWidth multiline rows={4} value={taskData.description} onChange={handleChange} />
        <TextField name="startTime"   variant="outlined" label="Time" type="time" fullWidth value={taskData.startTime || '00:00'} onChange={handleChange} />
        <DatePicker
        className={classes.datepicker}
        name="startDate" 
       selected={taskData.startDate}
       onChange={date => setTaskData({...taskData,startDate:date})}
       dateFormat="dd/MM/yyyy"
       minDate={new Date()}/>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>

  );
};

export default TaskForm;