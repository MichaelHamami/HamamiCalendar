  
// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
// eslint-disable-next-line
import { createtask, updateTask, createRepeatedTasks, deleteRepeatedTasks} from '../../actions/tasks';
import moment from 'moment';
// import 'react-modern-calendar-datepicker/lib/DatePicker.css';

// import {DatePicker, utils } from 'react-modern-calendar-datepicker';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
// import {createRepeatedTasks, deleteRepeatedTasks} from '../../api/index';


const TaskForm = ({ currentId, setCurrentId }) => {
  // const [taskData, setTaskData] = useState({ name: '', description: '', startDate: new Date(),group:'',endDate:'',startTime:'00:00'});
  const [taskData, setTaskData] = useState({ name: '', description: '', startDate: new Date(),group:0,startTime:'00:00'});
  const task = useSelector((state) => (currentId ? state.tasks.find((task) => task._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const handleChange = (e) => setTaskData({ ...taskData, [e.target.name]: e.target.value });

  useEffect(() => {
    // if (task) setTaskData({name:task.name, description:task.description, startTime: '00:00'});
    if (task) 
    {
      console.log("useeffect there is a task");
      console.log(task);
      console.log(task.startDate);
      let date_moment = moment(task.startDate).toDate();

      setTaskData({name:task.name, description:task.description, startTime: task.startTime, startDate:date_moment});

    }
  }, [task]);

  const clear = () => {
    setCurrentId(0);
    setTaskData({ name: '', description: '',startTime:'', startDate: '',group:0});
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
  //   console.log(taskData);
  //   if (currentId) {
  //     console.log("we calling update and currentId is:"+currentId);
  //     dispatch(updateTask(currentId,{ ...taskData, creator:user_ID}));
  //     clear();

  //   } else {
  //     console.log("we calling createtask and currentId is:"+currentId);
  //     dispatch(createtask({ ...taskData, creator:user_ID}));
  //     clear();
  //   }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit called in Form.js");
    // let user_ID = ''
    // if(!user?.result?._id)
    // {
    //   user_ID = user.result.googleId
    // }
    // else{
    //   user_ID = user.result._id
    // }
    // Create reapeted

    // var reapeted = 2;
    // var startDate = new Date(2013, 1, 12);
    // var endDate = new Date(2013, 1, 15);
    let tasks = [];
    // startDateMoment.diff(endDateMoment, 'days')
    let i;
    for (i=0; i<5; i++)
    {
      let repeated_task = {
        name: 'number: '+i+" worked?",
        description: 'desc',
        startTime: '13:00',
        startDate: new Date(),
        group:5
      }
      tasks.push(repeated_task);
    }
    // console.log(tasks);
    // const { data } = await createRepeatedTasks(tasks);
    // console.log(data);

    dispatch(createRepeatedTasks(tasks));


    // Delete reapeted
    // const { data } = await deleteRepeatedTasks(5);
    // console.log(data);

    // dispatch(deleteRepeatedTasks(5));


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
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${task.name}"` : 'Creating a Task'}</Typography>
        <TextField name="name" variant="outlined" label="Name" fullWidth value={taskData.name} onChange={handleChange} />
        <TextField name="description" variant="outlined" label="Description" fullWidth multiline rows={4} value={taskData.description} onChange={handleChange} />
        <TextField name="startTime"   variant="outlined" label="Time" type="time" fullWidth value={taskData.startTime || '00:00'} onChange={handleChange} />
        <DatePicker
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