import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import Home from './components/Home/home';
import Calendar from './components/Calendar/Calendar';
import TaskForm from './components/TaskForm/Form';
// import Calendar from './components/Calendar/Calendar2';

import Navbar from './components/Navbar/navbar';
import Auth from './components/Auth/auth';
// import Tasks from './components/Tasks/tasks';
import Home from './components/Home/home';

const App = () => (
  <BrowserRouter>
    <Container maxWidth="lg">
      {/* <Navbar /> */}
      <Switch>
        <Route path="/" exact component={Calendar} />
        {/* <Route path="/" exact component={Home} /> */}
        {/* <Route path="/" exact component={Tasks} /> */}
        <Route path="/auth" exact component={Auth} />
        <Route path="/task" exact component={TaskForm} />

      </Switch>
    </Container>
  </BrowserRouter>
);

export default App;