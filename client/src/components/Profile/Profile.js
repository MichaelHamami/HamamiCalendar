import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
} from "@material-ui/core";
import useStyles from "./styles";
import { Link, useHistory, useLocation } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const initialState = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  };
  const classes = useStyles();
  const [profile, setProfile] = useState(initialState);
  const changePassword = () => {
    console.log("changePassword called");
  };
  const setPhoneNumber = () => {
    console.log("setPhoneNumber called");
  };
  const changeEmail = () => {
    console.log("changeEmail called");
  };
  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));

    if (user) {
      var [first_n, last_n] = user.result.name.split(" ");
      setProfile({
        firstName: first_n,
        lastName: last_n,
        phoneNumber: user.result.phoneNumber,
        email: user.result.email,
      });
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle Submit called");
    console.log(profile);
  };
  if (!user?.result?._id && !user?.result?.googleId) {
    return (
      <Paper className={classes.profile}>
        <Typography variant="h6" align="center">
          Please Sign In to have Profile.
        </Typography>
      </Paper>
    );
  }
  return (
    <>
      <div className={classes.profile}>
        <Typography variant="h4" align="center">
          Profile
        </Typography>
        <Container>
          <form onSubmit={handleSubmit}>
            <TextField
              className={classes.buttonSubmit}
              name="firstName"
              onChange={handleChange}
              variant="outlined"
              fullWidth
              value={profile.firstName}
              label="firstName"
              type="text"
            ></TextField>
            <TextField
              className={classes.buttonSubmit}
              name="lastName"
              onChange={handleChange}
              variant="outlined"
              value={profile.lastName}
              fullWidth
              label="lastName"
              type="text"
            ></TextField>
            <Typography
              variant="h6"
              align="left"
              className={classes.buttonSubmit}
            >
              Email: {user.result.email}
            </Typography>
            {user.result?.phoneVerified ? null : (
              <TextField
                className={classes.buttonSubmit}
                name="phoneNumber"
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label="phoneNumber"
                type="number"
              ></TextField>
            )}
          </form>
          {/* <Button
            component={Link}
            to="/profile"
            color="primary"
            className={classes.homeBtn}
          >
            Profile
          </Button> */}
          <Button
            component={Link}
            to="/changeEmail"
            color="primary"
            className={classes.homeBtn}
          >
            Change Email
          </Button>
          <Button
            component={Link}
            to="/setPhone"
            color="primary"
            className={classes.homeBtn}
          >
            Set Phone for SMS Remainders
          </Button>
          <Button
            component={Link}
            to="/changePassword"
            color="primary"
            className={classes.homeBtn}
          >
            Change Password
          </Button>
          {/* <Button className={classes.buttonAdvanced} onClick={changeEmail}>
          Change Email
        </Button>
        <Button className={classes.buttonAdvanced} onClick={setPhoneNumber}>
          Set Phone for SMS Remainders
        </Button>
        <Button className={classes.buttonAdvanced} onClick={changePassword}>
          Change Password
        </Button> */}
        </Container>
      </div>
    </>
  );
};

export default Profile;
