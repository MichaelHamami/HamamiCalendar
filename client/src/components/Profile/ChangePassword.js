import React, { useState } from "react";
import { TextField, Button, Container } from "@material-ui/core";
import useStyles from "./styles";
import MyToast from "../MyToast/MyToast";
import { changePassword } from "../../api/index";
const ChangePassword = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("Error");

  const initialState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [form, setForm] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShow(false);
    console.log("handle Submit called");
    console.log(form);
    if (form.oldPassword === form.newPassword) {
      console.log("");
      setMessage("Please pick a new password");
      setShow(true);
    } else if (form.newPassword !== form.confirmPassword) {
      setMessage("Confirm password not equals to the new password");
      setShow(true);
    } else {
      console.log(user.result.email);
      console.log(`call changePassword with email: ${user.result.email}`);
      const answer = await changePassword({
        ...form,
        email: user.result.email,
      });
      console.log(answer);
      if (answer.status === 200) {
        setShow(true);
        setMessage("Password Changed");
        setType("Success");
      }
    }
  };
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <Container component="main" className={classes.profile}>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.buttonSubmit}
          name="oldPassword"
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          value={form.oldPassword}
          label="oldPassword"
          type="text"
        ></TextField>
        <TextField
          className={classes.buttonSubmit}
          name="newPassword"
          onChange={handleChange}
          variant="outlined"
          value={form.newPassword}
          fullWidth
          required
          label="newPassword"
          type="text"
        ></TextField>

        <TextField
          className={classes.buttonSubmit}
          name="confirmPassword"
          onChange={handleChange}
          variant="outlined"
          value={form.confirmPassword}
          required
          fullWidth
          label="confirmPassword"
          type="text"
        ></TextField>
        <MyToast show={show} message={message} type={type} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Change Password
        </Button>
      </form>
    </Container>
  );
};

export default ChangePassword;
