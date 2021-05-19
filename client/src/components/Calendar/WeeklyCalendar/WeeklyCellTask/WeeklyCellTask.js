  
import React from 'react';
// eslint-disable-next-line 
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core/';
// import DeleteIcon from '@material-ui/icons/Delete';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line 
import moment from 'moment';
import useStyles from './styles';
import './WeeklyCellTask.css';
// import { deleteTask } from '../../../actions/tasks';


const WeeklyCellTask = ({task, click} ) => {
  // eslint-disable-next-line
    const dispatch = useDispatch();
    const classes = useStyles();


    return (
        <div className="Cell-Task"
        onClick= {e => {
                e.stopPropagation();
                // console.log( "Card Clicked");
                click();
            }
        }>
      <Card className={`${classes.card} cardcustome-header`}>
          <Typography variant="subtitle2">{task.name}</Typography>
          <Typography variant="subtitle2">{task.startTime}</Typography>
          <Typography variant="subtitle2" color="textSecondary">{moment(task.startDate).format('DD/MM/YYYY')}</Typography>

          {/* <Typography variant="subtitle2">{task.startDate}</Typography> */}


        {/* <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{task.startTime}</Typography>
        </CardContent> */}
        {/* <CardActions className={classes.cardActions}>
        <Button size="small" color="secondary" onClick={() => dispatch(deleteTask(task._id))}>
            <DeleteIcon fontSize="small" /> Delete
        </Button>
        </CardActions> */}
      </Card>
      </div>

    );
  };
  
  export default WeeklyCellTask;