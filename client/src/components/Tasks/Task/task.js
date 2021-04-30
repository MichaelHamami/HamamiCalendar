  
import React from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line 
import moment from 'moment';
import useStyles from './styles';
import { deleteTask } from '../../../actions/tasks';


const Task = ({task, setCurrentId } ) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  // const user = JSON.parse(localStorage.getItem('profile'));
  // console.log(task._id);

  return (
    <Card className={classes.card}>
              {/* <Button style={{ color: 'black' }} size="small"> */}
          <Button className={classes.overlay2} onClick={() => setCurrentId(task._id)} style={{ color: 'black' }} size="small">
           <MoreHorizIcon fontSize="default" /> 
          </Button>
        <Typography variant="h6">{task.name}</Typography>
        {/* <Typography variant="body2">{moment(task.createdAt).fromNow()}</Typography> */}

      <CardContent>

        <Typography variant="body2" color="textSecondary" component="p">{task.description}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">{task.startTime}</Typography>
        {/* <Typography variant="body2" color="textSecondary" component="p">{task.startDate}</Typography> */}
        <Typography variant="body2" color="textSecondary" component="p">{moment(task.startDate).format('DD/MM/YYYY')}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">{task.group}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">{task.creator}</Typography>



      </CardContent>
      <CardActions className={classes.cardActions}>
      <Button size="small" color="secondary" onClick={() => dispatch(deleteTask(task._id))}>
          <DeleteIcon fontSize="small" /> Delete
      </Button>
      </CardActions>
    </Card>
  );
};

export default Task;