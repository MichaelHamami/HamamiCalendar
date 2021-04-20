import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:5000' });
const url = 'http://localhost:5000';
const url_tasks =   'http://localhost:5000/tasks';

// API.interceptors.request.use((request) => {
//     if (localStorage.getItem('profile')) {
//         request.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }
  
//     return request;
//   });

// Basic CRUD
export const fetchTasks = () => axios.get(url_tasks);
export const createTask = (newTask) => axios.post(url_tasks, newTask);
export const updateTask  = (id, updatedTask) => axios.patch(`${url_tasks}/${id}`, updatedTask);
export const deleteTask =  (id) => axios.delete(`${url_tasks}/${id}`);

// Auth
export const signIn = (formData) => axios.post(`${url}/user/signin`, formData);
export const signUp = (formData) => axios.post(`${url}/user/signup`, formData);

// Advanced CRUD
export const deleteRepeatedTasks =  (group) => axios.delete(`${url_tasks}/repeated/${group}`);
export const createRepeatedTasks = (newTasks) => axios.post(`${url_tasks}/repeated`, newTasks);


// export const signIn = (formData) => API.post('/user/signin', formData);
// export const signUp = (formData) => API.post('/user/signup', formData);