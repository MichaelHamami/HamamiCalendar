import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/home";
import Profile from "./components/Profile/Profile";
import WeeklyCalendar from "./components/Calendar/WeeklyCalendar/WeeklyCalendar";
import MonthlyCalendar from "./components/Calendar/MonthlyCalendar/MonthlyCalendar";
import TaskForm from "./components/TaskForm/Form";
import Navbar from "./components/Navbar/navbar2";
import Auth from "./components/Auth/auth";
import ChangeEmail from "./components/Profile/ChangeEmail";
import ChangePassword from "./components/Profile/ChangePassword";
// import setPhone from "./components/Profile/setPhone";
import ActivateUser from "./components/Auth/ActivateUser";
import EmailLink from "./components/Auth/EmailLink";
import ConfirmEmail from "./components/Profile/ConfirmEmail";

const App = () => (
  <BrowserRouter>
    <Container>
      <Navbar />
      <Switch>
        <Route path="/weeklycalendar" exact component={WeeklyCalendar} />
        <Route path="/calendar" exact component={MonthlyCalendar} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/email_confirm" exact component={EmailLink} />
        <Route path="/activate/:token" exact component={ActivateUser} />
        <Route path="/task" exact component={TaskForm} />
        <Route path="/changeEmail" exact component={ChangeEmail} />
        <Route
          path="/email_change_activate/:token"
          exact
          component={ConfirmEmail}
        />
        {/* <Route path="/setPhone" exact component={setPhone} /> */}
        <Route path="/changePassword" exact component={ChangePassword} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default App;
