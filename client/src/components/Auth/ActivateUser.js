import React, { useState, useEffect } from "react";
import { Typography, Container } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";

import { activateUser } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";

const ActivateUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { token } = useParams();
  console.log(token);
  useEffect(() => {
    console.log("useEffect called in actions");

    dispatch(activateUser(token, history));
  }, [dispatch]);
  return (
    <Container component="main" className={classes.position_fix}>
      <Typography component="h1" variant="h5">
        Activating the Email
      </Typography>
    </Container>
  );
};

export default ActivateUser;
