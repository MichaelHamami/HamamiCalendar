import Task from "../models/task.js";
import mongoose from "mongoose";
import moment from "moment";
import Agenda from "agenda";
import dotenv from "dotenv";
import UserModal from "../models/user.js";

import { sendEmailRemainder, sendSMSRemainder } from "../Utils/utils.js";

dotenv.config();
const mongoConnectionString = process.env.CONNECTION_URL;
const agenda = new Agenda({
  db: {
    address: mongoConnectionString,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
});

export const getTasks = async (request, response) => {
  console.log("get Tasks called");
  try {
    const tasks = await Task.find();
    // const tasks = await Task.find({creator: request.userId});
    // console.log(tasks);
    const jobs = await agenda.jobs(
      { name: "send task remainder" }
      // { data: -1 },
      // 3,
      // 1
    );
    console.log(jobs);
    console.log(jobs[0].attrs.data);
    response.status(200).json(tasks);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};

export const getTasksOfUser = async (request, response) => {
  console.log("getTasksOfUser called in server");
  console.log(request.userId);
  if (!request.userId) {
    return response.json({ message: "Unauthenticated" });
  }
  try {
    const tasks = await Task.find({ creator: request.userId });
    response.status(200).json(tasks);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};

export const createTask = async (req, res) => {
  console.log("createTask called in server Controllers");
  if (!req.userId) {
    return response.json({ message: "Unauthenticated" });
  }
  const userId = req.userId;
  const user = await UserModal.findById(userId);
  console.log(user);
  const task = req.body;

  const newTask = new Task({ ...task, creator: req.userId });
  console.log(newTask);

  try {
    await newTask.save();

    if (newTask.email_remainder) {
      scheduleRemainder(newTask, user.email,0);
    }
    // res.setHeader("Content-Type", "application/json");
    res.status(200).json(newTask);
  } catch (error) {
    res.status(409).json({ message: error });
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
  console.log("updateTask called in server Controllers");

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
  console.log("createRepeatedTasks called in server Controllers2");
  if (!req.userId) {
    return response.json({ message: "Unauthenticated" });
  }
  const userId = req.userId;
  const user = await UserModal.findById(userId);
  console.log(user);
  const tasks = req.body;
  let newTasks = tasks.map((task) => {
     var currentTask = new Task({ ...task, creator: req.userId });
     if(currentTask.email_remainder)
     {
      scheduleRemainder(currentTask, user.email,0);
     }
    return currentTask;
  });
  console.log(newTasks);
  try {
    await Task.insertMany(newTasks);

    res.status(200).json(newTasks);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const deleteRepeatedTasks = async (request, response) => {
  console.log("deleteRepeatedTasks called in server Controllers");

  const { group } = request.params;

  // if(!mongoose.Types.Number.isValid(group)) return response.status(404).send(`No tasks with group: ${group}`);
  await Task.deleteMany({ group: group });
  response.json({ message: "Group Tasks deleted successfully." });
};
// getTasksByDay

export const getTasksByDay = async (request, response) => {
  console.log("getTasksByDay called in server Controllers");
  try {
    const { startDate } = request.params;
    // console.log("startDate: "+startDate);
    const date_2 = startDate.split("-").join("/");
    const date = new Date(date_2);
    // console.log("date: "+date);
    const tasks = await Task.find({ startDate: date });

    // console.log(tasks);
    response.status(200).json(tasks);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};

export const getTasksByDayAndHour = async (request, response) => {
  console.log("getTasksByDayAndHour called in server Controllers");
  try {
    const { startDate } = request.params;
    const { startTime } = request.params;

    // console.log("startDate: "+startDate);
    const date_2 = startDate.split("-").join("/");
    const date = new Date(date_2);
    // console.log("date: "+date);
    const tasks = await Task.find({ startDate: date, startTime: startTime });

    // console.log(tasks);
    response.status(200).json(tasks);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};

export const getWeekTasks = async (request, response) => {
  console.log("getWeekTasks called in server Controllers2");
  try {
    const { startDate } = request.params;

    console.log("startDate: " + startDate);
    const start_date = new Date(startDate);
    console.log(start_date);
    var end_date = new Date(start_date);
    end_date.setDate(end_date.getDate() + 7);
    console.log(end_date);
    const tasks = await Task.aggregate([
      { $match: { startDate: { $gte: start_date, $lte: end_date } } },
    ]);
    console.log(tasks);
    response.status(200).json(tasks);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};

export const getTasksByDayOfUser = async (request, response) => {
  console.log("getTasksByDayOfUser called in server Controllers");
  if (!request.userId) {
    return response.json({ message: "Unauthenticated" });
  }
  try {
    const { startDate } = request.params;
    // console.log("startDate: "+startDate);
    const date_2 = startDate.split("-").join("/");
    const date = new Date(date_2);
    // console.log("date: "+date);
    const tasks = await Task.find({ startDate: date, creator: request.userId });

    // console.log(tasks);
    response.status(200).json(tasks);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};

export const getTasksByDayAndHourOfUser = async (request, response) => {
  console.log("getTasksByDayAndHourOfUser called in server Controllers");
  if (!request.userId) {
    return response.json({ message: "Unauthenticated" });
  }
  try {
    const { startDate } = request.params;
    const { startTime } = request.params;

    // console.log("startDate: "+startDate);
    const date_2 = startDate.split("-").join("/");
    const date = new Date(date_2);
    // console.log("date: "+date);
    const tasks = await Task.find({
      startDate: date,
      startTime: startTime,
      creator: request.userId,
    });

    // console.log(tasks);
    response.status(200).json(tasks);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};

export const getWeekTasksOfUser = async (request, response) => {
  console.log("getWeekTasksOfUser called in server Controllers2");
  console.log(request.userId);
  if (!request.userId) {
    return response.json({ message: "Unauthenticated" });
  }
  try {
    const { startDate } = request.params;

    console.log("startDate: " + startDate);
    const start_date = new Date(startDate);
    console.log(start_date);
    var end_date = new Date(start_date);
    end_date.setDate(end_date.getDate() + 7);
    console.log(end_date);
    const tasks = await Task.aggregate([
      {
        $match: {
          startDate: { $gte: start_date, $lte: end_date },
          creator: request.userId,
        },
      },
    ]);
    console.log(tasks);
    response.status(200).json(tasks);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};
export const getTasksBetweenDatesOfUser = async (request, response) => {
  console.log("getTasksBetweenDates called in server Controllers");
  console.log(request.userId);
  if (!request.userId) {
    return response.json({ message: "Unauthenticated" });
  }
  try {
    const { startDate, endDate } = request.params;

    console.log("startDate: " + startDate);
    console.log("endDate: " + endDate);
    const start_date = new Date(startDate);
    const end_date = new Date(endDate);
    console.log(start_date);
    console.log(end_date);

    const tasks = await Task.aggregate([
      {
        $match: {
          startDate: { $gte: start_date, $lte: end_date },
          creator: request.userId,
        },
      },
    ]);
    console.log(tasks);
    response.status(200).json(tasks);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};

export const getWeekTasksOfUserSpecial = async (request, response) => {
  console.log("getWeekTasksOfUserSpecial called in server Controllers2");
  // with user
  // console.log(request.userId);
  // if (!request.userId) {
  //     return response.json({ message: "Unauthenticated" });
  //   }
  try {
    const { startDate } = request.params;

    console.log("startDate: " + startDate);
    const start_date = new Date(startDate);
    // console.log(start_date);
    var end_date = new Date(start_date);
    end_date.setDate(end_date.getDate() + 7);
    // console.log(end_date);
    // with user
    // const tasks = await Task.aggregate([
    //     {$match: {startDate: {$gte:start_date , $lte:end_date}, creator:request.userId}
    // }]);
    // without user
    const tasks = await Task.aggregate([
      { $match: { startDate: { $gte: start_date, $lte: end_date } } },
    ]);

    console.log(tasks);
    // response.status(200).json(tasks);
    const orderedTasks = orderTasksInArray(tasks);
    console.log(orderedTasks);
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
  // console.log("orderTasksInArray called");
  tasks.forEach((task) => {
    var day_task_index = moment(task.startDate).toDate().getUTCDay();
    // console.log(task.startDate);
    // console.log(day_task_index);

    var hour = `${task.startTime.substring(0, 2)}:00`;
    var hour_index = hours.indexOf(hour);
    tasksEachDay[day_task_index][hour_index] = task;
  });
  return tasksEachDay;
};

agenda.define(
  "send task remainder",
  { priority: "high", concurrency: 10 },
  async (job) => {
    console.log("the schedule job function called");
    const { task_id, email_to, phoneNumber, dateScheduled, task_start_date } =
      job.attrs.data;
    // console.log(task_id);
    // console.log(email_to);
    // console.log(dateScheduled);
    const task = await Task.findById(task_id);
    // console.log(task);
    // console.log(task.sms_remainder);
    // console.log(task.email_remainder);
    // console.log(task.startDate);
    // console.log(task_start_date);
    if (task.email_remainder) {
      if (task_start_date.toDateString() === task.startDate.toDateString()) {
        var now_plus_5 = new Date();
        now_plus_5.setMinutes(now_plus_5.getMinutes() + 5);
        var now_minus_30 = new Date();
        now_minus_30.setMinutes(now_minus_30.getMinutes() - 30);
        // console.log(now_minus_30);
        if (dateScheduled >= now_minus_30 && dateScheduled <= now_plus_5) {
          console.log("we will send email");
          sendEmailRemainder(task, email_to);
        } else {
          console.log("date to send incorrect should not send now...");
        }
      } else {
        console.log(
          "Task startDate not equals to task date of job means task date changed..."
        );
      }
    } else {
      console.log("task email remainder not allowed");
    }
    // if (task.sms_remainder) {
    //   console.log("sms remainder set true");
    //   if (phoneNumber) {
    //     console.log("phone number exits");
    //     var message_to_sent = `There is an task named: ${task.name} set to this hour: ${task.startTime}`;
    //     sendSMSRemainder(phoneNumber, message_to_sent);
    //   }
    // }
  }
);

// export const scheduleRemainder = async (req, res) => {
// console.log("scheduleRemainder called in server Controllers");
// const { taskID, email_to, phoneNumber } = req.body;
export const scheduleRemainder = async (task, email_to, phoneNumber) => {
  console.log("scheduleRemainder called in server Controllers");
  // console.log(taskID);
  // console.log(email_to);
  // console.log(phoneNumber);

  // const task = await Task.findById(taskID);
  // console.log(task);

  // console.log(task.startDate);
  var [hour, minutes] = task.startTime.split(":");
  hour = Number(hour);
  minutes = Number(minutes);
  // console.log(hour);
  // console.log(minutes);
  var dateToSend = new Date(task.startDate);
  dateToSend.setHours(hour, minutes - 30, 0, 0);
  // console.log(`datetosend: ${dateToSend}`);
  try {
    (async function () {
      await agenda.start();
      await agenda.schedule(dateToSend, "send task remainder", {
        // task_id: taskID,
        task_id: task._id,
        email_to: email_to,
        phoneNumber: phoneNumber,
        task_start_date: task.startDate,
        dateScheduled: dateToSend,
      });
      console.log("Schedule a job");
      // return res.json("Schedule a job");
    })();
  } catch (error) {
    console.log("scheduleRemainder ~ error", error);
    // res.status(409).json({ message: error });
  }
};
