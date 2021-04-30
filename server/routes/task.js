import express from 'express';

import { getTasks, createTask, deleteTask, updateTask, createRepeatedTasks,
     deleteRepeatedTasks,getTasksByDay,getTasksByDayAndHour, getWeekTasks,
      getTasksByDayOfUser, getTasksByDayAndHourOfUser, getWeekTasksOfUser, getTasksOfUser} from '../controllers/tasks.js';
import auth from "../middleware/auth.js";

const router = express.Router();
// Basic CRUD
// router.get("/", getTasks);
router.post("/",auth, createTask);
router.delete('/:id',auth, deleteTask);
router.patch('/:id',auth, updateTask);

// Advanced 
router.delete('/repeated/:group',auth, deleteRepeatedTasks);
router.post("/repeated",auth, createRepeatedTasks);

// router.get("/day/:startDate",auth, getTasksByDay);
// router.get("/day/:startDate/hour/:startTime",auth, getTasksByDayAndHour);
// router.get("/week/:startDate",auth, getWeekTasks);

router.get("/",auth, getTasksOfUser);
router.get("/day/:startDate",auth, getTasksByDayOfUser);
router.get("/day/:startDate/hour/:startTime",auth, getTasksByDayAndHourOfUser);
router.get("/week/:startDate",auth, getWeekTasksOfUser);

// FIXME TODO: GET/DLEATE BY USERS/CHECK USERS
export default router;