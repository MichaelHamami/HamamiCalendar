  import { combineReducers } from 'redux';

import tasks from './tasks';
import auth from './auth';

export const reducers = combineReducers({ tasks, auth });
// export const reducers = combineReducers({  auth });