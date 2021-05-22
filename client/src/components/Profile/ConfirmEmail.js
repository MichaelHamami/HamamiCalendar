import React, { useState, useEffect } from "react";
import { Typography, Container } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import MyToast from "../MyToast/MyToast";

import { confirmEmail } from "../../actions/userProfile";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";

const ConfirmEmail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const message = useSelector((state) => state.profile.profile_message);
  const type = useSelector((state) => state.profile.message_type);
  const { token } = useParams();
  console.log(token);

  useEffect(() => {
    console.log("useEffect called in confirm email page");
    if (token) {
      console.log(`call dispatch with token: ${token}`);
      dispatch(confirmEmail(token, history));
    }
  }, [token]);
  return (
    <Container component="main" className={classes.profile}>
      <Typography component="h1" variant="h5">
        Change Email Confirm:
      </Typography>
      <MyToast show={message ? true : false} message={message} type={type} />
    </Container>
  );
};

export default ConfirmEmail;
