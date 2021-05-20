import React from "react";
import { Typography, Container } from "@material-ui/core";
import useStyles from "./styles";

const EmailLink = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();

  return (
    <Container component="main" className={classes.position_fix}>
      <Typography component="h1" variant="h5">
        {!user?.result?._id && !user?.result?.googleId
          ? "Link has been sent to your email please click on it to activate your Account if you don't see email check spam or signup again"
          : "you already have account"}
      </Typography>
    </Container>
  );
};

export default EmailLink;
