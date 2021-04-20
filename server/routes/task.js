import express from 'express';

import { getTasks, createTask, deleteTask, updateTask, createRepeatedTasks, deleteRepeatedTasks} from '../controllers/tasks.js';
// import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.delete('/:id', deleteTask);
router.patch('/:id', updateTask);

router.delete('/repeated/:group', deleteRepeatedTasks);
router.post("/repeated", createRepeatedTasks);

export default router;