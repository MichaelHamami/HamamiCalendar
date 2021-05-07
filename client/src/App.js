import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// eslint-disable-next-line
import Home from './components/Home/home';
// import Calendar from './components/Calendar/Calendar';
// eslint-disable-next-line
// import WeeklyCalendar from './components/Calendar/WeeklyCalendar/WeeklyCalendar';
import WeeklyCalendar2 from './components/Calendar/WeeklyCalendar/WeeklyCalendar2';


import TaskForm from './components/TaskForm/Form';
import Navbar from './components/Navbar/navbar';
import Auth from './components/Auth/auth';
// import Tasks from './components/Tasks/tasks';

const App = () => (
  <BrowserRouter>
    <Container>
      <Navbar />
      <Switch>
        <Route path="/calendar" exact component={WeeklyCalendar2} />
        {/* <Route path="/" exact component={Calendar} /> */}
        <Route path="/" exact component={Home} />
        {/* <Route path="/" exact component={Tasks} /> */}
        <Route path="/auth" exact component={Auth} />
        <Route path="/task" exact component={TaskForm} />

      </Switch>
    </Container>
  </BrowserRouter>
);

export default App;