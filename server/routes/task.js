import express from 'express';
const router = express.Router();

import {getTasks, createTask} from '../controllers/tasks.js';
import auth from "../middleware/auth.js";

router.get('/', getTasks);
router.post('/', createTask);

export default router;