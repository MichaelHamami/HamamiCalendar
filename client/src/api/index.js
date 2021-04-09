import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((request) => {
    if (localStorage.getItem('profile')) {
        request.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return request;
  });
  

// export const fetchTasks = () => axios.get(url);
// export const createtask = (newPost) => axios.post(url, newPost);
// export const updatetask  = (id, updatedTask) => axios.patch(`${url}/${id}`, updatedTask);
// export const deletetask =  (id) => axios.delete(`${url}/${id}`);


export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);