import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  table_header_numbers: {
    backgroundColor: "rgba(0, 0, 0, 1)",

    display: "flex",
    verticalAlign: "middle",
    horizontalAlign: "middle",
    align: "center",
    // position: "40px , 0 , 0, 0",
    // position: "relative",
    // // left: "35px",
    // placeSelf: "center",
    // color: "rgba(0,183,255, 1)",
    // backgroundColor: "rgba(0, 0, 0, 1)",
    // justifyContent: "center",
    // alignItems: "center",
    // textAlign: "center",
    // alignSelf: "center",
    // margin: "0px",
    alignSelf: "center",
  },
  row_numbers: {
    placeSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    alignSelf: "center",
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
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
}));
