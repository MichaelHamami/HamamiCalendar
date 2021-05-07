import React, { useState, useEffect } from 'react';
// import React from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line
import moment from 'moment';
// eslint-disable-next-line
import { getTasks, getTasksByDay, getTasksByDayAndHour, getWeekTasks } from '../../actions/tasks';
import Tasks from '../Tasks/tasks';
import TaskForm from '../TaskForm/Form';

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    // let startDate = "2020-05-26"
    // let startTime = "12:00"

    // startDate = new Date(startDate);
    // moment(startDate).getDate();
    // startDate = new Date(2021,4,26);
    // console.log(startDate);
    // console.log(moment(startDate).toDate());
    dispatch(getTasks());
    // dispatch(getTasksByDay(startDate));
    // dispatch(getTasksByDayAndHour(startDate,startTime));
    // dispatch(getWeekTasks(startDate));


  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Tasks setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TaskForm currentId={currentId} setCurrentId={setCurrentId}/>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;