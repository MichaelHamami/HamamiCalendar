import { combineReducers } from "redux";

import tasks from "./tasks";
import auth from "./auth";
import profile from "./profile";

export const reducers = combineReducers({ tasks, auth, profile });
