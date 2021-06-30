import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  card: {
    display: "flex",
    marginBottom: "5px",
    flexDirection: "row",
    // height: "100%",
    width: "auto",
    boxShadow: "blue 0px 1px 6px, blue 0px 1px 4px",
    // color: "red",
    "&:hover": {
      boxShadow: "red 0px 1px 6px, red 0px 1px 4px",
    },
  },
});
