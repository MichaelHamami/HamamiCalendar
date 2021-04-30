import { FETCH_ALL, CREATE, UPDATE, DELETE, DELETE_GROUP, CREATE_GROUP } from '../constants/actionTypes';
import * as api from '../api/index.js';
import {createTask } from '../api/index.js';

export const getTasks = () => async (dispatch) => {
  console.log("getTasks called in actions");

  try {
    const { data } = await api.fetchTasks();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const createtask = (task) => async (dispatch) => {
  try {
    console.log("createTask called in actions changed");
    const { data } = await createTask(task);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const updateTask = (id, task) => async (dispatch) => {
  console.log("updateTask called in actions");
  try {
    const { data } = await api.updateTask(id, task);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
}


export const deleteTask = (id) => async (dispatch) => {
  try {
  await api.deleteTask(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
}

export const deleteRepeatedTasks = (group) => async (dispatch) => {
  try {
  await api.deleteRepeatedTasks(group);

    dispatch({ type: DELETE_GROUP, payload: group });
  } catch (error) {
    console.log(error);
  }
}


export const createRepeatedTasks = (tasks) => async (dispatch) => {
  try {
    console.log("createRepeatedTasks called in actions");
    const { data } = await api.createRepeatedTasks(tasks);

    dispatch({ type: CREATE_GROUP, payload: data });
  } catch (error) {
    console.log(error);
  }
}
export const getTasksByDayOfUser = (startDate) => async (dispatch) => {
  console.log("getTasksByDay called in actions");

  try {
    const { data } = await api.getTasksByDayOfUser(startDate);

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const getTasksByDayAndHourOfUser = (startDate,startTime) => async (dispatch) => {
  console.log("getTasksByDayAndHour called in actions");

  try {
    const { data } = await api.getTasksByDayAndHourOfUser(startDate,startTime);

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const getWeekTasksOfUser = (startDate) => async (dispatch) => {
  console.log("getWeekTasks called in actions with date: "+startDate);

  try {
    const { data } = await api.getWeekTasksOfUser(startDate);

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
}
export const getTasksByDay = (startDate) => async (dispatch) => {
  console.log("getTasksByDay called in actions");

  try {
    const { data } = await api.getTasksByDay(startDate);

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
}


export const getTasksByDayAndHour = (startDate,startTime) => async (dispatch) => {
  console.log("getTasksByDayAndHour called in actions");

  try {
    const { data } = await api.getTasksByDayAndHour(startDate,startTime);

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const getWeekTasks = (startDate) => async (dispatch) => {
  console.log("getWeekTasks called in actions with date: "+startDate);

  try {
    const { data } = await api.getWeekTasks(startDate);

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
}