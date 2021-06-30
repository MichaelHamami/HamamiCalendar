import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  modal_custom: {
    marginTop: "12%",
  },
  paper: {
    padding: theme.spacing(1),
  },
  form: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // justifyContent: 'center',
  },
  datePicker: {
    marginLeft: theme.spacing(1),
  },
  buttonSubmit: {
    marginTop: 10,
  },
  buttonSave: {
    marginTop: 10,
    marginLeft: 10,
  },
  buttonDelete: {
    display: "flex",
    float: "right",
  },
}));
