import Task from "../models/task.js";
import mongoose from "mongoose";
import moment from "moment";
import Agenda from "agenda";
import UserModal from "../models/user.js";
import {SECRETS} from '../secrets.js'

const mongoConnectionString = SECRETS.CONNECTION_URL;
const agenda = new Agenda({
  db: {
    address: mongoConnectionString,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
});

export const getTasks = async (request, response) => {
  try {
    const tasks = await Task.find();
    // const tasks = await Task.find({creator: request.userId});
    const jobs = await agenda.jobs(
      { name: "send task remainder" }
      // { data: -1 },
      // 3,
      // 1
    );
    response.status(200).json(tasks);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};

export const getTasksOfUser = async (request, response) => {
  try {
    const tasks = await Task.find({ creator: request.userId });
    return response.status(200).json(tasks);
  } catch (error) {
    return response.status(404).json({ message: error });
  }
};

export const createTask = async (req, res) => {
  try {
  const userId = req.userId;
  const user = await UserModal.findById(userId);
  const task = req.body;

  const newTask = new Task({ ...task, creator: userId });

    await newTask.save();

    if (newTask.email_remainder) {
      scheduleRemainder(newTask, user.email,0);
    }
   return res.status(200).json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const deleteTask = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return response.status(404).send(`No task with id: ${id}`);

  await Task.findByIdAndRemove(id);

  response.json({ message: "Task deleted successfully." });
};

export const updateTask = async (req, res) => {

  const { id } = req.params;
  const { name, description, creator, startDate, group, startTime } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No task with id: ${id}`);

  const updatedTask = {
    name,
    description,
    creator,
    startDate,
    startTime,
    group,
    _id: id,
  };

  const theUpdated = await Task.findByIdAndUpdate(id, updatedTask, {
    new: true,
  });
  // if (theUpdated.email_remainder) {
  //   scheduleRemainder(theUpdated, user.email);
  // }
  res.json(theUpdated);
};

export const createRepeatedTasks = async (req, res) => {
  const userId = req.userId;
  const user = await UserModal.findById(userId);
  const tasks = req.body;
  let newTasks = tasks.map((task) => {
     var currentTask = new Task({ ...task, creator: req.userId });
     if(currentTask.email_remainder)
     {
      scheduleRemainder(currentTask, user.email,0);
     }
    return currentTask;
  });
  try {
    await Task.insertMany(newTasks);

    res.status(200).json(newTasks);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const deleteRepeatedTasks = async (request, response) => {

  const { group } = request.params;

  // if(!mongoose.Types.Number.isValid(group)) return response.status(404).send(`No tasks with group: ${group}`);
  await Task.deleteMany({ group: group });
  response.json({ message: "Group Tasks deleted successfully." });
};
// getTasksByDay

export const getTasksByDay = async (request, response) => {
  try {
    const { startDate } = request.params;
    const date_2 = startDate.split("-").join("/");
    const date = new Date(date_2);
    const tasks = await Task.find({ startDate: date });

   return response.status(200).json(tasks);
  } catch (error) {
    return response.status(404).json({ message: error });
  }
};

export const getTasksByDayAndHour = async (request, response) => {
  try {
    const { startDate } = request.params;
    const { startTime } = request.params;

    const date_2 = startDate.split("-").join("/");
    const date = new Date(date_2);
    const tasks = await Task.find({ startDate: date, startTime: startTime });

    response.status(200).json(tasks);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};

export const getWeekTasks = async (request, response) => {
  try {
    const { startDate } = request.params;
    const start_date = new Date(startDate);

    var end_date = new Date(start_date);
    end_date.setDate(end_date.getDate() + 7);
    const tasks = await Task.aggregate([
      { $match: { startDate: { $gte: start_date, $lte: end_date } } },
    ]);
    response.status(200).json(tasks);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};

export const getTasksByDayOfUser = async (request, response) => {
  if (!request.userId) {
    return response.json({ message: "Unauthenticated" });
  }
  try {
    const { startDate } = request.params;
    const date_2 = startDate.split("-").join("/");
    const date = new Date(date_2);
    const tasks = await Task.find({ startDate: date, creator: request.userId });

    response.status(200).json(tasks);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};

export const getTasksByDayAndHourOfUser = async (request, response) => {
  if (!request.userId) {
    return response.json({ message: "Unauthenticated" });
  }
  try {
    const { startDate } = request.params;
    const { startTime } = request.params;

    const date_2 = startDate.split("-").join("/");
    const date = new Date(date_2);
    const tasks = await Task.find({
      startDate: date,
      startTime: startTime,
      creator: request.userId,
    });

    response.status(200).json(tasks);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};

export const getWeekTasksOfUser = async (request, response) => {
  if (!request.userId) {
    return response.json({ message: "Unauthenticated" });
  }
  try {
    const { startDate } = request.params;
    const start_date = new Date(startDate);
    var end_date = new Date(start_date);
    end_date.setDate(end_date.getDate() + 7);
    const tasks = await Task.aggregate([
      {
        $match: {
          startDate: { $gte: start_date, $lte: end_date },
          creator: request.userId,
        },
      },
    ]);
    response.status(200).json(tasks);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};
export const getTasksBetweenDatesOfUser = async (request, response) => {
  if (!request.userId) {
    return response.json({ message: "Unauthenticated" });
  }
  try {
    const { startDate, endDate } = request.params;
    const start_date = new Date(startDate);
    const end_date = new Date(endDate);

    const tasks = await Task.aggregate([
      {
        $match: {
          startDate: { $gte: start_date, $lte: end_date },
          creator: request.userId,
        },
      },
    ]);
    response.status(200).json(tasks);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};

export const getWeekTasksOfUserSpecial = async (request, response) => {
  try {
    const { startDate } = request.params;

    const start_date = new Date(startDate);
    var end_date = new Date(start_date);
    end_date.setDate(end_date.getDate() + 7);
    // with user
    // const tasks = await Task.aggregate([
    //     {$match: {startDate: {$gte:start_date , $lte:end_date}, creator:request.userId}
    // }]);
    // without user
    const tasks = await Task.aggregate([
      { $match: { startDate: { $gte: start_date, $lte: end_date } } },
    ]);

    // response.status(200).json(tasks);
    const orderedTasks = orderTasksInArray(tasks);
    response.status(200).json(orderedTasks);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};

const orderTasksInArray = (tasks) => {
  const tasksEachDay = Array(7)
    .fill()
    .map(() => Array(24));
  const hours = [
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
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
  ];
  tasks.forEach((task) => {
    var day_task_index = moment(task.startDate).toDate().getUTCDay();

    var hour = `${task.startTime.substring(0, 2)}:00`;
    var hour_index = hours.indexOf(hour);
    tasksEachDay[day_task_index][hour_index] = task;
  });
  return tasksEachDay;
};

export const scheduleRemainder = async (task, email_to, phoneNumber) => {
  var [hour, minutes] = task.startTime.split(":");
  hour = Number(hour);
  minutes = Number(minutes);
  var dateToSend = new Date(task.startDate);
  dateToSend.setHours(hour, minutes - 30, 0, 0);
  try {
    (async function () {
      await agenda.start();
      await agenda.schedule(dateToSend, "send task remainder", {
        task_id: task._id,
        email_to: email_to,
        phoneNumber: phoneNumber,
        task_start_date: task.startDate,
        dateScheduled: dateToSend,
      });
    })();
  } catch (error) {
    // res.status(409).json({ message: error });
  }
};
