import express from 'express';
const router = express.Router();

import {getTasks, createTask} from '../controllers/tasks.js';

router.get('/', getTasks);
router.post('/', createTask);

export default router;