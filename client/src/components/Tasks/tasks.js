// import React from 'react';
// eslint-disable-next-line
import React, { useState, useEffect } from 'react';

import { Grid, CircularProgress } from '@material-ui/core';
import Task from './Task/task';
import useStyles from './styles';
// eslint-disable-next-line
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line
import { getTasks } from '../../actions/tasks';


const Tasks = ({setCurrentId }) => {

// const Tasks = () => {
  // const [currentId, setCurrentId] = useState(0);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getTasks());
  // }, [currentId, dispatch]);

  const tasks = useSelector((state) => state.tasks);
  const classes = useStyles();

  return (
    !tasks.length ? <CircularProgress /> : (
      // <Grid container alignItems="stretch" spacing={3}>
       <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {tasks.map((task) => (
          <Grid key={task._id} item xs={12} sm={6} md={6}>
            <Task task={task} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Tasks;