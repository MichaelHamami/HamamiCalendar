import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    width: "70%",
    top: "0px",
    left: "15%",
    right: "0px",
    borderRadius: 15,
    // top right bottom left
    margin: "30px 0 20%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  create: {
    marginLeft: "15px",
  },
  create_task_button: {
    marginRight: "10px",
  },
  homeBtn: {
    margin: "10px 20px 0px 20px",
    "&:hover": {
      color: "rgba(0,183,255, 1)",
    },
  },
}));
