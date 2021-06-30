import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    marginTop: "15%",
    padding: theme.spacing(2),
  },
  form: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // justifyContent: 'center',
  },
  checkbox_form: {
    margin: theme.spacing(1),
    width: "100%",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  datepicker_form: {
    border: "none",
    outline: "none",
    width: "100%",
    margin: "7px",
  },
  datepicker: {
    width: "100%",
    margin: theme.spacing(1),
    justifyContent: "center",
  },
  buttonAdvanced: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",

    color: "white",
    margin: theme.spacing(1),
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
}));
