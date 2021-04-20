  
import { FETCH_ALL, CREATE, UPDATE, DELETE, DELETE_GROUP, CREATE_GROUP } from '../constants/actionTypes';

const taskReducer = (tasks = [], action) => {
  // const taskReducer = (tasks = {taskss:[]}, action) => {

  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      console.log("we get to create action inside reducers");
      return [...tasks, action.payload];
    case UPDATE:
      console.log("we get to Update action inside reducers");
      return tasks.map((task) => (task._id === action.payload._id ? action.payload : task));
    case DELETE:
      console.log("we get to delete action inside reducers");
      return tasks.filter((task) => task._id !== action.payload);
    case DELETE_GROUP:
        console.log("we get to delete group action inside reducers");
        return tasks.filter((task) => task.group !== action.payload);
    case CREATE_GROUP:
      console.log("we get to create group action inside reducers");
      return [...tasks, ...action.payload];
    default:
      console.log("Default of reducers");
      return tasks;
  }
};
export default taskReducer