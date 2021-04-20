import React, { useState, useEffect } from 'react';
// import React from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getTasks } from '../../actions/tasks';
import Tasks from '../Tasks/tasks';
import TaskForm from '../TaskForm/Form';

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [currentId, dispatch]);

  return (
      // <div>
      //     Home Page
      // </div>
    <Grow in>
      <Container>
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Tasks setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TaskForm currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;