import Task from '../models/task.js';

export const getTasks = async (request,response) => {
    try {
        const tasks = await Task.find();

        // console.log(mission);
        response.status(200).json(tasks);
    } catch (error)
    {
        response.status(404).json({ message: error.message});
    }
    // response.send('THIS WORKS!');
}


export const createTask = async (request,response) => {
    const task = request.body;
    const newTask = new Task(task);
    try {
        await newTask.save();

        response.status(201).json(newTask);
    } catch (error)
    {
        response.status(409).json({ message: error.message});
    }
}