import Task from '../models/task.js';
import mongoose from 'mongoose';

export const getTasks = async (request,response) => {
    try {
        const tasks = await Task.find();

        // console.log(tasks);
        response.status(200).json(tasks);
    } catch (error)
    {
        response.status(404).json({ message: error});
    }
}


export const createTask = async (req,res) => {
    console.log("createTask called in server Controllers");
    const task = req.body;

    const newTask = new Task(task);
    console.log(newTask);

    try {
        await newTask.save();
        res.setHeader('Content-Type', 'application/json');

        res.status(200).json(newTask);

    } catch (error)
    {
        res.status(409).json({ message: error});
    }
}

export const deleteTask = async (request, response) => {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return response.status(404).send(`No task with id: ${id}`);

    await Task.findByIdAndRemove(id);

    response.json({ message: "Task deleted successfully." });
}

export const updateTask = async (req, res) => {
    console.log("updateTask called in server Controllers");

    const { id } = req.params;
    const { name, description, creator,startDate,group } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No task with id: ${id}`);

    const updatedTask = {  name, description, creator,startDate,group, _id: id };

    const theUpdated = await Task.findByIdAndUpdate(id, updatedTask, { new: true });

    res.json(theUpdated);

}

export const createRepeatedTasks = async (req,res) => {
    console.log("createRepeatedTasks called in server Controllers2");
    const tasks = req.body;
    let newTasks = tasks.map((task) => new Task(task));

    try {
        await Task.insertMany(tasks);
        res.setHeader('Content-Type', 'application/json');

        res.status(200).json(newTasks);

    } catch (error)
    {
        res.status(409).json({ message: error});
    }
}

export const deleteRepeatedTasks = async (request, response) => {
    console.log("deleteRepeatedTasks called in server Controllers");

    const { group } = request.params;

    // if(!mongoose.Types.Number.isValid(group)) return response.status(404).send(`No tasks with group: ${group}`);
    await Task.deleteMany({group: group});
    response.json({ message: "Group Tasks deleted successfully." });
}