import axios from "axios";

// Production
// const options = {
//   headers: {'Access-Control-Allow-Origin': '*'}
// };
// const API = axios.create({ baseURL: 'https://hamami-calendar.herokuapp.com' });
// const url_tasks =   'https://hamami-calendar.herokuapp.com/tasks';

// Development
const API = axios.create({ baseURL: "http://localhost:5000" });
const url_tasks = "http://localhost:5000/tasks";

// Add token to the request headers
API.interceptors.request.use((request) => {
  if (localStorage.getItem("profile")) {

    request.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return request;
});

// Basic CRUD

export const fetchTasks = () => API.get("/tasks");
export const createTask = (newTask) => API.post("/tasks", newTask);
export const updateTask = (id, updatedTask) =>
  API.patch(`/tasks/${id}`, updatedTask);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

// Auth

export const login = (formData) => API.post("/user/login", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const activateUser = (token) =>
  API.post(`/user/email-activate/${token}`);
export const changePassword = (formData) =>
  API.patch("/user/changePassword", formData);

export const changeEmail = (formData) =>
  API.post("/user/changeEmail", formData);

export const confirmEmail = (token) => API.patch(`/user/confirmEmail/${token}`);

export const deleteRepeatedTasks = (group) =>
  API.delete(`/tasks/repeated/${group}`);
export const createRepeatedTasks = (newTasks) =>
  API.post(`/tasks/repeated`, newTasks);

export const getTasksByDay = (startDate) =>
  axios.get(`${url_tasks}/day/${startDate}`);
export const getTasksByDayAndHour = (startDate, startTime) =>
  axios.get(`${url_tasks}/day/${startDate}/hour/${startTime}`);
export const getWeekTasks = (startDate) =>
  axios.get(`${url_tasks}/week/${startDate}`);

export const getTasksByDayOfUser = (startDate) =>
  API.get(`/tasks/day/${startDate}`);
export const getTasksByDayAndHourOfUser = (startDate, startTime) =>
  API.get(`/tasks/day/${startDate}/hour/${startTime}`);
export const getWeekTasksOfUser = (startDate) =>
  API.get(`/tasks/week/${startDate}`);

export const getTasksBetweenDatesOfUser = (startDate, endDate) =>
  API.get(`/tasks/week/startdate/${startDate}/enddate/${endDate}`);
