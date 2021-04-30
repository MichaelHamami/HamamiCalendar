  
import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core/';
import {Container, Row, Col, Cell} from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import WeeklyCellTask from './WeeklyCellTask/WeeklyCellTask';
import WeeklyTaskModal from './WeeklyTaskModal/WeeklyTaskModal';
import ReactDOM from 'react-dom';

// import { Container, Row, Col } from 'reactstrap';
// eslint-disable-next-line 
import moment from 'moment';
// import useStyles from './styles';
// eslint-disable-next-line
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line
import { getTasks, getWeekTasks, getWeekTasksOfUser } from '../../../actions/tasks';
import 'bootstrap/dist/css/bootstrap.min.css';


const WeeklyCalendar2 = () => {
  const dispatch = useDispatch();
  // const classes = useStyles();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // var today = moment();
  var current = moment().startOf("week").utc(true); //current position on calendar (first day of month)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
const hours =[
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",

];
// moment() will be called everytime function rendered
const [today , setToday] = useState(moment());
const [showModal , setShowModal] = useState(false);
const [modalInfo , setModalInfo] = useState(null);

// better version
// const [today , setToday] = useState(() => moment());

const tasks = useSelector((state) => state.tasks);


// const orderTasksOnCells = () => {
//   console.log("orderTasksOnCells called");
//   console.log(tasks);
//   if(tasks.length > 0)
//   {
//     tasks.forEach((task,index) => {
//       var day_index = 1;
//       var hour = "01:00";
//       var targetDiv = document.getElementById(`${hour}+${day_index}`);
//       // <WeeklyCellTask task={this.state.tasks[0]}/>
//       // ReactDOM.render(<WeeklyCellTask task={task} />,targetDiv);

//       // targetDiv.appendChild(
//       //   <WeeklyCellTask task={task}>
//       // )
//       console.log(targetDiv);
//     })
//     // var i
//     // for(var i=0;i<tasks.length; i++)
//     // {
      
//     // }
//   }
//   // this.setState(prevState => ({ modalOpened: !prevState.modalOpened }));

// };
const renderHeader = (today) => 
{
  var start_day = today.startOf("week").toDate().getDate();
  var start_month = today.startOf("week").toDate().getMonth();
  var start_year = today.startOf("week").toDate().getFullYear();


  var end_day = today.endOf("week").toDate().getDate();
  var end_month = today.endOf("week").toDate().getMonth();
  var end_year = today.endOf("week").toDate().getFullYear();

  if(start_month !== end_month)
  {
    end_month = " - "+monthNames[end_month];
  }
  else{
    end_month ="";
  }
  if(end_year > start_year)
  {
    end_year = " - "+end_year;
  }
  else
  {
    end_year="";
  }
  start_month = monthNames[start_month];
  var header = start_day + " - " + end_day +" "+ start_month + end_month +" "+ start_year + end_year;
  return header;
};
const appendTasksToCell = (day_index,hour) => {
  // console.log("appendTasksToCell called");
  // console.log(tasks);
  if(tasks.length > 0)
  {
    return tasks.map((task,index) => {
      var task_hour = task.startTime;
      // console.log(task);
      // return day between 0-6
      var day_task_index = moment(task.startDate).toDate().getUTCDay();
      // console.log(day_task_index);
      day_task_index = day_task_index+1
            if(task_hour === hour && day_task_index === day_index)
        return <WeeklyCellTask key={task._id} task={task} click={()=> setShowModal(true)}/>
    })
  }
};

  useEffect(() => {
    console.log("useEffect called");
    // dispatch(getWeekTasks(today));
    console.log(today);
    // console.log(today.startof('weeks').format('YYYY-MM-DD'));
    // moment(moment().startOf("week").toDate()).format('YYYY-MM-DD')
    dispatch(getWeekTasksOfUser(moment(today.startOf("week").toDate()).format('YYYY-MM-DD')));
  },[dispatch,today]);

  // },[dispatch]);


  const lastWeek = () => {
    console.log("lastWeek called");
    console.log(today);
    // setState({ today: this.state.today.subtract(1, "week") });
    setToday(prevToday => prevToday.clone().subtract(1,"weeks"));

    // setToday(prevToday => prevToday.subtract(1,"weeks"));
    // dispatch(getWeekTasks(today.subtract(1,"weeks").format('YYYY-MM-DD')));

    // dispatch(getWeekTasks(today.format('YYYY-MM-DD')));
    // today = today.subtract(1,"week");
    console.log(today);
    // dispatch(getWeekTasks(today.format('YYYY-MM-DD')));
  };



  
  //sets current week to following week
  const nextWeek = () => {   
    console.log("nextWeek called");
    // setState({ today: today.add(1, "week") });
    // today = today.add(1,"week");
    // dispatch(getWeekTasks(today.format('YYYY-MM-DD')));
    // console.log(today);

    console.log(today);
    setToday(prevToday => prevToday.clone().add(1,"weeks"));
    // dispatch(getWeekTasks(today.add(1,"weeks").format('YYYY-MM-DD')));
    // dispatch(getWeekTasks(today.format('YYYY-MM-DD')));

    console.log(today);
  };
  console.log("render");
  return (
    <>
    { tasks.length? <WeeklyTaskModal show={showModal} onClose={()=> setShowModal(false)}
    task={tasks[0]}/> : null}
      <div className="WeeklyCalendar">
      {console.log("probb render")}
       {console.log(tasks)}
             {/* start header */}
          <div className="calendar-header">
            {/* <div>
              <button onClick={() => setToday(prevToday => prevToday.clone().add(1,"weeks"))}>
                nextWeek
              </button>
            </div> */}
            <div
              className="calendar-navigate"
              // onClick={() => setToday(prevToday => prevToday.add(1,"weeks"))}

              onClick={() => lastWeek()}
              >
            &#10094;
            </div>
          <div>
            <h2 className="calendar-title">
              {renderHeader(today)}
            </h2>
          </div>
          <div
            className="calendar-navigate"
            onClick={() => nextWeek()}
             >
            &#10095;
          </div>
          {/* {this.renderModal()} */}
        {/* end of header */}
        </div>
      <Table>
        <thead>
          <tr>
            {["Time",...days].map((day,index)=> (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, hour_index) => (
            <tr key={hour_index}>
              {["Time",...days].map((day,day_index)=> (
                // {day_index === 0 ? "hello" : "shalom" }
              <td key={`${hour_index},${day_index}`} id={`${hour}+${day_index}`}>
                {day_index === 0 ? hour : "" }
                {day_index > 0 && tasks.length? appendTasksToCell(day_index,hour) : "" }

                </td>
            ))}
            </tr>
          ))}
        </tbody>
      </Table>
      
    </div>
    </>
  //   <Container>
  //       <Row>
  //         <Col> Time </Col>
  //       {days.map((day, index) => (
  //         <Col key={index}> {day} </Col>

  //       ))}
  //       </Row>
  // {hours.map((hour, index) => (  
  //       <Col key={index}> 
  //       {hour}
  //       </Col>
  // ))}
  //   {hours.map((hour, index) => (  
  //       <Col key={index}>{hour}
  //       </Col>
  // ))}
  // </Container>
  );
};

export default WeeklyCalendar2;