import React from "react";
// eslint-disable-next-line
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core/";
// import DeleteIcon from '@material-ui/icons/Delete';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from "react-redux";
// eslint-disable-next-line
import moment from "moment";
import useStyles from "./styles";
// import "./TaskCell.css";
// import { deleteTask } from '../../../actions/tasks';

const TaskCell = ({ task, click, hour = false }) => {
  // eslint-disable-next-line
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div
      className="Cell-Task"
      onClick={(e) => {
        e.stopPropagation();
        // console.log( "Card Clicked");
        click();
      }}
    >
      <Card classes={{ root: classes.card }}>
        {hour ? (
          <Typography variant="subtitle2">{task.startTime} &#8202;</Typography>
        ) : null}
        <Typography variant="subtitle2">{task.name}</Typography>

        {/* <Typography variant="subtitle2" color="textSecondary">
          &#8202;
          {moment(task.startDate).format("DD/MM/YYYY")}
        </Typography> */}

        {/* <Typography variant="subtitle2">{task.startDate}</Typography> */}
      </Card>
    </div>
  );
};

export default TaskCell;
