  
// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import {Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import useStyles from './styles';
import { deleteTask, updateTask } from '../../../../actions/tasks';
import "./customDatePickerWidth.css";
import "./WeeklyTaskModal.css";
import DeleteIcon from '@material-ui/icons/Delete';



const WeeklyTaskModal = ({task,currentId = 0,show=false, onClose}) => {

  const [taskData, setTaskData] = useState({ name: task.name, description: task.description, startDate: new Date(task.startDate), group: task.group, startTime: task.startTime});

  const dispatch = useDispatch();
  const classes = useStyles();
  // eslint-disable-next-line
  const user = JSON.parse(localStorage.getItem('profile'));
  const handleChange = (e) => setTaskData({ ...taskData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("handleSubmit called in Form.js");
    var user_ID = ''
    if(!user?.result?._id)
    {
      user_ID = user.result.googleId
    }
    else{
      user_ID = user.result._id
    }
    dispatch(updateTask(task._id,{ ...taskData, creator:user_ID}));
    onClose();
  };

if(!show) return null
  return (
    <Modal show={show} onHide={onClose}>
    <Modal.Header>
      <Modal.Title>
        Task Information
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {/* Modal Body */}
  <Paper className={classes.paper}>
    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      <Typography variant="h6">{task ? `Editing Task` : 'Creating a Task'}</Typography>
      <TextField name="name" variant="outlined" label="Name" fullWidth value={taskData.name} onChange={handleChange} />
      <TextField name="description" variant="outlined" label="Description" fullWidth multiline rows={4} value={taskData.description} onChange={handleChange} />
      <TextField name="startTime"   variant="outlined" label="Time" type="time" fullWidth value={taskData.startTime || '00:00'} onChange={handleChange} />
      <div className="customDatePickerWidth">
      <DatePicker
      // wrapperClassName={`${classes.datePicker}`}
      wrapperClassName="customDatePickerWidth"
      className="customDatePickerWidth"
      name="startDate" 
     selected={taskData.startDate}
     onChange={date => setTaskData({...taskData,startDate:date})}
     dateFormat="dd/MM/yyyy"
     minDate={new Date()}/> 
    </div>
      <br></br>
      <Button className={classes.buttonSubmit} variant="contained" color="primary"  type="submit">Save</Button>
      <Button className={classes.buttonSave} variant="contained" color="secondary"
      onClick={onClose}>
        Close</Button>
        <Button className={classes.buttonDelete} size="medium" color="secondary" onClick={() => 
          {
            dispatch(deleteTask(task._id));
            onClose();
          }}>
          <DeleteIcon fontSize="large" /> Delete
      </Button>
    </form>
  </Paper>
  </Modal.Body>
  </Modal>
  );
};

export default WeeklyTaskModal;