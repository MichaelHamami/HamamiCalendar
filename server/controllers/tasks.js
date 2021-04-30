import Task from '../models/task.js';
import mongoose from 'mongoose';
import moment from 'moment';

export const getTasks = async (request,response) => {
    try {
        // const tasks = await Task.find();
        const tasks = await Task.find({creator: request.userId});

        // console.log(tasks);
        response.status(200).json(tasks);
    } catch (error)
    {
        response.status(404).json({ message: error});
    }
}

export const getTasksOfUser = async (request,response) => {
    console.log("getTasksOfUser called in server");
    console.log(request.userId);
    if (!request.userId) {
        return response.json({ message: "Unauthenticated" });
    }
    try {
        const tasks = await Task.find({creator: request.userId});

        // console.log(tasks);
        response.status(200).json(tasks);
    } catch (error)
    {
        response.status(404).json({ message: error});
    }
}



export const createTask = async (req,res) => {
    console.log("createTask called in server Controllers");
    if (!req.userId) {
        return response.json({ message: "Unauthenticated" });
    }
    const task = req.body;

    const newTask = new Task({...task, creator: req.userId});
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
    if (!req.userId) {
        return response.json({ message: "Unauthenticated" });
    }
    const tasks = req.body;
    let newTasks = tasks.map((task) => new Task({...task, creator: req.userId}));

    try {
        await Task.insertMany(newTasks);
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
// getTasksByDay

export const getTasksByDay = async (request,response) => {
    console.log("getTasksByDay called in server Controllers");
    try {

        const { startDate } = request.params;
        // console.log("startDate: "+startDate);
        const date_2 = startDate.split('-').join('/');
        const date = new Date(date_2);
        // console.log("date: "+date);
        const tasks = await Task.find({startDate:date});

        // console.log(tasks);
        response.status(200).json(tasks);
    } catch (error)
    {
        response.status(404).json({ message: error});
    }
}

export const getTasksByDayAndHour = async (request,response) => {
    console.log("getTasksByDayAndHour called in server Controllers");
    try {

        const { startDate } = request.params;
        const { startTime } = request.params;

        // console.log("startDate: "+startDate);
        const date_2 = startDate.split('-').join('/');
        const date = new Date(date_2);
        // console.log("date: "+date);
        const tasks = await Task.find({startDate:date ,startTime:startTime});

        // console.log(tasks);
        response.status(200).json(tasks);
    } catch (error)
    {
        response.status(404).json({ message: error});
    }
}

export const getWeekTasks = async (request,response) => {
    console.log("getWeekTasks called in server Controllers2");
    try {

        const { startDate } = request.params;

        console.log("startDate: "+startDate);
        const start_date = new Date(startDate);
        console.log(start_date);
        var end_date = new Date(start_date);
        end_date.setDate(end_date.getDate() + 7);
        console.log(end_date);
        const tasks = await Task.aggregate([
            {$match: {startDate: {$gte:start_date , $lte:end_date}}
        }]);
        console.log(tasks);
        response.status(200).json(tasks);
    } catch (error)
    {
        response.status(404).json({ message: error});
    }
}

export const getTasksByDayOfUser = async (request,response) => {
    console.log("getTasksByDayOfUser called in server Controllers");
    if (!request.userId) {
        return response.json({ message: "Unauthenticated" });
      }
    try {

        const { startDate } = request.params;
        // console.log("startDate: "+startDate);
        const date_2 = startDate.split('-').join('/');
        const date = new Date(date_2);
        // console.log("date: "+date);
        const tasks = await Task.find({startDate:date, creator:request.userId});

        // console.log(tasks);
        response.status(200).json(tasks);
    } catch (error)
    {
        response.status(404).json({ message: error});
    }
}

export const getTasksByDayAndHourOfUser = async (request,response) => {
    console.log("getTasksByDayAndHourOfUser called in server Controllers");
    if (!request.userId) {
        return response.json({ message: "Unauthenticated" });
      }
    try {

        const { startDate } = request.params;
        const { startTime } = request.params;

        // console.log("startDate: "+startDate);
        const date_2 = startDate.split('-').join('/');
        const date = new Date(date_2);
        // console.log("date: "+date);
        const tasks = await Task.find({startDate:date, startTime:startTime, creator:request.userId});

        // console.log(tasks);
        response.status(200).json(tasks);
    } catch (error)
    {
        response.status(404).json({ message: error});
    }
}

export const getWeekTasksOfUser = async (request,response) => {
    console.log("getWeekTasksOfUser called in server Controllers2");
    console.log(request.userId);
    if (!request.userId) {
        return response.json({ message: "Unauthenticated" });
      }
    try {

        const { startDate } = request.params;

        console.log("startDate: "+startDate);
        const start_date = new Date(startDate);
        console.log(start_date);
        var end_date = new Date(start_date);
        end_date.setDate(end_date.getDate() + 7);
        console.log(end_date);
        const tasks = await Task.aggregate([
            {$match: {startDate: {$gte:start_date , $lte:end_date}, creator:request.userId}
        }]);
        console.log(tasks);
        response.status(200).json(tasks);
    } catch (error)
    {
        response.status(404).json({ message: error});
    }
}