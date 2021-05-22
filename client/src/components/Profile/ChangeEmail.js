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
import MyToast from "../MyToast/MyToast";
import { useDispatch, useSelector } from "react-redux";
import { changeEmail, confirmEmail } from "../../actions/userProfile";
const ChangeEmail = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const message = useSelector((state) => state.profile.profile_message);
  const type = useSelector((state) => state.profile.message_type);
  console.log(message);
  console.log(type);

  const handleChange = (e) => setEmail(e.target.value);
  useEffect(() => {
    console.log("use Effect called in ChangeEmail");

    return () => {
      console.log("use Effect unmounts called in ChangeEmail");
    };
  }, [dispatch]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      dispatch(
        changeEmail({ oldEmail: user.result.email, newEmail: email }, history)
      );
    } else {
      console.log("user is not authenthicated");
    }
  };
  return (
    <Container component="main" className={classes.profile}>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.buttonSubmit}
          name="newEmail"
          onChange={handleChange}
          variant="outlined"
          value={email}
          required
          fullWidth
          label="newEmail"
          type="text"
        ></TextField>
        <MyToast show={message ? true : false} message={message} type={type} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Change Email
        </Button>
      </form>
    </Container>
  );
};

export default ChangeEmail;
